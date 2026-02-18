/*:
 * @target MZ
 * @plugindesc Shows map name on save/load menu and logs map name on load for debugging. Compatible with VisuStella Save Core.
 * @author ChatGPT
 *
 * @help
 * 📌 Features:
 * - Saves the map's display name to the save data.
 * - Shows the map name in the save/load screen.
 * - Logs the loaded map name to the console (press F8) after loading.
 *
 * ✅ Make sure your maps have a "Display Name" set in Map Properties.
 * ✅ Place this plugin below VisuStella Save Core in the Plugin Manager.
 */

(() => {
  // Save map name into save file (ext.mapName)
  const _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    const contents = _DataManager_makeSaveContents.call(this);
    if (!contents.ext) contents.ext = {};
    contents.ext.mapName = $gameMap.displayName();
    console.log('[Save] Saving map name:', contents.ext.mapName);
    return contents;
  };

  // Log the loaded map name for debug purposes
  const _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    if (contents.ext && contents.ext.mapName) {
      console.log('[Load] Loaded map name:', contents.ext.mapName);
    } else {
      console.warn('[Load] No map name found in save data.');
    }
  };

  // Draw the map name on the save/load screen
  const _Window_SavefileList_drawSavefileInfo = Window_SavefileList.prototype.drawSavefileInfo;
  Window_SavefileList.prototype.drawSavefileInfo = function (info, x, y, width) {
    _Window_SavefileList_drawSavefileInfo.call(this, info, x, y, width);
    if (info && info.ext && info.ext.mapName) {
      const lineHeight = this.lineHeight();
      this.drawText(`Map: ${info.ext.mapName}`, x, y + lineHeight * 2, width);
    }
  };
})();
