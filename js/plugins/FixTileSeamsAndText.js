/*:
 * @target MZ
 * @plugindesc Fix Android tile seams while keeping all text smooth (battle included).
 * @help
 * Forces ROUND_PIXELS only when rendering the tilemap.
 * Text and UI always render smooth.
 */

(() => {
    // Wrap tilemap rendering
    const _Tilemap__renderCanvas = Tilemap.prototype._renderCanvas;
    Tilemap.prototype._renderCanvas = function(renderer) {
        const oldRound = PIXI.settings.ROUND_PIXELS;
        PIXI.settings.ROUND_PIXELS = true; // Snap pixels only for tiles
        _Tilemap__renderCanvas.call(this, renderer);
        PIXI.settings.ROUND_PIXELS = oldRound; // Restore for text/UI
    };

    const _Tilemap__renderWebGL = Tilemap.prototype._renderWebGL;
    Tilemap.prototype._renderWebGL = function(renderer) {
        const oldRound = PIXI.settings.ROUND_PIXELS;
        PIXI.settings.ROUND_PIXELS = true; // Snap pixels only for tiles
        _Tilemap__renderWebGL.call(this, renderer);
        PIXI.settings.ROUND_PIXELS = oldRound; // Restore for text/UI
    };
})();
