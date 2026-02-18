(() => {
  const BASE_STEPS = 95;
  const STEP_VARIANCE = 25;
  const DISABLE_SWITCH_ID = 2;

  let stepCounter = 0;
  let encounterThreshold = BASE_STEPS + Math.floor(Math.random() * (STEP_VARIANCE * 2 + 1)) - STEP_VARIANCE;

  console.log(`[GlobalEncounter] Plugin loaded. First threshold: ${encounterThreshold} steps.`);

  // Disable RPG Maker's native encounter count
  Game_Player.prototype.makeEncounterCount = function () {
    this._encounterCount = 999999;
  };

// Helper: Check if player is standing on a transfer event
function isOnTransferEvent() {
  const events = $gameMap.eventsXy($gamePlayer.x, $gamePlayer.y);
  return events.some(event => {
    const page = event.page();
    if (!page || !Array.isArray(page.list)) return false;
    return page.list.some(command => command.code === 201); // 201 = Transfer Player command
  });
}
  const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
  Game_Player.prototype.increaseSteps = function () {
    _Game_Player_increaseSteps.call(this);

    if (!$gameMap.encounterList().length) return;

    if ($gameSwitches.value(DISABLE_SWITCH_ID)) {
      console.log(`[GlobalEncounter] Step skipped — Switch ${DISABLE_SWITCH_ID} is ON`);
      return;
    }

    if (isOnTransferEvent()) {
      console.log(`[GlobalEncounter] Step skipped — Player on Transfer Event tile`);
      return;
    }

    stepCounter++;
    console.log(`[GlobalEncounter] Step counted: ${stepCounter}/${encounterThreshold}`);

    if (stepCounter >= encounterThreshold) {
      const troopId = this.makeEncounterTroopId();
      if (this.canEncounter() && troopId > 0) {
        console.log(`[GlobalEncounter] Encounter triggered with Troop ID: ${troopId}`);
        stepCounter = 0;
        encounterThreshold = BASE_STEPS + Math.floor(Math.random() * (STEP_VARIANCE * 2 + 1)) - STEP_VARIANCE;
        console.log(`[GlobalEncounter] New threshold set: ${encounterThreshold}`);

        $gameTroop.setup(troopId);
        BattleManager.setup(troopId, true, false);
        BattleManager.onEncounter();
        SceneManager.push(Scene_Battle);
      } else {
        console.log(`[GlobalEncounter] Encounter blocked or no valid troop.`);
        stepCounter = 0;
        encounterThreshold = BASE_STEPS + Math.floor(Math.random() * (STEP_VARIANCE * 2 + 1)) - STEP_VARIANCE;
      }
    }
  };

  // Optional script call to reset the step counter manually
  window.resetEncounterStepCounter = function () {
    stepCounter = 0;
    encounterThreshold = BASE_STEPS + Math.floor(Math.random() * (STEP_VARIANCE * 2 + 1)) - STEP_VARIANCE;
    console.log(`[GlobalEncounter] Counter reset manually. New threshold: ${encounterThreshold}`);
  };
})();
