//=============================================================================
// Fix: Prevent switching out locked actors in battle
//=============================================================================
(() => {
    const _BattleManager_swapOrder = BattleManager.swapOrder;
    BattleManager.swapOrder = function(index1, index2) {
        const actor1 = $gameParty.battleMembers()[index1];
        const actor2 = $gameParty.battleMembers()[index2];

        // Check the VisuStella lock meta tag
        const isLocked = actor =>
            actor && actor.actor().meta && actor.actor().meta.Locked;

        if (isLocked(actor1) || isLocked(actor2)) {
            // Cancel the swap entirely
            SoundManager.playBuzzer();
            return;
        }

        _BattleManager_swapOrder.call(this, index1, index2);
    };
})();