/*:
 * @target MZ
 * @plugindesc Overrides VisuStella's chest SE logic: always play Chest 1 SE, skip additional SE for traps, fallback to Item3 for normal treasure.
 * @help Place below VisuStella Core and Quick Event plugins.
 *
 * To mark a chest as trapped, add the note <TrappedChest> to the event.
 */

(() => {
    const _VS_quickTreasure = Game_Interpreter.prototype.quickTreasure;

    Game_Interpreter.prototype.quickTreasure = function(...args) {
        const result = _VS_quickTreasure.call(this, ...args);

        const event = $gameMap.event(this._eventId);
        if (event) {
            // Always play the primary chest SE if it exists
            if (event._treasureSe) {
                AudioManager.playSe(event._treasureSe);
            }

            // Check if this chest is trapped
            const isTrapped = event.event().note.includes("<TrappedChest>");

            // Only play the additional Item3 sound for legitimate treasure chests
            if (!isTrapped) {
                const additionalSe = { name: "Item3", volume: 90, pitch: 100, pan: 0 };
                setTimeout(() => {
                    AudioManager.playSe(additionalSe);
                }, 50); // slight delay for sync
            }
        }

        return result;
    };
})();
