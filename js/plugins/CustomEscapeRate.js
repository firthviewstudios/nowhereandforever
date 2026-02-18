(() => {
  const pluginName = "CustomEscapeRate";
  const params = PluginManager.parameters(pluginName);
  const baseRate = Number(params["Base Escape Rate"] || 0.2);
  const increasePerFail = Number(params["Increase Per Fail"] || 0.05);
  const agiAdvantageMultiplier = Number(params["AGI Advantage Multiplier"] || 1.25);
  const minRate = Number(params["Min Escape Rate"] || 0.05);
  const maxRate = Number(params["Max Escape Rate"] || 0.85);
  const useAgi = params["Use AGI Influence"] === "true";

  Game_Troop.prototype.makeEscapeRatio = function () {
    let ratio = baseRate;

    const partyAgi = $gameParty.agility();
    const troopAgi = this.agility();
    let agiRatio = 1;

    if (useAgi && troopAgi > 0) {
      agiRatio = partyAgi / troopAgi;
      agiRatio = Math.min(Math.max(agiRatio, 0.5), 1.5);
      ratio *= agiRatio;
    }

    const attempts = BattleManager._escapeAttempts || 0;

    let adjustedIncrease = increasePerFail;
    if (partyAgi > troopAgi) {
      adjustedIncrease *= agiAdvantageMultiplier;
    }

    ratio += attempts * adjustedIncrease;

    ratio = Math.max(minRate, Math.min(maxRate, ratio));

    this._escapeRatio = ratio;

    return ratio;
  };

  // Hook escape start to show popup message
  const _BattleManager_startEscape = BattleManager.startEscape;
  BattleManager.startEscape = function () {
    _BattleManager_startEscape.call(this);

    const ratio = $gameTroop.makeEscapeRatio();
    const percent = Math.round(ratio * 100);
    $gameMessage.add(`Escape chance: ${percent}%`);
  };
})();
