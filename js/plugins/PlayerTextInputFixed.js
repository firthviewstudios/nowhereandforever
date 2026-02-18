/*:
 * @target MZ
 * @plugindesc Actor 20 Name Input for player text input, stores result in a variable. Fully compatible with VisuStella.
 *
 * @command InputName
 * @text Get Name Input
 * @desc Shows standard Name Input window using actor 20 and stores result in a variable.
 *
 * @arg Variable
 * @type variable
 * @text Store In Variable
 *
 * @arg MaxLength
 * @type number
 * @min 1
 * @max 12
 * @default 8
 *
 * @arg Prompt
 * @type string
 * @text Prompt Text
 * @default Enter your name:
 */

(() => {

    // -----------------------------
    // Plugin command
    // -----------------------------
    PluginManager.registerCommand("PlayerTextInputFixed", "InputName", args => {
        const variableId = Number(args.Variable);
        const maxLength = Number(args.MaxLength || 8);
        const promptText = String(args.Prompt || "Enter your name:");

        SceneManager.push(Scene_PlayerNameInput);
        const scene = SceneManager._scene;
        if (scene && scene.prepare) {
            scene.prepare({ variableId, maxLength, prompt: promptText });
        }
    });

    // -----------------------------
    // Scene using standard Name Input and actor 20
    // -----------------------------
    class Scene_PlayerNameInput extends Scene_Name {
        prepare(params) {
            this._variableId = params.variableId;
            this._maxLength = params.maxLength;
            this._prompt = params.prompt || "Enter your name:";

            // Safely get actor 20 or create it if undefined
            let dummyActor = $gameActors.actor(20);
            if (!dummyActor) {
                $gameActors._data[20] = new Game_Actor(20);
                dummyActor = $gameActors.actor(20);
            }

            // Clear name for input
            dummyActor._name = "";
            this._actor = dummyActor;
            this._actorId = dummyActor.actorId;
        }

        create() {
            // Ensure actor is set before super.create
            this._actorId = this._actor.actorId;
            this._actor = this._actor;
            super.create();
        }

        start() {
            super.start();

            // Optional: set prompt text
            if (this._editWindow && this._prompt) {
                this._editWindow._promptText = this._prompt;
            }

            // Override OK handler to store result in variable
            this._editWindow.setHandler("ok", this.onNameOk.bind(this));
        }

        onNameOk() {
            $gameVariables.setValue(this._variableId, this._actor.name);
            SceneManager.pop();
        }
    }

})();
