(() => {
  const SKILL_TYPES_WITH_EXTRA_ELEMENT = [10, 5, 17]; // Skill type IDs that trigger extra element bonus

  const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
  Game_Action.prototype.makeDamageValue = function(target, critical) {
    const action = this.item();
    const actionName = action.name || "Unknown";
    const user = this.subject();
    const userName = user ? user.name() : "Unknown";
    const targetName = target ? target.name() : "Unknown";

    let baseDamage = _Game_Action_makeDamageValue.call(this, target, critical);
    if (!user) return baseDamage;

    const actionElementId = action.damage.elementId;

    // --- Collect extra elements with sources ---
    let extraElements = [];

    function addElement(elId, source) {
      if (!elId) return;
      extraElements.push({ id: elId, source });
    }

    // Skill note
    if (action.note) {
      extractElementsFromNote(action.note).forEach(elId => addElement(elId, `Skill: ${action.name}`));
    }

    // Weapons / enemy notes
    if (user.isActor() && typeof user.weapons === "function") {
      for (const weapon of user.weapons()) {
        if (!weapon || !weapon.note) continue;
        extractElementsFromNote(weapon.note).forEach(elId => addElement(elId, `Weapon: ${weapon.name}`));
      }
    } else if (user.isEnemy()) {
      const note = user.enemy().note;
      extractElementsFromNote(note).forEach(elId => addElement(elId, `Enemy Note`));
    }

    // Traits (states or equipment)
    if (user.traitObjects) {
      for (const traitObj of user.traitObjects()) {
        if (!traitObj || !traitObj.traits) continue;
        for (const trait of traitObj.traits) {
          if (trait.code === 31) { // Add Attack Element
            const sourceName = traitObj.name ? traitObj.name : "Unknown Trait";
            addElement(trait.dataId, `Trait: ${sourceName}`);
          }
        }
      }
    }

    // Remove duplicates by element ID, keep first source
    const seen = new Set();
    extraElements = extraElements.filter(el => {
      if (seen.has(el.id)) return false;
      seen.add(el.id);
      return true;
    });

    const isAttack = this.isAttack();
    const isSkillTypeWithExtra = !isAttack && SKILL_TYPES_WITH_EXTRA_ELEMENT.includes(action.stypeId);
    if (!isAttack && !isSkillTypeWithExtra && extraElements.length === 0) return baseDamage;

    // --- Logging ---
    console.log("--- Damage Debug ---");
    console.log(`Action: ${actionName}`);
    console.log(`User: ${userName}, Target: ${targetName}`);

    const baseElementName = $dataSystem.elements[actionElementId] || (actionElementId > 0 ? `ID:${actionElementId}` : "[None]");
    const baseElementRate = target.elementRate(actionElementId);
    const baseDamageAfterElement = Math.floor(baseDamage * baseElementRate);
    console.log(`Base Skill Element: ${baseElementName} | Target Vulnerability: ${baseElementRate} | Damage after multiplier: ${baseDamageAfterElement}`);

    if (extraElements.length > 0) {
      console.log("Extra Elements Applied:");
      extraElements.forEach(el => {
        const name = $dataSystem.elements[el.id] || `ID:${el.id}`;
        console.log(`  - ${name} (Source: ${el.source}) | Target Vulnerability: ${target.elementRate(el.id)}`);
      });
    } else {
      console.log("Extra Elements Applied: [None]");
    }

    let totalExtraDamage = 0;
    extraElements.forEach(el => {
      const rate = target.elementRate(el.id);
      if (rate > 1) {
        totalExtraDamage += Math.floor(baseDamage * (rate - 1));
      }
    });

    const totalExpectedDamage = baseDamageAfterElement + totalExtraDamage;
    console.log(`Total extra elemental damage added: ${totalExtraDamage}`);
    console.log(`✅ Total expected damage (base + extras): ${totalExpectedDamage}`);
    console.log("--------------------");

    return totalExpectedDamage;
  };

  // --- State element logging hook ---
  const _Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function(stateId) {
    const state = $dataStates[stateId];
    const battlerName = this.name ? this.name() : "Unknown";

    let elementName = null;
    if (state && state.note) {
      const match = state.note.match(/<\s*Element\s*:\s*([^>]+)>/i);
      if (match) elementName = match[1].trim();
    }

    if (elementName) {
      console.log(`✅ ${battlerName} gains state: ${state.name} (Element: ${elementName})`);
    } else if (state) {
      console.log(`✅ ${battlerName} gains state: ${state.name}`);
    }

    return _Game_Battler_addState.call(this, stateId);
  };

  function extractElementsFromNote(note) {
    const regex = /<\s*Attack\s+Elements\s*:\s*([^>]+)>/i;
    const match = note.match(regex);
    if (!match) return [];

    return match[1]
      .split(',')
      .map(e => e.trim())
      .map(el => {
        if (/^\d+$/.test(el)) return Number(el);
        return $dataSystem.elements.findIndex(name => name && name.toLowerCase() === el.toLowerCase());
      })
      .filter(elId => elId > 0);
  }
})();
