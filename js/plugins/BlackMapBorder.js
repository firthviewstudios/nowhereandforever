/*:
 * @target MZ
 * @plugindesc Draws a 1-pixel black border around the map perimeter on selected maps.
 * @help This plugin draws a simple black rectangle along the edges of the map.
 *
 * @param Map IDs
 * @text Map IDs to Show Border
 * @type number[]
 * @desc List of map IDs where the border should be drawn
 * @default []
 */

(() => {
    const params = PluginManager.parameters('BlackMapBorder');
    const mapIDs = JSON.parse(params['Map IDs'] || '[]');

    const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_initialize.call(this);

        // Create the border sprite
        this._mapBorder = new Sprite();
        this._mapBorder.bitmap = new Bitmap(Graphics.width, Graphics.height);
        this._mapBorder.z = 10; // Draw above everything else
        this.addChild(this._mapBorder);

        this._lastScrollX = -1;
        this._lastScrollY = -1;
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);

        const border = this._mapBorder.bitmap;
        border.clear();

        // Only draw on specified maps
        if (!mapIDs.includes($gameMap.mapId())) return;

        const scrollX = $gameMap.displayX() * $gameMap.tileWidth();
        const scrollY = $gameMap.displayY() * $gameMap.tileHeight();

        // Only redraw if the map scrolled
        if (scrollX === this._lastScrollX && scrollY === this._lastScrollY) return;
        this._lastScrollX = scrollX;
        this._lastScrollY = scrollY;

        const mapWidth = $gameMap.width() * $gameMap.tileWidth();
        const mapHeight = $gameMap.height() * $gameMap.tileHeight();

        // Draw 1-pixel black border
        border.fillRect(0, 0, mapWidth, 1, '#000000'); // Top
        border.fillRect(0, mapHeight - 1, mapWidth, 1, '#000000'); // Bottom
        border.fillRect(0, 0, 1, mapHeight, '#000000'); // Left
        border.fillRect(mapWidth - 1, 0, 1, mapHeight, '#000000'); // Right
    };
})();
