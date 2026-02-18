/*:
 * @target MZ
 * @plugindesc Adds extra elemental damage for weapon elements beyond the base damage element, scaled by enemy vulnerabilities, with debug info including all target vulnerabilities. Accepts element names or IDs in weapon notes. 
 * @author ChatGPT
 */

(() => {
  const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;

  Game_Action.prototype.makeDamageValue = function(target, critical) {
    const actionName = this.item().name || "Unknown";
    const user = this.subject();
    const userName = user ? user.name() : "Unknown";
    const targetName = target ? target.name() : "Unknown";

    let baseDamage = _Game_Action_makeDamageValue.call(this, target, critical);

    if (!this.isAttack()) return baseDamage;
    if (!user || typeof user.weapons !== "function") return baseDamage;

    const baseElementId = this.item().damage.elementId;

    let weaponElements = [];

    for (const weapon of user.weapons()) {
      if (!weapon || !weapon.note) continue;
      console.log(`Weapon "${weapon.name}" note:`, weapon.note);

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

    weaponElements = weaponElements.filter(elId => elId !== baseElementId);

    console.log("--- Damage Debug ---");
    console.log(`Action: ${actionName}`);
    console.log(`User: ${userName}, Target: ${targetName}`);

    const elementNames = weaponElements.map(id => $dataSystem.elements[id] || `ID:${id}`);
    console.log("Elements Applied:", elementNames.length > 0 ? elementNames : "[None]");

    // Show ALL vulnerabilities, regardless of >1 or not
    console.log("Target Vulnerabilities:");
    weaponElements.forEach(elId => {
      const elementName = $dataSystem.elements[elId] || `ID:${elId}`;
      const rate = target.elementRate(elId);
      console.log(`  - ${elementName}: ${rate}`);
    });

    let totalExtraDamage = 0;

    for (const elId of weaponElements) {
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
