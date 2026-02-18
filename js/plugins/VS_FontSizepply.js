/*:
 * @target MZ
 * @plugindesc Apply ConfigManager.textFontSize to all windows (works with VisuStella Options Core).
 * @help Place this plugin BELOW VisuStella Core and Options Core.
 */

(() => {
  const DEFAULT = 24;
  const MIN = 16;
  const MAX = 48;

  const clamp = v => Math.max(MIN, Math.min(MAX, v));

  // Keep any other plugin logic, then force our size.
  const _resetFontSettings = Window_Base.prototype.resetFontSettings;
  Window_Base.prototype.resetFontSettings = function() {
    _resetFontSettings.call(this);
    const v = Number(ConfigManager.textFontSize ?? DEFAULT);
    this.contents.fontSize = clamp(isNaN(v) ? DEFAULT : v);
  };

  // If something overwrote standardFontSize, we also override politely.
  const _standardFontSize = Window_Base.prototype.standardFontSize;
  Window_Base.prototype.standardFontSize = function() {
    const base = _standardFontSize.call(this);
    const v = Number(ConfigManager.textFontSize ?? base ?? DEFAULT);
    return clamp(isNaN(v) ? (base ?? DEFAULT) : v);
  };
})();
