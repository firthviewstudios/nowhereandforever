/*:
 * @target MZ
 * @plugindesc Forces Garamond as the default font safely
 */

(() => {
    // Override the default font face
    const _Window_Base_standardFontFace = Window_Base.prototype.standardFontFace;
    Window_Base.prototype.standardFontFace = function() {
        return 'Garamond'; // Replace with your installed font name
    };
})();