/*:
 * @target MZ
 * @plugindesc Escape chance harder initially, easier on retries, with debug logging. v1.5
 */

(() => {
  let escapeAttempts = 0;

  // Reset attempts on battle start
  const _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function() {
    escapeAttempts = 0;
    console.log("Battle started - escape attempts reset");
    return _Scene_Battle_start.call(this);
  };

  // Override makeEscapeRatio to add custom escape difficulty & logging
  const _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
  BattleManager.makeEscapeRatio = function() {
    const baseRatio = 0.02; // very hard initially
    const maxRatio = 0.85;

    const partyAgi = $gameParty.agility();
    const troopAgi = $gameTroop.agility() || 1;

    // Agility influence softened
    const agiFactor = Math.sqrt(partyAgi / troopAgi);

    let ratio = baseRatio + escapeAttempts * 0.1;
    ratio *= agiFactor;

    ratio = Math.min(ratio, maxRatio);
    ratio = Math.max(ratio, 0.01);

    console.log(`Escape Calculation:
  Attempts: ${escapeAttempts}
  Base Ratio: ${baseRatio}
  Party Agility: ${partyAgi}
  Troop Agility: ${troopAgi}
  Agility Factor (sqrt): ${agiFactor.toFixed(4)}
  Calculated Ratio (clamped): ${ratio.toFixed(4)}`);

    return ratio;
  };

  // Count escape attempts & log on escape command selection
  const _Window_ActorCommand_callOkHandler = Window_ActorCommand.prototype.callOkHandler;
  Window_ActorCommand.prototype.callOkHandler = function() {
    if (this.currentSymbol() === 'escape') {
      escapeAttempts++;
      console.log(`Escape command selected! Attempt #${escapeAttempts}`);
    }
    return _Window_ActorCommand_callOkHandler.call(this);
  };

  // Log battle escape process calls
  const _Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
  Scene_Battle.prototype.commandEscape = function() {
    console.log('Scene_Battle.commandEscape called');
    return _Scene_Battle_commandEscape.call(this);
  };

  const _BattleManager_processEscape = BattleManager.processEscape;
  BattleManager.processEscape = function() {
    console.log('BattleManager.processEscape called');
    return _BattleManager_processEscape.call(this);
  };

  // Log updates during escape phase
  const _BattleManager_update = BattleManager.update;
  BattleManager.update = function() {
    const ret = _BattleManager_update.call(this);
    if (this._phase === 'escape') {
      console.log(`BattleManager.updateEscape: ratio=${this._escapeRatio?.toFixed(4)}, attempts=${escapeAttempts}, escaped=${this._escaped}`);
    }
    return ret;
  };
})();
