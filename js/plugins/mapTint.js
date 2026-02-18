(() => {
  const initialTintCommonEventId = 3;    // Tint on map enter
  const preBattleUntintCommonEventId = 4; // Untint before battle starts
  const postBattleTintCommonEventId = 3;  // Tint again after battle ends
  const allowedMaps = [150,151, 152, 147,153,154,155,156,157,158,159];    // Your map IDs

  // Initialize lastMapId safely or zero
  let lastMapId = ($gameMap && $gameMap.mapId) ? $gameMap.mapId() : 0;

  // Run tint on map enter
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    if (!$gameMap || !$gameMap.mapId) return; // safety check

    const currentMapId = $gameMap.mapId();
    if (currentMapId !== lastMapId) {
      if (allowedMaps.includes(currentMapId)) {
        $gameTemp.reserveCommonEvent(initialTintCommonEventId);
        console.log(`Map changed to ${currentMapId}. Running initial tint CE: ${initialTintCommonEventId}`);
      }
      lastMapId = currentMapId;
    }
  };

  // Run untint before battle starts
  const _BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function() {
    if ($gameMap && $gameMap.mapId && allowedMaps.includes($gameMap.mapId())) {
      $gameTemp.reserveCommonEvent(preBattleUntintCommonEventId);
      console.log(`Battle starting on map ${$gameMap.mapId()}. Running pre-battle untint CE: ${preBattleUntintCommonEventId}`);
    }
    _BattleManager_startBattle.call(this);
  };

  // Run tint again after battle ends
  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function(result) {
    _BattleManager_endBattle.call(this, result);
    if ($gameMap && $gameMap.mapId && allowedMaps.includes($gameMap.mapId())) {
      $gameTemp.reserveCommonEvent(postBattleTintCommonEventId);
      console.log(`Battle ended on map ${$gameMap.mapId()}. Running post battle tint CE: ${postBattleTintCommonEventId}`);
    }
  };
})();
