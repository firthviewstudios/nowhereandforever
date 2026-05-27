//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.22] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
 * 
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Add Action-Related Script Calls ===
 * 
 * ---
 * 
 * $otbAddBattlerToCurrentTurnEnd(battler, times)
 * 
 * - Adds a battler to current turn's end
 * - Replace 'battler' with a battler object or target
 * - Replace 'times' with a number representing the number of actions to add
 * 
 * ---
 * 
 * $otbAddBattlerToNextTurnEnd(battler, times)
 * 
 * - Adds a battler to next turn's end
 * - Replace 'battler' with a battler object or target
 * - Replace 'times' with a number representing the number of actions to add
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to slow down target's
 *     next Turn Order?
 *
 * ---
 * 
 * States (AGI >= 105%)
 * 
 *   Add State => Current:
 *   - Auto-convert AGI Up States effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   Add State => Next:
 *   - Auto-convert AGI Up States effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 * ---
 * 
 * States (AGI <= 95%)
 * 
 *   Add State => Current:
 *   - Auto-convert AGI Down States effects for Items/Skills to slow down
 *     target's current Turn Order?
 * 
 *   Add State => Next:
 *   - Auto-convert AGI Down States effects for Items/Skills to slow down
 *     target's current Turn Order?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 * 
 * ---
 * 
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 * ---
 * 
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.22: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where any appear mid-battle enemy appearances that occur on a
 *    Turn 0 event will not have their indicator sprite disappearing properly.
 *    Fix made by Olivia.
 * ** Fixed a bug where reviving or making any enemy appear during end turn
 *    will no longer add them to the current turn order, causing visual bugs.
 *    Fix made by Olivia.
 * 
 * Verison 1.21: March 16, 2026
 * * Compatibility Update!
 * ** Updated better compatibility for Battle Grid System force action update.
 *    Update made by Olivia.
 * 
 * Version 1.20: January 19, 2026
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > Conversion Settings > States (AGI >= 105%)
 * *** Parameters > Conversion Settings > States (AGI <= 95%)
 * **** Added auto-conversion functionality for states with AGI modifiers to
 *      automatically manipulate turn orders for current and next.
 * **** Set this to false to not use.
 * 
 * Version 1.19: November 13, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New script calls added by Olivia:
 * *** $otbAddBattlerToCurrentTurnEnd(battler, times)
 * *** $otbAddBattlerToNextTurnEnd(battler, times)
 * **** Adds actions for target battler to the end of current/next turn.
 * 
 * Version 1.18: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where adding states with Action Times+ would add too many
 *    actions. Fix made by Olivia.
 * 
 * Version 1.17: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the <OTB Target Follow Turn: +x> and similar notetags
 *    altered the following turn regardless of the presence of the target in 
 *    current turn order. Fix made by Olivia.
 * 
 * Version 1.16: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Auto Skill Triggers. Update by Arisu.
 * 
 * Version 1.15: May 16, 2024
 * * Feature Update!
 * ** Direct removal of stun states will restore actions for battlers for
 *    current turns and follow up turns. Update made by Olivia.
 * 
 * Version 1.14: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused turn order glitches with Action Times+ that
 *    aren't at 100% value. Fix made by Olivia.
 * ** Fixed a bug that caused added Action Times+ to not trigger on actors that
 *    have already exhausted their current turns if raised due to a state.
 *    Fix made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the Forced Action of a battler is not used properly.
 *    Fix made by Arisu.
 * 
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to slow down target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to slow down target's next Turn Order?
 * @default true
 * 
 * @param StatesUp
 * @text States (AGI >= 105%)
 *
 * @param ConvertAgiStateUpCurrent:eval
 * @text Add State => Current
 * @parent StatesUp
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Up States effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiStateUpNext:eval
 * @text Add State => Next
 * @parent StatesUp
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Up States effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 * 
 * @param StatesDown
 * @text States (AGI <= 95%)
 *
 * @param ConvertAgiStateDownCurrent:eval
 * @text Add State => Current
 * @parent StatesDown
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Down States effects for Items/Skills to slow down target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiStateDownNext:eval
 * @text Add State => Next
 * @parent StatesDown
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Down States effects for Items/Skills to slow down target's current Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

