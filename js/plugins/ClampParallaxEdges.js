/*:
 * @target MZ
 * @plugindesc Completely eliminates parallax pixel bleed by clipping edges
 * @help Rounds parallax positions and clips the last pixel/row to prevent right/bottom bleed.
 */

(() => {
    const _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
    Spriteset_Map.prototype.updateParallax = function() {
        _Spriteset_Map_updateParallax.call(this);

        const parallax = this._parallax;
        if (parallax && parallax.bitmap) {
            // Round positions to integers
            parallax.x = Math.floor(parallax.x);
            parallax.y = Math.floor(parallax.y);

            // Clamp to avoid negative positions
            parallax.x = Math.max(0, parallax.x);
            parallax.y = Math.max(0, parallax.y);

            // Clip the bitmap so last pixel/row is never drawn
            const clipWidth = Math.min(parallax.bitmap.width, Graphics.width) - 1;
            const clipHeight = Math.min(parallax.bitmap.height, Graphics.height) - 1;
            parallax.setFrame(0, 0, clipWidth, clipHeight);
        }
    };
})();
