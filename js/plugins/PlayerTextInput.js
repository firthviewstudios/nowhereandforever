/*:
 * @target MZ
 * @plugindesc Player text input with preview, letter grid, prompt, Enter and Backspace. Actor-free.
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

    PluginManager.registerCommand("PlayerTextInput", "InputName", args => {
        const variableId = Number(args.Variable);
        const maxLength = Number(args.MaxLength || 8);
        const promptText = String(args.Prompt || "Enter your name:");

        SceneManager.push(Scene_PlayerTextInput);
        const scene = SceneManager._scene;
        if (scene && scene.prepare) {
            scene.prepare({ variableId, maxLength, promptText });
        }
    });

    class Scene_PlayerTextInput extends Scene_MenuBase {
        prepare(params) {
            this._variableId = params.variableId;
            this._maxLength = params.maxLength;
            this._promptText = params.promptText || "";
        }

        create() {
            super.create();

            this._text = "";
            this._cursorIndex = 0;
            this._chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.- ".split("");
            this._cols = 8;
            this._chars.push("<<Enter>>");

            this.createPromptWindow();
            this.createPreviewWindow();
            this.createGridWindow();
        }

        createPromptWindow() {
            const rect = new Rectangle(0, 0, Graphics.boxWidth, 48);
            this._promptWindow = new Window_Base(rect);
            this._promptWindow.refresh = () => {
                this._promptWindow.contents.clear();
                this._promptWindow.contents.fontSize = 24;
                this._promptWindow.drawText(this._promptText, 0, 0, Graphics.boxWidth, "center");
            };
            this.addWindow(this._promptWindow);
        }

        createPreviewWindow() {
            const rect = new Rectangle(0, 48, Graphics.boxWidth, 48);
            this._previewWindow = new Window_Base(rect);
            this._previewWindow.refresh = () => {
                this._previewWindow.contents.clear();
                this._previewWindow.contents.fontSize = 28;
                this._previewWindow.drawText(this._text, 0, 0, Graphics.boxWidth, "center");
                this._previewWindow.drawText(`(${this._text.length}/${this._maxLength})`, 0, 24, Graphics.boxWidth, "center");
            };
            this.addWindow(this._previewWindow);
        }

        createGridWindow() {
            const rect = new Rectangle(0, 96, Graphics.boxWidth, Graphics.boxHeight - 96);
            this._gridWindow = new Window_Selectable(rect);
            this._gridWindow._chars = this._chars;
            this._gridWindow._cols = this._cols;

            this._gridWindow.maxItems = function() { return this._chars.length; };
            this._gridWindow.maxCols = function() { return this._cols; };
            this._gridWindow.itemWidth = function() { return Math.floor(this.contentsWidth() / this._cols); };
            this._gridWindow.itemHeight = function() { return 32; };

            this._gridWindow.drawItem = function(index) {
                const cw = this.itemWidth();
                const ch = this.itemHeight();
                const x = (index % this._cols) * cw;
                const y = Math.floor(index / this._cols) * ch;
                if (index === this.index()) {
                    this.contents.paintOpacity = 128;
                    this.contents.fillRect(x, y, cw, ch, 0xFFFFFFFF);
                    this.contents.paintOpacity = 255;
                }
                this.drawText(this._chars[index], x, y, cw, "center");
            };

            this._gridWindow.select(0);
            this._gridWindow.refresh = this._gridWindow.refresh.bind(this._gridWindow);
            this.addWindow(this._gridWindow);
        }

        update() {
            super.update();
            const gw = this._gridWindow;
            if (!gw) return;

            if (Input.isRepeated("right")) this.moveCursor(1);
            if (Input.isRepeated("left")) this.moveCursor(-1);
            if (Input.isRepeated("up")) this.moveCursor(-this._cols);
            if (Input.isRepeated("down")) this.moveCursor(this._cols);

            if (Input.isTriggered("ok")) {
                const char = this._chars[this._cursorIndex];
                if (char === "<<Enter>>") {
                    this.confirmInput();
                } else {
                    this.addChar(char);
                }
            }

            if (Input.isTriggered("backspace")) this.removeChar();
        }

        moveCursor(offset) {
            this._cursorIndex += offset;
            if (this._cursorIndex < 0) this._cursorIndex = 0;
            if (this._cursorIndex >= this._chars.length) this._cursorIndex = this._chars.length - 1;
            this._gridWindow.refresh();
        }

        addChar(char) {
            if (this._text.length < this._maxLength) {
                this._text += char;
                this._previewWindow.refresh();
            }
        }

        removeChar() {
            if (this._text.length > 0) {
                this._text = this._text.slice(0, -1);
                this._previewWindow.refresh();
            }
        }

        confirmInput() {
            $gameVariables.setValue(this._variableId, this._text);
            SceneManager.pop();
        }
    }

})();
