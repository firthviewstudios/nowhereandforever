/*:
 * @plugindesc Debug: Logs state removal behavior when battlers take damage.
 * @author Liam
 *
 * @help
 * This plugin prints detailed debug info whenever a battler takes HP damage.
 * It helps diagnose why "Remove by Damage" is not triggering.
 */

(function() {

    const STATE_ID = 47; // <-- Change if needed

    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {

        const beforeHP = target.hp;
        const hadState = target.isStateAffected(STATE_ID);

        console.log("=== DAMAGE DEBUG START ===");
        console.log("Target:", target.name());
        console.log("Before HP:", beforeHP);
        console.log("Had Charging:", hadState);
        console.log("States BEFORE:", target.states().map(s => s.id + ":" + s.name));

        _Game_Action_apply.call(this, target);

        const afterHP = target.hp;
        const damage = beforeHP - afterHP;

        console.log("Damage dealt:", damage);
        console.log("States AFTER:", target.states().map(s => s.id + ":" + s.name));

        const hasStateAfter = target.isStateAffected(STATE_ID);
        console.log("Still has Charging:", hasStateAfter);

        if (hadState && !hasStateAfter) {
            console.log(">>> Charging WAS removed.");
        } else if (hadState && hasStateAfter) {
            console.log(">>> Charging was NOT removed.");
        }

        console.log("=== DAMAGE DEBUG END ===");
    };

})();