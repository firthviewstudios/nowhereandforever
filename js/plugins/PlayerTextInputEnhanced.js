/*:
 * @target MZ
 * @plugindesc (v1.2) Player text input: free typing or letter grid. Fully compatible with VisuStella.
 *
 * @command InputText
 * @text Get Text Input
 * @desc Shows a text input and stores the result in a variable.
 *
 * @arg Variable
 * @type variable
 * @text Store In Variable
 *
 * @arg Mode
 * @type select
 * @text Input Mode
 * @option Keyboard
 * @value keyboard
 * @option Letter Grid
 * @value grid
 * @default keyboard
 *
 * @arg Prompt
 * @type string
 * @text Prompt Message
 * @default Enter text:
 *
 * @arg MaxLength
 * @type number
 * @min 1
 * @max 20
 * @default 8
 */

(() => {
    let _pendingParams = null;

    PluginManager.registerCommand("PlayerTextInputEnhanced", "InputText", args => {
        _pendingParams = {
            variableId: Number(args.Variable),
            mode: String(args.Mode || "keyboard"),
            prompt: String(args.Prompt || "Enter text:"),
            maxLength: Number(args.MaxLength || 8)
        };

        if (_pendingParams.mode === "keyboard") {
            SceneManager.push(Scene_PlayerTextInput);
        } else {
            SceneManager.push(Scene_PlayerTextGrid);
        }
    });

    // === Keyboard Scene ===
    class Scene_PlayerTextInput extends Scene_MenuBase {
        create() {
            super.create();
            const params = _pendingParams;
            this._variableId = params.variableId;
            this._prompt = params.prompt;
            this._maxLength = params.maxLength;
            _pendingParams = null;

            this.createPromptWindow();
            this.createInputWindow();
        }

        createPromptWindow() {
            this._promptWindow = new Window_Base(new Rectangle(0, 0, Graphics.boxWidth, 72));
            this._promptWindow.drawText(this._prompt, 0, 0, Graphics.boxWidth, "center");
            this.addWindow(this._promptWindow);
        }

        createInputWindow() {
            const y = this._promptWindow.height;
            const rect = new Rectangle(0, y, Graphics.boxWidth, 120);
            this._inputWindow = new Window_PlayerTextInput(rect, this._maxLength, text => {
                $gameVariables.setValue(this._variableId, text);
                SceneManager.pop();
            });
            this.addWindow(this._inputWindow);
        }
    }

    class Window_PlayerTextInput extends Window_Base {
        constructor(rect, maxLength, onComplete) {
            super(rect);
            this._maxLength = maxLength;
            this._onComplete = onComplete;
            this._text = "";
            this.activate();
            this.refresh();
            this.setupKeyboardListener();
        }

        setupKeyboardListener() {
            this._keydownHandler = e => {
                if (!this.active) return;
                if (e.key.length === 1 && this._text.length < this._maxLength) {
                    this._text += e.key;
                    this.refresh();
                } else if (e.key === "Backspace") {
                    this._text = this._text.slice(0, -1);
                    this.refresh();
                    e.preventDefault();
                } else if (e.key === "Enter") {
                    this._onComplete(this._text);
                } else if (e.key === "Escape") {
                    this._onComplete("");
                }
            };
            window.addEventListener("keydown", this._keydownHandler);
        }

        deactivate() {
            super.deactivate();
            window.removeEventListener("keydown", this._keydownHandler);
        }

        refresh() {
            this.contents.clear();
            const text = this._text || "";
            this.drawText(text, 0, 0, this.contentsWidth(), "center");
            this.drawText(`(${text.length}/${this._maxLength})`, 0, this.lineHeight(), this.contentsWidth(), "center");
        }
    }

    // === Letter Grid Scene ===
    class Scene_PlayerTextGrid extends Scene_MenuBase {
        create() {
            super.create();
            const params = _pendingParams;
            this._variableId = params.variableId;
            this._maxLength = params.maxLength;
            _pendingParams = null;

            this._text = "";
            this._cursorIndex = 0;
            this._chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?.- ".split("");
            this._cols = 8;

            this.createPreviewWindow();
            this.createGridWindow();
        }

        createPreviewWindow() {
            const rect = new Rectangle(0, 0, Graphics.boxWidth, 72);
            this._previewWindow = new Window_Base(rect);
            this._previewWindow.refresh = () => {
                this._previewWindow.contents.clear();
                this._previewWindow.drawText(this._text, 0, 0, Graphics.boxWidth, "center");
                this._previewWindow.drawText(`(${this._text.length}/${this._maxLength})`, 0, 24, Graphics.boxWidth, "center");
            };
            this._previewWindow.refresh();
            this.addWindow(this._previewWindow);
        }

        createGridWindow() {
            const rect = new Rectangle(0, 72, Graphics.boxWidth, Graphics.boxHeight - 72);
            this._gridWindow = new Window_Base(rect);
            this._gridWindow.refresh = () => {
                const cw = this._gridWindow.contentsWidth() / this._cols;
                const ch = 32;
                this._gridWindow.contents.clear();
                for (let i = 0; i < this._chars.length; i++) {
                    const x = (i % this._cols) * cw;
                    const y = Math.floor(i / this._cols) * ch;
                    if (i === this._cursorIndex) {
                        this._gridWindow.contents.paintOpacity = 255;
                        this._gridWindow.contents.fillRect(x, y, cw, ch, 0x88FFFFFF);
                        this._gridWindow.contents.paintOpacity = 255;
                    }
                    this._gridWindow.drawText(this._chars[i], x, y, cw, "center");
                }
            };
            this._gridWindow.refresh();
            this.addWindow(this._gridWindow);
        }

        update() {
            super.update();
            if (Input.isRepeated("right")) this.moveCursor(1);
            if (Input.isRepeated("left")) this.moveCursor(-1);
            if (Input.isRepeated("up")) this.moveCursor(-this._cols);
            if (Input.isRepeated("down")) this.moveCursor(this._cols);
            if (Input.isTriggered("ok")) this.addChar();
            if (Input.isTriggered("cancel")) this.onCancel();
        }

        moveCursor(offset) {
            this._cursorIndex += offset;
            if (this._cursorIndex < 0) this._cursorIndex = 0;
            if (this._cursorIndex >= this._chars.length) this._cursorIndex = this._chars.length - 1;
            this._gridWindow.refresh();
        }

        addChar() {
            if (this._text.length < this._maxLength) {
                this._text += this._chars[this._cursorIndex];
                this._previewWindow.refresh();
            }
        }

        onCancel() {
            $gameVariables.setValue(this._variableId, this._text);
            SceneManager.pop();
        }
    }
})();
