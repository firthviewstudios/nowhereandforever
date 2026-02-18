/*:
 * @target MZ
 * @plugindesc WD_Quest addon: Inner tabs (In Progress / Completed) + improved cancel flow + wider journal layout.
 * @author ChatGPT
 * @help
 * Place this plugin BELOW WD_Quest.js in Plugin Manager.
 *
 * Changes:
 *  - Adds inner tabs inside the QuestLog scene: In Progress / Completed
 *  - Cancel from the quest list returns to the tabs (instead of exiting the journal)
 *  - Journal layout can be widened (quest list gets more width)
 *
 * Notes:
 *  - This is an addon; it does not modify WD_Quest.js directly.
 */

(() => {
  "use strict";

  // Ensure WD_Quest created the quest scene class
  const Scene_Quest = SceneManager.Scene_Quest;
  if (!Scene_Quest) return;

  // -----------------------------
  // Tabs window (inner tabs)
  // -----------------------------
  function Window_QuestFilterTabs() {
    this.initialize(...arguments);
  }

  Window_QuestFilterTabs.prototype = Object.create(Window_HorzCommand.prototype);
  Window_QuestFilterTabs.prototype.constructor = Window_QuestFilterTabs;

  Window_QuestFilterTabs.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
    this.select(0);
    this.deactivate();
  };

  Window_QuestFilterTabs.prototype.maxCols = function() {
    return 2;
  };

  Window_QuestFilterTabs.prototype.makeCommandList = function() {
    this.addCommand("In Progress", "inProgress");
    this.addCommand("Completed", "completed");
  };

  // -----------------------------
  // Quest status helpers
  // -----------------------------
  function normalizeStatus(q) {
    if (!q) return q;
    // Back-compat: older saves used boolean "complete"
    if (Object.prototype.hasOwnProperty.call(q, "complete") &&
        !Object.prototype.hasOwnProperty.call(q, "status")) {
      q.status = q.complete ? "completed" : "ongoing";
    }
    // Some code paths treat status as boolean
    if (q.status === true) q.status = "completed";
    if (q.status === false) q.status = "ongoing";
    return q;
  }

  function getSortedQuests() {
    const all = ($gameSystem && $gameSystem.getQuestList) ? $gameSystem.getQuestList().slice() : [];
    all.forEach(normalizeStatus);

    const byIndex = (a, b) => (a.index ?? 0) - (b.index ?? 0);

    const ongoing = all.filter(q => q.status === "ongoing").sort(byIndex);
    const completed = all.filter(q => q.status === "completed").sort(byIndex);
    const failed = all.filter(q => q.status === "failed").sort(byIndex);

    return { ongoing, completed, failed };
  }

  // -----------------------------
  // Patch quest list window instance
  // -----------------------------
  function ensureQuestListFiltering(listWindow) {
    const proto = Object.getPrototypeOf(listWindow);
    if (proto.__WD_QUEST_TABS_PATCHED__) return;
    proto.__WD_QUEST_TABS_PATCHED__ = true;

    proto.setFilterMode = function(mode) {
      this._filterMode = mode; // "inProgress" | "completed"
      this.refresh();
      this.select(0);
    };

    proto._getFilteredQuests = function() {
      const sorted = getSortedQuests();
      // "In Progress" includes ongoing + failed (you can change this if you later want a Failed tab)
      if (this._filterMode === "completed") return sorted.completed;
      return sorted.ongoing.concat(sorted.failed);
    };

    // Build the command list from filtered quests
    proto.makeCommandList = function() {
      this._filteredQuests = this._getFilteredQuests();
      for (let i = 0; i < this._filteredQuests.length; i++) {
        const q = this._filteredQuests[i];
        this.addCommand(q.name, "questList", true, i);
      }
    };

    // Draw items with status-based styling (matches WD_Quest behavior closely)
    proto.drawItem = function(index) {
      const q = (this._filteredQuests && this._filteredQuests[index]) ? this._filteredQuests[index] : null;
      if (!q) return;
      normalizeStatus(q);

      const rect = this.itemRect(index).clone();

      if (q.status === "completed") {
        this.changePaintOpacity(false);
        this.changeTextColor("#808080");
      } else if (q.status === "failed") {
        this.changePaintOpacity(false);
        this.changeTextColor("#B22222");
      } else {
        this.changePaintOpacity(true);
        this.resetTextColor();
      }

      this.drawText(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
    };

    proto.currentQuest = function() {
      const i = this.index();
      return (this._filteredQuests && this._filteredQuests[i]) ? this._filteredQuests[i] : null;
    };
  }

  // -----------------------------
  // Layout widening (quest list wider)
  // -----------------------------
  const LIST_WIDTH_RATIO = 0.40; // was 0.30 in WD_Quest

  const _questListWindowRect = Scene_Quest.prototype.questListWindowRect;
  Scene_Quest.prototype.questListWindowRect = function() {
    const rect = _questListWindowRect.call(this);
    const newListW = Math.floor(Graphics.boxWidth * LIST_WIDTH_RATIO);
    const layout2 = rect.x > 0; // WD_Quest uses x=0 (layout1) or x=0.7*W (layout2)

    rect.width = newListW;
    rect.x = layout2 ? (Graphics.boxWidth - newListW) : 0;
    return rect;
  };

  const _questInfoWindowRect = Scene_Quest.prototype.questInfoWindowRect;
  Scene_Quest.prototype.questInfoWindowRect = function() {
    const rect = _questInfoWindowRect.call(this);
    const listW = Math.floor(Graphics.boxWidth * LIST_WIDTH_RATIO);
    const infoW = Graphics.boxWidth - listW;

    // Determine layout based on where info was originally placed
    // layout1: info.x ~ 0.3W ; layout2: info.x = 0
    const layout2 = rect.x === 0;

    rect.width = infoW;
    rect.x = layout2 ? 0 : listW;
    return rect;
  };

  // -----------------------------
  // Scene patches: create tabs + cancel behavior
  // -----------------------------
  const _Scene_Quest_create = Scene_Quest.prototype.create;
  Scene_Quest.prototype.create = function() {
    _Scene_Quest_create.call(this);

    if (!this._questListWindow) return;

    ensureQuestListFiltering(this._questListWindow);

    // Insert tabs above list + info windows
    const tabsH = this.calcWindowHeight(1, true);
    const y = this._questListWindow.y;
    const rect = new Rectangle(0, y, Graphics.boxWidth, tabsH);

    this._questFilterTabs = new Window_QuestFilterTabs(rect);

    // When you pick a tab, update filter and move focus to the list
    this._questFilterTabs.setHandler("inProgress", this.onQuestFilterChanged.bind(this));
    this._questFilterTabs.setHandler("completed", this.onQuestFilterChanged.bind(this));
    this._questFilterTabs.setHandler("cancel", this.popScene.bind(this));

    this.addWindow(this._questFilterTabs);

    // Push windows down so the tabs don't overlap
    this._questListWindow.y += tabsH;
    this._questListWindow.height -= tabsH;

    if (this._questInfoWindow) {
      this._questInfoWindow.y += tabsH;
      this._questInfoWindow.height -= tabsH;
    }

    // Default tab selection + list content
    this._questFilterTabs.select(0);
    this._questListWindow.setFilterMode("inProgress");

    // Start in list mode (matches your current flow)
    this._questFilterTabs.deactivate();
    this._questListWindow.activate();

    this.updateQuestInfo();
  };

  Scene_Quest.prototype.onQuestFilterChanged = function() {
    if (!this._questFilterTabs || !this._questListWindow) return;
    const mode = this._questFilterTabs.currentSymbol(); // "inProgress" | "completed"
    this._questListWindow.setFilterMode(mode);
    this.updateQuestInfo();

    // After choosing a tab, go back to the list
    this._questFilterTabs.deactivate();
    this._questListWindow.activate();
  };

  // Cancel from quest list should go back to the tabs (NOT exit the journal)
  Scene_Quest.prototype.onQuestListCancel = function() {
    if (this._questFilterTabs) {
      this._questListWindow.deactivate();
      this._questFilterTabs.activate();
      return;
    }
    this.popScene();
  };

  // Ensure info window reads the filtered quest
  const _updateQuestInfo = Scene_Quest.prototype.updateQuestInfo;
  Scene_Quest.prototype.updateQuestInfo = function() {
    if (this._questListWindow && this._questInfoWindow && this._questListWindow.currentQuest) {
      this._questInfoWindow.setQuest(this._questListWindow.currentQuest());
      return;
    }
    _updateQuestInfo.call(this);
  };
})();
