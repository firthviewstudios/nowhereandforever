(() => {
  const troopsToOffset = [14, 96, 97, 98, 99, 100, 101, 102, 103];
  const partyYOffset = 150;

  let currentTroopId = 0;

  // Track current troop on battle start
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

  // Patch Spriteset_Battle.updateActorPosition(actor, index)
  const _Spriteset_Battle_updateActorPosition = Spriteset_Battle.prototype.updateActorPosition;
  Spriteset_Battle.prototype.updateActorPosition = function(sprite, index) {
    _Spriteset_Battle_updateActorPosition.call(this, sprite, index);

    if (troopsToOffset.includes(currentTroopId)) {
      sprite.y += partyYOffset;
    }
  };
})();
