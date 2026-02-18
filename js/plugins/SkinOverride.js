/*:
 * @target MZ
 * @plugindesc Overrides menu windows background color with a custom solid color.
 * @author ChatGPT
 *
 * @param Background Color
 * @desc CSS color string for menu window backgrounds (e.g. rgba(50,20,20,0.8))
 * @default rgba(46, 0, 62, 0.8)
 *
 * @help
 * This plugin overrides the draw method for menu windows to fill background
 * with the color you specify, ignoring windowskin tint.
 */

(() => {
  const parameters = PluginManager.parameters('ForceMenuWindowBG');
  const bgColor = String(parameters['Background Color'] || 'rgba(46, 0, 62, 0.8)');

  // Override Window_MenuStatus background draw
  const _Window_MenuStatus_update = Window_MenuStatus.prototype.update;
  Window_MenuStatus.prototype.update = function() {
    _Window_MenuStatus_update.call(this);
    this.contentsBack.clear();
    this.contentsBack.fillAll(bgColor);
  };

  // Override Window_MenuCommand background draw
  const _Window_MenuCommand_update = Window_MenuCommand.prototype.update;
  Window_MenuCommand.prototype.update = function() {
    _Window_MenuCommand_update.call(this);
    this.contentsBack.clear();
    this.contentsBack.fillAll(bgColor);
  };

  // Override Window_ItemList background draw
  const _Window_ItemList_update = Window_ItemList.prototype.update;
  Window_ItemList.prototype.update = function() {
    _Window_ItemList_update.call(this);
    this.contentsBack.clear();
    this.contentsBack.fillAll(bgColor);
  };

})();
