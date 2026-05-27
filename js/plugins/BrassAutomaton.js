/*:
 * @target MZ
 * @plugindesc Breaks the Automaton's Charging state when it takes enough damage.
 */

(() => {

  const AUTOMATON_ID = 141;     // Brass Automaton enemy ID
  const CHARGING_STATE = 47;    // <-- Replace with your Charging state ID
  const THRESHOLD = 0.01;       // 20% of max HP (change as needed)

  const alias = Game_Action.prototype.executeDamage;
  Game_Action.prototype.executeDamage = function(target, value) {
    alias.call(this, target, value);

    // Only run in battle
    if (!$gameParty.inBattle()) return;

    // Only run when the Automaton takes damage
    if (!target.isEnemy() || target.enemyId() !== AUTOMATON_ID) return;

    // Must have the Charging state
    if (!target.isStateAffected(CHARGING_STATE)) return;

    // Damage must be positive
    const dmg = Math.max(0, value);
    const max = target.mhp;

    // Check threshold
    if (dmg >= max * THRESHOLD) {

      // Remove the Charging state
      target.removeState(CHARGING_STATE);

      // Show message in battle log
   //   BattleManager._logWindow.push(
    //    "addText",
      //  `${target.name()}'s concentration was broken!`
      );
    }
  };

})();