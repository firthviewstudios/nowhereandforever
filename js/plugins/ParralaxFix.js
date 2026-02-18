/*:
 * @target MZ
 * @plugindesc ParallaxFix: Rounds parallax positions to remove pixel bleed and optionally draws a black border.
 *
 * @param Black Border
 * @text Draw Black Border
 * @type boolean
 * @default true
 *
 * @param Border Map IDs
 * @text Maps to Draw Border
 * @type number[]
 * @default []
 */

(() => {
    const params = PluginManager.parameters('ParallaxFix');
    const drawBorder = params['Black Border'] === 'true';
    const borderMapIDs = JSON.parse(params['Border Map IDs'] || '[]');

    // --- Round parallax positions only ---
    const _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
    Spriteset_Map.prototype.updateParallax = function() {
        const parallax = this._parallax;
        if (!parallax || !parallax.bitmap) return;

        // Round positions to whole pixels
        parallax.x = Math.floor(parallax.x);
        parallax.y = Math.floor(parallax.y);

        _Spriteset_Map_updateParallax.call(this);
    };

    // --- Black border setup ---
    const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_initialize.call(this);

        if (drawBorder) {
            this._mapBorder = new Sprite();
            this._mapBorder.bitmap = new Bitmap(Graphics.width, Graphics.height);
            this._mapBorder.z = 10; // Draw above everything
            this.addChild(this._mapBorder);
        }
    };

    // --- Draw black border ---
    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);

        if (!drawBorder || !this._mapBorder) return;

        const border = this._mapBorder.bitmap;
        border.clear();

        if (!borderMapIDs.includes($gameMap.mapId())) return;

        const scrollX = $gameMap.displayX() * $gameMap.tileWidth();
        const scrollY = $gameMap.displayY() * $gameMap.tileHeight();
        const mapWidth = $gameMap.width() * $gameMap.tileWidth();
        const mapHeight = $gameMap.height() * $gameMap.tileHeight();

        border.fillRect(0 - scrollX, 0 - scrollY, mapWidth, 1, '#000000'); // Top
        border.fillRect(0 - scrollX, mapHeight - 1 - scrollY, mapWidth, 1, '#000000'); // Bottom
        border.fillRect(0 - scrollX, 0 - scrollY, 1, mapHeight, '#000000'); // Left
        border.fillRect(mapWidth - 1 - scrollX, 0 - scrollY, 1, mapHeight, '#000000'); // Right
    };
})();
