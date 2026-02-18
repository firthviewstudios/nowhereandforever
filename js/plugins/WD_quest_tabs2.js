/*:
 * @target MZ
 * @plugindesc WD_Quest addon (combined): Crown icons (89/88) + split title into 2 framed halves with centered text in each half.
 * @author You
 * @help
 * Place this plugin BELOW:
 *   1) WD_Quest.js
 *   2) WD_Quest_Tabs_Addon_v2.js
 *
 * Features (Quest Journal only):
 *  - [Primary]   -> \I[89] Quest Name
 *  - [Secondary] -> \I[88] Quest Name
 *  - Removes [Primary]/[Secondary] tags from displayed titles
 *  - Quest list draws with drawTextEx() so icons render
 *  - Replaces the single title window with TWO adjacent framed windows:
 *      Left:  Journal (centered)
 *      Right: \I[89] Primary   \I[88] Secondary (centered)
 *
 * Notes:
 *  - Uses IconSet indices 89 (Primary) and 88 (Secondary).
 */

(() => {
  "use strict";

  const ICON_PRIMARY = 89;
  const ICON_SECONDARY = 88;

  const TITLE_LEFT = "Journal";
  const LABEL_PRIMARY = "Primary";
  const LABEL_SECONDARY = "Secondary";

  const PRIMARY_ICON = `\\I[${ICON_PRIMARY}] `;
  const SECONDARY_ICON = `\\I[${ICON_SECONDARY}] `;
  const LEGEND_RIGHT = `\\I[${ICON_PRIMARY}] ${LABEL_PRIMARY}   \\I[${ICON_SECONDARY}] ${LABEL_SECONDARY}`;

  function hasTag(name, tag) {
    return typeof name === "string" && name.includes(tag);
  }

  function cleanName(name) {
    if (typeof name !== "string") return "";
    return name.replace(/\[Primary\]/gi, "").replace(/\[Secondary\]/gi, "").trim();
  }

  function normalizeStatus(q) {
    if (!q) return q;
    if (Object.prototype.hasOwnProperty.call(q, "complete") && !Object.prototype.hasOwnProperty.call(q, "status")) {
      q.status = q.complete ? "completed" : "ongoing";
    }
    if (q.status === true) q.status = "completed";
    if (q.status === false) q.status = "ongoing";
    return q;
  }

  // Center drawTextEx content by measuring the expanded width
  function drawTextExCentered(win, text, y) {
    if (!win || !win.contents) return;
    // Temporarily ensure the font is the window's current font
    const w = win.textSizeEx ? win.textSizeEx(text).width : win.contents.measureTextWidth(text);
    const x = Math.max(0, Math.floor((win.innerWidth - w) / 2));
    // drawTextEx doesn't accept alignment; we pass x
    win.drawTextEx(text, x, y, win.innerWidth);
  }

  const Scene_Quest = SceneManager.Scene_Quest;
  if (!Scene_Quest) return;

  // ---- 1) Patch quest list rendering to support \I[n] icons ----
  const _Scene_Quest_create = Scene_Quest.prototype.create;
  Scene_Quest.prototype.create = function() {
    _Scene_Quest_create.call(this);

    if (!this._questListWindow) return;

    const proto = Object.getPrototypeOf(this._questListWindow);
    if (!proto.__WD_QUEST_CROWNS_SPLIT_TITLE_CENTERED_V6__) {
      proto.__WD_QUEST_CROWNS_SPLIT_TITLE_CENTERED_V6__ = true;

      proto.makeCommandList = function() {
        let list = [];
        if (this._getFilteredQuests) {
          list = this._getFilteredQuests();
        } else if (window.$gameSystem && $gameSystem.getQuestList) {
          list = $gameSystem.getQuestList().slice();
        }

        this._filteredQuests = list;

        for (let i = 0; i < list.length; i++) {
          const q = list[i];
          const raw = q && q.name ? q.name : "";
          let display = cleanName(raw);

          if (hasTag(raw, "[Primary]")) {
            display = PRIMARY_ICON + display;
          } else if (hasTag(raw, "[Secondary]")) {
            display = SECONDARY_ICON + display;
          }

          this.addCommand(display, "questList", true, i);
        }
      };

      proto.drawItem = function(index) {
        const q = (this._filteredQuests && this._filteredQuests[index]) ? this._filteredQuests[index] : null;
        if (!q) return;

        normalizeStatus(q);

        const rect = this.itemRect(index);
        this.resetTextColor();

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

        this.drawTextEx(this.commandName(index), rect.x, rect.y, rect.width);
      };
    }

    this._questListWindow.refresh();
    this._questListWindow.select(0);
  };

  // ---- 2) Replace title with two framed windows; center contents in each ----
  const _createTitleWindow = Scene_Quest.prototype.createTitleWindow;
  Scene_Quest.prototype.createTitleWindow = function() {
    _createTitleWindow.call(this);

    const original = this._titleWindow;
    if (!original) return;

    if (this._splitTitleLeftWindow && this._splitTitleRightWindow) return;

    const x = original.x;
    const y = original.y;
    const w = original.width;
    const h = original.height;

    const halfW = Math.floor(w / 2);
    const rightW = w - halfW;

    const leftRect = new Rectangle(x, y, halfW, h);
    const rightRect = new Rectangle(x + halfW, y, rightW, h);

    const leftWin = new Window_Base(leftRect);
    const rightWin = new Window_Base(rightRect);

    leftWin.opacity = original.opacity;
    rightWin.opacity = original.opacity;

    leftWin.contents.clear();
    rightWin.contents.clear();

    // Vertical centering (approx): use lineHeight
    const yTextLeft = Math.max(0, Math.floor((leftWin.innerHeight - leftWin.lineHeight()) / 2));
    const yTextRight = Math.max(0, Math.floor((rightWin.innerHeight - rightWin.lineHeight()) / 2));

    leftWin.drawText(TITLE_LEFT, 0, yTextLeft, leftWin.innerWidth, "center");
    drawTextExCentered(rightWin, LEGEND_RIGHT, yTextRight);

    this.addWindow(leftWin);
    this.addWindow(rightWin);

    this._splitTitleLeftWindow = leftWin;
    this._splitTitleRightWindow = rightWin;

    original.hide();
    original.opacity = 0;
    if (original.contents) original.contents.clear();
  };

})();