/*:
 * @target MZ
 * @plugindesc Delays counterattack on basic attack (skill ID 1) with proper timing and shows damage taken before counter.
 *
 * @param Counter Skill ID
 * @type skill
 * @desc The skill ID to use as counterattack.
 * @default 5
 *
 * @param Delay Frames
 * @type number
 * @min 0
 * @desc Delay in frames before counterattack triggers.
 * @default 30
 *
 * @help
 * This plugin forces a delayed counterattack with a proper wait to allow damage display first.
 */

(() => {
  const parameters = PluginManager.parameters('DelayedCounter');
  const counterSkillId = Number(parameters['Counter Skill ID'] || 5);
  const delayFrames = Number(parameters['Delay Frames'] || 30);

  // Helper async wait function
  function waitFrames(frames) {
    return new Promise(resolve => {
      let count = frames;
      const wait = () => {
        if (count <= 0) {
          resolve();
        } else {
          count--;
          requestAnimationFrame(wait);
        }
      };
      wait();
    });
  }

  // Hook executeDamage to queue delayed counterattack
  const _Game_Battler_executeDamage = Game_Battler.prototype.executeDamage;
  Game_Battler.prototype.executeDamage = function(value) {
    _Game_Battler_executeDamage.call(this, value);

    if (this.isActor() && value > 0) {
      const attacker = BattleManager._subject;
      if (attacker && attacker !== this && attacker.isEnemy()) {
        const action = attacker.currentAction();
        if (action && action.item() && action.item().id === 1 && action.isSkill()) {
          // Run async delay and then force the counter
          (async () => {
            await waitFrames(delayFrames);
            if (this.isAlive()) {
              BattleManager.queueForceAction(this.actorId(), counterSkillId, attacker.index());
            }
          })();
        }
      }
    }
  };
})();
