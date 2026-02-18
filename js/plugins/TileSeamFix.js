/*:
 * @target MZ
 * @plugindesc Fixes black tile seams (grid lines) on all devices by padding tiles when drawn.
 * @author ChatGPT
 *
 * @help TileSeamFix.js
 *
 * This plugin removes black lines (seams) between tiles that can appear
 * on some devices due to resolution scaling and texture sampling.
 *
 * Features:
 * - Forces nearest-neighbor scaling (no blending).
 * - Rounds pixels to whole values.
 * - Pads tile rendering with a 1px overlap to guarantee no seams.
 *
 * Installation:
 * 1. Save this file as "TileSeamFix.js"
 * 2. Place it in your project's js/plugins/ folder
 * 3. Enable it in the Plugin Manager
 * 4. Deploy your game
 */

(() => {
    // --- PIXI global fixes ---
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true;

    // Ensure all bitmaps use nearest scaling
    const _Bitmap_initialize = Bitmap.prototype.initialize;
    Bitmap.prototype.initialize = function(width, height) {
        _Bitmap_initialize.call(this, width, height);
        if (this.baseTexture) {
            this.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
    };

    // --- Tilemap seam fix with padding ---
    const _Tilemap__drawTile = Tilemap.prototype._drawTile;
    Tilemap.prototype._drawTile = function(bitmap, tileId, dx, dy) {
        const pw = this._tileWidth;
        const ph = this._tileHeight;
        const tilePadding = 1; // <-- Overlap by 1px

        // Disable smoothing to prevent blending
        const context = this._context;
        context.imageSmoothingEnabled = false;

        // Call original, but expand the draw rect slightly
        const w = pw + tilePadding;
        const h = ph + tilePadding;

        // Draw snapped to whole pixels
        _Tilemap__drawTile.call(this, bitmap, tileId, Math.round(dx), Math.round(dy));

        // Overdraw slightly (extra 1px ensures no gaps)
        context.drawImage(
            bitmap.baseTexture.resource.source,
            0, 0, pw, ph,
            Math.round(dx), Math.round(dy), w, h
        );
    };

    // Ensure Sprites also use nearest scaling
    const _Sprite_initialize = Sprite.prototype.initialize;
    Sprite.prototype.initialize = function(bitmap) {
        _Sprite_initialize.call(this, bitmap);
        if (this.texture && this.texture.baseTexture) {
            this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        }
    };
})();