/*:
 * @target MZ
 * @plugindesc Hides parallax over specific regions using an overlay
 * @help This plugin hides parallax tiles over region 1 (or other regions)
 *       without replacing the parallax bitmap.
 * @param MaskRegions
 * @text Mask Regions
 * @type number[]
 * @desc List of region IDs where parallax should be hidden
 * @default [1]
 */

(() => {
    const params = PluginManager.parameters('ParallaxRegionMask');
    const maskRegions = JSON.parse(params.MaskRegions || '[1]');

    const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_initialize.call(this);

        // Create the overlay container
        this._parallaxMask = new Sprite();
        this._parallaxMask.bitmap = new Bitmap(Graphics.width, Graphics.height);
        this._parallaxMask.z = 1; // draw above parallax
        this.addChild(this._parallaxMask);

        this._lastScrollX = -1;
        this._lastScrollY = -1;
    };

    const _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
    Spriteset_Map.prototype.updateParallax = function() {
        _Spriteset_Map_updateParallax.call(this);

        const scrollX = $gameMap.displayX() * $gameMap.tileWidth();
        const scrollY = $gameMap.displayY() * $gameMap.tileHeight();

        // Only update overlay if map scrolled
        if (scrollX === this._lastScrollX && scrollY === this._lastScrollY) return;
        this._lastScrollX = scrollX;
        this._lastScrollY = scrollY;

        const overlay = this._parallaxMask.bitmap;
        overlay.clear();

        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const mapWidth = $gameMap.width();
        const mapHeight = $gameMap.height();

        // Draw a filled rectangle over every masked tile
        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                if (maskRegions.includes($gameMap.regionId(x, y))) {
                    const dx = x * tileWidth - scrollX;
                    const dy = y * tileHeight - scrollY;
                    overlay.fillRect(dx, dy, tileWidth, tileHeight, 'rgba(0,0,0,1)');
                }
            }
        }
    };
})();
