/*:
 * @target MZ
 * @plugindesc Shows WEAK/RESIST popups above enemies when hit by elements they are weak or resistant to (custom popup).
 * @author Liam
 */

(() => {

    const _apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {

        _apply.call(this, target);

        if (!target.isEnemy()) return;

        // Determine the element used
        const elementId = this.item().damage.elementId;

        // Handle "Normal Attack" (elementId = -1)
        let finalElementId = elementId;
        if (elementId < 0) {
            const atkElements = this.subject().attackElements();
            if (atkElements.length > 0) finalElementId = atkElements[0];
        }

        if (!finalElementId || finalElementId <= 0) return;

        const rate = target.elementRate(finalElementId);
        const elementName = $dataSystem.elements[finalElementId];

        let popupText = null;

        if (rate > 1.0) {
            popupText = `WEAK (${elementName})`;
        } else if (rate < 1.0) {
            popupText = `RESIST (${elementName})`;
        }

        if (!popupText) return;

        // ⭐ Find the enemy sprite
        const sprite = SceneManager._scene._spriteset.findTargetSprite(target);
        if (!sprite) return;

        // ⭐ Create a custom popup sprite
        const popup = new Sprite();
        popup.bitmap = new Bitmap(200, 48);
        popup.bitmap.fontSize = 24;
        popup.bitmap.textColor = "#ffffff";
        popup.bitmap.outlineColor = "rgba(0,0,0,0.8)";
        popup.bitmap.outlineWidth = 4;

        popup.bitmap.drawText(popupText, 0, 0, 200, 48, "center");

        popup.x = sprite.x - 100;
        popup.y = sprite.y - 60;
        popup.opacity = 255;

        // ⭐ Animate the popup (float upward + fade out)
        popup.update = function() {
            this.y -= 1;
            this.opacity -= 4;
            if (this.opacity <= 0) {
                this.parent.removeChild(this);
            }
        };

        // ⭐ Add to effects container
        SceneManager._scene._spriteset._effectsContainer.addChild(popup);
    };

})();
