/*:
 * @target MZ
 * @plugindesc (v1.0) Shows the letter selection (Name Input) scene and stores result into a variable.
 * @help
 * This uses the built-in Name Input scene but saves the result into a variable
 * instead of changing an actor's name.
 *
 * Plugin Command:
 *   InputGrid
 *       Opens the letter grid (Name Input) screen and stores text in a variable.
 *
 * @command InputGrid
 * @text Get Text via Letter Grid
 * @desc Opens the name input screen and stores the result in a variable.
 *
 * @arg Variable
 * @type variable
 * @text Store In Variable
 * @desc The game variable where the result will be stored.
 *
 * @arg MaxLength
 * @type number
 * @min 1
 * @max 12
 * @default 8
 * @text Max Length
 * @desc Maximum number of characters allowed.
 */

(() => {
    let _pendingGridParams = null;

    PluginManager.registerCommand("PlayerTextInputGrid", "InputGrid", args => {
        _pendingGridParams = {
            variableId: Number(args.Variable),
            maxLength: Number(args.MaxLength || 8)
        };
        SceneManager.push(Scene_PlayerTextGrid);
    });

    class Scene_PlayerTextGrid extends Scene_Name {
        prepare() {
            // Fake actor to reuse Scene_Name without renaming a real one
            this._actorId = $gameParty.leader() ? $gameParty.leader().actorId() : 1;
            this._maxLength = _pendingGridParams.maxLength;
            _pendingGridParams = null;
        }

        create() {
            this.prepare();
            super.create();
        }

        onInputOk() {
            // When the player confirms, store result in variable
            const variableId = _pendingGridParams ? _pendingGridParams.variableId : null;
            if (variableId) {
                $gameVariables.setValue(variableId, this._editWindow.name());
            }
            SceneManager.pop();
        }
    }
})();
