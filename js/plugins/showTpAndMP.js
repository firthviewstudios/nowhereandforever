Window_SkillList.prototype.costWidth = function() {
    return this.textWidth('000000  ' + TextManager.tpA + TextManager.mpA);
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    const partialSpaceWidth = Math.floor(this.textWidth(' ') / 3);

    if (this._actor.skillTpCost(skill) > 0) {
        const tpValText = this._actor.skillTpCost(skill);
        const tpValWidth = this.textWidth(tpValText);
        const tpAWidth = this.textWidth(TextManager.tpA);
        var tpWidth = tpValWidth + partialSpaceWidth + tpAWidth;
        const tpValX = x + width - tpWidth;
        const tpAX = x + width - tpAWidth;
        this.changeTextColor(ColorManager.tpCostColor());
        this.drawText(tpValText, tpValX, y, tpValWidth);
        this.drawText(TextManager.tpA, tpAX, y, tpAWidth);
    }

    if (this._actor.skillMpCost(skill) > 0) {
        const mpValText = this._actor.skillMpCost(skill);
        const mpValWidth = this.textWidth(mpValText);
        const mpAWidth = this.textWidth(TextManager.mpA);
        const mpWidth = mpValWidth + partialSpaceWidth + mpAWidth;
        const mpOffset = tpWidth ? tpWidth + this.textWidth(' ') : 0;
        const mpValX = x + width - mpWidth - mpOffset;
        const mpAX = x + width - mpAWidth - mpOffset;
        this.changeTextColor(ColorManager.mpCostColor());
        this.drawText(mpValText, mpValX, y, mpValWidth);
        this.drawText(TextManager.mpA, mpAX, y, mpAWidth);
    }
};