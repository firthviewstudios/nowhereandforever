(() => {
  const troopsToOffset =  [14,15, 96, 97, 98, 99, 100, 101, 102, 103,118,119,120,121,122,123,124,125,126];
  const partyYOffset = 60;

  let currentTroopId = 0;

  // Track troop ID on battle start
  const _BattleManager_setup = BattleManager.setup;
  BattleManager.setup = function(troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
    currentTroopId = troopId;
  };

  // Reset on battle end
  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function(result) {
    currentTroopId = 0;
    _BattleManager_endBattle.call(this, result);
  };

  // Patch updateActors to shift actor sprites vertically
  const _Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
  Spriteset_Battle.prototype.updateActors = function() {
    _Spriteset_Battle_updateActors.call(this);

    if (troopsToOffset.includes(currentTroopId)) {
      this._actorSprites.forEach(sprite => {
        sprite.y += partyYOffset;
      });
    }
  };
})();
