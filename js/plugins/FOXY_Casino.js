/*:
 * @target MZ
 * @plugindesc Casino tables for Slots, Roulette, Poker, Blackjack, Baccarat, War, Hi-Lo, 3 Card Poker, and Craps.
 * @author FoxyBimbo
 * @url https://github.com/FoxyBimbo/Foxy-Plugins
 *
 * @help FOXY_Casino.js
 *
 * Opens casino tables that use party gold as the wager.
 * Each table supports keyboard, mouse, touch, and gamepad input.
 *
 * Use the plugin commands to open a specific game.
 * Bets are adjusted inside each scene.
 * Optional common events can run after wins or losses for each game.
 *
 * @command startSlots
 * @text Start Slots
 * @desc Open the Slots table.
 *
 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.
 *
 * @command startRoulette
 * @text Start Roulette
 * @desc Open the Roulette table.
 *
 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.
 *
 * @command startPoker
 * @text Start Poker
 * @desc Open the Poker table.
 *
 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.
 *
 * @command startBlackjack
 * @text Start Blackjack
 * @desc Open the Blackjack table.
 *
 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.

 * @command startBaccarat
 * @text Start Baccarat
 * @desc Open the Baccarat table.

 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.

 * @command startWar
 * @text Start War
 * @desc Open the War table.

 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.

 * @command startHiLo
 * @text Start Hi-Lo
 * @desc Open the Hi-Lo table.

 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.

 * @command startThreeCardPoker
 * @text Start Three Card Poker
 * @desc Open the Three Card Poker table.

 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.

 * @command startCraps
 * @text Start Craps
 * @desc Open the Craps table.

 * @arg startingBet
 * @text Starting Bet
 * @type number
 * @min 0
 * @default 0
 * @desc Optional opening bet. 0 uses the plugin default.
 *
 * @param General Settings
 * @text General Settings
 *
 * @param Default Bet
 * @parent General Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Default opening bet for all tables.
 *
 * @param Bet Step
 * @parent General Settings
 * @type number
 * @min 1
 * @default 10
 * @desc How much the bet changes per press.
 *
 * @param Slots Settings
 * @text Slots Settings
 *
 * @param Slots Min Bet
 * @parent Slots Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Slots.
 *
 * @param Slots Max Bet
 * @parent Slots Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Slots.
 *
 * @param Slot Emoji List
 * @parent Slots Settings
 * @type text[]
 * @default ["🍒","🍋","🔔","⭐","💎","7️⃣"]
 * @desc Order symbols from most common to most rare. The last entry appears once per reel strip.
 *
 * @param Slots Jackpot Multiplier
 * @parent Slots Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 15
 * @desc Payout multiplier for a triple of the rarest slot symbol.
 *
 * @param Slots Triple Multiplier
 * @parent Slots Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 5
 * @desc Payout multiplier for any other triple match.
 *
 * @param Slots Pair Multiplier
 * @parent Slots Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for any pair.
 *
 * @param Slots Win Common Event
 * @parent Slots Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Slots result.
 *
 * @param Slots Lose Common Event
 * @parent Slots Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Slots result.
 *
 * @param Roulette Settings
 * @text Roulette Settings
 *
 * @param Roulette Min Bet
 * @parent Roulette Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Roulette.
 *
 * @param Roulette Max Bet
 * @parent Roulette Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Roulette.
 *
 * @param Roulette Straight Multiplier
 * @parent Roulette Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 36
 * @desc Payout multiplier for an exact number.
 *
 * @param Roulette Color Multiplier
 * @parent Roulette Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for Red or Black.
 *
 * @param Roulette EvenOdd Multiplier
 * @parent Roulette Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for Even or Odd.
 *
 * @param Roulette Range Multiplier
 * @parent Roulette Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for 1-18 or 19-36.
 *
 * @param Roulette Win Common Event
 * @parent Roulette Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Roulette result.
 *
 * @param Roulette Lose Common Event
 * @parent Roulette Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Roulette result.
 *
 * @param Poker Settings
 * @text Poker Settings
 *
 * @param Poker Min Bet
 * @parent Poker Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Poker.
 *
 * @param Poker Max Bet
 * @parent Poker Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Poker.

 * @param Poker Wild Cards
 * @parent Poker Settings
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * @desc Add four wild cards to the Poker deck when enabled.
 *
 * @param Poker Pair Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for one pair.
 *
 * @param Poker Two Pair Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 3
 * @desc Payout multiplier for two pair.
 *
 * @param Poker Three Kind Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 4
 * @desc Payout multiplier for three of a kind.
 *
 * @param Poker Straight Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 5
 * @desc Payout multiplier for a straight.
 *
 * @param Poker Flush Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 7
 * @desc Payout multiplier for a flush.
 *
 * @param Poker Full House Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 9
 * @desc Payout multiplier for a full house.
 *
 * @param Poker Four Kind Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 20
 * @desc Payout multiplier for four of a kind.
 *
 * @param Poker Straight Flush Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 50
 * @desc Payout multiplier for a straight flush.
 *
 * @param Poker Royal Flush Multiplier
 * @parent Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 100
 * @desc Payout multiplier for a royal flush.
 *
 * @param Poker Win Common Event
 * @parent Poker Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Poker result.
 *
 * @param Poker Lose Common Event
 * @parent Poker Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Poker result.
 *
 * @param Blackjack Settings
 * @text Blackjack Settings
 *
 * @param Blackjack Min Bet
 * @parent Blackjack Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Blackjack.
 *
 * @param Blackjack Max Bet
 * @parent Blackjack Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Blackjack.
 *
 * @param Blackjack Win Multiplier
 * @parent Blackjack Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for a normal Blackjack win.
 *
 * @param Blackjack Blackjack Multiplier
 * @parent Blackjack Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2.5
 * @desc Payout multiplier for a natural Blackjack.
 *
 * @param Blackjack Dealer Stand Value
 * @parent Blackjack Settings
 * @type number
 * @min 1
 * @default 17
 * @desc Dealer draws until this total is reached.
 *
 * @param Blackjack Win Common Event
 * @parent Blackjack Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Blackjack result.
 *
 * @param Blackjack Lose Common Event
 * @parent Blackjack Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Blackjack result.

 * @param Baccarat Settings
 * @text Baccarat Settings
 *
 * @param Baccarat Min Bet
 * @parent Baccarat Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Baccarat.
 *
 * @param Baccarat Max Bet
 * @parent Baccarat Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Baccarat.
 *
 * @param Baccarat Player Multiplier
 * @parent Baccarat Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for a Player bet.
 *
 * @param Baccarat Banker Multiplier
 * @parent Baccarat Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 1.95
 * @desc Payout multiplier for a Banker bet.
 *
 * @param Baccarat Tie Multiplier
 * @parent Baccarat Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 9
 * @desc Payout multiplier for a Tie bet.
 *
 * @param Baccarat Win Common Event
 * @parent Baccarat Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Baccarat result.
 *
 * @param Baccarat Lose Common Event
 * @parent Baccarat Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Baccarat result.

 * @param War Settings
 * @text War Settings
 *
 * @param War Min Bet
 * @parent War Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for War.
 *
 * @param War Max Bet
 * @parent War Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for War.
 *
 * @param War Win Multiplier
 * @parent War Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for a War win.
 *
 * @param War Win Common Event
 * @parent War Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning War result.
 *
 * @param War Lose Common Event
 * @parent War Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing War result.

 * @param Hi-Lo Settings
 * @text Hi-Lo Settings
 *
 * @param Hi-Lo Min Bet
 * @parent Hi-Lo Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Hi-Lo.
 *
 * @param Hi-Lo Max Bet
 * @parent Hi-Lo Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Hi-Lo.
 *
 * @param Hi-Lo Higher Lower Multiplier
 * @parent Hi-Lo Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for correct Higher or Lower calls.
 *
 * @param Hi-Lo Exact Multiplier
 * @parent Hi-Lo Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 13
 * @desc Payout multiplier for an Exact call.
 *
 * @param Hi-Lo Win Common Event
 * @parent Hi-Lo Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Hi-Lo result.
 *
 * @param Hi-Lo Lose Common Event
 * @parent Hi-Lo Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Hi-Lo result.

 * @param Three Card Poker Settings
 * @text Three Card Poker Settings
 *
 * @param Three Card Poker Min Bet
 * @parent Three Card Poker Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Three Card Poker.
 *
 * @param Three Card Poker Max Bet
 * @parent Three Card Poker Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Three Card Poker.
 *
 * @param Three Card Poker Win Multiplier
 * @parent Three Card Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for a high-card Three Card Poker win.
 *
 * @param Three Card Poker Pair Multiplier
 * @parent Three Card Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 3
 * @desc Payout multiplier for a pair win.
 *
 * @param Three Card Poker Flush Multiplier
 * @parent Three Card Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 4
 * @desc Payout multiplier for a flush win.
 *
 * @param Three Card Poker Straight Multiplier
 * @parent Three Card Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 5
 * @desc Payout multiplier for a straight win.
 *
 * @param Three Card Poker Three Kind Multiplier
 * @parent Three Card Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 8
 * @desc Payout multiplier for three of a kind.
 *
 * @param Three Card Poker Straight Flush Multiplier
 * @parent Three Card Poker Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 11
 * @desc Payout multiplier for a straight flush.
 *
 * @param Three Card Poker Win Common Event
 * @parent Three Card Poker Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Three Card Poker result.
 *
 * @param Three Card Poker Lose Common Event
 * @parent Three Card Poker Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Three Card Poker result.

 * @param Craps Settings
 * @text Craps Settings
 *
 * @param Craps Min Bet
 * @parent Craps Settings
 * @type number
 * @min 1
 * @default 10
 * @desc Minimum bet for Craps.
 *
 * @param Craps Max Bet
 * @parent Craps Settings
 * @type number
 * @min 1
 * @default 500
 * @desc Maximum bet for Craps.
 *
 * @param Craps Pass Line Multiplier
 * @parent Craps Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for a Pass Line win.
 *
 * @param Craps Dont Pass Multiplier
 * @parent Craps Settings
 * @type number
 * @min 0
 * @decimals 2
 * @default 2
 * @desc Payout multiplier for a Don't Pass win.
 *
 * @param Craps Win Common Event
 * @parent Craps Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a winning Craps result.
 *
 * @param Craps Lose Common Event
 * @parent Craps Settings
 * @type common_event
 * @default 0
 * @desc Optional common event to queue after a losing Craps result.
 *
 * @param Card Settings
 * @text Card Settings
 *
 * @param Spade Suit
 * @parent Card Settings
 * @type string
 * @default ♠️
 * @desc Text used for spades on cards.
 *
 * @param Heart Suit
 * @parent Card Settings
 * @type string
 * @default ♥️
 * @desc Text used for hearts on cards.
 *
 * @param Diamond Suit
 * @parent Card Settings
 * @type string
 * @default ♦️
 * @desc Text used for diamonds on cards.
 *
 * @param Club Suit
 * @parent Card Settings
 * @type string
 * @default ♣️
 * @desc Text used for clubs on cards.

 * @param Wild Card Emoji
 * @parent Card Settings
 * @type string
 * @default 🃏
 * @desc Emoji used to draw Poker wild cards.
 */

