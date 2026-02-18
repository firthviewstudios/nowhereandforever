/*:
 * @target MZ
 * @plugindesc Hide the touch-move destination sprite.
 * @help Free to use and/or modify for any project, no credit required.
 */
(alias => {
  Sprite_Destination.prototype.createBitmap = function() {
    alias.apply(this, arguments);
    this.bitmap.fillAll("black");
  };
})(Sprite_Destination.prototype.createBitmap);