/*:
 * @target MZ
 * @plugindesc Reserve MP/TP + consumable items during multi-action input (prevents over-queueing)
 * @help
 * Put below VisuStella plugins.
 * Disables skills/items if earlier queued actions would consume the same MP/TP or consumables.
 */

(() => {
  function inputSlotIndex(actor) {
    // Robust: find first action slot that doesn't have an item chosen yet
    if (!actor || !actor._actions) return 0;
    for (let i = 0; i < actor._actions.length; i++) {
      const act = actor._actions[i];
      if (!act || !act.item || !act.item()) return i;
    }
    // If all filled (rare during input), treat as last
    return actor._actions.length;
  }

  function reservedFromQueuedActions(actor) {
    const idx = inputSlotIndex(actor);
    let mp = 0;
    let tp = 0;
    const items = new Map();

    if (!actor || !actor._actions) return { mp, tp, items };

    for (let i = 0; i < idx; i++) {
      const action = actor._actions[i];
      const obj = action?.item?.();
      if (!obj) continue;

      if (DataManager.isSkill(obj)) {
        mp += actor.skillMpCost?.(obj) ?? 0;
        tp += actor.skillTpCost?.(obj) ?? 0;
      } else if (DataManager.isItem(obj) && obj.consumable) {
        items.set(obj.id, (items.get(obj.id) || 0) + 1);
      }
    }
    return { mp, tp, items };
  }

  function shouldReserveFor(actor) {
    if (!BattleManager || !BattleManager.isInputting?.()) return false;
    if (!actor || !actor.numActions) return false;
    if (actor.numActions() <= 1) return false;

    // Only apply when we are selecting action 2+ (slot index >= 1)
    return inputSlotIndex(actor) >= 1;
  }

  // --- Skills: patch Window_BattleSkill (battle skill list) ---
  const _WBS_isEnabled = Window_BattleSkill.prototype.isEnabled;
  Window_BattleSkill.prototype.isEnabled = function(item) {
    const base = _WBS_isEnabled.call(this, item);
    if (!base) return false;

    const actor = this._actor;
    if (!DataManager.isSkill(item)) return base;
    if (!shouldReserveFor(actor)) return base;

    const r = reservedFromQueuedActions(actor);
    const effectiveMp = actor.mp - r.mp;
    const effectiveTp = actor.tp - r.tp;

    const mpCost = actor.skillMpCost?.(item) ?? 0;
    const tpCost = actor.skillTpCost?.(item) ?? 0;

    if (effectiveMp < mpCost) return false;
    if (effectiveTp < tpCost) return false;
    return true;
  };

  // --- Items: patch Window_BattleItem (battle item list) ---
  const _WBI_isEnabled = Window_BattleItem.prototype.isEnabled;
  Window_BattleItem.prototype.isEnabled = function(item) {
    const base = _WBI_isEnabled.call(this, item);
    if (!base) return false;

    if (!DataManager.isItem(item)) return base;
    if (!item.consumable) return base;

    const actor = BattleManager.actor?.();
    if (!shouldReserveFor(actor)) return base;

    const r = reservedFromQueuedActions(actor);
    const reservedCount = r.items.get(item.id) || 0;

    const available = $gameParty.numItems(item) - reservedCount;
    return available > 0;
  };
})();
