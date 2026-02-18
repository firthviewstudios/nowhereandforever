/*:
 * @target MZ
 * @plugindesc Adds/removes skills when certain items are equipped. One item per actor at a time. [Global]
 * @author You
 */

(() => {
  // === CONFIGURATION ===
  const actorIds = [2, 3, 4];

  // Item ID => Array of Skill IDs
  const itemSkillMap = {
    181: [288, 289, 290], // Item 181 gives skills 288, 289 & 290
    182: [291, 292],
  };

  const allSkills = [...new Set(Object.values(itemSkillMap).flat())];

  // Function to check and apply skills
  function syncEquipSkills(actor) {
    if (!actorIds.includes(actor.actorId())) return;

    const equippedItem = actor.equips().find(e => e && itemSkillMap[e.id]);
    const activeSkills = equippedItem ? itemSkillMap[equippedItem.id] : [];

    for (const skillId of allSkills) {
      if (activeSkills.includes(skillId)) {
        if (!actor.isLearnedSkill(skillId)) actor.learnSkill(skillId);
      } else {
        if (actor.isLearnedSkill(skillId)) actor.forgetSkill(skillId);
      }
    }
  }

  // === HOOK: When actor equipment changes ===
  const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
  Game_Actor.prototype.changeEquip = function(slotId, item) {
    _Game_Actor_changeEquip.call(this, slotId, item);
    syncEquipSkills(this);
  };

  // Optional: Run on game load to sync existing equipment
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    for (const actorId of actorIds) {
      const actor = $gameActors.actor(actorId);
      syncEquipSkills(actor);
    }
  };
})();