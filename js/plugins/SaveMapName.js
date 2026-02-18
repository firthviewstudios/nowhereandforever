(() => {
    // Save map name in savefile info
    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        info.mapName = $dataMap.displayName || $dataMapInfos[$gameMap.mapId()]?.name || "Unknown Map";
        return info;
    };

    // Override drawItem to add map name near gold for VisuStella Save Core
    const _WSFList_drawItem = Window_SavefileList.prototype.drawItem;
    Window_SavefileList.prototype.drawItem = function(index) {
        _WSFList_drawItem.call(this, index);

        // Use VisuStella's _savefileInfos array directly
        const info = this._savefileInfos ? this._savefileInfos[index] : null;
        if (!info) return;

        const rect = this.itemRectForText(index);
        const padding = this.itemPadding();
        const lineHeight = this.lineHeight();

        this.contents.fontSize = 18;

        if (info.gold) {
            // Draw gold (if not already drawn by base, you can skip this if it duplicates)
            this.drawCurrency(info, rect.x + padding, rect.y + rect.height - lineHeight * 2, rect.width - padding * 2);

            // Calculate gold width to offset map name
            const goldText = this.currencyUnit() ? `${info.gold} ${this.currencyUnit()}` : `${info.gold}`;
            const goldWidth = this.textWidth(goldText);

            // Draw map name next to gold
            this.drawText(info.mapName, rect.x + padding + goldWidth + 20, rect.y + rect.height - lineHeight * 2, rect.width - padding * 2, 'left');
        } else {
            this.drawText(info.mapName, rect.x + padding, rect.y + rect.height - lineHeight * 2, rect.width - padding * 2, 'left');
        }
    };
})();
