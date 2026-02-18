/*:
 * @target MZ
 * @plugindesc Save files display map name instead of "File 1", "File 2", etc. (v1.0)
 * @author ChatGPT
 * 
 * @help
 * This plugin changes the displayed save file name to the current map's display name.
 * If the map has no display name set, it uses the map's internal name from the editor.
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
        this.resetTextColor();
        if (info) {
            const mapName = info.mapDisplayName || "Unknown Map";
            this.drawText(mapName, rect.x + 180, rect.y, rect.width - 180);
        }
    };
})();
