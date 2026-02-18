/*:
 * @target MZ
 * @plugindesc Enables mouse-wheel scrolling for the WD_Quest description window (no font changes).
 * @author ChatGPT
 *
 * @help
 * Place this plugin BELOW WD_Quest.js.
 * This plugin waits until Scene_Quest exists before patching.
 */

(() => {
  function patchSceneQuest() {
    if (typeof Scene_Quest === "undefined") return false;

    const _update = Scene_Quest.prototype.update;
    Scene_Quest.prototype.update = function() {
      _update.call(this);

      const win = this._questInfoWindow;
      if (!win || !win.contents) return;

      // Allow vertical scrolling if content overflows
      const maxY = Math.max(0, win.contents.height - win.innerHeight);
      win.setScrollLimit(0, maxY);

      // Mouse wheel scrolling
      if (win.isTouchedInsideFrame()) {
        win.processWheelScroll();
      }
    };

    return true;
  }

  // Try immediately, otherwise retry once per frame until Scene_Quest exists
  if (!patchSceneQuest()) {
    const _SceneManager_update = SceneManager.update;
    SceneManager.update = function() {
      _SceneManager_update.call(this);
      patchSceneQuest();
    };
  }
})();
