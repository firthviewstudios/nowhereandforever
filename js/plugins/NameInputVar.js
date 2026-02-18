/*:
 * @target MZ
 * @plugindesc Uses default Name Input screen with a real temporary actor, stores input in a variable.
 *
 * @command InputName
 * @text Get Name Input
 * @desc Shows the Name Input screen and stores result in a variable.
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
    const TEMP_ACTOR_ID = 20; // dummy actor ID, not used in the game

    PluginManager.registerCommand("NameInputVar", "InputName", args => {
        const variableId = Number(args.Variable);
        const maxLength = Number(args.MaxLength || 8);
        const promptText = String(args.Prompt || "Enter your name:");

        // Create temporary actor if it doesn't exist
        if (!$gameActors.actor(TEMP_ACTOR_ID)) {
            const data = JSON.parse(JSON.stringify($dataActors[1])); // clone default actor
            data.id = TEMP_ACTOR_ID;
            $dataActors[TEMP_ACTOR_ID] = data;
            $gameActors._data[TEMP_ACTOR_ID] = new Game_Actor(TEMP_ACTOR_ID);
        }

        const tempActor = $gameActors.actor(TEMP_ACTOR_ID);
        const originalName = tempActor.name();
        tempActor.setName("".padEnd(maxLength, " "));

        // Push Name Input scene
        SceneManager.push(Scene_Name);

        const scene = SceneManager._scene;

        // Prepare scene with temp actor
        if (scene.prepare) scene.prepare(tempActor, maxLength);

        // Add a prompt window
        const originalCreate = Scene_Name.prototype.create;
        Scene_Name.prototype.create = function() {
            originalCreate.call(this);
            const rect = new Rectangle(0, 0, Graphics.boxWidth, 72);
            this._promptWindow = new Window_Base(rect);
            this._promptWindow.drawText(promptText, 0, 0, Graphics.boxWidth, "center");
            this.addWindow(this._promptWindow);

            // Shift the edit window down
            this._editWindow.y = rect.height + 16;
        };

        // Override OK
        const _Scene_Name_onInputOk = Scene_Name.prototype.onInputOk;
        Scene_Name.prototype.onInputOk = function() {
            $gameVariables.setValue(variableId, this._actor.name());
            tempActor.setName(originalName); // restore dummy actor name
            Scene_Name.prototype.create = originalCreate;
            Scene_Name.prototype.onInputOk = _Scene_Name_onInputOk;
            _Scene_Name_onInputOk.call(this);
        };
    });
})();
