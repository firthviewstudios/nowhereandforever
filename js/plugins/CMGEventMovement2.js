// ============================================================================
// CGMZ Event Movement – Region Block Fix (All Movement Types)
// ============================================================================

(function() {

    const blockedRegion = Number(PluginManager.parameters("CGMZ_EventMovement")["Prevent Event Movement Region"]);

    function isBlockedRegion(x, y) {
        return $gameMap.regionId(x, y) === blockedRegion;
    }

    // Patch moveStraight
    const _moveStraight = Game_Character.prototype.moveStraight;
    Game_Character.prototype.moveStraight = function(d) {
        if (!this.isThrough()) {
            const x2 = $gameMap.roundXWithDirection(this.x, d);
            const y2 = $gameMap.roundYWithDirection(this.y, d);
            if (isBlockedRegion(x2, y2)) return;
        }
        _moveStraight.call(this, d);
    };

    // Patch moveDiagonally
    const _moveDiagonally = Game_Character.prototype.moveDiagonally;
    Game_Character.prototype.moveDiagonally = function(horz, vert) {
        if (!this.isThrough()) {
            const x2 = $gameMap.roundXWithDirection(this.x, horz);
            const y2 = $gameMap.roundYWithDirection(this.y, vert);
            if (isBlockedRegion(x2, y2)) return;
        }
        _moveDiagonally.call(this, horz, vert);
    };

    // Patch moveTowardCharacter (used by moveTowardPlayer)
    const _moveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
    Game_Character.prototype.moveTowardCharacter = function(character) {
        const d = this.findDirectionTo(character.x, character.y);
        if (d > 0) {
            const x2 = $gameMap.roundXWithDirection(this.x, d);
            const y2 = $gameMap.roundYWithDirection(this.y, d);
            if (!this.isThrough() && isBlockedRegion(x2, y2)) return;
        }
        _moveTowardCharacter.call(this, character);
    };

    // Patch findDirectionTo (pathfinding)
    const _findDirectionTo = Game_Character.prototype.findDirectionTo;
    Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
        const dir = _findDirectionTo.call(this, goalX, goalY);
        if (dir > 0) {
            const x2 = $gameMap.roundXWithDirection(this.x, dir);
            const y2 = $gameMap.roundYWithDirection(this.y, dir);
            if (!this.isThrough() && isBlockedRegion(x2, y2)) return 0;
        }
        return dir;
    };

})();
