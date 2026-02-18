(() => {
    const _VS_Scene_Name_start = Scene_Name.prototype.start;
    Scene_Name.prototype.start = function() {
        _VS_Scene_Name_start.call(this);

        if (this._nameInputWindow) {
            // Hide the original prompt if it exists
            if (this._nameInputWindow._messageWindow) {
                this._nameInputWindow._messageWindow.visible = false;
            }

            // Add custom prompt sprite if it doesn’t exist yet
            if (!this._customNamePrompt) {
                const windowX = this._nameInputWindow.x;
                const windowY = this._nameInputWindow.y;
                const windowWidth = this._nameInputWindow.width;

                const bitmap = new Bitmap(windowWidth - 20, 200); // width of prompt area
                this._customNamePrompt = new Sprite(bitmap);
                this._customNamePrompt.x = windowX + 10; // small padding
                this._customNamePrompt.y = windowY - 160; // place above the window
                this.addChild(this._customNamePrompt);

                const lines = [
                    "Type in this Character's name.",
                    "Press ENTER when you're done.",
                    "",
                    "-or-",
                    "",
                    "Press arrow keys/TAB to switch to manual character entry.",
                    "Press ESC/TAB to use the keyboard."
                ];

                const lineHeight = 28; // spacing between lines
                lines.forEach((line, i) => {
                    bitmap.drawText(line, 0, i * lineHeight, bitmap.width, lineHeight, "left");
                });
            }
        }
    };
})();
