/*:
 * @target MZ
 * @plugindesc Dark Fantasy menu color override for VisuStella Core Engine windows © ChatGPT
 */

(() => {
  // Save original VisuStella _refreshBack if exists
  const _VS_Window_refreshBack = Window.prototype._refreshBack;

  Window.prototype._refreshBack = function() {
    if (!this._windowBackSprite) return;

    // Your dark fantasy gradient
    const m = 4;
    const w = this._width - m * 2;
    const h = this._height - m * 2;
    const color1 = "#2E003E"; // deep purple
    const color2 = "#4A001F"; // crimson red

    const bitmap = new Bitmap(w, h);
    bitmap.gradientFillRect(0, 0, w, h, color1, color2, true);
    this._windowBackSprite.bitmap = bitmap;
    this._windowBackSprite.setFrame(0, 0, w, h);
    this._windowBackSprite.move(m, m);

    // Call original VisuStella method just in case it does something else
    if (_VS_Window_refreshBack) _VS_Window_refreshBack.call(this);
  };

  // Text color override
  const _Window_Base_resetTextColor = Window_Base.prototype.resetTextColor;
  Window_Base.prototype.resetTextColor = function() {
    this.changeTextColor("#EDE6D1"); // pale ivory
  };
})();
