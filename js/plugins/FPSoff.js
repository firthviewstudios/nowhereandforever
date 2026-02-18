/*:
 * @target MZ
 * @plugindesc Hides the FPS meter reliably on all playtests and builds.
 */
(() => {
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        if (Graphics._fpsMeter) {
            Graphics._fpsMeter.hide();   // hide the FPS meter if it exists
        }
        Graphics._showFps = false;       // ensure the flag is false
    };
})();
