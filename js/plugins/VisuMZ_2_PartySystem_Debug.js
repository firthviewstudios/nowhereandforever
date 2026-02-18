/*:
 * @target MZ
 * @plugindesc Logs every battle command VisuStella builds so we can identify the Switch command symbol.
 * @help Place BELOW VisuMZ_2_PartySystem. Start a battle and press F8.
 */
(() => {
  const _addCommand = Window_ActorCommand.prototype.addCommand;
  Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled, ext) {
    console.log(`[VS PartySystem] addCommand: name=${name}, symbol=${symbol}, enabled=${enabled}`);
    _addCommand.call(this, name, symbol, enabled, ext);
  };
})();