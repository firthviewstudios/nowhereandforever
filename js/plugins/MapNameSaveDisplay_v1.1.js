/*:
 * @target MZ
 * @plugindesc Save files display map name and current party, like the standard layout. (v1.1) — By ChatGPT
 * 
 * @help
 * This plugin changes the save/load screen to show the current map's name instead of
 * "File 1", "File 2", etc., and keeps the default actor face display.
 *
 * It uses the map's Display Name (set in Map Properties). If no display name is given,
 * it uses the map's internal name as fallback.
 *
 * No plugin commands.
 */

(() => {
    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        info.mapDisplayName = $dataMap.displayName || $dataMapInfos[$gameMap.mapId()].name;
        return info;
    };

    const _Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
    Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
        const bottom = rect.y + rect.height;
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight;

        // Draw party faces (same as default)
        if (info && info.faces) {
            for (let i = 0; i < info.faces.length; i++) {
                const face = info.faces[i];
                const x = rect.x + i * 78;
                this.drawFace(face[0], face[1], x, y2, 144);
            }
        }

        // Draw map name as title (instead of File 1, File 2, etc.)
        this.resetTextColor();
        if (info) {
            const mapName = info.mapDisplayName || "Unknown Map";
            this.contents.fontSize = $gameSystem.mainFontSize(); // Use standard font size
            this.drawText(mapName, rect.x + 180, rect.y, rect.width - 180);
        }
    };
})();
