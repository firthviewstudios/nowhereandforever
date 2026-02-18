(() => {
  // Put the skill type IDs you want to get extra elemental damage here:
  const SKILL_TYPES_WITH_EXTRA_ELEMENT = [10, 5, 17]; // example: 1 = Magic, 3 = Special

  const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;

  Game_Action.prototype.makeDamageValue = function(target, critical) {
    const actionName = this.item().name || "Unknown";
    const user = this.subject();
    const userName = user ? user.name() : "Unknown";
    const targetName = target ? target.name() : "Unknown";

    let baseDamage = _Game_Action_makeDamageValue.call(this, target, critical);

    if (!user || typeof user.weapons !== "function") return baseDamage;

    const action = this.item();
    const actionElementId = action.damage.elementId;

    // Gather weapon elements from user's equipped weapons
    let weaponElements = [];
    for (const weapon of user.weapons()) {
      if (!weapon || !weapon.note) continue;

      const regex = /<\s*Attack\s+Elements\s*:\s*([^>]+)>/i;
      const match = weapon.note.match(regex);
      if (match) {
        const elementsFromNote = match[1]
          .split(',')
          .map(e => e.trim())
          .filter(e => e.length > 0);

        elementsFromNote.forEach(el => {
          let elId = -1;
          if (/^\d+$/.test(el)) {
            elId = Number(el);
          } else {
            elId = $dataSystem.elements.findIndex(
              name => name && name.toLowerCase() === el.toLowerCase()
            );
          }
          if (elId > 0 && !weaponElements.includes(elId)) {
            weaponElements.push(elId);
          }
        });
      }
    }

    // Determine if extra elemental damage applies:

    const isAttack = this.isAttack();
    const isSkillTypeWithExtra = !isAttack && SKILL_TYPES_WITH_EXTRA_ELEMENT.includes(action.stypeId);

    if (!isAttack && !isSkillTypeWithExtra) {
      // Not an attack or designated skill type — no extra damage
      return baseDamage;
    }

    // Exclude the base element of the skill or attack
    let extraElements = weaponElements.filter(elId => elId !== actionElementId);

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
})();