function _0x2c56(){const _0x356717=['Scene_Battle_onSkillCancel','processUpdateGraphic','setOTBGraphicIconIndex','_letter','iconHeight','EFFECT_ADD_BUFF','_fadeTarget','startActorCommandSelection','setBattleSystemOTBTurnOrderVisible','svActorHorzCells','children','isHorz','index','OTB_CONVERT_AGI_STATE_DN_NEXT_TURN','opacity','BattleManager_setup','_surprise','_otbTurnOrderFaceIndex','dimColor2','canChangeOtbTurnOrder','Enemy','endAction','bottom','hasSvBattler','addState','DisplayOffsetY','setup','EnemyBattlerType','1004bzzJjb','OTB_STUN_INFINITY_SPEED','EnemyBattlerDrawLetter','Game_Battler_addState','OTB','traits','OtbTurnOrderActorIcon','fillRect','splice','_currentActor','_spriteGroupWidth','svBattlerName','RepositionTopForHelp','_ogWindowLayerY','FUNC','stepForward','inputtingAction','_otbTurnOrderVisible','description','UiSubjectText','isPartyCommandWindowDisabled','isInfinitySpeedOTB','_contentsBackSprite','otbCalcTargetNextOrderChange','otbProcessActionCheck','endBattlerActions','defaultPosition','bitmapWidth','removeStatesAuto','isSceneBattle','round','push','BattleManager_battleSys','selectNextCommand','Game_Battler_performCollapse','_blendColor','boxHeight','Game_Action_applyGlobal','top','forceActionOTB','ceil','_homeY','ARRAYNUM','EnemyBattlerFontFace','findIndex','decideRandomTarget','startTurn','UserCurrOrder','left','_index','createActorCommandWindowOTB','resetFontSettings','otbCreateNewTurnOrderSprites','select','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','VisuMZ_2_BattleGridSystem','sortContainer','460608JJfXCq','createBorderSprite','addBattlerToTurnOrderAtEnd','initBattleSystemOTB','BattleManager_finishActorInput','battler','isUsingSideviewUiLayout','Mechanics','Game_Battler_onBattleStart','UserAddActionNext','TargetFollOrder','filter','removeActor','Window_Help_setItem','_nextTurn','_stateIDs','otbCalcUserCurrentOrderChange','VisuMZ_2_PartySystem','active','remove','Scene_Battle_actorCommandSingleSkill','Settings','performCollapse','_subjectX','updateGraphic','_instance','bitmapHeight','createTurnOrderOTBGraphicType','battleSys','_positionTargetX','preEndActionOTB','_otbTimesActedThisTurn','fontFace','otbCalcUserNextOrderChange','onBattleEnd','updateLetter','VisuMZ_0_CoreEngine','STR','%1SystemBorder','_last_otb_actionPlusSetLength','Window_Selectable_select','shift','OTB_ADDED_ACTION_TIMES','endTurn','_otb_actionBattlersNext','_offset','UserFollOrder','_unit','127770lAlhEv','_subject','UpdateFrames','otbRemoveCurrentSubject','_hidden','SubjectDistance','isActiveTpb','loadSvActor','getChildIndex','Scene_Battle_commandGuard','icon','_cache_makeActionTimesOTB','WidthBase','UiCurrentOffsetX','Scene_Battle_createAllWindows','ActionBattlersNextFilter','_helpWindow','ARRAYSTR','_nextX','makeActions','battlerName','ActionBattlersFilter','Scene_Battle_onSkillOk','applyItemAddedActionOTB','updateVisibility','note','OrderDirection','EVAL','removeActionBattlersOTB','applyItemTargetEffectOTB','_windowLayer','setText','OTB_CONVERT_AGI_STATE_UP_NEXT_TURN','clearOrderPreview','Visible','18759AIbWJk','Game_Action_applyItemUserEffect','setSkill','_scene','isPreviousSceneBattleTransitionable','Scene_Battle_onItemOk','ActorBattlerIcon','InitialSpeedJS','_speed','floor','onActorCancel','_graphicEnemy','OTB_STUN_INFINITY_CLAMP','addChild','_preemptive','getStateTooltipBattler','_actorCommandWindow','Game_Battler_removeState','%1SystemBg','_containerHeight','OTB_CONVERT_AGI_STATE_UP_CURRENT_TURN','isBattleMember','performActionEndOTB','EnemyBattlerFaceName','BorderThickness','_bgImageSprite','processTurnOTB','windowRect','removeUnableTurnOrderSprites','getColor','UiFontSize','Game_Party_removeActor','TurnOrder','BattleManager_processTurn','createTurnOrderSprites','Game_Battler_onBattleEnd','changeFaceGraphicBitmap','pop','21SOtAvf','getBorderThickness','resumeTurnOrderSprites','ScreenBuffer','TargetCurrOrder','allBattleMembers','constructor','randomInt','boxWidth','%1BorderColor','removeState','NUM','TurnOrderOTBGraphicIconIndex','_fadeDuration','turnOrderChangeOTB','_backgroundSprite','_letterSprite','addBattlerToTurnOrderAtStart','_plural','InfinityClamp','removeChild','ConvertSpeedJS','contents','TurnOrderOTBGraphicFaceName','selectNextActorOTB','height','otbShiftNextTurnSpritesToCurrentTurn','singleSkill','ShowMarkerBorder','updatePosition','onBattleEndOTB','OtbTurnOrderClearActorGraphic','value','createTurnOrderOTBGraphicFaceIndex','_actionBattlers','loadEnemy','_homeDuration','_otbTurnOrderWindow','initMembersOTB','EnableActionTimes','_currentX','currentExt','ConvertAgiBuffNext','item','startActorInput','code','_graphicIconIndex','refreshTurnOrder','dimColor1','_tempActor','RepositionLogWindow','otbShiftTurnOrderForSubject','Game_Battler_onTurnEnd','_enemyWindow','calculateTargetIndex','actorCommandSingleSkill','width','createNewTurnOrderSprites','match','canMove','_otb_createdFirstTurnOrders','otbReturnBattlerToTurnOrders','BgImageOffsetX','BattleManager_makeActionOrders','return\x200','commandFight','registerCommand','battleMembers','parameters','containerPosition','bitmap','_containerWidth','forceAction','svactor','createSpriteContainers','_graphicSprite','createOrderPreview','commandCancelOTB','face','Scene_Battle_commandCancel','BgImageFilename','otbPreviewOrderChange','PreviewActor','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','1577608RHYHBT','setTarget','onBattleStart','call','Game_Action_speed','Game_Party_addActor','makeDeepCopy','isEnemy','startFade','actionPlusSet','2086689nDuBpn','enemy','_isAlive','PreviewOffsetX','EFFECT_ADD_STATE','isNextOtbSubject','onBattleStartOTB','unshift','map','ConvertAgiStateDownNext','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','onEnemyOk','needsSelection','applyBattleItemWindowOTB','anchor','requestUpdateTurnOrders','makeNextActionOrdersOTB','createLetterSprite','UiNextOffsetX','Scene_Battle_onActorCancel','makeActionTimesOTB','Game_System_initialize','createTurnOrderOTBGraphicIconIndex','deathStateId','BgImageOffsetY','applyItemUserEffect','%1BgColor1','UiNextText','_ogWindowLayerX','Enemies','isActor','_graphicFaceIndex','DisplayPosition','lineHeight','applyGlobalBattleSystemOTB','createActorCommandWindow','Conversion','onEnemyCancel','faceIndex','setHue','_spriteContainer','_fadeSpeed','sort','loadSystem','reduce','checkOpacity','moveToPosition','commandAttack','members','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','faceHeight','visible','auto','_isAppeared','mainSprite','length','min','Actors','effects','TargetAddActionCurrent','_otbTurnOrderGraphicType','PreviewOffsetY','_graphicSv','BattleManager_getNextSubject','otbAddActions','OtbTurnOrderEnemyFace','gradient','ConvertAgiDebuffNext','FaceName','removeCurrentSubject','createOTBTurnOrderWindow','EnemyBattlerFontSize','UiSubjectOffsetY','updateStateTurns','IconIndex','makeActionTimes','PostStunInfinitySpeed','otbGainInstant','faceWidth','BattleSystemOTB','_forcedBattlers','_tempBattler','max','_logWindow','Game_Action_allowRandomSpeed','_positionDuration','OtbTurnOrderClearEnemyGraphic','update','isTurnBased','setAttack','makeSpeed','VisuMZ_1_BattleCore','BattleManager_selectNextActor','Scene_Battle_onActorOk','642cahpGf','updateTurnOrders','Scene_Battle_commandAttack','hide','Game_Battler_forceAction','_inputting','canInput','recoverAll','allowRandomSpeed','_targetHomeY','UserAddActionCurrent','otbPreviewOrderClear','ConvertAgiBuffCurrent','otbAddForceActionBattler','postEndActionOTB','commandCancel','changeIconGraphicBitmap','172390AOFMEB','_homeX','_sourceArray','updateSelectionEffect','TargetNextOrder','drawUiText','speed','otbAddBattlerToTurnOrderAtEnd','MoveDistance','setItem','processSpriteRemoval','otbRemoveUnableTurnOrderSprites','appear','shiftTurnOrderForSubject','UiAlignment','Actor','clearMakeActionTimesCacheOTB','makeActionOrders','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','indexOf','drawDimmedArea','makeOTBSpeed','exit','setBlendColor','isAlive','gradientFillRect','fontSize','otbAddBattlerToTurnOrderAtStart','getInfinityClamp','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_actions','includes','_statusWindow','32KMWGwW','BattleManager_startInput','SpriteLength','currentAction','_graphicType','right','changeEnemyGraphicBitmap','format','previewOrderByAction','OTB_CONVERT_AGI_BUFF_NEXT_TURN','updateGraphicHue','_graphicFaceName','contentsBack','createInitialPositions','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','version','ConvertAgiDebuffCurrent','createBackgroundSprite','mainFontFace','BattleManager_forceAction','RepositionTopHelpX','ActorBattlerType','_requestTurnOrderUpdate','createOrderPreviewSprite','cancel','getBattleSystem','BattleManager_isTpb','PreviewScale','finishActorInput','commandGuard','calculateTargetPositions','_otbTurnOrderIconIndex','createTurnOrderOTBGraphicFaceName','getNextSubject','drawBgImage','IconSet','EFFECT_ADD_DEBUFF','ConvertParams','isOTB','OTB_CONVERT_AGI_STATE_DN_CURRENT_TURN','status','transparent','svActorVertCells','addForceActionBattler','faceName','drawText','Scene_Battle_onItemCancel','Game_BattlerBase_hide','Scene_Battle_commandFight','63PJGrbY','name','Game_Actor_selectNextCommand','subject','ARRAYEVAL','Game_Battler_makeActionTimes','changeSvActorGraphicBitmap','isAppeared','TRAIT_PARAM','isBattleItemWindowOTB','selectNextActor','_phase','getUnitSideSide','containerWindow','ConvertAgiStateUpCurrent','_isBattleOver','createAllWindows','Game_BattlerBase_recoverAll','GetAllIndicies','BattleManager_endAction','UiCurrentText','shiftNextTurnSpritesToCurrentTurn','onItemOk','changeSourceArray','makeActionOrdersOTB','currentSymbol','parseForceActionTargeting','clearTurnOrderOTBGraphics','clamp','removeSprite','clear','create','trim','battleEnd','parse','createGraphicSprite','Scene_Battle_createActorCommandWindow','Game_BattlerBase_appear','loadSvEnemy','blt','dataId','TurnOrderOTBGraphicFaceIndex','battlerHue','_positionTargetY','startInput','addActor','_otbTurnOrderFaceName','addLoadListener','RegExp','RepositionTopHelpY','ARRAYSTRUCT','additionalTargetXAdjustments','isTpb','Game_Battler_makeSpeed','actor','repositionLogWindowOTB','initHomePositions','BattleManager_isActiveTpb','isTurnEnd','adjustForPreview','BattleManager_isTurnBased','SpriteThin','bind','_graphicHue','EnemyBattlerIcon','otbCalcTargetCurrentOrderChange','guard','startInputOTB','_currentTurn','isStateAffected','BattleManager_endTurn','isBattleSystemOTBTurnOrderVisible','processTurn','initialize','otbApplyActionTimes','UiSubjectOffsetX','prototype','TurnOrderOTBGraphicType','SystemTurnOrderVisibility','_previewContainer','onItemCancel','onActorOk','onTurnEndOTB','%1-%2','_forceAction','toUpperCase','applyGlobal'];_0x2c56=function(){return _0x356717;};return _0x2c56();}const _0x134f45=_0x3772;function _0x3772(_0x3b7caf,_0x3e53a8){const _0x2c5677=_0x2c56();return _0x3772=function(_0x37720d,_0x22d1b1){_0x37720d=_0x37720d-0xab;let _0x53cacf=_0x2c5677[_0x37720d];return _0x53cacf;},_0x3772(_0x3b7caf,_0x3e53a8);}(function(_0x89eef2,_0x1f5889){const _0x18cc25=_0x3772,_0x3c0288=_0x89eef2();while(!![]){try{const _0x4c7094=parseInt(_0x18cc25(0x117))/0x1*(parseInt(_0x18cc25(0x1ed))/0x2)+-parseInt(_0x18cc25(0x279))/0x3+parseInt(_0x18cc25(0x149))/0x4*(-parseInt(_0x18cc25(0x128))/0x5)+parseInt(_0x18cc25(0x226))/0x6*(parseInt(_0x18cc25(0x29f))/0x7)+-parseInt(_0x18cc25(0xaf))/0x8+parseInt(_0x18cc25(0x17a))/0x9*(-parseInt(_0x18cc25(0x256))/0xa)+parseInt(_0x18cc25(0xb9))/0xb;if(_0x4c7094===_0x1f5889)break;else _0x3c0288['push'](_0x3c0288['shift']());}catch(_0x2c8fb){_0x3c0288['push'](_0x3c0288['shift']());}}}(_0x2c56,0x2a602));var label=_0x134f45(0x108),tier=tier||0x0,dependencies=[_0x134f45(0x24a),_0x134f45(0x114)],pluginData=$plugins['filter'](function(_0x52e7b3){const _0x2ad974=_0x134f45;return _0x52e7b3[_0x2ad974(0x171)]&&_0x52e7b3[_0x2ad974(0x1ff)][_0x2ad974(0x147)]('['+label+']');})[0x0];VisuMZ[label][_0x134f45(0x23b)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x134f45(0x16e)]=function(_0x404007,_0x1fc886){const _0x38cb02=_0x134f45;for(const _0x116f26 in _0x1fc886){if(_0x116f26['match'](/(.*):(.*)/i)){const _0x512d60=String(RegExp['$1']),_0x3eb02d=String(RegExp['$2'])[_0x38cb02(0x1cf)]()[_0x38cb02(0x19a)]();let _0x1da83e,_0x54b7f7,_0x466f74;switch(_0x3eb02d){case _0x38cb02(0x2aa):_0x1da83e=_0x1fc886[_0x116f26]!==''?Number(_0x1fc886[_0x116f26]):0x0;break;case _0x38cb02(0x217):_0x54b7f7=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):[],_0x1da83e=_0x54b7f7[_0x38cb02(0xc1)](_0x310c9e=>Number(_0x310c9e));break;case _0x38cb02(0x271):_0x1da83e=_0x1fc886[_0x116f26]!==''?eval(_0x1fc886[_0x116f26]):null;break;case _0x38cb02(0x17e):_0x54b7f7=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):[],_0x1da83e=_0x54b7f7[_0x38cb02(0xc1)](_0x55b1ab=>eval(_0x55b1ab));break;case'JSON':_0x1da83e=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):'';break;case'ARRAYJSON':_0x54b7f7=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):[],_0x1da83e=_0x54b7f7[_0x38cb02(0xc1)](_0x315c5a=>JSON['parse'](_0x315c5a));break;case _0x38cb02(0x1fb):_0x1da83e=_0x1fc886[_0x116f26]!==''?new Function(JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26])):new Function(_0x38cb02(0x2df));break;case'ARRAYFUNC':_0x54b7f7=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):[],_0x1da83e=_0x54b7f7['map'](_0x367c5a=>new Function(JSON[_0x38cb02(0x19c)](_0x367c5a)));break;case _0x38cb02(0x24b):_0x1da83e=_0x1fc886[_0x116f26]!==''?String(_0x1fc886[_0x116f26]):'';break;case _0x38cb02(0x267):_0x54b7f7=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):[],_0x1da83e=_0x54b7f7[_0x38cb02(0xc1)](_0x5a8c13=>String(_0x5a8c13));break;case'STRUCT':_0x466f74=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):{},_0x1da83e=VisuMZ[_0x38cb02(0x16e)]({},_0x466f74);break;case _0x38cb02(0x1ac):_0x54b7f7=_0x1fc886[_0x116f26]!==''?JSON[_0x38cb02(0x19c)](_0x1fc886[_0x116f26]):[],_0x1da83e=_0x54b7f7['map'](_0x3d5a7e=>VisuMZ[_0x38cb02(0x16e)]({},JSON[_0x38cb02(0x19c)](_0x3d5a7e)));break;default:continue;}_0x404007[_0x512d60]=_0x1da83e;}}return _0x404007;},(_0x486024=>{const _0x5d8700=_0x134f45,_0x20e3b2=_0x486024[_0x5d8700(0x17b)];for(const _0x3dfb3a of dependencies){if(!Imported[_0x3dfb3a]){alert(_0x5d8700(0x145)[_0x5d8700(0x150)](_0x20e3b2,_0x3dfb3a)),SceneManager[_0x5d8700(0x13e)]();break;}}const _0x586f6d=_0x486024['description'];if(_0x586f6d[_0x5d8700(0x2d9)](/\[Version[ ](.*?)\]/i)){const _0x22a928=Number(RegExp['$1']);_0x22a928!==VisuMZ[label][_0x5d8700(0x158)]&&(alert(_0x5d8700(0xea)[_0x5d8700(0x150)](_0x20e3b2,_0x22a928)),SceneManager[_0x5d8700(0x13e)]());}if(_0x586f6d['match'](/\[Tier[ ](\d+)\]/i)){const _0x3024e7=Number(RegExp['$1']);_0x3024e7<tier?(alert(_0x5d8700(0x13a)[_0x5d8700(0x150)](_0x20e3b2,_0x3024e7,tier)),SceneManager[_0x5d8700(0x13e)]()):tier=Math[_0x5d8700(0x10b)](_0x3024e7,tier);}VisuMZ[_0x5d8700(0x16e)](VisuMZ[label][_0x5d8700(0x23b)],_0x486024[_0x5d8700(0x2e3)]);})(pluginData),PluginManager[_0x134f45(0x2e1)](pluginData['name'],_0x134f45(0x1f3),_0x40355c=>{const _0x5ebb76=_0x134f45;VisuMZ['ConvertParams'](_0x40355c,_0x40355c);const _0x13c54b=_0x40355c[_0x5ebb76(0xf2)],_0x5b44df=_0x40355c['IconIndex'];for(const _0xaf130d of _0x13c54b){const _0x11806b=$gameActors['actor'](_0xaf130d);if(!_0x11806b)continue;_0x11806b[_0x5ebb76(0xf5)]='icon',_0x11806b['_otbTurnOrderIconIndex']=_0x5b44df;}}),PluginManager[_0x134f45(0x2e1)](pluginData[_0x134f45(0x17b)],'OtbTurnOrderActorFace',_0x1d4a51=>{const _0x2d325d=_0x134f45;VisuMZ[_0x2d325d(0x16e)](_0x1d4a51,_0x1d4a51);const _0x51675c=_0x1d4a51[_0x2d325d(0xf2)],_0x22b168=_0x1d4a51['FaceName'],_0x5b1166=_0x1d4a51['FaceIndex'];for(const _0x1b6731 of _0x51675c){const _0x542c6f=$gameActors['actor'](_0x1b6731);if(!_0x542c6f)continue;_0x542c6f[_0x2d325d(0xf5)]=_0x2d325d(0x2ed),_0x542c6f[_0x2d325d(0x1a8)]=_0x22b168,_0x542c6f[_0x2d325d(0x1e2)]=_0x5b1166;}}),PluginManager[_0x134f45(0x2e1)](pluginData[_0x134f45(0x17b)],_0x134f45(0x2be),_0x25939b=>{const _0x36e29f=_0x134f45;VisuMZ[_0x36e29f(0x16e)](_0x25939b,_0x25939b);const _0x26be87=_0x25939b['Actors'];for(const _0x1f6fea of _0x26be87){const _0x30cb34=$gameActors[_0x36e29f(0x1b0)](_0x1f6fea);if(!_0x30cb34)continue;_0x30cb34[_0x36e29f(0x195)]();}}),PluginManager[_0x134f45(0x2e1)](pluginData[_0x134f45(0x17b)],'OtbTurnOrderEnemyIcon',_0x31cfba=>{const _0x391d8b=_0x134f45;VisuMZ[_0x391d8b(0x16e)](_0x31cfba,_0x31cfba);const _0x1f68b9=_0x31cfba[_0x391d8b(0xd6)],_0x49bf24=_0x31cfba[_0x391d8b(0x103)];for(const _0x4b5ef8 of _0x1f68b9){const _0x5427b2=$gameTroop[_0x391d8b(0xe9)]()[_0x4b5ef8];if(!_0x5427b2)continue;_0x5427b2[_0x391d8b(0xf5)]=_0x391d8b(0x260),_0x5427b2[_0x391d8b(0x168)]=_0x49bf24;}}),PluginManager[_0x134f45(0x2e1)](pluginData['name'],_0x134f45(0xfa),_0x3a5ba0=>{const _0x5d188c=_0x134f45;VisuMZ[_0x5d188c(0x16e)](_0x3a5ba0,_0x3a5ba0);const _0x43754b=_0x3a5ba0[_0x5d188c(0xd6)],_0x16fc12=_0x3a5ba0[_0x5d188c(0xfd)],_0xfb6620=_0x3a5ba0['FaceIndex'];for(const _0x30fa89 of _0x43754b){const _0x5e3843=$gameTroop['members']()[_0x30fa89];if(!_0x5e3843)continue;_0x5e3843[_0x5d188c(0xf5)]=_0x5d188c(0x2ed),_0x5e3843[_0x5d188c(0x1a8)]=_0x16fc12,_0x5e3843['_otbTurnOrderFaceIndex']=_0xfb6620;}}),PluginManager[_0x134f45(0x2e1)](pluginData['name'],_0x134f45(0x10f),_0x266573=>{const _0x352239=_0x134f45;VisuMZ[_0x352239(0x16e)](_0x266573,_0x266573);const _0x546227=_0x266573[_0x352239(0xd6)];for(const _0x525621 of _0x546227){const _0xbcf403=$gameTroop[_0x352239(0xe9)]()[_0x525621];if(!_0xbcf403)continue;_0xbcf403[_0x352239(0x195)]();}}),PluginManager[_0x134f45(0x2e1)](pluginData['name'],_0x134f45(0x1c8),_0x4d1922=>{const _0x3d143e=_0x134f45;VisuMZ[_0x3d143e(0x16e)](_0x4d1922,_0x4d1922);const _0x229210=_0x4d1922[_0x3d143e(0x278)];$gameSystem[_0x3d143e(0x1d9)](_0x229210);}),VisuMZ[_0x134f45(0x108)][_0x134f45(0x1aa)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager['getStateIdWithName']=function(_0xb4eef6){const _0x4dabbe=_0x134f45;_0xb4eef6=_0xb4eef6['toUpperCase']()['trim'](),this['_stateIDs']=this['_stateIDs']||{};if(this[_0x4dabbe(0x235)][_0xb4eef6])return this[_0x4dabbe(0x235)][_0xb4eef6];for(const _0x172e23 of $dataStates){if(!_0x172e23)continue;this[_0x4dabbe(0x235)][_0x172e23[_0x4dabbe(0x17b)]['toUpperCase']()['trim']()]=_0x172e23['id'];}return this['_stateIDs'][_0xb4eef6]||0x0;},ImageManager['svActorHorzCells']=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x134f45(0x173)]=ImageManager[_0x134f45(0x173)]||0x6,SceneManager[_0x134f45(0x20a)]=function(){const _0x36b99e=_0x134f45;return this[_0x36b99e(0x27c)]&&this[_0x36b99e(0x27c)][_0x36b99e(0x2a5)]===Scene_Battle;},VisuMZ[_0x134f45(0x108)][_0x134f45(0x1e0)]=BattleManager[_0x134f45(0x1eb)],BattleManager[_0x134f45(0x1eb)]=function(_0x47d0d8,_0x382b8c,_0x38b2c4){const _0x253fe2=_0x134f45;VisuMZ[_0x253fe2(0x108)][_0x253fe2(0x1e0)]['call'](this,_0x47d0d8,_0x382b8c,_0x38b2c4),this[_0x253fe2(0x2c5)]();},BattleManager['initMembersOTB']=function(){const _0x3fff1=_0x134f45;if(!this[_0x3fff1(0x16f)]())return;this[_0x3fff1(0x252)]=[],this['_otb_createdFirstTurnOrders']=![];},VisuMZ['BattleSystemOTB'][_0x134f45(0x20d)]=BattleManager['battleSys'],BattleManager[_0x134f45(0x242)]=function(){const _0x49a867=_0x134f45;if(this['isOTB']())return _0x49a867(0x1f1);return VisuMZ['BattleSystemOTB'][_0x49a867(0x20d)]['call'](this);},BattleManager['isOTB']=function(){const _0x5c966c=_0x134f45;return $gameSystem[_0x5c966c(0x162)]()===_0x5c966c(0x1f1);},VisuMZ['BattleSystemOTB'][_0x134f45(0x163)]=BattleManager[_0x134f45(0x1ae)],BattleManager[_0x134f45(0x1ae)]=function(){const _0x3fab17=_0x134f45;if(this[_0x3fab17(0x16f)]())return![];return VisuMZ[_0x3fab17(0x108)][_0x3fab17(0x163)][_0x3fab17(0xb2)](this);},VisuMZ[_0x134f45(0x108)]['BattleManager_isActiveTpb']=BattleManager[_0x134f45(0x25c)],BattleManager[_0x134f45(0x25c)]=function(){const _0x1177c4=_0x134f45;if(this[_0x1177c4(0x16f)]())return![];return VisuMZ[_0x1177c4(0x108)][_0x1177c4(0x1b3)][_0x1177c4(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x1b6)]=BattleManager[_0x134f45(0x111)],BattleManager[_0x134f45(0x111)]=function(){const _0x2c90c0=_0x134f45;if(this[_0x2c90c0(0x16f)]())return!![];return VisuMZ[_0x2c90c0(0x108)][_0x2c90c0(0x1b6)]['call'](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x14a)]=BattleManager[_0x134f45(0x1a6)],BattleManager[_0x134f45(0x1a6)]=function(){const _0x435775=_0x134f45;VisuMZ['BattleSystemOTB'][_0x435775(0x14a)]['call'](this),this[_0x435775(0x16f)]()&&$gameParty['canInput']()&&!this[_0x435775(0x1e1)]&&this[_0x435775(0x1bd)]();},BattleManager[_0x134f45(0x1bd)]=function(){const _0xb47add=_0x134f45;this[_0xb47add(0x21b)]();},VisuMZ['BattleSystemOTB'][_0x134f45(0x29a)]=BattleManager['processTurn'],BattleManager[_0x134f45(0x1c2)]=function(){const _0x32ffd8=_0x134f45;this['isOTB']()?this[_0x32ffd8(0x293)]():VisuMZ['BattleSystemOTB'][_0x32ffd8(0x29a)][_0x32ffd8(0xb2)](this);},BattleManager[_0x134f45(0x293)]=function(){const _0x3f11fa=_0x134f45,_0x33078c=this[_0x3f11fa(0x257)];if(_0x33078c['isActor']()&&_0x33078c[_0x3f11fa(0x11d)]()){const _0x30b9cf=_0x33078c[_0x3f11fa(0x14c)]();if(!_0x30b9cf)VisuMZ['BattleSystemOTB']['BattleManager_processTurn'][_0x3f11fa(0xb2)](this);else _0x30b9cf['_forceAction']?VisuMZ[_0x3f11fa(0x108)][_0x3f11fa(0x29a)][_0x3f11fa(0xb2)](this):(this[_0x3f11fa(0x1f6)]=_0x33078c,this[_0x3f11fa(0x2cb)]());}else VisuMZ[_0x3f11fa(0x108)][_0x3f11fa(0x29a)][_0x3f11fa(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x22a)]=BattleManager[_0x134f45(0x165)],BattleManager['finishActorInput']=function(){const _0x32682e=_0x134f45;this[_0x32682e(0x16f)]()?VisuMZ[_0x32682e(0x108)][_0x32682e(0x29a)][_0x32682e(0xb2)](this):VisuMZ[_0x32682e(0x108)]['BattleManager_finishActorInput'][_0x32682e(0xb2)](this);},VisuMZ[_0x134f45(0x108)]['BattleManager_selectNextActor']=BattleManager[_0x134f45(0x184)],BattleManager[_0x134f45(0x184)]=function(){const _0x3f8f43=_0x134f45;this[_0x3f8f43(0x16f)]()?this['selectNextActorOTB']():VisuMZ[_0x3f8f43(0x108)][_0x3f8f43(0x115)][_0x3f8f43(0xb2)](this);},BattleManager[_0x134f45(0x2b7)]=function(){const _0xbb98a2=_0x134f45;this[_0xbb98a2(0x1f6)]=null,this[_0xbb98a2(0x11c)]=![];},VisuMZ[_0x134f45(0x108)][_0x134f45(0x18d)]=BattleManager[_0x134f45(0x1e6)],BattleManager[_0x134f45(0x1e6)]=function(){const _0xc8c6c7=_0x134f45;this[_0xc8c6c7(0x244)](),VisuMZ['BattleSystemOTB'][_0xc8c6c7(0x18d)][_0xc8c6c7(0xb2)](this),this['postEndActionOTB']();},BattleManager[_0x134f45(0x244)]=function(){const _0xc4bf2f=_0x134f45;if(!this['isOTB']())return;this[_0xc4bf2f(0x272)]();this['_subject']&&this[_0xc4bf2f(0x257)][_0xc4bf2f(0x28f)]();if(this[_0xc4bf2f(0x257)]&&this['_subject'][_0xc4bf2f(0x2da)]()&&this[_0xc4bf2f(0x2c1)]['includes'](this[_0xc4bf2f(0x257)])){const _0x334805=this['_subject'][_0xc4bf2f(0x146)][_0xc4bf2f(0x231)](_0x4cafd8=>_0x4cafd8['_forceAction']);this[_0xc4bf2f(0x257)][_0xc4bf2f(0x269)]();if(_0x334805){let _0x104b80=_0x334805[_0xc4bf2f(0xf0)];while(_0x104b80--){this[_0xc4bf2f(0x257)][_0xc4bf2f(0x146)][_0xc4bf2f(0x29e)]();}this[_0xc4bf2f(0x257)][_0xc4bf2f(0x146)]=_0x334805['concat'](this['_subject']['_actions']);}}},BattleManager[_0x134f45(0x125)]=function(){const _0x305f65=_0x134f45;if(!this[_0x305f65(0x16f)]())return;this['removeActionBattlersOTB']();this[_0x305f65(0x257)]&&(this[_0x305f65(0x206)](this[_0x305f65(0x257)]),this['_subject']=null);this['_forcedBattlers'][_0x305f65(0xf0)]>0x0&&(this[_0x305f65(0x257)]=this[_0x305f65(0x16a)]());;},BattleManager[_0x134f45(0x250)]=VisuMZ[_0x134f45(0x108)]['Settings'][_0x134f45(0x22d)][_0x134f45(0x2c6)],BattleManager[_0x134f45(0x157)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)][_0x134f45(0x22d)]['RandomizeActionTimesOrder'],BattleManager[_0x134f45(0x285)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)]['Mechanics'][_0x134f45(0x2b2)],VisuMZ['BattleSystemOTB'][_0x134f45(0x2de)]=BattleManager[_0x134f45(0x139)],BattleManager[_0x134f45(0x139)]=function(){const _0x3c1c50=_0x134f45;this[_0x3c1c50(0x16f)]()?this[_0x3c1c50(0x192)]():VisuMZ[_0x3c1c50(0x108)]['BattleManager_makeActionOrders']['call'](this);},BattleManager[_0x134f45(0x192)]=function(){const _0x40b692=_0x134f45;let _0xcfa43a=this[_0x40b692(0x2db)]?0x1:0x2;while(_0xcfa43a--){this[_0x40b692(0xc9)]();}const _0x4511bb=!this[_0x40b692(0x2db)];this[_0x40b692(0x2db)]=!![];},BattleManager['makeNextActionOrdersOTB']=function(){const _0x4d2c31=_0x134f45;this['_actionBattlers']=this[_0x4d2c31(0x252)],this[_0x4d2c31(0x2b9)]();const _0x348706=[];_0x348706['push'](...$gameParty[_0x4d2c31(0x2e2)]()),_0x348706[_0x4d2c31(0x20c)](...$gameTroop['members']());for(const _0x4dd780 of _0x348706){_0x4dd780['makeSpeed']();}_0x348706[_0x4d2c31(0xe3)]((_0x4ace58,_0x36fa96)=>_0x36fa96[_0x4d2c31(0x12e)]()-_0x4ace58[_0x4d2c31(0x12e)]()),this['_otb_actionBattlersNext']=_0x348706,this['otbApplyActionTimes'](),this[_0x4d2c31(0x272)](),this[_0x4d2c31(0x221)]();},BattleManager[_0x134f45(0x1c4)]=function(){const _0x4d0795=_0x134f45;if(!BattleManager[_0x4d0795(0x250)])return;const _0x2b1bcf=this[_0x4d0795(0x252)],_0x464a01=this[_0x4d0795(0x2a4)]();for(const _0x221987 of _0x464a01){if(!_0x221987)continue;if(!_0x221987['isAppeared']())continue;if(!_0x221987[_0x4d0795(0x140)]())continue;if(!_0x2b1bcf[_0x4d0795(0x147)](_0x221987))continue;const _0x252a3c=_0x2b1bcf[_0x4d0795(0x13b)](_0x221987);let _0xdbf766=_0x221987['makeActionTimes']()-0x1;while(_0xdbf766--){let _0x27a1c8=_0x252a3c;BattleManager['OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER']&&(_0x27a1c8=Math[_0x4d0795(0x2a6)](_0x2b1bcf[_0x4d0795(0xf0)]-_0x252a3c)+_0x252a3c),_0x2b1bcf['splice'](_0x27a1c8,0x0,_0x221987);}}},BattleManager['removeActionBattlersOTB']=function(){const _0x1fdd81=_0x134f45;if(!this['isOTB']())return;this['_actionBattlers']=this[_0x1fdd81(0x2c1)]||[],this['_actionBattlers'][_0x1fdd81(0x239)](null),this[_0x1fdd81(0x2c1)]['remove'](undefined),this['_actionBattlers']=this[_0x1fdd81(0x2c1)]['filter'](_0x374bcd=>_0x374bcd[_0x1fdd81(0x28e)]()),this[_0x1fdd81(0x2c1)]=this[_0x1fdd81(0x2c1)][_0x1fdd81(0x231)](_0x229374=>VisuMZ['BattleSystemOTB'][_0x1fdd81(0x26b)](_0x229374)),this[_0x1fdd81(0x1e1)]&&(this['_actionBattlers']=this['_actionBattlers']['filter'](_0x5d0889=>!_0x5d0889[_0x1fdd81(0xd7)]())),this[_0x1fdd81(0x287)]&&(this[_0x1fdd81(0x2c1)]=this[_0x1fdd81(0x2c1)][_0x1fdd81(0x231)](_0x4e4c5f=>!_0x4e4c5f[_0x1fdd81(0xb6)]())),this[_0x1fdd81(0x252)]=this[_0x1fdd81(0x252)]||[],this['_otb_actionBattlersNext'][_0x1fdd81(0x239)](null),this[_0x1fdd81(0x252)][_0x1fdd81(0x239)](undefined),this['_otb_actionBattlersNext']=this[_0x1fdd81(0x252)][_0x1fdd81(0x231)](_0x30df5a=>_0x30df5a[_0x1fdd81(0x28e)]()),this['_otb_actionBattlersNext']=this['_otb_actionBattlersNext'][_0x1fdd81(0x231)](_0x471632=>VisuMZ['BattleSystemOTB'][_0x1fdd81(0x265)](_0x471632)),this[_0x1fdd81(0x133)](),this[_0x1fdd81(0x2ce)]();},VisuMZ[_0x134f45(0x108)][_0x134f45(0x26b)]=function(_0x3a5ac3){const _0x29bd33=_0x134f45;if(!_0x3a5ac3)return![];if(!_0x3a5ac3[_0x29bd33(0x140)]())return![];if(!_0x3a5ac3[_0x29bd33(0x181)]())return![];return _0x3a5ac3['canMove']();},VisuMZ['BattleSystemOTB'][_0x134f45(0x265)]=function(_0x5b703c){const _0x2a4bb5=_0x134f45;if(!_0x5b703c)return![];const _0x1ff57b=JsonEx[_0x2a4bb5(0xb5)](_0x5b703c);return _0x1ff57b[_0x2a4bb5(0x2d0)]=!![],_0x1ff57b['_tempBattler']=!![],_0x1ff57b[_0x2a4bb5(0x102)](),_0x1ff57b[_0x2a4bb5(0x209)](0x1),_0x1ff57b[_0x2a4bb5(0x209)](0x2),_0x1ff57b['refresh'](),VisuMZ[_0x2a4bb5(0x108)]['ActionBattlersFilter'](_0x1ff57b);},BattleManager[_0x134f45(0x2ad)]=function(_0x10a9d0,_0x9f2d49,_0x2d9396){const _0x3116f5=_0x134f45;if(!_0x9f2d49)return;const _0x53fbca=_0x2d9396?this[_0x3116f5(0x252)]:this[_0x3116f5(0x2c1)];if(!_0x53fbca)return;if(!_0x53fbca[_0x3116f5(0x147)](_0x10a9d0))return;const _0x2aec18=VisuMZ[_0x3116f5(0x108)][_0x3116f5(0x18c)](_0x10a9d0,_0x53fbca),_0x282d65=_0x2d9396?VisuMZ[_0x3116f5(0x108)][_0x3116f5(0x144)](_0x53fbca):0x0,_0xb076f5=_0x2aec18[_0x3116f5(0xf0)]-0x1;for(let _0x28f55d=_0xb076f5;_0x28f55d>=0x0;_0x28f55d--){_0x53fbca['splice'](_0x2aec18[_0x28f55d],0x1);}for(var _0xb67c48=0x0;_0xb67c48<_0x2aec18[_0x3116f5(0xf0)];_0xb67c48++){var _0x4412c2=(_0x2aec18[_0xb67c48]-_0x9f2d49)['clamp'](_0x282d65,_0x53fbca[_0x3116f5(0xf0)]);_0x53fbca[_0x3116f5(0x1f5)](_0x4412c2,0x0,_0x10a9d0);}this[_0x3116f5(0x272)](),this[_0x3116f5(0x2ce)]();},VisuMZ[_0x134f45(0x108)][_0x134f45(0x18c)]=function(_0x20977f,_0x5c9ac7){const _0x5bfeeb=_0x134f45,_0x90b5c3=[],_0x2af1e4=_0x5c9ac7[_0x5bfeeb(0xf0)];for(let _0x47e946=0x0;_0x47e946<_0x2af1e4;_0x47e946++){if(_0x5c9ac7[_0x47e946]===_0x20977f)_0x90b5c3['push'](_0x47e946);}return _0x90b5c3;},VisuMZ[_0x134f45(0x108)][_0x134f45(0x144)]=function(_0x40bc0f){const _0x4e6de5=_0x134f45;if(!BattleManager['OTB_STUN_INFINITY_CLAMP'])return 0x0;if(!_0x40bc0f)return 0x0;let _0x542d60=0x0;const _0x8429aa=_0x40bc0f[_0x4e6de5(0xf0)];for(let _0x49dd5f=0x0;_0x49dd5f<_0x8429aa;_0x49dd5f++){const _0x178386=_0x40bc0f[_0x49dd5f];if(!_0x178386)continue;if(_0x178386[_0x4e6de5(0x12e)]()!==Infinity)return _0x49dd5f;else _0x542d60++;}return _0x542d60;},BattleManager[_0x134f45(0x2b9)]=function(){const _0x4b65d3=_0x134f45;if(!this[_0x4b65d3(0x16f)]())return;const _0x3fa40e=SceneManager[_0x4b65d3(0x27c)][_0x4b65d3(0x2c4)];if(!_0x3fa40e)return;_0x3fa40e['shiftNextTurnSpritesToCurrentTurn']();},BattleManager['otbCreateNewTurnOrderSprites']=function(){const _0x33603f=_0x134f45;if(!this['isOTB']())return;const _0x2227bd=SceneManager[_0x33603f(0x27c)][_0x33603f(0x2c4)];if(!_0x2227bd)return;_0x2227bd[_0x33603f(0x2d8)]();},VisuMZ[_0x134f45(0x108)]['BattleManager_getNextSubject']=BattleManager[_0x134f45(0x16a)],BattleManager[_0x134f45(0x16a)]=function(){const _0x125ae3=_0x134f45;return this['_subject']=VisuMZ['BattleSystemOTB'][_0x125ae3(0xf8)][_0x125ae3(0xb2)](this),this['isOTB']()&&this[_0x125ae3(0x257)]&&this[_0x125ae3(0x2d2)](this[_0x125ae3(0x257)]),this[_0x125ae3(0x257)];},BattleManager[_0x134f45(0x2d2)]=function(_0x2196e1){const _0x48bbd0=_0x134f45;if(!this[_0x48bbd0(0x16f)]())return;const _0x51a0c3=SceneManager[_0x48bbd0(0x27c)]['_otbTurnOrderWindow'];if(!_0x51a0c3)return;if(!_0x2196e1)return;_0x51a0c3[_0x48bbd0(0x135)](_0x2196e1);},BattleManager[_0x134f45(0x2ce)]=function(){const _0x2d5ce4=_0x134f45;if(!this[_0x2d5ce4(0x16f)]())return;const _0x403eb1=SceneManager[_0x2d5ce4(0x27c)]['_otbTurnOrderWindow'];if(!_0x403eb1)return;_0x403eb1['requestUpdateTurnOrders']();},VisuMZ[_0x134f45(0x108)]['BattleManager_endTurn']=BattleManager[_0x134f45(0x251)],BattleManager[_0x134f45(0x251)]=function(){const _0x5a4e30=_0x134f45;VisuMZ['BattleSystemOTB'][_0x5a4e30(0x1c0)][_0x5a4e30(0xb2)](this),this['isOTB']()&&(this[_0x5a4e30(0x259)](),$gameParty['clearMakeActionTimesCacheOTB'](),$gameTroop[_0x5a4e30(0x138)]());},BattleManager[_0x134f45(0x259)]=function(){const _0x113adb=_0x134f45;if(!this[_0x113adb(0x16f)]())return;const _0x3fc90c=SceneManager[_0x113adb(0x27c)][_0x113adb(0x2c4)];if(!_0x3fc90c)return;_0x3fc90c['removeCurrentSubject']();},BattleManager[_0x134f45(0x133)]=function(){const _0x7da2db=_0x134f45;if(!this[_0x7da2db(0x16f)]())return;const _0x427432=SceneManager[_0x7da2db(0x27c)]['_otbTurnOrderWindow'];if(!_0x427432)return;_0x427432[_0x7da2db(0x295)]();},BattleManager[_0x134f45(0x2dc)]=function(_0x132c16){const _0x4abee6=_0x134f45;if(!_0x132c16)return;if($gameTroop['turnCount']()<=0x0)return;const _0x300f92=_0x132c16[_0x4abee6(0x104)]();_0x132c16[_0x4abee6(0x269)]();if(!this[_0x4abee6(0x2c1)][_0x4abee6(0x147)](_0x132c16)){const _0x1444a3=Math[_0x4abee6(0x10b)](0x0,_0x300f92-(_0x132c16[_0x4abee6(0x245)]||0x0));this[_0x4abee6(0x12f)](_0x132c16,_0x1444a3,this['_actionBattlers']);}if(!this[_0x4abee6(0x252)][_0x4abee6(0x147)](_0x132c16)){const _0x45ba24=_0x300f92;this[_0x4abee6(0x12f)](_0x132c16,_0x45ba24,this[_0x4abee6(0x252)]);}},BattleManager[_0x134f45(0x12f)]=function(_0x393bc2,_0x5e8050,_0x18f505){const _0x25b90f=_0x134f45;if(!this[_0x25b90f(0x16f)]())return;if(_0x18f505===this['_actionBattlers']&&BattleManager[_0x25b90f(0x1b4)]())return;const _0x4bc457=SceneManager[_0x25b90f(0x27c)][_0x25b90f(0x2c4)];_0x393bc2[_0x25b90f(0x269)]();while(_0x5e8050--){_0x18f505['push'](_0x393bc2),_0x4bc457&&_0x4bc457[_0x25b90f(0x228)](_0x393bc2,_0x18f505);}},BattleManager['otbUnshiftBattlerToTurnOrders']=function(_0x291e20){const _0x40aa06=_0x134f45;if(!_0x291e20)return;const _0x934444=_0x291e20[_0x40aa06(0x104)]();_0x291e20['makeActions']();if(!this[_0x40aa06(0x2c1)][_0x40aa06(0x147)](_0x291e20)){const _0x167fff=Math[_0x40aa06(0x10b)](0x0,_0x934444-(_0x291e20[_0x40aa06(0x245)]||0x0));this[_0x40aa06(0x2b0)](_0x291e20,_0x167fff,this['_actionBattlers']);}if(!this['_otb_actionBattlersNext'][_0x40aa06(0x147)](_0x291e20)){const _0x3cd260=_0x934444;this[_0x40aa06(0x2b0)](_0x291e20,_0x3cd260,this[_0x40aa06(0x252)]);}},BattleManager[_0x134f45(0x143)]=function(_0x1180cd,_0x4180a9,_0x1856b1){const _0xf79ea9=_0x134f45;if(!this[_0xf79ea9(0x16f)]())return;if(_0x1856b1===this[_0xf79ea9(0x2c1)]&&BattleManager[_0xf79ea9(0x1b4)]())return;const _0x5529a0=SceneManager['_scene']['_otbTurnOrderWindow'];while(_0x4180a9--){_0x1856b1['unshift'](_0x1180cd),_0x5529a0&&_0x5529a0[_0xf79ea9(0x2b0)](_0x1180cd,_0x1856b1);}},BattleManager[_0x134f45(0x124)]=function(_0x232099){const _0x3cf779=_0x134f45;if(!this[_0x3cf779(0x16f)]())return;const _0x210d2a=this[_0x3cf779(0x2c1)],_0x3c1b92=_0x232099===this[_0x3cf779(0x257)]?0x0:0x1;let _0x38ae6c=0x0;for(let _0x463625=0x0;_0x463625<_0x210d2a[_0x3cf779(0xf0)];_0x463625++){const _0x592b93=_0x210d2a[_0x463625];if(!_0x592b93)continue;if(!_0x592b93[_0x3cf779(0x146)])continue;if(!_0x592b93[_0x3cf779(0x146)][_0x3c1b92])continue;if(!_0x592b93[_0x3cf779(0x146)][_0x3c1b92][_0x3cf779(0x1ce)])continue;_0x38ae6c=_0x463625;}this[_0x3cf779(0x2c1)][_0x3cf779(0x1f5)](_0x38ae6c,0x0,_0x232099);const _0x13e85a=SceneManager[_0x3cf779(0x27c)][_0x3cf779(0x2c4)];_0x13e85a&&_0x13e85a[_0x3cf779(0x174)](_0x232099,_0x38ae6c);},BattleManager[_0x134f45(0x122)]=function(){const _0x53a153=_0x134f45;if(!this[_0x53a153(0x16f)]())return;const _0x5d2d5d=SceneManager[_0x53a153(0x27c)][_0x53a153(0x2c4)];if(!_0x5d2d5d)return;_0x5d2d5d[_0x53a153(0x151)](null);},BattleManager[_0x134f45(0xac)]=function(){const _0x1507c8=_0x134f45;if(!this['isOTB']())return;const _0xd691ec=SceneManager[_0x1507c8(0x27c)][_0x1507c8(0x2c4)];if(!_0xd691ec)return;_0xd691ec['previewOrderByAction'](this['inputtingAction']());},VisuMZ[_0x134f45(0x108)][_0x134f45(0xce)]=Game_System[_0x134f45(0x1c6)][_0x134f45(0x1c3)],Game_System[_0x134f45(0x1c6)]['initialize']=function(){const _0x2839f5=_0x134f45;VisuMZ[_0x2839f5(0x108)][_0x2839f5(0xce)][_0x2839f5(0xb2)](this),this[_0x2839f5(0x229)]();},Game_System['prototype'][_0x134f45(0x229)]=function(){this['_otbTurnOrderVisible']=!![];},Game_System[_0x134f45(0x1c6)][_0x134f45(0x1c1)]=function(){const _0x4c8845=_0x134f45;return this['_otbTurnOrderVisible']===undefined&&this['initBattleSystemOTB'](),this[_0x4c8845(0x1fe)];},Game_System['prototype']['setBattleSystemOTBTurnOrderVisible']=function(_0x478d4d){const _0x410593=_0x134f45;this[_0x410593(0x1fe)]===undefined&&this['initBattleSystemOTB'](),this[_0x410593(0x1fe)]=_0x478d4d;},Game_Action[_0x134f45(0x223)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)]['Conversion'][_0x134f45(0x123)],Game_Action['OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN']=VisuMZ['BattleSystemOTB'][_0x134f45(0x23b)][_0x134f45(0xdd)][_0x134f45(0x159)],Game_Action[_0x134f45(0x152)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)]['Conversion'][_0x134f45(0x2c9)],Game_Action[_0x134f45(0xc3)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)][_0x134f45(0xdd)][_0x134f45(0xfc)],Game_Action[_0x134f45(0x28d)]=VisuMZ['BattleSystemOTB'][_0x134f45(0x23b)]['Conversion'][_0x134f45(0x188)]??!![],Game_Action[_0x134f45(0x276)]=VisuMZ['BattleSystemOTB'][_0x134f45(0x23b)]['Conversion']['ConvertAgiStateUpNext']??!![],Game_Action[_0x134f45(0x170)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)]['Conversion']['ConvertAgiStateDownCurrent']??!![],Game_Action[_0x134f45(0x1de)]=VisuMZ[_0x134f45(0x108)][_0x134f45(0x23b)][_0x134f45(0xdd)][_0x134f45(0xc2)]??!![],VisuMZ[_0x134f45(0x108)][_0x134f45(0xb3)]=Game_Action['prototype'][_0x134f45(0x12e)],Game_Action['prototype'][_0x134f45(0x12e)]=function(){const _0x446ea9=_0x134f45;return BattleManager[_0x446ea9(0x16f)]()?0x0:VisuMZ[_0x446ea9(0x108)]['Game_Action_speed'][_0x446ea9(0xb2)](this);},VisuMZ[_0x134f45(0x108)]['Game_Action_applyGlobal']=Game_Action[_0x134f45(0x1c6)]['applyGlobal'],Game_Action[_0x134f45(0x1c6)][_0x134f45(0x1d0)]=function(){const _0x4b8d0d=_0x134f45;VisuMZ['BattleSystemOTB'][_0x4b8d0d(0x212)][_0x4b8d0d(0xb2)](this),this[_0x4b8d0d(0xdb)]();},Game_Action[_0x134f45(0x1c6)]['applyGlobalBattleSystemOTB']=function(){const _0xc0cd5e=_0x134f45;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isOTB']())return;if(!this[_0xc0cd5e(0x2ca)]())return;if(!this[_0xc0cd5e(0x17d)]())return;const _0x5edbe3=VisuMZ['BattleSystemOTB']['RegExp'],_0x35512b=this[_0xc0cd5e(0x2ca)]()[_0xc0cd5e(0x26f)];_0x35512b[_0xc0cd5e(0x2d9)](_0x5edbe3['Instant'])&&this[_0xc0cd5e(0x17d)]()[_0xc0cd5e(0x106)](0x1);let _0x571c77=this['otbCalcUserCurrentOrderChange'](),_0x5530b5=this[_0xc0cd5e(0x247)]();_0x571c77!==0x0&&BattleManager[_0xc0cd5e(0x2ad)](this[_0xc0cd5e(0x17d)](),-_0x571c77,![]),_0x5530b5!==0x0&&BattleManager[_0xc0cd5e(0x2ad)](this[_0xc0cd5e(0x17d)](),-_0x5530b5,!![]);},Game_Action[_0x134f45(0x1c6)][_0x134f45(0x236)]=function(){const _0x57ae03=_0x134f45;if(!SceneManager[_0x57ae03(0x20a)]())return 0x0;if(!BattleManager[_0x57ae03(0x16f)]())return 0x0;if(!this[_0x57ae03(0x2ca)]())return 0x0;if(!this[_0x57ae03(0x17d)]())return 0x0;if(!this[_0x57ae03(0x17d)]()[_0x57ae03(0x1e4)]())return 0x0;const _0x227f2f=VisuMZ[_0x57ae03(0x108)][_0x57ae03(0x1aa)],_0x274f3e=this[_0x57ae03(0x2ca)]()[_0x57ae03(0x26f)],_0x3758b5=BattleManager[_0x57ae03(0x2c1)]||[];let _0x4790a8=0x0;return _0x274f3e[_0x57ae03(0x2d9)](_0x227f2f['UserFollOrder'])&&(_0x3758b5[_0x57ae03(0x147)](this[_0x57ae03(0x17d)]())&&(_0x4790a8+=Number(RegExp['$1']))),_0x274f3e[_0x57ae03(0x2d9)](_0x227f2f[_0x57ae03(0x21c)])&&(_0x4790a8+=Number(RegExp['$1'])),_0x4790a8;},Game_Action[_0x134f45(0x1c6)][_0x134f45(0x247)]=function(){const _0x5bbee4=_0x134f45;if(!SceneManager[_0x5bbee4(0x20a)]())return 0x0;if(!BattleManager[_0x5bbee4(0x16f)]())return 0x0;if(!this[_0x5bbee4(0x2ca)]())return 0x0;if(!this['subject']())return 0x0;if(!this['subject']()[_0x5bbee4(0x1e4)]())return 0x0;const _0x43729d=VisuMZ['BattleSystemOTB'][_0x5bbee4(0x23b)][_0x5bbee4(0x22d)],_0x3f01dc=VisuMZ[_0x5bbee4(0x108)][_0x5bbee4(0x1aa)],_0x4d1ccb=this[_0x5bbee4(0x2ca)]()[_0x5bbee4(0x26f)],_0x415515=BattleManager[_0x5bbee4(0x2c1)]||[],_0x356730=BattleManager[_0x5bbee4(0x252)]||[];let _0x3cbe9b=0x0;return _0x43729d[_0x5bbee4(0x2b4)]&&(_0x3cbe9b+=_0x43729d['ConvertSpeedJS'][_0x5bbee4(0xb2)](this)),_0x4d1ccb['match'](_0x3f01dc[_0x5bbee4(0x254)])&&(_0x356730[_0x5bbee4(0x147)](this[_0x5bbee4(0x17d)]())&&!_0x415515[_0x5bbee4(0x147)](this[_0x5bbee4(0x17d)]())&&(_0x3cbe9b+=Number(RegExp['$1']))),_0x4d1ccb[_0x5bbee4(0x2d9)](_0x3f01dc['UserNextOrder'])&&(_0x3cbe9b+=Number(RegExp['$1'])),_0x3cbe9b;},VisuMZ[_0x134f45(0x108)]['Game_Action_applyItemUserEffect']=Game_Action[_0x134f45(0x1c6)]['applyItemUserEffect'],Game_Action[_0x134f45(0x1c6)][_0x134f45(0xd2)]=function(_0x4da5f9){const _0x4da0e0=_0x134f45;VisuMZ[_0x4da0e0(0x108)][_0x4da0e0(0x27a)][_0x4da0e0(0xb2)](this,_0x4da5f9),this['applyItemAddedActionOTB'](_0x4da5f9),this['applyItemTargetEffectOTB'](_0x4da5f9);},Game_Action['prototype'][_0x134f45(0x26d)]=function(_0x3f7de9){const _0x2c7da7=_0x134f45;if(!SceneManager[_0x2c7da7(0x20a)]())return;if(!BattleManager[_0x2c7da7(0x16f)]())return;if(!this[_0x2c7da7(0x2ca)]())return;if(!_0x3f7de9)return;const _0x49af91=VisuMZ[_0x2c7da7(0x108)][_0x2c7da7(0x1aa)],_0x566a0b=this[_0x2c7da7(0x2ca)]()['note'];if(_0x566a0b[_0x2c7da7(0x2d9)](_0x49af91[_0x2c7da7(0x121)])){const _0x518817=!![],_0x3d31c4=Number(RegExp['$1'])||0x0;this[_0x2c7da7(0x17d)]()[_0x2c7da7(0xf9)](_0x3d31c4,_0x518817);}if(_0x566a0b[_0x2c7da7(0x2d9)](_0x49af91[_0x2c7da7(0x22f)])){const _0x22e700=![],_0x5f39ef=Number(RegExp['$1'])||0x0;this['subject']()[_0x2c7da7(0xf9)](_0x5f39ef,_0x22e700);}if(_0x566a0b[_0x2c7da7(0x2d9)](_0x49af91[_0x2c7da7(0xf4)])){const _0x11e2c0=!![],_0x2bb503=Number(RegExp['$1'])||0x0;_0x3f7de9[_0x2c7da7(0xf9)](_0x2bb503,_0x11e2c0);}if(_0x566a0b[_0x2c7da7(0x2d9)](_0x49af91['TargetAddActionNext'])){const _0x29e449=![],_0x4af8c6=Number(RegExp['$1'])||0x0;_0x3f7de9['otbAddActions'](_0x4af8c6,_0x29e449);}},Game_Action['prototype'][_0x134f45(0x273)]=function(_0x27677e){const _0x202b54=_0x134f45;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isOTB']())return;if(!this[_0x202b54(0x2ca)]())return;if(!_0x27677e)return;if(!_0x27677e[_0x202b54(0x1e4)]())return 0x0;let _0x39aa11=this[_0x202b54(0x1bb)](_0x27677e),_0x35da26=this[_0x202b54(0x204)](_0x27677e);_0x39aa11!==0x0&&BattleManager['turnOrderChangeOTB'](_0x27677e,-_0x39aa11,![]),_0x35da26!==0x0&&BattleManager[_0x202b54(0x2ad)](_0x27677e,-_0x35da26,!![]);},Game_Action[_0x134f45(0x1c6)]['otbCalcTargetCurrentOrderChange']=function(_0x421045){const _0x34ec49=_0x134f45;if(!SceneManager['isSceneBattle']())return 0x0;if(!BattleManager[_0x34ec49(0x16f)]())return 0x0;if(!this[_0x34ec49(0x2ca)]())return 0x0;if(!_0x421045)return 0x0;if(!_0x421045[_0x34ec49(0x1e4)]())return 0x0;const _0x3ac055=VisuMZ[_0x34ec49(0x108)]['RegExp'],_0x3cfe9e=this['item']()[_0x34ec49(0x26f)],_0x518299=BattleManager[_0x34ec49(0x2c1)]||[];let _0x155404=0x0;_0x3cfe9e[_0x34ec49(0x2d9)](_0x3ac055[_0x34ec49(0x230)])&&(_0x518299[_0x34ec49(0x147)](_0x421045)&&(_0x155404+=Number(RegExp['$1'])));_0x3cfe9e[_0x34ec49(0x2d9)](_0x3ac055[_0x34ec49(0x2a3)])&&(_0x155404+=Number(RegExp['$1']));const _0x4c855b=this[_0x34ec49(0x2ca)]()[_0x34ec49(0xf3)];for(const _0xf94110 of _0x4c855b){if(!_0xf94110)continue;if(_0xf94110[_0x34ec49(0x2cc)]===Game_Action[_0x34ec49(0x1d6)]&&_0xf94110[_0x34ec49(0x1a2)]===0x6){if(Game_Action[_0x34ec49(0x223)])_0x155404-=0x1;}if(_0xf94110['code']===Game_Action[_0x34ec49(0x16d)]&&_0xf94110[_0x34ec49(0x1a2)]===0x6){if(Game_Action[_0x34ec49(0xae)])_0x155404+=0x1;}if(_0xf94110['code']===Game_Action[_0x34ec49(0xbd)]){const _0x5bb302=$dataStates[_0xf94110[_0x34ec49(0x1a2)]];if(_0x5bb302){const _0x2d8569=_0x5bb302[_0x34ec49(0x1f2)][_0x34ec49(0x231)](_0x279a5b=>_0x279a5b[_0x34ec49(0x2cc)]===Game_BattlerBase[_0x34ec49(0x182)]&&_0x279a5b[_0x34ec49(0x1a2)]===0x6);for(const _0x382cdd of _0x2d8569){if(_0x382cdd[_0x34ec49(0x2bf)]>=1.05){if(Game_Action[_0x34ec49(0x28d)])_0x155404-=0x1;}if(_0x382cdd[_0x34ec49(0x2bf)]<=0.95){if(Game_Action[_0x34ec49(0x170)])_0x155404+=0x1;}}}}}return _0x155404;},Game_Action[_0x134f45(0x1c6)][_0x134f45(0x204)]=function(_0x22aa90){const _0x245c7c=_0x134f45;if(!SceneManager[_0x245c7c(0x20a)]())return 0x0;if(!BattleManager['isOTB']())return 0x0;if(!this[_0x245c7c(0x2ca)]())return 0x0;if(!_0x22aa90)return 0x0;if(!_0x22aa90['canChangeOtbTurnOrder']())return 0x0;const _0x261fc6=VisuMZ[_0x245c7c(0x108)][_0x245c7c(0x1aa)],_0x19ef80=this[_0x245c7c(0x2ca)]()[_0x245c7c(0x26f)],_0x15b615=BattleManager[_0x245c7c(0x2c1)]||[],_0x1dbd1a=BattleManager[_0x245c7c(0x252)]||[];let _0x5226f6=0x0;_0x19ef80[_0x245c7c(0x2d9)](_0x261fc6[_0x245c7c(0x230)])&&(_0x1dbd1a[_0x245c7c(0x147)](_0x22aa90)&&!_0x15b615['includes'](_0x22aa90)&&(_0x5226f6+=Number(RegExp['$1'])));_0x19ef80[_0x245c7c(0x2d9)](_0x261fc6[_0x245c7c(0x12c)])&&(_0x5226f6+=Number(RegExp['$1']));const _0x907d35=this[_0x245c7c(0x2ca)]()[_0x245c7c(0xf3)];for(const _0xde3e15 of _0x907d35){if(!_0xde3e15)continue;if(_0xde3e15[_0x245c7c(0x2cc)]===Game_Action[_0x245c7c(0x1d6)]&&_0xde3e15['dataId']===0x6){if(Game_Action[_0x245c7c(0x152)])_0x5226f6-=0x1;}if(_0xde3e15['code']===Game_Action[_0x245c7c(0x16d)]&&_0xde3e15[_0x245c7c(0x1a2)]===0x6){if(Game_Action['OTB_CONVERT_AGI_DEBUFF_NEXT_TURN'])_0x5226f6+=0x1;}if(_0xde3e15['code']===Game_Action['EFFECT_ADD_STATE']){const _0x1ace8b=$dataStates[_0xde3e15[_0x245c7c(0x1a2)]];if(_0x1ace8b){const _0xb1fc8f=_0x1ace8b['traits'][_0x245c7c(0x231)](_0x2deb03=>_0x2deb03['code']===Game_BattlerBase['TRAIT_PARAM']&&_0x2deb03[_0x245c7c(0x1a2)]===0x6);for(const _0x2e7b41 of _0xb1fc8f){if(_0x2e7b41[_0x245c7c(0x2bf)]>=1.05){if(Game_Action[_0x245c7c(0x276)])_0x5226f6-=0x1;}if(_0x2e7b41[_0x245c7c(0x2bf)]<=0.95){if(Game_Action[_0x245c7c(0x1de)])_0x5226f6+=0x1;}}}}}return _0x5226f6;},Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x195)]=function(){const _0x1db5fe=_0x134f45;delete this[_0x1db5fe(0xf5)],delete this[_0x1db5fe(0x1a8)],delete this[_0x1db5fe(0x1e2)],delete this['_otbTurnOrderIconIndex'];},Game_BattlerBase['prototype'][_0x134f45(0x1c7)]=function(){const _0x140f23=_0x134f45;return this[_0x140f23(0xf5)]===undefined&&(this[_0x140f23(0xf5)]=this['createTurnOrderOTBGraphicType']()),this['_otbTurnOrderGraphicType'];},Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x241)]=function(){const _0x4800db=_0x134f45;return Window_OTB_TurnOrder['Settings'][_0x4800db(0x1ec)];},Game_BattlerBase['prototype'][_0x134f45(0x2b6)]=function(){const _0x23f1d4=_0x134f45;return this[_0x23f1d4(0x1a8)]===undefined&&(this[_0x23f1d4(0x1a8)]=this['createTurnOrderOTBGraphicFaceName']()),this[_0x23f1d4(0x1a8)];},Game_BattlerBase['prototype'][_0x134f45(0x169)]=function(){return Window_OTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_BattlerBase[_0x134f45(0x1c6)]['TurnOrderOTBGraphicFaceIndex']=function(){const _0x300cbf=_0x134f45;return this[_0x300cbf(0x1e2)]===undefined&&(this[_0x300cbf(0x1e2)]=this['createTurnOrderOTBGraphicFaceIndex']()),this[_0x300cbf(0x1e2)];},Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x2c0)]=function(){const _0x3175ff=_0x134f45;return Window_OTB_TurnOrder[_0x3175ff(0x23b)]['EnemyBattlerFaceIndex'];},Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x2ab)]=function(){const _0x391080=_0x134f45;return this[_0x391080(0x168)]===undefined&&(this[_0x391080(0x168)]=this[_0x391080(0xcf)]()),this['_otbTurnOrderIconIndex'];},Game_BattlerBase[_0x134f45(0x1c6)]['createTurnOrderOTBGraphicIconIndex']=function(){return Window_OTB_TurnOrder['Settings']['EnemyBattlerIcon'];},Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x1d3)]=function(_0x30d675){const _0xf28317=_0x134f45;this[_0xf28317(0x168)]=_0x30d675;},VisuMZ['BattleSystemOTB'][_0x134f45(0x178)]=Game_BattlerBase['prototype'][_0x134f45(0x11a)],Game_BattlerBase[_0x134f45(0x1c6)]['hide']=function(){const _0x4d0e05=_0x134f45;VisuMZ['BattleSystemOTB'][_0x4d0e05(0x178)]['call'](this),BattleManager[_0x4d0e05(0x272)]();},VisuMZ[_0x134f45(0x108)][_0x134f45(0x19f)]=Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x134)],Game_BattlerBase[_0x134f45(0x1c6)][_0x134f45(0x134)]=function(){const _0x1a4d01=_0x134f45,_0x21f1f1=this[_0x1a4d01(0x25a)];VisuMZ[_0x1a4d01(0x108)]['Game_BattlerBase_appear'][_0x1a4d01(0xb2)](this),BattleManager[_0x1a4d01(0x16f)]()&&SceneManager[_0x1a4d01(0x20a)]()&&_0x21f1f1&&!this[_0x1a4d01(0x25a)]&&BattleManager[_0x1a4d01(0x2dc)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x20f)]=Game_Battler[_0x134f45(0x1c6)]['performCollapse'],Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x23c)]=function(){const _0x2ba093=_0x134f45;VisuMZ[_0x2ba093(0x108)]['Game_Battler_performCollapse'][_0x2ba093(0xb2)](this),BattleManager[_0x2ba093(0x272)]();},Game_Battler[_0x134f45(0x1ee)]=VisuMZ['BattleSystemOTB'][_0x134f45(0x23b)]['Mechanics'][_0x134f45(0x105)],VisuMZ[_0x134f45(0x108)][_0x134f45(0x22e)]=Game_Battler[_0x134f45(0x1c6)][_0x134f45(0xb1)],Game_Battler[_0x134f45(0x1c6)]['onBattleStart']=function(_0x4f8e07){const _0x2c48d5=_0x134f45;VisuMZ[_0x2c48d5(0x108)]['Game_Battler_onBattleStart'][_0x2c48d5(0xb2)](this,_0x4f8e07),this[_0x2c48d5(0xbf)](_0x4f8e07);},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0xbf)]=function(_0x126c16){const _0x65bfd5=_0x134f45;if(!BattleManager[_0x65bfd5(0x16f)]())return;this['_otbTimesActedThisTurn']=0x0,this[_0x65bfd5(0x261)]=undefined;},VisuMZ['BattleSystemOTB'][_0x134f45(0x29c)]=Game_Battler['prototype'][_0x134f45(0x248)],Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x248)]=function(){const _0x591156=_0x134f45;VisuMZ['BattleSystemOTB'][_0x591156(0x29c)][_0x591156(0xb2)](this),this['onBattleEndOTB']();},Game_Battler['prototype'][_0x134f45(0x2bd)]=function(){const _0x2cc5f3=_0x134f45;if(!BattleManager['isOTB']())return;this[_0x2cc5f3(0x245)]=0x0;},Game_Battler[_0x134f45(0x1c6)]['performActionEndOTB']=function(){const _0x3e1345=_0x134f45;if(!BattleManager['isOTB']())return;this['_otbTimesActedThisTurn']=this[_0x3e1345(0x245)]||0x0,this['_otbTimesActedThisTurn']++;if(this['numActions']()>0x0&&this===BattleManager['_subject']){const _0x5c2591=BattleManager[_0x3e1345(0x109)];if(_0x5c2591[_0x3e1345(0xf0)]>0x0&&_0x5c2591[0x0]!==this)return;const _0x4d4f02=this[_0x3e1345(0x22b)]();if(_0x4d4f02&&BattleManager[_0x3e1345(0xbe)](this))_0x4d4f02[_0x3e1345(0x1fc)]();}},BattleManager['isNextOtbSubject']=function(_0x2ce01a){const _0x589d50=_0x134f45;if(!_0x2ce01a)return![];return this[_0x589d50(0x2c1)][0x0]===_0x2ce01a;},VisuMZ[_0x134f45(0x108)][_0x134f45(0x2d3)]=Game_Battler['prototype']['onTurnEnd'],Game_Battler['prototype']['onTurnEnd']=function(){const _0x3c4f63=_0x134f45;VisuMZ[_0x3c4f63(0x108)][_0x3c4f63(0x2d3)][_0x3c4f63(0xb2)](this),this[_0x3c4f63(0x1cc)]();},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x1cc)]=function(){const _0x5ed5f2=_0x134f45;if(!BattleManager[_0x5ed5f2(0x16f)]())return;this[_0x5ed5f2(0x245)]=0x0;},VisuMZ['BattleSystemOTB'][_0x134f45(0x1af)]=Game_Battler['prototype'][_0x134f45(0x113)],Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x113)]=function(){const _0x2666f8=_0x134f45;BattleManager[_0x2666f8(0x16f)]()?this[_0x2666f8(0x13d)]():VisuMZ[_0x2666f8(0x108)][_0x2666f8(0x1af)][_0x2666f8(0xb2)](this);},Game_Battler[_0x134f45(0x1c6)]['makeOTBSpeed']=function(){const _0x4728f1=_0x134f45;if(this[_0x4728f1(0x202)]())this['_speed']=Infinity;else{const _0x55a67a=this[_0x4728f1(0x14c)]()||new Game_Action(this);this[_0x4728f1(0x281)]=VisuMZ['BattleSystemOTB'][_0x4728f1(0x23b)][_0x4728f1(0x22d)][_0x4728f1(0x280)][_0x4728f1(0xb2)](_0x55a67a);}},Game_Battler['prototype']['isInfinitySpeedOTB']=function(){const _0x215a54=_0x134f45;if(!Game_Battler[_0x215a54(0x1ee)])return![];if(!this[_0x215a54(0x140)]())return![];if(!this[_0x215a54(0x181)]())return![];if(this[_0x215a54(0x2da)]())return![];const _0x27bef5=JsonEx[_0x215a54(0xb5)](this);return _0x27bef5[_0x215a54(0x2d0)]=!![],_0x27bef5[_0x215a54(0x10a)]=!![],_0x27bef5['updateStateTurns'](),_0x27bef5['removeStatesAuto'](0x1),_0x27bef5[_0x215a54(0x209)](0x2),_0x27bef5['refresh'](),_0x27bef5[_0x215a54(0x2da)]();},VisuMZ[_0x134f45(0x108)][_0x134f45(0x10d)]=Game_Action[_0x134f45(0x1c6)][_0x134f45(0x11f)],Game_Action[_0x134f45(0x1c6)][_0x134f45(0x11f)]=function(){const _0x50ba2f=_0x134f45;return BattleManager[_0x50ba2f(0x16f)]()?VisuMZ['BattleSystemOTB'][_0x50ba2f(0x23b)][_0x50ba2f(0x22d)]['AllowRandomSpeed']:VisuMZ[_0x50ba2f(0x108)][_0x50ba2f(0x10d)][_0x50ba2f(0xb2)](this);},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x106)]=function(_0x11b080){const _0x6c6fa9=_0x134f45;if(!this[_0x6c6fa9(0x2da)]())return;this['_otbTimesActedThisTurn']=this[_0x6c6fa9(0x245)]||0x0,this[_0x6c6fa9(0x245)]--,BattleManager[_0x6c6fa9(0x143)](this,_0x11b080,BattleManager[_0x6c6fa9(0x2c1)]);},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0xf9)]=function(_0x1ec7a9,_0x29d304){const _0xa2f8c8=_0x134f45;if(!this[_0xa2f8c8(0x2da)]())return;_0x29d304?BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x1ec7a9,BattleManager[_0xa2f8c8(0x2c1)]):BattleManager[_0xa2f8c8(0x12f)](this,_0x1ec7a9,BattleManager['_otb_actionBattlersNext']);},VisuMZ[_0x134f45(0x108)]['Game_Battler_makeActionTimes']=Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x104)],Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x104)]=function(){const _0x1b69dd=_0x134f45;return BattleManager[_0x1b69dd(0x16f)]()?this[_0x1b69dd(0xcd)]():VisuMZ[_0x1b69dd(0x108)][_0x1b69dd(0x17f)][_0x1b69dd(0xb2)](this);},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0xcd)]=function(){const _0x4ae7ff=_0x134f45;if(this[_0x4ae7ff(0x261)]!==undefined)return this[_0x4ae7ff(0x261)];this[_0x4ae7ff(0x24d)]=this[_0x4ae7ff(0xb8)]()[_0x4ae7ff(0xf0)];const _0x84acbd=this[_0x4ae7ff(0xb8)](),_0xe2989e=_0x84acbd[_0x4ae7ff(0xe5)]((_0x153b29,_0x5987a5)=>Math['random']()<_0x5987a5?_0x153b29+0x1:_0x153b29,0x1);return this[_0x4ae7ff(0x261)]=_0xe2989e,this[_0x4ae7ff(0x261)];},Game_Unit['prototype'][_0x134f45(0x138)]=function(){const _0x4cdb5d=_0x134f45;for(const _0x4d37d3 of this[_0x4cdb5d(0xe9)]()){_0x4d37d3&&(_0x4d37d3[_0x4cdb5d(0x261)]=undefined);}},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x1e4)]=function(){const _0x2cc3ae=_0x134f45;if(this[_0x2cc3ae(0x12e)]()===Infinity)return![];return!![];},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x205)]=function(_0x1441f7,_0x8092be){const _0x5a7fcb=_0x134f45;if(this[_0x5a7fcb(0x10a)]||this[_0x5a7fcb(0x2d0)])return;if(!SceneManager[_0x5a7fcb(0x20a)]())return;if(!BattleManager[_0x5a7fcb(0x16f)]())return;if(this[_0x5a7fcb(0x24d)]!==this['actionPlusSet']()['length'])this[_0x5a7fcb(0x24d)]=this['actionPlusSet']()['length'],this[_0x5a7fcb(0x261)]=undefined;else return;if(_0x1441f7&&!this[_0x5a7fcb(0x2da)]())BattleManager[_0x5a7fcb(0x272)]();else!_0x1441f7&&this[_0x5a7fcb(0x2da)]()&&BattleManager['otbReturnBattlerToTurnOrders'](this);if(this['canMove']()){const _0x29bcd2=this[_0x5a7fcb(0x104)]()-_0x8092be;_0x29bcd2>0x0&&(BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x29bcd2,BattleManager[_0x5a7fcb(0x2c1)]),BattleManager[_0x5a7fcb(0x12f)](this,_0x29bcd2,BattleManager[_0x5a7fcb(0x252)]));}},VisuMZ[_0x134f45(0x108)][_0x134f45(0x1f0)]=Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x1e9)],Game_Battler['prototype']['addState']=function(_0x164664){const _0x5a4ccc=_0x134f45,_0x3fe890=this[_0x5a4ccc(0x2da)](),_0x22ad77=this['makeActionTimes']();VisuMZ[_0x5a4ccc(0x108)][_0x5a4ccc(0x1f0)][_0x5a4ccc(0xb2)](this,_0x164664),this[_0x5a4ccc(0x24d)]=undefined,this[_0x5a4ccc(0x205)](_0x3fe890,_0x22ad77);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x28a)]=Game_Battler['prototype']['removeState'],Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x2a9)]=function(_0x182cf8){const _0xc8bc4=_0x134f45,_0xeb9ba5=this[_0xc8bc4(0x2da)](),_0x39bd56=this[_0xc8bc4(0x104)](),_0x554a71=this[_0xc8bc4(0x1bf)](_0x182cf8);VisuMZ[_0xc8bc4(0x108)][_0xc8bc4(0x28a)][_0xc8bc4(0xb2)](this,_0x182cf8),_0x554a71&&!this[_0xc8bc4(0x1bf)](_0x182cf8)&&(this[_0xc8bc4(0x24d)]=undefined,this[_0xc8bc4(0x205)](_0xeb9ba5,_0x39bd56));},VisuMZ[_0x134f45(0x108)][_0x134f45(0x18b)]=Game_BattlerBase[_0x134f45(0x1c6)]['recoverAll'],Game_BattlerBase['prototype'][_0x134f45(0x11e)]=function(){const _0x24318b=_0x134f45;if(BattleManager['isOTB']())this['removeState'](this[_0x24318b(0xd0)]());VisuMZ[_0x24318b(0x108)]['Game_BattlerBase_recoverAll'][_0x24318b(0xb2)](this);if(BattleManager[_0x24318b(0x16f)]())this['refresh']();},VisuMZ['BattleSystemOTB'][_0x134f45(0x11b)]=Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x2e7)],Game_Battler['prototype'][_0x134f45(0x2e7)]=function(_0x15f42a,_0x286537){const _0x6eba2d=_0x134f45;BattleManager[_0x6eba2d(0x16f)]()?this[_0x6eba2d(0x214)](_0x15f42a,_0x286537):VisuMZ[_0x6eba2d(0x108)]['Game_Battler_forceAction'][_0x6eba2d(0xb2)](this,_0x15f42a,_0x286537);},Game_Battler[_0x134f45(0x1c6)][_0x134f45(0x214)]=function(_0x13398f,_0x484481){const _0x9a5da=_0x134f45,_0x490881=new Game_Action(this,!![]);_0x490881[_0x9a5da(0x27b)](_0x13398f),_0x490881[_0x9a5da(0x1ce)]=!![];if(_0x484481===-0x2)_0x490881[_0x9a5da(0xb0)](this['_lastTargetIndex']);else _0x484481===-0x1?_0x490881[_0x9a5da(0x21a)]():_0x490881['setTarget'](_0x484481);Imported[_0x9a5da(0x224)]&&(_0x490881['checkForSpecialForceActionParsing']()&&_0x490881[_0x9a5da(0x194)](_0x484481));let _0x4be3ff=this[_0x9a5da(0x146)][_0x9a5da(0x219)](_0x7d0a49=>_0x7d0a49[_0x9a5da(0x1ce)]);if(this===BattleManager[_0x9a5da(0x257)])_0x4be3ff=Math[_0x9a5da(0x10b)](_0x4be3ff,0x0);_0x4be3ff++,this[_0x9a5da(0x146)][_0x9a5da(0x1f5)](_0x4be3ff,0x0,_0x490881);},VisuMZ[_0x134f45(0x108)]['BattleManager_forceAction']=BattleManager['forceAction'],BattleManager[_0x134f45(0x2e7)]=function(_0xd27c9d){const _0x3ffe6e=_0x134f45;BattleManager[_0x3ffe6e(0x16f)]()?this[_0x3ffe6e(0x214)](_0xd27c9d):VisuMZ[_0x3ffe6e(0x108)][_0x3ffe6e(0x15c)][_0x3ffe6e(0xb2)](this,_0xd27c9d);},BattleManager[_0x134f45(0x214)]=function(_0x2ca6a2){const _0x54b56e=_0x134f45;BattleManager[_0x54b56e(0x124)](_0x2ca6a2);},VisuMZ['BattleSystemOTB'][_0x134f45(0x17c)]=Game_Actor[_0x134f45(0x1c6)]['selectNextCommand'],Game_Actor[_0x134f45(0x1c6)][_0x134f45(0x20e)]=function(){const _0x282d4d=_0x134f45;if(BattleManager['isOTB']()){if(this[_0x282d4d(0x22b)]())this['battler']()[_0x282d4d(0x1fc)]();return![];}return VisuMZ[_0x282d4d(0x108)]['Game_Actor_selectNextCommand'][_0x282d4d(0xb2)](this);},Game_Actor['prototype'][_0x134f45(0x241)]=function(){const _0x38d7a9=_0x134f45,_0x115465=this[_0x38d7a9(0x1b0)]()['note'];if(_0x115465[_0x38d7a9(0x2d9)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x38d7a9(0x2ed);else{if(_0x115465[_0x38d7a9(0x2d9)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x38d7a9(0x260);}return Window_OTB_TurnOrder[_0x38d7a9(0x23b)][_0x38d7a9(0x15e)];},Game_Actor['prototype'][_0x134f45(0x169)]=function(){const _0x4a2ca9=_0x134f45,_0x428cd7=this[_0x4a2ca9(0x1b0)]()[_0x4a2ca9(0x26f)];if(_0x428cd7[_0x4a2ca9(0x2d9)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x4a2ca9(0x175)]();},Game_Actor[_0x134f45(0x1c6)][_0x134f45(0x2c0)]=function(){const _0x3f9fcd=_0x134f45,_0x1f9322=this[_0x3f9fcd(0x1b0)]()[_0x3f9fcd(0x26f)];if(_0x1f9322[_0x3f9fcd(0x2d9)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x3f9fcd(0xdf)]();},Game_Actor[_0x134f45(0x1c6)][_0x134f45(0xcf)]=function(){const _0x3caba6=_0x134f45,_0x2b0e49=this[_0x3caba6(0x1b0)]()[_0x3caba6(0x26f)];if(_0x2b0e49[_0x3caba6(0x2d9)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x3caba6(0x23b)][_0x3caba6(0x27f)];},Game_Enemy[_0x134f45(0x1c6)][_0x134f45(0x241)]=function(){const _0x438308=_0x134f45,_0x21df9e=this[_0x438308(0xba)]()['note'];if(_0x21df9e[_0x438308(0x2d9)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x438308(0x2ed);else{if(_0x21df9e['match'](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_OTB_TurnOrder['Settings'][_0x438308(0x1ec)];},Game_Enemy[_0x134f45(0x1c6)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x5854c9=_0x134f45,_0x100310=this['enemy']()[_0x5854c9(0x26f)];if(_0x100310[_0x5854c9(0x2d9)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_OTB_TurnOrder[_0x5854c9(0x23b)][_0x5854c9(0x290)];},Game_Enemy[_0x134f45(0x1c6)][_0x134f45(0x2c0)]=function(){const _0x420293=_0x134f45,_0x5024d2=this['enemy']()[_0x420293(0x26f)];if(_0x5024d2[_0x420293(0x2d9)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x420293(0x23b)]['EnemyBattlerFaceIndex'];},Game_Enemy[_0x134f45(0x1c6)][_0x134f45(0xcf)]=function(){const _0x1ed71f=_0x134f45,_0x23aa75=this[_0x1ed71f(0xba)]()['note'];if(_0x23aa75[_0x1ed71f(0x2d9)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x1ed71f(0x23b)][_0x1ed71f(0x1ba)];},VisuMZ[_0x134f45(0x108)]['Game_Party_addActor']=Game_Party[_0x134f45(0x1c6)][_0x134f45(0x1a7)],Game_Party[_0x134f45(0x1c6)][_0x134f45(0x1a7)]=function(_0x5684ab){const _0x3d4326=_0x134f45;VisuMZ['BattleSystemOTB'][_0x3d4326(0xb4)][_0x3d4326(0xb2)](this,_0x5684ab);if(Imported[_0x3d4326(0x237)])return;SceneManager['isSceneBattle']()&&BattleManager['isOTB']()&&(BattleManager['removeActionBattlersOTB'](),BattleManager[_0x3d4326(0x2dc)]($gameActors[_0x3d4326(0x1b0)](_0x5684ab)));},VisuMZ[_0x134f45(0x108)][_0x134f45(0x298)]=Game_Party[_0x134f45(0x1c6)][_0x134f45(0x232)],Game_Party[_0x134f45(0x1c6)][_0x134f45(0x232)]=function(_0x18fdf9){const _0x4ac7c6=_0x134f45;VisuMZ[_0x4ac7c6(0x108)][_0x4ac7c6(0x298)][_0x4ac7c6(0xb2)](this,_0x18fdf9),SceneManager[_0x4ac7c6(0x20a)]()&&BattleManager[_0x4ac7c6(0x16f)]()&&BattleManager[_0x4ac7c6(0x272)]();},VisuMZ[_0x134f45(0x108)][_0x134f45(0x19e)]=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xdc)],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xdc)]=function(){const _0x4b87b3=_0x134f45;VisuMZ[_0x4b87b3(0x108)][_0x4b87b3(0x19e)]['call'](this),BattleManager[_0x4b87b3(0x16f)]()&&this[_0x4b87b3(0x21f)]();},Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x21f)]=function(){const _0x3a8ec8=_0x134f45,_0x56387f=this[_0x3a8ec8(0x289)];this[_0x3a8ec8(0x201)]()&&delete _0x56387f['_handlers'][_0x3a8ec8(0x161)];},VisuMZ['BattleSystemOTB'][_0x134f45(0x2ee)]=Scene_Battle[_0x134f45(0x1c6)]['commandCancel'],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x126)]=function(){const _0x226325=_0x134f45;BattleManager['isOTB']()?this['commandCancelOTB']():VisuMZ[_0x226325(0x108)][_0x226325(0x2ee)][_0x226325(0xb2)](this);},Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x2ec)]=function(){const _0x4ffba0=_0x134f45;BattleManager[_0x4ffba0(0x122)](),this['_partyCommandWindow'][_0x4ffba0(0x1eb)](),this[_0x4ffba0(0x289)]['close']();},VisuMZ['BattleSystemOTB']['Scene_Battle_commandFight']=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x2e0)],Scene_Battle['prototype'][_0x134f45(0x2e0)]=function(){const _0x33a4fb=_0x134f45;BattleManager[_0x33a4fb(0x16f)]()?this[_0x33a4fb(0x1d8)]():VisuMZ[_0x33a4fb(0x108)][_0x33a4fb(0x179)][_0x33a4fb(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x264)]=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x18a)],Scene_Battle['prototype'][_0x134f45(0x18a)]=function(){const _0xb603c=_0x134f45;VisuMZ['BattleSystemOTB']['Scene_Battle_createAllWindows'][_0xb603c(0xb2)](this),this[_0xb603c(0xff)]();},Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xff)]=function(){const _0x265342=_0x134f45;if(!BattleManager[_0x265342(0x16f)]())return;this['_otbTurnOrderWindow']=new Window_OTB_TurnOrder();const _0x247183=this[_0x265342(0x25e)](this[_0x265342(0x274)]);this['addChildAt'](this[_0x265342(0x2c4)],_0x247183),this[_0x265342(0x1b1)](),SceneManager[_0x265342(0x27d)]()&&this[_0x265342(0x2c4)][_0x265342(0x2a1)]();},Scene_Battle[_0x134f45(0x1c6)]['repositionLogWindowOTB']=function(){const _0x5eec10=_0x134f45,_0x2550a7=Window_OTB_TurnOrder[_0x5eec10(0x23b)];if(_0x2550a7[_0x5eec10(0xd9)]!=='top')return;if(!_0x2550a7[_0x5eec10(0x2d1)])return;if(!this[_0x5eec10(0x10c)])return;const _0x9268af=this['_otbTurnOrderWindow']['y']-Math[_0x5eec10(0x20b)]((Graphics[_0x5eec10(0x2b8)]-Graphics[_0x5eec10(0x211)])/0x2),_0x2c2404=_0x9268af+this[_0x5eec10(0x2c4)][_0x5eec10(0x2b8)];this['_logWindow']['y']=_0x2c2404+(_0x2550a7['LogWindowOffsetY']||0x0);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x119)]=Scene_Battle['prototype']['commandAttack'],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xe8)]=function(){const _0x22374f=_0x134f45;BattleManager['otbPreviewOrderClear'](),VisuMZ['BattleSystemOTB'][_0x22374f(0x119)][_0x22374f(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x25f)]=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x166)],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x166)]=function(){const _0x2a12e9=_0x134f45;BattleManager[_0x2a12e9(0x122)](),VisuMZ[_0x2a12e9(0x108)][_0x2a12e9(0x25f)][_0x2a12e9(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x116)]=Scene_Battle['prototype'][_0x134f45(0x1cb)],Scene_Battle['prototype']['onActorOk']=function(){const _0x543e74=_0x134f45;BattleManager[_0x543e74(0x122)](),VisuMZ[_0x543e74(0x108)][_0x543e74(0x116)]['call'](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0xcc)]=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x283)],Scene_Battle[_0x134f45(0x1c6)]['onActorCancel']=function(){const _0x2aa80c=_0x134f45;BattleManager[_0x2aa80c(0x122)](),VisuMZ[_0x2aa80c(0x108)][_0x2aa80c(0xcc)][_0x2aa80c(0xb2)](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_onEnemyOk']=Scene_Battle['prototype'][_0x134f45(0xc4)],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xc4)]=function(){const _0x3c1c6a=_0x134f45;BattleManager[_0x3c1c6a(0x122)](),VisuMZ['BattleSystemOTB']['Scene_Battle_onEnemyOk'][_0x3c1c6a(0xb2)](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_onEnemyCancel']=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xde)],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0xde)]=function(){const _0x4865e2=_0x134f45;BattleManager[_0x4865e2(0x122)](),VisuMZ[_0x4865e2(0x108)]['Scene_Battle_onEnemyCancel']['call'](this);},VisuMZ[_0x134f45(0x108)]['Scene_Battle_onSkillOk']=Scene_Battle[_0x134f45(0x1c6)]['onSkillOk'],Scene_Battle[_0x134f45(0x1c6)]['onSkillOk']=function(){const _0x5da976=_0x134f45;BattleManager[_0x5da976(0x122)](),VisuMZ['BattleSystemOTB'][_0x5da976(0x26c)][_0x5da976(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x1d1)]=Scene_Battle[_0x134f45(0x1c6)]['onSkillCancel'],Scene_Battle[_0x134f45(0x1c6)]['onSkillCancel']=function(){const _0x5ce090=_0x134f45;BattleManager[_0x5ce090(0x122)](),VisuMZ[_0x5ce090(0x108)][_0x5ce090(0x1d1)]['call'](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x27e)]=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x190)],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x190)]=function(){const _0x2dd28a=_0x134f45;BattleManager[_0x2dd28a(0x122)](),VisuMZ[_0x2dd28a(0x108)][_0x2dd28a(0x27e)][_0x2dd28a(0xb2)](this);},VisuMZ[_0x134f45(0x108)][_0x134f45(0x177)]=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x1ca)],Scene_Battle['prototype']['onItemCancel']=function(){const _0x2eca3e=_0x134f45;BattleManager[_0x2eca3e(0x122)](),VisuMZ['BattleSystemOTB'][_0x2eca3e(0x177)][_0x2eca3e(0xb2)](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_actorCommandSingleSkill']=Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x2d6)],Scene_Battle[_0x134f45(0x1c6)][_0x134f45(0x2d6)]=function(){const _0x1ed8ed=_0x134f45;BattleManager[_0x1ed8ed(0x122)](),VisuMZ[_0x1ed8ed(0x108)][_0x1ed8ed(0x23a)][_0x1ed8ed(0xb2)](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x5d6c23=_0x134f45;this[_0x5d6c23(0x1c3)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]=Object[_0x134f45(0x199)](Sprite_Clickable[_0x134f45(0x1c6)]),Sprite_OTB_TurnOrder_Battler['prototype'][_0x134f45(0x2a5)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x1c3)]=function(_0x2e7176,_0x5bcfd7,_0x3e5b12){const _0x29b738=_0x134f45;this['initMembers'](_0x2e7176,_0x5bcfd7,_0x3e5b12),Sprite_Clickable[_0x29b738(0x1c6)][_0x29b738(0x1c3)]['call'](this),this[_0x29b738(0x1df)]=0x0,this['createChildren'](),this[_0x29b738(0xe6)]();},Sprite_OTB_TurnOrder_Battler['prototype']['initMembers']=function(_0x59e83e,_0x218abb,_0x1c5561){const _0x40eb55=_0x134f45;this['_unit']=_0x59e83e[_0x40eb55(0xd7)]()?$gameParty:$gameTroop,this['_index']=_0x59e83e[_0x40eb55(0x1dd)](),this['_instance']=_0x218abb,this[_0x40eb55(0x12a)]=_0x1c5561;const _0x5db1f5=Window_OTB_TurnOrder['Settings'],_0x317866=this[_0x40eb55(0x1dc)]();this[_0x40eb55(0x10e)]=0x0,this[_0x40eb55(0x243)]=_0x5db1f5[_0x40eb55(0x270)]?-_0x5db1f5[_0x40eb55(0x1b7)]:this['containerWindow']()[_0x40eb55(0x2d7)],this['_positionTargetY']=0x0,this[_0x40eb55(0x2ac)]=0x0,this['_fadeTarget']=0xff,this['_isAlive']=![],this[_0x40eb55(0xee)]=![],this[_0x40eb55(0x2e6)]=0x0,this[_0x40eb55(0x28c)]=0x0;},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['createChildren']=function(){const _0x292aac=_0x134f45;this[_0x292aac(0x156)](),this['createBackgroundSprite'](),this[_0x292aac(0x19d)](),this[_0x292aac(0x227)](),this[_0x292aac(0xca)]();},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x156)]=function(){const _0x389267=_0x134f45;this['x']=this[_0x389267(0x243)],this['y']=this[_0x389267(0x1a5)];},Sprite_OTB_TurnOrder_Battler['prototype']['isHorz']=function(){return!![];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x134f45(0x208)]=function(){const _0x3b546e=_0x134f45,_0x3274b8=Window_OTB_TurnOrder['Settings'];return _0x3274b8[_0x3b546e(0x1b7)];},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x240)]=function(){const _0x179edd=_0x134f45,_0x2c1026=Window_OTB_TurnOrder[_0x179edd(0x23b)];return _0x2c1026[_0x179edd(0x14b)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x134f45(0x186)]=function(){const _0x2de219=_0x134f45;return this[_0x2de219(0x255)]===$gameParty?'Actor':_0x2de219(0x1e5);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x15a)]=function(){const _0x23d21c=_0x134f45;if(!Window_OTB_TurnOrder[_0x23d21c(0x23b)]['ShowMarkerBg'])return;const _0x4c87e1=Window_OTB_TurnOrder[_0x23d21c(0x23b)],_0x567803=this['getUnitSideSide'](),_0x2ca278=_0x23d21c(0x28b)[_0x23d21c(0x150)](_0x567803),_0x126c54=new Sprite();_0x126c54[_0x23d21c(0xc7)]['x']=this[_0x23d21c(0xc7)]['x'],_0x126c54[_0x23d21c(0xc7)]['y']=this[_0x23d21c(0xc7)]['y'];if(_0x4c87e1[_0x2ca278])_0x126c54[_0x23d21c(0x2e5)]=ImageManager[_0x23d21c(0xe4)](_0x4c87e1[_0x2ca278]);else{const _0x2f5fdf=this[_0x23d21c(0x208)](),_0x860dfe=this[_0x23d21c(0x240)]();_0x126c54[_0x23d21c(0x2e5)]=new Bitmap(_0x2f5fdf,_0x860dfe);const _0x2c91f0=ColorManager[_0x23d21c(0x296)](_0x4c87e1[_0x23d21c(0xd3)['format'](_0x567803)]),_0x5832a1=ColorManager[_0x23d21c(0x296)](_0x4c87e1['%1BgColor2'['format'](_0x567803)]);_0x126c54[_0x23d21c(0x2e5)][_0x23d21c(0x141)](0x0,0x0,_0x2f5fdf,_0x860dfe,_0x2c91f0,_0x5832a1,!![]);}this[_0x23d21c(0x2ae)]=_0x126c54,this[_0x23d21c(0x286)](this[_0x23d21c(0x2ae)]),this['width']=this[_0x23d21c(0x2ae)][_0x23d21c(0x2d7)],this[_0x23d21c(0x2b8)]=this['_backgroundSprite']['height'];},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['createGraphicSprite']=function(){const _0x2972bf=_0x134f45,_0x1980c9=new Sprite();_0x1980c9['anchor']['x']=this['anchor']['x'],_0x1980c9['anchor']['y']=this[_0x2972bf(0xc7)]['y'],this[_0x2972bf(0x2ea)]=_0x1980c9,this[_0x2972bf(0x286)](this[_0x2972bf(0x2ea)]),this[_0x2972bf(0x1d2)]();},Sprite_OTB_TurnOrder_Battler['prototype']['createBorderSprite']=function(){const _0x3c88b9=_0x134f45;if(!Window_OTB_TurnOrder['Settings'][_0x3c88b9(0x2bb)])return;const _0xffba31=Window_OTB_TurnOrder[_0x3c88b9(0x23b)],_0x30c0ec=this['getUnitSideSide'](),_0x582bd0=_0x3c88b9(0x24c)[_0x3c88b9(0x150)](_0x30c0ec),_0x33d894=new Sprite();_0x33d894[_0x3c88b9(0xc7)]['x']=this[_0x3c88b9(0xc7)]['x'],_0x33d894[_0x3c88b9(0xc7)]['y']=this[_0x3c88b9(0xc7)]['y'];if(_0xffba31[_0x582bd0])_0x33d894[_0x3c88b9(0x2e5)]=ImageManager[_0x3c88b9(0xe4)](_0xffba31[_0x582bd0]);else{let _0x5bd4b0=this[_0x3c88b9(0x208)](),_0x45210c=this[_0x3c88b9(0x240)](),_0x324270=this[_0x3c88b9(0x2a0)]();_0x33d894['bitmap']=new Bitmap(_0x5bd4b0,_0x45210c);const _0x4b93a5='#000000',_0x270a73=ColorManager[_0x3c88b9(0x296)](_0xffba31[_0x3c88b9(0x2a8)['format'](_0x30c0ec)]);_0x33d894['bitmap'][_0x3c88b9(0x1f4)](0x0,0x0,_0x5bd4b0,_0x45210c,_0x4b93a5),_0x5bd4b0-=0x2,_0x45210c-=0x2,_0x33d894['bitmap']['fillRect'](0x1,0x1,_0x5bd4b0,_0x45210c,_0x270a73),_0x5bd4b0-=_0x324270*0x2,_0x45210c-=_0x324270*0x2,_0x33d894[_0x3c88b9(0x2e5)][_0x3c88b9(0x1f4)](0x1+_0x324270,0x1+_0x324270,_0x5bd4b0,_0x45210c,_0x4b93a5),_0x5bd4b0-=0x2,_0x45210c-=0x2,_0x324270+=0x1,_0x33d894[_0x3c88b9(0x2e5)]['clearRect'](0x1+_0x324270,0x1+_0x324270,_0x5bd4b0,_0x45210c);}this['_backgroundSprite']=_0x33d894,this[_0x3c88b9(0x286)](this[_0x3c88b9(0x2ae)]);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x2a0)]=function(){const _0x2dd79e=_0x134f45,_0x42c452=Window_OTB_TurnOrder['Settings'];return _0x42c452[_0x2dd79e(0x291)];},Sprite_OTB_TurnOrder_Battler['prototype']['createLetterSprite']=function(){const _0x1d5cd4=_0x134f45,_0x5bdd11=Window_OTB_TurnOrder['Settings'];if(!_0x5bdd11[_0x1d5cd4(0x1ef)])return;if(this[_0x1d5cd4(0x255)]===$gameParty)return;const _0x7815e3=this[_0x1d5cd4(0x208)](),_0x1afbc4=this[_0x1d5cd4(0x240)](),_0x3a2615=new Sprite();_0x3a2615[_0x1d5cd4(0xc7)]['x']=this[_0x1d5cd4(0xc7)]['x'],_0x3a2615['anchor']['y']=this['anchor']['y'],_0x3a2615['bitmap']=new Bitmap(_0x7815e3,_0x1afbc4),this[_0x1d5cd4(0x2af)]=_0x3a2615,this['addChild'](this['_letterSprite']);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['battler']=function(){const _0x1754ee=_0x134f45;return this[_0x1754ee(0x255)]?this[_0x1754ee(0x255)][_0x1754ee(0xe9)]()[this[_0x1754ee(0x21e)]]:null;},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x110)]=function(){const _0x2cebd0=_0x134f45;Sprite_Clickable[_0x2cebd0(0x1c6)][_0x2cebd0(0x110)][_0x2cebd0(0xb2)](this),this['updatePosition'](),this['checkOpacity'](),this['updateOpacity'](),this[_0x2cebd0(0x23e)](),this[_0x2cebd0(0x153)](),this[_0x2cebd0(0x249)](),this[_0x2cebd0(0x12b)]();},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0xe7)]=function(_0x2c1c24,_0x145d80){const _0x12eb22=_0x134f45,_0x42ca8c=Window_OTB_TurnOrder['Settings'];this[_0x12eb22(0x10e)]=_0x42ca8c['UpdateFrames'],this[_0x12eb22(0x243)]=_0x2c1c24,this['_positionTargetY']=_0x145d80;},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x2bc)]=function(){const _0x35af0d=_0x134f45;if(this[_0x35af0d(0x10e)]>0x0){const _0x5e2e01=this['_positionDuration'];this['x']=(this['x']*(_0x5e2e01-0x1)+this[_0x35af0d(0x243)])/_0x5e2e01,this['y']=(this['y']*(_0x5e2e01-0x1)+this['_positionTargetY'])/_0x5e2e01,this[_0x35af0d(0x10e)]--;}if(this[_0x35af0d(0x10e)]<=0x0){this['x']=this['_positionTargetX'],this['y']=this[_0x35af0d(0x1a5)];if(this[_0x35af0d(0x1df)]<0xff&&!this[_0x35af0d(0x189)]&&this[_0x35af0d(0x2ac)]<=0x0){const _0x53f0eb=this[_0x35af0d(0x22b)]();_0x53f0eb&&(this[_0x35af0d(0x1d7)]=_0x53f0eb[_0x35af0d(0x140)]()&&_0x53f0eb[_0x35af0d(0x181)]()?0xff:0x0);}}},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x207)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x134f45(0x187)]=function(){const _0x665728=_0x134f45;return SceneManager[_0x665728(0x27c)][_0x665728(0x2c4)];},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x2e4)]=function(){const _0x1a2fc2=_0x134f45,_0x5c6649=this['battler']();if(!_0x5c6649)return this['defaultPosition']();if(_0x5c6649===BattleManager[_0x1a2fc2(0x257)])return 0x0;if(BattleManager[_0x1a2fc2(0x2c1)][_0x1a2fc2(0x147)](_0x5c6649)){const _0x5888b7=BattleManager['_actionBattlers'][_0x1a2fc2(0x13b)](_0x5c6649)+0x1;return _0x5888b7;}return this[_0x1a2fc2(0x207)]();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x134f45(0xb7)]=function(_0x5e5b89){const _0x7a5494=_0x134f45,_0x2ab656=Window_OTB_TurnOrder[_0x7a5494(0x23b)];this[_0x7a5494(0x2ac)]=_0x2ab656['UpdateFrames'],this[_0x7a5494(0x1d7)]=_0x5e5b89;},Sprite_OTB_TurnOrder_Battler['prototype']['checkOpacity']=function(){const _0x383276=_0x134f45,_0x1261d2=this['battler']();if(!_0x1261d2)return;if(this[_0x383276(0xbb)]===_0x1261d2['isAlive']()&&this[_0x383276(0xee)]===_0x1261d2[_0x383276(0x181)]())return;this[_0x383276(0xbb)]=_0x1261d2['isAlive'](),this[_0x383276(0xee)]=_0x1261d2[_0x383276(0x181)]();let _0x353142=this[_0x383276(0xbb)]&&this['_isAppeared']?0xff:0x0;this[_0x383276(0xb7)](_0x353142);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['updateOpacity']=function(){const _0x53f0e3=_0x134f45;if(this['_fadeDuration']>0x0){const _0x38dafd=this['_fadeDuration'];this[_0x53f0e3(0x1df)]=(this[_0x53f0e3(0x1df)]*(_0x38dafd-0x1)+this[_0x53f0e3(0x1d7)])/_0x38dafd,this[_0x53f0e3(0x2ac)]--,this[_0x53f0e3(0x2ac)]<=0x0&&(this[_0x53f0e3(0x1df)]=this[_0x53f0e3(0x1d7)]);}if(this[_0x53f0e3(0x189)])return;BattleManager[_0x53f0e3(0x185)]===_0x53f0e3(0x19b)&&(this[_0x53f0e3(0x189)]=!![],this['startFade'](0x0));},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x23e)]=function(){const _0x5430bd=_0x134f45,_0x2b405f=this[_0x5430bd(0x22b)]();if(!_0x2b405f)return;const _0x3d1139=Window_OTB_TurnOrder[_0x5430bd(0x23b)],_0x4a34e1=this[_0x5430bd(0x255)]===$gameParty?_0x5430bd(0x137):_0x5430bd(0x1e5);let _0x56efed=_0x2b405f[_0x5430bd(0x1c7)]();if(_0x2b405f['isActor']()&&_0x56efed===_0x5430bd(0xba))_0x56efed=_0x5430bd(0x2ed);else _0x2b405f[_0x5430bd(0xb6)]()&&_0x56efed===_0x5430bd(0x2e8)&&(_0x56efed='enemy');if(this['_graphicType']!==_0x56efed)return this[_0x5430bd(0x1d2)]();switch(this[_0x5430bd(0x14d)]){case _0x5430bd(0x2ed):if(this[_0x5430bd(0x154)]!==_0x2b405f[_0x5430bd(0x2b6)]())return this['processUpdateGraphic']();if(this[_0x5430bd(0xd8)]!==_0x2b405f[_0x5430bd(0x1a3)]())return this[_0x5430bd(0x1d2)]();break;case _0x5430bd(0x260):if(this[_0x5430bd(0x2cd)]!==_0x2b405f[_0x5430bd(0x2ab)]())return this[_0x5430bd(0x1d2)]();break;case'enemy':if(_0x2b405f['hasSvBattler']()){if(this[_0x5430bd(0xf7)]!==_0x2b405f[_0x5430bd(0x1f8)]())return this[_0x5430bd(0x1d2)]();}else{if(this['_graphicEnemy']!==_0x2b405f[_0x5430bd(0x26a)]())return this[_0x5430bd(0x1d2)]();}break;case _0x5430bd(0x2e8):if(_0x2b405f[_0x5430bd(0xd7)]()){if(this[_0x5430bd(0xf7)]!==_0x2b405f[_0x5430bd(0x26a)]())return this[_0x5430bd(0x1d2)]();}else{if(this[_0x5430bd(0x284)]!==_0x2b405f[_0x5430bd(0x26a)]())return this[_0x5430bd(0x1d2)]();}break;}},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['processUpdateGraphic']=function(){const _0x3918f9=_0x134f45,_0x1a4f52=this[_0x3918f9(0x22b)]();if(!_0x1a4f52)return;this['_graphicType']=_0x1a4f52[_0x3918f9(0x1c7)]();if(_0x1a4f52[_0x3918f9(0xd7)]()&&this[_0x3918f9(0x14d)]===_0x3918f9(0xba))this[_0x3918f9(0x14d)]='face';else _0x1a4f52[_0x3918f9(0xb6)]()&&this[_0x3918f9(0x14d)]===_0x3918f9(0x2e8)&&(this[_0x3918f9(0x14d)]=_0x3918f9(0xba));let _0x22ae18;switch(this['_graphicType']){case _0x3918f9(0x2ed):this[_0x3918f9(0x154)]=_0x1a4f52['TurnOrderOTBGraphicFaceName'](),this[_0x3918f9(0xd8)]=_0x1a4f52[_0x3918f9(0x1a3)](),_0x22ae18=ImageManager['loadFace'](this['_graphicFaceName']),_0x22ae18[_0x3918f9(0x1a9)](this[_0x3918f9(0x29d)][_0x3918f9(0x1b8)](this,_0x22ae18));break;case _0x3918f9(0x260):this[_0x3918f9(0x2cd)]=_0x1a4f52[_0x3918f9(0xcf)](),_0x22ae18=ImageManager[_0x3918f9(0xe4)](_0x3918f9(0x16c)),_0x22ae18['addLoadListener'](this['changeIconGraphicBitmap'][_0x3918f9(0x1b8)](this,_0x22ae18));break;case _0x3918f9(0xba):if(_0x1a4f52[_0x3918f9(0x1e8)]())this[_0x3918f9(0xf7)]=_0x1a4f52[_0x3918f9(0x1f8)](),_0x22ae18=ImageManager[_0x3918f9(0x25d)](this[_0x3918f9(0xf7)]),_0x22ae18[_0x3918f9(0x1a9)](this[_0x3918f9(0x180)][_0x3918f9(0x1b8)](this,_0x22ae18));else $gameSystem['isSideView']()?(this[_0x3918f9(0x284)]=_0x1a4f52['battlerName'](),_0x22ae18=ImageManager[_0x3918f9(0x1a0)](this[_0x3918f9(0x284)]),_0x22ae18[_0x3918f9(0x1a9)](this[_0x3918f9(0x14f)][_0x3918f9(0x1b8)](this,_0x22ae18))):(this['_graphicEnemy']=_0x1a4f52[_0x3918f9(0x26a)](),_0x22ae18=ImageManager[_0x3918f9(0x2c2)](this[_0x3918f9(0x284)]),_0x22ae18[_0x3918f9(0x1a9)](this[_0x3918f9(0x14f)]['bind'](this,_0x22ae18)));break;case'svactor':this['_graphicSv']=_0x1a4f52[_0x3918f9(0x26a)](),_0x22ae18=ImageManager['loadSvActor'](this[_0x3918f9(0xf7)]),_0x22ae18[_0x3918f9(0x1a9)](this[_0x3918f9(0x180)][_0x3918f9(0x1b8)](this,_0x22ae18));break;}},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x29d)]=function(_0x364f4d){const _0x5a7a4b=_0x134f45,_0x859a06=this[_0x5a7a4b(0xd8)],_0xa5e541=this[_0x5a7a4b(0x208)](),_0x3ae81c=this[_0x5a7a4b(0x240)](),_0x35141f=Math['max'](_0xa5e541,_0x3ae81c);this['_graphicSprite'][_0x5a7a4b(0x2e5)]=new Bitmap(_0xa5e541,_0x3ae81c);const _0x39310d=this[_0x5a7a4b(0x2ea)][_0x5a7a4b(0x2e5)],_0x501d87=ImageManager['faceWidth'],_0x439929=ImageManager[_0x5a7a4b(0xeb)],_0x2a1e27=_0x35141f/Math[_0x5a7a4b(0x10b)](_0x501d87,_0x439929),_0x324845=ImageManager[_0x5a7a4b(0x107)],_0x4433b8=ImageManager[_0x5a7a4b(0xeb)],_0x367d3f=_0x859a06%0x4*_0x501d87+(_0x501d87-_0x324845)/0x2,_0x4ccd45=Math[_0x5a7a4b(0x282)](_0x859a06/0x4)*_0x439929+(_0x439929-_0x4433b8)/0x2,_0x3467a0=(_0xa5e541-_0x501d87*_0x2a1e27)/0x2,_0xe5396b=(_0x3ae81c-_0x439929*_0x2a1e27)/0x2;_0x39310d['blt'](_0x364f4d,_0x367d3f,_0x4ccd45,_0x324845,_0x4433b8,_0x3467a0,_0xe5396b,_0x35141f,_0x35141f);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x134f45(0x127)]=function(_0x5611f9){const _0x22b9bd=_0x134f45,_0x1ebea8=this[_0x22b9bd(0x2cd)],_0x299793=this['bitmapWidth'](),_0x26be42=this[_0x22b9bd(0x240)]();this[_0x22b9bd(0x2ea)]['bitmap']=new Bitmap(_0x299793,_0x26be42);const _0x29cd5c=this['_graphicSprite'][_0x22b9bd(0x2e5)],_0x8c593e=ImageManager['iconWidth'],_0x4f9cc5=ImageManager[_0x22b9bd(0x1d5)],_0x5a1e70=Math[_0x22b9bd(0xf1)](_0x8c593e,_0x4f9cc5,_0x299793,_0x26be42),_0xb326ac=_0x1ebea8%0x10*_0x8c593e,_0x525515=Math[_0x22b9bd(0x282)](_0x1ebea8/0x10)*_0x4f9cc5,_0x5abbac=Math[_0x22b9bd(0x282)](Math[_0x22b9bd(0x10b)](_0x299793-_0x5a1e70,0x0)/0x2),_0x315d81=Math[_0x22b9bd(0x282)](Math[_0x22b9bd(0x10b)](_0x26be42-_0x5a1e70,0x0)/0x2);_0x29cd5c[_0x22b9bd(0x1a1)](_0x5611f9,_0xb326ac,_0x525515,_0x8c593e,_0x4f9cc5,_0x5abbac,_0x315d81,_0x5a1e70,_0x5a1e70);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x180)]=function(_0x80e4a4){const _0x3eba05=_0x134f45,_0x4c55c4=this['bitmapWidth'](),_0x110a37=this[_0x3eba05(0x240)](),_0x4c1965=Math[_0x3eba05(0xf1)](_0x4c55c4,_0x110a37);this[_0x3eba05(0x2ea)]['bitmap']=new Bitmap(_0x4c55c4,_0x110a37);const _0x8e8483=this[_0x3eba05(0x2ea)]['bitmap'],_0x1ca593=this[_0x3eba05(0xf7)][_0x3eba05(0x2d9)](/\$/i),_0x248fb2=_0x1ca593?0x1:ImageManager[_0x3eba05(0x1da)],_0x3a8396=_0x1ca593?0x1:ImageManager[_0x3eba05(0x173)],_0x5e8ba6=_0x80e4a4[_0x3eba05(0x2d7)]/_0x248fb2,_0x2d46d5=_0x80e4a4['height']/_0x3a8396,_0x31c939=Math['min'](0x1,_0x4c1965/_0x5e8ba6,_0x4c1965/_0x2d46d5),_0x6b29ad=_0x5e8ba6*_0x31c939,_0x35fe54=_0x2d46d5*_0x31c939,_0x5bb86a=Math['round']((_0x4c55c4-_0x6b29ad)/0x2),_0x479a70=Math['round']((_0x110a37-_0x35fe54)/0x2);_0x8e8483[_0x3eba05(0x1a1)](_0x80e4a4,0x0,0x0,_0x5e8ba6,_0x2d46d5,_0x5bb86a,_0x479a70,_0x6b29ad,_0x35fe54);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x14f)]=function(_0x438341){const _0x2430a9=_0x134f45,_0x246724=Window_OTB_TurnOrder['Settings'],_0x579e22=this[_0x2430a9(0x208)](),_0x5b28ea=this['bitmapHeight'](),_0x552886=Math[_0x2430a9(0xf1)](_0x579e22,_0x5b28ea);this[_0x2430a9(0x2ea)][_0x2430a9(0x2e5)]=new Bitmap(_0x579e22,_0x5b28ea);const _0x46ed22=this[_0x2430a9(0x2ea)][_0x2430a9(0x2e5)],_0x2ea1c5=Math[_0x2430a9(0xf1)](0x1,_0x552886/_0x438341['width'],_0x552886/_0x438341['height']),_0x21bd5d=_0x438341[_0x2430a9(0x2d7)]*_0x2ea1c5,_0x3892de=_0x438341[_0x2430a9(0x2b8)]*_0x2ea1c5,_0x2d750f=Math[_0x2430a9(0x20b)]((_0x579e22-_0x21bd5d)/0x2),_0x4364f8=Math[_0x2430a9(0x20b)]((_0x5b28ea-_0x3892de)/0x2);_0x46ed22[_0x2430a9(0x1a1)](_0x438341,0x0,0x0,_0x438341[_0x2430a9(0x2d7)],_0x438341[_0x2430a9(0x2b8)],_0x2d750f,_0x4364f8,_0x21bd5d,_0x3892de);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['updateGraphicHue']=function(){const _0x252cbb=_0x134f45,_0x10d16b=this[_0x252cbb(0x22b)]();if(!_0x10d16b)return;if(!_0x10d16b[_0x252cbb(0xb6)]())return;if(this[_0x252cbb(0x1b9)]===_0x10d16b[_0x252cbb(0x1a4)]())return;this[_0x252cbb(0x1b9)]=_0x10d16b['battlerHue'](),this[_0x252cbb(0x2ea)][_0x252cbb(0xe0)](_0x10d16b[_0x252cbb(0x1e8)]()?0x0:this['_graphicHue']);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x249)]=function(){const _0x282680=_0x134f45;if(!this['_letterSprite'])return;const _0x8fa867=this['battler']();if(!_0x8fa867)return;if(this[_0x282680(0x1d4)]===_0x8fa867['_letter']&&this['_plural']===_0x8fa867[_0x282680(0x2b1)])return;this[_0x282680(0x1d4)]=_0x8fa867[_0x282680(0x1d4)],this['_plural']=_0x8fa867[_0x282680(0x2b1)];const _0x437ece=Window_OTB_TurnOrder[_0x282680(0x23b)],_0x1c4d8f=this[_0x282680(0x208)](),_0x563c2e=this[_0x282680(0x240)](),_0x462014=this[_0x282680(0x2af)][_0x282680(0x2e5)];_0x462014[_0x282680(0x198)]();if(!this[_0x282680(0x2b1)])return;_0x462014[_0x282680(0x246)]=_0x437ece[_0x282680(0x218)]||$gameSystem[_0x282680(0x15b)](),_0x462014['fontSize']=_0x437ece[_0x282680(0x100)]||0x10,_0x437ece[_0x282680(0x270)]?_0x462014[_0x282680(0x176)](this[_0x282680(0x1d4)][_0x282680(0x19a)](),_0x1c4d8f*0x1/0x8,_0x563c2e/0x2,_0x1c4d8f,_0x563c2e/0x2,_0x282680(0x21d)):_0x462014[_0x282680(0x176)](this[_0x282680(0x1d4)][_0x282680(0x19a)](),0x0,_0x563c2e/0x2,_0x1c4d8f*0x7/0x8,_0x563c2e/0x2,'right');},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['updateSelectionEffect']=function(){const _0x52ab9c=_0x134f45,_0x197d00=this[_0x52ab9c(0x22b)]();if(!_0x197d00)return;const _0x418559=_0x197d00[_0x52ab9c(0x22b)]();if(!_0x418559)return;const _0x1ac502=_0x418559[_0x52ab9c(0xef)]();if(!_0x1ac502)return;this[_0x52ab9c(0x13f)](_0x1ac502[_0x52ab9c(0x210)]);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x288)]=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['changeSourceArray']=function(_0x2002cc){const _0x4668ac=_0x134f45;this[_0x4668ac(0x12a)]=_0x2002cc,this[_0x4668ac(0x167)](),this[_0x4668ac(0x12a)]===null&&(this['_instance']=-0x1);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x167)]=function(){const _0x44dff7=_0x134f45,_0x23c827=this[_0x44dff7(0x187)]();if(!_0x23c827)return;const _0x6e23f7=Window_OTB_TurnOrder['Settings'],_0x5beec8=_0x6e23f7['OrderDirection'],_0xa7c1c0=this['_sourceArray']===_0x23c827[_0x44dff7(0x234)]?!![]:![],_0x565cba=this[_0x44dff7(0x23f)]===-0x1&&BattleManager[_0x44dff7(0x257)]===this['battler'](),_0x1dbb86=_0x23c827[_0x44dff7(0x1f7)]-_0x6e23f7[_0x44dff7(0x1b7)];let _0x570b81=Math[_0x44dff7(0x215)](_0x1dbb86/(this[_0x44dff7(0x12a)]['length']-0x1||0x1));_0x570b81=Math[_0x44dff7(0xf1)](_0x6e23f7[_0x44dff7(0x1b7)],_0x570b81);let _0x46c2cb=0x0,_0x142e49=0x0,_0x52152e=_0x565cba?-0x1:this['_sourceArray'][_0x44dff7(0x13b)](this);!_0x565cba&&(_0x52152e=this[_0x44dff7(0x2d5)]());if(_0x565cba)_0x46c2cb=_0x23c827[_0x44dff7(0x23d)];else _0x5beec8?(_0x46c2cb=(_0xa7c1c0?_0x23c827[_0x44dff7(0x268)]:_0x23c827['_currentX'])+_0x1dbb86,_0x46c2cb-=_0x52152e*_0x570b81):(_0x46c2cb=_0xa7c1c0?_0x23c827[_0x44dff7(0x268)]:_0x23c827['_currentX'],_0x46c2cb+=_0x52152e*_0x570b81);_0x46c2cb+=this[_0x44dff7(0x1ad)](_0x52152e,_0x6e23f7[_0x44dff7(0x1b7)]-_0x570b81),!_0x565cba&&_0x52152e<0x0&&(_0x46c2cb=this['x'],_0x142e49=this['y'],this[_0x44dff7(0xb7)](0x0)),this[_0x44dff7(0xe7)](_0x46c2cb,_0x142e49);},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)][_0x134f45(0x1ad)]=function(_0x2adbc4,_0x3fa918){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]['calculateTargetIndex']=function(){const _0x4c58cb=_0x134f45,_0x5c3f42=this[_0x4c58cb(0x187)]();if(!_0x5c3f42)return 0x0;const _0x1875b8=this[_0x4c58cb(0x12a)]===_0x5c3f42[_0x4c58cb(0x234)]?!![]:![],_0x2dcbba=_0x1875b8?BattleManager['_otb_actionBattlersNext']:BattleManager[_0x4c58cb(0x2c1)],_0x2ace37=this[_0x4c58cb(0x22b)](),_0x8c347c=VisuMZ[_0x4c58cb(0x108)]['GetAllIndicies'](_0x2ace37,_0x2dcbba);return _0x8c347c[this[_0x4c58cb(0x23f)]]??_0x8c347c[_0x8c347c[_0x4c58cb(0xf0)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){this['initialize'](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)]=Object[_0x134f45(0x199)](Sprite_OTB_TurnOrder_Battler[_0x134f45(0x1c6)]),Sprite_OTB_TurnOrder_Preview['prototype'][_0x134f45(0x2a5)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)][_0x134f45(0x1c3)]=function(_0x146ee8,_0x200df7,_0x4c4cc6,_0x334c3e){const _0x53e328=_0x134f45;this[_0x53e328(0x253)]=_0x334c3e,Sprite_OTB_TurnOrder_Battler[_0x53e328(0x1c6)][_0x53e328(0x1c3)]['call'](this,_0x146ee8,_0x200df7,_0x4c4cc6),this['adjustForPreview']();},Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)][_0x134f45(0x1b5)]=function(){const _0x1e05fb=_0x134f45,_0x14e51b=Window_OTB_TurnOrder['Settings'];this['scale']['x']=this['scale']['y']=_0x14e51b[_0x1e05fb(0x164)];},Sprite_OTB_TurnOrder_Preview['prototype'][_0x134f45(0x186)]=function(){const _0xad831b=_0x134f45;return this[_0xad831b(0x255)]===$gameParty?_0xad831b(0xad):'PreviewEnemy';},Sprite_OTB_TurnOrder_Preview['prototype'][_0x134f45(0x2a0)]=function(){const _0x30a56e=_0x134f45,_0x117e02=Window_OTB_TurnOrder[_0x30a56e(0x23b)];return Math[_0x30a56e(0x215)](_0x117e02['BorderThickness']/(_0x117e02['PreviewScale']||0.01));},Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)][_0x134f45(0xe7)]=function(_0x53a087,_0x43b322){const _0x50c598=_0x134f45;Sprite_OTB_TurnOrder_Battler[_0x50c598(0x1c6)][_0x50c598(0xe7)][_0x50c598(0xb2)](this,_0x53a087,_0x43b322),this['x']=this['_positionTargetX'],this['y']=this[_0x50c598(0x1a5)];},Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)]['startFade']=function(_0x38c486){const _0x5e92bc=_0x134f45;Sprite_OTB_TurnOrder_Battler['prototype'][_0x5e92bc(0xb7)][_0x5e92bc(0xb2)](this,_0x38c486),_0x38c486>0x0?this[_0x5e92bc(0x2ac)]=0x1:(this['_fadeDuration']/=0x2,this[_0x5e92bc(0x2ac)]=Math['floor'](this[_0x5e92bc(0x2ac)]));},Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)][_0x134f45(0x1ad)]=function(_0x47af21,_0x4cee35){const _0x1c23a9=_0x134f45,_0x403edf=Window_OTB_TurnOrder[_0x1c23a9(0x23b)];if(_0x47af21>0x0){if(this[_0x1c23a9(0x253)]>0x0)return _0x403edf['OrderDirection']?-_0x403edf['SpriteThin']:_0x403edf[_0x1c23a9(0x1b7)];else{if(this[_0x1c23a9(0x253)]<0x0)return _0x403edf[_0x1c23a9(0x270)]?-_0x4cee35:_0x4cee35;}}return 0x0;},Sprite_OTB_TurnOrder_Preview[_0x134f45(0x1c6)][_0x134f45(0x2d5)]=function(){const _0x380e31=_0x134f45,_0x212b4a=this['containerWindow'](),_0x7badd3=this[_0x380e31(0x12a)]===_0x212b4a['_nextTurn']?!![]:![],_0x5c6938=_0x7badd3?BattleManager[_0x380e31(0x252)]:BattleManager[_0x380e31(0x2c1)];let _0x2f15fb=0x0,_0x11039b=_0x5c6938[_0x380e31(0xf0)]-0x1;_0x7badd3&&(_0x2f15fb=Math[_0x380e31(0x10b)](0x0,VisuMZ[_0x380e31(0x108)][_0x380e31(0x144)](_0x5c6938)));let _0x384ace=Sprite_OTB_TurnOrder_Battler['prototype'][_0x380e31(0x2d5)][_0x380e31(0xb2)](this);return _0x384ace+=this['_offset'],_0x384ace[_0x380e31(0x196)](_0x2f15fb,_0x11039b);},Sprite_OTB_TurnOrder_Preview['prototype'][_0x134f45(0x12b)]=function(){},Window_Selectable['prototype'][_0x134f45(0x183)]=function(){return![];},VisuMZ['BattleSystemOTB'][_0x134f45(0x24e)]=Window_Selectable[_0x134f45(0x1c6)]['select'],Window_Selectable['prototype'][_0x134f45(0x222)]=function(_0x16fd16){const _0x5165ce=_0x134f45;VisuMZ[_0x5165ce(0x108)][_0x5165ce(0x24e)]['call'](this,_0x16fd16),this[_0x5165ce(0x183)]()&&this['active']&&this[_0x5165ce(0xc6)]();},Window_Selectable['prototype'][_0x134f45(0xc6)]=function(){const _0x197efc=_0x134f45;BattleManager[_0x197efc(0xac)]();},VisuMZ['BattleSystemOTB']['Window_Help_setItem']=Window_Help[_0x134f45(0x1c6)][_0x134f45(0x131)],Window_Help['prototype'][_0x134f45(0x131)]=function(_0xe7c668){const _0x1ad146=_0x134f45;BattleManager[_0x1ad146(0x16f)]()&&_0xe7c668&&_0xe7c668['note']&&_0xe7c668[_0x1ad146(0x26f)][_0x1ad146(0x2d9)](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this[_0x1ad146(0x275)](String(RegExp['$1'])):VisuMZ[_0x1ad146(0x108)][_0x1ad146(0x233)][_0x1ad146(0xb2)](this,_0xe7c668);},Window_ActorCommand[_0x134f45(0x1c6)][_0x134f45(0x183)]=function(){const _0x28ed7a=_0x134f45;return BattleManager[_0x28ed7a(0x16f)]();},Window_ActorCommand[_0x134f45(0x1c6)][_0x134f45(0xc6)]=function(){const _0x2055f7=_0x134f45,_0x2bfff3=BattleManager[_0x2055f7(0x1fd)]();if(_0x2bfff3){const _0x2506b7=this[_0x2055f7(0x193)]();switch(_0x2506b7){case'attack':_0x2bfff3[_0x2055f7(0x112)]();break;case _0x2055f7(0x1bc):_0x2bfff3['setGuard']();break;case _0x2055f7(0x2ba):_0x2bfff3[_0x2055f7(0x27b)](this[_0x2055f7(0x2c8)]());break;default:_0x2bfff3[_0x2055f7(0x27b)](null);break;}}Window_Command[_0x2055f7(0x1c6)][_0x2055f7(0xc6)]['call'](this);},Window_BattleSkill[_0x134f45(0x1c6)][_0x134f45(0x183)]=function(){const _0x2a34c4=_0x134f45;return BattleManager[_0x2a34c4(0x16f)]();},Window_BattleSkill[_0x134f45(0x1c6)][_0x134f45(0xc6)]=function(){const _0x4637f6=_0x134f45,_0x6b729c=this[_0x4637f6(0x2ca)](),_0x4bae3a=BattleManager[_0x4637f6(0x1fd)]();if(_0x4bae3a)_0x4bae3a[_0x4637f6(0x27b)](_0x6b729c?_0x6b729c['id']:null);Window_SkillList[_0x4637f6(0x1c6)][_0x4637f6(0xc6)][_0x4637f6(0xb2)](this);},Window_BattleItem[_0x134f45(0x1c6)][_0x134f45(0x183)]=function(){const _0x33d7ce=_0x134f45;return BattleManager[_0x33d7ce(0x16f)]();},Window_BattleItem[_0x134f45(0x1c6)][_0x134f45(0xc6)]=function(){const _0x3ebe2e=_0x134f45,_0x4f0dba=this[_0x3ebe2e(0x2ca)](),_0x479453=BattleManager[_0x3ebe2e(0x1fd)]();if(_0x479453)_0x479453[_0x3ebe2e(0x131)](_0x4f0dba?_0x4f0dba['id']:null);Window_ItemList[_0x3ebe2e(0x1c6)][_0x3ebe2e(0xc6)][_0x3ebe2e(0xb2)](this);},Window_BattleActor[_0x134f45(0x1c6)][_0x134f45(0x183)]=function(){const _0x58a6dc=_0x134f45;return BattleManager[_0x58a6dc(0x16f)]();},Window_BattleEnemy[_0x134f45(0x1c6)][_0x134f45(0x183)]=function(){const _0x1b24b7=_0x134f45;return BattleManager[_0x1b24b7(0x16f)]();};function Window_OTB_TurnOrder(){const _0x535bd5=_0x134f45;this[_0x535bd5(0x1c3)](...arguments);}Window_OTB_TurnOrder[_0x134f45(0x1c6)]=Object[_0x134f45(0x199)](Window_Base[_0x134f45(0x1c6)]),Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x2a5)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x134f45(0x23b)]=VisuMZ[_0x134f45(0x108)]['Settings'][_0x134f45(0x299)],Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x1c3)]=function(){const _0x1cbff4=_0x134f45,_0xe6f17e=this[_0x1cbff4(0x294)]();this[_0x1cbff4(0x1b2)](_0xe6f17e),Window_Base[_0x1cbff4(0x1c6)][_0x1cbff4(0x1c3)][_0x1cbff4(0xb2)](this,_0xe6f17e),this[_0x1cbff4(0x1df)]=0x0,this['drawDimmedArea'](),this[_0x1cbff4(0x12d)](),this['createSpriteContainers'](),this[_0x1cbff4(0x26e)]();},Window_OTB_TurnOrder['prototype'][_0x134f45(0x294)]=function(){const _0x2a3271=_0x134f45,_0x921c41=Window_OTB_TurnOrder['Settings'],_0x331168=SceneManager[_0x2a3271(0x27c)][_0x2a3271(0x148)][_0x2a3271(0x2b8)];let _0x435553=Graphics[_0x2a3271(0x2d7)]-_0x921c41[_0x2a3271(0x2a2)]*0x2,_0x3fb0cf=_0x921c41['SpriteLength']+this[_0x2a3271(0xda)](),_0x22177a=_0x921c41[_0x2a3271(0x2a2)],_0x3ee6e1=0x0;switch(_0x921c41[_0x2a3271(0xd9)]){case _0x2a3271(0x1e7):_0x3ee6e1=Graphics['height']-_0x331168-_0x921c41[_0x2a3271(0x2a2)]-_0x3fb0cf;break;default:_0x3ee6e1=_0x921c41['ScreenBuffer'];break;}if(Imported['VisuMZ_3_SideviewBattleUI']&&BattleManager[_0x2a3271(0x22c)]()){const _0x38f140=VisuMZ['SideviewBattleUI'][_0x2a3271(0x23b)]['StatusWindow'];_0x435553-=_0x38f140[_0x2a3271(0x262)]+_0x38f140[_0x2a3271(0x130)],_0x435553-=_0x921c41[_0x2a3271(0x2a2)];}return _0x22177a+=_0x921c41['DisplayOffsetX']||0x0,_0x3ee6e1+=_0x921c41[_0x2a3271(0x1ea)]||0x0,new Rectangle(_0x22177a,_0x3ee6e1,_0x435553,_0x3fb0cf);},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x1b2)]=function(_0x276622){const _0x13df94=_0x134f45;this['_targetHomeX']=this['_homeX']=_0x276622['x'],this[_0x13df94(0x120)]=this[_0x13df94(0x216)]=_0x276622['y'],this[_0x13df94(0x2c3)]=0x0;const _0x55a7b1=Window_OTB_TurnOrder[_0x13df94(0x23b)];this[_0x13df94(0x1f7)]=Math[_0x13df94(0x215)]((_0x276622[_0x13df94(0x2d7)]-_0x55a7b1[_0x13df94(0x1b7)]-_0x55a7b1['SubjectDistance']*0x2)/0x2),_0x55a7b1[_0x13df94(0x270)]?(this[_0x13df94(0x23d)]=_0x276622[_0x13df94(0x2d7)]-_0x55a7b1['SpriteThin'],this[_0x13df94(0x2c7)]=this[_0x13df94(0x1f7)]+_0x55a7b1[_0x13df94(0x25b)],this['_nextX']=0x0):(this['_subjectX']=0x0,this['_currentX']=_0x55a7b1[_0x13df94(0x1b7)]+_0x55a7b1[_0x13df94(0x25b)],this[_0x13df94(0x268)]=this[_0x13df94(0x2c7)]+_0x55a7b1['SubjectDistance']+this[_0x13df94(0x1f7)]);},Window_OTB_TurnOrder[_0x134f45(0x1c6)]['updatePadding']=function(){this['padding']=0x0;},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x13c)]=function(){const _0x5b2009=_0x134f45,_0x5571e5=Window_OTB_TurnOrder['Settings'];if(_0x5571e5['BgDimStyle']===_0x5b2009(0x172))return;if(_0x5571e5['BgDimStyle']==='image'&&_0x5571e5['BgImageFilename']!==''){const _0x5e0a8e=ImageManager[_0x5b2009(0xe4)](_0x5571e5[_0x5b2009(0xab)]);_0x5e0a8e['addLoadListener'](this['drawBgImage'][_0x5b2009(0x1b8)](this,_0x5e0a8e));return;};const _0x45018c=this[_0x5b2009(0x155)],_0x350df4=ColorManager[_0x5b2009(0x2cf)](),_0x2450d6=ColorManager[_0x5b2009(0x1e3)](),_0xd0970=this['_subjectX'],_0x2bccb8=_0x5571e5[_0x5b2009(0x1b7)],_0x5967da=0x0,_0x573ce5=_0x5571e5[_0x5b2009(0x14b)],_0x3e543e=this['_currentX'],_0x2aeac8=this[_0x5b2009(0x268)],_0x4d5f84=this[_0x5b2009(0x1f7)];switch(_0x5571e5['BgDimStyle']){case _0x5b2009(0xfb):_0x5571e5[_0x5b2009(0x270)]?(_0x45018c[_0x5b2009(0x141)](_0xd0970,_0x5967da,_0x2bccb8/0x2,_0x573ce5,_0x2450d6,_0x350df4,![]),_0x45018c[_0x5b2009(0x1f4)](_0xd0970+_0x2bccb8/0x2,_0x5967da,_0x2bccb8/0x2,_0x573ce5,_0x350df4),_0x45018c[_0x5b2009(0x141)](_0x3e543e,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x2450d6,_0x350df4,![]),_0x45018c[_0x5b2009(0x1f4)](_0x3e543e+_0x4d5f84/0x2,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x350df4),_0x45018c[_0x5b2009(0x141)](_0x2aeac8,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x2450d6,_0x350df4,![]),_0x45018c['fillRect'](_0x2aeac8+_0x4d5f84/0x2,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x350df4)):(_0x45018c[_0x5b2009(0x1f4)](_0xd0970,_0x5967da,_0x2bccb8/0x2,_0x573ce5,_0x350df4),_0x45018c[_0x5b2009(0x141)](_0xd0970+_0x2bccb8/0x2,_0x5967da,_0x2bccb8/0x2,_0x573ce5,_0x350df4,_0x2450d6,![]),_0x45018c['fillRect'](_0x3e543e,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x350df4),_0x45018c['gradientFillRect'](_0x3e543e+_0x4d5f84/0x2,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x350df4,_0x2450d6,![]),_0x45018c[_0x5b2009(0x1f4)](_0x2aeac8,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x350df4),_0x45018c['gradientFillRect'](_0x2aeac8+_0x4d5f84/0x2,_0x5967da,_0x4d5f84/0x2,_0x573ce5,_0x350df4,_0x2450d6,![]));break;default:_0x45018c[_0x5b2009(0x1f4)](_0xd0970,_0x5967da,_0x2bccb8,_0x573ce5,_0x350df4),_0x45018c['fillRect'](_0x3e543e,_0x5967da,_0x4d5f84,_0x573ce5,_0x350df4),_0x45018c[_0x5b2009(0x1f4)](_0x2aeac8,_0x5967da,_0x4d5f84,_0x573ce5,_0x350df4);break;}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x16b)]=function(_0x28d8d7){const _0x413945=_0x134f45;this[_0x413945(0x292)]=new Sprite(),this[_0x413945(0x292)][_0x413945(0x2e5)]=_0x28d8d7,this['addChildToBack'](this['_bgImageSprite']);const _0x408a70=Window_OTB_TurnOrder[_0x413945(0x23b)];this['_bgImageSprite']['x']=_0x408a70[_0x413945(0x2dd)],this[_0x413945(0x292)]['y']=_0x408a70[_0x413945(0xd1)];},Window_OTB_TurnOrder['prototype'][_0x134f45(0x12d)]=function(){const _0x136a55=_0x134f45;this[_0x136a55(0x2b5)][_0x136a55(0x198)](),this[_0x136a55(0x220)]();const _0x4c56d8=Window_OTB_TurnOrder[_0x136a55(0x23b)];this[_0x136a55(0x2b5)][_0x136a55(0x142)]=_0x4c56d8[_0x136a55(0x297)];let _0x577c69=_0x4c56d8[_0x136a55(0x136)];_0x577c69===_0x136a55(0xed)&&(_0x577c69=_0x4c56d8[_0x136a55(0x270)]?_0x136a55(0x14e):_0x136a55(0x21d));let _0x85e68f=_0x4c56d8[_0x136a55(0x14b)];if(_0x4c56d8['UiSubjectText']!==''){const _0x4ad809=this[_0x136a55(0x23d)]+_0x4c56d8[_0x136a55(0x1c5)],_0x1a529a=_0x85e68f+_0x4c56d8[_0x136a55(0x101)],_0x56d920=_0x4c56d8[_0x136a55(0x1b7)];this['drawText'](_0x4c56d8[_0x136a55(0x200)],_0x4ad809,_0x1a529a,_0x56d920,'center');}if(_0x4c56d8[_0x136a55(0x18e)]!==''){const _0x5d30c8=this[_0x136a55(0x2c7)]+_0x4c56d8[_0x136a55(0x263)],_0x3ee7b9=_0x85e68f+_0x4c56d8['UiCurrentOffsetY'],_0x92507c=this['_spriteGroupWidth'];this[_0x136a55(0x176)](_0x4c56d8[_0x136a55(0x18e)],_0x5d30c8,_0x3ee7b9,_0x92507c,_0x577c69);}if(_0x4c56d8[_0x136a55(0xd4)]!==''){const _0x19c284=this[_0x136a55(0x268)]+_0x4c56d8[_0x136a55(0xcb)],_0x4b4481=_0x85e68f+_0x4c56d8['UiNextOffsetY'],_0x2b939a=this['_spriteGroupWidth'];this[_0x136a55(0x176)](_0x4c56d8[_0x136a55(0xd4)],_0x19c284,_0x4b4481,_0x2b939a,_0x577c69);}},Window_OTB_TurnOrder['prototype'][_0x134f45(0x2e9)]=function(){const _0x1513a9=_0x134f45,_0x264327=Window_OTB_TurnOrder[_0x1513a9(0x23b)];this[_0x1513a9(0xe1)]=new Sprite(),this[_0x1513a9(0x286)](this[_0x1513a9(0xe1)]),this[_0x1513a9(0x257)]=null,this[_0x1513a9(0x1be)]=[],this[_0x1513a9(0x234)]=[],this[_0x1513a9(0x1c9)]=new Sprite(),this['_previewContainer']['x']=_0x264327[_0x1513a9(0xbc)],this[_0x1513a9(0x1c9)]['y']=_0x264327[_0x1513a9(0xf6)],this[_0x1513a9(0x1c9)]['x']-=Math[_0x1513a9(0x215)](_0x264327[_0x1513a9(0x1b7)]*0.5*_0x264327[_0x1513a9(0x164)]),_0x264327[_0x1513a9(0x270)]&&(this[_0x1513a9(0x1c9)]['x']+=_0x264327[_0x1513a9(0x1b7)]),this['_previewContainer']['y']-=Math[_0x1513a9(0x215)](_0x264327['SpriteLength']*0.5*_0x264327[_0x1513a9(0x164)]),this[_0x1513a9(0x286)](this[_0x1513a9(0x1c9)]),this['_previewCurrent']=[],this['_previewNext']=[];},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x110)]=function(){const _0x2c0274=_0x134f45;Window_Base[_0x2c0274(0x1c6)]['update'][_0x2c0274(0xb2)](this),this[_0x2c0274(0x118)](),this[_0x2c0274(0x2bc)](),this[_0x2c0274(0x26e)](),this[_0x2c0274(0x225)]();},Window_OTB_TurnOrder['prototype'][_0x134f45(0xc8)]=function(){const _0x31621f=_0x134f45;this[_0x31621f(0x15f)]=!![];},Window_OTB_TurnOrder[_0x134f45(0x1c6)]['updateTurnOrders']=function(){const _0xf35090=_0x134f45;if(!this[_0xf35090(0x15f)])return;this[_0xf35090(0x15f)]=![];for(const _0x1b05d9 of this[_0xf35090(0x1be)]){if(!_0x1b05d9)continue;_0x1b05d9[_0xf35090(0x167)]();}for(const _0x29c2ee of this[_0xf35090(0x234)]){if(!_0x29c2ee)continue;_0x29c2ee[_0xf35090(0x167)]();}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x2bc)]=function(){const _0x55d69d=_0x134f45,_0x32609e=Window_OTB_TurnOrder[_0x55d69d(0x23b)];if(_0x32609e['DisplayPosition']!==_0x55d69d(0x213))return;if(!_0x32609e[_0x55d69d(0x1f9)])return;const _0x3b1ea9=SceneManager[_0x55d69d(0x27c)][_0x55d69d(0x266)];if(!_0x3b1ea9)return;_0x3b1ea9[_0x55d69d(0xec)]?(this['x']=this[_0x55d69d(0x129)]+(_0x32609e[_0x55d69d(0x15d)]||0x0),this['y']=this[_0x55d69d(0x216)]+(_0x32609e[_0x55d69d(0x1ab)]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x55d69d(0x216)]);const _0x49b6f0=SceneManager[_0x55d69d(0x27c)]['_windowLayer'];Window_OTB_TurnOrder[_0x55d69d(0xd5)]===undefined&&(Window_OTB_TurnOrder[_0x55d69d(0xd5)]=Math[_0x55d69d(0x20b)]((Graphics['width']-Math[_0x55d69d(0xf1)](Graphics[_0x55d69d(0x2a7)],_0x49b6f0['width']))/0x2));Window_OTB_TurnOrder[_0x55d69d(0x1fa)]===undefined&&(Window_OTB_TurnOrder[_0x55d69d(0x1fa)]=Math[_0x55d69d(0x20b)]((Graphics['height']-Math[_0x55d69d(0xf1)](Graphics[_0x55d69d(0x211)],_0x49b6f0['height']))/0x2));;this['x']+=_0x49b6f0['x']-Window_OTB_TurnOrder['_ogWindowLayerX'],this['y']+=_0x49b6f0['y']-Window_OTB_TurnOrder['_ogWindowLayerY'];},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x26e)]=function(){const _0x277e20=_0x134f45;this[_0x277e20(0xec)]=$gameSystem[_0x277e20(0x1c1)]();if(BattleManager[_0x277e20(0x185)]===_0x277e20(0x19b)){if(!this[_0x277e20(0xe2)]){const _0x62713f=Window_OTB_TurnOrder[_0x277e20(0x23b)];this[_0x277e20(0xe2)]=Math[_0x277e20(0x215)](0xff/(_0x62713f['UpdateFrames']||0x1));}this['opacity']-=this[_0x277e20(0xe2)],this['contentsOpacity']-=this[_0x277e20(0xe2)],this[_0x277e20(0x203)][_0x277e20(0x1df)]-=this[_0x277e20(0xe2)];}},Window_OTB_TurnOrder[_0x134f45(0x1c6)]['sortContainer']=function(){const _0x15472c=_0x134f45;if(!this[_0x15472c(0xe1)])return;const _0x4def83=Window_OTB_TurnOrder['Settings'],_0x39ca20=_0x4def83['OrderDirection'];_0x39ca20?this[_0x15472c(0xe1)][_0x15472c(0x1db)][_0x15472c(0xe3)]((_0x1bd364,_0x4c52f1)=>_0x1bd364['x']-_0x4c52f1['x']):this['_spriteContainer'][_0x15472c(0x1db)][_0x15472c(0xe3)]((_0xf92145,_0x343214)=>_0x343214['x']-_0xf92145['x']);},Window_OTB_TurnOrder[_0x134f45(0x1c6)]['removeSprite']=function(_0x4a7b4c){const _0x2a4a68=_0x134f45;if(!_0x4a7b4c)return;_0x4a7b4c[_0x2a4a68(0x12a)]&&_0x4a7b4c['_sourceArray'][_0x2a4a68(0x239)](_0x4a7b4c);const _0xd7aa4a=Window_OTB_TurnOrder['Settings'],_0x324d81=0x3e8/0x3c*_0xd7aa4a[_0x2a4a68(0x258)]+0x1f4;_0x4a7b4c[_0x2a4a68(0xb7)](0x0),setTimeout(this[_0x2a4a68(0x132)][_0x2a4a68(0x1b8)](this,_0x4a7b4c),_0x324d81);},Window_OTB_TurnOrder[_0x134f45(0x1c6)]['processSpriteRemoval']=function(_0x4985da){const _0x2e2516=_0x134f45;_0x4985da[_0x2e2516(0x12a)]&&_0x4985da[_0x2e2516(0x12a)][_0x2e2516(0x239)](_0x4985da),this[_0x2e2516(0xe1)][_0x2e2516(0x2b3)](_0x4985da),this[_0x2e2516(0x1c9)][_0x2e2516(0x2b3)](_0x4985da);},Window_OTB_TurnOrder[_0x134f45(0x1c6)]['removeCurrentSubject']=function(){const _0x313db8=_0x134f45;if(!this[_0x313db8(0x257)])return;this[_0x313db8(0x197)](this[_0x313db8(0x257)]);},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x18f)]=function(){const _0x43bc9f=_0x134f45;while(this[_0x43bc9f(0x1be)][_0x43bc9f(0xf0)]){const _0x96afd0=this['_currentTurn']['shift']();_0x96afd0[_0x43bc9f(0xb7)](0x0);}while(this[_0x43bc9f(0x234)][_0x43bc9f(0xf0)]){const _0x556373=this[_0x43bc9f(0x234)][_0x43bc9f(0x24f)]();if(!_0x556373)continue;this['_currentTurn'][_0x43bc9f(0x20c)](_0x556373);}for(const _0x1180bc of this[_0x43bc9f(0x1be)]){if(!_0x1180bc)continue;_0x1180bc[_0x43bc9f(0x191)](this[_0x43bc9f(0x1be)]);}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x29b)]=function(_0x2dcd02,_0x2d8a9c){const _0x1fc05b=_0x134f45,_0xdaeac5=_0x2dcd02===BattleManager[_0x1fc05b(0x2c1)]?this[_0x1fc05b(0x1be)]:this[_0x1fc05b(0x234)],_0x90e212={};for(const _0x4d8a8f of _0x2dcd02){const _0x4b1d90=_0x1fc05b(0x1cd)[_0x1fc05b(0x150)](_0x4d8a8f[_0x1fc05b(0xd7)]()?_0x1fc05b(0x1b0):'enemy',_0x4d8a8f[_0x1fc05b(0x1dd)]());_0x90e212[_0x4b1d90]=_0x90e212[_0x4b1d90]||0x0;const _0xc50e74=_0x90e212[_0x4b1d90]++,_0x37b4be=new Sprite_OTB_TurnOrder_Battler(_0x4d8a8f,_0xc50e74,_0xdaeac5);this[_0x1fc05b(0xe1)][_0x1fc05b(0x286)](_0x37b4be),_0xdaeac5[_0x1fc05b(0x20c)](_0x37b4be);}for(const _0x4168da of _0xdaeac5){if(!_0x4168da)continue;_0x4168da['startFade'](0xff),_0x4168da['calculateTargetPositions'](),_0x2d8a9c&&(_0x4168da[_0x1fc05b(0x1df)]=0xff,_0x4168da['x']=_0x4168da['_positionTargetX'],_0x4168da[_0x1fc05b(0x10e)]=0x0);}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x2d8)]=function(){const _0x46f86a=_0x134f45,_0x349391=BattleManager[_0x46f86a(0x252)];this[_0x46f86a(0x29b)](_0x349391);},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x135)]=function(_0x1058b6,_0x4e16d1){const _0x182035=_0x134f45;this[_0x182035(0xfe)]();for(const _0x4285c1 of this[_0x182035(0x1be)]){if(!_0x4285c1)continue;_0x4285c1[_0x182035(0x22b)]()===_0x1058b6&&(_0x4285c1[_0x182035(0x23f)]=_0x4285c1['_instance']||0x0,_0x4285c1[_0x182035(0x23f)]--);}const _0x397e1b=this['_currentTurn']['findIndex'](_0xcb9947=>_0xcb9947[_0x182035(0x22b)]()===_0x1058b6);if(this[_0x182035(0x1be)][_0x397e1b])this['_subject']=this[_0x182035(0x1be)][_0x397e1b],this[_0x182035(0x1be)][_0x397e1b]['calculateTargetPositions'](),this[_0x182035(0x1be)][_0x182035(0x1f5)](_0x397e1b,0x1);else{if(_0x1058b6){const _0x4bef03=new Sprite_OTB_TurnOrder_Battler(_0x1058b6,-0x1,null);this[_0x182035(0xe1)][_0x182035(0x286)](_0x4bef03),this[_0x182035(0x257)]=_0x4bef03,_0x4bef03[_0x182035(0xb7)](0xff),_0x4bef03[_0x182035(0x10e)]=0x258,_0x4bef03['x']=this['_subjectX'],_0x4bef03[_0x182035(0x243)]=this[_0x182035(0x23d)],_0x4e16d1&&(_0x4bef03[_0x182035(0x1df)]=0xff);}}for(const _0xb127e3 of this[_0x182035(0x1be)]){if(!_0xb127e3)continue;_0xb127e3[_0x182035(0x167)]();}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x295)]=function(){const _0x47571e=_0x134f45;for(const _0x341eeb of this[_0x47571e(0x1be)]){if(!_0x341eeb)continue;const _0x1a775b=_0x341eeb[_0x47571e(0x22b)]();if(BattleManager[_0x47571e(0x2c1)]['includes'](_0x1a775b))continue;this['removeSprite'](_0x341eeb);}for(const _0x31f335 of this['_nextTurn']){if(!_0x31f335)continue;const _0x2d175c=_0x31f335['battler']();if(BattleManager[_0x47571e(0x252)][_0x47571e(0x147)](_0x2d175c))continue;this[_0x47571e(0x197)](_0x31f335);}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x228)]=function(_0x2d311d,_0xf7155f){const _0x4d91de=_0x134f45,_0x45ebf7=_0xf7155f===BattleManager[_0x4d91de(0x2c1)]?this['_currentTurn']:this['_nextTurn'];if(!_0x45ebf7)return;const _0x2e4ede=VisuMZ[_0x4d91de(0x108)][_0x4d91de(0x18c)](_0x2d311d,_0xf7155f),_0x18fdfa=_0x2e4ede[_0x4d91de(0xf0)]-0x1,_0x3de50e=new Sprite_OTB_TurnOrder_Battler(_0x2d311d,_0x18fdfa,_0x45ebf7);this[_0x4d91de(0xe1)]['addChild'](_0x3de50e),_0x45ebf7[_0x4d91de(0x20c)](_0x3de50e),_0x3de50e['startFade'](0xff),this[_0x4d91de(0xc8)]();},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x2b0)]=function(_0x5dd0b0,_0x5c9c2e){const _0x186dbf=_0x134f45,_0x11ddc3=_0x5c9c2e===BattleManager[_0x186dbf(0x2c1)]?this[_0x186dbf(0x1be)]:this[_0x186dbf(0x234)];if(!_0x11ddc3)return;for(const _0x164953 of _0x11ddc3){if(!_0x164953)continue;_0x164953[_0x186dbf(0x22b)]()===_0x5dd0b0&&(_0x164953[_0x186dbf(0x23f)]=_0x164953[_0x186dbf(0x23f)]||0x0,_0x164953[_0x186dbf(0x23f)]++);}const _0x3a11e1=0x0,_0x40acd8=new Sprite_OTB_TurnOrder_Battler(_0x5dd0b0,_0x3a11e1,_0x11ddc3);this[_0x186dbf(0xe1)][_0x186dbf(0x286)](_0x40acd8),_0x11ddc3[_0x186dbf(0xc0)](_0x40acd8),_0x40acd8[_0x186dbf(0xb7)](0xff),_0x40acd8[_0x186dbf(0x10e)]=0x258,_0x40acd8['x']=this[_0x186dbf(0x23d)],this[_0x186dbf(0xc8)]();},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x174)]=function(_0x153a79,_0x1d838d){const _0x1ee510=_0x134f45,_0x3d4b83=this[_0x1ee510(0x1be)];if(!_0x3d4b83)return;let _0x573dab=0x0;for(let _0x408ea7=0x0;_0x408ea7<_0x1d838d;_0x408ea7++){const _0x206857=_0x3d4b83[_0x408ea7];if(!_0x206857)continue;if(_0x206857[_0x1ee510(0x22b)]()!==_0x153a79)continue;_0x573dab=_0x206857[_0x1ee510(0x23f)]+0x1;}for(let _0x36f79a=_0x1d838d;_0x36f79a<_0x3d4b83[_0x1ee510(0xf0)];_0x36f79a++){const _0x1ed348=_0x3d4b83[_0x36f79a];if(!_0x1ed348)continue;if(_0x1ed348[_0x1ee510(0x22b)]()!==_0x153a79)continue;_0x1ed348[_0x1ee510(0x23f)]=_0x1ed348['_instance']||0x0,_0x1ed348[_0x1ee510(0x23f)]++;}const _0x9ba26e=new Sprite_OTB_TurnOrder_Battler(_0x153a79,_0x573dab,_0x3d4b83);this[_0x1ee510(0xe1)][_0x1ee510(0x286)](_0x9ba26e),_0x3d4b83[_0x1ee510(0x1f5)](_0x1d838d,0x0,_0x9ba26e),_0x9ba26e[_0x1ee510(0xb7)](0xff),_0x9ba26e[_0x1ee510(0x10e)]=0x258,_0x9ba26e['x']=this[_0x1ee510(0x23d)],this[_0x1ee510(0xc8)]();},Window_OTB_TurnOrder['prototype'][_0x134f45(0x2a1)]=function(){const _0x356b96=_0x134f45;this[_0x356b96(0x29b)](BattleManager['_actionBattlers'],!![]),this['createTurnOrderSprites'](BattleManager[_0x356b96(0x252)],!![]),this[_0x356b96(0x135)](BattleManager[_0x356b96(0x257)],!![]),this[_0x356b96(0x225)]();},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x151)]=function(_0x28da95){const _0x203fa3=_0x134f45;this['clearOrderPreview'](),_0x28da95&&_0x28da95[_0x203fa3(0x2ca)]()!==null&&this[_0x203fa3(0x2eb)](_0x28da95);},Window_OTB_TurnOrder['prototype'][_0x134f45(0x277)]=function(){const _0x247557=_0x134f45;for(const _0x5a44ce of this[_0x247557(0x1c9)]['children']){if(!_0x5a44ce)continue;this[_0x247557(0x197)](_0x5a44ce);}},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x2eb)]=function(_0x10024d){const _0x58a690=_0x134f45,_0x6bd74a=_0x10024d['subject'](),_0x50910c=_0x10024d[_0x58a690(0x236)](),_0x37f3f6=_0x10024d[_0x58a690(0x247)]();_0x50910c!==0x0&&this[_0x58a690(0x160)](_0x6bd74a,![],_0x50910c);_0x37f3f6!==0x0&&this[_0x58a690(0x160)](_0x6bd74a,!![],_0x37f3f6);if(!_0x10024d[_0x58a690(0xc5)]())return;const _0x265f63=SceneManager[_0x58a690(0x27c)]['_actorWindow'],_0x1a572c=SceneManager[_0x58a690(0x27c)][_0x58a690(0x2d4)];let _0x50060a=null;if(_0x265f63&&_0x265f63[_0x58a690(0x238)])_0x50060a=_0x265f63[_0x58a690(0x1b0)](_0x265f63[_0x58a690(0x1dd)]());else _0x1a572c&&_0x1a572c[_0x58a690(0x238)]&&(_0x50060a=_0x1a572c['enemy']());if(!_0x50060a)return;const _0x3bc22d=_0x10024d[_0x58a690(0x1bb)](_0x50060a),_0x5f3ba7=_0x10024d[_0x58a690(0x204)](_0x50060a);_0x3bc22d!==0x0&&this[_0x58a690(0x160)](_0x50060a,![],_0x3bc22d),_0x5f3ba7!==0x0&&this['createOrderPreviewSprite'](_0x50060a,!![],_0x5f3ba7);},Window_OTB_TurnOrder[_0x134f45(0x1c6)][_0x134f45(0x160)]=function(_0x3c7d0e,_0x4222ba,_0x1434e8){const _0x4eb534=_0x134f45;if(!_0x3c7d0e)return;if(_0x1434e8===0x0)return;const _0x5267d1=_0x4222ba?BattleManager['_otb_actionBattlersNext']:BattleManager[_0x4eb534(0x2c1)],_0x58e822=VisuMZ[_0x4eb534(0x108)][_0x4eb534(0x18c)](_0x3c7d0e,_0x5267d1),_0xbde11d=_0x4222ba?this[_0x4eb534(0x234)]:this['_currentTurn'],_0x1474cd=_0x4222ba?this['_previewNext']:this['_previewCurrent'];if(_0x58e822[_0x4eb534(0xf0)]<=0x0)return;for(let _0x57816c=0x0;_0x57816c<_0x58e822['length'];_0x57816c++){const _0x455f42=new Sprite_OTB_TurnOrder_Preview(_0x3c7d0e,_0x57816c,_0xbde11d,_0x1434e8);this[_0x4eb534(0x1c9)][_0x4eb534(0x286)](_0x455f42),_0x1474cd[_0x4eb534(0x20c)](_0x455f42),_0x455f42[_0x4eb534(0x167)](),_0x455f42[_0x4eb534(0xb7)](0xff);}};var $otbAddBattlerToTurnEnd=function(_0x162da2,_0x4b8aa1,_0x50938f){const _0x1a843a=_0x134f45;if(!SceneManager[_0x1a843a(0x20a)]())return;if(!BattleManager[_0x1a843a(0x16f)]())return;if(!_0x162da2)return;if(!_0x162da2[_0x1a843a(0x140)]())return;if(!_0x162da2[_0x1a843a(0x2da)]())return;_0x4b8aa1=_0x4b8aa1||0x1;if(_0x4b8aa1<=0x0)return;if(!_0x50938f)return;BattleManager[_0x1a843a(0x12f)](_0x162da2,_0x4b8aa1,_0x50938f);},$otbAddBattlerToCurrentTurnEnd=function(_0x35d4d1,_0x53bbf1){const _0x26715e=_0x134f45,_0x1ed79d=BattleManager[_0x26715e(0x2c1)];BattleManager[_0x26715e(0x12f)](_0x35d4d1,_0x53bbf1,_0x1ed79d);},$otbAddBattlerToNextTurnEnd=function(_0x2fa1ca,_0x217e08){const _0x573fdb=_0x134f45,_0xc6fce=BattleManager[_0x573fdb(0x252)];BattleManager[_0x573fdb(0x12f)](_0x2fa1ca,_0x217e08,_0xc6fce);};