(() => {
	"use strict";

	const pluginName = "FOXY_Casino";
	const params = PluginManager.parameters(pluginName);

	const COLORS = {
		tableDark: "#0b1f1a",
		tableMid: "#123229",
		tableLight: "#1d4e40",
		accent: "#63ddb4",
		accentDark: "#2b8e6a",
		gold: "#f3cf74",
		cream: "#f4edd8",
		ink: "#1b2128",
		chipRed: "#d25764",
		chipBlue: "#3e78c2",
		chipBlack: "#1d2027",
		rouletteRed: "#cb4a58",
		rouletteBlack: "#171a1f",
		rouletteGreen: "#419d5b",
		cardFace: "#f8f2e1",
		cardBack: "#234d78"
	};

	const DEFAULT_SLOT_SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣"];
	const DEFAULT_CARD_SUITS = {
		S: "♠️",
		H: "♥️",
		D: "♦️",
		C: "♣️"
	};
	const DEFAULT_WILD_CARD_EMOJI = "🃏";
	const TAU = Math.PI * 2;
	const DIE_PIP_LAYOUTS = {
		1: [[0.5, 0.5]],
		2: [[0.3, 0.3], [0.7, 0.7]],
		3: [[0.3, 0.3], [0.5, 0.5], [0.7, 0.7]],
		4: [[0.3, 0.3], [0.7, 0.3], [0.3, 0.7], [0.7, 0.7]],
		5: [[0.3, 0.3], [0.7, 0.3], [0.5, 0.5], [0.3, 0.7], [0.7, 0.7]],
		6: [[0.3, 0.28], [0.7, 0.28], [0.3, 0.5], [0.7, 0.5], [0.3, 0.72], [0.7, 0.72]]
	};
	const POKER_WILD_CARD_COUNT = 4;
	const POKER_SUITS = ["S", "H", "D", "C"];
	const POKER_RANKS = [];
	for (let rank = 2; rank <= 14; rank++) {
		POKER_RANKS.push(rank);
	}
	const POKER_STRAIGHT_SEQUENCES = [
		[14, 2, 3, 4, 5],
		[2, 3, 4, 5, 6],
		[3, 4, 5, 6, 7],
		[4, 5, 6, 7, 8],
		[5, 6, 7, 8, 9],
		[6, 7, 8, 9, 10],
		[7, 8, 9, 10, 11],
		[8, 9, 10, 11, 12],
		[9, 10, 11, 12, 13],
		[10, 11, 12, 13, 14]
	];
	const SLOT_ROW_LABELS = ["Top", "Middle", "Bottom"];
	const SLOT_BET_TYPES = [
		{ key: "single", label: "Single Row", shortLabel: "1 Line", emoji: "1️⃣" },
		{ key: "rows", label: "All Rows", shortLabel: "3 Lines", emoji: "3️⃣" },
		{ key: "diagonals", label: "Rows + Diagonals", shortLabel: "5 Lines", emoji: "✖️" }
	];
	const SLOT_LINE_COLORS = [
		"rgba(243, 207, 116, 0.9)",
		"rgba(99, 221, 180, 0.9)",
		"rgba(100, 172, 255, 0.9)",
		"rgba(255, 138, 114, 0.9)",
		"rgba(230, 174, 255, 0.9)"
	];
	const TITLE_DATA = {
		slots: { emoji: "🎰", title: "Slots" },
		roulette: { emoji: "🎯", title: "Roulette" },
		poker: { emoji: "🃏", title: "Poker" },
		blackjack: { emoji: "♠️", title: "Blackjack" },
		baccarat: { emoji: "♦️", title: "Baccarat" },
		war: { emoji: "⚔️", title: "War" },
		hilo: { emoji: "↕️", title: "Hi-Lo" },
		threecardpoker: { emoji: "♣️", title: "3 Card Poker" },
		craps: { emoji: "🎲", title: "Craps" }
	};
	const ROULETTE_RED_NUMBERS = new Set([
		1, 3, 5, 7, 9, 12, 14, 16, 18,
		19, 21, 23, 25, 27, 30, 32, 34, 36
	]);
	const ROULETTE_WHEEL_ORDER = [
		0, 32, 15, 19, 4, 21, 2, 25, 17, 34,
		6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
		24, 16, 33, 1, 20, 14, 31, 9, 22, 18,
		29, 7, 28, 12, 35, 3, 26
	];
	const ROULETTE_WHEEL_INDEX = {};
	for (let index = 0; index < ROULETTE_WHEEL_ORDER.length; index++) {
		ROULETTE_WHEEL_INDEX[ROULETTE_WHEEL_ORDER[index]] = index;
	}
	const ROULETTE_OUTSIDE_BETS = [
		{ key: "low", label: "1-18", fill: COLORS.tableLight, textColor: COLORS.cream },
		{ key: "even", label: "EVEN", fill: COLORS.tableLight, textColor: COLORS.cream },
		{ key: "red", label: "RED", fill: COLORS.rouletteRed, textColor: COLORS.cream },
		{ key: "black", label: "BLACK", fill: COLORS.rouletteBlack, textColor: COLORS.cream },
		{ key: "odd", label: "ODD", fill: COLORS.tableLight, textColor: COLORS.cream },
		{ key: "high", label: "19-36", fill: COLORS.tableLight, textColor: COLORS.cream }
	];

	function numberParam(name, fallback) {
		const value = Number(params[name]);
		return Number.isFinite(value) ? value : fallback;
	}

	function decimalParam(name, fallback) {
		const value = Number(params[name]);
		return Number.isFinite(value) ? value : fallback;
	}

	function booleanParam(name, fallback) {
		const value = String(params[name] || "").trim().toLowerCase();
		if (value === "true" || value === "on" || value === "1") {
			return true;
		}
		if (value === "false" || value === "off" || value === "0") {
			return false;
		}
		return !!fallback;
	}

	function stringParam(name, fallback) {
		const value = params[name];
		return typeof value === "string" && value.length > 0 ? value : fallback;
	}

	function textArrayParam(name, fallback) {
		try {
			const raw = params[name];
			if (!raw) {
				return fallback.slice();
			}
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) {
				return fallback.slice();
			}
			const clean = parsed.map(entry => String(entry || "").trim()).filter(Boolean);
			return clean.length > 0 ? clean : fallback.slice();
		} catch (error) {
			return fallback.slice();
		}
	}

	function uniqueTextArray(array) {
		const seen = new Set();
		const result = [];
		for (const entry of array) {
			if (!seen.has(entry)) {
				seen.add(entry);
				result.push(entry);
			}
		}
		return result;
	}

	function commonEventParam(name) {
		return Math.max(0, Math.floor(numberParam(name, 0)));
	}

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	function lerp(start, end, amount) {
		return start + (end - start) * amount;
	}

	function easeOutCubic(value) {
		const t = clamp(value, 0, 1);
		return 1 - Math.pow(1 - t, 3);
	}

	function wrapIndex(value, length) {
		return ((value % length) + length) % length;
	}

	function normalizeAngle(angle) {
		return ((angle % TAU) + TAU) % TAU;
	}

	function randomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function randomFrom(array) {
		return array[randomInt(array.length)];
	}

	function formatMultiplier(value) {
		return Number(value || 0)
			.toFixed(2)
			.replace(/\.00$/, "")
			.replace(/(\.\d)0$/, "$1");
	}

	function currencyText(amount) {
		return `${Math.max(0, Math.floor(amount || 0))} ${TextManager.currencyUnit}`;
	}

	function payoutAmount(wager, multiplier) {
		return Math.max(0, Math.round(Number(wager || 0) * Number(multiplier || 0)));
	}

	function roulettePocketAngle(number) {
		const index = ROULETTE_WHEEL_INDEX[number] || 0;
		return -Math.PI / 2 + index * (TAU / ROULETTE_WHEEL_ORDER.length);
	}

	function rouletteNumberFromRelativeAngle(relativeAngle) {
		const step = TAU / ROULETTE_WHEEL_ORDER.length;
		const normalized = normalizeAngle(relativeAngle + Math.PI / 2);
		const index = Math.round(normalized / step) % ROULETTE_WHEEL_ORDER.length;
		return ROULETTE_WHEEL_ORDER[index];
	}

	function drawPanel(bitmap, x, y, width, height, fillColor, borderColor) {
		bitmap.fillRect(x, y, width, height, borderColor);
		bitmap.fillRect(x + 2, y + 2, Math.max(0, width - 4), Math.max(0, height - 4), fillColor);
	}

	function drawLine(bitmap, x1, y1, x2, y2, color, lineWidth) {
		const context = bitmap.context;
		context.save();
		context.strokeStyle = color;
		context.lineWidth = lineWidth;
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
		context.restore();
		bitmap._baseTexture.update();
	}

	function drawRingSegment(bitmap, centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, fillColor, strokeColor, lineWidth) {
		const context = bitmap.context;
		context.save();
		context.beginPath();
		context.arc(centerX, centerY, outerRadius, startAngle, endAngle, false);
		context.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
		context.closePath();
		context.fillStyle = fillColor;
		context.fill();
		if (strokeColor && lineWidth > 0) {
			context.strokeStyle = strokeColor;
			context.lineWidth = lineWidth;
			context.lineJoin = "round";
			context.stroke();
		}
		context.restore();
	}

	function withBitmapClip(bitmap, x, y, width, height, callback) {
		const context = bitmap.context;
		context.save();
		context.beginPath();
		context.rect(x, y, width, height);
		context.clip();
		callback();
		context.restore();
		bitmap._baseTexture.update();
	}

	function drawChip(window, centerX, centerY, radius, fillColor, label) {
		const bitmap = window.contents;
		bitmap.drawCircle(centerX, centerY, radius, COLORS.cream);
		bitmap.drawCircle(centerX, centerY, radius - 4, fillColor);
		bitmap.drawCircle(centerX, centerY, radius - 12, "#ffffff");
		window.contents.fontSize = 14;
		window.changeTextColor(COLORS.ink);
		window.drawText(String(label), centerX - radius, centerY - 10, radius * 2, "center");
		window.resetTextColor();
		window.resetFontSettings();
	}

	function drawCenteredBitmapText(window, text, x, y, width, lineHeight) {
		const textWidth = Math.ceil(window.contents.measureTextWidth(text)) + 8;
		const drawWidth = Math.max(textWidth, 12);
		const drawX = x + Math.floor((width - drawWidth) / 2);
		window.contents.drawText(text, drawX, y, drawWidth, lineHeight, "center");
	}

	function createWeightedSlotStrip(symbols) {
		const strip = [];
		const totalSymbols = symbols.length;
		for (let index = 0; index < totalSymbols; index++) {
			const repeats = Math.max(1, totalSymbols - index);
			for (let count = 0; count < repeats; count++) {
				strip.push(symbols[index]);
			}
		}
		return shuffleArray(strip);
	}

	const CARD_SUITS = {
		S: stringParam("Spade Suit", DEFAULT_CARD_SUITS.S),
		H: stringParam("Heart Suit", DEFAULT_CARD_SUITS.H),
		D: stringParam("Diamond Suit", DEFAULT_CARD_SUITS.D),
		C: stringParam("Club Suit", DEFAULT_CARD_SUITS.C)
	};
	const CARD_WILD_EMOJI = stringParam("Wild Card Emoji", DEFAULT_WILD_CARD_EMOJI);

	function isWildCard(card) {
		return !!(card && card.wild);
	}

	function suitData(suit) {
		switch (suit) {
			case "H":
				return { symbol: CARD_SUITS.H, color: COLORS.rouletteRed };
			case "D":
				return { symbol: CARD_SUITS.D, color: COLORS.rouletteRed };
			case "C":
				return { symbol: CARD_SUITS.C, color: COLORS.ink };
			default:
				return { symbol: CARD_SUITS.S, color: COLORS.ink };
		}
	}

	function rankLabel(rank) {
		if (rank === 1) return "A";
		if (rank === 11) return "J";
		if (rank === 12) return "Q";
		if (rank === 13) return "K";
		return String(rank);
	}

	function cardText(card) {
		if (!card) {
			return "";
		}
		if (isWildCard(card)) {
			return "Wild";
		}
		const suit = suitData(card.suit);
		return `${rankLabel(card.rank)}${suit.symbol}`;
	}

	function drawCard(window, card, x, y, width, height, options) {
		const settings = options || {};
		const hidden = !!settings.hidden;
		const held = !!settings.hold;
		const borderColor = held ? COLORS.gold : (isWildCard(card) ? COLORS.gold : COLORS.accent);
		const fillColor = hidden ? COLORS.cardBack : COLORS.cardFace;
		drawPanel(window.contents, x, y, width, height, fillColor, borderColor);
		if (hidden) {
			for (let stripeX = x + 8; stripeX < x + width - 8; stripeX += 12) {
				window.contents.fillRect(stripeX, y + 8, 4, height - 16, "#4f88cf");
			}
			window.contents.fontSize = 30;
			window.changeTextColor(COLORS.cream);
			drawCenteredBitmapText(window, "🎴", x, y + Math.floor(height / 2) - 20, width, 40);
			window.resetTextColor();
			window.resetFontSettings();
			return;
		}
		if (isWildCard(card)) {
			window.contents.fontSize = 16;
			window.changeTextColor(COLORS.gold);
			window.drawText("WILD", x + 8, y + 6, width - 16, "left");
			window.contents.fontSize = 38;
			drawCenteredBitmapText(window, CARD_WILD_EMOJI, x, y + Math.floor(height / 2) - 24, width, 48);
			window.contents.fontSize = 16;
			window.drawText("WILD", x + 8, y + height - 28, width - 16, "right");
		} else {
			const suit = suitData(card.suit);
			const label = `${rankLabel(card.rank)}${suit.symbol}`;
			window.contents.fontSize = 18;
			window.changeTextColor(suit.color);
			window.drawText(label, x + 8, y + 6, width - 16, "left");
			window.contents.fontSize = 34;
			drawCenteredBitmapText(window, suit.symbol, x, y + Math.floor(height / 2) - 22, width, 44);
			window.contents.fontSize = 18;
			window.drawText(label, x + 8, y + height - 30, width - 16, "right");
		}
		if (held) {
			window.contents.fillRect(x + 4, y + height - 26, width - 8, 18, COLORS.gold);
			window.changeTextColor(COLORS.ink);
			window.contents.fontSize = 14;
			window.drawText("HOLD", x, y + height - 28, width, "center");
		}
		window.resetTextColor();
		window.resetFontSettings();
	}

	function collectionHasIndex(collection, index) {
		if (!collection) {
			return false;
		}
		if (collection instanceof Set) {
			return collection.has(index);
		}
		return Array.isArray(collection) ? collection.includes(index) : false;
	}

	function drawCardRow(window, cards, x, y, width, height, options) {
		const settings = options || {};
		const displayCards = Array.isArray(cards) ? cards.slice() : [];
		const placeholderCount = Math.max(0, Math.floor(settings.placeholderCount || 0));
		const count = Math.max(displayCards.length, Math.max(1, placeholderCount));
		const maxCardWidth = Number.isFinite(settings.maxCardWidth) ? settings.maxCardWidth : 78;
		const minCardWidth = Number.isFinite(settings.minCardWidth) ? settings.minCardWidth : 42;
		const maxGap = Number.isFinite(settings.maxGap) ? settings.maxGap : 14;
		const maxWidthByCount = Math.floor((width - 12) / Math.max(1, count)) - 4;
		const maxWidthByHeight = Math.floor((Math.max(64, height) - 6) / 1.45);
		let cardWidth = Math.min(maxCardWidth, maxWidthByCount, maxWidthByHeight);
		cardWidth = Math.max(minCardWidth, cardWidth);
		const gap = count > 1
			? Math.max(4, Math.min(maxGap, Math.floor((width - cardWidth * count) / Math.max(1, count - 1))))
			: 0;
		const totalWidth = cardWidth * count + gap * Math.max(0, count - 1);
		const startX = x + Math.max(0, Math.floor((width - totalWidth) / 2));
		const cardHeight = Math.min(height, Math.floor(cardWidth * 1.45));
		const drawY = y + Math.max(0, Math.floor((height - cardHeight) / 2));
		for (let index = 0; index < count; index++) {
			const card = displayCards[index] || null;
			drawCard(window, card, startX + index * (cardWidth + gap), drawY, cardWidth, cardHeight, {
				hidden: !card || collectionHasIndex(settings.hiddenIndices, index),
				hold: collectionHasIndex(settings.holdIndices, index)
			});
		}
	}

	function drawDie(window, x, y, size, value, options) {
		const settings = options || {};
		drawPanel(window.contents, x, y, size, size, settings.fillColor || COLORS.cardFace, settings.borderColor || COLORS.accent);
		const pipPositions = DIE_PIP_LAYOUTS[clamp(Math.floor(value || 1), 1, 6)] || DIE_PIP_LAYOUTS[1];
		const pipRadius = Math.max(3, Math.floor(size * 0.08));
		const pipColor = settings.pipColor || COLORS.ink;
		for (const pip of pipPositions) {
			window.contents.drawCircle(x + Math.floor(size * pip[0]), y + Math.floor(size * pip[1]), pipRadius, pipColor);
		}
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = randomInt(i + 1);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	function createDeck(includeWildCards) {
		const deck = [];
		for (const suit of POKER_SUITS) {
			for (let rank = 1; rank <= 13; rank++) {
				deck.push({ suit: suit, rank: rank });
			}
		}
		if (includeWildCards) {
			for (let index = 0; index < POKER_WILD_CARD_COUNT; index++) {
				deck.push({ suit: "W", rank: 0, wild: true, wildId: index + 1 });
			}
		}
		return shuffleArray(deck);
	}

	function pokerCardRank(card) {
		return card.rank === 1 ? 14 : card.rank;
	}

	function aceHighCardRank(card) {
		return card ? pokerCardRank(card) : 0;
	}

	function pokerNonWildCards(cards) {
		return (cards || []).filter(card => card && !isWildCard(card));
	}

	function pokerWildCount(cards) {
		return (cards || []).reduce((count, card) => count + (isWildCard(card) ? 1 : 0), 0);
	}

	function pokerRankCounts(cards) {
		const counts = {};
		for (const card of cards) {
			const rank = pokerCardRank(card);
			counts[rank] = (counts[rank] || 0) + 1;
		}
		return counts;
	}

	function pokerRanksFitSequence(cards, sequence) {
		const seen = new Set();
		for (const card of cards) {
			const rank = pokerCardRank(card);
			if (!sequence.includes(rank) || seen.has(rank)) {
				return false;
			}
			seen.add(rank);
		}
		return true;
	}

	function canMakeRoyalFlush(cards, wildCount) {
		const royalSequence = POKER_STRAIGHT_SEQUENCES[POKER_STRAIGHT_SEQUENCES.length - 1];
		for (const suit of POKER_SUITS) {
			if (cards.every(card => card.suit === suit) && pokerRanksFitSequence(cards, royalSequence) && wildCount >= 5 - cards.length) {
				return true;
			}
		}
		return false;
	}

	function canMakeStraightFlush(cards, wildCount) {
		for (const suit of POKER_SUITS) {
			if (!cards.every(card => card.suit === suit)) {
				continue;
			}
			for (const sequence of POKER_STRAIGHT_SEQUENCES) {
				if (pokerRanksFitSequence(cards, sequence) && wildCount >= 5 - cards.length) {
					return true;
				}
			}
		}
		return false;
	}

	function canMakeFourOfKind(counts, wildCount) {
		for (const rank of POKER_RANKS) {
			if ((counts[rank] || 0) + wildCount >= 4) {
				return true;
			}
		}
		return false;
	}

	function canMakeFullHouse(counts, wildCount) {
		const ranks = Object.keys(counts).map(Number);
		for (const tripRank of POKER_RANKS) {
			for (const pairRank of POKER_RANKS) {
				if (tripRank === pairRank) {
					continue;
				}
				let valid = true;
				for (const rank of ranks) {
					if (rank !== tripRank && rank !== pairRank) {
						valid = false;
						break;
					}
					const current = counts[rank] || 0;
					const cap = rank === tripRank ? 3 : 2;
					if (current > cap) {
						valid = false;
						break;
					}
				}
				if (!valid) {
					continue;
				}
				const needed = Math.max(0, 3 - (counts[tripRank] || 0)) + Math.max(0, 2 - (counts[pairRank] || 0));
				if (needed <= wildCount) {
					return true;
				}
			}
		}
		return false;
	}

	function canMakeFlush(cards) {
		const suits = new Set(cards.map(card => card.suit));
		return suits.size <= 1;
	}

	function canMakeStraight(cards, wildCount) {
		for (const sequence of POKER_STRAIGHT_SEQUENCES) {
			if (pokerRanksFitSequence(cards, sequence) && wildCount >= 5 - cards.length) {
				return true;
			}
		}
		return false;
	}

	function canMakeThreeOfKind(counts, wildCount) {
		for (const rank of POKER_RANKS) {
			if ((counts[rank] || 0) + wildCount >= 3) {
				return true;
			}
		}
		return false;
	}

	function canMakeTwoPair(counts, wildCount) {
		const ranks = Object.keys(counts).map(Number);
		for (let firstIndex = 0; firstIndex < POKER_RANKS.length; firstIndex++) {
			for (let secondIndex = firstIndex + 1; secondIndex < POKER_RANKS.length; secondIndex++) {
				const firstRank = POKER_RANKS[firstIndex];
				const secondRank = POKER_RANKS[secondIndex];
				let valid = true;
				let outsideCount = 0;
				for (const rank of ranks) {
					const count = counts[rank] || 0;
					if (rank === firstRank || rank === secondRank) {
						if (count > 2) {
							valid = false;
							break;
						}
					} else {
						outsideCount += count;
						if (outsideCount > 1) {
							valid = false;
							break;
						}
					}
				}
				if (!valid) {
					continue;
				}
				const needed = Math.max(0, 2 - (counts[firstRank] || 0)) + Math.max(0, 2 - (counts[secondRank] || 0));
				if (needed <= wildCount) {
					return true;
				}
			}
		}
		return false;
	}

	function canMakePair(counts, wildCount) {
		for (const rank of POKER_RANKS) {
			if ((counts[rank] || 0) + wildCount >= 2) {
				return true;
			}
		}
		return false;
	}

	function evaluatePokerHand(cards, config) {
		if (!cards || cards.length !== 5) {
			return { name: "No Hand", multiplier: 0 };
		}
		const nonWildCards = pokerNonWildCards(cards);
		const wildCount = pokerWildCount(cards);
		const rankCounts = pokerRankCounts(nonWildCards);

		if (canMakeRoyalFlush(nonWildCards, wildCount)) {
			return { name: "Royal Flush", multiplier: config.royalFlushMultiplier };
		}
		if (canMakeStraightFlush(nonWildCards, wildCount)) {
			return { name: "Straight Flush", multiplier: config.straightFlushMultiplier };
		}
		if (canMakeFourOfKind(rankCounts, wildCount)) {
			return { name: "Four of a Kind", multiplier: config.fourKindMultiplier };
		}
		if (canMakeFullHouse(rankCounts, wildCount)) {
			return { name: "Full House", multiplier: config.fullHouseMultiplier };
		}
		if (canMakeFlush(nonWildCards)) {
			return { name: "Flush", multiplier: config.flushMultiplier };
		}
		if (canMakeStraight(nonWildCards, wildCount)) {
			return { name: "Straight", multiplier: config.straightMultiplier };
		}
		if (canMakeThreeOfKind(rankCounts, wildCount)) {
			return { name: "Three of a Kind", multiplier: config.threeKindMultiplier };
		}
		if (canMakeTwoPair(rankCounts, wildCount)) {
			return { name: "Two Pair", multiplier: config.twoPairMultiplier };
		}
		if (canMakePair(rankCounts, wildCount)) {
			return { name: "Pair", multiplier: config.pairMultiplier };
		}
		return { name: "High Card", multiplier: 0 };
	}

	function blackjackTotal(cards) {
		let total = 0;
		let softAces = 0;
		for (const card of cards) {
			if (card.rank === 1) {
				total += 11;
				softAces++;
			} else {
				total += Math.min(card.rank, 10);
			}
		}
		while (total > 21 && softAces > 0) {
			total -= 10;
			softAces--;
		}
		return { total: total, soft: softAces > 0 };
	}

	function isBlackjack(cards) {
		return cards.length === 2 && blackjackTotal(cards).total === 21;
	}

	function baccaratCardValue(card) {
		if (!card) {
			return 0;
		}
		if (card.rank === 1) {
			return 1;
		}
		if (card.rank >= 10) {
			return 0;
		}
		return card.rank;
	}

	function baccaratTotal(cards) {
		const total = (cards || []).reduce((sum, card) => sum + baccaratCardValue(card), 0);
		return total % 10;
	}

	function isBaccaratNatural(cards) {
		return (cards || []).length === 2 && baccaratTotal(cards) >= 8;
	}

	function baccaratShouldPlayerDraw(cards) {
		return baccaratTotal(cards) <= 5;
	}

	function baccaratShouldBankerDraw(cards, playerThirdCard) {
		const total = baccaratTotal(cards);
		if (!playerThirdCard) {
			return total <= 5;
		}
		const thirdValue = baccaratCardValue(playerThirdCard);
		if (total <= 2) {
			return true;
		}
		if (total === 3) {
			return thirdValue !== 8;
		}
		if (total === 4) {
			return thirdValue >= 2 && thirdValue <= 7;
		}
		if (total === 5) {
			return thirdValue >= 4 && thirdValue <= 7;
		}
		if (total === 6) {
			return thirdValue === 6 || thirdValue === 7;
		}
		return false;
	}

	function compareRankArrays(left, right) {
		const length = Math.max(left.length, right.length);
		for (let index = 0; index < length; index++) {
			const diff = (left[index] || 0) - (right[index] || 0);
			if (diff !== 0) {
				return diff;
			}
		}
		return 0;
	}

	function threeCardStraightHigh(ranksAsc) {
		if (ranksAsc.length !== 3) {
			return 0;
		}
		if (ranksAsc[0] === 2 && ranksAsc[1] === 3 && ranksAsc[2] === 14) {
			return 3;
		}
		return ranksAsc[0] + 1 === ranksAsc[1] && ranksAsc[1] + 1 === ranksAsc[2] ? ranksAsc[2] : 0;
	}

	function evaluateThreeCardPokerHand(cards, config) {
		if (!cards || cards.length !== 3) {
			return { name: "No Hand", rank: -1, compare: [0, 0, 0], multiplier: 0 };
		}
		const ranksDesc = cards.map(card => aceHighCardRank(card)).sort((a, b) => b - a);
		const ranksAsc = ranksDesc.slice().sort((a, b) => a - b);
		const straightHigh = threeCardStraightHigh(ranksAsc);
		const flush = new Set(cards.map(card => card.suit)).size === 1;
		const counts = {};
		for (const rank of ranksDesc) {
			counts[rank] = (counts[rank] || 0) + 1;
		}
		const groupedRanks = Object.keys(counts)
			.map(Number)
			.sort((a, b) => {
				const countDiff = counts[b] - counts[a];
				return countDiff !== 0 ? countDiff : b - a;
			});
		const countValues = Object.values(counts);
		if (straightHigh && flush) {
			return { name: "Straight Flush", rank: 5, compare: [straightHigh], multiplier: config.straightFlushMultiplier };
		}
		if (countValues.includes(3)) {
			return { name: "Three of a Kind", rank: 4, compare: [groupedRanks[0]], multiplier: config.threeKindMultiplier };
		}
		if (straightHigh) {
			return { name: "Straight", rank: 3, compare: [straightHigh], multiplier: config.straightMultiplier };
		}
		if (flush) {
			return { name: "Flush", rank: 2, compare: ranksDesc, multiplier: config.flushMultiplier };
		}
		if (countValues.includes(2)) {
			const pairRank = groupedRanks.find(rank => counts[rank] === 2) || 0;
			const kicker = groupedRanks.find(rank => counts[rank] === 1) || 0;
			return { name: "Pair", rank: 1, compare: [pairRank, kicker], multiplier: config.pairMultiplier };
		}
		return { name: "High Card", rank: 0, compare: ranksDesc, multiplier: config.winMultiplier };
	}

	function compareThreeCardPokerHands(left, right) {
		if (left.rank !== right.rank) {
			return left.rank - right.rank;
		}
		return compareRankArrays(left.compare, right.compare);
	}

	function rouletteNumberColor(number) {
		if (number === 0) {
			return COLORS.rouletteGreen;
		}
		return ROULETTE_RED_NUMBERS.has(number) ? COLORS.rouletteRed : COLORS.rouletteBlack;
	}

	function rouletteColorName(number) {
		if (number === 0) {
			return "Green";
		}
		return ROULETTE_RED_NUMBERS.has(number) ? "Red" : "Black";
	}

	const CONFIG = {
		defaultBet: Math.max(1, Math.floor(numberParam("Default Bet", 10))),
		betStep: Math.max(1, Math.floor(numberParam("Bet Step", 10))),
		slots: {
			minBet: Math.max(1, Math.floor(numberParam("Slots Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Slots Max Bet", 500))),
			symbols: uniqueTextArray(textArrayParam("Slot Emoji List", DEFAULT_SLOT_SYMBOLS)),
			jackpotMultiplier: Math.max(0, decimalParam("Slots Jackpot Multiplier", 15)),
			tripleMultiplier: Math.max(0, decimalParam("Slots Triple Multiplier", 5)),
			pairMultiplier: Math.max(0, decimalParam("Slots Pair Multiplier", 2)),
			winCommonEvent: commonEventParam("Slots Win Common Event"),
			loseCommonEvent: commonEventParam("Slots Lose Common Event")
		},
		roulette: {
			minBet: Math.max(1, Math.floor(numberParam("Roulette Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Roulette Max Bet", 500))),
			straightMultiplier: Math.max(0, decimalParam("Roulette Straight Multiplier", 36)),
			colorMultiplier: Math.max(0, decimalParam("Roulette Color Multiplier", 2)),
			evenOddMultiplier: Math.max(0, decimalParam("Roulette EvenOdd Multiplier", 2)),
			rangeMultiplier: Math.max(0, decimalParam("Roulette Range Multiplier", 2)),
			winCommonEvent: commonEventParam("Roulette Win Common Event"),
			loseCommonEvent: commonEventParam("Roulette Lose Common Event")
		},
		poker: {
			minBet: Math.max(1, Math.floor(numberParam("Poker Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Poker Max Bet", 500))),
			wildCards: booleanParam("Poker Wild Cards", false),
			pairMultiplier: Math.max(0, decimalParam("Poker Pair Multiplier", 2)),
			twoPairMultiplier: Math.max(0, decimalParam("Poker Two Pair Multiplier", 3)),
			threeKindMultiplier: Math.max(0, decimalParam("Poker Three Kind Multiplier", 4)),
			straightMultiplier: Math.max(0, decimalParam("Poker Straight Multiplier", 5)),
			flushMultiplier: Math.max(0, decimalParam("Poker Flush Multiplier", 7)),
			fullHouseMultiplier: Math.max(0, decimalParam("Poker Full House Multiplier", 9)),
			fourKindMultiplier: Math.max(0, decimalParam("Poker Four Kind Multiplier", 20)),
			straightFlushMultiplier: Math.max(0, decimalParam("Poker Straight Flush Multiplier", 50)),
			royalFlushMultiplier: Math.max(0, decimalParam("Poker Royal Flush Multiplier", 100)),
			winCommonEvent: commonEventParam("Poker Win Common Event"),
			loseCommonEvent: commonEventParam("Poker Lose Common Event")
		},
		blackjack: {
			minBet: Math.max(1, Math.floor(numberParam("Blackjack Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Blackjack Max Bet", 500))),
			winMultiplier: Math.max(0, decimalParam("Blackjack Win Multiplier", 2)),
			blackjackMultiplier: Math.max(0, decimalParam("Blackjack Blackjack Multiplier", 2.5)),
			dealerStandValue: Math.max(1, Math.floor(numberParam("Blackjack Dealer Stand Value", 17))),
			winCommonEvent: commonEventParam("Blackjack Win Common Event"),
			loseCommonEvent: commonEventParam("Blackjack Lose Common Event")
		},
		baccarat: {
			minBet: Math.max(1, Math.floor(numberParam("Baccarat Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Baccarat Max Bet", 500))),
			playerMultiplier: Math.max(0, decimalParam("Baccarat Player Multiplier", 2)),
			bankerMultiplier: Math.max(0, decimalParam("Baccarat Banker Multiplier", 1.95)),
			tieMultiplier: Math.max(0, decimalParam("Baccarat Tie Multiplier", 9)),
			winCommonEvent: commonEventParam("Baccarat Win Common Event"),
			loseCommonEvent: commonEventParam("Baccarat Lose Common Event")
		},
		war: {
			minBet: Math.max(1, Math.floor(numberParam("War Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("War Max Bet", 500))),
			winMultiplier: Math.max(0, decimalParam("War Win Multiplier", 2)),
			winCommonEvent: commonEventParam("War Win Common Event"),
			loseCommonEvent: commonEventParam("War Lose Common Event")
		},
		hilo: {
			minBet: Math.max(1, Math.floor(numberParam("Hi-Lo Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Hi-Lo Max Bet", 500))),
			higherLowerMultiplier: Math.max(0, decimalParam("Hi-Lo Higher Lower Multiplier", 2)),
			exactMultiplier: Math.max(0, decimalParam("Hi-Lo Exact Multiplier", 13)),
			winCommonEvent: commonEventParam("Hi-Lo Win Common Event"),
			loseCommonEvent: commonEventParam("Hi-Lo Lose Common Event")
		},
		threecardpoker: {
			minBet: Math.max(1, Math.floor(numberParam("Three Card Poker Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Three Card Poker Max Bet", 500))),
			winMultiplier: Math.max(0, decimalParam("Three Card Poker Win Multiplier", 2)),
			pairMultiplier: Math.max(0, decimalParam("Three Card Poker Pair Multiplier", 3)),
			flushMultiplier: Math.max(0, decimalParam("Three Card Poker Flush Multiplier", 4)),
			straightMultiplier: Math.max(0, decimalParam("Three Card Poker Straight Multiplier", 5)),
			threeKindMultiplier: Math.max(0, decimalParam("Three Card Poker Three Kind Multiplier", 8)),
			straightFlushMultiplier: Math.max(0, decimalParam("Three Card Poker Straight Flush Multiplier", 11)),
			winCommonEvent: commonEventParam("Three Card Poker Win Common Event"),
			loseCommonEvent: commonEventParam("Three Card Poker Lose Common Event")
		},
		craps: {
			minBet: Math.max(1, Math.floor(numberParam("Craps Min Bet", 10))),
			maxBet: Math.max(1, Math.floor(numberParam("Craps Max Bet", 500))),
			passLineMultiplier: Math.max(0, decimalParam("Craps Pass Line Multiplier", 2)),
			dontPassMultiplier: Math.max(0, decimalParam("Craps Dont Pass Multiplier", 2)),
			winCommonEvent: commonEventParam("Craps Win Common Event"),
			loseCommonEvent: commonEventParam("Craps Lose Common Event")
		}
	};

	CONFIG.slots.maxBet = Math.max(CONFIG.slots.minBet, CONFIG.slots.maxBet);
	CONFIG.roulette.maxBet = Math.max(CONFIG.roulette.minBet, CONFIG.roulette.maxBet);
	CONFIG.poker.maxBet = Math.max(CONFIG.poker.minBet, CONFIG.poker.maxBet);
	CONFIG.blackjack.maxBet = Math.max(CONFIG.blackjack.minBet, CONFIG.blackjack.maxBet);
	CONFIG.baccarat.maxBet = Math.max(CONFIG.baccarat.minBet, CONFIG.baccarat.maxBet);
	CONFIG.war.maxBet = Math.max(CONFIG.war.minBet, CONFIG.war.maxBet);
	CONFIG.hilo.maxBet = Math.max(CONFIG.hilo.minBet, CONFIG.hilo.maxBet);
	CONFIG.threecardpoker.maxBet = Math.max(CONFIG.threecardpoker.minBet, CONFIG.threecardpoker.maxBet);
	CONFIG.craps.maxBet = Math.max(CONFIG.craps.minBet, CONFIG.craps.maxBet);

	const BACCARAT_BET_TYPES = [
		{ key: "player", label: "Player", emoji: "👤" },
		{ key: "banker", label: "Banker", emoji: "🏦" },
		{ key: "tie", label: "Tie", emoji: "🤝" }
	];

	const HILO_CALL_TYPES = [
		{ key: "higher", label: "Higher", emoji: "🔼" },
		{ key: "lower", label: "Lower", emoji: "🔽" },
		{ key: "exact", label: "Exact", emoji: "🎯" }
	];

	const CRAPS_BET_TYPES = [
		{ key: "pass", label: "Pass Line", emoji: "✅" },
		{ key: "dontPass", label: "Don't Pass", emoji: "🛑" }
	];

	const ROULETTE_TYPES = [
		{
			key: "straight",
			label: "Straight",
			emoji: "🎯",
			multiplier: CONFIG.roulette.straightMultiplier,
			wins(number, selectedNumber) {
				return number === selectedNumber;
			}
		},
		{
			key: "red",
			label: "Red",
			emoji: "🔴",
			multiplier: CONFIG.roulette.colorMultiplier,
			wins(number) {
				return ROULETTE_RED_NUMBERS.has(number);
			}
		},
		{
			key: "black",
			label: "Black",
			emoji: "⚫",
			multiplier: CONFIG.roulette.colorMultiplier,
			wins(number) {
				return number > 0 && !ROULETTE_RED_NUMBERS.has(number);
			}
		},
		{
			key: "even",
			label: "Even",
			emoji: "2️⃣",
			multiplier: CONFIG.roulette.evenOddMultiplier,
			wins(number) {
				return number !== 0 && number % 2 === 0;
			}
		},
		{
			key: "odd",
			label: "Odd",
			emoji: "1️⃣",
			multiplier: CONFIG.roulette.evenOddMultiplier,
			wins(number) {
				return number % 2 === 1;
			}
		},
		{
			key: "low",
			label: "1-18",
			emoji: "⬇️",
			multiplier: CONFIG.roulette.rangeMultiplier,
			wins(number) {
				return number >= 1 && number <= 18;
			}
		},
		{
			key: "high",
			label: "19-36",
			emoji: "⬆️",
			multiplier: CONFIG.roulette.rangeMultiplier,
			wins(number) {
				return number >= 19 && number <= 36;
			}
		}
	];

	function queueOutcomeCommonEvent(gameConfig, netResult) {
		if (netResult > 0 && gameConfig.winCommonEvent > 0) {
			$gameTemp.reserveCommonEvent(gameConfig.winCommonEvent);
		} else if (netResult < 0 && gameConfig.loseCommonEvent > 0) {
			$gameTemp.reserveCommonEvent(gameConfig.loseCommonEvent);
		}
	}

	function Window_FoxyCasinoStatus() {
		this.initialize(...arguments);
	}

	Window_FoxyCasinoStatus.prototype = Object.create(Window_Base.prototype);
	Window_FoxyCasinoStatus.prototype.constructor = Window_FoxyCasinoStatus;

	Window_FoxyCasinoStatus.prototype.initialize = function(rect, scene) {
		this._scene = scene;
		Window_Base.prototype.initialize.call(this, rect);
		this.refresh();
	};

	Window_FoxyCasinoStatus.prototype.refresh = function() {
		const rect = this.baseTextRect();
		const halfWidth = Math.floor(rect.width / 2);
		const scene = this._scene;
		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		this.contents.fontSize = 28;
		this.changeTextColor(COLORS.cream);
		this.drawText(`${scene.sceneEmoji()} ${scene.sceneTitle()}`, rect.x + 4, rect.y, halfWidth - 8, "left");
		this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, rect.x + halfWidth, rect.y, halfWidth - 4);
		this.contents.fontSize = 22;
		this.changeTextColor(ColorManager.systemColor());
		this.drawText("Bet", rect.x, rect.y + this.lineHeight(), 64, "left");
		this.resetTextColor();
		this.drawText(currencyText(scene.currentBet()), rect.x + 56, rect.y + this.lineHeight(), halfWidth - 56, "left");
		this.changeTextColor(COLORS.gold);
		this.drawText(scene.statusBadgeText(), rect.x + halfWidth, rect.y + this.lineHeight(), halfWidth - 4, "right");
		this.contents.fontSize = 18;
		this.resetTextColor();
		this.drawText(scene.statusMessageText(), rect.x, rect.y + this.lineHeight() * 2, rect.width, "left");
		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyCasinoActionCommand() {
		this.initialize(...arguments);
	}

	Window_FoxyCasinoActionCommand.prototype = Object.create(Window_Command.prototype);
	Window_FoxyCasinoActionCommand.prototype.constructor = Window_FoxyCasinoActionCommand;

	Window_FoxyCasinoActionCommand.prototype.initialize = function(rect, scene) {
		this._scene = scene;
		this._list = [];
		Window_Command.prototype.initialize.call(this, rect);
	};

	Window_FoxyCasinoActionCommand.prototype.makeCommandList = function() {
		const commands = this._scene.actionCommands();
		for (const command of commands) {
			this.addCommand(command.name, command.symbol, command.enabled !== false, command.ext);
		}
	};

	Window_FoxyCasinoActionCommand.prototype.maxCols = function() {
		const count = this._list ? this._list.length : 0;
		if (count <= 0) {
			return 1;
		}
		if (this._scene && this._scene.actionWindowMaxCols) {
			return Math.max(1, Math.min(count, this._scene.actionWindowMaxCols(count)));
		}
		return count <= 4 ? count : 4;
	};

	Window_FoxyCasinoActionCommand.prototype.itemRect = function(index) {
		const rect = Window_Selectable.prototype.itemRect.call(this, index);
		const maxItems = this.maxItems();
		const maxCols = this.maxCols();
		if (maxItems <= 0 || maxCols <= 1) {
			if (this._scene && this._scene.actionWindowItemRect) {
				return this._scene.actionWindowItemRect(index, rect, this) || rect;
			}
			return rect;
		}
		const lastRowCount = maxItems % maxCols || maxCols;
		if (lastRowCount >= maxCols || index < maxItems - lastRowCount) {
			if (this._scene && this._scene.actionWindowItemRect) {
				return this._scene.actionWindowItemRect(index, rect, this) || rect;
			}
			return rect;
		}
		const align = this._scene && this._scene.actionWindowIncompleteRowAlign
			? this._scene.actionWindowIncompleteRowAlign()
			: "left";
		const missingCols = maxCols - lastRowCount;
		if (align === "right") {
			rect.x += this.itemWidth() * missingCols;
		} else if (align === "center") {
			rect.x += Math.floor((this.itemWidth() * missingCols) / 2);
		}
		if (this._scene && this._scene.actionWindowItemRect) {
			return this._scene.actionWindowItemRect(index, rect, this) || rect;
		}
		return rect;
	};

	Window_FoxyCasinoActionCommand.prototype.itemTextAlign = function() {
		return "center";
	};

	Window_FoxyCasinoActionCommand.prototype.cursorDown = function(wrap) {
		if (this._scene && this._scene.actionWindowDirectionalTarget) {
			const nextIndex = this._scene.actionWindowDirectionalTarget(this.index(), "down", wrap, this);
			if (Number.isInteger(nextIndex) && nextIndex >= 0 && nextIndex < this.maxItems()) {
				this.smoothSelect(nextIndex);
				return;
			}
		}
		Window_Selectable.prototype.cursorDown.call(this, wrap);
	};

	Window_FoxyCasinoActionCommand.prototype.cursorUp = function(wrap) {
		if (this._scene && this._scene.actionWindowDirectionalTarget) {
			const nextIndex = this._scene.actionWindowDirectionalTarget(this.index(), "up", wrap, this);
			if (Number.isInteger(nextIndex) && nextIndex >= 0 && nextIndex < this.maxItems()) {
				this.smoothSelect(nextIndex);
				return;
			}
		}
		Window_Selectable.prototype.cursorUp.call(this, wrap);
	};

	Window_FoxyCasinoActionCommand.prototype.cursorRight = function(wrap) {
		if (this._scene && this._scene.actionWindowDirectionalTarget) {
			const nextIndex = this._scene.actionWindowDirectionalTarget(this.index(), "right", wrap, this);
			if (Number.isInteger(nextIndex) && nextIndex >= 0 && nextIndex < this.maxItems()) {
				this.smoothSelect(nextIndex);
				return;
			}
		}
		Window_Selectable.prototype.cursorRight.call(this, wrap);
	};

	Window_FoxyCasinoActionCommand.prototype.cursorLeft = function(wrap) {
		if (this._scene && this._scene.actionWindowDirectionalTarget) {
			const nextIndex = this._scene.actionWindowDirectionalTarget(this.index(), "left", wrap, this);
			if (Number.isInteger(nextIndex) && nextIndex >= 0 && nextIndex < this.maxItems()) {
				this.smoothSelect(nextIndex);
				return;
			}
		}
		Window_Selectable.prototype.cursorLeft.call(this, wrap);
	};

	function Window_FoxyCasinoBoardBase() {
		this.initialize(...arguments);
	}

	Window_FoxyCasinoBoardBase.prototype = Object.create(Window_Base.prototype);
	Window_FoxyCasinoBoardBase.prototype.constructor = Window_FoxyCasinoBoardBase;

	Window_FoxyCasinoBoardBase.prototype.initialize = function(rect, scene) {
		this._scene = scene;
		Window_Base.prototype.initialize.call(this, rect);
		this.refresh();
	};

	Window_FoxyCasinoBoardBase.prototype.refresh = function() {
		this.contents.clear();
	};

	function Window_FoxySlotsBoard() {
		this.initialize(...arguments);
	}

	Window_FoxySlotsBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxySlotsBoard.prototype.constructor = Window_FoxySlotsBoard;

	Window_FoxySlotsBoard.prototype.refresh = function() {
		const scene = this._scene;
		const config = scene.gameConfig();
		const rect = this.baseTextRect();
		const gap = 12;
		const panelWidth = Math.min(272, Math.floor(rect.width * 0.35));
		const reelAreaWidth = rect.width - panelWidth - 18;
		const reelWidth = Math.floor((reelAreaWidth - gap * 2 - 12) / 3);
		const reelHeight = Math.min(this.innerHeight - 16, Math.max(204, Math.floor(this.innerHeight * 0.88)));
		const reelX = rect.x + 6;
		const reelY = rect.y + Math.max(6, Math.floor((this.innerHeight - reelHeight) / 2));
		const clipPad = 4;
		const cellHeight = Math.floor((reelHeight - clipPad * 2) / 3);
		const infoX = reelX + reelWidth * 3 + gap * 2 + 16;
		const infoY = rect.y + 6;
		const infoHeight = this.innerHeight - infoY - 6;
		const rowOrLines = scene.isSingleRowBetType()
			? `Row: ${scene.selectedRowLabel()}`
			: `Active Lines: ${scene.activePaylines().length}`;
		const rareTriple = `${scene.rareSlotSymbol()} ${scene.rareSlotSymbol()} ${scene.rareSlotSymbol()}`;
		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText(scene.isSpinning() ? "Spinning" : "Ready", reelX, rect.y, reelAreaWidth, "right");
		for (let i = 0; i < 3; i++) {
			const x = reelX + i * (reelWidth + gap);
			const drawData = scene.reelDrawData(i);
			drawPanel(this.contents, x, reelY, reelWidth, reelHeight, COLORS.tableDark, COLORS.accent);
			for (let row = 1; row < 3; row++) {
				this.contents.fillRect(x + 6, reelY + clipPad + row * cellHeight - 1, reelWidth - 12, 2, "rgba(99, 221, 180, 0.22)");
			}
			withBitmapClip(this.contents, x + clipPad, reelY + clipPad, reelWidth - clipPad * 2, reelHeight - clipPad * 2, () => {
				const offsetY = drawData.offset * cellHeight;
				this.contents.fontSize = Math.max(28, Math.min(46, Math.floor(cellHeight * 0.72)));
				this.changeTextColor(COLORS.cream);
				for (let row = 0; row < drawData.symbols.length; row++) {
					const drawY = reelY + clipPad + (row - 1) * cellHeight - offsetY;
					this.contents.drawText(drawData.symbols[row], x + clipPad, drawY, reelWidth - clipPad * 2, cellHeight, "center");
				}
			});
		}
		scene.activePaylines().forEach((line, index) => {
			const points = line.positions.map(position => ({
				x: reelX + position.col * (reelWidth + gap) + Math.floor(reelWidth / 2),
				y: reelY + clipPad + Math.floor((position.row + 0.5) * cellHeight)
			}));
			for (let pointIndex = 0; pointIndex < points.length - 1; pointIndex++) {
				drawLine(this.contents, points[pointIndex].x, points[pointIndex].y, points[pointIndex + 1].x, points[pointIndex + 1].y, SLOT_LINE_COLORS[index % SLOT_LINE_COLORS.length], 4);
			}
		});
		drawPanel(this.contents, infoX, infoY, panelWidth, infoHeight, COLORS.tableDark, COLORS.accent);
		this.contents.fontSize = 18;
		this.changeTextColor(COLORS.gold);
		this.drawText(`${scene.currentBetTypeData().emoji} ${scene.currentBetTypeData().label}`, infoX + 10, infoY + 8, panelWidth - 20, "left");
		this.contents.fontSize = 16;
		this.resetTextColor();
		this.drawText(rowOrLines, infoX + 10, infoY + 34, panelWidth - 20, "left");
		this.drawText(`Line Bet: ${currencyText(scene.currentBet())}`, infoX + 10, infoY + 54, panelWidth - 20, "left");
		this.drawText(`Total Wager: ${currencyText(scene.currentWager())}`, infoX + 10, infoY + 74, panelWidth - 20, "left");
		this.drawText(`Reel Strip: ${scene.reelStripLength()} symbols`, infoX + 10, infoY + 94, panelWidth - 20, "left");
		this.changeTextColor(COLORS.gold);
		this.drawText(`${rareTriple}  x${formatMultiplier(config.jackpotMultiplier)}`, infoX + 10, infoY + 126, panelWidth - 20, "left");
		this.drawText(`Any Other Triple  x${formatMultiplier(config.tripleMultiplier)}`, infoX + 10, infoY + 148, panelWidth - 20, "left");
		this.drawText(`Any Pair  x${formatMultiplier(config.pairMultiplier)}`, infoX + 10, infoY + 170, panelWidth - 20, "left");
		drawChip(this, infoX + panelWidth - 42, infoY + infoHeight - 34, 28, COLORS.chipRed, String(scene.currentBet()));
		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyRouletteBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyRouletteBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyRouletteBoard.prototype.constructor = Window_FoxyRouletteBoard;

	Window_FoxyRouletteBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const panelX = rect.x + 6;
		const panelY = rect.y + 8;
		const panelWidth = Math.max(230, Math.min(312, Math.floor(rect.width * 0.34)));
		const panelHeight = this.innerHeight - panelY - 10;
		const wheelAreaX = panelX + panelWidth + 18;
		const wheelAreaWidth = Math.max(220, rect.x + rect.width - wheelAreaX - 6);
		const wheelCenterX = wheelAreaX + Math.floor(wheelAreaWidth / 2);
		const wheelCenterY = panelY + Math.floor(panelHeight * 0.5) + 2;
		const wheelRadius = Math.max(96, Math.min(136, Math.floor(Math.min(wheelAreaWidth * 0.45, panelHeight * 0.41))));

		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		this.drawRouletteSidePanel(panelX, panelY, panelWidth, panelHeight, scene);
		this.drawRouletteWheel(wheelCenterX, wheelCenterY, wheelRadius, scene);
		this.resetTextColor();
		this.resetFontSettings();
	};

	Window_FoxyRouletteBoard.prototype.drawRouletteLabelCell = function(x, y, width, height, label, fillColor, borderColor, textColor, fontSize) {
		drawPanel(this.contents, x, y, width, height, fillColor, borderColor);
		this.contents.fontSize = fontSize;
		this.changeTextColor(textColor);
		const lineHeight = Math.max(18, fontSize + 6);
		this.contents.drawText(String(label), x, y + Math.floor((height - lineHeight) / 2), width, lineHeight, "center");
	};

	Window_FoxyRouletteBoard.prototype.drawRouletteTableBall = function(centerX, centerY) {
		this.contents.drawCircle(centerX, centerY + 1, 7, "rgba(10, 16, 22, 0.55)");
		this.contents.drawCircle(centerX, centerY, 6, COLORS.tableDark);
		this.contents.drawCircle(centerX, centerY, 5, COLORS.cream);
		this.contents.drawCircle(centerX - 1, centerY - 1, 2, "#ffffff");
	};

	Window_FoxyRouletteBoard.prototype.drawRouletteInfoCell = function(x, y, width, height, label, value, compact) {
		this.contents.fontSize = compact ? 11 : 12;
		this.changeTextColor(COLORS.gold);
		this.drawText(label, x + 2, y + 3, width - 4, "left");
		this.contents.fontSize = compact ? 13 : 15;
		this.resetTextColor();
		this.drawText(value, x + 2, y + height - (compact ? 21 : 23), width - 4, "left");
		this.contents.fillRect(x, y + height - 2, width, 1, "rgba(255, 255, 255, 0.15)");
	};

	Window_FoxyRouletteBoard.prototype.drawRoulettePayoutCell = function(x, y, width, height, label, value, compact) {
		drawPanel(this.contents, x, y, width, height, COLORS.tableLight, COLORS.accentDark);
		this.contents.fontSize = compact ? 11 : 12;
		this.changeTextColor(COLORS.cream);
		this.drawText(label, x + 6, y + 3, width - 12, "center");
		this.contents.fontSize = compact ? 13 : 15;
		this.changeTextColor(COLORS.gold);
		this.drawText(value, x + 6, y + height - (compact ? 21 : 23), width - 12, "center");
	};

	Window_FoxyRouletteBoard.prototype.drawRoulettePayoutRow = function(x, y, width, height, label, value, compact) {
		this.contents.fontSize = compact ? 11 : 12;
		this.changeTextColor(COLORS.cream);
		this.drawText(label, x + 8, y + Math.floor((height - (compact ? 18 : 20)) / 2), width * 0.62, compact ? 18 : 20, "left");
		this.contents.fontSize = compact ? 13 : 15;
		this.changeTextColor(COLORS.gold);
		this.drawText(value, x + Math.floor(width * 0.56), y + Math.floor((height - (compact ? 18 : 20)) / 2), width * 0.36 - 8, compact ? 18 : 20, "right");
		this.contents.fillRect(x, y + height - 2, width, 1, "rgba(255, 255, 255, 0.15)");
	};

	Window_FoxyRouletteBoard.prototype.drawRouletteSidePanel = function(x, y, width, height, scene) {
		if (width <= 0 || height <= 0) {
			return;
		}
		const displayNumber = scene.displayNumber();
		const type = scene.currentRouletteType();
		const compact = width < 250 || height < 250;
		const pad = compact ? 8 : 10;
		const gap = 6;
		const summaryHeight = compact ? 38 : 42;
		const summaryWidth = Math.floor((width - pad * 2 - gap) / 2);
		const summaryY = y + 30;
		const payoutTitleY = summaryY + summaryHeight * 2 + gap + 10;
		const payoutRowsY = payoutTitleY + (compact ? 18 : 20);
		const payoutRows = [
			{ label: "Straight", value: `x${formatMultiplier(CONFIG.roulette.straightMultiplier)}` },
			{ label: "Red / Black", value: `x${formatMultiplier(CONFIG.roulette.colorMultiplier)}` },
			{ label: "Even / Odd", value: `x${formatMultiplier(CONFIG.roulette.evenOddMultiplier)}` },
			{ label: "1-18 / 19-36", value: `x${formatMultiplier(CONFIG.roulette.rangeMultiplier)}` }
		];
		const remainingHeight = Math.max(0, y + height - pad - payoutRowsY);
		const payoutRowHeight = Math.max(28, Math.min(compact ? 34 : 38, Math.floor((remainingHeight - gap * (payoutRows.length - 1)) / payoutRows.length)));
		const targetValue = type.key === "straight" ? `${type.emoji} ${scene.selectedRouletteNumber()}` : `${type.emoji} ${type.label}`;
		const lastValue = `${displayNumber} ${rouletteColorName(displayNumber)}`;

		drawPanel(this.contents, x, y, width, height, COLORS.tableDark, COLORS.accent);
		this.contents.fontSize = compact ? 18 : 20;
		this.changeTextColor(COLORS.gold);
		this.drawText("Bets & Payouts", x + 12, y + 6, width - 24, "left");
		this.drawRouletteInfoCell(x + pad, summaryY, summaryWidth, summaryHeight, "Bet Type", `${type.emoji} ${type.label}`, compact);
		this.drawRouletteInfoCell(x + pad + summaryWidth + gap, summaryY, summaryWidth, summaryHeight, "Bet", currencyText(scene.currentBet()), compact);
		this.drawRouletteInfoCell(x + pad, summaryY + summaryHeight + gap, summaryWidth, summaryHeight, "Target", targetValue, compact);
		this.drawRouletteInfoCell(x + pad + summaryWidth + gap, summaryY + summaryHeight + gap, summaryWidth, summaryHeight, scene.isSpinning() ? "Tracking" : "Last", lastValue, compact);
		this.contents.fontSize = compact ? 12 : 13;
		this.changeTextColor(COLORS.gold);
		this.drawText("Payouts", x + 12, payoutTitleY, width - 24, "left");
		for (let index = 0; index < payoutRows.length; index++) {
			const rowY = payoutRowsY + index * (payoutRowHeight + gap);
			const rowHeight = index === payoutRows.length - 1 ? y + height - pad - rowY : payoutRowHeight;
			this.drawRoulettePayoutRow(x + pad, rowY, width - pad * 2, rowHeight, payoutRows[index].label, payoutRows[index].value, compact);
		}
		drawChip(this, x + width - 34, y + 24, 18, COLORS.chipBlack, String(scene.currentBet()));
	};

	Window_FoxyRouletteBoard.prototype.drawRouletteBettingBoard = function(x, y, width, height, scene) {
		const displayNumber = scene.displayNumber();
		const currentTypeKey = scene.currentRouletteType().key;
		const selectedNumber = scene.selectedRouletteNumber();
		const panelHeight = Math.max(0, height - 4);
		const titleWidth = Math.floor(width * 0.46);
		const gridY = y + 34;
		const zeroWidth = Math.max(42, Math.min(52, Math.floor(width * 0.09)));
		const zeroX = x + 8;
		const gridX = zeroX + zeroWidth;
		const gridWidth = Math.max(120, width - zeroWidth - 18);
		const cellWidth = Math.floor(gridWidth / 12);
		const gridHeight = Math.max(102, height - 84);
		const cellHeight = Math.floor(gridHeight / 3);
		const zeroHeight = cellHeight * 3;
		const outsideY = gridY + zeroHeight + 8;
		const outsideHeight = Math.max(28, Math.min(36, y + height - outsideY - 10));
		let tableBallPoint = null;

		drawPanel(this.contents, x, y, width, panelHeight, COLORS.tableDark, COLORS.accent);
		this.contents.fontSize = 18;
		this.changeTextColor(COLORS.gold);
		this.drawText("Table Layout", x + 10, y + 6, titleWidth, "left");
		this.drawText(scene.targetText(), x + titleWidth, y + 6, width - titleWidth - 10, "right");

		this.drawRouletteLabelCell(
			zeroX,
			gridY,
			zeroWidth,
			zeroHeight,
			0,
			COLORS.rouletteGreen,
			currentTypeKey === "straight" && selectedNumber === 0 ? COLORS.gold : (displayNumber === 0 ? COLORS.accent : COLORS.accentDark),
			COLORS.cream,
			18
		);
		if (displayNumber === 0) {
			tableBallPoint = {
				x: zeroX + Math.floor(zeroWidth / 2),
				y: gridY + 14
			};
		}

		for (let column = 0; column < 12; column++) {
			const drawX = gridX + column * cellWidth;
			const drawWidth = column === 11 ? gridX + gridWidth - drawX : cellWidth;
			const columnNumbers = [column * 3 + 3, column * 3 + 2, column * 3 + 1];
			for (let row = 0; row < 3; row++) {
				const number = columnNumbers[row];
				const drawY = gridY + row * cellHeight;
				const drawHeight = row === 2 ? gridY + zeroHeight - drawY : cellHeight;
				const selected = currentTypeKey === "straight" && selectedNumber === number;
				const borderColor = selected ? COLORS.gold : (displayNumber === number ? COLORS.accent : COLORS.accentDark);
				this.drawRouletteLabelCell(drawX, drawY, drawWidth, drawHeight, number, rouletteNumberColor(number), borderColor, COLORS.cream, 16);
				if (displayNumber === number) {
					tableBallPoint = {
						x: drawX + drawWidth - 10,
						y: drawY + 10
					};
				}
			}
		}

		const outsideWidth = Math.floor(gridWidth / ROULETTE_OUTSIDE_BETS.length);
		for (let index = 0; index < ROULETTE_OUTSIDE_BETS.length; index++) {
			const betData = ROULETTE_OUTSIDE_BETS[index];
			const drawX = gridX + index * outsideWidth;
			const drawWidth = index === ROULETTE_OUTSIDE_BETS.length - 1 ? gridX + gridWidth - drawX : outsideWidth;
			const selected = currentTypeKey === betData.key;
			this.drawRouletteLabelCell(drawX, outsideY, drawWidth, outsideHeight, betData.label, betData.fill, selected ? COLORS.gold : COLORS.accentDark, betData.textColor, 15);
		}

		if (tableBallPoint) {
			this.drawRouletteTableBall(tableBallPoint.x, tableBallPoint.y);
		}
	};

	Window_FoxyRouletteBoard.prototype.drawRouletteWheel = function(centerX, centerY, radius, scene) {
		const displayNumber = scene.displayNumber();
		const segmentStep = TAU / ROULETTE_WHEEL_ORDER.length;
		const segmentOuterRadius = radius + 12;
		const segmentInnerRadius = radius - 18;
		const labelRadius = (segmentOuterRadius + segmentInnerRadius) / 2;
		const labelFontSize = Math.max(11, Math.min(15, Math.floor(radius * 0.12)));
		const outerTrackRadius = radius + 18;
		const ballOrbit = outerTrackRadius - scene.ballDropOffset();

		this.contents.drawCircle(centerX, centerY, radius + 34, COLORS.gold);
		this.contents.drawCircle(centerX, centerY, radius + 30, COLORS.tableDark);
		this.contents.drawCircle(centerX, centerY, radius + 6, "#3a2416");
		this.contents.drawCircle(centerX, centerY, segmentInnerRadius - 4, COLORS.tableLight);
		this.contents.drawCircle(centerX, centerY, radius - 52, COLORS.tableDark);
		this.contents.fontSize = Math.max(18, Math.min(24, Math.floor(radius * 0.18)));
		this.changeTextColor(COLORS.gold);
		this.drawText("▼", centerX - 24, centerY - radius - 50, 48, "center");

		for (const number of ROULETTE_WHEEL_ORDER) {
			const angle = roulettePocketAngle(number) + scene.wheelRotation();
			const startAngle = angle - segmentStep / 2;
			const endAngle = angle + segmentStep / 2;
			const highlight = number === displayNumber;
			drawRingSegment(
				this.contents,
				centerX,
				centerY,
				segmentInnerRadius,
				segmentOuterRadius,
				startAngle,
				endAngle,
				rouletteNumberColor(number),
				highlight ? COLORS.gold : "rgba(255, 255, 255, 0.18)",
				highlight ? 2 : 1
			);
			const labelX = centerX + Math.cos(angle) * labelRadius;
			const labelY = centerY + Math.sin(angle) * labelRadius;
			this.contents.fontSize = number >= 10 ? labelFontSize - 1 : labelFontSize;
			this.changeTextColor(COLORS.cream);
			const labelWidth = number >= 10 ? 28 : 24;
			const labelHeight = labelFontSize + 6;
			this.contents.drawText(String(number), labelX - Math.floor(labelWidth / 2), labelY - Math.floor(labelHeight / 2), labelWidth, labelHeight, "center");
		}
		this.contents._baseTexture.update();

		const ballX = centerX + Math.cos(scene.ballAngle()) * ballOrbit;
		const ballY = centerY + Math.sin(scene.ballAngle()) * ballOrbit;
		this.contents.drawCircle(ballX, ballY, 8, COLORS.cream);
		this.contents.drawCircle(ballX - 2, ballY - 2, 3, "#ffffff");
		this.contents.drawCircle(centerX, centerY, 30, rouletteNumberColor(displayNumber));
		this.contents.fontSize = Math.max(24, Math.min(32, Math.floor(radius * 0.25)));
		this.changeTextColor(COLORS.cream);
		this.drawText(String(displayNumber), centerX - 44, centerY - 18, 88, "center");
	};

	function Window_FoxyPokerBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyPokerBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyPokerBoard.prototype.constructor = Window_FoxyPokerBoard;

	Window_FoxyPokerBoard.prototype.drawPayoutRow = function(x, y, width, height, title, value, active, compact) {
		const lineHeight = compact ? 18 : 20;
		const textY = y + Math.floor((height - lineHeight) / 2);
		const valueWidth = Math.min(Math.max(compact ? 72 : 78, Math.floor(width * 0.28)), compact ? 84 : 96);
		const valueX = x + width - valueWidth - 6;
		const labelX = x + 12;
		const labelWidth = Math.max(0, valueX - labelX - 10);
		this.contents.paintOpacity = active ? 255 : 112;
		this.contents.fillRect(x + 1, y + 4, active ? 4 : 2, Math.max(0, height - 8), active ? COLORS.gold : COLORS.accentDark);
		this.contents.paintOpacity = active ? 255 : 176;
		this.contents.fontSize = compact ? 11 : 12;
		this.changeTextColor(active ? COLORS.gold : COLORS.cream);
		this.contents.drawText(title, labelX, textY, labelWidth, lineHeight, "left");
		this.contents.fontSize = compact ? 12 : 14;
		this.changeTextColor(active ? COLORS.cream : COLORS.gold);
		this.contents.drawText(value, valueX, textY, valueWidth, lineHeight, "right");
		this.contents.paintOpacity = 255;
	};

	Window_FoxyPokerBoard.prototype.drawPayoutTable = function(x, y, width, height, scene, compact) {
		const entries = [
			{ title: "One Pair", value: `x${formatMultiplier(CONFIG.poker.pairMultiplier)}`, handName: "Pair" },
			{ title: "Two Pair", value: `x${formatMultiplier(CONFIG.poker.twoPairMultiplier)}`, handName: "Two Pair" },
			{ title: "Three of a Kind", value: `x${formatMultiplier(CONFIG.poker.threeKindMultiplier)}`, handName: "Three of a Kind" },
			{ title: "Straight", value: `x${formatMultiplier(CONFIG.poker.straightMultiplier)}`, handName: "Straight" },
			{ title: "Flush", value: `x${formatMultiplier(CONFIG.poker.flushMultiplier)}`, handName: "Flush" },
			{ title: "Full House", value: `x${formatMultiplier(CONFIG.poker.fullHouseMultiplier)}`, handName: "Full House" },
			{ title: "Four of a Kind", value: `x${formatMultiplier(CONFIG.poker.fourKindMultiplier)}`, handName: "Four of a Kind" },
			{ title: "Straight Flush", value: `x${formatMultiplier(CONFIG.poker.straightFlushMultiplier)}`, handName: "Straight Flush" },
			{ title: "Royal Flush", value: `x${formatMultiplier(CONFIG.poker.royalFlushMultiplier)}`, handName: "Royal Flush" }
		];
		const activeHand = scene.cards().length > 0 ? scene.currentHandName() : "";
		const columnGap = compact ? 10 : 12;
		const rowGap = compact ? 4 : 6;
		const splitIndex = Math.ceil(entries.length / 2);
		const columns = [entries.slice(0, splitIndex), entries.slice(splitIndex)];
		const maxRows = columns.reduce((result, columnEntries) => Math.max(result, columnEntries.length), 0);
		const columnWidth = Math.floor((width - columnGap) / 2);
		const rowHeight = Math.max(compact ? 18 : 20, Math.floor((height - rowGap * Math.max(0, maxRows - 1)) / Math.max(1, maxRows)));
		for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
			const columnEntries = columns[columnIndex];
			const drawX = x + columnIndex * (columnWidth + columnGap);
			const drawWidth = columnIndex === columns.length - 1 ? x + width - drawX : columnWidth;
			const columnHeight = columnEntries.length * rowHeight + Math.max(0, columnEntries.length - 1) * rowGap;
			const columnOffsetY = y + Math.max(0, Math.floor((height - columnHeight) / 2));
			for (let rowIndex = 0; rowIndex < columnEntries.length; rowIndex++) {
				const entry = columnEntries[rowIndex];
				const drawY = columnOffsetY + rowIndex * (rowHeight + rowGap);
				this.drawPayoutRow(drawX, drawY, drawWidth, rowHeight, entry.title, entry.value, activeHand === entry.handName, compact);
			}
		}
	};

	Window_FoxyPokerBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const gap = 12;
		const compact = rect.width < 720 || this.innerHeight < 290;
		const tableHeight = compact ? 112 : 124;
		const payoutTableY = rect.y + 30;
		const cardAreaTop = rect.y + tableHeight + 52;
		const cardAreaBottom = this.innerHeight - 18;
		const cardWidth = Math.min(compact ? 90 : 102, Math.floor((rect.width - gap * 4) / 5));
		const cardHeight = Math.min(compact ? 108 : 122, Math.max(78, cardAreaBottom - cardAreaTop - 22));
		const totalWidth = cardWidth * 5 + gap * 4;
		const startX = rect.x + Math.floor((rect.width - totalWidth) / 2);
		const cardY = cardAreaTop;
		const cards = scene.cards();
		const headerWidth = Math.floor(rect.width * 0.58);
		const deckText = CONFIG.poker.wildCards ? `${CARD_WILD_EMOJI} Wilds x${POKER_WILD_CARD_COUNT}` : "Standard Deck";
		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		this.contents.fontSize = compact ? 20 : 22;
		this.changeTextColor(COLORS.gold);
		this.drawText(cards.length > 0 ? `Hand: ${scene.currentHandName()}` : "Deal Five Cards", rect.x, rect.y, headerWidth, "left");
		this.drawText(deckText, rect.x + headerWidth, rect.y, rect.width - headerWidth, "right");
		this.drawPayoutTable(rect.x, payoutTableY, rect.width, tableHeight, scene, compact);
		for (let i = 0; i < 5; i++) {
			const x = startX + i * (cardWidth + gap);
			const card = cards[i] || null;
			drawCard(this, card, x, cardY, cardWidth, cardHeight, {
				hidden: !card,
				hold: scene.isHeld(i)
			});
			this.contents.fontSize = compact ? 14 : 16;
			this.changeTextColor(COLORS.cream);
			this.drawText(String(i + 1), x, cardY + cardHeight + 4, cardWidth, "center");
		}
		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyBlackjackBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyBlackjackBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyBlackjackBoard.prototype.constructor = Window_FoxyBlackjackBoard;

	Window_FoxyBlackjackBoard.prototype.drawHand = function(cards, x, y, width, height, hiddenSecond) {
		const displayCards = cards.length > 0 ? cards : [null, null];
		const count = displayCards.length;
		const maxWidthByCount = Math.floor((width - 20) / Math.max(count, 5)) - 4;
		const maxWidthByHeight = Math.floor((Math.max(64, height) - 6) / 1.45);
		let cardWidth = Math.min(78, maxWidthByCount, maxWidthByHeight);
		cardWidth = Math.max(42, cardWidth);
		const gap = Math.max(4, Math.min(14, Math.floor((width - cardWidth * count) / Math.max(count - 1, 1))));
		const totalWidth = cardWidth * count + gap * Math.max(0, count - 1);
		const startX = x + Math.max(0, Math.floor((width - totalWidth) / 2));
		const cardHeight = Math.min(height, Math.floor(cardWidth * 1.45));
		const drawY = y + Math.max(0, Math.floor((height - cardHeight) / 2));
		for (let i = 0; i < displayCards.length; i++) {
			const card = displayCards[i];
			drawCard(this, card, startX + i * (cardWidth + gap), drawY, cardWidth, cardHeight, {
				hidden: !card || (hiddenSecond && i === 1)
			});
		}
	};

	Window_FoxyBlackjackBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const sectionHeight = Math.floor((this.innerHeight - rect.y - 12) / 2);
		const handAreaY = 30;
		const handAreaHeight = Math.max(72, sectionHeight - handAreaY - 8);
		const dealerY = rect.y + 4;
		const playerY = dealerY + sectionHeight + 8;
		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		drawPanel(this.contents, rect.x, dealerY, rect.width, sectionHeight, COLORS.tableDark, COLORS.accent);
		drawPanel(this.contents, rect.x, playerY, rect.width, sectionHeight, COLORS.tableDark, COLORS.accent);
		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText("Dealer", rect.x + 10, dealerY + 4, rect.width / 2, "left");
		this.drawText(`Total: ${scene.dealerTotalText()}`, rect.x + rect.width / 2, dealerY + 4, rect.width / 2 - 10, "right");
		this.drawText("Player", rect.x + 10, playerY + 4, rect.width / 2, "left");
		this.drawText(`Total: ${scene.playerTotalText()}`, rect.x + rect.width / 2, playerY + 4, rect.width / 2 - 10, "right");
		this.resetTextColor();
		this.drawHand(scene.dealerCards(), rect.x + 8, dealerY + handAreaY, rect.width - 16, handAreaHeight, scene.isDealerHidden());
		this.drawHand(scene.playerCards(), rect.x + 8, playerY + handAreaY, rect.width - 16, handAreaHeight, false);
		this.contents.fontSize = 16;
		this.changeTextColor(COLORS.cream);
		this.drawText(`Natural x${formatMultiplier(CONFIG.blackjack.blackjackMultiplier)} | Win x${formatMultiplier(CONFIG.blackjack.winMultiplier)}`, rect.x, this.innerHeight - 28, rect.width, "center");
		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyBaccaratBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyBaccaratBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyBaccaratBoard.prototype.constructor = Window_FoxyBaccaratBoard;

	Window_FoxyBaccaratBoard.prototype.multiplierText = function(typeKey) {
		switch (typeKey) {
			case "player":
				return `x${formatMultiplier(CONFIG.baccarat.playerMultiplier)}`;
			case "banker":
				return `x${formatMultiplier(CONFIG.baccarat.bankerMultiplier)}`;
			default:
				return `x${formatMultiplier(CONFIG.baccarat.tieMultiplier)}`;
		}
	};

	Window_FoxyBaccaratBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const footerHeight = 56;
		const sectionGap = 10;
		const availableHeight = this.innerHeight - rect.y - footerHeight - sectionGap - 12;
		const sectionHeight = Math.max(96, Math.floor(availableHeight / 2));
		const playerY = rect.y + 6;
		const bankerY = playerY + sectionHeight + sectionGap;
		const footerY = bankerY + sectionHeight + 8;
		const footerGap = 8;
		const footerWidth = Math.floor((rect.width - footerGap * (BACCARAT_BET_TYPES.length - 1)) / BACCARAT_BET_TYPES.length);

		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		drawPanel(this.contents, rect.x, playerY, rect.width, sectionHeight, COLORS.tableDark, COLORS.accent);
		drawPanel(this.contents, rect.x, bankerY, rect.width, sectionHeight, COLORS.tableDark, COLORS.accent);

		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText("Player", rect.x + 10, playerY + 4, rect.width / 2, "left");
		this.drawText(`Total: ${scene.playerTotalText()}`, rect.x + rect.width / 2, playerY + 4, rect.width / 2 - 10, "right");
		this.drawText("Banker", rect.x + 10, bankerY + 4, rect.width / 2, "left");
		this.drawText(`Total: ${scene.bankerTotalText()}`, rect.x + rect.width / 2, bankerY + 4, rect.width / 2 - 10, "right");
		this.resetTextColor();

		drawCardRow(this, scene.playerCards(), rect.x + 8, playerY + 32, rect.width - 16, sectionHeight - 38, {
			placeholderCount: scene.playerCards().length > 2 ? 3 : 2,
			maxCardWidth: 88
		});
		drawCardRow(this, scene.bankerCards(), rect.x + 8, bankerY + 32, rect.width - 16, sectionHeight - 38, {
			placeholderCount: scene.bankerCards().length > 2 ? 3 : 2,
			maxCardWidth: 88
		});

		BACCARAT_BET_TYPES.forEach((betType, index) => {
			const drawX = rect.x + index * (footerWidth + footerGap);
			const drawWidth = index === BACCARAT_BET_TYPES.length - 1 ? rect.x + rect.width - drawX : footerWidth;
			const selected = scene.currentBaccaratBetType().key === betType.key;
			const winning = scene.baccaratWinnerKey() === betType.key;
			drawPanel(
				this.contents,
				drawX,
				footerY,
				drawWidth,
				footerHeight,
				selected ? COLORS.tableLight : COLORS.tableDark,
				winning ? COLORS.gold : (selected ? COLORS.accent : COLORS.accentDark)
			);
			this.contents.fontSize = 18;
			this.changeTextColor(winning ? COLORS.gold : COLORS.cream);
			this.drawText(`${betType.emoji} ${betType.label}`, drawX + 6, footerY + 6, drawWidth - 12, "center");
			this.contents.fontSize = 16;
			this.changeTextColor(winning ? COLORS.cream : COLORS.gold);
			this.drawText(this.multiplierText(betType.key), drawX + 6, footerY + 28, drawWidth - 12, "center");
		});

		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyWarBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyWarBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyWarBoard.prototype.constructor = Window_FoxyWarBoard;

	Window_FoxyWarBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const gap = 12;
		const panelWidth = Math.floor((rect.width - gap) / 2);
		const panelHeight = this.innerHeight - rect.y - 48;
		const leftX = rect.x;
		const rightX = rect.x + panelWidth + gap;

		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		drawPanel(this.contents, leftX, rect.y + 12, panelWidth, panelHeight, COLORS.tableDark, COLORS.accent);
		drawPanel(this.contents, rightX, rect.y + 12, rect.x + rect.width - rightX, panelHeight, COLORS.tableDark, COLORS.accent);

		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText("Player", leftX + 10, rect.y + 18, panelWidth - 20, "left");
		this.drawText("Dealer", rightX + 10, rect.y + 18, rect.x + rect.width - rightX - 20, "left");
		this.resetTextColor();

		drawCardRow(this, scene.playerCard() ? [scene.playerCard()] : [], leftX + 8, rect.y + 48, panelWidth - 16, panelHeight - 56, {
			placeholderCount: 1,
			maxCardWidth: 110,
			minCardWidth: 74
		});
		drawCardRow(this, scene.dealerCard() ? [scene.dealerCard()] : [], rightX + 8, rect.y + 48, rect.x + rect.width - rightX - 16, panelHeight - 56, {
			placeholderCount: 1,
			maxCardWidth: 110,
			minCardWidth: 74
		});

		this.contents.fontSize = 16;
		this.changeTextColor(COLORS.cream);
		this.drawText(`Win x${formatMultiplier(CONFIG.war.winMultiplier)} | Ace High | Ties Push`, rect.x, this.innerHeight - 30, rect.width, "center");
		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyHiLoBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyHiLoBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyHiLoBoard.prototype.constructor = Window_FoxyHiLoBoard;

	Window_FoxyHiLoBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const gap = 24;
		const cardWidth = Math.min(124, Math.floor((rect.width - gap - 24) / 2));
		const cardHeight = Math.floor(cardWidth * 1.45);
		const totalWidth = cardWidth * 2 + gap;
		const startX = rect.x + Math.floor((rect.width - totalWidth) / 2);
		const cardY = rect.y + 44;
		const cellY = cardY + cardHeight + 28;
		const cellGap = 8;
		const cellHeight = 58;
		const cellWidth = Math.floor((rect.width - cellGap * (HILO_CALL_TYPES.length - 1)) / HILO_CALL_TYPES.length);

		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);

		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText(scene.isGuessPhase() ? "Call The Next Card" : "Hi-Lo", rect.x, rect.y, rect.width, "center");

		drawCard(this, scene.baseCard(), startX, cardY, cardWidth, cardHeight, {
			hidden: !scene.baseCard()
		});
		drawCard(this, scene.nextCard(), startX + cardWidth + gap, cardY, cardWidth, cardHeight, {
			hidden: scene.isGuessPhase() || !scene.nextCard()
		});

		this.contents.fontSize = 16;
		this.changeTextColor(COLORS.cream);
		this.drawText("Base", startX, cardY + cardHeight + 4, cardWidth, "center");
		this.drawText(scene.isGuessPhase() ? "Hidden" : "Next", startX + cardWidth + gap, cardY + cardHeight + 4, cardWidth, "center");

		HILO_CALL_TYPES.forEach((callType, index) => {
			const drawX = rect.x + index * (cellWidth + cellGap);
			const drawWidth = index === HILO_CALL_TYPES.length - 1 ? rect.x + rect.width - drawX : cellWidth;
			const active = scene.lastGuessKey() === callType.key;
			drawPanel(this.contents, drawX, cellY, drawWidth, cellHeight, active ? COLORS.tableLight : COLORS.tableDark, active ? COLORS.gold : COLORS.accentDark);
			this.contents.fontSize = 16;
			this.changeTextColor(active ? COLORS.gold : COLORS.cream);
			this.drawText(`${callType.emoji} ${callType.label}`, drawX + 6, cellY + 8, drawWidth - 12, "center");
			this.contents.fontSize = 14;
			this.changeTextColor(COLORS.gold);
			const payoutText = callType.key === "exact"
				? `x${formatMultiplier(CONFIG.hilo.exactMultiplier)}`
				: `x${formatMultiplier(CONFIG.hilo.higherLowerMultiplier)}`;
			this.drawText(payoutText, drawX + 6, cellY + 30, drawWidth - 12, "center");
		});

		this.contents.fontSize = 16;
		this.changeTextColor(COLORS.cream);
		this.drawText("Higher / Lower ties push. Exact pays the long odds.", rect.x, this.innerHeight - 28, rect.width, "center");
		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyThreeCardPokerBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyThreeCardPokerBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyThreeCardPokerBoard.prototype.constructor = Window_FoxyThreeCardPokerBoard;

	Window_FoxyThreeCardPokerBoard.prototype.drawHandPanel = function(x, y, width, height, title, handName, cards) {
		drawPanel(this.contents, x, y, width, height, COLORS.tableDark, COLORS.accent);
		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText(title, x + 10, y + 4, width * 0.45, "left");
		this.drawText(handName, x + Math.floor(width * 0.35), y + 4, width * 0.65 - 10, "right");
		this.resetTextColor();
		drawCardRow(this, cards, x + 8, y + 32, width - 16, height - 38, {
			placeholderCount: 3,
			maxCardWidth: 86,
			minCardWidth: 56
		});
	};

	Window_FoxyThreeCardPokerBoard.prototype.drawPayoutCell = function(x, y, width, height, label, value, active) {
		drawPanel(this.contents, x, y, width, height, active ? COLORS.tableLight : COLORS.tableDark, active ? COLORS.gold : COLORS.accentDark);
		this.contents.fontSize = 13;
		this.changeTextColor(active ? COLORS.gold : COLORS.cream);
		this.drawText(label, x + 6, y + 4, width - 12, "center");
		this.contents.fontSize = 14;
		this.changeTextColor(active ? COLORS.cream : COLORS.gold);
		this.drawText(value, x + 6, y + height - 24, width - 12, "center");
	};

	Window_FoxyThreeCardPokerBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const footerHeight = 82;
		const sectionGap = 10;
		const sectionHeight = Math.max(94, Math.floor((this.innerHeight - rect.y - footerHeight - sectionGap - 12) / 2));
		const dealerY = rect.y + 6;
		const playerY = dealerY + sectionHeight + sectionGap;
		const footerY = playerY + sectionHeight + 8;
		const entries = [
			{ handName: "High Card", label: "High Card", value: `x${formatMultiplier(CONFIG.threecardpoker.winMultiplier)}` },
			{ handName: "Pair", label: "Pair", value: `x${formatMultiplier(CONFIG.threecardpoker.pairMultiplier)}` },
			{ handName: "Flush", label: "Flush", value: `x${formatMultiplier(CONFIG.threecardpoker.flushMultiplier)}` },
			{ handName: "Straight", label: "Straight", value: `x${formatMultiplier(CONFIG.threecardpoker.straightMultiplier)}` },
			{ handName: "Three of a Kind", label: "Trips", value: `x${formatMultiplier(CONFIG.threecardpoker.threeKindMultiplier)}` },
			{ handName: "Straight Flush", label: "Straight Flush", value: `x${formatMultiplier(CONFIG.threecardpoker.straightFlushMultiplier)}` }
		];
		const footerGap = 8;
		const columns = 3;
		const rows = 2;
		const cellWidth = Math.floor((rect.width - footerGap * (columns - 1)) / columns);
		const cellHeight = Math.floor((footerHeight - footerGap * (rows - 1)) / rows);

		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		this.drawHandPanel(rect.x, dealerY, rect.width, sectionHeight, "Dealer", scene.dealerHandName(), scene.dealerCards());
		this.drawHandPanel(rect.x, playerY, rect.width, sectionHeight, "Player", scene.playerHandName(), scene.playerCards());

		for (let index = 0; index < entries.length; index++) {
			const row = Math.floor(index / columns);
			const column = index % columns;
			const drawX = rect.x + column * (cellWidth + footerGap);
			const drawY = footerY + row * (cellHeight + footerGap);
			const drawWidth = column === columns - 1 ? rect.x + rect.width - drawX : cellWidth;
			const drawHeight = row === rows - 1 ? footerY + footerHeight - drawY : cellHeight;
			this.drawPayoutCell(drawX, drawY, drawWidth, drawHeight, entries[index].label, entries[index].value, scene.playerHandName() === entries[index].handName);
		}

		this.resetTextColor();
		this.resetFontSettings();
	};

	function Window_FoxyCrapsBoard() {
		this.initialize(...arguments);
	}

	Window_FoxyCrapsBoard.prototype = Object.create(Window_FoxyCasinoBoardBase.prototype);
	Window_FoxyCrapsBoard.prototype.constructor = Window_FoxyCrapsBoard;

	Window_FoxyCrapsBoard.prototype.drawInfoRow = function(x, y, width, label, value) {
		this.contents.fontSize = 12;
		this.changeTextColor(COLORS.gold);
		this.drawText(label, x + 2, y, width - 4, "left");
		this.contents.fontSize = 16;
		this.resetTextColor();
		this.drawText(value, x + 2, y + 16, width - 4, "left");
		this.contents.fillRect(x, y + 38, width, 1, "rgba(255, 255, 255, 0.12)");
	};

	Window_FoxyCrapsBoard.prototype.refresh = function() {
		const scene = this._scene;
		const rect = this.baseTextRect();
		const panelWidth = Math.max(236, Math.min(300, Math.floor(rect.width * 0.34)));
		const panelX = rect.x + 6;
		const panelY = rect.y + 6;
		const panelHeight = this.innerHeight - panelY - 8;
		const diceAreaX = panelX + panelWidth + 18;
		const diceAreaWidth = Math.max(180, rect.x + rect.width - diceAreaX - 6);
		const diceAreaHeight = panelHeight;
		const dieSize = Math.max(68, Math.min(104, Math.floor(Math.min(diceAreaWidth * 0.28, diceAreaHeight * 0.3))));
		const diceGap = Math.max(18, Math.floor(dieSize * 0.22));
		const totalDiceWidth = dieSize * 2 + diceGap;
		const diceStartX = diceAreaX + Math.max(0, Math.floor((diceAreaWidth - totalDiceWidth) / 2));
		const diceY = panelY + Math.max(16, Math.floor(diceAreaHeight * 0.24));
		const rolling = scene.isDiceRolling();
		const firstDieX = diceStartX + scene.diceOffsetX(0);
		const firstDieY = diceY + scene.diceOffsetY(0);
		const secondDieX = diceStartX + dieSize + diceGap + scene.diceOffsetX(1);
		const secondDieY = diceY + scene.diceOffsetY(1);
		const shadowY = diceY + dieSize + 10;

		this.contents.clear();
		drawPanel(this.contents, 0, 0, this.innerWidth, this.innerHeight, COLORS.tableMid, COLORS.accentDark);
		drawPanel(this.contents, panelX, panelY, panelWidth, panelHeight, COLORS.tableDark, COLORS.accent);
		drawPanel(this.contents, diceAreaX, panelY, diceAreaWidth, diceAreaHeight, COLORS.tableDark, COLORS.accent);

		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.gold);
		this.drawText("Table", panelX + 12, panelY + 6, panelWidth - 24, "left");
		this.drawText("Dice", diceAreaX + 12, panelY + 6, diceAreaWidth - 24, "left");

		this.drawInfoRow(panelX + 10, panelY + 36, panelWidth - 20, "Bet Type", `${scene.currentCrapsBetType().emoji} ${scene.currentCrapsBetType().label}`);
		this.drawInfoRow(panelX + 10, panelY + 80, panelWidth - 20, "Current Bet", currencyText(scene.currentBet()));
		this.drawInfoRow(panelX + 10, panelY + 124, panelWidth - 20, "Active Wager", scene.activeWager() > 0 ? currencyText(scene.activeWager()) : "None");
		this.drawInfoRow(panelX + 10, panelY + 168, panelWidth - 20, "Point", scene.pointValue() > 0 ? String(scene.pointValue()) : "Come-Out Roll");
		this.drawInfoRow(panelX + 10, panelY + 212, panelWidth - 20, "Target", scene.currentTargetText());
		this.drawInfoRow(panelX + 10, panelY + 256, panelWidth - 20, "Payouts", `Pass x${formatMultiplier(CONFIG.craps.passLineMultiplier)} | Don't x${formatMultiplier(CONFIG.craps.dontPassMultiplier)}`);

		this.contents.drawCircle(firstDieX + Math.floor(dieSize / 2), shadowY, Math.max(12, Math.floor(dieSize * 0.18)), rolling ? "rgba(0, 0, 0, 0.30)" : "rgba(0, 0, 0, 0.18)");
		this.contents.drawCircle(secondDieX + Math.floor(dieSize / 2), shadowY, Math.max(12, Math.floor(dieSize * 0.18)), rolling ? "rgba(0, 0, 0, 0.30)" : "rgba(0, 0, 0, 0.18)");

		drawDie(this, firstDieX, firstDieY, dieSize, scene.diceValues()[0], {
			fillColor: COLORS.cardFace,
			borderColor: rolling ? COLORS.accent : COLORS.gold
		});
		drawDie(this, secondDieX, secondDieY, dieSize, scene.diceValues()[1], {
			fillColor: COLORS.cardFace,
			borderColor: rolling ? COLORS.accent : COLORS.gold
		});

		this.contents.fontSize = 20;
		this.changeTextColor(COLORS.cream);
		this.drawText(rolling ? "Rolling..." : "Last Roll", diceAreaX, diceY + dieSize + 18, diceAreaWidth, "center");
		this.contents.fontSize = 34;
		this.changeTextColor(COLORS.gold);
		this.drawText(rolling ? "..." : String(scene.lastTotal()), diceAreaX, diceY + dieSize + 44, diceAreaWidth, "center");
		this.contents.fontSize = 16;
		this.changeTextColor(COLORS.cream);
		this.drawText(rolling ? `${scene.diceValues()[0]} + ${scene.diceValues()[1]}` : `${scene.diceValues()[0]} + ${scene.diceValues()[1]} = ${scene.lastTotal()}`, diceAreaX, diceY + dieSize + 82, diceAreaWidth, "center");
		this.drawText(scene.currentTargetText(), diceAreaX, diceY + dieSize + 112, diceAreaWidth, "center");

		this.resetTextColor();
		this.resetFontSettings();
	};

	function Scene_FoxyCasinoBase() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoBase.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_FoxyCasinoBase.prototype.constructor = Scene_FoxyCasinoBase;

	Scene_FoxyCasinoBase.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
		this._openingBet = 0;
		this._currentBet = 0;
		this._resultText = "";
		this._actionFocusSymbol = null;
	};

	Scene_FoxyCasinoBase.prototype.prepare = function(startingBet) {
		this._openingBet = Math.max(0, Math.floor(Number(startingBet || 0)));
	};

	Scene_FoxyCasinoBase.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createCasinoBackdrop();
		this.createHelpWindow();
		this.createStatusWindow();
		this.createBoardWindow();
		this.createActionWindow();
		this.setupOpeningBet();
		this.refreshAll();
	};

	Scene_FoxyCasinoBase.prototype.createCasinoBackdrop = function() {
		const sprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
		const bitmap = sprite.bitmap;
		bitmap.gradientFillRect(0, 0, Graphics.width, Graphics.height, "#10352a", "#081c16", true);
		bitmap.drawCircle(92, 92, 58, COLORS.chipRed);
		bitmap.drawCircle(92, 92, 42, "#ffffff");
		bitmap.drawCircle(Graphics.width - 92, 104, 58, COLORS.chipBlue);
		bitmap.drawCircle(Graphics.width - 92, 104, 42, "#ffffff");
		bitmap.drawCircle(120, Graphics.height - 90, 54, COLORS.chipBlack);
		bitmap.drawCircle(120, Graphics.height - 90, 38, "#ffffff");
		bitmap.drawCircle(Graphics.width - 120, Graphics.height - 88, 54, COLORS.gold);
		bitmap.drawCircle(Graphics.width - 120, Graphics.height - 88, 38, "#ffffff");
		bitmap.fontSize = 58;
		bitmap.textColor = COLORS.cream;
		bitmap.outlineColor = "rgba(0, 0, 0, 0.45)";
		bitmap.paintOpacity = 84;
		bitmap.drawText("🎰", 30, Graphics.height / 2 - 160, 120, 72, "center");
		bitmap.drawText("🎯", Graphics.width - 150, Graphics.height / 2 - 170, 120, 72, "center");
		bitmap.drawText("🃏", 40, Graphics.height / 2 + 90, 120, 72, "center");
		bitmap.drawText("♠️", Graphics.width - 150, Graphics.height / 2 + 90, 120, 72, "center");
		bitmap.paintOpacity = 255;
		sprite.opacity = 212;
		this.addChildAt(sprite, 1);
	};

	Scene_FoxyCasinoBase.prototype.createHelpWindow = function() {
		Scene_MenuBase.prototype.createHelpWindow.call(this);
		this._helpWindow.setText(this.helpText());
	};

	Scene_FoxyCasinoBase.prototype.createStatusWindow = function() {
		this._statusWindow = new Window_FoxyCasinoStatus(this.statusWindowRect(), this);
		this.addWindow(this._statusWindow);
	};

	Scene_FoxyCasinoBase.prototype.createActionWindow = function() {
		this._actionWindow = new Window_FoxyCasinoActionCommand(this.actionWindowRect(), this);
		this._actionWindow.setHandler("ok", this.onActionOk.bind(this));
		this._actionWindow.setHandler("cancel", this.popScene.bind(this));
		this.addWindow(this._actionWindow);
	};

	Scene_FoxyCasinoBase.prototype.statusWindowRect = function() {
		const wx = 0;
		const wy = this.mainAreaTop();
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(3, false);
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_FoxyCasinoBase.prototype.boardWindowRect = function() {
		const statusRect = this.statusWindowRect();
		const actionRect = this.actionWindowRect();
		const wx = 0;
		const wy = statusRect.y + statusRect.height;
		const ww = Graphics.boxWidth;
		const wh = actionRect.y - wy;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_FoxyCasinoBase.prototype.actionWindowRect = function() {
		const wx = 0;
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(2, true);
		const wy = this.mainAreaBottom() - wh;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_FoxyCasinoBase.prototype.createBoardWindow = function() {
	};

	Scene_FoxyCasinoBase.prototype.gameKey = function() {
		return "";
	};

	Scene_FoxyCasinoBase.prototype.gameConfig = function() {
		return CONFIG[this.gameKey()];
	};

	Scene_FoxyCasinoBase.prototype.sceneEmoji = function() {
		return TITLE_DATA[this.gameKey()].emoji;
	};

	Scene_FoxyCasinoBase.prototype.sceneTitle = function() {
		return TITLE_DATA[this.gameKey()].title;
	};

	Scene_FoxyCasinoBase.prototype.currentBet = function() {
		return Math.max(0, Math.floor(this._currentBet || 0));
	};

	Scene_FoxyCasinoBase.prototype.betUnitsForRound = function() {
		return 1;
	};

	Scene_FoxyCasinoBase.prototype.currentWager = function() {
		return this.currentBet() * Math.max(1, this.betUnitsForRound());
	};

	Scene_FoxyCasinoBase.prototype.minimumBet = function() {
		return this.gameConfig().minBet;
	};

	Scene_FoxyCasinoBase.prototype.maximumTableBet = function() {
		return this.gameConfig().maxBet;
	};

	Scene_FoxyCasinoBase.prototype.maximumBet = function() {
		const gold = $gameParty.gold();
		const goldPerUnit = Math.floor(gold / Math.max(1, this.betUnitsForRound()));
		if (goldPerUnit >= this.minimumBet()) {
			return Math.max(this.minimumBet(), Math.min(this.maximumTableBet(), goldPerUnit));
		}
		return this.minimumBet();
	};

	Scene_FoxyCasinoBase.prototype.openingBet = function() {
		return this._openingBet > 0 ? this._openingBet : CONFIG.defaultBet;
	};

	Scene_FoxyCasinoBase.prototype.setupOpeningBet = function() {
		this._currentBet = this.openingBet();
		this.normalizeBet();
	};

	Scene_FoxyCasinoBase.prototype.normalizeBet = function() {
		const gold = $gameParty.gold();
		if (gold >= this.minimumBet()) {
			this._currentBet = clamp(this._currentBet, this.minimumBet(), this.maximumBet());
		} else {
			this._currentBet = this.minimumBet();
		}
	};

	Scene_FoxyCasinoBase.prototype.canAdjustBet = function() {
		return true;
	};

	Scene_FoxyCasinoBase.prototype.canLeaveScene = function() {
		return true;
	};

	Scene_FoxyCasinoBase.prototype.canStartRound = function() {
		return this.canAdjustBet() && this.currentBet() >= this.minimumBet() && $gameParty.gold() >= this.currentWager();
	};

	Scene_FoxyCasinoBase.prototype.increaseBet = function() {
		if (!this.canAdjustBet()) {
			return;
		}
		this._currentBet = Math.min(this.maximumBet(), this.currentBet() + CONFIG.betStep);
	};

	Scene_FoxyCasinoBase.prototype.decreaseBet = function() {
		if (!this.canAdjustBet()) {
			return;
		}
		this._currentBet = Math.max(this.minimumBet(), this.currentBet() - CONFIG.betStep);
	};

	Scene_FoxyCasinoBase.prototype.maxBetCommand = function() {
		if (!this.canAdjustBet()) {
			return;
		}
		this._currentBet = this.maximumBet();
	};

	Scene_FoxyCasinoBase.prototype.beginWager = function() {
		if (!this.canStartRound()) {
			if ($gameParty.gold() < this.minimumBet()) {
				this._resultText = `Need at least ${currencyText(this.minimumBet())} for this table.`;
			} else {
				this._resultText = `Need ${currencyText(this.currentWager())} to play.`;
			}
			SoundManager.playBuzzer();
			return 0;
		}
		$gameParty.loseGold(this.currentWager());
		return this.currentWager();
	};

	Scene_FoxyCasinoBase.prototype.finishRound = function(wager, payout, text) {
		if (payout > 0) {
			$gameParty.gainGold(payout);
		}
		const netResult = payout - wager;
		this._resultText = text;
		queueOutcomeCommonEvent(this.gameConfig(), netResult);
		this.normalizeBet();
		this.refreshAll();
	};

	Scene_FoxyCasinoBase.prototype.setActionFocus = function(symbol) {
		this._actionFocusSymbol = symbol || null;
	};

	Scene_FoxyCasinoBase.prototype.helpText = function() {
		return "";
	};

	Scene_FoxyCasinoBase.prototype.defaultStatusText = function() {
		return "";
	};

	Scene_FoxyCasinoBase.prototype.statusMessageText = function() {
		return this._resultText || this.defaultStatusText();
	};

	Scene_FoxyCasinoBase.prototype.statusBadgeText = function() {
		return `Min ${this.minimumBet()} / Max ${this.maximumTableBet()}`;
	};

	Scene_FoxyCasinoBase.prototype.readyCommandSet = function(playName, playSymbol, playEnabled) {
		return [
			{
				name: "Bet -",
				symbol: "betDown",
				enabled: this.canAdjustBet() && this.currentBet() > this.minimumBet()
			},
			{
				name: "Bet +",
				symbol: "betUp",
				enabled: this.canAdjustBet() && this.currentBet() < this.maximumBet()
			},
			{
				name: "Max",
				symbol: "betMax",
				enabled: this.canAdjustBet() && this.currentBet() < this.maximumBet() && $gameParty.gold() >= this.minimumBet()
			},
			{
				name: playName,
				symbol: playSymbol,
				enabled: !!playEnabled
			},
			{
				name: "Leave",
				symbol: "leave",
				enabled: this.canLeaveScene()
			}
		];
	};

	Scene_FoxyCasinoBase.prototype.actionCommands = function() {
		return [];
	};

	Scene_FoxyCasinoBase.prototype.actionWindowMaxCols = function(commandCount) {
		return commandCount <= 4 ? commandCount : 4;
	};

	Scene_FoxyCasinoBase.prototype.actionWindowIncompleteRowAlign = function() {
		return "left";
	};

	Scene_FoxyCasinoBase.prototype.actionWindowItemRect = function() {
		return null;
	};

	Scene_FoxyCasinoBase.prototype.actionWindowDirectionalTarget = function() {
		return null;
	};

	Scene_FoxyCasinoBase.prototype.onGameAction = function() {
	};

	Scene_FoxyCasinoBase.prototype.onActionOk = function() {
		const symbol = this._actionWindow.currentSymbol();
		const ext = this._actionWindow.currentExt();
		switch (symbol) {
			case "betDown":
				this.decreaseBet();
				break;
			case "betUp":
				this.increaseBet();
				break;
			case "betMax":
				this.maxBetCommand();
				break;
			case "leave":
				this.popScene();
				return;
			default:
				this.onGameAction(symbol, ext);
				break;
		}
		this.refreshAll();
	};

	Scene_FoxyCasinoBase.prototype.refreshActionWindow = function() {
		if (!this._actionWindow) {
			return;
		}
		const previousIndex = this._actionWindow.index();
		const focusSymbol = this._actionFocusSymbol;
		this._actionWindow.refresh();
		if (this._actionWindow.maxItems() <= 0) {
			return;
		}
		let restoredSelection = false;
		if (focusSymbol) {
			const focusIndex = this._actionWindow.findSymbol(focusSymbol);
			if (focusIndex >= 0) {
				this._actionWindow.forceSelect(focusIndex);
				restoredSelection = true;
			}
		}
		if (!restoredSelection) {
			const safeIndex = clamp(previousIndex, 0, this._actionWindow.maxItems() - 1);
			this._actionWindow.forceSelect(safeIndex);
		}
		const currentIndex = clamp(this._actionWindow.index(), 0, this._actionWindow.maxItems() - 1);
		if (currentIndex !== this._actionWindow.index()) {
			this._actionWindow.forceSelect(currentIndex);
		}
		if (!this._actionWindow.isCommandEnabled(currentIndex)) {
			for (let i = 0; i < this._actionWindow.maxItems(); i++) {
				if (this._actionWindow.isCommandEnabled(i)) {
					this._actionWindow.forceSelect(i);
					break;
				}
			}
		}
		this._actionWindow.activate();
	};

	Scene_FoxyCasinoBase.prototype.refreshAll = function() {
		if (this._helpWindow) {
			this._helpWindow.setText(this.helpText());
		}
		if (this._statusWindow) {
			this._statusWindow.refresh();
		}
		if (this._boardWindow) {
			this._boardWindow.refresh();
		}
		this.refreshActionWindow();
		this._actionFocusSymbol = null;
	};

	Scene_FoxyCasinoBase.prototype.popScene = function() {
		if (this.canLeaveScene()) {
			Scene_Base.prototype.popScene.call(this);
		} else {
			this._resultText = "Finish the round first.";
			SoundManager.playBuzzer();
			this.refreshAll();
		}
	};

	function Scene_FoxyCasinoSlots() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoSlots.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoSlots.prototype.constructor = Scene_FoxyCasinoSlots;

	Scene_FoxyCasinoSlots.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._betTypeIndex = 0;
		this._selectedRow = 1;
		this._spinFrame = 0;
		this._spinning = false;
		this._wager = 0;
		this._lineBet = 0;
		this._reelStates = [];
		this.createSlotReels();
	};

	Scene_FoxyCasinoSlots.prototype.createSlotReels = function() {
		this._reelStates = [];
		for (let index = 0; index < 3; index++) {
			const strip = createWeightedSlotStrip(this.slotSymbols());
			const topIndex = randomInt(strip.length);
			this._reelStates.push({
				strip: strip,
				position: topIndex,
				targetTopIndex: topIndex,
				stopFrame: 0,
				stopped: false
			});
		}
	};

	Scene_FoxyCasinoSlots.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxySlotsBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoSlots.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoSlots.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoSlots.prototype.gameKey = function() {
		return "slots";
	};

	Scene_FoxyCasinoSlots.prototype.slotSymbols = function() {
		return this.gameConfig().symbols;
	};

	Scene_FoxyCasinoSlots.prototype.rareSlotSymbol = function() {
		const symbols = this.slotSymbols();
		return symbols[symbols.length - 1];
	};

	Scene_FoxyCasinoSlots.prototype.currentBetTypeData = function() {
		return SLOT_BET_TYPES[this._betTypeIndex];
	};

	Scene_FoxyCasinoSlots.prototype.isSingleRowBetType = function() {
		return this.currentBetTypeData().key === "single";
	};

	Scene_FoxyCasinoSlots.prototype.selectedRowLabel = function() {
		return SLOT_ROW_LABELS[this._selectedRow];
	};

	Scene_FoxyCasinoSlots.prototype.activePaylines = function() {
		const rowLines = [
			{ label: "Top Row", positions: [{ col: 0, row: 0 }, { col: 1, row: 0 }, { col: 2, row: 0 }] },
			{ label: "Middle Row", positions: [{ col: 0, row: 1 }, { col: 1, row: 1 }, { col: 2, row: 1 }] },
			{ label: "Bottom Row", positions: [{ col: 0, row: 2 }, { col: 1, row: 2 }, { col: 2, row: 2 }] }
		];
		const betType = this.currentBetTypeData().key;
		if (betType === "single") {
			return [rowLines[this._selectedRow]];
		}
		if (betType === "rows") {
			return rowLines;
		}
		return rowLines.concat([
			{ label: "Down Diagonal", positions: [{ col: 0, row: 0 }, { col: 1, row: 1 }, { col: 2, row: 2 }] },
			{ label: "Up Diagonal", positions: [{ col: 0, row: 2 }, { col: 1, row: 1 }, { col: 2, row: 0 }] }
		]);
	};

	Scene_FoxyCasinoSlots.prototype.betUnitsForRound = function() {
		return this.activePaylines().length;
	};

	Scene_FoxyCasinoSlots.prototype.helpText = function() {
		const betType = this.currentBetTypeData().key;
		if (betType === "single") {
			return `Single Row plays the ${this.selectedRowLabel().toLowerCase()} line. Earlier slot emojis are common. Later ones are rare.`;
		}
		if (betType === "rows") {
			return "All Rows plays the top, middle, and bottom paylines together.";
		}
		return "Rows + Diagonals plays all rows and both diagonals for one spin.";
	};

	Scene_FoxyCasinoSlots.prototype.defaultStatusText = function() {
		return "Top entries in Slot Emoji List are common. The last entry is the rarest and appears once per reel.";
	};

	Scene_FoxyCasinoSlots.prototype.statusBadgeText = function() {
		const betType = this.currentBetTypeData();
		const rowText = this.isSingleRowBetType() ? ` ${this.selectedRowLabel()}` : "";
		return `${betType.shortLabel}${rowText} | Wager ${currencyText(this.currentWager())}`;
	};

	Scene_FoxyCasinoSlots.prototype.canAdjustBet = function() {
		return !this._spinning;
	};

	Scene_FoxyCasinoSlots.prototype.canLeaveScene = function() {
		return !this._spinning;
	};

	Scene_FoxyCasinoSlots.prototype.actionCommands = function() {
		return [
			{ name: "Bet Type", symbol: "cycleBetType", enabled: !this._spinning },
			{ name: "Line -", symbol: "lineDown", enabled: !this._spinning && this.isSingleRowBetType() },
			{ name: "Line +", symbol: "lineUp", enabled: !this._spinning && this.isSingleRowBetType() },
			{ name: "Bet -", symbol: "betDown", enabled: this.canAdjustBet() && this.currentBet() > this.minimumBet() },
			{ name: "Bet +", symbol: "betUp", enabled: this.canAdjustBet() && this.currentBet() < this.maximumBet() },
			{ name: "Max", symbol: "betMax", enabled: this.canAdjustBet() && this.currentBet() < this.maximumBet() && $gameParty.gold() >= this.currentWager() },
			{ name: "Spin", symbol: "spin", enabled: this.canStartRound() },
			{ name: "Leave", symbol: "leave", enabled: this.canLeaveScene() }
		];
	};

	Scene_FoxyCasinoSlots.prototype.onGameAction = function(symbol) {
		switch (symbol) {
			case "cycleBetType":
				this._betTypeIndex = (this._betTypeIndex + 1) % SLOT_BET_TYPES.length;
				this.normalizeBet();
				break;
			case "lineDown":
				if (this.isSingleRowBetType()) {
					this._selectedRow = wrapIndex(this._selectedRow - 1, SLOT_ROW_LABELS.length);
				}
				break;
			case "lineUp":
				if (this.isSingleRowBetType()) {
					this._selectedRow = wrapIndex(this._selectedRow + 1, SLOT_ROW_LABELS.length);
				}
				break;
			case "spin": {
				const wager = this.beginWager();
				if (!wager) {
					return;
				}
				this._wager = wager;
				this._lineBet = this.currentBet();
				this._spinning = true;
				this._spinFrame = 0;
				this.setupSpinTargets();
				this._resultText = "Reels spinning...";
				this.setActionFocus("spin");
				break;
			}
		}
	};

	Scene_FoxyCasinoSlots.prototype.setupSpinTargets = function() {
		const baseStop = 28 + Math.ceil(this.reelStripLength() * 1.25);
		for (let index = 0; index < this._reelStates.length; index++) {
			const state = this._reelStates[index];
			state.targetTopIndex = randomInt(state.strip.length);
			state.stopFrame = baseStop + index * 18;
			state.stopped = false;
		}
	};

	Scene_FoxyCasinoSlots.prototype.update = function() {
		Scene_FoxyCasinoBase.prototype.update.call(this);
		if (this._spinning) {
			this.updateSpin();
		}
	};

	Scene_FoxyCasinoSlots.prototype.updateSpin = function() {
		let needsRefresh = false;
		this._spinFrame++;
		for (let index = 0; index < this._reelStates.length; index++) {
			const state = this._reelStates[index];
			if (this._spinFrame < state.stopFrame) {
				const progress = this._spinFrame / state.stopFrame;
				const speed = Math.max(0.18, 0.98 - progress * 0.68 + index * 0.04);
				state.position = wrapIndex(state.position + speed, state.strip.length);
				needsRefresh = true;
			} else if (!state.stopped) {
				state.position = state.targetTopIndex;
				state.stopped = true;
				needsRefresh = true;
			}
		}
		if (needsRefresh && this._boardWindow) {
			this._boardWindow.refresh();
		}
		const lastStopFrame = Math.max(...this._reelStates.map(state => state.stopFrame));
		if (this._spinFrame > lastStopFrame + 6) {
			this.finishSpin();
		}
	};

	Scene_FoxyCasinoSlots.prototype.finishSpin = function() {
		const wins = [];
		let totalPayout = 0;
		for (const line of this.activePaylines()) {
			const symbols = line.positions.map(position => this.slotSymbolAt(position.col, position.row));
			const result = this.evaluateSlotLine(symbols);
			if (result.multiplier > 0) {
				const payout = payoutAmount(this._lineBet, result.multiplier);
				totalPayout += payout;
				wins.push({ line: line.label, result: result.label, payout: payout });
			}
		}
		this._spinning = false;
		this.setActionFocus("spin");
		let text = "No winning lines this spin.";
		if (wins.length === 1) {
			text = `${wins[0].line} ${wins[0].result} pays ${currencyText(totalPayout)}.`;
		} else if (wins.length > 1) {
			text = `${wins.length} winning lines pay ${currencyText(totalPayout)}.`;
		}
		this.finishRound(this._wager, totalPayout, text);
		this._wager = 0;
		this._lineBet = 0;
	};

	Scene_FoxyCasinoSlots.prototype.evaluateSlotLine = function(symbols) {
		const config = this.gameConfig();
		if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
			if (symbols[0] === this.rareSlotSymbol()) {
				return { multiplier: config.jackpotMultiplier, label: "Jackpot" };
			}
			return { multiplier: config.tripleMultiplier, label: "Triple" };
		}
		if (symbols[0] === symbols[1] || symbols[1] === symbols[2] || symbols[0] === symbols[2]) {
			return { multiplier: config.pairMultiplier, label: "Pair" };
		}
		return { multiplier: 0, label: "Miss" };
	};

	Scene_FoxyCasinoSlots.prototype.slotSymbolAt = function(column, row) {
		const state = this._reelStates[column];
		const baseIndex = wrapIndex(Math.floor(state.position), state.strip.length);
		return state.strip[wrapIndex(baseIndex + row, state.strip.length)];
	};

	Scene_FoxyCasinoSlots.prototype.reelDrawData = function(index) {
		const state = this._reelStates[index];
		const baseIndex = Math.floor(state.position);
		const symbols = [];
		for (let offset = -1; offset < 4; offset++) {
			symbols.push(state.strip[wrapIndex(baseIndex + offset, state.strip.length)]);
		}
		return {
			symbols: symbols,
			offset: state.position - baseIndex
		};
	};

	Scene_FoxyCasinoSlots.prototype.reelStripLength = function() {
		return this._reelStates.length > 0 ? this._reelStates[0].strip.length : 0;
	};

	Scene_FoxyCasinoSlots.prototype.isSpinning = function() {
		return this._spinning;
	};

	function Scene_FoxyCasinoRoulette() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoRoulette.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoRoulette.prototype.constructor = Scene_FoxyCasinoRoulette;

	Scene_FoxyCasinoRoulette.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._betTypeIndex = 0;
		this._selectedNumber = 17;
		this._displayNumber = 0;
		this._finalNumber = 0;
		this._spinFrame = 0;
		this._spinDuration = 156;
		this._wheelRotation = 0;
		this._ballAngle = roulettePocketAngle(0);
		this._spinStartWheelRotation = 0;
		this._spinEndWheelRotation = 0;
		this._spinStartBallAngle = this._ballAngle;
		this._spinEndBallAngle = this._ballAngle;
		this._spinning = false;
		this._wager = 0;
	};

	Scene_FoxyCasinoRoulette.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyRouletteBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoRoulette.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoRoulette.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoRoulette.prototype.boardWindowRect = function() {
		const statusRect = this.statusWindowRect();
		const actionRect = this.actionWindowRect();
		const gap = 8;
		const wx = 0;
		const wy = statusRect.y + statusRect.height;
		const ww = Math.max(0, actionRect.x - gap);
		const wh = this.mainAreaBottom() - wy;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_FoxyCasinoRoulette.prototype.actionWindowRect = function() {
		const statusRect = this.statusWindowRect();
		const ww = Math.max(208, Math.min(240, Math.floor(Graphics.boxWidth * 0.29)));
		const wx = Graphics.boxWidth - ww;
		const wy = statusRect.y + statusRect.height;
		const wh = this.mainAreaBottom() - wy;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_FoxyCasinoRoulette.prototype.gameKey = function() {
		return "roulette";
	};

	Scene_FoxyCasinoRoulette.prototype.helpText = function() {
		return "Pick the bet type, set the target if needed, then spin.";
	};

	Scene_FoxyCasinoRoulette.prototype.defaultStatusText = function() {
		return "Zero is always green.";
	};

	Scene_FoxyCasinoRoulette.prototype.statusBadgeText = function() {
		return this.targetText();
	};

	Scene_FoxyCasinoRoulette.prototype.canAdjustBet = function() {
		return !this._spinning;
	};

	Scene_FoxyCasinoRoulette.prototype.canLeaveScene = function() {
		return !this._spinning;
	};

	Scene_FoxyCasinoRoulette.prototype.actionCommands = function() {
		const commands = [];
		if (this.currentRouletteType().key === "straight") {
			commands.push({ name: "-", symbol: "numberDown", enabled: !this._spinning });
		}
		commands.push({ name: "Bet Type", symbol: "cycleType", enabled: !this._spinning });
		if (this.currentRouletteType().key === "straight") {
			commands.push({ name: "+", symbol: "numberUp", enabled: !this._spinning });
		}
		commands.push(
			{ name: "Bet -", symbol: "betDown", enabled: this.canAdjustBet() && this.currentBet() > this.minimumBet() },
			{ name: "Bet +", symbol: "betUp", enabled: this.canAdjustBet() && this.currentBet() < this.maximumBet() },
			{ name: "Max", symbol: "betMax", enabled: this.canAdjustBet() && this.currentBet() < this.maximumBet() && $gameParty.gold() >= this.minimumBet() },
			{ name: "Spin", symbol: "spin", enabled: this.canStartRound() },
			{ name: "Leave", symbol: "leave", enabled: this.canLeaveScene() }
		);
		return commands;
	};

	Scene_FoxyCasinoRoulette.prototype.actionWindowMaxCols = function() {
		return 1;
	};

	Scene_FoxyCasinoRoulette.prototype.actionWindowIncompleteRowAlign = function() {
		return "right";
	};

	Scene_FoxyCasinoRoulette.prototype.actionWindowItemRect = function(index, rect, window) {
		const symbol = window.commandSymbol(index);
		const innerWidth = window.innerWidth;
		const topPad = 8;
		const rowGap = 8;
		const rowHeight = Math.max(34, Math.min(44, Math.floor((window.innerHeight - topPad * 2 - rowGap * 4) / 5)));
		const fullWidth = innerWidth;
		const halfWidth = Math.floor((innerWidth - rowGap) / 2);
		const smallWidth = Math.max(40, Math.min(48, Math.floor(innerWidth * 0.2)));
		const typeWidth = innerWidth - smallWidth * 2 - rowGap * 2;
		const straightLayout = {
			numberDown: { row: 0, x: 0, width: smallWidth },
			cycleType: { row: 0, x: smallWidth + rowGap, width: typeWidth },
			numberUp: { row: 0, x: smallWidth + rowGap + typeWidth + rowGap, width: smallWidth },
			betDown: { row: 1, x: 0, width: halfWidth },
			betUp: { row: 1, x: halfWidth + rowGap, width: halfWidth },
			betMax: { row: 2, x: 0, width: fullWidth },
			spin: { row: 3, x: 0, width: fullWidth },
			leave: { row: 4, x: 0, width: fullWidth }
		};
		const outsideLayout = {
			cycleType: { row: 0, x: 0, width: fullWidth },
			betDown: { row: 1, x: 0, width: halfWidth },
			betUp: { row: 1, x: halfWidth + rowGap, width: halfWidth },
			betMax: { row: 2, x: 0, width: fullWidth },
			spin: { row: 3, x: 0, width: fullWidth },
			leave: { row: 4, x: 0, width: fullWidth }
		};
		const layout = this.currentRouletteType().key === "straight" ? straightLayout : outsideLayout;
		const entry = layout[symbol];
		if (!entry) {
			return null;
		}
		return new Rectangle(entry.x, topPad + entry.row * (rowHeight + rowGap), entry.width, rowHeight);
	};

	Scene_FoxyCasinoRoulette.prototype.actionWindowDirectionalTarget = function(index, direction) {
		const straightMaps = {
			up: [0, 1, 2, 0, 1, 3, 5, 6],
			down: [3, 4, 4, 5, 5, 6, 7, 7],
			left: [0, 0, 1, 3, 3, 5, 6, 7],
			right: [1, 2, 2, 4, 4, 5, 6, 7]
		};
		const outsideMaps = {
			up: [0, 0, 0, 1, 3, 4],
			down: [1, 3, 3, 4, 5, 5],
			left: [0, 1, 1, 3, 4, 5],
			right: [0, 2, 2, 3, 4, 5]
		};
		const maps = this.currentRouletteType().key === "straight" ? straightMaps : outsideMaps;
		const values = maps[direction];
		if (!values || index < 0 || index >= values.length) {
			return null;
		}
		return values[index];
	};

	Scene_FoxyCasinoRoulette.prototype.onGameAction = function(symbol) {
		switch (symbol) {
			case "cycleType":
				this._betTypeIndex = (this._betTypeIndex + 1) % ROULETTE_TYPES.length;
				break;
			case "numberDown":
				this._selectedNumber = (this._selectedNumber + 36) % 37;
				break;
			case "numberUp":
				this._selectedNumber = (this._selectedNumber + 1) % 37;
				break;
			case "spin": {
				const wager = this.beginWager();
				if (!wager) {
					return;
				}
				this._wager = wager;
				this._spinning = true;
				this._spinFrame = 0;
				this._finalNumber = randomInt(37);
				this._spinStartWheelRotation = this._wheelRotation;
				this._spinEndWheelRotation = this._spinStartWheelRotation + TAU * (2.5 + randomInt(2));
				this._spinStartBallAngle = this._ballAngle;
				const targetBallAngle = roulettePocketAngle(this._finalNumber) + this._spinEndWheelRotation;
				let endBallAngle = targetBallAngle;
				while (endBallAngle >= this._spinStartBallAngle) {
					endBallAngle -= TAU;
				}
				endBallAngle -= TAU * (5 + randomInt(2));
				this._spinEndBallAngle = endBallAngle;
				this._displayNumber = this.currentPocketNumber();
				this._resultText = "Wheel spinning...";
				this.setActionFocus("spin");
				break;
			}
		}
	};

	Scene_FoxyCasinoRoulette.prototype.update = function() {
		Scene_FoxyCasinoBase.prototype.update.call(this);
		if (this._spinning) {
			this.updateWheelSpin();
		}
	};

	Scene_FoxyCasinoRoulette.prototype.updateWheelSpin = function() {
		this._spinFrame++;
		const progress = clamp(this._spinFrame / Math.max(1, this._spinDuration), 0, 1);
		const eased = easeOutCubic(progress);
		this._wheelRotation = lerp(this._spinStartWheelRotation, this._spinEndWheelRotation, eased);
		this._ballAngle = lerp(this._spinStartBallAngle, this._spinEndBallAngle, eased);
		this._displayNumber = this.currentPocketNumber();
		if (this._boardWindow) {
			this._boardWindow.refresh();
		}
		if (progress >= 1) {
			this.finishRouletteSpin();
		}
	};

	Scene_FoxyCasinoRoulette.prototype.finishRouletteSpin = function() {
		const type = this.currentRouletteType();
		const win = type.wins(this._finalNumber, this._selectedNumber);
		const payout = win ? payoutAmount(this._wager, type.multiplier) : 0;
		const landingText = `${this._finalNumber} ${rouletteColorName(this._finalNumber)}`;
		this._spinning = false;
		this._wheelRotation = normalizeAngle(this._wheelRotation);
		this._ballAngle = roulettePocketAngle(this._finalNumber) + this._wheelRotation;
		this._displayNumber = this._finalNumber;
		this.setActionFocus("spin");
		if (win) {
			const text = `${landingText} pays ${currencyText(payout)}.`;
			this.finishRound(this._wager, payout, text);
		} else {
			this.finishRound(this._wager, 0, `Ball lands on ${landingText}.`);
		}
		this._wager = 0;
	};

	Scene_FoxyCasinoRoulette.prototype.currentRouletteType = function() {
		return ROULETTE_TYPES[this._betTypeIndex];
	};

	Scene_FoxyCasinoRoulette.prototype.targetText = function() {
		const type = this.currentRouletteType();
		if (type.key === "straight") {
			return `${type.label} ${this._selectedNumber}`;
		}
		return type.label;
	};

	Scene_FoxyCasinoRoulette.prototype.selectedRouletteNumber = function() {
		return this._selectedNumber;
	};

	Scene_FoxyCasinoRoulette.prototype.wheelRotation = function() {
		return Number(this._wheelRotation || 0);
	};

	Scene_FoxyCasinoRoulette.prototype.ballAngle = function() {
		if (Number.isFinite(this._ballAngle)) {
			return this._ballAngle;
		}
		return roulettePocketAngle(this._displayNumber || 0) + this.wheelRotation();
	};

	Scene_FoxyCasinoRoulette.prototype.ballDropOffset = function() {
		if (!this._spinning) {
			return 16;
		}
		const progress = clamp(this._spinFrame / Math.max(1, this._spinDuration), 0, 1);
		const dropProgress = clamp((progress - 0.82) / 0.18, 0, 1);
		return 16 * easeOutCubic(dropProgress);
	};

	Scene_FoxyCasinoRoulette.prototype.currentPocketNumber = function() {
		return rouletteNumberFromRelativeAngle(this.ballAngle() - this.wheelRotation());
	};

	Scene_FoxyCasinoRoulette.prototype.isSpinning = function() {
		return this._spinning;
	};

	Scene_FoxyCasinoRoulette.prototype.displayNumber = function() {
		return this._spinning ? this.currentPocketNumber() : this._displayNumber;
	};

	function Scene_FoxyCasinoPoker() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoPoker.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoPoker.prototype.constructor = Scene_FoxyCasinoPoker;

	Scene_FoxyCasinoPoker.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._deck = [];
		this._cards = [];
		this._held = [false, false, false, false, false];
		this._phase = "ready";
		this._wager = 0;
		this._handResult = { name: "No Hand", multiplier: 0 };
	};

	Scene_FoxyCasinoPoker.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyPokerBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoPoker.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoPoker.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoPoker.prototype.gameKey = function() {
		return "poker";
	};

	Scene_FoxyCasinoPoker.prototype.helpText = function() {
		return this._phase === "hold"
			? "Choose which cards to hold, then draw once."
			: (this.gameConfig().wildCards
				? "Deal five cards, use one draw, and wild cards can stand in for any card."
				: "Deal five cards and improve the hand with one draw.");
	};

	Scene_FoxyCasinoPoker.prototype.defaultStatusText = function() {
		if (this._phase === "hold") {
			return "Pick the cards to keep.";
		}
		return this.gameConfig().wildCards
			? `${CARD_WILD_EMOJI} wild cards are active at this table.`
			: "Deal a hand when ready.";
	};

	Scene_FoxyCasinoPoker.prototype.statusBadgeText = function() {
		if (this._cards.length > 0) {
			return `Hand ${this.currentHandName()}`;
		}
		return this.gameConfig().wildCards
			? `${CARD_WILD_EMOJI} Wilds x${POKER_WILD_CARD_COUNT}`
			: `Royal x${formatMultiplier(CONFIG.poker.royalFlushMultiplier)}`;
	};

	Scene_FoxyCasinoPoker.prototype.canAdjustBet = function() {
		return this._phase !== "hold";
	};

	Scene_FoxyCasinoPoker.prototype.canLeaveScene = function() {
		return this._phase !== "hold";
	};

	Scene_FoxyCasinoPoker.prototype.actionCommands = function() {
		if (this._phase === "hold") {
			const commands = [];
			for (let i = 0; i < 5; i++) {
				commands.push({
					name: this._held[i] ? `Held ${i + 1}` : `Hold ${i + 1}`,
					symbol: "toggleHold",
					enabled: true,
					ext: i
				});
			}
			commands.push({ name: "Draw", symbol: "draw", enabled: true });
			commands.push({ name: "Leave", symbol: "leave", enabled: false });
			return commands;
		}
		return this.readyCommandSet("Deal", "deal", this.canStartRound());
	};

	Scene_FoxyCasinoPoker.prototype.actionWindowMaxCols = function(commandCount) {
		if (this._phase === "hold") {
			return Math.min(commandCount, 5);
		}
		return Scene_FoxyCasinoBase.prototype.actionWindowMaxCols.call(this, commandCount);
	};

	Scene_FoxyCasinoPoker.prototype.onGameAction = function(symbol, ext) {
		switch (symbol) {
			case "deal": {
				const wager = this.beginWager();
				if (!wager) {
					return;
				}
				this._wager = wager;
				this._deck = createDeck(this.gameConfig().wildCards);
				this._cards = [];
				for (let i = 0; i < 5; i++) {
					this._cards.push(this._deck.pop());
				}
				this._held = [false, false, false, false, false];
				this._phase = "hold";
				this._handResult = evaluatePokerHand(this._cards, this.gameConfig());
				this._resultText = "Choose what to hold, then draw.";
				this.setActionFocus("toggleHold");
				break;
			}
			case "toggleHold":
				this._held[Number(ext)] = !this._held[Number(ext)];
				break;
			case "draw": {
				for (let i = 0; i < this._cards.length; i++) {
					if (!this._held[i]) {
						this._cards[i] = this._deck.pop();
					}
				}
				this._phase = "result";
				this._handResult = evaluatePokerHand(this._cards, this.gameConfig());
				this.setActionFocus("deal");
				if (this._handResult.multiplier > 0) {
					const payout = payoutAmount(this._wager, this._handResult.multiplier);
					this.finishRound(this._wager, payout, `${this._handResult.name} pays ${currencyText(payout)}.`);
				} else {
					this.finishRound(this._wager, 0, "No winning hand this round.");
				}
				this._wager = 0;
				break;
			}
		}
	};

	Scene_FoxyCasinoPoker.prototype.cards = function() {
		return this._cards;
	};

	Scene_FoxyCasinoPoker.prototype.isHeld = function(index) {
		return !!this._held[index];
	};

	Scene_FoxyCasinoPoker.prototype.currentHandName = function() {
		return evaluatePokerHand(this._cards, this.gameConfig()).name;
	};

	function Scene_FoxyCasinoBlackjack() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoBlackjack.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoBlackjack.prototype.constructor = Scene_FoxyCasinoBlackjack;

	Scene_FoxyCasinoBlackjack.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._deck = [];
		this._dealerCards = [];
		this._playerCards = [];
		this._phase = "ready";
		this._dealerHidden = true;
		this._wager = 0;
	};

	Scene_FoxyCasinoBlackjack.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyBlackjackBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoBlackjack.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoBlackjack.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoBlackjack.prototype.gameKey = function() {
		return "blackjack";
	};

	Scene_FoxyCasinoBlackjack.prototype.helpText = function() {
		return this._phase === "player" ? "Hit, stand, or double down." : "Beat the dealer without busting.";
	};

	Scene_FoxyCasinoBlackjack.prototype.defaultStatusText = function() {
		return this._phase === "player"
			? "Make the call."
			: `Natural pays x${formatMultiplier(CONFIG.blackjack.blackjackMultiplier)}.`;
	};

	Scene_FoxyCasinoBlackjack.prototype.statusBadgeText = function() {
		if (this._wager > 0) {
			return `Wager ${currencyText(this._wager)}`;
		}
		return `Dealer ${CONFIG.blackjack.dealerStandValue}`;
	};

	Scene_FoxyCasinoBlackjack.prototype.canAdjustBet = function() {
		return this._phase === "ready" || this._phase === "result";
	};

	Scene_FoxyCasinoBlackjack.prototype.canLeaveScene = function() {
		return this._phase === "ready" || this._phase === "result";
	};

	Scene_FoxyCasinoBlackjack.prototype.actionCommands = function() {
		if (this._phase === "player") {
			return [
				{ name: "Hit", symbol: "hit", enabled: true },
				{ name: "Stand", symbol: "stand", enabled: true },
				{ name: "Double", symbol: "double", enabled: this.canDoubleDown() },
				{ name: "Leave", symbol: "leave", enabled: false }
			];
		}
		return this.readyCommandSet("Deal", "deal", this.canStartRound());
	};

	Scene_FoxyCasinoBlackjack.prototype.onGameAction = function(symbol) {
		switch (symbol) {
			case "deal":
				this.startBlackjackRound();
				break;
			case "hit":
				this.playerHit();
				break;
			case "stand":
				this.playerStand();
				break;
			case "double":
				this.playerDoubleDown();
				break;
		}
	};

	Scene_FoxyCasinoBlackjack.prototype.startBlackjackRound = function() {
		const wager = this.beginWager();
		if (!wager) {
			return;
		}
		if (this._deck.length < 15) {
			this._deck = createDeck(false);
		}
		this._wager = wager;
		this._dealerCards = [];
		this._playerCards = [];
		this._dealerHidden = true;
		this._phase = "player";
		this._playerCards.push(this._deck.pop());
		this._dealerCards.push(this._deck.pop());
		this._playerCards.push(this._deck.pop());
		this._dealerCards.push(this._deck.pop());
		this._resultText = "Your move.";
		this.setActionFocus("hit");
		const playerNatural = isBlackjack(this._playerCards);
		const dealerNatural = isBlackjack(this._dealerCards);
		if (playerNatural || dealerNatural) {
			this._dealerHidden = false;
			this._phase = "result";
			this.setActionFocus("deal");
			if (playerNatural && dealerNatural) {
				this.finishRound(this._wager, this._wager, `Both sides hit blackjack. Push returns ${currencyText(this._wager)}.`);
			} else if (playerNatural) {
				const payout = payoutAmount(this._wager, this.gameConfig().blackjackMultiplier);
				this.finishRound(this._wager, payout, `Blackjack pays ${currencyText(payout)}.`);
			} else {
				this.finishRound(this._wager, 0, "Dealer blackjack.");
			}
			this._wager = 0;
		}
	};

	Scene_FoxyCasinoBlackjack.prototype.playerHit = function() {
		this._playerCards.push(this._deck.pop());
		if (blackjackTotal(this._playerCards).total > 21) {
			this._dealerHidden = false;
			this._phase = "result";
			this.setActionFocus("deal");
			this.finishRound(this._wager, 0, "Bust.");
			this._wager = 0;
		}
	};

	Scene_FoxyCasinoBlackjack.prototype.playerStand = function() {
		const config = this.gameConfig();
		this._dealerHidden = false;
		while (blackjackTotal(this._dealerCards).total < config.dealerStandValue) {
			this._dealerCards.push(this._deck.pop());
		}
		this._phase = "result";
		this.setActionFocus("deal");
		const playerTotal = blackjackTotal(this._playerCards).total;
		const dealerTotal = blackjackTotal(this._dealerCards).total;
		if (dealerTotal > 21) {
			const payout = payoutAmount(this._wager, config.winMultiplier);
			this.finishRound(this._wager, payout, `Dealer busts. ${currencyText(payout)}.`);
		} else if (playerTotal > dealerTotal) {
			const payout = payoutAmount(this._wager, config.winMultiplier);
			this.finishRound(this._wager, payout, `${playerTotal} beats ${dealerTotal} for ${currencyText(payout)}.`);
		} else if (playerTotal < dealerTotal) {
			this.finishRound(this._wager, 0, `${dealerTotal} beats ${playerTotal}.`);
		} else {
			this.finishRound(this._wager, this._wager, `Push at ${playerTotal}.`);
		}
		this._wager = 0;
	};

	Scene_FoxyCasinoBlackjack.prototype.playerDoubleDown = function() {
		if (!this.canDoubleDown()) {
			this._resultText = "Not enough gold to double down.";
			SoundManager.playBuzzer();
			return;
		}
		$gameParty.loseGold(this._wager);
		this._wager *= 2;
		this._playerCards.push(this._deck.pop());
		if (blackjackTotal(this._playerCards).total > 21) {
			this._dealerHidden = false;
			this._phase = "result";
			this.setActionFocus("deal");
			this.finishRound(this._wager, 0, "Bust after doubling down.");
			this._wager = 0;
		} else {
			this.playerStand();
		}
	};

	Scene_FoxyCasinoBlackjack.prototype.canDoubleDown = function() {
		return this._phase === "player" && this._playerCards.length === 2 && $gameParty.gold() >= this._wager;
	};

	Scene_FoxyCasinoBlackjack.prototype.dealerCards = function() {
		return this._dealerCards;
	};

	Scene_FoxyCasinoBlackjack.prototype.playerCards = function() {
		return this._playerCards;
	};

	Scene_FoxyCasinoBlackjack.prototype.isDealerHidden = function() {
		return this._dealerHidden;
	};

	Scene_FoxyCasinoBlackjack.prototype.dealerTotalText = function() {
		if (this._dealerHidden && this._dealerCards.length > 0) {
			return "?";
		}
		return String(blackjackTotal(this._dealerCards).total || 0);
	};

	Scene_FoxyCasinoBlackjack.prototype.playerTotalText = function() {
		return String(blackjackTotal(this._playerCards).total || 0);
	};

	function Scene_FoxyCasinoBaccarat() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoBaccarat.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoBaccarat.prototype.constructor = Scene_FoxyCasinoBaccarat;

	Scene_FoxyCasinoBaccarat.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._deck = [];
		this._playerCards = [];
		this._bankerCards = [];
		this._betTypeIndex = 0;
		this._phase = "ready";
		this._wager = 0;
		this._winnerKey = "";
	};

	Scene_FoxyCasinoBaccarat.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyBaccaratBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoBaccarat.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoBaccarat.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoBaccarat.prototype.gameKey = function() {
		return "baccarat";
	};

	Scene_FoxyCasinoBaccarat.prototype.helpText = function() {
		return "Bet on Player, Banker, or Tie, then let the shoe run.";
	};

	Scene_FoxyCasinoBaccarat.prototype.defaultStatusText = function() {
		const betType = this.currentBaccaratBetType();
		return `${betType.label} pays ${this.baccaratMultiplierText(betType.key)}. Player and Banker bets push on ties.`;
	};

	Scene_FoxyCasinoBaccarat.prototype.statusBadgeText = function() {
		if (this._winnerKey) {
			return `Winner ${this.baccaratWinnerLabel()}`;
		}
		return `${this.currentBaccaratBetType().emoji} ${this.currentBaccaratBetType().label}`;
	};

	Scene_FoxyCasinoBaccarat.prototype.actionCommands = function() {
		return [
			{ name: "Bet -", symbol: "betDown", enabled: this.currentBet() > this.minimumBet() },
			{ name: "Bet +", symbol: "betUp", enabled: this.currentBet() < this.maximumBet() },
			{ name: "Max", symbol: "betMax", enabled: this.currentBet() < this.maximumBet() && $gameParty.gold() >= this.minimumBet() },
			{ name: `Target ${this.currentBaccaratBetType().label}`, symbol: "betType", enabled: true },
			{ name: "Deal", symbol: "deal", enabled: this.canStartRound() },
			{ name: "Leave", symbol: "leave", enabled: this.canLeaveScene() }
		];
	};

	Scene_FoxyCasinoBaccarat.prototype.actionWindowMaxCols = function() {
		return 3;
	};

	Scene_FoxyCasinoBaccarat.prototype.onGameAction = function(symbol) {
		switch (symbol) {
			case "betType":
				this.cycleBaccaratBetType();
				break;
			case "deal":
				this.startBaccaratRound();
				break;
		}
	};

	Scene_FoxyCasinoBaccarat.prototype.currentBaccaratBetType = function() {
		return BACCARAT_BET_TYPES[this._betTypeIndex];
	};

	Scene_FoxyCasinoBaccarat.prototype.cycleBaccaratBetType = function() {
		this._betTypeIndex = (this._betTypeIndex + 1) % BACCARAT_BET_TYPES.length;
		this._winnerKey = "";
	};

	Scene_FoxyCasinoBaccarat.prototype.baccaratMultiplierText = function(typeKey) {
		switch (typeKey) {
			case "player":
				return `x${formatMultiplier(this.gameConfig().playerMultiplier)}`;
			case "banker":
				return `x${formatMultiplier(this.gameConfig().bankerMultiplier)}`;
			default:
				return `x${formatMultiplier(this.gameConfig().tieMultiplier)}`;
		}
	};

	Scene_FoxyCasinoBaccarat.prototype.baccaratWinnerLabel = function() {
		switch (this._winnerKey) {
			case "player":
				return "Player";
			case "banker":
				return "Banker";
			case "tie":
				return "Tie";
			default:
				return "";
		}
	};

	Scene_FoxyCasinoBaccarat.prototype.startBaccaratRound = function() {
		const wager = this.beginWager();
		if (!wager) {
			return;
		}
		if (this._deck.length < 18) {
			this._deck = createDeck(false);
		}
		this._phase = "result";
		this._wager = wager;
		this._winnerKey = "";
		this._playerCards = [this._deck.pop(), this._deck.pop()];
		this._bankerCards = [this._deck.pop(), this._deck.pop()];
		const playerNatural = isBaccaratNatural(this._playerCards);
		const bankerNatural = isBaccaratNatural(this._bankerCards);
		let playerThirdCard = null;
		if (!playerNatural && !bankerNatural) {
			if (baccaratShouldPlayerDraw(this._playerCards)) {
				playerThirdCard = this._deck.pop();
				this._playerCards.push(playerThirdCard);
			}
			if (baccaratShouldBankerDraw(this._bankerCards, playerThirdCard)) {
				this._bankerCards.push(this._deck.pop());
			}
		}
		const playerTotal = baccaratTotal(this._playerCards);
		const bankerTotal = baccaratTotal(this._bankerCards);
		const betType = this.currentBaccaratBetType();
		const config = this.gameConfig();
		const winnerKey = playerTotal > bankerTotal ? "player" : (playerTotal < bankerTotal ? "banker" : "tie");
		this._winnerKey = winnerKey;
		this.setActionFocus("deal");
		if (winnerKey === "tie") {
			if (betType.key === "tie") {
				const payout = payoutAmount(wager, config.tieMultiplier);
				this.finishRound(wager, payout, `Tie ${playerTotal}-${bankerTotal}. ${currencyText(payout)}.`);
			} else {
				this.finishRound(wager, wager, `Tie ${playerTotal}-${bankerTotal}. Bet pushes.`);
			}
		} else if (betType.key === winnerKey) {
			const multiplier = winnerKey === "player" ? config.playerMultiplier : config.bankerMultiplier;
			const payout = payoutAmount(wager, multiplier);
			const winnerLabel = winnerKey === "player" ? "Player" : "Banker";
			const loserTotal = winnerKey === "player" ? bankerTotal : playerTotal;
			const winnerTotal = winnerKey === "player" ? playerTotal : bankerTotal;
			this.finishRound(wager, payout, `${winnerLabel} wins ${winnerTotal}-${loserTotal} for ${currencyText(payout)}.`);
		} else {
			const winnerLabel = winnerKey === "player" ? "Player" : "Banker";
			const winnerTotal = winnerKey === "player" ? playerTotal : bankerTotal;
			const loserTotal = winnerKey === "player" ? bankerTotal : playerTotal;
			this.finishRound(wager, 0, `${winnerLabel} wins ${winnerTotal}-${loserTotal}.`);
		}
		this._wager = 0;
	};

	Scene_FoxyCasinoBaccarat.prototype.playerCards = function() {
		return this._playerCards;
	};

	Scene_FoxyCasinoBaccarat.prototype.bankerCards = function() {
		return this._bankerCards;
	};

	Scene_FoxyCasinoBaccarat.prototype.playerTotalText = function() {
		return this._playerCards.length > 0 ? String(baccaratTotal(this._playerCards)) : "-";
	};

	Scene_FoxyCasinoBaccarat.prototype.bankerTotalText = function() {
		return this._bankerCards.length > 0 ? String(baccaratTotal(this._bankerCards)) : "-";
	};

	Scene_FoxyCasinoBaccarat.prototype.baccaratWinnerKey = function() {
		return this._winnerKey;
	};

	function Scene_FoxyCasinoWar() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoWar.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoWar.prototype.constructor = Scene_FoxyCasinoWar;

	Scene_FoxyCasinoWar.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._deck = [];
		this._playerCard = null;
		this._dealerCard = null;
		this._winnerKey = "";
	};

	Scene_FoxyCasinoWar.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyWarBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoWar.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoWar.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoWar.prototype.gameKey = function() {
		return "war";
	};

	Scene_FoxyCasinoWar.prototype.helpText = function() {
		return "Draw one card each. Higher card wins and ties push.";
	};

	Scene_FoxyCasinoWar.prototype.defaultStatusText = function() {
		return "Ace is high. Suits do not break ties.";
	};

	Scene_FoxyCasinoWar.prototype.statusBadgeText = function() {
		switch (this._winnerKey) {
			case "player":
				return "Player Wins";
			case "dealer":
				return "Dealer Wins";
			case "push":
				return "Push";
			default:
				return `Win x${formatMultiplier(this.gameConfig().winMultiplier)}`;
		}
	};

	Scene_FoxyCasinoWar.prototype.actionCommands = function() {
		return this.readyCommandSet("Deal", "deal", this.canStartRound());
	};

	Scene_FoxyCasinoWar.prototype.onGameAction = function(symbol) {
		if (symbol === "deal") {
			this.startWarRound();
		}
	};

	Scene_FoxyCasinoWar.prototype.startWarRound = function() {
		const wager = this.beginWager();
		if (!wager) {
			return;
		}
		if (this._deck.length < 10) {
			this._deck = createDeck(false);
		}
		this._winnerKey = "";
		this._playerCard = this._deck.pop();
		this._dealerCard = this._deck.pop();
		this.setActionFocus("deal");
		const playerRank = aceHighCardRank(this._playerCard);
		const dealerRank = aceHighCardRank(this._dealerCard);
		if (playerRank > dealerRank) {
			this._winnerKey = "player";
			const payout = payoutAmount(wager, this.gameConfig().winMultiplier);
			this.finishRound(wager, payout, `${cardText(this._playerCard)} beats ${cardText(this._dealerCard)} for ${currencyText(payout)}.`);
		} else if (playerRank < dealerRank) {
			this._winnerKey = "dealer";
			this.finishRound(wager, 0, `${cardText(this._dealerCard)} beats ${cardText(this._playerCard)}.`);
		} else {
			this._winnerKey = "push";
			this.finishRound(wager, wager, `Tie on ${rankLabel(this._playerCard.rank)}. Bet pushes.`);
		}
	};

	Scene_FoxyCasinoWar.prototype.playerCard = function() {
		return this._playerCard;
	};

	Scene_FoxyCasinoWar.prototype.dealerCard = function() {
		return this._dealerCard;
	};

	function Scene_FoxyCasinoHiLo() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoHiLo.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoHiLo.prototype.constructor = Scene_FoxyCasinoHiLo;

	Scene_FoxyCasinoHiLo.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._deck = [];
		this._baseCard = null;
		this._nextCard = null;
		this._phase = "ready";
		this._wager = 0;
		this._lastGuessKey = "";
	};

	Scene_FoxyCasinoHiLo.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyHiLoBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoHiLo.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoHiLo.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoHiLo.prototype.gameKey = function() {
		return "hilo";
	};

	Scene_FoxyCasinoHiLo.prototype.helpText = function() {
		return this.isGuessPhase()
			? "Pick Higher, Lower, or Exact for the hidden card."
			: "Deal a base card, then call the hidden card.";
	};

	Scene_FoxyCasinoHiLo.prototype.defaultStatusText = function() {
		if (this.isGuessPhase()) {
			return `${cardText(this._baseCard)} is showing. Make the call.`;
		}
		return `Higher / Lower pays x${formatMultiplier(this.gameConfig().higherLowerMultiplier)}. Exact pays x${formatMultiplier(this.gameConfig().exactMultiplier)}.`;
	};

	Scene_FoxyCasinoHiLo.prototype.statusBadgeText = function() {
		if (this.isGuessPhase() && this._baseCard) {
			return `Base ${cardText(this._baseCard)}`;
		}
		if (this._lastGuessKey) {
			return `Call ${this.currentGuessLabel()}`;
		}
		return `Exact x${formatMultiplier(this.gameConfig().exactMultiplier)}`;
	};

	Scene_FoxyCasinoHiLo.prototype.canAdjustBet = function() {
		return !this.isGuessPhase();
	};

	Scene_FoxyCasinoHiLo.prototype.canLeaveScene = function() {
		return !this.isGuessPhase();
	};

	Scene_FoxyCasinoHiLo.prototype.actionCommands = function() {
		if (this.isGuessPhase()) {
			return [
				{ name: "Higher", symbol: "higher", enabled: this.canGuessHigher() },
				{ name: "Lower", symbol: "lower", enabled: this.canGuessLower() },
				{ name: "Exact", symbol: "exact", enabled: true },
				{ name: "Leave", symbol: "leave", enabled: false }
			];
		}
		return this.readyCommandSet("Deal", "deal", this.canStartRound());
	};

	Scene_FoxyCasinoHiLo.prototype.actionWindowMaxCols = function(commandCount) {
		if (this.isGuessPhase()) {
			return Math.min(4, commandCount);
		}
		return Scene_FoxyCasinoBase.prototype.actionWindowMaxCols.call(this, commandCount);
	};

	Scene_FoxyCasinoHiLo.prototype.onGameAction = function(symbol) {
		switch (symbol) {
			case "deal":
				this.startHiLoRound();
				break;
			case "higher":
			case "lower":
			case "exact":
				this.resolveHiLoGuess(symbol);
				break;
		}
	};

	Scene_FoxyCasinoHiLo.prototype.startHiLoRound = function() {
		const wager = this.beginWager();
		if (!wager) {
			return;
		}
		if (this._deck.length < 12) {
			this._deck = createDeck(false);
		}
		this._wager = wager;
		this._baseCard = this._deck.pop();
		this._nextCard = null;
		this._phase = "guess";
		this._lastGuessKey = "";
		this._resultText = `${cardText(this._baseCard)} is showing.`;
		this.setActionFocus(this.canGuessHigher() ? "higher" : (this.canGuessLower() ? "lower" : "exact"));
	};

	Scene_FoxyCasinoHiLo.prototype.resolveHiLoGuess = function(guessKey) {
		this._lastGuessKey = guessKey;
		this._nextCard = this._deck.pop();
		this._phase = "result";
		this.setActionFocus("deal");
		const baseRank = aceHighCardRank(this._baseCard);
		const nextRank = aceHighCardRank(this._nextCard);
		const config = this.gameConfig();
		if (guessKey === "exact") {
			if (baseRank === nextRank) {
				const payout = payoutAmount(this._wager, config.exactMultiplier);
				this.finishRound(this._wager, payout, `Exact call. ${cardText(this._nextCard)} pays ${currencyText(payout)}.`);
			} else {
				this.finishRound(this._wager, 0, `${cardText(this._nextCard)} misses the exact call.`);
			}
		} else if (baseRank === nextRank) {
			this.finishRound(this._wager, this._wager, `${cardText(this._nextCard)} matches ${cardText(this._baseCard)}. Bet pushes.`);
		} else if ((guessKey === "higher" && nextRank > baseRank) || (guessKey === "lower" && nextRank < baseRank)) {
			const payout = payoutAmount(this._wager, config.higherLowerMultiplier);
			this.finishRound(this._wager, payout, `${cardText(this._nextCard)} is ${guessKey}. ${currencyText(payout)}.`);
		} else {
			this.finishRound(this._wager, 0, `${cardText(this._nextCard)} is not ${guessKey}.`);
		}
		this._wager = 0;
	};

	Scene_FoxyCasinoHiLo.prototype.baseCard = function() {
		return this._baseCard;
	};

	Scene_FoxyCasinoHiLo.prototype.nextCard = function() {
		return this._nextCard;
	};

	Scene_FoxyCasinoHiLo.prototype.isGuessPhase = function() {
		return this._phase === "guess";
	};

	Scene_FoxyCasinoHiLo.prototype.canGuessHigher = function() {
		return aceHighCardRank(this._baseCard) < 14;
	};

	Scene_FoxyCasinoHiLo.prototype.canGuessLower = function() {
		return aceHighCardRank(this._baseCard) > 2;
	};

	Scene_FoxyCasinoHiLo.prototype.lastGuessKey = function() {
		return this._lastGuessKey;
	};

	Scene_FoxyCasinoHiLo.prototype.currentGuessLabel = function() {
		const guessData = HILO_CALL_TYPES.find(callType => callType.key === this._lastGuessKey);
		return guessData ? guessData.label : "";
	};

	function Scene_FoxyCasinoThreeCardPoker() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoThreeCardPoker.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoThreeCardPoker.prototype.constructor = Scene_FoxyCasinoThreeCardPoker;

	Scene_FoxyCasinoThreeCardPoker.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._deck = [];
		this._playerCards = [];
		this._dealerCards = [];
		this._playerHandResult = { name: "No Hand", rank: -1, compare: [0], multiplier: 0 };
		this._dealerHandResult = { name: "No Hand", rank: -1, compare: [0], multiplier: 0 };
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyThreeCardPokerBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.gameKey = function() {
		return "threecardpoker";
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.helpText = function() {
		return "Deal three cards each and beat the dealer. Straights outrank flushes at this table.";
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.defaultStatusText = function() {
		return "Straight beats Flush in 3 Card Poker.";
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.statusBadgeText = function() {
		if (this._playerCards.length > 0) {
			return `Player ${this.playerHandName()}`;
		}
		return `Straight Flush x${formatMultiplier(this.gameConfig().straightFlushMultiplier)}`;
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.actionCommands = function() {
		return this.readyCommandSet("Deal", "deal", this.canStartRound());
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.onGameAction = function(symbol) {
		if (symbol === "deal") {
			this.startThreeCardPokerRound();
		}
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.startThreeCardPokerRound = function() {
		const wager = this.beginWager();
		if (!wager) {
			return;
		}
		if (this._deck.length < 14) {
			this._deck = createDeck(false);
		}
		this._playerCards = [this._deck.pop(), this._deck.pop(), this._deck.pop()];
		this._dealerCards = [this._deck.pop(), this._deck.pop(), this._deck.pop()];
		this._playerHandResult = evaluateThreeCardPokerHand(this._playerCards, this.gameConfig());
		this._dealerHandResult = evaluateThreeCardPokerHand(this._dealerCards, this.gameConfig());
		const comparison = compareThreeCardPokerHands(this._playerHandResult, this._dealerHandResult);
		this.setActionFocus("deal");
		if (comparison > 0) {
			const payout = payoutAmount(wager, this._playerHandResult.multiplier);
			this.finishRound(wager, payout, `${this.playerHandName()} beats dealer ${this.dealerHandName()} for ${currencyText(payout)}.`);
		} else if (comparison < 0) {
			this.finishRound(wager, 0, `Dealer ${this.dealerHandName()} beats ${this.playerHandName()}.`);
		} else {
			this.finishRound(wager, wager, `Push on ${this.playerHandName()}.`);
		}
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.playerCards = function() {
		return this._playerCards;
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.dealerCards = function() {
		return this._dealerCards;
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.playerHandName = function() {
		return this._playerHandResult.name;
	};

	Scene_FoxyCasinoThreeCardPoker.prototype.dealerHandName = function() {
		return this._dealerHandResult.name;
	};

	function Scene_FoxyCasinoCraps() {
		this.initialize(...arguments);
	}

	Scene_FoxyCasinoCraps.prototype = Object.create(Scene_FoxyCasinoBase.prototype);
	Scene_FoxyCasinoCraps.prototype.constructor = Scene_FoxyCasinoCraps;

	Scene_FoxyCasinoCraps.prototype.initialize = function() {
		Scene_FoxyCasinoBase.prototype.initialize.call(this);
		this._betTypeIndex = 0;
		this._wager = 0;
		this._point = 0;
		this._dice = [1, 1];
		this._finalDice = [1, 1];
		this._lastTotal = 2;
		this._rolling = false;
		this._rollFrame = 0;
		this._rollDuration = 0;
	};

	Scene_FoxyCasinoCraps.prototype.createBoardWindow = function() {
		this._boardWindow = new Window_FoxyCrapsBoard(this.boardWindowRect(), this);
		this.addWindow(this._boardWindow);
	};

	Scene_FoxyCasinoCraps.prototype.createHelpWindow = function() {
	};

	Scene_FoxyCasinoCraps.prototype.helpAreaHeight = function() {
		return 0;
	};

	Scene_FoxyCasinoCraps.prototype.gameKey = function() {
		return "craps";
	};

	Scene_FoxyCasinoCraps.prototype.helpText = function() {
		if (this._rolling) {
			return "The dice are rolling. Wait for the table to settle.";
		}
		if (this._point > 0) {
			return this.currentCrapsBetType().key === "pass"
				? `Point is ${this._point}. Roll ${this._point} before 7.`
				: `Point is ${this._point}. Roll 7 before ${this._point}.`;
		}
		return "Choose Pass Line or Don't Pass, then roll the dice.";
	};

	Scene_FoxyCasinoCraps.prototype.defaultStatusText = function() {
		if (this._rolling) {
			return "Dice in motion.";
		}
		if (this._point > 0) {
			return `The point is ${this._point}. Keep rolling.`;
		}
		return "Pass Line wins on 7 or 11. Don't Pass wins on 2 or 3.";
	};

	Scene_FoxyCasinoCraps.prototype.statusBadgeText = function() {
		if (this._rolling) {
			return "Rolling";
		}
		if (this._point > 0) {
			return `Point ${this._point}`;
		}
		return `${this.currentCrapsBetType().emoji} ${this.currentCrapsBetType().label}`;
	};

	Scene_FoxyCasinoCraps.prototype.canAdjustBet = function() {
		return !this._rolling && this._point <= 0;
	};

	Scene_FoxyCasinoCraps.prototype.canLeaveScene = function() {
		return !this._rolling && this._point <= 0;
	};

	Scene_FoxyCasinoCraps.prototype.actionCommands = function() {
		if (this._rolling) {
			return [
				{ name: "Rolling...", symbol: "rolling", enabled: false },
				{ name: "Leave", symbol: "leave", enabled: false }
			];
		}
		if (this._point > 0) {
			return [
				{ name: "Roll", symbol: "roll", enabled: true },
				{ name: "Leave", symbol: "leave", enabled: false }
			];
		}
		return [
			{ name: "Bet -", symbol: "betDown", enabled: this.currentBet() > this.minimumBet() },
			{ name: "Bet +", symbol: "betUp", enabled: this.currentBet() < this.maximumBet() },
			{ name: "Max", symbol: "betMax", enabled: this.currentBet() < this.maximumBet() && $gameParty.gold() >= this.minimumBet() },
			{ name: `Bet ${this.currentCrapsBetType().label}`, symbol: "betType", enabled: true },
			{ name: "Roll", symbol: "roll", enabled: this.canStartRound() },
			{ name: "Leave", symbol: "leave", enabled: this.canLeaveScene() }
		];
	};

	Scene_FoxyCasinoCraps.prototype.actionWindowMaxCols = function() {
		return this._rolling || this._point > 0 ? 2 : 3;
	};

	Scene_FoxyCasinoCraps.prototype.onGameAction = function(symbol) {
		switch (symbol) {
			case "betType":
				this.cycleCrapsBetType();
				break;
			case "roll":
				this.rollCraps();
				break;
		}
	};

	Scene_FoxyCasinoCraps.prototype.currentCrapsBetType = function() {
		return CRAPS_BET_TYPES[this._betTypeIndex];
	};

	Scene_FoxyCasinoCraps.prototype.update = function() {
		Scene_FoxyCasinoBase.prototype.update.call(this);
		if (this._rolling) {
			this.updateDiceRoll();
		}
	};

	Scene_FoxyCasinoCraps.prototype.cycleCrapsBetType = function() {
		this._betTypeIndex = (this._betTypeIndex + 1) % CRAPS_BET_TYPES.length;
	};

	Scene_FoxyCasinoCraps.prototype.rollDicePair = function() {
		this._dice = [randomInt(6) + 1, randomInt(6) + 1];
		this._lastTotal = this._dice[0] + this._dice[1];
	};

	Scene_FoxyCasinoCraps.prototype.rollCraps = function() {
		if (this._rolling) {
			return;
		}
		if (this._point <= 0) {
			const wager = this.beginWager();
			if (!wager) {
				return;
			}
			this._wager = wager;
		}
		this.startDiceRoll();
	};

	Scene_FoxyCasinoCraps.prototype.startDiceRoll = function() {
		this._rolling = true;
		this._rollFrame = 0;
		this._rollDuration = 30 + randomInt(12);
		this._finalDice = [randomInt(6) + 1, randomInt(6) + 1];
		this._dice = [randomInt(6) + 1, randomInt(6) + 1];
		this._resultText = this._point > 0 ? `Rolling for ${this.currentTargetText()}...` : "Dice rolling...";
		this.setActionFocus("roll");
	};

	Scene_FoxyCasinoCraps.prototype.updateDiceRoll = function() {
		this._rollFrame++;
		const slowStart = this._rollFrame < this._rollDuration * 0.55 ? 1 : (this._rollFrame < this._rollDuration * 0.82 ? 2 : 3);
		if (this._rollFrame % slowStart === 0) {
			this._dice = [randomInt(6) + 1, randomInt(6) + 1];
		}
		if (this._boardWindow) {
			this._boardWindow.refresh();
		}
		if (this._rollFrame >= this._rollDuration) {
			this.finishDiceRoll();
		}
	};

	Scene_FoxyCasinoCraps.prototype.finishDiceRoll = function() {
		this._rolling = false;
		this._dice = this._finalDice.slice();
		this._lastTotal = this._dice[0] + this._dice[1];
		if (this._point > 0) {
			this.resolvePointRoll();
		} else {
			this.resolveComeOutRoll();
		}
		this.refreshAll();
	};

	Scene_FoxyCasinoCraps.prototype.resolveComeOutRoll = function() {
		const total = this._lastTotal;
		const betType = this.currentCrapsBetType();
		const config = this.gameConfig();
		this.setActionFocus("roll");
		if (total === 7 || total === 11) {
			if (betType.key === "pass") {
				const payout = payoutAmount(this._wager, config.passLineMultiplier);
				this.finishRound(this._wager, payout, `${total} wins the come-out roll for ${currencyText(payout)}.`);
			} else {
				this.finishRound(this._wager, 0, `${total} loses on Don't Pass.`);
			}
			this._wager = 0;
			return;
		}
		if (total === 2 || total === 3) {
			if (betType.key === "dontPass") {
				const payout = payoutAmount(this._wager, config.dontPassMultiplier);
				this.finishRound(this._wager, payout, `${total} wins on Don't Pass for ${currencyText(payout)}.`);
			} else {
				this.finishRound(this._wager, 0, `${total} craps out the Pass Line.`);
			}
			this._wager = 0;
			return;
		}
		if (total === 12) {
			if (betType.key === "dontPass") {
				this.finishRound(this._wager, this._wager, "12 bars Don't Pass. Bet pushes.");
			} else {
				this.finishRound(this._wager, 0, "12 craps out the Pass Line.");
			}
			this._wager = 0;
			return;
		}
		this._point = total;
		this._resultText = `Point is ${total}.`;
	};

	Scene_FoxyCasinoCraps.prototype.resolvePointRoll = function() {
		const point = this._point;
		const total = this._lastTotal;
		const betType = this.currentCrapsBetType();
		const config = this.gameConfig();
		this.setActionFocus("roll");
		if (total === point) {
			this._point = 0;
			if (betType.key === "pass") {
				const payout = payoutAmount(this._wager, config.passLineMultiplier);
				this.finishRound(this._wager, payout, `${point} hits before 7 for ${currencyText(payout)}.`);
			} else {
				this.finishRound(this._wager, 0, `${point} hits. Don't Pass loses.`);
			}
			this._wager = 0;
		} else if (total === 7) {
			this._point = 0;
			if (betType.key === "dontPass") {
				const payout = payoutAmount(this._wager, config.dontPassMultiplier);
				this.finishRound(this._wager, payout, `Seven-out pays ${currencyText(payout)}.`);
			} else {
				this.finishRound(this._wager, 0, `Seven-out loses the Pass Line.`);
			}
			this._wager = 0;
		} else {
			this._resultText = `Rolled ${total}. Point stays ${point}.`;
		}
	};

	Scene_FoxyCasinoCraps.prototype.diceValues = function() {
		return this._dice;
	};

	Scene_FoxyCasinoCraps.prototype.isDiceRolling = function() {
		return this._rolling;
	};

	Scene_FoxyCasinoCraps.prototype.diceOffsetX = function(index) {
		if (!this._rolling) {
			return 0;
		}
		const progress = clamp(this._rollFrame / Math.max(1, this._rollDuration), 0, 1);
		const amplitude = Math.max(2, Math.round(12 * (1 - progress)));
		return Math.round(Math.sin(this._rollFrame * 0.75 + index * 1.7) * amplitude);
	};

	Scene_FoxyCasinoCraps.prototype.diceOffsetY = function(index) {
		if (!this._rolling) {
			return 0;
		}
		const progress = clamp(this._rollFrame / Math.max(1, this._rollDuration), 0, 1);
		const bounce = Math.abs(Math.sin(this._rollFrame * 0.62 + index * 1.2));
		return -Math.round(bounce * Math.max(3, 14 * (1 - progress * 0.8)));
	};

	Scene_FoxyCasinoCraps.prototype.lastTotal = function() {
		return this._lastTotal;
	};

	Scene_FoxyCasinoCraps.prototype.pointValue = function() {
		return this._point;
	};

	Scene_FoxyCasinoCraps.prototype.activeWager = function() {
		return this._wager;
	};

	Scene_FoxyCasinoCraps.prototype.currentTargetText = function() {
		if (this._point > 0) {
			return this.currentCrapsBetType().key === "pass"
				? `${this._point} before 7`
				: `7 before ${this._point}`;
		}
		return "Come-Out Roll";
	};

	function registerCasinoSceneCommand(commandName, sceneClass) {
		PluginManager.registerCommand(pluginName, commandName, args => {
			SceneManager.push(sceneClass);
			SceneManager.prepareNextScene(Number(args.startingBet || 0));
		});
	}

	registerCasinoSceneCommand("startSlots", Scene_FoxyCasinoSlots);
	registerCasinoSceneCommand("startRoulette", Scene_FoxyCasinoRoulette);
	registerCasinoSceneCommand("startPoker", Scene_FoxyCasinoPoker);
	registerCasinoSceneCommand("startBlackjack", Scene_FoxyCasinoBlackjack);
	registerCasinoSceneCommand("startBaccarat", Scene_FoxyCasinoBaccarat);
	registerCasinoSceneCommand("startWar", Scene_FoxyCasinoWar);
	registerCasinoSceneCommand("startHiLo", Scene_FoxyCasinoHiLo);
	registerCasinoSceneCommand("startThreeCardPoker", Scene_FoxyCasinoThreeCardPoker);
	registerCasinoSceneCommand("startCraps", Scene_FoxyCasinoCraps);
})();
