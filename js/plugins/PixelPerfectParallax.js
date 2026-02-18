/*:
 * @target MZ
 * @plugindesc Pixel-perfect parallax scrolling with automatic right/bottom edge extension to fix seams.
 * @author ChatGPT
 *
 * @param EnableSeamFix
 * @text Enable Seam Fix
 * @type boolean
 * @default true
 * @desc Automatically extend parallax edges to prevent 1px lines.
 *
 * @param ExtendWidth
 * @text Extend Width (px)
 * @type number
 * @decimals 1
 * @default 2
 * @desc Extra width in pixels to draw beyond screen width (prevents right-edge line)
 *
 * @param ExtendHeight
 * @text Extend Height (px)
 * @type number
 * @decimals 1
 * @default 2
 * @desc Extra height in pixels to draw beyond screen height (prevents bottom-edge line)
 */

(() => {
  const params = PluginManager.parameters("PixelPerfectParallax");
  const enableSeamFix = params["EnableSeamFix"] === "true";
  const extendW = Number(params["ExtendWidth"] || 2);
  const extendH = Number(params["ExtendHeight"] || 2);

  const _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
  Spriteset_Map.prototype.updateParallax = function() {
    const map = $gameMap;
    const bg = this._parallax;
    if (!bg || !map.parallaxName()) return;

    const pw = map.tileWidth();
    const ph = map.tileHeight();
    const sx = Math.floor(map.displayX() * pw);
    const sy = Math.floor(map.displayY() * ph);

    // Pixel-perfect origin
    bg.origin.x = sx;
    bg.origin.y = sy;

    // Automatic edge extension for seams
    if (enableSeamFix) {
      if (map.isLoopHorizontal()) bg.width = Graphics.width + extendW;
      if (map.isLoopVertical()) bg.height = Graphics.height + extendH;
    }

    _Spriteset_Map_updateParallax.call(this);
  };

  // Clamp WebGL texture to prevent subpixel wrap artifacts
  const _Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
  Spriteset_Map.prototype.createParallax = function() {
    _Spriteset_Map_createParallax.call(this);
    if (this._parallax && this._parallax.bitmap && this._parallax.bitmap.baseTexture) {
      const tex = this._parallax.bitmap.baseTexture;
      tex.wrapMode = PIXI.WRAP_MODES.CLAMP;
    }
  };
})();
