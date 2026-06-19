/*:
 * @target MZ
 * @plugindesc Elementra Dice Game as a custom scene using default window skin.
 * @author Liam
 *
 * @command startDiceGame
 * @text Start Elementra Dice Game
 * @desc Opens the Elementra Dice Game scene.
 */

(() => {
    "use strict";

    const pluginName = "Liam_ElementraDice";

    PluginManager.registerCommand(pluginName, "startDiceGame", () => {
        SceneManager.push(Scene_ElementraDice);
    });

    // ---------------------------------------------------------
    // 80% Arena Window
    // ---------------------------------------------------------
    class Window_ElementraArena extends Window_Base {
        initialize() {
            const sw = Graphics.width;
            const sh = Graphics.height;

            const w = Math.floor(sw * 0.8);
            const h = Math.floor(sh * 0.8);
            const x = Math.floor(sw * 0.1);
            const y = Math.floor(sh * 0.1);

            super.initialize(new Rectangle(x, y, w, h));
            this.contentsOpacity = 255;
            this.refresh();
        }

        refresh() {
            this.contents.clear();
        }
    }

    // ---------------------------------------------------------
    // Scene_ElementraDice
    // ---------------------------------------------------------
    class Scene_ElementraDice extends Scene_Base {
        create() {
            super.create();
            this.createBackground();
            this.createWindowLayer();
            this.createArenaWindow();
            this.initDiceData();
        }

        start() {
            super.start();
            this.rollDice();
            this.applySymbols();
            this.calculateTotals();
            this.createDiceSprites();
            this.drawResults();
        }

        update() {
            super.update();
            if (Input.isTriggered("ok") || Input.isTriggered("cancel")) {
                SceneManager.pop();
            }
        }

        // ---------------- Background ----------------
        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);
        }

        // ---------------- Window Layer ----------------
        createWindowLayer() {
            this._windowLayer = new WindowLayer();
            this.addChild(this._windowLayer);
        }

        // ---------------- Arena Window ----------------
        createArenaWindow() {
            this._arenaWindow = new Window_ElementraArena();
            this._windowLayer.addChild(this._arenaWindow);
        }

        // ---------------- Dice Data ----------------
        initDiceData() {
            this.p1 = { water: 0, fire: 0, wind: 0, total: 0 };
            this.p2 = { water: 0, fire: 0, wind: 0, total: 0 };
        }

        rollDice() {
            const r = () => 1 + Math.randomInt(6);

            this.p1.water = r();
            this.p1.fire  = r();
            this.p1.wind  = r();

            this.p2.water = r();
            this.p2.fire  = r();
            this.p2.wind  = r();
        }

        // ---------------- Symbol Effects ----------------
        applySymbols() {
            // Player 1
            if (this.p1.water === 7) this.applyTyphoon(1);
            if (this.p1.fire  === 7) this.applyInferno(1);
            if (this.p1.wind  === 7) this.applyHurricane(1);

            // Player 2
            if (this.p2.water === 7) this.applyTyphoon(2);
            if (this.p2.fire  === 7) this.applyInferno(2);
            if (this.p2.wind  === 7) this.applyHurricane(2);
        }

        applyTyphoon(player) {
            if (player === 1) {
                this.p1.water = 0;
                this.p2.water += 1;
            } else {
                this.p2.water = 0;
                this.p1.water += 1;
            }
        }

        applyInferno(player) {
            if (player === 1) {
                this.p1.fire = 0;
                this.p2.fire += 1;
            } else {
                this.p2.fire = 0;
                this.p1.fire += 1;
            }
        }

        applyHurricane(player) {
            if (player === 1) {
                this.p1.wind = 0;
                this.p2.wind += 1;
            } else {
                this.p2.wind = 0;
                this.p1.wind += 1;
            }
        }

        // ---------------- Totals ----------------
        calculateTotals() {
            this.p1.total = this.p1.water + this.p1.fire + this.p1.wind;
            this.p2.total = this.p2.water + this.p2.fire + this.p2.wind;
        }

        // ---------------- Dice Sprites ----------------
        createDiceSprites() {
            this._diceSprites = [];

            // Player 1
            this.addDiceSprite("Blue",  this.p1.water, 260, 220);
            this.addDiceSprite("Red",   this.p1.fire,  360, 220);
            this.addDiceSprite("Green", this.p1.wind,  460, 220);

            // Player 2
            this.addDiceSprite("Blue",  this.p2.water, 260, 380);
            this.addDiceSprite("Red",   this.p2.fire,  360, 380);
            this.addDiceSprite("Green", this.p2.wind,  460, 380);
        }

        addDiceSprite(color, value, x, y) {
            const sprite = new Sprite();

            // Build filename based on your naming scheme
            // Blue1.png, Blue2.png, ..., Blue6.png
            const filename = `${color}${value}`;

            sprite.bitmap = ImageManager.loadPicture(filename);
            sprite.x = x;
            sprite.y = y;

            this.addChild(sprite);
            this._diceSprites.push(sprite);
        }

        // ---------------- Results ----------------
        drawResults() {
            const w = this._arenaWindow;
            const lh = w.lineHeight();

            let result = "";
            if (this.p1.total > this.p2.total) result = "YOU WIN";
            else if (this.p2.total > this.p1.total) result = "OPPONENT WINS";
            else result = "DRAW";

            w.contents.clear();

            // Left: YOU
            w.drawText("---YOU---", 0, lh * 0, w.width / 3, "left");
            w.drawText(`Water: ${this.p1.water}`, 0, lh * 1, w.width / 3, "left");
            w.drawText(`Fire:  ${this.p1.fire}`, 0, lh * 2, w.width / 3, "left");
            w.drawText(`Wind:  ${this.p1.wind}`, 0, lh * 3, w.width / 3, "left");
            w.drawText(`Total: ${this.p1.total}`, 0, lh * 4, w.width / 3, "left");

            // Center: RESULT
            w.drawText("---RESULTS---", w.width / 3, lh * 0, w.width / 3, "center");
            w.drawText(result,        w.width / 3, lh * 2, w.width / 3, "center");

            // Right: OPPONENT
            w.drawText("---OPPONENT---", w.width * 2 / 3, lh * 0, w.width / 3, "left");
            w.drawText(`Water: ${this.p2.water}`, w.width * 2 / 3, lh * 1, w.width / 3, "left");
            w.drawText(`Fire:  ${this.p2.fire}`,  w.width * 2 / 3, lh * 2, w.width / 3, "left");
            w.drawText(`Wind:  ${this.p2.wind}`,  w.width * 2 / 3, lh * 3, w.width / 3, "left");
            w.drawText(`Total: ${this.p2.total}`, w.width * 2 / 3, lh * 4, w.width / 3, "left");
        }
    }

})();
