/*:
 * @target MZ
 * @plugindesc Backend debug logger for all dice‑game variables and switches. No UI, logs to console only.
 * @author Liam
 *
 * @help
 * This plugin automatically logs changes to all variables and switches
 * involved in the elemental dice game. No switches, no UI, no commands.
 *
 * Open the console with F8 to see logs.
 */

(() => {

    // === CONFIGURE YOUR VARIABLE & SWITCH IDS HERE ===
    const trackedVariables = [
        181,182,183,   // P1 dice rolls
        184,185,186,   // P1 result text
        187,188,189,   // P2 dice rolls
        190,191,192,   // P2 result text
        194,195,       // working scores
        181,182,183,187,188,189 // raw dice values
    ];

    const trackedSwitches = [
        981,982,983,   // P1 symbols
        984,985,986    // P2 symbols
    ];

    // Timestamp helper
    function stamp() {
        return new Date().toISOString().split("T")[1].split(".")[0];
    }

    // === OVERRIDE VARIABLE SETTER ===
    const _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function (variableId, newValue) {
        const oldValue = this.value(variableId);

        _Game_Variables_setValue.call(this, variableId, newValue);

        if (trackedVariables.includes(variableId)) {
            console.log(
                `[${stamp()}] VAR ${variableId} changed: ${oldValue} → ${newValue}`,
                new Error().stack.split("\n")[2] // show caller
            );
        }
    };

    // === OVERRIDE SWITCH SETTER ===
    const _Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function (switchId, newValue) {
        const oldValue = this.value(switchId);

        _Game_Switches_setValue.call(this, switchId, newValue);

        if (trackedSwitches.includes(switchId)) {
            console.log(
                `[${stamp()}] SWITCH ${switchId} changed: ${oldValue} → ${newValue}`,
                new Error().stack.split("\n")[2]
            );
        }
    };

})();
