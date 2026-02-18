/*:
 * @target MZ
 * @plugindesc Controls battle "Switch" command with a game switch + hides it for Actor #2.
 * @help
 * - Game switch #1000 controls showing the Switch command.
 * - Actor ID 2 never sees the Switch command, even if switch #1000 is ON.
 *
 * Place BELOW all VisuStella battle plugins.
 */

(() => {
  const CONTROL_SWITCH_ID = 1000; // ← your existing switch
  const HIDE_FOR_ACTOR_ID = 2;    // ← actor who should NOT have the command

  const _addCommand = Window_ActorCommand.prototype.addCommand;

  Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled, ext) {
    // If this is the Switch command ("formation")
    if (symbol === "formation") {

      // 1. Hide completely if the swap system switch is OFF
      if (!$gameSwitches.value(CONTROL_SWITCH_ID)) {
        return;
      }

      // 2. Hide only for Actor #2
      const actor = this._actor;
      if (actor && actor.actorId() === HIDE_FOR_ACTOR_ID) {
        return; // Do not add the Switch command
      }

      // 3. For all other actors, show and enable it
      enabled = true;
    }

    _addCommand.call(this, name, symbol, enabled, ext);
  };

})();
