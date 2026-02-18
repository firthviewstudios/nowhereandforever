/*:
 * @target MZ
 * @plugindesc Grants/removes skills when equipping certain items, with per-class restrictions. (EquipSkillSync.js)
 * @author You - THIS IS THE SOUL SHARD PLUGIN
 * Actors: 2 = Elim, 3 - Odan, 4 = Tali, 5 = Feylora, 6 - Alex, 10 - Vaeraxis
 * Class: 11/19 = Kingsguard, 12/20 - Alchemist, 14/21 = Warden, 13 - Runespear, 15 - Voidweaver
 */

(() => {
  // List of actor IDs this plugin will affect
  const actorIds = [2, 3, 4, 5, 6, 10];

  /*
    itemSkillMap structure:
    Maps item IDs to an object that maps class IDs to arrays of skill IDs.
    This means for each item, different classes get different skills.
    
    Example:
    - Item 181 grants skills 288, 289, 290 to class 11,
    - but only 288, 289 to class 12.
  */


  const itemSkillMap = {
    181: {
      11: [288, 289, 290], // Class 11 (kingsguard) gets these skills when equipping item 181 FALCON CREST
      19: [288, 289, 290], // Class 11 (kingsguard) gets these skills when equipping item 181 FALCON CREST
      12: [288, 289],      // Class 12 gets these skills for item 181
      20: [288, 289],      // Class 12 gets these skills for item 181
      14: [288, 289],      // Class 14 gets these skills for item 181
      21: [288, 289],      // Class 14 gets these skills for item 181
      13: [288, 289, 290],      // Class 13 gets these skills for item 181
      15: [288, 289],      // Class 15 gets these skills for item 181
    },
    182: {
      11: [292],           // Class 11 gets skill 292 for item 182  DRAGONS GAZE
      19: [292],           // Class 11 gets skill 292 for item 182  DRAGONS GAZE
      12: [291, 292],      // Class 12 gets skills 291 and 292 for item 182
      20: [291, 292],      // Class 12 gets skills 291 and 292 for item 182
      14: [292],           // Class 14 gets skill 292 for item 182
      21: [292],           // Class 14 gets skill 292 for item 182
      13: [291, 292],      // Class 13 gets these skills for item 182
      15: [291, 292],      // Class 15 gets these skills for item 182
    },
    183: {
      11: [293],           // Class 11 gets skill 293 for item 183  SENTINEL
      19: [293],           // Class 11 gets skill 293 for item 183  SENTINEL
      12: [293],      // Class 12 gets skill 293 for item 183
      20: [293],      // Class 12 gets skill 293 for item 183
      14: [293, 294],           // Class 14 gets skill 293 and 294 for item 183
      21: [293, 294],           // Class 14 gets skill 293 and 294 for item 183
      13: [293, 294],      // Class 13 gets these skills for item 183
      15: [293],      // Class 15 gets these skills for item 183
    },
    184: {
      11: [295,296,297],           // Class 11 gets skill 295,296,297 for item 184  SONGBIRD
      19: [295,296,297],           // Class 11 gets skill 295,296,297 for item 184  SONGBIRD
      12: [295,296],      // Class 12 gets skill 295 for item 184
      20: [295,296],      // Class 12 gets skill 295 for item 184
      14: [295,296],           // Class 14 gets skill 295 and 294 for item 184
      21: [295,296],           // Class 14 gets skill 295 and 294 for item 184
      13: [295,296,297],      // Class 13 gets these skills for item 184
      15: [295,296],      // Class 15 gets these skills for item 184
    },
    185: {
      11: [298],           // Class 11 gets skill 295,296,297 for item 184  OBLIVION
      19: [298],           // Class 11 gets skill 295,296,297 for item 184  OBLIVION
      12: [298],      // Class 12 gets skill 295 for item 184
      20: [298],      // Class 12 gets skill 295 for item 184
      14: [298],           // Class 14 gets skill 295 and 294 for item 184
      21: [298],           // Class 14 gets skill 295 and 294 for item 184
      13: [298,299],      // Class 13 gets these skills for item 184
      15: [298,299],      // Class 15 gets these skills for item 184
    },
    186: {
      11: [300],           // Class 11 gets skill 295,296,297 for item 184  AZMODAEL
      19: [300],           // Class 11 gets skill 295,296,297 for item 184  AZMODAEL
      12: [300,301],      // Class 12 gets skill 295 for item 184
      20: [300,301],      // Class 12 gets skill 295 for item 184
      14: [300],           // Class 14 gets skill 295 and 294 for item 184
      21: [300],           // Class 14 gets skill 295 and 294 for item 184
      13: [300,301],      // Class 13 gets these skills for item 184
      15: [300,301],      // Class 15 gets these skills for item 184
    },
  };

  // Gather all skill IDs mentioned in the itemSkillMap for quick reference.
  // This ensures we know every skill that might need to be added or removed.
  const allSkills = [...new Set(
    Object.values(itemSkillMap)
      .flatMap(classMap => Object.values(classMap).flat())
  )];

  /**
   * Sync skills for a given actor based on equipped items and class.
   * Grants skills if equipped item and class match.
   * Removes skills that should no longer be active.
   * 
   * @param {Game_Actor} actor - The actor to sync skills for.
   */
  function syncEquipSkills(actor) {
    // Only process actors listed in actorIds
    if (!actorIds.includes(actor.actorId())) return;

    // Get the current class ID of the actor
    const actorClassId = actor.currentClass().id;

    // Find if the actor has any equipped item that is in the itemSkillMap
    const equippedItem = actor.equips().find(e => e && itemSkillMap[e.id]);

    // Get the list of skills to activate based on the equipped item and class
    // If no matching item or class, set activeSkills to empty array
    const activeSkills = equippedItem && itemSkillMap[equippedItem.id][actorClassId]
      ? itemSkillMap[equippedItem.id][actorClassId]
      : [];

    // Loop over all possible skills that might be affected
    for (const skillId of allSkills) {
      if (activeSkills.includes(skillId)) {
        // If the skill should be active but actor doesn't know it, teach it
        if (!actor.isLearnedSkill(skillId)) actor.learnSkill(skillId);
      } else {
        // If the skill shouldn't be active but actor knows it, remove it
        if (actor.isLearnedSkill(skillId)) actor.forgetSkill(skillId);
      }
    }
  }

  // Save original method to keep RPG Maker's default equip behavior intact
  const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;

  // Override changeEquip to add our skill syncing after equipment changes
  Game_Actor.prototype.changeEquip = function(slotId, item) {
    _Game_Actor_changeEquip.call(this, slotId, item); // Call original equip method
    syncEquipSkills(this);                            // Sync skills after equip change
  };

  // Save original map scene start method to hook into game load/start
  const _Scene_Map_start = Scene_Map.prototype.start;

  // Override Scene_Map start to sync skills on game load/map start for all relevant actors
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this); // Call original method first
    for (const actorId of actorIds) {
      const actor = $gameActors.actor(actorId);
      syncEquipSkills(actor);    // Sync skills for each tracked actor on load
    }
  };
})();