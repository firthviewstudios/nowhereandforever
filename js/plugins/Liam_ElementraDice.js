/*:
 * @target MZ
 * @plugindesc Elementra Dice Game with Typhoon reroll, centered UI, updated dice graphics, and instant Elementra win. 
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
    // Arena Window
    // ---------------------------------------------------------
    class Window_ElementraArena extends Window_Base {
        initialize() {
            const sw = Graphics.width;
            const sh = Graphics.height;

            const w = Math.floor(sw * 0.8);
            const h = Math.floor(sh * 0.95);
            const x = Math.floor(sw * 0.1);
            const y = Math.floor(sh * 0.025);

            super.initialize(new Rectangle(x, y, w, h));
            this.refresh();
        }

        refresh() {
            this.contents.clear();
        }
    }

    // ---------------------------------------------------------
    // Typhoon choice window (P1)
    // ---------------------------------------------------------
    class Window_TyphoonChoice extends Window_Command {
        initialize(rect) {
            super.initialize(rect);
            this.openness = 0;
            this.open(); // default RPG Maker animation
        }

        makeCommandList() {
            this.addCommand("Reroll Fire", "fire");
            this.addCommand("Reroll Wind", "wind");
            this.addCommand("Do Not Reroll", "none");
        }
    }

    // ---------------------------------------------------------
    // Scene_ElementraDice
    // ---------------------------------------------------------
    class Scene_ElementraDice extends Scene_Base {
        create() {
            super.create();
            this._buttonsCreated = false;
            this._inputCooldown = 0;
            this.createBackground();
            this.createWindowLayer();
            this.createArenaWindow();
            this.createModifiersWindow();
            this.initDiceData();

            this._modifierText = [];
	    this._goldResultText = "";
	    this._goldBefore = 0;
            this._goldAfter = 0;

            this._phase = "p1Roll";

            this._queuedTyphoonPrompt = false;

            this._p1HasTyphoon = false;
            this._p1HasInferno = false;
            this._p1HasHurricane = false;

            this._p2HasTyphoon = false;
            this._p2HasInferno = false;
            this._p2HasHurricane = false;

            this._elementraWinner = 0;

            this._diceSprites = [];
            this._elementraWinner = 0;

            this._diceSprites = [];
            this._betAmount = 0;   // ⭐ current round bet
        }

        start() {
this._inputCooldown = 20; // 20 frames = ~1/3 second    
    this._modifierText = [];
    super.start();

    // ⭐ Read bet from Variable #1
    this._betAmount = $gameVariables.value(196) || 0;

    // ⭐ Initialize prize pot BEFORE any debug or gold logic
    this._prizePot = this._betAmount * 2;

    // ⭐ Record gold before betting
    this._goldBefore = $gameParty.gold();
    this.debugGold("Round Start - Gold Before", this._goldBefore);
    this.debugGold("Round Start - Stake", this._betAmount);
    this.debugGold("Round Start - Prize Pot", this._prizePot);

    // If there is a bet, check gold and deduct
    if (this._betAmount > 0) {
        if ($gameParty.gold() < this._betAmount) {
            $gameMessage.add("You don't have enough gold to place that bet.");
            SceneManager.pop();
            return;
        }
        $gameParty.loseGold(this._betAmount);
    }

    this.processP1();
}

      update() {
    super.update();

    if (this._inputCooldown > 0) {
        this._inputCooldown--;
        TouchInput.clear();   // <-- required
        return;
    }

    if (this._queuedTyphoonPrompt && this._phase === "p1RollComplete") {
        this._queuedTyphoonPrompt = false;
        this.openTyphoonChoice();
    }

    if (this._phase === "results") {
        // no auto-close
    }
}
   createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);
        }

        createWindowLayer() {
            this._windowLayer = new WindowLayer();
            this.addChild(this._windowLayer);
        }

        createArenaWindow() {
            this._arenaWindow = new Window_ElementraArena();
            this._windowLayer.addChild(this._arenaWindow);
        }
createModifiersWindow() {
    const w = this._arenaWindow;
    const rect = new Rectangle(
        w.x + 10,
        w.y + 10,
        w.width - 20,
        160 // height of the scrollable area
    );

    this._modWindow = new Window_ElementraModifiers(rect);
    this.addWindow(this._modWindow);
}
setEndButtonsVisible(visible) {
    if (this._playAgainButton) this._playAgainButton.visible = visible;
    if (this._quitButton) this._quitButton.visible = visible;
    if (this._playAgainLabel) this._playAgainLabel.visible = visible;
    if (this._quitLabel) this._quitLabel.visible = visible;
}
createEndButtons() {
    const w = this._arenaWindow;

    // Shift everything slightly right
    const buttonX = w.x + w.width - 230;   // moved right from -260
    const buttonY = w.y + w.height - 150;  // adjusted for vertical stack

    // --- Play Again button ---
    this._playAgainButton = new Sprite_Button("ok");
    this._playAgainButton.x = buttonX;
    this._playAgainButton.y = buttonY;

    // ⭐ Shrink button slightly
    this._playAgainButton.scale.x = 0.9;
    this._playAgainButton.scale.y = 0.9;

    this._playAgainButton.setClickHandler(this.onPlayAgain.bind(this));
    this.addChild(this._playAgainButton);

    // --- Play Again label ---
    this._playAgainLabel = new Sprite(new Bitmap(240, 40));

    // ⭐ Use same font as Window_Base
    this._playAgainLabel.bitmap.fontFace = $gameSystem.mainFontFace();
    this._playAgainLabel.bitmap.fontSize = 22;

    this._playAgainLabel.bitmap.drawText("Play Again", 0, 0, 240, 40, "left");

    // Position label to the right of the button
    this._playAgainLabel.x = buttonX + 100;
    this._playAgainLabel.y = buttonY + 4;
    this.addChild(this._playAgainLabel);

    // --- Quit button ---
    this._quitButton = new Sprite_Button("cancel");
    this._quitButton.x = buttonX;
    this._quitButton.y = buttonY + 55;   // stacked below

    // ⭐ Shrink button slightly
    this._quitButton.scale.x = 0.9;
    this._quitButton.scale.y = 0.9;

    this._quitButton.setClickHandler(this.onQuit.bind(this));
    this.addChild(this._quitButton);

    // --- Quit label ---
    this._quitLabel = new Sprite(new Bitmap(240, 40));

    // ⭐ Same font as UI
    this._quitLabel.bitmap.fontFace = $gameSystem.mainFontFace();
    this._quitLabel.bitmap.fontSize = 22;

    this._quitLabel.bitmap.drawText("Quit", 0, 0, 240, 40, "left");

    this._quitLabel.x = buttonX + 100;
    this._quitLabel.y = buttonY + 55 + 4;
    this.addChild(this._quitLabel);
}
debugGold(label, value) {
    console.log(
        `%c[GoldDebug] %c${label}: %c${value}`,
        "color: #FFD700; font-weight: bold;",
        "color: #00FFFF;",
        "color: #FFFFFF;"
    );
}

        initDiceData() {
            this.p1 = {
                water: 0, fire: 0, wind: 0,
                original: { water: 0, fire: 0, wind: 0 },
                total: 0
            };
            this.p2 = {
                water: 0, fire: 0, wind: 0,
                original: { water: 0, fire: 0, wind: 0 },
                total: 0
            };
        }

        // -----------------------------------------------------
        // Dice rolling helpers
        // -----------------------------------------------------
        rollDie() {
            return 1 + Math.randomInt(7);
        }

        rollPlayerDice(player) {
            const obj = player === 1 ? this.p1 : this.p2;
            obj.water = this.rollDie();
            obj.fire  = this.rollDie();
            obj.wind  = this.rollDie();
            obj.original = { water: obj.water, fire: obj.fire, wind: obj.wind };
        }

        // -----------------------------------------------------
        // Phase 1: Player 1
        // -----------------------------------------------------
        processP1() {
            this.rollPlayerDice(1);
            AudioManager.playSe({ name: "dice_roll", volume: 100, pitch: 100, pan: 0 });

            const w = this.p1.water;
            const f = this.p1.fire;
            const d = this.p1.wind;

            this._p1HasTyphoon   = (w === 7);
            this._p1HasInferno   = (f === 7);
            this._p1HasHurricane = (d === 7);

            // Elementra auto-win BEFORE reroll
            if (this._p1HasTyphoon && this._p1HasInferno && this._p1HasHurricane) {
                this._elementraWinner = 1;
                this._modifierText.push("\\C[1]Elementra!\\C[0] — You rolled Typhoon, Inferno, and Hurricane.");
                this.finishAndDraw();
                return;
            }

            if (this._p1HasTyphoon) {
                // Keep Water as 7 so the elemental face is always shown
                this.p1.water = 7;
                this.p1.original.water = 7;

                this._modifierText.push(
                    "Your \\C[1]Typhoon\\C[0] triggered — you may reroll \\C[3]Fire\\C[0] or \\C[4]Wind\\C[0]."
                );

                this._queuedTyphoonPrompt = true;
                this._phase = "p1RollComplete";

                this.clearDiceSprites();
                this.createDiceSprites(true);
                this.drawResults(true);
                return;
            }

            if (this._p1HasHurricane) {
                this._modifierText.push(
                    "Your \\C[4]Hurricane\\C[0] will increase your \\C[1]Water\\C[0] and \\C[3]Fire\\C[0] by 1."
                );
                this.p1.water += 1;
                this.p1.fire  += 1;
            }

            this.processP2();
        }

        // -----------------------------------------------------
        // Typhoon choice window
        // -----------------------------------------------------
        openTyphoonChoice() {
            const width = 420;
            const height = 180; // taller to show all 3 options comfortably

            const x = (Graphics.width - width) / 2;
            const y = 450; // position as agreed

            const rect = new Rectangle(x, y, width, height);
            this._typhoonWindow = new Window_TyphoonChoice(rect);

            this._typhoonWindow.setHandler("fire", this.onTyphoonFire.bind(this));
            this._typhoonWindow.setHandler("wind", this.onTyphoonWind.bind(this));
            this._typhoonWindow.setHandler("none", this.onTyphoonNone.bind(this));
            this._typhoonWindow.setHandler("cancel", this.onTyphoonNone.bind(this));

            this.addChild(this._typhoonWindow); // above dice sprites
            this._typhoonWindow.activate();
            this.setEndButtonsVisible(false);
        }

        // -----------------------------------------------------
        // Reroll handlers
        // -----------------------------------------------------
        onTyphoonFire() {
            const old = this.p1.fire;
            const newVal = this.rollDie();

            this.p1.fire = newVal;
            this.p1.original.fire = newVal;

            this._modifierText.push(
                "Your \\C[1]Typhoon\\C[0] rerolled \\C[3]Fire\\C[0] (" + old + " → " + newVal + ")."
            );

            this.afterTyphoonChoice();
        }

        onTyphoonWind() {
            const old = this.p1.wind;
            const newVal = this.rollDie();

            this.p1.wind = newVal;
            this.p1.original.wind = newVal;

            this._modifierText.push(
                "Your \\C[1]Typhoon\\C[0] rerolled \\C[4]Wind\\C[0] (" + old + " → " + newVal + ")."
            );

            this.afterTyphoonChoice();
        }

        onTyphoonNone() {
            this._modifierText.push("You chose not to reroll after \\C[1]Typhoon\\C[0].");
            this.afterTyphoonChoice();
        }

        // -----------------------------------------------------
        // After reroll
        // -----------------------------------------------------
        afterTyphoonChoice() {
            this.removeChild(this._typhoonWindow);
            this._typhoonWindow = null;

            // Re-check special symbols AFTER reroll
            this._p1HasTyphoon   = (this.p1.water === 7);
            this._p1HasInferno   = (this.p1.fire  === 7);
            this._p1HasHurricane = (this.p1.wind  === 7);

            // Instant Elementra win AFTER reroll
            if (this._p1HasTyphoon && this._p1HasInferno && this._p1HasHurricane) {
                this._elementraWinner = 1;
                this._modifierText.push("\\C[1]Elementra!\\C[0] — You rolled all three symbols after reroll.");
                this.finishAndDraw();
                return;
            }

            // Apply Hurricane AFTER reroll
            if (this._p1HasHurricane) {
                this._modifierText.push(
                    "Your \\C[4]Hurricane\\C[0] increased your \\C[1]Water\\C[0] and \\C[3]Fire\\C[0] by 1."
                );
                this.p1.water += 1;
                this.p1.fire  += 1;
            }

            // Update P1 dice immediately
            this.clearDiceSprites();
            this.createDiceSprites(true);
            this.drawResults(true);

            this._phase = "p2Roll";
            this.setEndButtonsVisible(true);
            this.processP2();
        }

        // -----------------------------------------------------
        // Phase 2: Player 2
        // -----------------------------------------------------
        processP2() {
            this.rollPlayerDice(2);
             AudioManager.playSe({ name: "dice_roll", volume: 100, pitch: 100, pan: 0 });

            const w = this.p2.water;
            const f = this.p2.fire;
            const d = this.p2.wind;

            this._p2HasTyphoon   = (w === 7);
            this._p2HasInferno   = (f === 7);
            this._p2HasHurricane = (d === 7);

            if (this._p2HasTyphoon && this._p2HasInferno && this._p2HasHurricane) {
                this._elementraWinner = 2;
                this._modifierText.push("\\C[1]Elementra!\\C[0] — Your opponent rolled Typhoon, Inferno, and Hurricane.");
                this.finishAndDraw();
                return;
            }

            if (this._p2HasTyphoon) {
                this._modifierText.push(
                    "Opponent's \\C[1]Typhoon\\C[0] increased their \\C[3]Fire\\C[0] and \\C[4]Wind\\C[0] by 1."
                );
                this.p2.fire += 1;
                this.p2.wind += 1;
            }

            if (this._p2HasInferno) {
                this._modifierText.push(
                    "Opponent's \\C[3]Inferno\\C[0] reduced your \\C[1]Water\\C[0] and \\C[4]Wind\\C[0] by 1."
                );
                this.p1.water -= 1;
                this.p1.wind  -= 1;
            }

            if (this._p2HasHurricane) {
                this._modifierText.push(
                    "Opponent's \\C[4]Hurricane\\C[0] reduced your \\C[1]Water\\C[0] by 1 and increased their \\C[3]Fire\\C[0] by 1."
                );
                this.p1.water -= 1;
                this.p2.fire  += 1;
            }

            if (this._p1HasInferno) {
                this._modifierText.push(
                    "Your \\C[3]Inferno\\C[0] reduced your opponent's \\C[1]Water\\C[0] and \\C[4]Wind\\C[0] by 1."
                );
                this.p2.water -= 1;
                this.p2.wind  -= 1;
            }

            this.finishAndDraw();
        }

      // -----------------------------------------------------
// Scoring & drawing
// -----------------------------------------------------
finishAndDraw() {

    
    if (this._roundFinished) return;
    this._roundFinished = true;

    // ... rest of your logic
    // Determine winner totals unless Elementra auto‑win happened
    if (this._elementraWinner === 0) {
        this.calculateMastery();
    } else {
        this.p1.total = 0;
        this.p2.total = 0;
    }

    // ⭐ Gambling payout logic
    if (this._betAmount > 0) {
        const bet = this._betAmount;

        const playerWins =
            this._elementraWinner === 1 ||
            (this._elementraWinner === 0 && this.p1.total > this.p2.total);

        const opponentWins =
            this._elementraWinner === 2 ||
            (this._elementraWinner === 0 && this.p2.total > this.p1.total);

        if (playerWins) {

    // ⭐ Base winnings = 2x bet
    let winnings = bet * 2;

    // ⭐ Elementra bonus: double AGAIN (total 4x)
    if (this._elementraWinner === 1) {
        winnings = bet * 4;
    }

    $gameParty.gainGold(winnings);
this.debugGold("Awarded Winnings", winnings);
this.debugGold("Gold After Award", $gameParty.gold());

    if (this._elementraWinner === 1) {
        this._goldResultText = `Elementra Bonus! You won \\C[17]${winnings}\\C[0] gold.`;
    } else {
        this._goldResultText = `You won \\C[17]${winnings}\\C[0] gold.`;
    }
} else if (opponentWins) {
           this._goldResultText = `You lost \\C[17]${bet}\\C[0] gold.`;
        } else {
            // Draw → refund
$gameParty.gainGold(this._betAmount);
this.debugGold("Refunded Stake", this._betAmount);
this.debugGold("Gold After Refund", $gameParty.gold());
           this._goldResultText = `It's a draw — your \\C[17]${bet}\\C[0] gold was refunded.`;
        }
	// ⭐ Record gold after the round
	this._goldAfter = $gameParty.gold();
this.debugGold("Round End - Gold Before", this._goldBefore);
this.debugGold("Round End - Gold After", $gameParty.gold());
    }

    // Draw UI
    this.clearDiceSprites();
    this.createDiceSprites(false);
    this.drawResults(false);
    this._phase = "results";
    this.setEndButtonsVisible(true);
    if (!this._buttonsCreated) {
    this.createEndButtons();
    this._buttonsCreated = true;
 }
}

onPlayAgain() {
    AudioManager.playSe({ name: "dice_roll", volume: 100, pitch: 100, pan: 0 });
    this.debugGold("Play Again - Gold Before Reset", $gameParty.gold());

    // ⭐ Preserve the existing stake correctly
    const stake = this._betAmount;

    // ⭐ Reset round state
    this._modifierText = [];
    this._modWindow.setLines([]);
    this._roundFinished = false;

    // ⭐ Reapply stake and prize pot
    this._betAmount = stake;
    this._prizePot = stake * 2;

    // ⭐ Reset gold snapshot
    this._goldBefore = $gameParty.gold();

    this.clearDiceSprites();
    this.start();
    this._inputCooldown = 20;

    this.debugGold("Play Again - New Gold Before Snapshot", this._goldBefore);
}

onQuit() {
    AudioManager.playSe({ name: "Cancel2", volume: 90, pitch: 100, pan: 0 });
    SceneManager.pop(); // return to main game map
}

// -----------------------------------------------------
// Mastery scoring
// -----------------------------------------------------
calculateMastery() {
    let p1Score = 0;
    let p2Score = 0;

    const compare = (a, b) => {
        if (a > b) p1Score++;
        else if (b > a) p2Score++;
        else { p1Score++; p2Score++; } // tie = both get 1
    };

    compare(this.p1.water, this.p2.water);
    compare(this.p1.fire,  this.p2.fire);
    compare(this.p1.wind,  this.p2.wind);

    this.p1.total = p1Score;
    this.p2.total = p2Score;
}

        // ---------------------------------------------------------
        // Dice Sprites
        // ---------------------------------------------------------
        clearDiceSprites() {
            if (!this._diceSprites) return;
            for (const s of this._diceSprites) this.removeChild(s);
            this._diceSprites = [];
        }

        createDiceSprites(onlyP1) {
            this._diceSprites = [];

            // lowered by 50px
            const p1Y = 390;
            const p2Y = 490;

            const x1 = 380;
            const x2 = 480;
            const x3 = 580;

            this.addDiceSprite("water", this.p1.original.water, x1, p1Y);
            this.addDiceSprite("fire",  this.p1.original.fire,  x2, p1Y);
            this.addDiceSprite("wind",  this.p1.original.wind,  x3, p1Y);

            if (!onlyP1) {
                this.addDiceSprite("water", this.p2.original.water, x1, p2Y);
                this.addDiceSprite("fire",  this.p2.original.fire,  x2, p2Y);
                this.addDiceSprite("wind",  this.p2.original.wind,  x3, p2Y);
            }
        }

        addDiceSprite(element, value, x, y) {
            const sprite = new Sprite();

            let v = value;
            if (v < 1) v = 1;
            if (v > 7) v = 7;

            let filename = "";

            if (v === 7) {
                if (element === "water") filename = "BlueWater";
                if (element === "fire")  filename = "RedFire";
                if (element === "wind")  filename = "GreenTornado";
            } else {
                if (element === "water") filename = `Blue${v}`;
                if (element === "fire")  filename = `Red${v}`;
                if (element === "wind")  filename = `Green${v}`;
            }

            sprite.bitmap = ImageManager.loadPicture(filename);
            sprite.x = x;
            sprite.y = y;

            this.addChild(sprite);
            this._diceSprites.push(sprite);
        }

        // ---------------------------------------------------------
        // Centered text helper
        // ---------------------------------------------------------
        drawTextExCentered(win, text, x, y, width) {
            const tw = win.textSizeEx(text).width;
            const sx = x + (width - tw) / 2;
            win.drawTextEx(text, sx, y);
        }

        // ---------------------------------------------------------
        // Results
        // ---------------------------------------------------------
        drawResults(onlyP1) {
            const w = this._arenaWindow;
            const lh = w.lineHeight();

            w.contents.clear();

            let y = 0;
            // ⭐ FEED MODIFIERS INTO SCROLL WINDOW
this._modWindow.setLines(this._modifierText);

// Move Y down by the height of the scroll window
y += this._modWindow.height;
y += 20; // padding

            if (onlyP1) return;

            // padding + raise ONLY the results content by 50px
		y += lh;
		y += 20;   // padding between modifiers and results
		y -= 50;   // raise results content

            const colW = w.width / 3;
            const leftX = 0;
            const midX  = colW;
            const rightX = colW * 2;

            const formatLine = (label, value) => {
                const colored =
                    label === "Water" ? "\\C[1]Water\\C[0]" :
                    label === "Fire"  ? "\\C[3]Fire\\C[0]"  :
                                        "\\C[4]Wind\\C[0]";
                return `${colored}: ${value}`;
            };

            let result = "";
            if (this._elementraWinner === 1) result = "\\I[87] YOU WIN";
            else if (this._elementraWinner === 2) result = "OPPONENT WINS \\I[87]";
            else if (this.p1.total > this.p2.total) result = "\\I[87] YOU WIN";
            else if (this.p2.total > this.p1.total) result = "OPPONENT WINS \\I[87]";
            else result = "DRAW";

            this.drawTextExCentered(w, "---YOU---", leftX, y, colW);
            this.drawTextExCentered(w, formatLine("Water", this.p1.water), leftX, y + lh, colW);
            this.drawTextExCentered(w, formatLine("Fire",  this.p1.fire),  leftX, y + lh * 2, colW);
            this.drawTextExCentered(w, formatLine("Wind",  this.p1.wind),  leftX, y + lh * 3, colW);
            w.drawText(`Elements mastered: ${this.p1.total}`, leftX, y + lh * 4, colW, "center");


// --- STAKE & PAYOUT INFO (under YOU column) ---
if (this._betAmount > 0) {
const beforeText = `\\I[314]Gold Before:\\C[17]${this._goldBefore}\\C[0]`;
const stakeText  = `\\I[314]Stake: \\C[17]${this._betAmount}\\C[0]`;
const winText    = `\\I[314]Prize Pot:  \\C[17]${this._betAmount * 2}\\C[0]`;
const afterText  = `\\I[314]Gold After: \\C[17]${this._goldAfter}\\C[0]`;
    
w.drawTextEx(beforeText, leftX, y + lh * 6);
w.drawTextEx(stakeText,  leftX, y + lh * 7);
w.drawTextEx(winText,    leftX, y + lh * 8);
w.drawTextEx(afterText,  leftX, y + lh * 9);
}

            this.drawTextExCentered(w, "---RESULTS---", midX, y, colW);

// Main result text (YOU WIN / OPPONENT WINS / DRAW)
this.drawTextExCentered(w, result, midX, y + lh * 2, colW);

// ⭐ Gold payout text (win / lose / refund)
if (this._goldResultText && this._goldResultText.length > 0) {
    this.drawTextExCentered(w, this._goldResultText, midX, y + lh * 3, colW);
}

            this.drawTextExCentered(w, "---OPPONENT---", rightX, y, colW);
            this.drawTextExCentered(w, formatLine("Water", this.p2.water), rightX, y + lh, colW);
            this.drawTextExCentered(w, formatLine("Fire",  this.p2.fire),  rightX, y + lh * 2, colW);
            this.drawTextExCentered(w, formatLine("Wind",  this.p2.wind),  rightX, y + lh * 3, colW);
            w.drawText(`Elements mastered: ${this.p2.total}`, rightX, y + lh * 4, colW, "center");
        }
    }
class Window_ElementraModifiers extends Window_Base {
    initialize(rect) {
        super.initialize(rect);
        this._lines = [];
        this._scrollY = 0;
        this.activate();
        this.refresh();
    }

    setLines(lines) {
        this._lines = lines;
        this.refresh();
    }
drawTextExCentered(text, y) {
    // Strip escape codes safely
    const plain = text
        .replace(/\\C\[\d+\]/g, "")
        .replace(/\\I\[\d+\]/g, "");

    const width = this.textWidth(plain);
    const x = Math.max(0, (this.contentsWidth() - width) / 2);

    this.drawTextEx(text, x, y, this.contentsWidth());
}

refresh() {
    this.contents.clear();

    const lh = this.lineHeight();
    let y = -this._scrollY;

    // Header
    this.drawTextExCentered("---MODIFIERS---", y);
    y += lh;

    // Lines
    for (const line of this._lines) {
        this.drawTextExCentered(line, y);
        y += lh;
    }

     this._totalHeight = y + this.lineHeight();
}
    update() {
        super.update();
        this.processWheelScroll();
    }

    processWheelScroll() {
    // Window_Base does NOT have isOpenAndActive(), so we use this instead:
    if (!this.visible || !this.active) return;

    const threshold = 20;
    const wheel = TouchInput.wheelY;

    if (wheel > threshold) this.scrollDown();
    else if (wheel < -threshold) this.scrollUp();
}

    scrollDown() {
        const maxScroll = Math.max(0, this._totalHeight - this.contentsHeight());
        this._scrollY = Math.min(maxScroll, this._scrollY + 24);
        this.refresh();
    }

    scrollUp() {
        this._scrollY = Math.max(0, this._scrollY - 24);
        this.refresh();
    }
}

}

)();
