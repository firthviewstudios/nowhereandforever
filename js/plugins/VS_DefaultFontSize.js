/*:
 * @target MZ
 * @plugindesc Force and sync VisuStella Core Engine's default font size with Options Core. v1.2
 * @author You
 *
 * @param FontSize
 * @text Default Font Size
 * @type number
 * @min 8
 * @max 72
 * @default 24
 * @desc The default font size to use for all windows and text.
 *
 * @help
 * Plugin Name: VS_DefaultFontSize
 *
 * 🔹 Place BELOW VisuMZ_0_CoreEngine (and VisuMZ_1_OptionsCore if used).
 * 🔹 Works for new games and boots.
 * 🔹 Keeps the Options menu’s "Font Size" value in sync.
 *
 * Features:
 * - Overrides the Core Engine’s hardcoded 28px default.
 * - Updates VisuStella’s $gameSystem and ConfigManager values on boot.
 * - Works seamlessly across all platforms (Windows, Web, Android).
 */

(() => {
  const PLUGIN_NAME = "VS_DefaultFontSize";
  const params = PluginManager.parameters(PLUGIN_NAME);
  const FONT_SIZE = Number(params["FontSize"] || 24);

  //------------------------------------------------------------
  // 1️⃣  Override VisuStella Core Engine init default
  //------------------------------------------------------------
  const _initCoreEngine = Game_System.prototype.initCoreEngine;
  Game_System.prototype.initCoreEngine = function() {
    _initCoreEngine.call(this);
    this._CoreEngineSettings["MainFontSize"] = FONT_SIZE;
  };

  //------------------------------------------------------------
  // 2️⃣  Force value again after Core Engine finishes booting
  //------------------------------------------------------------
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.call(this);
    if ($gameSystem?.setMainFontSize) {
      $gameSystem.setMainFontSize(FONT_SIZE);
    }

    // 🔹 Sync ConfigManager value so Options UI shows correct size
    if (ConfigManager && typeof ConfigManager.textFontSize !== "undefined") {
      if (ConfigManager.textFontSize !== FONT_SIZE) {
        ConfigManager.textFontSize = FONT_SIZE;
      }
    }
  };
})();
