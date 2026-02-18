(() => {
  const SKILL_TYPES_WITH_EXTRA_ELEMENT = [10, 5, 17]; // Skill type IDs that trigger extra element bonus

  const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;

  Game_Action.prototype.makeDamageValue = function(target, critical) {
    const actionName = this.item().name || "Unknown";
    const user = this.subject();
    const userName = user ? user.name() : "Unknown";
    const targetName = target ? target.name() : "Unknown";

    let baseDamage = _Game_Action_makeDamageValue.call(this, target, critical);

    if (!user) return baseDamage;

    const action = this.item();
    const actionElementId = action.damage.elementId;

    let weaponElements = [];

    // === Support for both actors and enemies ===
    if (user.isActor() && typeof user.weapons === "function") {
      for (const weapon of user.weapons()) {
        if (!weapon || !weapon.note) continue;
        weaponElements.push(...extractElementsFromNote(weapon.note));
      }
    } else if (user.isEnemy()) {
      const note = user.enemy().note;
      weaponElements.push(...extractElementsFromNote(note));
    }

    // Remove duplicates
    weaponElements = [...new Set(weaponElements)];

    const isAttack = this.isAttack();
    const isSkillTypeWithExtra = !isAttack && SKILL_TYPES_WITH_EXTRA_ELEMENT.includes(action.stypeId);

    if (!isAttack && !isSkillTypeWithExtra) return baseDamage;

    const extraElements = weaponElements.filter(elId => elId !== actionElementId);

    console.log("--- Damage Debug ---");
    console.log(`Action: ${actionName}`);
    console.log(`User: ${userName}, Target: ${targetName}`);
    const elementNames = extraElements.map(id => $dataSystem.elements[id] || `ID:${id}`);
    console.log("Extra Elements Applied:", elementNames.length > 0 ? elementNames : "[None]");

    console.log("Target Vulnerabilities:");
    extraElements.forEach(elId => {
      const elementName = $dataSystem.elements[elId] || `ID:${elId}`;
      const rate = target.elementRate(elId);
      console.log(`  - ${elementName}: ${rate}`);
    });

    let totalExtraDamage = 0;
    for (const elId of extraElements) {
      const rate = target.elementRate(elId);
      if (rate > 1) {
        const extraDamage = Math.floor(baseDamage * (rate - 1));
        console.log(`Extra damage from element ${$dataSystem.elements[elId] || `ID:${elId}`}: ${extraDamage}`);
        totalExtraDamage += extraDamage;
      }
    }

    console.log(`Total extra elemental damage added: ${totalExtraDamage}`);
    console.log("--------------------");

    return baseDamage + totalExtraDamage;
  };

  function extractElementsFromNote(note) {
    const regex = /<\s*Attack\s+Elements\s*:\s*([^>]+)>/i;
    const match = note.match(regex);
    if (!match) return [];

    return match[1]
      .split(',')
      .map(e => e.trim())
      .map(el => {
        if (/^\d+$/.test(el)) {
          return Number(el);
        } else {
          return $dataSystem.elements.findIndex(
            name => name && name.toLowerCase() === el.toLowerCase()
          );
        }
      })
      .filter(elId => elId > 0);
  }
})();
