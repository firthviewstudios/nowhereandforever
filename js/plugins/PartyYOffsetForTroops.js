/*:
 * @target MZ
 * @plugindesc Offsets party vertically for specific Troop IDs, including victory.
 */

(() => {
  const troopsToOffset = [
    14, 15,
    96, 97, 98, 99, 100, 101, 102, 103,
    118,119,120,121,122,123,124,125,126
  ];
  const partyYOffset = -40;

  let currentTroopId = 0;

  const _BattleManager_setup = BattleManager.setup;
  BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
    currentTroopId = troopId;
  };

  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function(result) {
    currentTroopId = 0;
    _BattleManager_endBattle.call(this, result);
  };

  function shouldOffset() {
    return troopsToOffset.includes(currentTroopId);
  }

  // ⭐ The ONLY hook you need
  const _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
    _Sprite_Actor_setActorHome.call(this, index);

    if (shouldOffset()) {
      this.setHome(this._homeX, this._homeY + partyYOffset);
    }
  };
})();
