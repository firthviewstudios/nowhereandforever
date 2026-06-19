(() => {

  const COVER_IDS = [141, 143]; // Bronze & Silver Automatons
  const PROTECT_ID = 136;       // Weyland
  const COVER_STATE = 48;       // CoverAlly

  function getEnemySprite(enemy) {
    const sprites = BattleManager._spriteset._enemySprites;
    return sprites.find(s => s._enemy === enemy);
  }

  // Store movement offset for the chosen cover unit
  let _coverMove = null;
  let _chosenCover = null;

  // --- PHASE 1: Redirect + Move ONE Random Automaton ---
  const aliasTargets = Game_Action.prototype.makeTargets;
  Game_Action.prototype.makeTargets = function() {
    const targets = aliasTargets.call(this);

    if (!this.isPhysical() || targets.length !== 1) return targets;

    const target = targets[0];
    if (target.enemyId?.() !== PROTECT_ID) return targets;

    // Find all active cover units
    const covers = $gameTroop.members().filter(e =>
      COVER_IDS.includes(e.enemyId()) && e.isStateAffected(COVER_STATE)
    );
    if (covers.length === 0) return targets;

    // Pick ONE at random
    _chosenCover = covers[Math.floor(Math.random() * covers.length)];

    const coverSprite = getEnemySprite(_chosenCover);
    const targetSprite = getEnemySprite(target);

    if (coverSprite && targetSprite) {
      const dx = (targetSprite.x - coverSprite.x) * 0.4;
      const dy = (targetSprite.y - coverSprite.y) * 0.4;

      _coverMove = { sprite: coverSprite, dx, dy };

      coverSprite.startMove(dx, dy, 12);
      _chosenCover.startMotion?.("guard");

      BattleManager._logWindow.push(
        "addText",
        `${_chosenCover.name()} shielded ${target.name()}!`
      );
    }

    // Redirect damage ONLY to the chosen cover
    return [_chosenCover];
  };

  // --- PHASE 2: After damage, move the chosen Automaton back ---
  const aliasDamage = Game_Action.prototype.executeDamage;
  Game_Action.prototype.executeDamage = function(target, value) {
    aliasDamage.call(this, target, value);

    if (_coverMove && target === _chosenCover) {
      const { sprite, dx, dy } = _coverMove;

      setTimeout(() => {
        sprite.startMove(-dx, -dy, 12);
      }, 50);

      _coverMove = null;
      _chosenCover = null;
    }
  };

})();
