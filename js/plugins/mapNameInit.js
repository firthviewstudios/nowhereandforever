/*:
 * @target MZ
 * @plugindesc Map Name Window: Top-left with more transparent black background and centered text [v1.9] — by ChatGPT
 * @author ChatGPT
 * @help
 * Shows the map name top-left with a semi-transparent black background box
 * at 40% opacity and centered text.
 */

(() => {
    Window_MapName.prototype.initialize = function() {
        const width = 340; // width with padding
        const height = this.fittingHeight(1);
        const x = 0;
        const y = 0;
        const rect = new Rectangle(x, y, width, height);
        Window_Base.prototype.initialize.call(this, rect);
        this._showCount = 0;
        this.refresh();
        this.opacity = 0; // Hide default background/frame fill
    };

    Window_MapName.prototype.standardBackOpacity = function() {
        return 0; // No default window background opacity
    };

    Window_MapName.prototype.updateBackground = function() {
        this.setBackgroundType(2); // Transparent background (no dim or frame)
    };

    Window_MapName.prototype.refresh = function() {
        const mapName = $gameMap.displayName();
        this.contents.clear();
        if (mapName) {
            // Draw semi-transparent black box behind text (40% opacity)
            this.contents.fillRect(0, 0, this.contentsWidth(), this.contentsHeight(), 'rgba(0, 0, 0, 0.4)');

            const x = 0;
            const y = 0;
            const maxWidth = this.contentsWidth();
            this.drawText(mapName, x, y, maxWidth, 'center');
        }
    };
})();
