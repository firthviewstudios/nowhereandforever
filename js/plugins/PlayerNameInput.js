/*:
 * @target MZ
 * @plugindesc Name Input plugin using Window_NameEdit + letter grid, stores result in a variable.
 *
 * @command InputName
 * @text Get Name Input
 * @desc Shows a Name Input screen and stores result in a variable.
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

    PluginManager.registerCommand("PlayerNameInputProper", "InputName", args => {
        const variableId = Number(args.Variable);
        const maxLength = Number(args.MaxLength || 8);
        const promptText = String(args.Prompt || "Enter your name:");

        SceneManager.push(Scene_PlayerNameInputProper);
        const scene = SceneManager._scene;
        if (scene && scene.prepare) {
            scene.prepare({ variableId, maxLength, promptText });
        }
    });

    class Scene_PlayerNameInputProper extends Scene_MenuBase {
        prepare(params) {
            this._variableId = params.variableId;
            this._maxLength = params.maxLength;
            this._promptText = params.promptText || "";
        }

        create() {
            super.create();

            // Dummy actor to use Window_NameEdit
            this._actor = new Game_Actor(1); // actor ID 1 (can be unused in game)
            this._actor.setName(""); 

            this.createHelpWindow();
            this.createEditWindow();
            this.createInputWindow();
        }

        createHelpWindow() {
            const rect = new Rectangle(0, 0, Graphics.boxWidth, 48);
            this._helpWindow = new Window_Base(rect);
            this._helpWindow.drawText(this._promptText, 0, 0, Graphics.boxWidth, "center");
            this.addWindow(this._helpWindow);
        }

        createEditWindow() {
            const rect = new Rectangle(0, 48, Graphics.boxWidth, 48);
            this._editWindow = new Window_NameEdit(rect, this._actor.name(), this._maxLength);
            this.addWindow(this._editWindow);
        }

        createInputWindow() {
            const rect = new Rectangle(0, 96, Graphics.boxWidth, Graphics.boxHeight - 96);
            this._inputWindow = new Window_NameInputProper(rect, this._editWindow);
            this._inputWindow.setHandler("ok", this.onInputOk.bind(this));
            this._inputWindow.setHandler("cancel", this.popScene.bind(this));
            this.addWindow(this._inputWindow);

            this._editWindow.setHandler("cancel", this.popScene.bind(this));
        }

        onInputOk() {
            $gameVariables.setValue(this._variableId, this._editWindow.name());
            SceneManager.pop();
        }
    }

    class Window_NameInputProper extends Window_Selectable {
        constructor(rect, editWindow) {
            super(rect);
            this._editWindow = editWindow;
            this._chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.- ".split("");
            this._chars.push("<<Enter>>");
            this._cols = 8;
            this.refresh();
            this.select(0);
        }

        maxItems() {
            return this._chars.length;
        }

        maxCols() {
            return this._cols;
        }

        drawItem(index) {
            const cw = this.itemWidth();
            const ch = this.itemHeight();
            const x = (index % this._cols) * cw;
            const y = Math.floor(index / this._cols) * ch;
            if (this.isCurrentItemEnabled() && index === this.index()) {
                this.contents.paintOpacity = 128;
                this.contents.fillRect(x, y, cw, ch, 0xFFFFFFFF);
                this.contents.paintOpacity = 255;
            }
            this.drawText(this._chars[index], x, y, cw, "center");
        }

        itemWidth() {
            return Math.floor(this.contentsWidth() / this._cols);
        }

        itemHeight() {
            return 32;
        }

        update() {
            super.update();
            if (Input.isTriggered("ok")) {
                const char = this._chars[this.index()];
                if (char === "<<Enter>>") {
                    this.processOk();
                } else {
                    this._editWindow.add(char);
                }
            }
            if (Input.isTriggered("backspace")) {
                this._editWindow.back();
            }
        }
    }

})();
