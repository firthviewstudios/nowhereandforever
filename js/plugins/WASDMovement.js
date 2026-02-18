/*:
 * @target MZ
 * @plugindesc Force WASD key bindings on game start. Safe for VisuStella Core Engine. Place ABOVE Core plugins in Plugin Manager.
 * @author ChatGPT
 */

(() => {
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    Input.keyMapper[87] = 'up';    // W
    Input.keyMapper[65] = 'left';  // A
    Input.keyMapper[83] = 'down';  // S
    Input.keyMapper[68] = 'right'; // D
    _Scene_Boot_start.call(this);
  };
})();
