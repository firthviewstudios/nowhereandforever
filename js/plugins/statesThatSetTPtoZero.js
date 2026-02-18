/*:
 * @target MZ
 * @plugindesc Resets TP to 0 immediately when specified states are added.
 * @help
 * Put the state IDs you want in the STATES_TO_ZERO_TP array.
 */

(() => {
  const STATES_TO_ZERO_TP = [42]; // Replace with your state IDs

  const _Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function(stateId) {
    const result = _Game_Battler_addState.call(this, stateId);
    if (STATES_TO_ZERO_TP.includes(stateId)) {
      this.setTp(0);
    }
    return result;
  };
})();
