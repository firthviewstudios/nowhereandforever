(() => {

  const COVER_ID = 141;   // Brass Automaton
  const PROTECT_ID = 140; // Weyoun
  const COVER_STATE = 48; // CoverAlly

  function getEnemySprite(enemy) {
    const sprites = BattleManager._spriteset._enemySprites;
    return sprites.find(s => s._enemy === enemy);
  }

  // Store movement offsets so we can return later
  let _coverMove = null;

  // --- PHASE 1: Redirect + Move Toward Weyoun ---
  const aliasTargets = Game_Action.prototype.makeTargets;
  Game_Action.prototype.makeTargets = function() {
    const targets = aliasTargets.call(this);

    if (!this.isPhysical() || targets.length !== 1) return targets;

    const target = targets[0];
    if (target.enemyId?.() !== PROTECT_ID) return targets;

    const cover = $gameTroop.members().find(e =>
      e.enemyId() === COVER_ID && e.isStateAffected(COVER_STATE)
    );
    if (!cover) return targets;

    const coverSprite = getEnemySprite(cover);
    const targetSprite = getEnemySprite(target);

    if (coverSprite && targetSprite) {
      const dx = (targetSprite.x - coverSprite.x) * 0.4;
      const dy = (targetSprite.y - coverSprite.y) * 0.4;

      // Save for later return
      _coverMove = { sprite: coverSprite, dx, dy };

      // Move toward Weyoun
      coverSprite.startMove(dx, dy, 12);
      cover.startMotion?.("guard");
    }

    BattleManager._logWindow.push(
      "addText",
      `${cover.name()} shielded ${target.name()}!`
    );

    return [cover];
  };

  // --- PHASE 2: After damage, move back ---
  const aliasDamage = Game_Action.prototype.executeDamage;
  Game_Action.prototype.executeDamage = function(target, value) {
    aliasDamage.call(this, target, value);

    if (_coverMove && _coverMove.sprite === getEnemySprite(target)) {
      const { sprite, dx, dy } = _coverMove;

      // Move back AFTER the hit
      setTimeout(() => {
        sprite.startMove(-dx, -dy, 12);
      }, 50);

      _coverMove = null;
    }
  };

})();