/*:
 * @target MZ
 * @plugindesc Protect-style cover: enemy 141 steps in front of enemy 140 and takes the damage.
 */

(() => {

    const TANK_ID = 141;
    const PROTECT_ID = 140;

    const _executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target) {

        const item = this.item();
        const isAttackCommand = this.isAttack();

        // Only redirect if target is the protected enemy
        if (target.isEnemy && target.isEnemy() && target.enemyId() === PROTECT_ID) {

            // Treat Attack as physical-like
            const isPhysicalLike =
                (item && item.hitType === 0) ||
                isAttackCommand;

            if (isPhysicalLike) {

                const tank = $gameTroop.members().find(e =>
                    e.isEnemy() &&
                    e.enemyId() === TANK_ID &&
                    e.isAlive()
                );

                if (tank) {

                    // Save original position
                    const homeX = tank._homeX;
                    const homeY = tank._homeY;

                    // Step forward
                    tank.startMove(homeX - 40, homeY, 12);
                    tank.requestMotion('guard');

                    // Calculate damage as if Weyoun was hit
                    const damage = this.makeDamageValue(target, false);

                    // Apply damage to tank
                    tank.gainHp(-damage);
                    tank.startDamagePopup();
                    tank.performDamage();

                    // Step back after a short delay
                    setTimeout(() => {
                        tank.startMove(homeX, homeY, 12);
                    }, 200);

                    return;
                }
            }
        }

        // Otherwise normal behavior
        return _executeDamage.call(this, target);
    };

})();