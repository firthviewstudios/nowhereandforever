/*:
 * @target MZ
 * @plugindesc Debug windows in Scene_Skill after creation to find category window.  
 * @author ChatGPT
 */
(() => {
  const _Scene_Skill_start = Scene_Skill.prototype.start;
  Scene_Skill.prototype.start = function() {
    _Scene_Skill_start.call(this);
    this.children.forEach(win => {
      if (win && win._list && Array.isArray(win._list) && win._list.length > 0) {
        console.log("Possible category window class:", win.constructor.name);
        console.log("Window _list contents:", win._list);
      }
    });
  };
})();