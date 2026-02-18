/*:
 * @target MZ
 * @plugindesc Fix map name window trimming by resizing and repositioning after VisuStella setup. Preserves background and avoids duplication.  
 * @author ChatGPT
 */

(() => {
    const _Scene_Map_createMapNameWindow = Scene_Map.prototype.createMapNameWindow;
    Scene_Map.prototype.createMapNameWindow = function() {
        _Scene_Map_createMapNameWindow.call(this);

        const win = this._mapNameWindow;

        // Delay resize slightly to override VisuStella sizing
        setTimeout(() => {
            const text = $gameMap.displayName();
            const padding = win.padding * 2;
            const extraPadding = 60;
            const minWidth = 220;
            const maxWidth = Graphics.boxWidth * 0.8;
            const textWidth = win.textWidth(text);

            let width = textWidth + padding + extraPadding;
            if (width < minWidth) width = minWidth;
            if (width > maxWidth) width = maxWidth;

            win.width = Math.floor(width);
            win.x = 0;
            win.y = 10;

            // Recreate the bitmap to match new size
            win.createContents();
            win.refresh();
        }, 10); // short delay to let VisuStella finish
    };
})();
