/*:
 * @target MZ
 * @plugindesc Allows enemies to charge and then unleash a random skill from a list, replacing their normal action. VisuStella-compatible.
 * @author Liam
 *
 * @help
 * ================================
 * HOW TO USE
 * ================================
 *
 * Add these notetags to a SKILL (the charging skill):
 *
 * <ChargeTurns: X>
 * <ChargeMessage: text>
 * <ReleaseMessage: text>
 * <ChargeRandomSkills: id1, id2, id3>
 *
 * Example:
 * <ChargeTurns: 1>
 * <ChargeMessage: The golem gathers steam pressure!>
 * <ReleaseMessage: The golem vents its stored power!>
 * <ChargeRandomSkills: 15, 16, 17>
 *
 * When the enemy uses this skill:
 * - It shows the ChargeMessage
 * - Applies a Charging state internally
 * - Skips its attack for that turn
 *
 * On the next turn:
 * - The enemy's normal action is replaced
 * - A random skill from the list is chosen
 * - The ReleaseMessage is shown
 * - The chosen skill is forced to activate
 *
 * This plugin does NOT override VisuStella functions.
 * It only adds behavior and is safe with Battle Core.
 */

(() => {

    // Store charging data on battlers
    Game_Battler.prototype.startRandomCharge = function(skill, turns, randomList, chargeMsg, releaseMsg) {
        this._chargingData = {
            turns: turns,
            skill: skill,
            list: randomList,
            chargeMsg: chargeMsg,
            releaseMsg: releaseMsg
        };
    };

    Game_Battler.prototype.isRandomCharging = function() {
        return this._chargingData && this._chargingData.turns > 0;
    };

    Game_Battler.prototype.updateRandomCharge = function() {
        if (this.isRandomCharging()) {
            this._chargingData.turns--;
        }
    };

    Game_Battler.prototype.releaseRandomCharge = function() {
        const data = this._chargingData;
        this._chargingData = null;
        return data;
    };

    // Wrap useItem without overriding VisuStella logic
    const _useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {

        const chargeTurns = Number(item.meta.ChargeTurns || 0);
        const randomList = item.meta.ChargeRandomSkills ?
            item.meta.ChargeRandomSkills.split(",").map(id => Number(id.trim())) : null;

        if (chargeTurns > 0 && randomList) {

            const chargeMsg = item.meta.ChargeMessage || `${this.name()} is charging!`;
            $gameMessage.add(chargeMsg);

            this.startRandomCharge(
                item,
                chargeTurns,
                randomList,
                chargeMsg,
                item.meta.ReleaseMessage || `${this.name()} unleashes power!`
            );

            return; // Skip normal execution
        }

        _useItem.call(this, item);
    };

    // Turn-end logic (compatible with VisuStella)
    const _onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        _onTurnEnd.call(this);

        if (this.isRandomCharging()) {
            this.updateRandomCharge();

            if (!this.isRandomCharging()) {
                const data = this.releaseRandomCharge();

                const releaseMsg = data.releaseMsg;
                $gameMessage.add(releaseMsg);

                const randomSkillId = data.list[Math.floor(Math.random() * data.list.length)];
                const randomSkill = $dataSkills[randomSkillId];

                if (randomSkill) {
                    this.forceAction(randomSkillId, this.opponentsUnit().randomTarget());
                    BattleManager.forceAction(this);
                }
            }
        }
    };

})();