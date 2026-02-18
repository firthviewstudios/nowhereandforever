//=============================================================================
// VisuStella MZ - Multi-Layer HP Gauge
// VisuMZ_4_MultiLayerHpGauge.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MultiLayerHpGauge = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MultiLayerHpGauge = VisuMZ.MultiLayerHpGauge || {};
VisuMZ.MultiLayerHpGauge.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [MultiLayerHpGauge]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Multi-Layer_HP_Gauge_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Want to give certain enemies some more significance than others? Like giving
 * them a giant Multi-Layer HP Gauge spread across the top of the screen in a
 * super imposing type of fashion? This plugin will do just that! Multi-Layer
 * HP Gauges can contain upwards of 10 layers while displaying all of their
 * states in a spread out fashion. Your players will know this enemy is a boss
 * that means business.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Designate which database enemies will have their HP Gauges put on display
 *   at the top of the screen to indicate their importance.
 * * These HP gauges can have multiple layers of health bars to make for a
 *   better representation of how tanky they are.
 * * Control the colors associated with each HP Gauge layer to allow for better
 *   distinctions on how close the player is to defeating the enemy.
 * * Up to a total of 10 different HP Gauge Layers can be used with different
 *   color settings for each layer.
 * * Adds states to be displayed in wide form in order to display more than
 *   the current style of rotating states.
 * * Lots of extra features with other VisuStella plugins if they are installed
 *   together with this plugin.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Battle Log Position Shift
 * 
 * The Battle Log is usually displayed at the top of the screen. This plugin
 * will shift the Battle Log down by a specified amount depending on the number
 * of Multi-Layer HP Gauges are displayed on screen at a time. You can adjust
 * the amount the shift occurs. If you want to disable this, change the shift
 * amount to 0.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_StateTooltips
 *
 * If VisuStella MZ's State Tooltips plugin is installed, players can also view
 * state tooltips when hovering the mouse over the respective Multi-Layer HP
 * Gauge sheets.
 *
 * ---
 *
 * VisuMZ_3_VisualGaugeStyles
 *
 * If VisuStella MZ's Visual Gauge Styles plugin is installed, you can apply
 * gauge styles to the Multi-Layer HP Gauges for this plugin.
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
 * VisuMZ_1_BattleCore
 * 
 * To reduce redundancy, there are options to remove the HP Gauges if an enemy
 * already has a dedicated Multi-Layer HP Gauge shown at the top of the screen.
 * Likewise, the same is done for state icons.
 * 
 * If you don't want these UI elements removed, you can disable this change by
 * altering the respective Plugin Parameters.
 * 
 * ---
 * 
 * VisuMZ's Battle Systems
 * 
 * Since the position of the Multi-Layer HP Gauge will most likely overlap with
 * any turn order or action count UI elements at the top of the screen, this
 * plugin provides the option to offset them via how many Multi-Layer HP Gauge
 * rows are present.
 * 
 * ---
 * 
 * VisuMZ_4_BreakShields
 * 
 * As Break Shields can be displayed in part with the state icons, the reduced
 * redundancy Plugin Parameters allow the UI elements to be removed as to not
 * clutter upt he screen too much.
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
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Show Multi-Layer HP Gauge>
 * <Hide Multi-Layer HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Determines if the enemy will have the Multi-Layer HP Gauge visible or not
 *   and bypasses the default setting found in the Plugin Parameters.
 * - Keep in mind that using any of the other notetags found below will also
 *   prompt the Multi-Layer HP Gauge to 'Show'. This makes the 'Show' notetag a
 *   bit redundant but it is there for those who want extra clarity in their
 *   note boxes.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Persist>
 * <Multi-Layer HP Gauge Temporal>
 *
 * - Used for: Enemy Notetags
 * - Determines if the Multi-Layer HP Gauge is persistant or temporal and will
 *   bypass the default settings found in the Plugin Parameters.
 * - When 'Persist' is used, the Multi-Layer HP Gauge will stay visible even
 *   after the enemy tied to it has died in combat.
 * - When 'Temporal' is used, the Multi-Layer HP Gauge will vanish after the
 *   enemy tied to it has died in combat, although it will reappear if it is
 *   revived later.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Layers: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the total number of layers used for the enemy as 'x' layers.
 * - Replace 'x' with a number representing a number between 1 and 10 as the
 *   total number of layers used.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Face: filename, index>
 * <Multi-Layer HP Gauge Graphic: filename, index>
 * <Multi-Layer HP Gauge Face Graphic: filename, index>
 *
 * - Used for: Enemy Notetags
 * - Changes the graphic used by the enemy to this face graphic.
 * - Replace 'filename' with the name of the image file to pick from the game
 *   project's /img/faces/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - Replace 'index' with a number representing the face graphic cell used.
 *   - Index values start at 0.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge BgColor: color1>
 * <Multi-Layer HP Gauge BG Color: color1>
 * <Multi-Layer HP Gauge Background Color: color1>
 * 
 * <Multi-Layer HP Gauge BgColor: color1, color2>
 * <Multi-Layer HP Gauge BG Color: color1, color2>
 * <Multi-Layer HP Gauge Background Color: color1, color2>
 *
 * - Used for: Enemy Notetags
 * - Adjusts the background color(s) used for the enemy graphic.
 * - Replace 'color1' and/or 'color2' with either a number from 0 to 31
 *   representing the text color or in the format of '#rrggbb' to custom pick a
 *   hex color.
 * - If two colors are used, a vertical gradient will form.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 * 
 * EXAMPLES:
 * 
 *   <Multi-Layer HP Gauge BgColor: 2>
 *   <Multi-Layer HP Gauge BgColor: #ff0000>
 *   <Multi-Layer HP Gauge BgColor: 2, 18>
 *   <Multi-Layer HP Gauge BgColor: #ff0000, #000000>
 *
 * ---
 *
 * <Multi-Layer HP Gauge Border Color: color>
 *
 * - Used for: Enemy Notetags
 * - Adjusts the border color used for the enemy graphic.
 * - Replace 'color' with either a number from 0 to 31 representing the text
 *   color or in the format of '#rrggbb' to custom pick a hex color.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 * 
 * EXAMPLES:
 * 
 *   <Multi-Layer HP Gauge Border Color: 2>
 *   <Multi-Layer HP Gauge Border Color: #ff0000>
 *
 * ---
 *
 * <Multi-Layer HP Gauge Border Size: x>
 * <Multi-Layer HP Gauge Border Thick: x>
 * <Multi-Layer HP Gauge Border Thickness: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the thickness of the color section of the border.
 * - Replace 'x' with a number representing how thick the color section of the
 *   border is in pixels.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Adjust the general settings for the Multi-Layer HP Gauge.
 *
 * ---
 *
 * Screen
 * 
 *   Max Width:
 *   - What is the max screen area that is taken up by Multi-Layer HP Gauges?
 * 
 *   Gauges Per Row:
 *   - How many gauges are displayed per row?
 *   - When the quantity exceeds this number, start a new row.
 * 
 *   Row Spacing:
 *   - How many pixels are used inbetween rows to space out the stacked
 *     Multi-Layer HP Gauges?
 * 
 *   Mid-Battle Fade Speed:
 *   - How fast should the gauges fade out mid-battle?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   End Battle Fade Speed:
 *   - How fast should the gauges fade out on ending battle?
 *   - Lower numbers are slower. Higher numbers are faster.
 *
 * ---
 *
 * Properties
 * 
 *   Buffer X:
 *   - What is the minimum pixel distance between individual parts?
 * 
 *   Enable State Tooltips:
 *   - Enables state tooltips when hovered over?
 *   - Requires VisuMZ_3_StateTooltips!
 * 
 *   Graphic Size:
 *   - What is the standard pixel size for the enemy graphic?
 *   - This value is also used to adjust individual part positions.
 * 
 *   Reposition for Help?:
 *   - Reposition the gauges when the Help Window is open?
 * 
 *     Reposition Y:
 *     - How many pixels to offset the gauge reposition?
 *     - Negative: up. Positive: down.
 * 
 *   Update Frequency:
 *   - How many frames of wait should there be before updating the individual
 *     Multi-Layer HP Gauges?
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the whole gauge's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the whole gauge's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Battle Log
 * 
 *   Reposition Window?:
 *   - Repositions the battle log window to make room for the
 *     Multi-Layer HP Gauge?
 * 
 *   Per Row Offset Y:
 *   - Offset Battle Log's Y by this amount per row?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * These are the default values used for this plugin. These settings can be
 * individually changed via notetags.
 *
 * ---
 *
 * General
 * 
 *   Show Gauge?:
 *   - Show Multi-Layer HP Gauges for each enemy by default?
 * 
 *   Persistant Gauges?:
 *   - Are Multi-Layer HP Gauges persistant by default?
 *   - Persistant means they remain after the enemy dies.
 * 
 *   Default Layers:
 *   - How many layers are used by default when an enemy has a
 *     Multi-Layer HP Gauge in effect?
 *
 * ---
 *
 * Graphic
 * 
 *   Background Color 1:
 *   Background Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Border Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Border Thickness:
 *   - What is the thickness of the colored band for the enemy
 *     graphic's border?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Graphic Settings
 * ============================================================================
 *
 * Adjust the settings for the Enemy Graphic part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Graphic?:
 *   - Show the "Graphic" part of the Multi-Layer HP Gauge?
 *   - This displays the enemy graphic.
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the graphic?
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
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Adjust the settings for the HP Gauge part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show Gauge?:
 *   - Show the "Gauge" part of the Multi-Layer HP Gauge?
 *   - I mean, why wouldn't you?
 *   - That's why you got this plugin.
 * 
 *   Gauge Height:
 *   - What is the height of the gauge in pixels?
 *   - Minimum: 1. Maximum: 32.
 * 
 *   Style Name:
 *   - Select the gauge style to use for the gauge.
 *   - Requires VisuMZ_3_VisualGaugeStyles!
 *
 * ---
 *
 * Vocabulary
 * 
 *   Value Format:
 *   - Text format used for the gauge value text.
 *   - %1 - Current Value, %2 - Max Value, %3 - Percentage
 * 
 *   Decimal Places:
 *   - How many decimal places should the percent digits go if they're used
 *     for the value?
 * 
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the gauge part's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the gauge part's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Layer Color Settings
 * ============================================================================
 *
 * Adjust what colors are used for each gauge layer.
 * 
 * Layer 1 uses default HP Gauge Colors.
 *
 * ---
 *
 * Layer 2-10 Sets
 * 
 *   Color 1:
 *   Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: States Settings
 * ============================================================================
 *
 * Adjust the settings for the states part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show States?:
 *   - Show the "States" part of the Multi-Layer HP Gauge?
 *   - If off, hides all states, buffs, and Break Shields.
 * 
 *   Show Break Shields?:
 *   - Add Break Shields to the list of visible objects?
 *   - Requires VisuMZ_4_BreakShields!
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the states part's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the states part's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * Adjust compatibility settings with other plugins.
 *
 * ---
 *
 * Battler-Related > Reduced Redundancy
 * 
 *   Break Shields:
 *   - Removes enemy battler Break Shields if redundant.
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   HP Gauge:
 *   - Removes enemy battler HP Gauges if redundant.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   State Icons:
 *   - Removes enemy battler state icons if redundant.
 *
 * ---
 *
 * Battle Data Offset > Battle Systems
 * 
 *   Each Row Offset Y:
 *   - Offset Y position by this for each row.
 *   - Negative: up. Positive: down.
 * 
 *   Closed Help Offset Y:
 *   - Offset Y position when help window is closed.
 *   - Negative: up. Positive: down.
 * 
 *   Open Help Offset Y:
 *   - Offset Y position when help window is open.
 *   - Negative: up. Positive: down.
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.06: September 18, 2025
 * * Compatibility Update!
 * ** HP Gauges will no longer cover up Tutorial Panel System's windows.
 *    Update made by Olivia.
 * 
 * Version 1.05: October 17, 2024
 * * Compatibility Update!
 * ** Added better compatibility with In-Battle Status feature for Battle Core
 *    as to not cover up the window.
 * 
 * Version 1.04: September 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with Visual State Effects that would prevent the
 *    state overlays on enemies from appearing. Fix made by Irina.
 * 
 * Version 1.02: May 18, 2023
 * * Bug Fixes!
 * ** When an enemy transforms into another with a Multi-Layer HP Gauge, it
 *    will be updated and shown. Fix made by Olivia.
 * 
 * Version 1.01: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash if the VisuMZ Core Engine wasn't
 *    installed. Fix made by Olivia.
 * 
 * Version 1.00 Official Release Date: April 7, 2023
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MultiLayerHpGauge
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Adjust the general settings for the Multi-Layer HP Gauge.
 * @default {"Screen":"","maxWidth:num":"816","perRow:num":"4","rowSpacing:num":"4","endBattleFadeSpeed:num":"24","Properties":"","bufferX:num":"4","stateTooltipsEnable:eval":"true","faceSize:num":"64","midFadeSpeed:num":"16","repositionForHelp:eval":"true","repositionHelpY:num":"+108","checkFrequency:num":"20","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Window_BattleLog":"","repositionBattleLog:eval":"true","battleLogPerRowOffsetY:num":"+64"}
 *
 * @param Defaults:struct
 * @text Default Settings
 * @type struct<Defaults>
 * @desc These are the default values used for this plugin.
 * These settings can be individually changed via notetags.
 * @default {"General":"","showDefault:eval":"false","persist:eval":"true","defaultLayers:num":"1","Graphic":"","bgColor1:str":"19","bgColor2:str":"18","borderColor:str":"2","borderthickness:num":"2"}
 * 
 * @param Parts
 * @text Multi-Layer HP Gauge Parts
 * 
 * @param Graphic:struct
 * @text Enemy Graphic Settings
 * @parent Parts
 * @type struct<Graphic>
 * @desc Adjust the settings for the Enemy Graphic part of the
 * Multi-Layer HP Gauge.
 * @default {"show:eval":"true","drawLetter:eval":"true","letterFontName:str":"","letterFontSize:num":"16"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Parts
 * @type struct<Gauge>
 * @desc Adjust the settings for the HP Gauge part of the
 * Multi-Layer HP Gauge.
 * @default {"General":"","show:eval":"true","gaugeHeight:num":"24","styleName:str":"Lean","Vocab":"","valueFmt:str":"%3%","valuePercentDigits:num":"2","Offset":"","offsetX:num":"+0","offsetY:num":"+4"}
 *
 * @param LayerColors:struct
 * @text Layer Color Settings
 * @parent Gauge:struct
 * @type struct<LayerColors>
 * @desc Adjust what colors are used for each gauge layer.
 * Layer 1 uses default HP Gauge Colors.
 * @default {"Layer2":"","layer2_color1:str":"#fff200","layer2_color2:str":"#fff799","Layer3":"","layer3_color1:str":"#39b54a","layer3_color2:str":"#7cc576","Layer4":"","layer4_color1:str":"#00a99d","layer4_color2:str":"#7accc8","Layer5":"","layer5_color1:str":"#00aeef","layer5_color2:str":"#6dcff6","Layer6":"","layer6_color1:str":"#0054a6","layer6_color2:str":"#8393ca","Layer7":"","layer7_color1:str":"#2e3192","layer7_color2:str":"#605ca8","Layer8":"","layer8_color1:str":"#662d91","layer8_color2:str":"#a186be","Layer9":"","layer9_color1:str":"#f06eaa","layer9_color2:str":"#ffdeec","Layer10":"","layer10_color1:str":"#ed1c24","layer10_color2:str":"#f26c4f"}
 *
 * @param States:struct
 * @text States Settings
 * @parent Parts
 * @type struct<States>
 * @desc Adjust the settings for the states part of the
 * Multi-Layer HP Gauge.
 * @default {"General":"","show:eval":"true","breakShields:eval":"true","Offset":"","offsetX:num":"+0","offsetY:num":"+28"}
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Adjust compatibility settings with other plugins.
 * @default {"Battler":"","ReduceRed":"","reduceRedundantBreakShield:eval":"true","reduceRedundantHpGauge:eval":"true","reduceRedundantStateIcon:eval":"true","GaugeOffset":"","BattleSysAtb":"","atbEachRowOffsetY:num":"+64","atbNormalOffsetY:num":"+24","atbHelpOffsetY:num":"+12","BattleSysBtb":"","btbEachRowOffsetY:num":"+64","btbNormalOffsetY:num":"+0","btbHelpOffsetY:num":"+12","BattleSysCtb":"","ctbEachRowOffsetY:num":"+64","ctbNormalOffsetY:num":"+0","ctbHelpOffsetY:num":"+12","BattleSysEtb":"","etbEachRowOffsetY:num":"+64","etbNormalOffsetY:num":"+0","etbHelpOffsetY:num":"-56","BattleSysFtb":"","ftbEachRowOffsetY:num":"+64","ftbNormalOffsetY:num":"+0","ftbHelpOffsetY:num":"-56","BattleSysOtb":"","otbEachRowOffsetY:num":"+64","otbNormalOffsetY:num":"-6","otbHelpOffsetY:num":"-12","BattleSysPtb":"","ptbEachRowOffsetY:num":"+64","ptbNormalOffsetY:num":"+0","ptbHelpOffsetY:num":"-56","BattleSysStb":"","stbEachRowOffsetY:num":"+64","stbNormalOffsetY:num":"+0","stbHelpOffsetY:num":"+12"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Screen
 *
 * @param maxWidth:num
 * @text Max Width
 * @parent Screen
 * @min 1
 * @desc What is the max screen area that is taken up by Multi-Layer HP Gauges?
 * @default 816
 *
 * @param perRow:num
 * @text Gauges Per Row
 * @parent Screen
 * @min 1
 * @desc How many gauges are displayed per row?
 * When the quantity exceeds this number, start a new row.
 * @default 4
 *
 * @param rowSpacing:num
 * @text Row Spacing
 * @parent Screen
 * @min 0
 * @desc How many pixels are used inbetween rows to space out
 * the stacked Multi-Layer HP Gauges?
 * @default 4
 *
 * @param midFadeSpeed:num
 * @text Mid-Battle Fade Speed
 * @parent Screen
 * @min 1
 * @desc How fast should the gauges fade out mid-battle?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param endBattleFadeSpeed:num
 * @text End Battle Fade Speed
 * @parent Screen
 * @min 1
 * @desc How fast should the gauges fade out on ending battle?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 24
 *
 * @param Properties
 *
 * @param bufferX:num
 * @text Buffer X
 * @parent Properties
 * @min 0
 * @desc What is the minimum pixel distance between individual parts?
 * @default 4
 *
 * @param stateTooltipsEnable:eval
 * @text Enable State Tooltips
 * @parent Properties
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables state tooltips when hovered over?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param faceSize:num
 * @text Graphic Size
 * @parent Properties
 * @min 1
 * @desc What is the standard pixel size for the enemy graphic?
 * This value is also used to adjust individual part positions.
 * @default 64
 *
 * @param repositionForHelp:eval
 * @text Reposition for Help?
 * @parent Properties
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc Reposition the gauges when the Help Window is open?
 * @default true
 *
 * @param repositionHelpY:num
 * @text Reposition Y
 * @parent repositionForHelp:eval
 * @desc How many pixels to offset the gauge reposition?
 * Negative: up. Positive: down.
 * @default +108
 *
 * @param checkFrequency:num
 * @text Update Frequency
 * @parent Properties
 * @min 1
 * @desc How many frames of wait should there be before updating
 * the individual Multi-Layer HP Gauges?
 * @default 20
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the whole gauge's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the whole gauge's Y?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Window_BattleLog
 * @text Battle Log
 *
 * @param repositionBattleLog:eval
 * @text Reposition Window?
 * @parent Window_BattleLog
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Repositions the battle log window to make room for
 * the Multi-Layer HP Gauge?
 * @default true
 *
 * @param battleLogPerRowOffsetY:num
 * @text Per Row Offset Y
 * @parent Window_BattleLog
 * @desc Offset Battle Log's Y by this amount per row?
 * Negative: up. Positive: down.
 * @default +64
 *
 */
/* ----------------------------------------------------------------------------
 * Defaults Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Defaults:
 * 
 * @param General
 *
 * @param showDefault:eval
 * @text Show Gauge?
 * @parent General
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show Multi-Layer HP Gauges for each enemy by default?
 * @default false
 *
 * @param persist:eval
 * @text Persistant Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Are Multi-Layer HP Gauges persistant by default?
 * Persistant means they remain after the enemy dies.
 * @default true
 *
 * @param defaultLayers:num
 * @text Default Layers
 * @parent General
 * @type number
 * @min 1
 * @max 10
 * @desc How many layers are used by default when an enemy has
 * a Multi-Layer HP Gauge in effect?
 * @default 1
 * 
 * @param Graphic
 *
 * @param bgColor1:str
 * @text Background Color 1
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param bgColor2:str
 * @text Background Color 2
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param borderColor:str
 * @text Border Color
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param borderthickness:num
 * @text Border Thickness
 * @parent Graphic
 * @type number
 * @min 1
 * @desc What is the thickness of the colored band for the enemy
 * graphic's border?
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Graphic Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Graphic:
 *
 * @param show:eval
 * @text Show Enemy Graphic?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "Graphic" part of the Multi-Layer HP Gauge?
 * This displays the enemy graphic.
 * @default true
 *
 * @param drawLetter:eval
 * @text Show Enemy Letter?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the graphic?
 * @default true
 *
 * @param letterFontName:str
 * @text Font Name
 * @parent drawLetter:eval
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param letterFontSize:num
 * @text Font Size
 * @parent drawLetter:eval
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gauge?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "Gauge" part of the Multi-Layer HP Gauge?
 * I mean, why wouldn't you? That's why you got this plugin.
 * @default true
 *
 * @param gaugeHeight:num
 * @text Gauge Height
 * @parent General
 * @type number
 * @min 1
 * @max 32
 * @desc What is the height of the gauge in pixels?
 * Minimum: 1. Maximum: 32.
 * @default 24
 * 
 * @param styleName:str
 * @text Style Name
 * @parent General
 * @type select
 * @option -
 * @option Normal
 * @option -
 * @option Arrow
 * @option Dipper
 * @option Flag
 * @option Growth
 * @option Lean
 * @option Quad
 * @option Stagger
 * @option Trapezoid
 * @option -
 * @option HalfStep
 * @option ThirdStep
 * @option FourthStep
 * @option FifthStep
 * @option SixthStep
 * @option EighthStep
 * @option TenthStep
 * @option -
 * @option HalfSection
 * @option ThirdSection
 * @option FourthSection
 * @option FifthSection
 * @option SixthSection
 * @option EighthSection
 * @option TenthSection
 * @option -
 * @option SegmentBy10
 * @option SegmentBy20
 * @option SegmentBy25
 * @option SegmentBy50
 * @option SegmentBy100
 * @option SegmentBy200
 * @option SegmentBy250
 * @option SegmentBy500
 * @option SegmentBy1000
 * @option -
 * @desc Select the gauge style to use for the gauge.
 * Requires VisuMZ_3_VisualGaugeStyles!
 * @default Lean
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param valueFmt:str
 * @text Value Format
 * @parent Vocab
 * @desc Text format used for the gauge value text.
 * %1 - Current Value, %2 - Max Value, %3 - Percentage
 * @default %3%
 *
 * @param valuePercentDigits:num
 * @text Decimal Places
 * @parent Vocab
 * @type number
 * @desc How many decimal places should the percent digits
 * go if they're used for the value?
 * @default 2
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the gauge part's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the gauge part's Y?
 * Negative: up. Positive: down.
 * @default +4
 *
 */
/* ----------------------------------------------------------------------------
 * States Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param show:eval
 * @text Show States?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "States" part of the Multi-Layer HP Gauge?
 * If off, hides all states, buffs, and Break Shields.
 * @default true
 *
 * @param breakShields:eval
 * @text Show Break Shields?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add Break Shields to the list of visible objects?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the states part's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the states part's Y?
 * Negative: up. Positive: down.
 * @default +28
 *
 */
/* ----------------------------------------------------------------------------
 * Layer Colors Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LayerColors:
 *
 * @param Layer2
 * @text Layer 2 Set
 *
 * @param layer2_color1:str
 * @text Color 1
 * @parent Layer2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #fff200
 *
 * @param layer2_color2:str
 * @text Color 2
 * @parent Layer2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #fff799
 *
 * @param Layer3
 * @text Layer 3 Set
 *
 * @param layer3_color1:str
 * @text Color 1
 * @parent Layer3
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #39b54a
 *
 * @param layer3_color2:str
 * @text Color 2
 * @parent Layer3
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #7cc576
 *
 * @param Layer4
 * @text Layer 4 Set
 *
 * @param layer4_color1:str
 * @text Color 1
 * @parent Layer4
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #00a99d
 *
 * @param layer4_color2:str
 * @text Color 2
 * @parent Layer4
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #7accc8
 *
 * @param Layer5
 * @text Layer 5 Set
 *
 * @param layer5_color1:str
 * @text Color 1
 * @parent Layer5
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #00aeef
 *
 * @param layer5_color2:str
 * @text Color 2
 * @parent Layer5
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #6dcff6
 *
 * @param Layer6
 * @text Layer 6 Set
 *
 * @param layer6_color1:str
 * @text Color 1
 * @parent Layer6
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #0054a6
 *
 * @param layer6_color2:str
 * @text Color 2
 * @parent Layer6
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #8393ca
 *
 * @param Layer7
 * @text Layer 7 Set
 *
 * @param layer7_color1:str
 * @text Color 1
 * @parent Layer7
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2e3192
 *
 * @param layer7_color2:str
 * @text Color 2
 * @parent Layer7
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #605ca8
 *
 * @param Layer8
 * @text Layer 8 Set
 *
 * @param layer8_color1:str
 * @text Color 1
 * @parent Layer8
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #662d91
 *
 * @param layer8_color2:str
 * @text Color 2
 * @parent Layer8
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #a186be
 *
 * @param Layer9
 * @text Layer 9 Set
 *
 * @param layer9_color1:str
 * @text Color 1
 * @parent Layer9
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f06eaa
 *
 * @param layer9_color2:str
 * @text Color 2
 * @parent Layer9
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffdeec
 *
 * @param Layer10
 * @text Layer 10 Set
 *
 * @param layer10_color1:str
 * @text Color 1
 * @parent Layer10
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ed1c24
 *
 * @param layer10_color2:str
 * @text Color 2
 * @parent Layer10
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f26c4f
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param Battler
 * @text Battler-Related
 * 
 * @param ReduceRed
 * @text Reduced Redundancy
 * @parent Battler
 *
 * @param reduceRedundantBreakShield:eval
 * @text Break Shields
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler Break Shields if redundant.
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param reduceRedundantHpGauge:eval
 * @text HP Gauge
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler HP Gauges if redundant.
 * Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param reduceRedundantStateIcon:eval
 * @text State Icons
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler state icons if redundant.
 * @default true
 * 
 * @param BattleDataOffset
 * @text Battle Data Offset
 *
 * @param BattleSysAtb
 * @text Battle System - ATB
 * @parent BattleDataOffset
 *
 * @param atbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param atbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +24
 *
 * @param atbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysBtb
 * @text Battle System - BTB
 * @parent GaugeOffset
 *
 * @param btbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param btbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param btbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysCtb
 * @text Battle System - CTB
 * @parent GaugeOffset
 *
 * @param ctbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ctbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ctbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysEtb
 * @text Battle System - ETB
 * @parent GaugeOffset
 *
 * @param etbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param etbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param etbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysFtb
 * @text Battle System - FTB
 * @parent GaugeOffset
 *
 * @param ftbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ftbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ftbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysOtb
 * @text Battle System - OTB
 * @parent GaugeOffset
 *
 * @param otbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param otbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param otbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -12
 *
 * @param BattleSysPtb
 * @text Battle System - PTB
 * @parent GaugeOffset
 *
 * @param ptbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ptbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ptbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysStb
 * @text Battle System - STB
 * @parent GaugeOffset
 *
 * @param stbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param stbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param stbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 */
//=============================================================================

function _0x30e7(){const _0x13cc30=['_helpWindow','#6dcff6','setBitmapSize','constructor','updatePosition','description','Window_PTB_TurnOrder_updatePosition','processReplacement','removeChild','updateMultiLayerHpGaugeBorderData','shouldDisplayBreakShields','layer4_color1','etbHelpOffsetY','_graphicSprite','VisualGaugeStyles','version','svenemy','meetsMultiLayerGaugeLifeState','_lastPlural','borderColor','getMultiLayerHpGaugeBgColorData','getMultiLayerHpGaugeFaceGraphicData','loadSvActor','battlerName','fontSize','changeFaceGraphic','includes','call','repositionForHelp','_graphicFaceName','stateTooltipsEnable','helpOffsetY','_multiLayerHpGaugeContainer','checkFrequency','getStyleName','VisuMZ_0_CoreEngine','drawText','_frameWidth','Window_BattleLog_update','#fff200','registerMultiLayerHpGaugePositionY','_finishChecks','hpGaugeColor2','setup','_targetValue','applyNewBitmap','gaugeBackColor','visibleMultiLayerHpGaugeMembers','Sprite_Battler_updateVisualStateEffectsOverlay','getMultiLayerHpGaugeFaceName','updateBreakShieldIcon','updateLetterSprite','createAllWindows','Window_ETB_TurnOrder_updatePosition','labelColor','createBitmap','MULTI_LAYER_HP_GAUGE','8VUnWEM','Game_BattlerBase_revive','getMultiLayerHpGaugeTotalLayers','Window_BTB_TurnOrder_updatePosition','atb','3RCZgLQ','updateStateSprite','_scene','272066TannZe','drawStateIcons','atbNormalOffsetY','mhp','1732000XcFgln','breakShields','otbEachRowOffsetY','updateStateTurns','clearBitmaps','updateGraphic','move','layer7_color1','blt','createBattlerGaugeSprite','width','updateBitmap','labelY','useDigitGrouping','6277077wXdPeu','svBattlerName','bitmapHeight','Game_Battler_onTurnEnd','MultiLayerHpGauge','Scene_Battle_update','ConvertParams','#0054a6','bitmapWidth','reduceRedundantBreakShield','createBattlerGaugeStates','bgColor','_bitmapWidth','reduceRedundancy','EVAL','updatePositionY','VisuMZ_2_BattleSystemSTB','parse','iconHeight','iconWidth','map','bgColor2','trim','States','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','perRow','_stateIconSprite','NUM','createMultiLayerHpGaugeSprites','color2','reduceRedundantHpGauge','Window_OTB_TurnOrder_updatePosition','battleEnd','createMultiLayerHpGauges','updateStatesWidth','BREAK_SHIELDS_STUN_STATE','currentValue','_borderSprite','GroupDigits','Sprite_Battler_isVisualHpGaugeDisplayed','Game_Troop_setup','updateSelectionEffect','layer2_color1','Compatibility','show','%3%','battlerHue','_lastPositionX','showMultiLayerHpGauge','initialize','filter','RegExp','createDrawWindow','loadEnemy','_maxValueSegment','JSON','fillRect','getMultiLayerHpGaugeBgColor1','_dummyWindow','enemy','Game_BattlerBase_updateStateTurns','updateMultiLayerHpGaugeContainer','hasSvBattler','format','faceSize','gaugeX','#f26c4f','drawVisualStyleGaugeFront','updateVisualStateEffectsOverlay','temporalMultiLayerGauge','addLoadListener','updateMultiLyerHpGaugePositionY','_victoryPhase','top','drawLetterSprite','currentMaxValue','26434520eHEGDx','updateMultiLayerHpGaugeContainerEndBattle','_multiLayerHpGaugeFaceGraphicData','_graphicFaceIndex','layer2_color2','svActorVertCells','atbHelpOffsetY','#f06eaa','calcBitmapWidth','showDefault','exit','setIndexData','_multiLayerHpGaugeBorderData','face','VisuMZ_2_BattleSystemATB','drawLetter','_spriteset','FUNC','etb','_phase','bitmap','#00a99d','layer9_color1','GetPolygonStyle','_gaugeSprite','addChild','index','showMultiLayerGauge','_multiLayerHpGaugePositionY','BottomPosition','match','Gauge','VisuMZ_2_BattleSystemBTB','setupLabelFont','mainFontFace','_graphicEnemy','gradientFillRect','drawFullGauge','getMultiLayerHpGaugeBorderThickness','changeSvActorGraphic','addBreakShieldIcon','VisuMZ_2_TutorialPanelSys','updateMultiLayerHpGaugeFaceGraphicData','_textWidth','Game_Battler_removeState','#662d91','updateGaugeWidth','calcPositionX','appear','note','removeState','bind','drawActorIcons','ARRAYSTRUCT','borderThick','ftbHelpOffsetY','_cache_visibleMultiLayerHpGaugeMembers','fadeSpeed','#fff799','resize','parameters','ctbEachRowOffsetY','General','#7cc576','_multiLayerHpGaugeBgColorData','members','#000000','#7accc8','_svBattlerSprite','_bgSprite','getMultiLayerHpGaugeBorderData','setTotalGauges','labelOutlineWidth','ptbNormalOffsetY','btbHelpOffsetY','getMultiLayerHpGaugeColor2','visible','midFadeSpeed','isEnemy','letterFontSize','paintOpacity','layer6_color1','contents','ctbHelpOffsetY','layer3_color1','left','create','_stateSprite','ftbNormalOffsetY','layer8_color2','#00aeef','max','isDead','requestMultiLayerHpGaugeStateUpdate','DisplayPosition','hpGaugeColor1','updateOpacity','defaultLayers','currentMultiLayerHpGaugeLayer','placeBreakShieldIcon','measureTextWidth','color1','min','etbEachRowOffsetY','Scene_Battle_createDisplayObjects','Scene_Battle_createAllWindows','layer3_color2','_requestMultiLayerHpGaugeStateUpdate','destroy','drawVisualStyleGaugeBack','fontFace','Window_STB_TurnOrder_updatePosition','calcPositionY','normalColor','totalVisibleMultiLayerHpGauges','clear','clearStates','VisuMZ_2_BattleSystemCTB','_graphicSv','layer%1','opacity','findTargetSprite','color','svActorHorzCells','_hold','6665166carMir','createLinearGradient','_graphicsSprite','addState','clearMultiLayerHpGaugeMembers','labelOutlineColor','refresh','faceGraphic','maxHpSegmentAmount','shouldHideMultiLayerStatesIcon','iconIndex','right','ptbHelpOffsetY','offset','isStateAffected','isVisualHpGaugeDisplayed','_breakShieldSprite','isSideView','Window_CTB_TurnOrder_updatePosition','#39b54a','updateGraphicHue','onTurnEnd','offsetX','battleLogPerRowOffsetY','_logWindow','floor','getMultiLayerHpGaugeBgColor2','drawLabel','endBattleFadeSpeed','gaugeHeight','update','calcWidth','changeEnemyGraphic','svactor','setHue','setFrame','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','RepositionTopForHelp','checkUpdateRequests','STRUCT','Sprite_Enemy_updateStateSprite','valueFmt','_multiLayerHpGaugeTotalLayers','updatePositionX','VisuMZ_2_BattleSystemFTB','_tutorialPageWindow','persistMultiLayerGauge','bufferX','_letterSprite','repositionBattleLog','hpA','Game_Battler_addState','layer5_color2','finishChecks','#ed1c24','totalVisibleMultiLayerHpGaugeRows','addMultiLayerHpGaugeSprite','battler','stb','_lastWidth','eachRowOffsetY','VisuMZ_2_BattleSystemETB','#a186be','_letter','createBorderSprite','revive','LayerColors','6363427aydgER','getMultiLayerHpGaugeFaceIndex','isAllDead','otbNormalOffsetY','setWidth','letterFontName','_plural','normalOffsetY','_lastTotalVisibleGauges','endAction','ARRAYSTR','bgColor1','createGraphicSprite','Sprite_FieldGaugeATB_updatePosition','name','loadFace','EnemyOverlay','#ffdeec','offsetY','Game_Battler_onBattleStart','etbNormalOffsetY','active','ftbEachRowOffsetY','length','_canShowMultiLayerHpGauge','getMultiLayerHpGaugeColor1','frameCount','repositionHelpY','_graphicHue','prepareGraphic','drawFullVisualStyleGauge','hpRate','layer9_color2','setupValueFont','ClearTextOffset','getColor','layer7_color2','Graphic','_statesSprite','stbNormalOffsetY','borderthickness','VisuMZ_2_BattleSystemOTB','rowSpacing','height','ptb','totalVisibleMultiLayerHpGaugeCount','hpGauge','_lastIndex','getMultiLayerHpGaugeGraphicType','layer8_color1','Game_Enemy_transform','ftb','toFixed','VisuMZ_2_BattleSystemPTB','layer10_color1','ctb','persist','calcWindowHeight','SETTINGS','createDisplayObjects','964574SwJWhb','toUpperCase','gaugeRate','atbEachRowOffsetY','_lastLetter','prototype','styleName','onBattleStart','Defaults','Settings','Game_BattlerBase_clearStates','createBattlerGraphicSprite','maxWidth','textHeight','faceWidth','clamp','VisuMZ_1_BattleCore','ceil','btbNormalOffsetY','faceHeight','mainSprite','reposition','VisualStateEffects','updateMultiLayerHpGaugeContainerRemoval','currentDisplayedValue','_lastPositionY','stateIcon','drawGauge','BattleManager_endAction','label','canShowMultiLayerHpGauge','valuePercentDigits','VisuMZ_3_VisualGaugeStyles','split','_battler','_graphicType','#%1','ARRAYNUM','openness','drawValue','5TyCqjn','layer4_color2','drawBorderSprite','Game_BattlerBase_appear','round','stbHelpOffsetY','layer5_color1','indexOf','getMultiLayerHpGaugeBorderColor','checkNeedReplacement','createLetterSprite','layers','_context'];_0x30e7=function(){return _0x13cc30;};return _0x30e7();}const _0x5e0242=_0x2335;(function(_0x1000f8,_0x45e6fc){const _0xaa1e78=_0x2335,_0x3a928b=_0x1000f8();while(!![]){try{const _0x318c1b=-parseInt(_0xaa1e78(0x24a))/0x1+parseInt(_0xaa1e78(0x2c0))/0x2*(-parseInt(_0xaa1e78(0x2bd))/0x3)+-parseInt(_0xaa1e78(0x2c4))/0x4+-parseInt(_0xaa1e78(0x272))/0x5*(-parseInt(_0xaa1e78(0x1cb))/0x6)+-parseInt(_0xaa1e78(0x20e))/0x7+-parseInt(_0xaa1e78(0x2b8))/0x8*(parseInt(_0xaa1e78(0x2d2))/0x9)+parseInt(_0xaa1e78(0x31e))/0xa;if(_0x318c1b===_0x45e6fc)break;else _0x3a928b['push'](_0x3a928b['shift']());}catch(_0x3fd4e5){_0x3a928b['push'](_0x3a928b['shift']());}}}(_0x30e7,0x95f30));var label='MultiLayerHpGauge',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5e0242(0x304)](function(_0x364b75){const _0x512945=_0x5e0242;return _0x364b75['status']&&_0x364b75[_0x512945(0x284)][_0x512945(0x299)]('['+label+']');})[0x0];VisuMZ[label][_0x5e0242(0x253)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5e0242(0x2d8)]=function(_0x1597c2,_0x5eeb1d){const _0x315f4=_0x5e0242;for(const _0x180ae4 in _0x5eeb1d){if(_0x180ae4[_0x315f4(0x16c)](/(.*):(.*)/i)){const _0x36e34e=String(RegExp['$1']),_0x40de72=String(RegExp['$2'])[_0x315f4(0x24b)]()[_0x315f4(0x2e8)]();let _0x32e59e,_0xfce1e7,_0x5b9337;switch(_0x40de72){case _0x315f4(0x2ed):_0x32e59e=_0x5eeb1d[_0x180ae4]!==''?Number(_0x5eeb1d[_0x180ae4]):0x0;break;case _0x315f4(0x26f):_0xfce1e7=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):[],_0x32e59e=_0xfce1e7['map'](_0x48db6e=>Number(_0x48db6e));break;case _0x315f4(0x2e0):_0x32e59e=_0x5eeb1d[_0x180ae4]!==''?eval(_0x5eeb1d[_0x180ae4]):null;break;case'ARRAYEVAL':_0xfce1e7=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):[],_0x32e59e=_0xfce1e7[_0x315f4(0x2e6)](_0x395104=>eval(_0x395104));break;case _0x315f4(0x309):_0x32e59e=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):'';break;case'ARRAYJSON':_0xfce1e7=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):[],_0x32e59e=_0xfce1e7[_0x315f4(0x2e6)](_0x5c3d89=>JSON[_0x315f4(0x2e3)](_0x5c3d89));break;case _0x315f4(0x15f):_0x32e59e=_0x5eeb1d[_0x180ae4]!==''?new Function(JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4])):new Function('return\x200');break;case'ARRAYFUNC':_0xfce1e7=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):[],_0x32e59e=_0xfce1e7[_0x315f4(0x2e6)](_0x3d6da0=>new Function(JSON['parse'](_0x3d6da0)));break;case'STR':_0x32e59e=_0x5eeb1d[_0x180ae4]!==''?String(_0x5eeb1d[_0x180ae4]):'';break;case _0x315f4(0x218):_0xfce1e7=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):[],_0x32e59e=_0xfce1e7[_0x315f4(0x2e6)](_0xda1d20=>String(_0xda1d20));break;case _0x315f4(0x1f2):_0x5b9337=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):{},_0x32e59e=VisuMZ[_0x315f4(0x2d8)]({},_0x5b9337);break;case _0x315f4(0x183):_0xfce1e7=_0x5eeb1d[_0x180ae4]!==''?JSON[_0x315f4(0x2e3)](_0x5eeb1d[_0x180ae4]):[],_0x32e59e=_0xfce1e7[_0x315f4(0x2e6)](_0x465e23=>VisuMZ[_0x315f4(0x2d8)]({},JSON[_0x315f4(0x2e3)](_0x465e23)));break;default:continue;}_0x1597c2[_0x36e34e]=_0x32e59e;}}return _0x1597c2;},(_0x2396e4=>{const _0x185d7b=_0x5e0242,_0x52ca64=_0x2396e4[_0x185d7b(0x21c)];for(const _0x5db3c4 of dependencies){if(!Imported[_0x5db3c4]){alert(_0x185d7b(0x1ef)[_0x185d7b(0x311)](_0x52ca64,_0x5db3c4)),SceneManager[_0x185d7b(0x158)]();break;}}const _0x1fa68d=_0x2396e4[_0x185d7b(0x284)];if(_0x1fa68d[_0x185d7b(0x16c)](/\[Version[ ](.*?)\]/i)){const _0x3e5408=Number(RegExp['$1']);_0x3e5408!==VisuMZ[label][_0x185d7b(0x28e)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x185d7b(0x311)](_0x52ca64,_0x3e5408)),SceneManager[_0x185d7b(0x158)]());}if(_0x1fa68d['match'](/\[Tier[ ](\d+)\]/i)){const _0x48de7c=Number(RegExp['$1']);_0x48de7c<tier?(alert(_0x185d7b(0x2ea)[_0x185d7b(0x311)](_0x52ca64,_0x48de7c,tier)),SceneManager[_0x185d7b(0x158)]()):tier=Math['max'](_0x48de7c,tier);}VisuMZ[_0x185d7b(0x2d8)](VisuMZ[label][_0x185d7b(0x253)],_0x2396e4[_0x185d7b(0x18a)]);})(pluginData),VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x305)]={'showMultiLayerGauge':/<SHOW MULTI(?:|-| )LAYER (?:HP |)GAUGE>/i,'hideMultiLayerGauge':/<HIDE MULTI(?:|-| )LAYER (?:HP |)GAUGE>/i,'persistMultiLayerGauge':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:PERSIST|PERSISTANT)>/i,'temporalMultiLayerGauge':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:TEMP|TEMPORAL|TEMPORARY)>/i,'layers':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE LAYERS:[ ](\d+)>/i,'faceGraphic':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:FACE|GRAPHIC|FACE GRAPHIC):[ ](.*),[ ]*(\d+)>/i,'bgColor':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:BG|BG |BACKGROUND )COLOR:[ ](.*)>/i,'borderColor':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE BORDER COLOR:[ ](.*)>/i,'borderThick':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE BORDER (?:THICK|THICKNESS|SIZE):[ ](\d+)>/i},ImageManager['svActorHorzCells']=ImageManager[_0x5e0242(0x1c9)]||0x9,ImageManager[_0x5e0242(0x153)]=ImageManager[_0x5e0242(0x153)]||0x6,TextManager[_0x5e0242(0x2b7)]={'valueFmt':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x16d)][_0x5e0242(0x1f4)]??_0x5e0242(0x2ff),'valuePercentDigits':VisuMZ[_0x5e0242(0x2d6)]['Settings']['Gauge'][_0x5e0242(0x269)]??0x2},ColorManager[_0x5e0242(0x2b7)]={'color1':{'layer2':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['LayerColors'][_0x5e0242(0x2fc)]??_0x5e0242(0x2a6),'layer3':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x1a2)]??_0x5e0242(0x1de),'layer4':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x28a)]??_0x5e0242(0x163),'layer5':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x278)]??_0x5e0242(0x1a8),'layer6':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x19f)]??_0x5e0242(0x2d9),'layer7':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x2cb)]??'#2e3192','layer8':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x23f)]??_0x5e0242(0x17b),'layer9':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x164)]??_0x5e0242(0x155),'layer10':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x244)]??_0x5e0242(0x201)},'color2':{'layer2':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x152)]??_0x5e0242(0x188),'layer3':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x1b8)]??_0x5e0242(0x18d),'layer4':VisuMZ['MultiLayerHpGauge']['Settings'][_0x5e0242(0x20d)][_0x5e0242(0x273)]??_0x5e0242(0x191),'layer5':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x1ff)]??_0x5e0242(0x280),'layer6':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)]['layer6_color2']??'#8393ca','layer7':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x232)]??'#605ca8','layer8':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['LayerColors'][_0x5e0242(0x1a7)]??_0x5e0242(0x209),'layer9':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x20d)][_0x5e0242(0x22e)]??_0x5e0242(0x21f),'layer10':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x20d)]['layer10_color2']??_0x5e0242(0x314)}},ColorManager['getColor']=function(_0x4b730d){const _0x5149d9=_0x5e0242;return _0x4b730d=String(_0x4b730d),_0x4b730d[_0x5149d9(0x16c)](/#(.*)/i)?_0x5149d9(0x26e)[_0x5149d9(0x311)](String(RegExp['$1'])):this['textColor'](Number(_0x4b730d));},ColorManager[_0x5e0242(0x227)]=function(_0x166d19){const _0x1903c1=_0x5e0242;if(_0x166d19<0x1)return this[_0x1903c1(0x2ad)]();else{if(_0x166d19===0x1)return this[_0x1903c1(0x1ad)]();else{const _0x31272d=_0x1903c1(0x1c5)[_0x1903c1(0x311)](_0x166d19[_0x1903c1(0x259)](0x2,0xa)),_0x367777=ColorManager[_0x1903c1(0x2b7)][_0x1903c1(0x1b3)][_0x31272d];return this[_0x1903c1(0x231)](_0x367777);}}},ColorManager[_0x5e0242(0x199)]=function(_0x10b352){const _0x11a0ed=_0x5e0242;if(_0x10b352<0x1)return this[_0x11a0ed(0x2ad)]();else{if(_0x10b352===0x1)return this[_0x11a0ed(0x2a9)]();else{const _0x7ab0a4=_0x11a0ed(0x1c5)[_0x11a0ed(0x311)](_0x10b352[_0x11a0ed(0x259)](0x2,0xa)),_0x17aba3=ColorManager[_0x11a0ed(0x2b7)][_0x11a0ed(0x2ef)][_0x7ab0a4];return this[_0x11a0ed(0x231)](_0x17aba3);}}},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x266)]=BattleManager[_0x5e0242(0x217)],BattleManager[_0x5e0242(0x217)]=function(){const _0x17b828=_0x5e0242;VisuMZ['MultiLayerHpGauge']['BattleManager_endAction'][_0x17b828(0x29a)](this),!$gameTroop[_0x17b828(0x210)]()&&$gameTroop['clearMultiLayerHpGaugeMembers']();},VisuMZ[_0x5e0242(0x2d6)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x5e0242(0x24f)][_0x5e0242(0x20c)],Game_BattlerBase['prototype'][_0x5e0242(0x20c)]=function(){const _0x2b3657=_0x5e0242;VisuMZ[_0x2b3657(0x2d6)][_0x2b3657(0x2b9)][_0x2b3657(0x29a)](this);if(this[_0x2b3657(0x19c)]())$gameTroop[_0x2b3657(0x1cf)]();},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x275)]=Game_BattlerBase[_0x5e0242(0x24f)][_0x5e0242(0x17e)],Game_BattlerBase[_0x5e0242(0x24f)]['appear']=function(){const _0x3b4382=_0x5e0242;VisuMZ[_0x3b4382(0x2d6)][_0x3b4382(0x275)][_0x3b4382(0x29a)](this);if(this['isEnemy']())$gameTroop[_0x3b4382(0x1cf)]();},Game_Enemy[_0x5e0242(0x2b7)]={'showDefault':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x252)][_0x5e0242(0x157)]??![],'persist':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x252)][_0x5e0242(0x246)]??!![],'defaultLayers':VisuMZ[_0x5e0242(0x2d6)]['Settings']['Defaults'][_0x5e0242(0x1af)]??0x1,'bgColor1':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Defaults'][_0x5e0242(0x219)]??0x13,'bgColor2':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x252)][_0x5e0242(0x2e7)]??0x12,'borderColor':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x252)][_0x5e0242(0x292)]??0x2,'borderthickness':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x252)][_0x5e0242(0x236)]??0x2},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x302)]=function(){const _0x36c09f=_0x5e0242;if(!this['enemy']())return![];return this['isAppeared']()&&this[_0x36c09f(0x290)]()&&this[_0x36c09f(0x268)]();},Game_Enemy['prototype'][_0x5e0242(0x268)]=function(){const _0x74c044=_0x5e0242;if(this[_0x74c044(0x226)]!==undefined)return this[_0x74c044(0x226)];this[_0x74c044(0x226)]=Game_Enemy[_0x74c044(0x2b7)][_0x74c044(0x157)];const _0x5cd88e=VisuMZ['MultiLayerHpGauge'][_0x74c044(0x305)],_0x287d90=this['enemy']()[_0x74c044(0x17f)]||'';if(_0x287d90['match'](_0x5cd88e[_0x74c044(0x169)]))this[_0x74c044(0x226)]=!![];else{if(_0x287d90[_0x74c044(0x16c)](_0x5cd88e[_0x74c044(0x1f9)]))this[_0x74c044(0x226)]=!![];else{if(_0x287d90['match'](_0x5cd88e[_0x74c044(0x317)]))this[_0x74c044(0x226)]=!![];else{if(_0x287d90['match'](_0x5cd88e[_0x74c044(0x1d2)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x287d90['match'](_0x5cd88e[_0x74c044(0x2dd)]))this[_0x74c044(0x226)]=!![];else{if(_0x287d90[_0x74c044(0x16c)](_0x5cd88e['borderColor']))this[_0x74c044(0x226)]=!![];else{if(_0x287d90[_0x74c044(0x16c)](_0x5cd88e[_0x74c044(0x184)]))this[_0x74c044(0x226)]=!![];else{if(_0x287d90[_0x74c044(0x16c)](_0x5cd88e[_0x74c044(0x27d)]))this[_0x74c044(0x226)]=!![];else _0x287d90['match'](_0x5cd88e['hideMultiLayerGauge'])&&(this[_0x74c044(0x226)]=![]);}}}}}}}return this[_0x74c044(0x226)];},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x240)]=Game_Enemy['prototype']['transform'],Game_Enemy[_0x5e0242(0x24f)]['transform']=function(_0x3b904a){const _0xa22a19=_0x5e0242;VisuMZ[_0xa22a19(0x2d6)][_0xa22a19(0x240)][_0xa22a19(0x29a)](this,_0x3b904a),this[_0xa22a19(0x226)]=undefined,this[_0xa22a19(0x268)](),$gameTroop[_0xa22a19(0x1cf)]();},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x290)]=function(){return this['isMultiLayerGaugeLifeStatePersistant']()?!![]:!this['isDead']();},Game_Enemy[_0x5e0242(0x24f)]['isMultiLayerGaugeLifeStatePersistant']=function(){const _0x30605f=_0x5e0242,_0x4ee78b=VisuMZ[_0x30605f(0x2d6)][_0x30605f(0x305)],_0x51d710=this[_0x30605f(0x30d)]()[_0x30605f(0x17f)]||'';if(_0x51d710[_0x30605f(0x16c)](_0x4ee78b[_0x30605f(0x1f9)]))return!![];else{if(_0x51d710[_0x30605f(0x16c)](_0x4ee78b[_0x30605f(0x317)]))return![];}return Game_Enemy[_0x30605f(0x2b7)][_0x30605f(0x246)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x293)]=function(){const _0x392db5=_0x5e0242;if(this[_0x392db5(0x18e)]!==undefined)return this['_multiLayerHpGaugeBgColorData'];this[_0x392db5(0x18e)]={'bgColor1':Game_Enemy[_0x392db5(0x2b7)]['bgColor1'],'bgColor2':Game_Enemy[_0x392db5(0x2b7)][_0x392db5(0x2e7)]};const _0x56479e=VisuMZ[_0x392db5(0x2d6)][_0x392db5(0x305)],_0x182d96=this['enemy']()[_0x392db5(0x17f)]||'';if(_0x182d96[_0x392db5(0x16c)](_0x56479e[_0x392db5(0x2dd)])){const _0x27bde4=String(RegExp['$1'])[_0x392db5(0x26b)](',')['map'](_0x247085=>_0x247085[_0x392db5(0x2e8)]());this['_multiLayerHpGaugeBgColorData'][_0x392db5(0x219)]=_0x27bde4[0x0],this[_0x392db5(0x18e)][_0x392db5(0x2e7)]=_0x27bde4[0x1]||_0x27bde4[0x0];}return this[_0x392db5(0x18e)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x288)]=function(){const _0x49a2b9=_0x5e0242;this['_multiLayerHpGaugeBgColorData']=undefined,this[_0x49a2b9(0x293)]();},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x30b)]=function(){const _0x41d85a=_0x5e0242;return this[_0x41d85a(0x293)]()[_0x41d85a(0x219)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x1e5)]=function(){const _0x13e667=_0x5e0242;return this['getMultiLayerHpGaugeBgColorData']()[_0x13e667(0x2e7)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x194)]=function(){const _0x1e0543=_0x5e0242;if(this[_0x1e0543(0x15a)]!==undefined)return this[_0x1e0543(0x15a)];this[_0x1e0543(0x15a)]={'color':Game_Enemy[_0x1e0543(0x2b7)]['borderColor'],'thick':Game_Enemy[_0x1e0543(0x2b7)][_0x1e0543(0x236)]};const _0xfc8e99=VisuMZ['MultiLayerHpGauge'][_0x1e0543(0x305)],_0x3aa5ff=this['enemy']()['note']||'';return _0x3aa5ff[_0x1e0543(0x16c)](_0xfc8e99['borderColor'])&&(this[_0x1e0543(0x15a)][_0x1e0543(0x1c8)]=String(RegExp['$1'])[_0x1e0543(0x2e8)]()),_0x3aa5ff[_0x1e0543(0x16c)](_0xfc8e99[_0x1e0543(0x184)])&&(this[_0x1e0543(0x15a)]['thick']=Math[_0x1e0543(0x1a9)](Number(RegExp['$1']),0x1)),this[_0x1e0543(0x15a)];},Game_Enemy[_0x5e0242(0x24f)]['updateMultiLayerHpGaugeBorderData']=function(){const _0x574501=_0x5e0242;this['_multiLayerHpGaugeBorderData']=undefined,this[_0x574501(0x194)]();},Game_Enemy['prototype'][_0x5e0242(0x27a)]=function(){return this['getMultiLayerHpGaugeBorderData']()['color'];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x174)]=function(){const _0x6d1be7=_0x5e0242;return this[_0x6d1be7(0x194)]()['thick'];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x23e)]=function(){const _0x4f4894=_0x5e0242;if(this['getMultiLayerHpGaugeFaceName']()!=='')return _0x4f4894(0x15b);else{if(Imported['VisuMZ_1_BattleCore']&&this[_0x4f4894(0x310)]())return _0x4f4894(0x1ec);else return $gameSystem[_0x4f4894(0x1dc)]()?'svenemy':_0x4f4894(0x30d);}},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x294)]=function(){const _0x12a630=_0x5e0242;if(this[_0x12a630(0x150)]!==undefined)return this[_0x12a630(0x150)];this[_0x12a630(0x150)]={'name':'','index':0x0};const _0x4c0559=VisuMZ['MultiLayerHpGauge'][_0x12a630(0x305)],_0x19444c=this['enemy']()['note']||'';return _0x19444c[_0x12a630(0x16c)](_0x4c0559[_0x12a630(0x1d2)])&&(this[_0x12a630(0x150)]={'name':String(RegExp['$1'])[_0x12a630(0x2e8)](),'index':Math[_0x12a630(0x1a9)](Number(RegExp['$2']),0x0)}),this[_0x12a630(0x150)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x178)]=function(){const _0x2a1a94=_0x5e0242;this['_multiLayerHpGaugeFaceGraphicData']=undefined,this[_0x2a1a94(0x294)]();},Game_Enemy[_0x5e0242(0x24f)]['getMultiLayerHpGaugeFaceName']=function(){const _0x3f36c9=_0x5e0242;return this[_0x3f36c9(0x294)]()['name'];},Game_Enemy[_0x5e0242(0x24f)]['getMultiLayerHpGaugeFaceIndex']=function(){const _0x9a7600=_0x5e0242;return this[_0x9a7600(0x294)]()[_0x9a7600(0x168)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x2ba)]=function(){const _0x30828b=_0x5e0242;if(this[_0x30828b(0x1f5)]!==undefined)return this[_0x30828b(0x1f5)];this['_multiLayerHpGaugeTotalLayers']=Game_Enemy[_0x30828b(0x2b7)][_0x30828b(0x1af)];const _0x5f0ef5=VisuMZ[_0x30828b(0x2d6)][_0x30828b(0x305)],_0x339a5b=this[_0x30828b(0x30d)]()[_0x30828b(0x17f)]||'';return _0x339a5b[_0x30828b(0x16c)](_0x5f0ef5['layers'])&&(this[_0x30828b(0x1f5)]=Number(RegExp['$1'])[_0x30828b(0x259)](0x1,0xa)),this[_0x30828b(0x1f5)];},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x1b0)]=function(){const _0x5c3c23=_0x5e0242,_0x3c8522=this[_0x5c3c23(0x2ba)]();if(_0x3c8522<=0x1)return 0x1;const _0x47475a=this[_0x5c3c23(0x2c3)]/_0x3c8522;let _0x11b7b8=this['hp']/_0x47475a;return _0x11b7b8%0x1===0x0?_0x11b7b8+=0x1:_0x11b7b8=Math[_0x5c3c23(0x25b)](_0x11b7b8),_0x11b7b8;},VisuMZ['MultiLayerHpGauge']['Game_Troop_setup']=Game_Troop[_0x5e0242(0x24f)][_0x5e0242(0x2aa)],Game_Troop['prototype'][_0x5e0242(0x2aa)]=function(_0xae6e78){const _0x8a7877=_0x5e0242;VisuMZ['MultiLayerHpGauge'][_0x8a7877(0x2fa)][_0x8a7877(0x29a)](this,_0xae6e78),this[_0x8a7877(0x1cf)]();},Game_Troop[_0x5e0242(0x24f)]['visibleMultiLayerHpGaugeMembers']=function(){const _0x4d03bd=_0x5e0242;if(this[_0x4d03bd(0x186)]!==undefined)return this[_0x4d03bd(0x186)];return this['_cache_visibleMultiLayerHpGaugeMembers']=this[_0x4d03bd(0x18f)]()[_0x4d03bd(0x304)](_0x173f58=>_0x173f58&&_0x173f58[_0x4d03bd(0x302)]()),this[_0x4d03bd(0x186)];},Game_Troop[_0x5e0242(0x24f)][_0x5e0242(0x1cf)]=function(){const _0x50cb19=_0x5e0242;this[_0x50cb19(0x186)]=undefined,this[_0x50cb19(0x2ae)]();},Game_Troop['prototype'][_0x5e0242(0x1c0)]=function(){const _0x367b52=_0x5e0242;return this['visibleMultiLayerHpGaugeMembers']()[_0x367b52(0x225)];},Game_Troop[_0x5e0242(0x24f)][_0x5e0242(0x23b)]=function(){const _0x1714c9=_0x5e0242;return Math[_0x1714c9(0x1a9)](this[_0x1714c9(0x1c0)](),0x1);},Game_Troop[_0x5e0242(0x24f)]['totalVisibleMultiLayerHpGaugeRows']=function(){const _0x378817=_0x5e0242,_0x5002dd=this[_0x378817(0x1c0)](),_0x1b2241=Scene_Battle[_0x378817(0x2b7)][_0x378817(0x2eb)];return Math[_0x378817(0x25b)](_0x5002dd/_0x1b2241);},Scene_Battle['MULTI_LAYER_HP_GAUGE']={'maxWidth':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x18c)][_0x5e0242(0x256)]??0x330,'perRow':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x18c)][_0x5e0242(0x2eb)]??0x4,'rowSpacing':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['General'][_0x5e0242(0x238)]??0x4,'fadeSpeed':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x18c)][_0x5e0242(0x1e7)]??0x18},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x1b7)]=Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x2b3)],Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x2b3)]=function(){const _0x38265f=_0x5e0242;this[_0x38265f(0x2f3)](),VisuMZ[_0x38265f(0x2d6)]['Scene_Battle_createAllWindows']['call'](this);},Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x2f3)]=function(){const _0x32b131=_0x5e0242;this['createMultiLayerHpGaugeContainer'](),this[_0x32b131(0x2ee)]();},Scene_Battle[_0x5e0242(0x24f)]['createMultiLayerHpGaugeContainer']=function(){const _0x1d1d98=_0x5e0242;this['_multiLayerHpGaugeContainer']=new Sprite(),this['addWindow'](this['_multiLayerHpGaugeContainer']);const _0x234ce3=Scene_Battle[_0x1d1d98(0x2b7)][_0x1d1d98(0x256)],_0x10c7bb=Math['floor']((Graphics['boxWidth']-_0x234ce3)/0x2);this[_0x1d1d98(0x29f)]['x']=_0x10c7bb;},Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x2ee)]=function(){const _0x21dd5d=_0x5e0242,_0x23b666=$gameTroop[_0x21dd5d(0x18f)]();for(const _0xc98460 of _0x23b666){if(!_0xc98460)continue;this[_0x21dd5d(0x203)](_0xc98460);}},Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x203)]=function(_0x44492f){const _0x1bc9a8=_0x5e0242,_0x530bc6=new Sprite_MultiLayerHpContainer(_0x44492f);this[_0x1bc9a8(0x29f)][_0x1bc9a8(0x167)](_0x530bc6);},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x2d7)]=Scene_Battle[_0x5e0242(0x24f)]['update'],Scene_Battle[_0x5e0242(0x24f)]['update']=function(){const _0xf4a682=_0x5e0242;VisuMZ['MultiLayerHpGauge']['Scene_Battle_update'][_0xf4a682(0x29a)](this),this[_0xf4a682(0x30f)]();},Scene_Battle[_0x5e0242(0x24f)]['updateMultiLayerHpGaugeContainer']=function(){const _0x9b0575=_0x5e0242;this[_0x9b0575(0x31f)](),this['updateMultiLayerHpGaugeContainerRemoval']();},Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x31f)]=function(){const _0x555896=_0x5e0242;(BattleManager[_0x555896(0x161)]===_0x555896(0x2f2)||BattleManager[_0x555896(0x31a)])&&this[_0x555896(0x29f)]&&(this[_0x555896(0x29f)][_0x555896(0x1c6)]-=Scene_Battle[_0x555896(0x2b7)][_0x555896(0x187)]);},Scene_Battle['prototype'][_0x5e0242(0x261)]=function(){const _0x2516bd=_0x5e0242,_0x1d7cf2=this['_multiLayerHpGaugeContainer']['children'][_0x2516bd(0x304)](_0x57d889=>_0x57d889[_0x2516bd(0x1ca)]&&_0x57d889[_0x2516bd(0x1c6)]<=0x0);for(const _0x176928 of _0x1d7cf2){this[_0x2516bd(0x29f)][_0x2516bd(0x287)](_0x176928),_0x176928[_0x2516bd(0x1ba)]();}},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x1b6)]=Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x249)],Scene_Battle[_0x5e0242(0x24f)][_0x5e0242(0x249)]=function(){const _0x362240=_0x5e0242;VisuMZ[_0x362240(0x2d6)][_0x362240(0x1b6)][_0x362240(0x29a)](this);if(this[_0x362240(0x1e3)])this[_0x362240(0x1e3)][_0x362240(0x2a7)]();};function Sprite_MultiLayerHpContainer(){const _0x2ef58f=_0x5e0242;this[_0x2ef58f(0x303)](...arguments);}Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)]=Object[_0x5e0242(0x1a4)](Sprite_Clickable['prototype']),Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x282)]=Sprite_MultiLayerHpContainer,Sprite_MultiLayerHpContainer[_0x5e0242(0x248)]={'bufferX':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x18c)]['bufferX']??0x4,'checkFrequency':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['General']['checkFrequency']??0x14,'faceSize':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x18c)]['faceSize']??0x40,'fadeSpeed':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x18c)][_0x5e0242(0x19b)]??0x10,'repositionForHelp':VisuMZ[_0x5e0242(0x2d6)]['Settings']['General'][_0x5e0242(0x29b)]??!![],'repositionHelpY':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x18c)][_0x5e0242(0x229)]??0x6c,'stateTooltipsEnable':VisuMZ['MultiLayerHpGauge']['Settings']['General'][_0x5e0242(0x29d)]??!![],'offset':{'x':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x18c)]['offsetX']??0x0,'y':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x18c)][_0x5e0242(0x220)]??0x0}},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)]['initialize']=function(_0x3c4c4e){const _0x30122d=_0x5e0242;this[_0x30122d(0x26c)]=_0x3c4c4e,Sprite_Clickable[_0x30122d(0x24f)][_0x30122d(0x303)][_0x30122d(0x29a)](this),this[_0x30122d(0x1c6)]=0x0,this['createBattlerGraphicSprite'](),this[_0x30122d(0x2cd)](),this[_0x30122d(0x2dc)](),this[_0x30122d(0x200)]();},Sprite_MultiLayerHpContainer['prototype'][_0x5e0242(0x255)]=function(){const _0x20618b=_0x5e0242;if(!Sprite_MultiLayerHpFace[_0x20618b(0x248)][_0x20618b(0x2fe)])return;const _0x1a2e34=new Sprite_MultiLayerHpFace(this['_battler']);this['addChild'](_0x1a2e34),this[_0x20618b(0x1cd)]=_0x1a2e34;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)]['faceSize']=function(){const _0x4b9c25=_0x5e0242;return Sprite_MultiLayerHpFace[_0x4b9c25(0x248)][_0x4b9c25(0x2fe)]?Sprite_MultiLayerHpContainer[_0x4b9c25(0x248)][_0x4b9c25(0x312)]:0x0;},Sprite_MultiLayerHpContainer['prototype'][_0x5e0242(0x2cd)]=function(){const _0x1da294=_0x5e0242;if(!Sprite_MultiLayerHpGauge[_0x1da294(0x248)]['show'])return;const _0x18677b=new Sprite_MultiLayerHpGauge(this[_0x1da294(0x26c)]);this[_0x1da294(0x167)](_0x18677b),this[_0x1da294(0x166)]=_0x18677b;const _0x28dea9=this[_0x1da294(0x312)](),_0x4181dd=Sprite_MultiLayerHpContainer['SETTINGS'][_0x1da294(0x1fa)],_0x584663=Sprite_MultiLayerHpGauge[_0x1da294(0x248)][_0x1da294(0x1d8)];_0x18677b['x']=_0x28dea9,_0x18677b['x']+=_0x4181dd,_0x18677b['x']+=_0x584663['x'],_0x18677b['y']=0x0,_0x18677b['y']+=_0x584663['y'],_0x18677b[_0x1da294(0x2aa)](this['_battler'],'hp'),this[_0x1da294(0x17c)]();},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x156)]=function(){const _0x34fd92=_0x5e0242,_0x3f64da=this[_0x34fd92(0x312)](),_0x37f791=Sprite_MultiLayerHpContainer['SETTINGS'][_0x34fd92(0x1fa)],_0x10db18=Scene_Battle[_0x34fd92(0x2b7)][_0x34fd92(0x256)],_0xed6f2f=Math[_0x34fd92(0x1b4)]($gameTroop[_0x34fd92(0x23b)](),Scene_Battle[_0x34fd92(0x2b7)][_0x34fd92(0x2eb)]);return Math['ceil'](_0x10db18/_0xed6f2f)-_0x37f791*0x2-_0x3f64da;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)]['updateGaugeWidth']=function(){const _0x3a1f64=_0x5e0242;if(!this[_0x3a1f64(0x166)])return;const _0x48d9dd=this['calcBitmapWidth']();this[_0x3a1f64(0x166)][_0x3a1f64(0x212)](_0x48d9dd);},Sprite_MultiLayerHpContainer['prototype'][_0x5e0242(0x2dc)]=function(){const _0x257b60=_0x5e0242;if(!Sprite_MultiLayerHpStates[_0x257b60(0x248)]['show'])return;const _0x1d7d3c=new Sprite_MultiLayerHpStates(this[_0x257b60(0x26c)]);this['addChild'](_0x1d7d3c),this['_statesSprite']=_0x1d7d3c;const _0x300631=this[_0x257b60(0x312)](),_0x2a6cc7=Sprite_MultiLayerHpContainer['SETTINGS'][_0x257b60(0x1fa)],_0x51889f=Sprite_MultiLayerHpStates[_0x257b60(0x248)][_0x257b60(0x1d8)];_0x1d7d3c['x']=_0x300631,_0x1d7d3c['x']+=_0x2a6cc7,_0x1d7d3c['x']+=_0x51889f['x'],_0x1d7d3c['y']=0x0,_0x1d7d3c['y']+=_0x51889f['y'],this['updateStatesWidth']();},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x2f4)]=function(){const _0x2f9f62=_0x5e0242;if(!this['_statesSprite'])return;const _0x24efc3=this[_0x2f9f62(0x156)]();this[_0x2f9f62(0x234)][_0x2f9f62(0x212)](_0x24efc3);},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x200)]=function(){const _0x22848b=_0x5e0242;this[_0x22848b(0x216)]!==$gameTroop['totalVisibleMultiLayerHpGaugeCount']()&&(this[_0x22848b(0x195)](),this[_0x22848b(0x281)]()),this[_0x22848b(0x23d)]!==$gameTroop[_0x22848b(0x2ae)]()[_0x22848b(0x279)](this['_battler'])&&(this['setIndexData'](),this[_0x22848b(0x1f6)]()),this['_finishChecks']=!![];},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x195)]=function(){this['_lastTotalVisibleGauges']=$gameTroop['totalVisibleMultiLayerHpGaugeCount']();},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x1ea)]=function(){const _0x4a8b78=_0x5e0242,_0x4d48c6=Scene_Battle[_0x4a8b78(0x2b7)][_0x4a8b78(0x256)],_0x6f0b23=Math[_0x4a8b78(0x1b4)](this[_0x4a8b78(0x216)],Scene_Battle[_0x4a8b78(0x2b7)][_0x4a8b78(0x2eb)]);return Math[_0x4a8b78(0x1e4)](_0x4d48c6/_0x6f0b23);},Sprite_MultiLayerHpContainer['prototype'][_0x5e0242(0x281)]=function(){const _0x1a5d4e=_0x5e0242,_0x441e89=this['calcWidth']();this[_0x1a5d4e(0x206)]=_0x441e89;const _0x2cc7fb=Sprite_MultiLayerHpContainer[_0x1a5d4e(0x248)]['faceSize'];this[_0x1a5d4e(0x162)]?(this['bitmap'][_0x1a5d4e(0x1c1)](),this['bitmap'][_0x1a5d4e(0x189)](_0x441e89,_0x2cc7fb),this[_0x1a5d4e(0x2ce)]=_0x441e89,this[_0x1a5d4e(0x239)]=_0x2cc7fb,this[_0x1a5d4e(0x17c)](),this[_0x1a5d4e(0x2f4)]()):this[_0x1a5d4e(0x162)]=new Bitmap(_0x441e89,_0x2cc7fb),this[_0x1a5d4e(0x23d)]=undefined;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x159)]=function(){const _0x2a0c01=_0x5e0242;this[_0x2a0c01(0x23d)]=$gameTroop[_0x2a0c01(0x2ae)]()[_0x2a0c01(0x279)](this[_0x2a0c01(0x26c)]);},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x1e9)]=function(){const _0x29978c=_0x5e0242;Sprite_Clickable[_0x29978c(0x24f)][_0x29978c(0x1e9)][_0x29978c(0x29a)](this);if(!this[_0x29978c(0x26c)])return;Graphics[_0x29978c(0x228)]%Sprite_MultiLayerHpContainer[_0x29978c(0x248)][_0x29978c(0x2a0)]===0x0&&this[_0x29978c(0x27b)](),this[_0x29978c(0x2e1)](),this[_0x29978c(0x1ae)](),this['updateSelectionEffect']();},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x17d)]=function(){const _0x3aa91e=_0x5e0242;if(this[_0x3aa91e(0x23d)]<0x0)return Graphics[_0x3aa91e(0x2ce)]*0xa;const _0x4c714d=Scene_Battle[_0x3aa91e(0x2b7)][_0x3aa91e(0x256)],_0x7f697c=Math[_0x3aa91e(0x1b4)](this[_0x3aa91e(0x216)],Scene_Battle[_0x3aa91e(0x2b7)][_0x3aa91e(0x2eb)]),_0x3b429e=Math['ceil'](_0x4c714d/_0x7f697c),_0x547a59=this[_0x3aa91e(0x23d)]%Scene_Battle[_0x3aa91e(0x2b7)][_0x3aa91e(0x2eb)];let _0x511932=_0x3b429e*_0x547a59;return _0x511932+=Sprite_MultiLayerHpContainer[_0x3aa91e(0x248)][_0x3aa91e(0x1d8)]['x'],_0x511932;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x1f6)]=function(){const _0x57d61c=_0x5e0242;if(this['_hold'])return;if(this[_0x57d61c(0x23d)]===undefined)return;if(this[_0x57d61c(0x23d)]<0x0)return this['x']=Graphics['width']*0xa;const _0x13adfa=this['calcPositionX']();this[_0x57d61c(0x301)]=_0x13adfa,this['x']=_0x13adfa;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x1be)]=function(){const _0x4709a8=_0x5e0242;if(this[_0x4709a8(0x23d)]<0x0)return Graphics[_0x4709a8(0x239)]*0xa;const _0x1a0843=Sprite_MultiLayerHpContainer[_0x4709a8(0x248)],_0x2bf94f=Math['floor'](this['_lastIndex']/Scene_Battle[_0x4709a8(0x2b7)][_0x4709a8(0x2eb)]);let _0x30a1cc=_0x2bf94f*(0x4+_0x1a0843[_0x4709a8(0x312)]);return _0x30a1cc+=Sprite_MultiLayerHpContainer['SETTINGS'][_0x4709a8(0x1d8)]['y'],_0x30a1cc;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x2e1)]=function(){const _0x236b01=_0x5e0242;if(this[_0x236b01(0x1ca)])return;if(this[_0x236b01(0x23d)]===undefined)return;if(this[_0x236b01(0x23d)]<0x0)return this['y']=Graphics[_0x236b01(0x239)]*0xa;const _0x547761=Sprite_MultiLayerHpContainer[_0x236b01(0x248)];let _0x295893=this['calcPositionY']();this[_0x236b01(0x263)]=_0x295893;const _0x370a6c=SceneManager[_0x236b01(0x2bf)][_0x236b01(0x27f)];_0x370a6c&&_0x370a6c[_0x236b01(0x19a)]&&_0x547761[_0x236b01(0x29b)]&&(_0x295893+=_0x547761['repositionHelpY']);const _0x153724=SceneManager[_0x236b01(0x2bf)]['_helpWindow'];_0x153724&&_0x153724[_0x236b01(0x270)]>0x0&&_0x153724[_0x236b01(0x19a)]&&(_0x295893+=Graphics[_0x236b01(0x239)]*0xa);if(Imported[_0x236b01(0x177)]){const _0x4d728c=SceneManager[_0x236b01(0x2bf)];_0x4d728c&&_0x4d728c[_0x236b01(0x1f8)]&&_0x4d728c['_tutorialPageWindow'][_0x236b01(0x223)]&&(_0x295893+=Graphics['height']*0xa);}this['y']=_0x295893;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)]['updateOpacity']=function(){const _0x46a448=_0x5e0242,_0x3917e5=Sprite_MultiLayerHpContainer[_0x46a448(0x248)]['fadeSpeed'];this[_0x46a448(0x1c6)]+=this[_0x46a448(0x1ca)]?-_0x3917e5:_0x3917e5;},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x2fb)]=function(){const _0xf66f35=_0x5e0242;if(!this[_0xf66f35(0x26c)])return;const _0x5e7259=SceneManager[_0xf66f35(0x2bf)][_0xf66f35(0x15e)];if(!_0x5e7259)return;const _0x2e42a9=_0x5e7259[_0xf66f35(0x1c7)](this[_0xf66f35(0x26c)]);if(!_0x2e42a9)return;const _0x5b7251=_0x2e42a9[_0xf66f35(0x25e)]();if(!_0x5b7251)return;this['setBlendColor'](_0x5b7251['_blendColor']);},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x27b)]=function(){const _0x144e8a=_0x5e0242;if(!this[_0x144e8a(0x2a8)])return;if(this[_0x144e8a(0x216)]!==$gameTroop['totalVisibleMultiLayerHpGaugeCount']()){this['setTotalGauges']();if(this[_0x144e8a(0x206)]!==this['calcWidth']())return this['processReplacement']();}if(this['_lastIndex']!==$gameTroop[_0x144e8a(0x2ae)]()['indexOf'](this[_0x144e8a(0x26c)])){this['setIndexData']();if(this[_0x144e8a(0x301)]!==this[_0x144e8a(0x17d)]()||this['_lastPositionY']!==this[_0x144e8a(0x1be)]())return this['processReplacement']();}},Sprite_MultiLayerHpContainer[_0x5e0242(0x24f)][_0x5e0242(0x286)]=function(){const _0x314ff5=_0x5e0242;this['_hold']=!![];for(const _0x124aff of this['children']){if(_0x124aff)_0x124aff[_0x314ff5(0x1ca)]=!![];}const _0x45871a=SceneManager[_0x314ff5(0x2bf)];if(_0x45871a)_0x45871a[_0x314ff5(0x203)](this[_0x314ff5(0x26c)]);},Sprite_MultiLayerHpContainer['prototype']['getStateTooltipBattler']=function(){const _0x867388=_0x5e0242;if(this[_0x867388(0x1ca)])return null;if(!Sprite_MultiLayerHpContainer['SETTINGS'][_0x867388(0x29d)])return null;return this[_0x867388(0x26c)];};function Sprite_MultiLayerHpFace(){const _0x5868bb=_0x5e0242;this[_0x5868bb(0x303)](...arguments);}Sprite_MultiLayerHpFace[_0x5e0242(0x24f)]=Object[_0x5e0242(0x1a4)](Sprite[_0x5e0242(0x24f)]),Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x282)]=Sprite_MultiLayerHpFace,Sprite_MultiLayerHpFace[_0x5e0242(0x248)]={'show':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x233)][_0x5e0242(0x2fe)]??!![],'drawLetter':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x233)][_0x5e0242(0x15d)]??!![],'letterFontName':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x233)][_0x5e0242(0x213)]??'','letterFontSize':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x233)][_0x5e0242(0x19d)]??0x10},Sprite_MultiLayerHpFace['prototype']['initialize']=function(_0xda9ecc){const _0x1d5452=_0x5e0242;this[_0x1d5452(0x26c)]=_0xda9ecc,Sprite[_0x1d5452(0x24f)]['initialize'][_0x1d5452(0x29a)](this),this['createBgSprite'](),this[_0x1d5452(0x21a)](),this['createBorderSprite'](),this[_0x1d5452(0x27c)]();},Sprite_MultiLayerHpFace['prototype']['createBgSprite']=function(){const _0x238c10=_0x5e0242,_0x26fa5f=Sprite_MultiLayerHpContainer[_0x238c10(0x248)][_0x238c10(0x312)];this['_bgSprite']=new Sprite(),this[_0x238c10(0x167)](this[_0x238c10(0x193)]),this[_0x238c10(0x193)][_0x238c10(0x162)]=new Bitmap(_0x26fa5f,_0x26fa5f),this['drawBgSprite']();},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x21a)]=function(){const _0xe8f88e=_0x5e0242,_0x4c0178=Sprite_MultiLayerHpContainer[_0xe8f88e(0x248)]['faceSize'];this[_0xe8f88e(0x28c)]=new Sprite(),this[_0xe8f88e(0x167)](this[_0xe8f88e(0x28c)]),this[_0xe8f88e(0x28c)][_0xe8f88e(0x162)]=new Bitmap(_0x4c0178,_0x4c0178),this[_0xe8f88e(0x22b)]();},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x20b)]=function(){const _0x1b70c7=_0x5e0242,_0x9aac2c=Sprite_MultiLayerHpContainer[_0x1b70c7(0x248)][_0x1b70c7(0x312)];this[_0x1b70c7(0x2f7)]=new Sprite(),this['addChild'](this[_0x1b70c7(0x2f7)]),this[_0x1b70c7(0x2f7)]['bitmap']=new Bitmap(_0x9aac2c,_0x9aac2c),this['drawBorderSprite']();},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x27c)]=function(){const _0x1dc099=_0x5e0242;if(!Sprite_MultiLayerHpFace[_0x1dc099(0x248)]['drawLetter'])return;const _0x1ec8c4=Sprite_MultiLayerHpContainer[_0x1dc099(0x248)][_0x1dc099(0x312)];this['_letterSprite']=new Sprite(),this[_0x1dc099(0x167)](this[_0x1dc099(0x1fb)]),this[_0x1dc099(0x1fb)][_0x1dc099(0x162)]=new Bitmap(_0x1ec8c4,_0x1ec8c4),this[_0x1dc099(0x2b2)]();},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)]['drawBgSprite']=function(){const _0x558737=_0x5e0242,_0x171818=this[_0x558737(0x193)]['bitmap'],_0x3e4c5d=ColorManager[_0x558737(0x231)](this[_0x558737(0x26c)][_0x558737(0x30b)]()),_0x54f622=ColorManager['getColor'](this[_0x558737(0x26c)][_0x558737(0x1e5)]()),_0x31645d=Sprite_MultiLayerHpContainer[_0x558737(0x248)][_0x558737(0x312)];_0x171818[_0x558737(0x1c1)](),_0x171818[_0x558737(0x172)](0x0,0x0,_0x31645d,_0x31645d,_0x3e4c5d,_0x54f622,!![]),_0x171818['strokeRect'](0x0,0x0,_0x31645d,_0x31645d,_0x3e4c5d);},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x274)]=function(){const _0x656754=_0x5e0242,_0x5b01c5=this['_borderSprite'][_0x656754(0x162)],_0x4e6b5e=_0x656754(0x190),_0x14f357=ColorManager[_0x656754(0x231)](this[_0x656754(0x26c)][_0x656754(0x27a)]()),_0x1e2e6c=this[_0x656754(0x26c)]['getMultiLayerHpGaugeBorderThickness'](),_0x291acc=Sprite_MultiLayerHpContainer[_0x656754(0x248)][_0x656754(0x312)];let _0x49544f=0x0;_0x5b01c5[_0x656754(0x1c1)](),_0x5b01c5[_0x656754(0x30a)](_0x49544f,_0x49544f,_0x291acc-_0x49544f*0x2,_0x291acc-_0x49544f*0x2,_0x4e6b5e),_0x49544f+=0x1,_0x5b01c5[_0x656754(0x30a)](_0x49544f,_0x49544f,_0x291acc-_0x49544f*0x2,_0x291acc-_0x49544f*0x2,_0x14f357),_0x49544f+=_0x1e2e6c,_0x5b01c5['fillRect'](_0x49544f,_0x49544f,_0x291acc-_0x49544f*0x2,_0x291acc-_0x49544f*0x2,_0x4e6b5e),_0x49544f+=0x1,_0x5b01c5['clearRect'](_0x49544f,_0x49544f,_0x291acc-_0x49544f*0x2,_0x291acc-_0x49544f*0x2);},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x31c)]=function(){const _0x1b2c73=_0x5e0242;if(!this[_0x1b2c73(0x1fb)])return;const _0x1f83e8=this[_0x1b2c73(0x1fb)]['bitmap'],_0x52d950=this[_0x1b2c73(0x24e)];if(!_0x52d950)return;const _0xdcfd1e=Sprite_MultiLayerHpFace[_0x1b2c73(0x248)],_0x1306d9=Sprite_MultiLayerHpContainer[_0x1b2c73(0x248)][_0x1b2c73(0x312)];_0x1f83e8['clear']();if(!this['_lastPlural'])return;_0x1f83e8[_0x1b2c73(0x1bc)]=_0xdcfd1e[_0x1b2c73(0x213)]||$gameSystem[_0x1b2c73(0x170)](),_0x1f83e8[_0x1b2c73(0x297)]=_0xdcfd1e[_0x1b2c73(0x19d)]||0x10,_0x1f83e8[_0x1b2c73(0x2a3)](_0x52d950['trim'](),0x0,_0x1306d9/0x2,_0x1306d9*0x7/0x8,_0x1306d9/0x2,_0x1b2c73(0x1d6));},Sprite_MultiLayerHpFace['prototype']['prepareGraphic']=function(){const _0xfbe360=_0x5e0242;this[_0xfbe360(0x26d)]=this[_0xfbe360(0x26c)]['getMultiLayerHpGaugeGraphicType']();let _0x5a7b26;switch(this[_0xfbe360(0x26d)]){case _0xfbe360(0x15b):this[_0xfbe360(0x29c)]=this[_0xfbe360(0x26c)]['getMultiLayerHpGaugeFaceName'](),this[_0xfbe360(0x151)]=this[_0xfbe360(0x26c)][_0xfbe360(0x20f)](),_0x5a7b26=ImageManager[_0xfbe360(0x21d)](this[_0xfbe360(0x29c)]),_0x5a7b26[_0xfbe360(0x318)](this[_0xfbe360(0x298)]['bind'](this,_0x5a7b26));break;case'svactor':this['_graphicSv']=this[_0xfbe360(0x26c)][_0xfbe360(0x2d3)](),_0x5a7b26=ImageManager[_0xfbe360(0x295)](this['_graphicSv']),_0x5a7b26[_0xfbe360(0x318)](this[_0xfbe360(0x175)][_0xfbe360(0x181)](this,_0x5a7b26));break;case _0xfbe360(0x28f):this[_0xfbe360(0x171)]=this['_battler'][_0xfbe360(0x296)](),_0x5a7b26=ImageManager['loadSvEnemy'](this[_0xfbe360(0x171)]),_0x5a7b26[_0xfbe360(0x318)](this[_0xfbe360(0x1eb)]['bind'](this,_0x5a7b26));break;case _0xfbe360(0x30d):this[_0xfbe360(0x171)]=this['_battler'][_0xfbe360(0x296)](),_0x5a7b26=ImageManager[_0xfbe360(0x307)](this['_graphicEnemy']),_0x5a7b26[_0xfbe360(0x318)](this[_0xfbe360(0x1eb)][_0xfbe360(0x181)](this,_0x5a7b26));break;}},Sprite_MultiLayerHpFace['prototype'][_0x5e0242(0x298)]=function(_0x13993b){const _0x56ae3f=_0x5e0242,_0x205c62=this[_0x56ae3f(0x28c)][_0x56ae3f(0x162)],_0x57c0df=this['_battler'][_0x56ae3f(0x20f)]()||0x0,_0x1a6bd0=Sprite_MultiLayerHpContainer[_0x56ae3f(0x248)][_0x56ae3f(0x312)],_0x4932fa=_0x1a6bd0,_0x62405=_0x1a6bd0,_0x50e755=ImageManager[_0x56ae3f(0x258)],_0x498bfe=ImageManager[_0x56ae3f(0x25d)],_0x2a5e77=_0x1a6bd0/Math[_0x56ae3f(0x1a9)](_0x50e755,_0x498bfe),_0x3d2773=ImageManager[_0x56ae3f(0x258)],_0x12dcfc=ImageManager[_0x56ae3f(0x25d)],_0x11efdd=_0x57c0df%0x4*_0x50e755+(_0x50e755-_0x3d2773)/0x2,_0x543e45=Math[_0x56ae3f(0x1e4)](_0x57c0df/0x4)*_0x498bfe+(_0x498bfe-_0x12dcfc)/0x2,_0x38346a=(_0x4932fa-_0x50e755*_0x2a5e77)/0x2,_0x103d1d=(_0x62405-_0x498bfe*_0x2a5e77)/0x2;_0x205c62[_0x56ae3f(0x1c1)](),_0x205c62[_0x56ae3f(0x2cc)](_0x13993b,_0x11efdd,_0x543e45,_0x3d2773,_0x12dcfc,_0x38346a,_0x103d1d,_0x1a6bd0,_0x1a6bd0);},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x175)]=function(_0x1c89e6){const _0x9585ff=_0x5e0242,_0x5cbfe9=this[_0x9585ff(0x28c)][_0x9585ff(0x162)],_0x49b12b=Sprite_MultiLayerHpContainer[_0x9585ff(0x248)]['faceSize'],_0xdddafd=_0x49b12b,_0x17609d=_0x49b12b,_0x4ef661=this[_0x9585ff(0x1c4)][_0x9585ff(0x16c)](/\$/i),_0x1f47fa=_0x4ef661?0x1:ImageManager['svActorHorzCells'],_0xd5b616=_0x4ef661?0x1:ImageManager[_0x9585ff(0x153)],_0x58f0fa=_0x1c89e6[_0x9585ff(0x2ce)]/_0x1f47fa,_0x580103=_0x1c89e6[_0x9585ff(0x239)]/_0xd5b616,_0x18bba3=Math[_0x9585ff(0x1b4)](0x1,_0x49b12b/_0x58f0fa,_0x49b12b/_0x580103),_0x129c67=_0x58f0fa*_0x18bba3,_0x4b4464=_0x580103*_0x18bba3,_0x23956b=Math[_0x9585ff(0x276)]((_0xdddafd-_0x129c67)/0x2),_0x44f6a3=Math[_0x9585ff(0x276)]((_0x17609d-_0x4b4464)/0x2);_0x5cbfe9[_0x9585ff(0x1c1)](),_0x5cbfe9['blt'](_0x1c89e6,0x0,0x0,_0x58f0fa,_0x580103,_0x23956b,_0x44f6a3,_0x129c67,_0x4b4464);},Sprite_MultiLayerHpFace['prototype'][_0x5e0242(0x1eb)]=function(_0xd0aaec){const _0x12fd43=_0x5e0242,_0x476b1e=this[_0x12fd43(0x28c)][_0x12fd43(0x162)],_0x2f48da=Sprite_MultiLayerHpContainer[_0x12fd43(0x248)][_0x12fd43(0x312)],_0x344f0a=_0x2f48da,_0x359415=_0x2f48da,_0x74dc6=Math[_0x12fd43(0x1b4)](0x1,_0x2f48da/_0xd0aaec[_0x12fd43(0x2ce)],_0x2f48da/_0xd0aaec[_0x12fd43(0x239)]),_0x3452ae=_0xd0aaec[_0x12fd43(0x2ce)]*_0x74dc6,_0x3fc0c8=_0xd0aaec[_0x12fd43(0x239)]*_0x74dc6,_0x2392b7=Math[_0x12fd43(0x276)]((_0x344f0a-_0x3452ae)/0x2),_0x3f1875=Math[_0x12fd43(0x276)]((_0x359415-_0x3fc0c8)/0x2);_0x476b1e[_0x12fd43(0x1c1)](),_0x476b1e[_0x12fd43(0x2cc)](_0xd0aaec,0x0,0x0,_0xd0aaec['width'],_0xd0aaec[_0x12fd43(0x239)],_0x2392b7,_0x3f1875,_0x3452ae,_0x3fc0c8);},Sprite_MultiLayerHpFace['prototype'][_0x5e0242(0x1e9)]=function(){const _0x566e0c=_0x5e0242;Sprite[_0x566e0c(0x24f)][_0x566e0c(0x1e9)]['call'](this);if(!this[_0x566e0c(0x26c)])return;if(!this[_0x566e0c(0x26c)][_0x566e0c(0x302)]())return;if(this[_0x566e0c(0x1ca)])return;this[_0x566e0c(0x2c9)](),this[_0x566e0c(0x1df)](),this['updateLetterSprite']();},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x2c9)]=function(){const _0x163199=_0x5e0242;if(!this[_0x163199(0x26c)])return;if(!this[_0x163199(0x28c)])return;if(this[_0x163199(0x26d)]!==this['_battler']['getMultiLayerHpGaugeGraphicType']())return this[_0x163199(0x22b)]();switch(this[_0x163199(0x26d)]){case'face':this[_0x163199(0x29c)]!==this[_0x163199(0x26c)][_0x163199(0x2b0)]()&&this['prepareGraphic']();this[_0x163199(0x151)]!==this[_0x163199(0x26c)][_0x163199(0x20f)]()&&this[_0x163199(0x22b)]();break;case'svactor':this['_graphicSv']!==this[_0x163199(0x26c)][_0x163199(0x2d3)]()&&this[_0x163199(0x22b)]();break;case'svenemy':case _0x163199(0x30d):this[_0x163199(0x171)]!==this['_battler'][_0x163199(0x296)]()&&this[_0x163199(0x22b)]();break;}},Sprite_MultiLayerHpFace['prototype']['updateGraphicHue']=function(){const _0x5469ad=_0x5e0242;if(!this[_0x5469ad(0x26c)])return;if(!this[_0x5469ad(0x28c)])return;if(this[_0x5469ad(0x22a)]===this[_0x5469ad(0x26c)][_0x5469ad(0x300)]())return;this[_0x5469ad(0x22a)]=this['_battler'][_0x5469ad(0x300)](),Imported[_0x5469ad(0x25a)]&&this[_0x5469ad(0x26c)][_0x5469ad(0x310)]()&&(this[_0x5469ad(0x22a)]=0x0),this[_0x5469ad(0x28c)][_0x5469ad(0x1ed)](this[_0x5469ad(0x22a)]);},Sprite_MultiLayerHpFace[_0x5e0242(0x24f)][_0x5e0242(0x2b2)]=function(){const _0x53ed0c=_0x5e0242;if(!this['_battler'])return;if(!this[_0x53ed0c(0x1fb)])return;if(this['_lastLetter']===this['_battler'][_0x53ed0c(0x20a)]&&this[_0x53ed0c(0x291)]===this[_0x53ed0c(0x26c)][_0x53ed0c(0x214)])return;this[_0x53ed0c(0x24e)]=this[_0x53ed0c(0x26c)][_0x53ed0c(0x20a)],this[_0x53ed0c(0x291)]=this['_battler'][_0x53ed0c(0x214)],this[_0x53ed0c(0x31c)]();};function Sprite_MultiLayerHpGauge(){this['initialize'](...arguments);}Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)]=Object[_0x5e0242(0x1a4)](Sprite_Gauge[_0x5e0242(0x24f)]),Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x282)]=Sprite_MultiLayerHpGauge,Sprite_MultiLayerHpGauge[_0x5e0242(0x248)]={'show':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Gauge'][_0x5e0242(0x2fe)]??!![],'bitmapHeight':0x20,'gaugeHeight':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x16d)]['gaugeHeight']??0x18,'styleName':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x16d)][_0x5e0242(0x250)]??'quad','offset':{'x':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x16d)][_0x5e0242(0x1e1)]??0x0,'y':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x16d)][_0x5e0242(0x220)]??0x4}},Sprite_MultiLayerHpGauge['prototype'][_0x5e0242(0x303)]=function(){const _0x5b7029=_0x5e0242;Sprite_Gauge[_0x5b7029(0x24f)]['initialize'][_0x5b7029(0x29a)](this);},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x212)]=function(_0x56bab7){const _0x3f96d8=_0x5e0242;this[_0x3f96d8(0x2de)]=_0x56bab7,this[_0x3f96d8(0x2b6)](),this[_0x3f96d8(0x26c)]&&(this[_0x3f96d8(0x2ab)]=-0x1,this['_targetMaxValue']=-0x1,this[_0x3f96d8(0x2cf)]());},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x2b6)]=function(){const _0x162178=_0x5e0242,_0x54ceda=this['bitmapWidth'](),_0x260e6d=this[_0x162178(0x2d4)]();this[_0x162178(0x162)]?(this[_0x162178(0x162)]['resize'](_0x54ceda,_0x260e6d),this[_0x162178(0x2ce)]=_0x54ceda,this[_0x162178(0x239)]=_0x260e6d):this[_0x162178(0x162)]=new Bitmap(_0x54ceda,_0x260e6d);},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x2d4)]=function(){return Sprite_MultiLayerHpGauge['SETTINGS']['bitmapHeight'];},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)]['gaugeHeight']=function(){const _0x235c6a=_0x5e0242;return Sprite_MultiLayerHpGauge[_0x235c6a(0x248)][_0x235c6a(0x1e8)];},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x2da)]=function(){return this['_bitmapWidth']||0x80;},Sprite_MultiLayerHpGauge['prototype'][_0x5e0242(0x262)]=function(){const _0x51fd02=_0x5e0242;let _0x34ed86=this[_0x51fd02(0x2f6)]();return Imported[_0x51fd02(0x2a2)]&&this[_0x51fd02(0x2d1)]()&&(_0x34ed86=VisuMZ[_0x51fd02(0x2f8)](_0x34ed86)),_0x34ed86;},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x313)]=function(){return 0x0;},Sprite_MultiLayerHpGauge['prototype'][_0x5e0242(0x267)]=function(){const _0x398059=_0x5e0242;return this[_0x398059(0x26c)]?this['_battler'][_0x398059(0x21c)]():TextManager[_0x398059(0x1fd)];},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x2d0)]=function(){return 0x0;},Sprite_MultiLayerHpGauge['prototype'][_0x5e0242(0x2b5)]=function(){const _0x4b5714=_0x5e0242;return ColorManager[_0x4b5714(0x1bf)]();},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x1d0)]=function(){return this['valueOutlineColor']();},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x196)]=function(){return this['valueOutlineWidth']();},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x2cf)]=function(){const _0x2c973d=_0x5e0242;if(!this['_battler'])return;if(!this['_battler'][_0x2c973d(0x302)]())return;if(this['_hold'])return;Sprite_Gauge[_0x2c973d(0x24f)][_0x2c973d(0x2cf)]['call'](this);},Sprite_MultiLayerHpGauge['prototype']['redraw']=function(){const _0x35a9ab=_0x5e0242;this[_0x35a9ab(0x265)](),this['drawValue'](),this[_0x35a9ab(0x1e6)](),Imported[_0x35a9ab(0x26a)]&&VisuMZ[_0x35a9ab(0x28d)][_0x35a9ab(0x230)]();},Sprite_MultiLayerHpGauge['prototype'][_0x5e0242(0x271)]=function(){const _0x24725a=_0x5e0242,_0xb65e6d=this[_0x24725a(0x2f6)](),_0x167789=this[_0x24725a(0x31d)](),_0x2bb00c=TextManager[_0x24725a(0x2b7)][_0x24725a(0x1f4)],_0x1ef25a=TextManager['MULTI_LAYER_HP_GAUGE'][_0x24725a(0x269)],_0x478f37=(_0xb65e6d/_0x167789*0x64)[_0x24725a(0x242)](_0x1ef25a),_0x9263bc=Imported[_0x24725a(0x2a2)]&&this[_0x24725a(0x2d1)](),_0x15a4e2=_0x9263bc?VisuMZ[_0x24725a(0x2f8)](_0xb65e6d):_0xb65e6d,_0x288e8b=_0x9263bc?VisuMZ[_0x24725a(0x2f8)](_0x167789):_0x167789,_0x5ef587=_0x2bb00c[_0x24725a(0x311)](_0x15a4e2,_0x288e8b,_0x478f37),_0x536b6f=this[_0x24725a(0x2da)](),_0x4a2985=this['textHeight']?this[_0x24725a(0x257)]():this[_0x24725a(0x2d4)](),_0x5cd452=_0x536b6f-0x2,_0x64dbea=_0x4a2985;this[_0x24725a(0x22f)](),this['bitmap']['textColor']=ColorManager[_0x24725a(0x1bf)](),this[_0x24725a(0x162)][_0x24725a(0x2a3)](_0x5ef587,0x0,0x0,_0x5cd452,_0x64dbea,_0x24725a(0x1d6)),this[_0x24725a(0x179)]=this[_0x24725a(0x162)][_0x24725a(0x1b2)](_0x5ef587),Imported['VisuMZ_3_VisualGaugeStyles']&&VisuMZ[_0x24725a(0x28d)]['ClearTextOffset']();},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x1e6)]=function(){const _0x54f46c=_0x5e0242,_0x52bf97=this['label'](),_0x511db8=this[_0x54f46c(0x162)]['measureTextWidth'](_0x52bf97);if(_0x511db8+this[_0x54f46c(0x179)]+0x28>this[_0x54f46c(0x162)]['width'])return;const _0x42ee8c=this['bitmapWidth'](),_0x57d096=this[_0x54f46c(0x257)]?this[_0x54f46c(0x257)]():this[_0x54f46c(0x2d4)](),_0x1ab06b=0x4,_0x532e7a=0x0,_0x11a2d0=_0x42ee8c,_0x337696=_0x57d096;this[_0x54f46c(0x16f)](),this[_0x54f46c(0x162)][_0x54f46c(0x19e)]=0xff,this['bitmap']['drawText'](_0x52bf97,_0x1ab06b,_0x532e7a,_0x11a2d0,_0x337696,_0x54f46c(0x1a3)),Imported['VisuMZ_3_VisualGaugeStyles']&&VisuMZ[_0x54f46c(0x28d)][_0x54f46c(0x230)]();},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x265)]=function(){const _0x1ac4dc=_0x5e0242,_0x51fdda=this['_battler']['currentMultiLayerHpGaugeLayer'](),_0x450351=this[_0x1ac4dc(0x2da)](),_0x5201d4=this[_0x1ac4dc(0x257)]?this[_0x1ac4dc(0x257)]():this[_0x1ac4dc(0x2d4)](),_0x220278=this[_0x1ac4dc(0x1e8)](),_0x23c7bf=0x0,_0x54b53f=_0x5201d4-_0x220278,_0x143974=_0x450351-_0x23c7bf,_0x17c662=_0x220278;this['bitmap'][_0x1ac4dc(0x1c1)](),this[_0x1ac4dc(0x173)](_0x51fdda,_0x23c7bf,_0x54b53f,_0x143974,_0x17c662);},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x24c)]=function(){const _0x497957=_0x5e0242,_0x549496=this[_0x497957(0x26c)][_0x497957(0x2ba)]();if(_0x549496<=0x1)return this[_0x497957(0x26c)][_0x497957(0x22d)]();const _0x3d668e=this[_0x497957(0x26c)][_0x497957(0x2c3)]/_0x549496,_0x5c3133=Math[_0x497957(0x1e4)](this['_battler']['hp']/_0x3d668e),_0x4b09b7=this[_0x497957(0x26c)]['hp']-_0x3d668e*_0x5c3133;return _0x4b09b7/_0x3d668e;},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)]['drawFullGauge']=function(_0x397c55,_0x3f4e54,_0x3a0fec,_0x4d71a0,_0x146635){const _0x9a2b04=_0x5e0242;if(Imported['VisuMZ_3_VisualGaugeStyles']){this['drawFullVisualStyleGauge'](_0x397c55,_0x3f4e54,_0x3a0fec,_0x4d71a0,_0x146635);return;}const _0x1284ab=this[_0x9a2b04(0x2ad)]();this[_0x9a2b04(0x162)]['fillRect'](_0x3f4e54,_0x3a0fec,_0x4d71a0,_0x146635,_0x1284ab),_0x3f4e54+=0x1,_0x3a0fec+=0x1,_0x4d71a0-=0x2,_0x146635-=0x2;const _0x1c30b7=this[_0x9a2b04(0x24c)]();if(_0x397c55>0x1&&_0x1c30b7<0x1){const _0x5b34ea=ColorManager['getMultiLayerHpGaugeColor1'](_0x397c55-0x1),_0x572f1d=ColorManager[_0x9a2b04(0x199)](_0x397c55-0x1);this[_0x9a2b04(0x162)][_0x9a2b04(0x172)](_0x3f4e54,_0x3a0fec,_0x4d71a0,_0x146635,_0x5b34ea,_0x572f1d);}const _0x3f8303=Math['floor'](_0x4d71a0*_0x1c30b7);_0x397c55>0x1&&this[_0x9a2b04(0x162)][_0x9a2b04(0x30a)](_0x3f4e54,_0x3a0fec,_0x3f8303+0x1,_0x146635,_0x1284ab);const _0x4dd3ad=ColorManager[_0x9a2b04(0x227)](_0x397c55),_0x13f596=ColorManager[_0x9a2b04(0x199)](_0x397c55);this[_0x9a2b04(0x162)][_0x9a2b04(0x172)](_0x3f4e54,_0x3a0fec,_0x3f8303,_0x146635,_0x4dd3ad,_0x13f596);},Sprite_MultiLayerHpGauge['prototype'][_0x5e0242(0x1d3)]=function(){const _0x33afc7=_0x5e0242,_0x1f4086=this[_0x33afc7(0x26c)]['getMultiLayerHpGaugeTotalLayers']();return this[_0x33afc7(0x26c)][_0x33afc7(0x2c3)]/Math[_0x33afc7(0x1a9)](0x1,_0x1f4086);},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x22c)]=function(_0x462654,_0x1e29b5,_0x43411f,_0x725b7a,_0x2df7b0){const _0x112632=_0x5e0242,_0x215347=this[_0x112632(0x250)]();VisuMZ[_0x112632(0x28d)][_0x112632(0x308)]=this[_0x112632(0x1d3)]();const _0x316794=VisuMZ[_0x112632(0x28d)][_0x112632(0x165)](_0x215347,_0x1e29b5,_0x43411f,_0x725b7a,_0x2df7b0,0x1,!![]),_0x121853=this['gaugeBackColor']();this['bitmap'][_0x112632(0x1bb)](_0x316794,_0x121853);const _0x3b0979=this[_0x112632(0x24c)]();if(_0x462654>0x1&&_0x3b0979<0x1){const _0x5064a3=ColorManager['getMultiLayerHpGaugeColor1'](_0x462654-0x1),_0x9951ed=ColorManager['getMultiLayerHpGaugeColor2'](_0x462654-0x1),_0x3611eb=VisuMZ[_0x112632(0x28d)][_0x112632(0x165)](_0x215347,_0x1e29b5,_0x43411f,_0x725b7a,_0x2df7b0,0x1,![]),_0x26a778=this[_0x112632(0x162)][_0x112632(0x27e)][_0x112632(0x1cc)](_0x1e29b5,_0x43411f,_0x1e29b5+_0x725b7a,_0x43411f);this['bitmap']['drawVisualStyleGaugeFront'](_0x3611eb,_0x5064a3,_0x9951ed,_0x26a778);}const _0x23e88a=ColorManager[_0x112632(0x227)](_0x462654),_0x3335b3=ColorManager['getMultiLayerHpGaugeColor2'](_0x462654),_0x1c5a2e=this[_0x112632(0x162)][_0x112632(0x27e)][_0x112632(0x1cc)](_0x1e29b5,_0x43411f,_0x1e29b5+_0x725b7a,_0x43411f),_0x3487eb=VisuMZ[_0x112632(0x28d)]['GetPolygonStyle'](_0x215347,_0x1e29b5,_0x43411f,_0x725b7a,_0x2df7b0,_0x3b0979,![]);this[_0x112632(0x162)][_0x112632(0x315)](_0x3487eb,_0x23e88a,_0x3335b3,_0x1c5a2e,_0x121853);},Sprite_MultiLayerHpGauge[_0x5e0242(0x24f)][_0x5e0242(0x2a1)]=function(){const _0x1d1772=_0x5e0242;return Sprite_MultiLayerHpGauge[_0x1d1772(0x248)][_0x1d1772(0x250)];};function _0x2335(_0x1bef8d,_0x54c727){const _0x30e725=_0x30e7();return _0x2335=function(_0x23356e,_0x3b47e8){_0x23356e=_0x23356e-0x150;let _0x521140=_0x30e725[_0x23356e];return _0x521140;},_0x2335(_0x1bef8d,_0x54c727);}function Sprite_MultiLayerHpStates(){const _0xe46489=_0x5e0242;this[_0xe46489(0x303)](...arguments);}Sprite_MultiLayerHpStates[_0x5e0242(0x24f)]=Object['create'](Sprite[_0x5e0242(0x24f)]),Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x282)]=Sprite_MultiLayerHpStates,Sprite_MultiLayerHpStates[_0x5e0242(0x248)]={'show':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x2e9)][_0x5e0242(0x2fe)]??!![],'breakShields':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['States'][_0x5e0242(0x2c5)]??!![],'offset':{'x':VisuMZ['MultiLayerHpGauge']['Settings'][_0x5e0242(0x2e9)]['offsetX']??0x0,'y':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2e9)][_0x5e0242(0x220)]??0x1c}},Sprite_MultiLayerHpStates['prototype'][_0x5e0242(0x303)]=function(_0x3dfbf2){const _0x913458=_0x5e0242;this[_0x913458(0x26c)]=_0x3dfbf2,Sprite['prototype'][_0x913458(0x303)][_0x913458(0x29a)](this),this[_0x913458(0x306)](),this[_0x913458(0x2b6)](),this[_0x913458(0x26c)]['requestMultiLayerHpGaugeStateUpdate']();},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x306)]=function(){const _0x230544=_0x5e0242,_0x5988f2={'x':0x0,'y':0x0,'width':Graphics[_0x230544(0x2ce)],'height':SceneManager[_0x230544(0x2bf)][_0x230544(0x247)](0x1,![])};this[_0x230544(0x30c)]=new Window_MultiLayerHpGaugeStatusBase(_0x5988f2);},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x2b6)]=function(){const _0x8b53d8=_0x5e0242,_0x152b9f=Graphics[_0x8b53d8(0x2ce)],_0x1af140=ImageManager[_0x8b53d8(0x2e4)];this[_0x8b53d8(0x162)]=new Bitmap(_0x152b9f,_0x1af140);},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x212)]=function(_0x1acbc3){const _0x281c3c=_0x5e0242;this[_0x281c3c(0x1ee)](0x0,0x0,_0x1acbc3,ImageManager['iconHeight']),this[_0x281c3c(0x2ce)]=_0x1acbc3,this[_0x281c3c(0x2a4)]=_0x1acbc3;},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x1e9)]=function(){const _0x4caff9=_0x5e0242;Sprite[_0x4caff9(0x24f)]['update'][_0x4caff9(0x29a)](this);if(!this[_0x4caff9(0x26c)])return;if(!this[_0x4caff9(0x26c)]['showMultiLayerHpGauge']())return;if(this[_0x4caff9(0x1ca)])return;this[_0x4caff9(0x1f1)](),this[_0x4caff9(0x2b1)]();},Sprite_MultiLayerHpStates['prototype'][_0x5e0242(0x1f1)]=function(){const _0x5aeabc=_0x5e0242;this[_0x5aeabc(0x26c)]['_requestMultiLayerHpGaugeStateUpdate']&&(this['_battler'][_0x5aeabc(0x1b9)]=undefined,this[_0x5aeabc(0x1d1)]());},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x2b1)]=function(){const _0x4eb3c2=_0x5e0242;if(!this['_breakShieldSprite'])return;const _0xc574d3=Game_Battler[_0x4eb3c2(0x2f5)];if(_0xc574d3<=0x0)return;this[_0x4eb3c2(0x26c)][_0x4eb3c2(0x1d9)](_0xc574d3)?this[_0x4eb3c2(0x1db)][_0x4eb3c2(0x1c6)]=0x0:this[_0x4eb3c2(0x1db)][_0x4eb3c2(0x1c6)]=0xff;},Game_BattlerBase['prototype'][_0x5e0242(0x1ab)]=function(){},Game_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x1ab)]=function(){const _0x25a2c5=_0x5e0242;this[_0x25a2c5(0x302)]()&&(this[_0x25a2c5(0x1b9)]=!![]);},VisuMZ[_0x5e0242(0x2d6)]['Game_BattlerBase_updateStateTurns']=Game_BattlerBase[_0x5e0242(0x24f)]['updateStateTurns'],Game_BattlerBase[_0x5e0242(0x24f)][_0x5e0242(0x2c7)]=function(){const _0x2ad2b6=_0x5e0242;VisuMZ[_0x2ad2b6(0x2d6)][_0x2ad2b6(0x30e)][_0x2ad2b6(0x29a)](this),this[_0x2ad2b6(0x1ab)]();},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x221)]=Game_Battler[_0x5e0242(0x24f)][_0x5e0242(0x251)],Game_Battler['prototype'][_0x5e0242(0x251)]=function(_0x20a259){const _0x41fa2f=_0x5e0242;VisuMZ[_0x41fa2f(0x2d6)][_0x41fa2f(0x221)][_0x41fa2f(0x29a)](this,_0x20a259),this[_0x41fa2f(0x1ab)]();},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x1fe)]=Game_Battler['prototype'][_0x5e0242(0x1ce)],Game_Battler[_0x5e0242(0x24f)][_0x5e0242(0x1ce)]=function(_0x3b83a9){const _0x3e4920=_0x5e0242;VisuMZ['MultiLayerHpGauge'][_0x3e4920(0x1fe)][_0x3e4920(0x29a)](this,_0x3b83a9),this[_0x3e4920(0x1ab)]();},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x17a)]=Game_Battler[_0x5e0242(0x24f)][_0x5e0242(0x180)],Game_Battler[_0x5e0242(0x24f)][_0x5e0242(0x180)]=function(_0x4333fc){const _0x448677=_0x5e0242;VisuMZ['MultiLayerHpGauge'][_0x448677(0x17a)]['call'](this,_0x4333fc),this[_0x448677(0x1ab)]();},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x254)]=Game_BattlerBase['prototype']['clearStates'],Game_BattlerBase[_0x5e0242(0x24f)][_0x5e0242(0x1c2)]=function(){const _0x3810ed=_0x5e0242;VisuMZ[_0x3810ed(0x2d6)][_0x3810ed(0x254)][_0x3810ed(0x29a)](this),this[_0x3810ed(0x1ab)]();},VisuMZ['MultiLayerHpGauge']['Game_Battler_onTurnEnd']=Game_Battler['prototype'][_0x5e0242(0x1e0)],Game_Battler['prototype']['onTurnEnd']=function(){const _0x45ff92=_0x5e0242;VisuMZ['MultiLayerHpGauge'][_0x45ff92(0x2d5)]['call'](this),this[_0x45ff92(0x1ab)]();},Sprite_MultiLayerHpStates['prototype']['refresh']=function(){const _0x211251=_0x5e0242;this[_0x211251(0x2c8)](),this['drawStateIcons'](),this[_0x211251(0x176)](),this[_0x211251(0x2ac)]();},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x2c8)]=function(){const _0x40b153=_0x5e0242;this['bitmap'][_0x40b153(0x1c1)](),this[_0x40b153(0x30c)][_0x40b153(0x1a0)][_0x40b153(0x1c1)]();},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x2c1)]=function(){const _0x38be3a=_0x5e0242,_0x1159a5=this[_0x38be3a(0x30c)]['innerWidth'];this[_0x38be3a(0x30c)][_0x38be3a(0x182)](this[_0x38be3a(0x26c)],0x0,0x0,_0x1159a5);},Sprite_MultiLayerHpStates['prototype'][_0x5e0242(0x176)]=function(){const _0x46385d=_0x5e0242;if(!this[_0x46385d(0x26c)])return;if(!Imported['VisuMZ_4_BreakShields'])return;if(!Game_Battler['BREAK_SHIELDS_ENEMIES'])return;if(!Sprite_MultiLayerHpStates[_0x46385d(0x248)][_0x46385d(0x2c5)])return;if(this[_0x46385d(0x1db)])return;this[_0x46385d(0x1db)]=new Sprite_BreakShieldIcon(),this['addChild'](this[_0x46385d(0x1db)]),this['_breakShieldSprite']['setup'](this[_0x46385d(0x26c)],![]),this['_breakShieldSprite'][_0x46385d(0x2ca)](ImageManager[_0x46385d(0x2e5)]/0x2,ImageManager[_0x46385d(0x2e4)]/0x2+0x2),this[_0x46385d(0x1db)]['show']();},Sprite_MultiLayerHpStates[_0x5e0242(0x24f)][_0x5e0242(0x2ac)]=function(){const _0x4aace6=_0x5e0242;this[_0x4aace6(0x162)]=this[_0x4aace6(0x30c)][_0x4aace6(0x1a0)];if(this['_frameWidth']){const _0x55a6ce=Math[_0x4aace6(0x1e4)](this[_0x4aace6(0x2a4)]/ImageManager['iconWidth'])*ImageManager['iconWidth'];this[_0x4aace6(0x1ee)](0x0,0x0,_0x55a6ce,this[_0x4aace6(0x162)]['height']);}},Window_BattleLog[_0x5e0242(0x2b7)]={'reposition':VisuMZ['MultiLayerHpGauge']['Settings'][_0x5e0242(0x18c)][_0x5e0242(0x1fc)]??!![],'perRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x18c)][_0x5e0242(0x1e2)]??0x40},Window_BattleLog[_0x5e0242(0x24f)][_0x5e0242(0x2a7)]=function(){const _0xef811=_0x5e0242;this[_0xef811(0x16a)]=this['y'];},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x2a5)]=Window_BattleLog[_0x5e0242(0x24f)][_0x5e0242(0x1e9)],Window_BattleLog['prototype']['update']=function(){const _0x3ee545=_0x5e0242;VisuMZ['MultiLayerHpGauge'][_0x3ee545(0x2a5)]['call'](this),this[_0x3ee545(0x319)]();},Window_BattleLog[_0x5e0242(0x24f)][_0x5e0242(0x319)]=function(){const _0x1d28a8=_0x5e0242;if(!Window_BattleLog[_0x1d28a8(0x2b7)][_0x1d28a8(0x25f)])return;if(this['_multiLayerHpGaugePositionY']===undefined)return;let _0x2be564=this[_0x1d28a8(0x16a)];const _0xd2d58a=$gameTroop[_0x1d28a8(0x202)]();_0xd2d58a>0x0&&(_0x2be564+=Window_BattleLog['MULTI_LAYER_HP_GAUGE']['perRowOffsetY']*_0xd2d58a),this['y']=_0x2be564;};function Window_MultiLayerHpGaugeStatusBase(){const _0x1f18b6=_0x5e0242;this[_0x1f18b6(0x303)](...arguments);}Window_MultiLayerHpGaugeStatusBase[_0x5e0242(0x24f)]=Object[_0x5e0242(0x1a4)](Window_StatusBase[_0x5e0242(0x24f)]),Window_MultiLayerHpGaugeStatusBase[_0x5e0242(0x24f)][_0x5e0242(0x282)]=Window_MultiLayerHpGaugeStatusBase,Window_MultiLayerHpGaugeStatusBase[_0x5e0242(0x24f)][_0x5e0242(0x303)]=function(_0x5782fd){const _0x52b823=_0x5e0242;Window_StatusBase[_0x52b823(0x24f)][_0x52b823(0x303)]['call'](this,_0x5782fd);},Window_MultiLayerHpGaugeStatusBase[_0x5e0242(0x24f)]['itemHeight']=function(){const _0x2b8ff6=_0x5e0242;return Window_Scrollable[_0x2b8ff6(0x24f)]['itemHeight'][_0x2b8ff6(0x29a)](this);},Window_MultiLayerHpGaugeStatusBase[_0x5e0242(0x24f)][_0x5e0242(0x289)]=function(_0x202536){const _0x1866d6=_0x5e0242;if(!Sprite_MultiLayerHpStates[_0x1866d6(0x248)][_0x1866d6(0x2c5)])return![];if(!Game_Battler['BREAK_SHIELDS_ENEMIES'])return![];const _0x57d4ae=Game_Battler[_0x1866d6(0x2f5)];if(_0x202536[_0x1866d6(0x1d9)](_0x57d4ae)&&$dataStates[_0x57d4ae]['iconIndex']>0x0)return![];if(_0x202536[_0x1866d6(0x1aa)]()&&$dataStates[_0x202536['deathStateId']()][_0x1866d6(0x1d5)]>0x0)return![];return!![];},Window_MultiLayerHpGaugeStatusBase[_0x5e0242(0x24f)][_0x5e0242(0x1b1)]=function(_0x22f4ce,_0x4378b6,_0x61cf0f){},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x2fd)]={'battler':{'reduceRedundancy':{'hpGauge':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x2fd)][_0x5e0242(0x2f0)]??!![],'stateIcon':VisuMZ['MultiLayerHpGauge']['Settings'][_0x5e0242(0x2fd)]['reduceRedundantStateIcon']??!![],'breakShields':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x2db)]??!![]}},'atb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility'][_0x5e0242(0x24d)]??+0x40,'normalOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x2c2)]??+0x18,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x154)]??+0xc},'btb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)]['btbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x25c)]??+0x0,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility'][_0x5e0242(0x198)]??+0xc},'ctb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x2fd)][_0x5e0242(0x18b)]??+0x40,'normalOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility']['ctbNormalOffsetY']??+0x0,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x1a1)]??+0xc},'etb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility'][_0x5e0242(0x1b5)]??+0x40,'normalOffsetY':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x2fd)][_0x5e0242(0x222)]??+0x0,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)]['Settings'][_0x5e0242(0x2fd)][_0x5e0242(0x28b)]??-0x38},'ftb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x224)]??+0x40,'normalOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility'][_0x5e0242(0x1a6)]??+0x0,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x185)]??-0x38},'otb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge']['Settings']['Compatibility'][_0x5e0242(0x2c6)]??+0x40,'normalOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility'][_0x5e0242(0x211)]??-0x6,'helpOffsetY':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x2fd)]['otbHelpOffsetY']??-0xc},'ptb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)]['ptbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x197)]??+0x0,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x1d7)]??-0x38},'stb':{'eachRowOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)]['stbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)]['Compatibility'][_0x5e0242(0x235)]??+0x0,'helpOffsetY':VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x253)][_0x5e0242(0x2fd)][_0x5e0242(0x277)]??+0xc}},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x2f9)]=Sprite_Battler[_0x5e0242(0x24f)][_0x5e0242(0x1da)],Sprite_Battler[_0x5e0242(0x24f)][_0x5e0242(0x1da)]=function(){const _0x47273d=_0x5e0242;if(this[_0x47273d(0x26c)]&&this[_0x47273d(0x26c)][_0x47273d(0x19c)]()){const _0x2c97cd=VisuMZ[_0x47273d(0x2d6)]['Compatibility'][_0x47273d(0x204)][_0x47273d(0x2df)];if(this[_0x47273d(0x26c)][_0x47273d(0x302)]()&&_0x2c97cd[_0x47273d(0x23c)]&&Sprite_MultiLayerHpGauge[_0x47273d(0x248)][_0x47273d(0x2fe)])return![];}return VisuMZ['MultiLayerHpGauge'][_0x47273d(0x2f9)]['call'](this);},VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x1f3)]=Sprite_Enemy[_0x5e0242(0x24f)]['updateStateSprite'],Sprite_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x2be)]=function(){const _0x5c1536=_0x5e0242;VisuMZ[_0x5c1536(0x2d6)][_0x5c1536(0x1f3)][_0x5c1536(0x29a)](this),this[_0x5c1536(0x26c)]&&this['_stateIconSprite']&&(this[_0x5c1536(0x1d4)]()&&(this[_0x5c1536(0x2ec)]['y']=Graphics['height']*0xa));},Sprite_Enemy[_0x5e0242(0x24f)][_0x5e0242(0x1d4)]=function(){const _0x42be9a=_0x5e0242;if(this[_0x42be9a(0x26c)]&&!this['_battler'][_0x42be9a(0x302)]())return![];const _0x3d460f=VisuMZ[_0x42be9a(0x2d6)][_0x42be9a(0x2fd)][_0x42be9a(0x204)]['reduceRedundancy'];if(_0x3d460f[_0x42be9a(0x264)]&&Sprite_MultiLayerHpStates[_0x42be9a(0x248)]['show'])return!![];return![];},VisuMZ['MultiLayerHpGauge'][_0x5e0242(0x2af)]=Sprite_Battler['prototype']['updateVisualStateEffectsOverlay'],Sprite_Battler[_0x5e0242(0x24f)][_0x5e0242(0x316)]=function(){const _0x15a43a=_0x5e0242;VisuMZ[_0x15a43a(0x2d6)][_0x15a43a(0x2af)][_0x15a43a(0x29a)](this);if(this[_0x15a43a(0x26c)]&&this['_battler'][_0x15a43a(0x19c)]()&&this[_0x15a43a(0x1a5)]){const _0x3d1ace=VisuMZ[_0x15a43a(0x260)][_0x15a43a(0x253)][_0x15a43a(0x18c)],_0x31d63e=this[_0x15a43a(0x1a5)];_0x31d63e['visible']=_0x3d1ace[_0x15a43a(0x21e)],this['_svBattlerSprite']&&(this[_0x15a43a(0x192)]['_stateSprite'][_0x15a43a(0x19a)]=![]),!this[_0x15a43a(0x26c)][_0x15a43a(0x310)]()&&(_0x31d63e['y']=-this[_0x15a43a(0x239)]+_0x31d63e['height']-ImageManager[_0x15a43a(0x2e4)]);}};Imported[_0x5e0242(0x15c)]&&(VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x21b)]=Sprite_FieldGaugeATB[_0x5e0242(0x24f)][_0x5e0242(0x283)],Sprite_FieldGaugeATB[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0xf1b82b=_0x5e0242;VisuMZ[_0xf1b82b(0x2d6)][_0xf1b82b(0x21b)][_0xf1b82b(0x29a)](this);if(Sprite_FieldGaugeATB[_0xf1b82b(0x253)][_0xf1b82b(0x1ac)]!==_0xf1b82b(0x31b))return;const _0x281d06=$gameTroop[_0xf1b82b(0x202)]();if(_0x281d06<=0x0)return;const _0x32b643=VisuMZ[_0xf1b82b(0x2d6)][_0xf1b82b(0x2fd)][_0xf1b82b(0x2bc)],_0x1fb5cf=_0x32b643[_0xf1b82b(0x207)];let _0x44a86b=_0x1fb5cf*_0x281d06;const _0x46d6a6=SceneManager[_0xf1b82b(0x2bf)]['_helpWindow'];_0x46d6a6&&_0x46d6a6['visible']&&Sprite_FieldGaugeATB[_0xf1b82b(0x253)]['RepositionTopForHelp']?_0x44a86b+=_0x32b643['helpOffsetY']:_0x44a86b+=_0x32b643[_0xf1b82b(0x215)],this['y']+=_0x44a86b;});;Imported[_0x5e0242(0x16e)]&&(VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x2bb)]=Window_BTB_TurnOrder['prototype'][_0x5e0242(0x283)],Window_BTB_TurnOrder[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0xa86b2a=_0x5e0242;VisuMZ[_0xa86b2a(0x2d6)][_0xa86b2a(0x2bb)][_0xa86b2a(0x29a)](this);if(Window_BTB_TurnOrder[_0xa86b2a(0x253)][_0xa86b2a(0x1ac)]!=='top')return;const _0x58442f=$gameTroop[_0xa86b2a(0x202)]();if(_0x58442f<=0x0)return;const _0xf7763a=VisuMZ[_0xa86b2a(0x2d6)][_0xa86b2a(0x2fd)]['btb'],_0x18d302=_0xf7763a['eachRowOffsetY'];let _0x1aeab4=_0x18d302*_0x58442f;const _0x5baaf4=SceneManager[_0xa86b2a(0x2bf)][_0xa86b2a(0x27f)];_0x5baaf4&&_0x5baaf4['visible']&&Window_BTB_TurnOrder[_0xa86b2a(0x253)][_0xa86b2a(0x1f0)]?_0x1aeab4+=_0xf7763a[_0xa86b2a(0x29e)]:_0x1aeab4+=_0xf7763a[_0xa86b2a(0x215)],this['y']+=_0x1aeab4;});;Imported[_0x5e0242(0x1c3)]&&(VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x1dd)]=Window_CTB_TurnOrder['prototype']['updatePosition'],Window_CTB_TurnOrder[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0x5c2c27=_0x5e0242;VisuMZ[_0x5c2c27(0x2d6)][_0x5c2c27(0x1dd)][_0x5c2c27(0x29a)](this);if(Window_CTB_TurnOrder['Settings']['DisplayPosition']!=='top')return;const _0x3a8aff=$gameTroop[_0x5c2c27(0x202)]();if(_0x3a8aff<=0x0)return;const _0x58c8df=VisuMZ[_0x5c2c27(0x2d6)][_0x5c2c27(0x2fd)][_0x5c2c27(0x245)],_0x52d615=_0x58c8df[_0x5c2c27(0x207)];let _0x5c112d=_0x52d615*_0x3a8aff;const _0x5f4a81=SceneManager['_scene'][_0x5c2c27(0x27f)];_0x5f4a81&&_0x5f4a81[_0x5c2c27(0x19a)]&&Window_CTB_TurnOrder[_0x5c2c27(0x253)]['RepositionTopForHelp']?_0x5c112d+=_0x58c8df[_0x5c2c27(0x29e)]:_0x5c112d+=_0x58c8df[_0x5c2c27(0x215)],this['y']+=_0x5c112d;});;Imported[_0x5e0242(0x208)]&&(VisuMZ[_0x5e0242(0x2d6)]['Window_ETB_TurnOrder_updatePosition']=Window_ETB_ActionCount['prototype']['updatePosition'],Window_ETB_ActionCount[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0x126abd=_0x5e0242;VisuMZ[_0x126abd(0x2d6)][_0x126abd(0x2b4)][_0x126abd(0x29a)](this);if(Window_ETB_ActionCount[_0x126abd(0x253)][_0x126abd(0x16b)])return;const _0x12372a=$gameTroop[_0x126abd(0x202)]();if(_0x12372a<=0x0)return;const _0x33b864=VisuMZ[_0x126abd(0x2d6)]['Compatibility'][_0x126abd(0x160)],_0x4f3c00=_0x33b864['eachRowOffsetY'];let _0x3ef908=_0x4f3c00*_0x12372a;const _0x5136dc=SceneManager[_0x126abd(0x2bf)][_0x126abd(0x27f)];_0x5136dc&&_0x5136dc['visible']&&Window_ETB_ActionCount[_0x126abd(0x253)][_0x126abd(0x1f0)]?_0x3ef908+=_0x33b864[_0x126abd(0x29e)]:_0x3ef908+=_0x33b864['normalOffsetY'],this['y']+=_0x3ef908;});;Imported[_0x5e0242(0x1f7)]&&(VisuMZ['MultiLayerHpGauge']['Window_FTB_TurnOrder_updatePosition']=Window_FTB_ActionCount[_0x5e0242(0x24f)][_0x5e0242(0x283)],Window_FTB_ActionCount[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0x4767fd=_0x5e0242;VisuMZ['MultiLayerHpGauge']['Window_FTB_TurnOrder_updatePosition'][_0x4767fd(0x29a)](this);if(Window_FTB_ActionCount[_0x4767fd(0x253)]['BottomPosition'])return;const _0x292eb1=$gameTroop[_0x4767fd(0x202)]();if(_0x292eb1<=0x0)return;const _0x27274f=VisuMZ[_0x4767fd(0x2d6)]['Compatibility'][_0x4767fd(0x241)],_0x184c28=_0x27274f[_0x4767fd(0x207)];let _0x2d77b3=_0x184c28*_0x292eb1;const _0x6cde41=SceneManager[_0x4767fd(0x2bf)]['_helpWindow'];_0x6cde41&&_0x6cde41[_0x4767fd(0x19a)]&&Window_FTB_ActionCount[_0x4767fd(0x253)][_0x4767fd(0x1f0)]?_0x2d77b3+=_0x27274f[_0x4767fd(0x29e)]:_0x2d77b3+=_0x27274f['normalOffsetY'],this['y']+=_0x2d77b3;});;Imported[_0x5e0242(0x237)]&&(VisuMZ[_0x5e0242(0x2d6)]['Window_OTB_TurnOrder_updatePosition']=Window_OTB_TurnOrder[_0x5e0242(0x24f)][_0x5e0242(0x283)],Window_OTB_TurnOrder[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0x2e8cc0=_0x5e0242;VisuMZ['MultiLayerHpGauge'][_0x2e8cc0(0x2f1)]['call'](this);if(Window_OTB_TurnOrder[_0x2e8cc0(0x253)][_0x2e8cc0(0x1ac)]!=='top')return;const _0x1b4862=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();if(_0x1b4862<=0x0)return;const _0x2c776b=VisuMZ[_0x2e8cc0(0x2d6)][_0x2e8cc0(0x2fd)]['otb'],_0x261fe2=_0x2c776b[_0x2e8cc0(0x207)];let _0x222a7b=_0x261fe2*_0x1b4862;const _0x234c23=SceneManager['_scene'][_0x2e8cc0(0x27f)];_0x234c23&&_0x234c23[_0x2e8cc0(0x19a)]&&Window_OTB_TurnOrder[_0x2e8cc0(0x253)][_0x2e8cc0(0x1f0)]?_0x222a7b+=_0x2c776b[_0x2e8cc0(0x29e)]:_0x222a7b+=_0x2c776b[_0x2e8cc0(0x215)],this['y']+=_0x222a7b;});;Imported[_0x5e0242(0x243)]&&(VisuMZ[_0x5e0242(0x2d6)][_0x5e0242(0x285)]=Window_PTB_ActionCount['prototype'][_0x5e0242(0x283)],Window_PTB_ActionCount[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0x37dbbf=_0x5e0242;VisuMZ[_0x37dbbf(0x2d6)][_0x37dbbf(0x285)][_0x37dbbf(0x29a)](this);if(Window_PTB_ActionCount[_0x37dbbf(0x253)][_0x37dbbf(0x16b)])return;const _0x221457=$gameTroop[_0x37dbbf(0x202)]();if(_0x221457<=0x0)return;const _0xeb5e00=VisuMZ[_0x37dbbf(0x2d6)]['Compatibility'][_0x37dbbf(0x23a)],_0xc71b36=_0xeb5e00[_0x37dbbf(0x207)];let _0x19363b=_0xc71b36*_0x221457;const _0x301636=SceneManager['_scene']['_helpWindow'];_0x301636&&_0x301636[_0x37dbbf(0x19a)]&&Window_PTB_ActionCount[_0x37dbbf(0x253)][_0x37dbbf(0x1f0)]?_0x19363b+=_0xeb5e00[_0x37dbbf(0x29e)]:_0x19363b+=_0xeb5e00[_0x37dbbf(0x215)],this['y']+=_0x19363b;});;Imported[_0x5e0242(0x2e2)]&&(VisuMZ[_0x5e0242(0x2d6)]['Window_STB_TurnOrder_updatePosition']=Window_STB_TurnOrder['prototype'][_0x5e0242(0x283)],Window_STB_TurnOrder[_0x5e0242(0x24f)][_0x5e0242(0x283)]=function(){const _0x3d95ba=_0x5e0242;VisuMZ[_0x3d95ba(0x2d6)][_0x3d95ba(0x1bd)][_0x3d95ba(0x29a)](this);if(Window_STB_TurnOrder[_0x3d95ba(0x253)][_0x3d95ba(0x1ac)]!=='top')return;const _0x3cc5a2=$gameTroop[_0x3d95ba(0x202)]();if(_0x3cc5a2<=0x0)return;const _0x2d27ff=VisuMZ[_0x3d95ba(0x2d6)][_0x3d95ba(0x2fd)][_0x3d95ba(0x205)],_0x2dc972=_0x2d27ff[_0x3d95ba(0x207)];let _0x375214=_0x2dc972*_0x3cc5a2;const _0x2ba320=SceneManager['_scene'][_0x3d95ba(0x27f)];_0x2ba320&&_0x2ba320[_0x3d95ba(0x19a)]&&Window_STB_TurnOrder[_0x3d95ba(0x253)][_0x3d95ba(0x1f0)]?_0x375214+=_0x2d27ff[_0x3d95ba(0x29e)]:_0x375214+=_0x2d27ff['normalOffsetY'],this['y']+=_0x375214;});;