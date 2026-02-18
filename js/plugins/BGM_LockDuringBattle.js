/*:
 * @target MZ
 * @plugindesc Keeps current map BGM playing seamlessly through battle when locked (resumes exact position). v2.1
 * @author ChatGPT
 *
 * @command LockBGM
 * @text Lock BGM
 * @desc Keep current BGM through battle (no battle or victory music).
 *
 * @command UnlockBGM
 * @text Unlock BGM
 * @desc Restore normal battle/victory BGM behavior.
 *
 * @help
 * Usage Example:
 *   ◆ Plugin Command: Lock BGM
 *   ◆ Play BGM: "SpecialTheme"
 *   → Battles keep that track from the same timestamp
 *   ◆ Plugin Command: Unlock BGM
 *   ◆ Play BGM: "FieldTheme"
 */

(() => {
  // Plugin commands
  PluginManager.registerCommand("BGM_LockDuringBattle", "LockBGM", () => {
    $gameSystem._bgmLocked = true;
  });
  PluginManager.registerCommand("BGM_LockDuringBattle", "UnlockBGM", () => {
    $gameSystem._bgmLocked = false;
  });

  // Capture BGM and its play position before battle starts
  const _SceneManager_push = SceneManager.push;
  SceneManager.push = function(sceneClass) {
    if (sceneClass === Scene_Battle && $gameSystem._bgmLocked) {
      this._lockedBgm = AudioManager.saveBgm();
    }
    _SceneManager_push.call(this, sceneClass);
  };

  // Skip battle and victory BGMs
  const _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
  BattleManager.playBattleBgm = function() {
    if ($gameSystem._bgmLocked) return;
    _BattleManager_playBattleBgm.call(this);
  };

  const _BattleManager_playVictoryMe = BattleManager.playVictoryMe;
  BattleManager.playVictoryMe = function() {
    if ($gameSystem._bgmLocked) return;
    _BattleManager_playVictoryMe.call(this);
  };

  // Replay saved BGM from saved position when battle starts
  const _Scene_Battle_start = Scene_Battle.prototype.start;
  Scene_Battle.prototype.start = function() {
    _Scene_Battle_start.call(this);
    if ($gameSystem._bgmLocked && SceneManager._lockedBgm?.name) {
      AudioManager.replayBgm(SceneManager._lockedBgm);
    }
  };

  // Resume same BGM after battle ends
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    if ($gameSystem._bgmLocked && SceneManager._lockedBgm?.name) {
      AudioManager.replayBgm(SceneManager._lockedBgm);
    }
  };
})();
