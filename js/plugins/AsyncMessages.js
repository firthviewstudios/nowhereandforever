/*:
 * @target MZ
 * @plugindesc Show a non-blocking async message window on the map. v1.4 debug version
 * @author You
 *
 * @command ShowAsyncMessage
 * @text Show Async Message
 * @desc Display a message without pausing event execution.
 *
 * @arg message
 * @text Message Text
 * @type multiline_string
 * @desc The message to display.
 *
 * @arg duration
 * @text Duration (Frames)
 * @type number
 * @default 120
 * @min 1
 * @desc How long to display the message (60 = 1 second).
 */

(() => {
  const pluginName = "ShowAsyncMessage";

  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    console.log("Scene_Map started — plugin loaded!");
  };

  PluginManager.registerCommand(pluginName, "ShowAsyncMessage", args => {
    console.log("ShowAsyncMessage command triggered");

    if (!(SceneManager._scene instanceof Scene_Map)) {
      console.log("Not on Scene_Map, message won't show");
      return;
    }

    const message = args.message || "";
    const duration = Number(args.duration) || 120;
    const scene = SceneManager._scene;

    // Create message window instance
    const windowMessage = new Window_Message();

    // Add to scene
    scene.addChild(windowMessage);

    // Open window (animates open)
    windowMessage.open();

    // Force text to be processed and shown properly
    windowMessage.startMessage();

    // Inject the text directly into _textState and force update
    windowMessage._textState.text = message;
    windowMessage._textState.allText = message;
    windowMessage._textState.index = 0;

    // Refresh window contents so text appears
    windowMessage.refresh();

    windowMessage.activate();

    // Close and remove after duration
    setTimeout(() => {
      windowMessage.close();
      setTimeout(() => {
        scene.removeChild(windowMessage);
        windowMessage.destroy();
        console.log("Message window removed");
      }, 300);
    }, duration * (1000 / 60));
  });
})();
