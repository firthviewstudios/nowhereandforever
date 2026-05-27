//=============================================================================
// VisuStella MZ - Visual Battle Environment
// VisuMZ_2_VisualBattleEnv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_VisualBattleEnv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualBattleEnv = VisuMZ.VisualBattleEnv || {};
VisuMZ.VisualBattleEnv.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.09] [VisualBattleEnv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Battle_Environment_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Add extra layers of images to your battle system for background purposes or
 * foreground purposes. These images can be battlebacks, pictures, parallaxes,
 * whatever you need them to be. Add extra settings to them, such as scrolling,
 * blend modes, different opacity levels, hues, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create battle environment images located behind battlers to function as a
 *   part of the background.
 * * Create battle environment images located in front of battlers to function
 *   as a part of the foreground.
 * * Apply custom settings to them, such as changing their blend modes, their
 *   scrolling speeds, and opacity levels.
 * * Customize their hue and if they have a hue shift at all.
 * * Apply color tones if needed to give more color control.
 * * Alter their opacity levels midway during battle.
 * * An unlimited amounts of back environments and front environments to add to
 *   the battle scene.
 * * Environment images are layered based on their ID's. Lower ID's appear
 *   below while higher ID's appear above.
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
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Back Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Back Environment: Add/Change
 * - Adds/changes the target back environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Back Environment: Fade Opacity
 * - Fades the target back environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which back environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Back Environment: Remove
 * - Removes target back environment(s).
 *
 *   ID(s):
 *   - Remove which back environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Front Environment-Type Plugin Commands ===
 * 
 * ---
 *
 * Front Environment: Add/Change
 * - Adds/changes the target front environment.
 * 
 *   Settings:
 *
 *     ID:
 *     - Select the target environment ID to add/change.
 *     - Lower ID's appear below. Higher ID's appear above.
 *
 *     Folder and Filename:
 *     - What is the folder and filename?
 * 
 *   Extra Settings:
 *   - Extra settings that can be altered for the environment object.
 *   - For details, refer to section below.
 *
 *     Duration:
 *     - How many frames would it take to alter settings?
 *
 * ---
 *
 * Front Environment: Fade Opacity
 * - Fades the target front environment(s) opacity to a different value.
 *
 *   ID(s):
 *   - Target which front environment(s)?
 *   - Cannot target the default battlebacks.
 *
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 *
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 *
 * ---
 *
 * Front Environment: Remove
 * - Removes target front environment(s).
 *
 *   ID(s):
 *   - Remove which front environment(s)?
 *   - Cannot remove the default battlebacks.
 *
 * ---
 * 
 * === Extra-Settings ===
 * 
 * ---
 *
 * Extra Settings
 * - These settings are used for both the "Back Environment: Add/Change" and
 *   "Front Environment: Add/Change" Plugin Commands.
 * 
 *   Appearance:
 *
 *     Scale Style:
 *     - The scaling style used for this environment image.
 *       - Battle Core Setting
 *       - MZ (MZ's default style)
 *       - 1:1 (No Scaling)
 *       - Scale To Fit (Scale to screen size)
 *       - Scale Down (Scale Downward if Larger than Screen)
 *       - Scale Up (Scale Upward if Smaller than Screen)
 *
 *     Opacity:
 *     - What is the opacity level for this image?
 *     - You may use JavaScript code.
 *
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the image?
 *     - You may use JavaScript code.
 *       - Normal
 *       - Additive
 *       - Multiply
 *       - Screen
 * 
 *     Hue: 
 *     - Do you wish to adjust this image's hue?
 *     - You may use JavaScript code.
 * 
 *     Hue Shift:
 *     - How much do you want the hue to shift each frame?
 *     - You may use JavaScript code.
 * 
 *     Color Tone:
 *     - What tone do you want for the background?
 *     - Format: [Red, Green, Blue, Gray]
 * 
 *   Scrolling:
 *
 *     Horizontal Scroll:
 *     - What is the horizontal scroll speed?
 *     - Use a negative value to invert the direction.
 *
 *     Vertical Scroll:
 *     - What is the vertical scroll speed?
 *     - Use a negative value to invert the direction.
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
 * Version 1.09: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where upon returning from the options menu or any other
 *    similar menu while in battle, any previously removed battle environments
 *    would reappear. Fix made by Irina.
 * 
 * Version 1.08: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a crash from a previous version of Battle Core. Fix made by Olivia.
 * 
 * Version 1.07: January 27, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.06: December 16, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ's new subfolders. Update by Irina.
 * 
 * Version 1.05: August 6, 2021
 * * Bug Fixes!
 * ** Environments no longer visibly vanish when changing to the Options or
 *    Party management scenes. Fix made by Irina.
 * 
 * Version 1.04: July 16, 2021
 * * Bug Fixes!
 * ** Games with UI dimensions that are different from screen dimensions should
 *    no longer be affected by the distance difference. Fix made by Irina.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 30, 2021
 * * Bug Fixes!
 * ** Added a fail safe for changing color tones in case the value fails to be
 *    an array (it will default to zero tone). Fix made by Arisu.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Crashes should no longer occur when performing a troop transition from
 *    the map. Fix made by Olivia.
 *
 * Version 1.00 Official Release Date: May 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentAddChange
 * @text Back Environment: Add/Change
 * @desc Adds/changes the target back environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentFade
 * @text Back Environment: Fade Opacity
 * @desc Fades the target back environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which back environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BackEnvironmentRemove
 * @text Back Environment: Remove
 * @desc Removes target back environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which back environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentAddChange
 * @text Front Environment: Add/Change
 * @desc Adds/changes the target front environment.
 *
 * @arg Settings
 *
 * @arg ID:num
 * @text ID
 * @parent Settings
 * @type number
 * @min 1
 * @desc Select the target environment ID to add/change.
 * Lower ID's appear below. Higher ID's appear above.
 * @default 1
 *
 * @arg FolderFilename:str
 * @text Folder and Filename
 * @parent Settings
 * @type file
 * @dir img/
 * @desc What is the folder and filename?
 * @default 
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<Optional>
 * @desc Extra settings that can be altered for the environment object.
 * @default {"Appearance":"","ScaleStyle:str":"BattleCore","blendMode:eval":"0","opacity:eval":"255","Scrolling":"","ScrollHorz:eval":"+0","ScrollVert:eval":"+0"}
 *
 * @arg duration:num
 * @text Duration
 * @parent Extra:struct
 * @type number
 * @min 1
 * @desc How many frames would it take to alter settings?
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentFade
 * @text Front Environment: Fade Opacity
 * @desc Fades the target front environment(s) opacity to a different value.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which front environment(s)?
 * Cannot target the default battlebacks.
 * @default ["1"]
 *
 * @arg opacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg duration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FrontEnvironmentRemove
 * @text Front Environment: Remove
 * @desc Removes target front environment(s).
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which front environment(s)?
 * Cannot remove the default battlebacks.
 * @default ["1"]
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
 * @param VisualBattleEnv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
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
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Appearance
 *
 * @param ScaleStyle:str
 * @text Scale Style
 * @parent Appearance
 * @type select
 * @option Battle Core Setting
 * @value BattleCore
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The scaling style used for this environment image.
 * @default BattleCore
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this image?
 * You may use JavaScript code.
 * @default 255
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the image?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this image's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the background?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Scrolling
 *
 * @param ScrollHorz:eval
 * @text Horizontal Scroll
 * @parent Scrolling
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 * @param ScrollVert:eval
 * @text Vertical Scroll
 * @parent Scrolling
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 *
 */
//=============================================================================

const _0x2f7503=_0x48a7;(function(_0x28f337,_0x1c0bb6){const _0xe39f4e=_0x48a7,_0x2bc61f=_0x28f337();while(!![]){try{const _0x369dd1=-parseInt(_0xe39f4e(0x22f))/0x1+parseInt(_0xe39f4e(0x1d9))/0x2*(-parseInt(_0xe39f4e(0x206))/0x3)+-parseInt(_0xe39f4e(0x1d3))/0x4*(parseInt(_0xe39f4e(0x1ea))/0x5)+parseInt(_0xe39f4e(0x231))/0x6*(parseInt(_0xe39f4e(0x244))/0x7)+-parseInt(_0xe39f4e(0x1fb))/0x8*(parseInt(_0xe39f4e(0x1cc))/0x9)+parseInt(_0xe39f4e(0x1de))/0xa*(parseInt(_0xe39f4e(0x202))/0xb)+-parseInt(_0xe39f4e(0x1ed))/0xc*(-parseInt(_0xe39f4e(0x23b))/0xd);if(_0x369dd1===_0x1c0bb6)break;else _0x2bc61f['push'](_0x2bc61f['shift']());}catch(_0x489449){_0x2bc61f['push'](_0x2bc61f['shift']());}}}(_0x3ea2,0x5b10c));var label=_0x2f7503(0x221),tier=tier||0x0,dependencies=[_0x2f7503(0x20e)],pluginData=$plugins[_0x2f7503(0x24d)](function(_0x158cd4){const _0x26c8b3=_0x2f7503;return _0x158cd4['status']&&_0x158cd4[_0x26c8b3(0x22b)][_0x26c8b3(0x1f6)]('['+label+']');})[0x0];function _0x48a7(_0x279f29,_0x3ef329){const _0x3ea28e=_0x3ea2();return _0x48a7=function(_0x48a7a1,_0x4e5caa){_0x48a7a1=_0x48a7a1-0x1c0;let _0x5983d1=_0x3ea28e[_0x48a7a1];return _0x5983d1;},_0x48a7(_0x279f29,_0x3ef329);}VisuMZ[label][_0x2f7503(0x248)]=VisuMZ[label][_0x2f7503(0x248)]||{},VisuMZ[_0x2f7503(0x20d)]=function(_0x2ab34c,_0x4c99b5){const _0x24b82a=_0x2f7503;for(const _0x39c0b5 in _0x4c99b5){if(_0x39c0b5[_0x24b82a(0x21b)](/(.*):(.*)/i)){const _0x55e67c=String(RegExp['$1']),_0x17bdd3=String(RegExp['$2'])['toUpperCase']()[_0x24b82a(0x201)]();let _0x281aff,_0x4396c6,_0x5bb03e;switch(_0x17bdd3){case _0x24b82a(0x1f5):_0x281aff=_0x4c99b5[_0x39c0b5]!==''?Number(_0x4c99b5[_0x39c0b5]):0x0;break;case _0x24b82a(0x1d5):_0x4396c6=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):[],_0x281aff=_0x4396c6['map'](_0x72e7a7=>Number(_0x72e7a7));break;case _0x24b82a(0x247):_0x281aff=_0x4c99b5[_0x39c0b5]!==''?eval(_0x4c99b5[_0x39c0b5]):null;break;case _0x24b82a(0x1d8):_0x4396c6=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):[],_0x281aff=_0x4396c6[_0x24b82a(0x240)](_0x3ba295=>eval(_0x3ba295));break;case'JSON':_0x281aff=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):'';break;case _0x24b82a(0x237):_0x4396c6=_0x4c99b5[_0x39c0b5]!==''?JSON['parse'](_0x4c99b5[_0x39c0b5]):[],_0x281aff=_0x4396c6['map'](_0x34a60e=>JSON[_0x24b82a(0x1cb)](_0x34a60e));break;case'FUNC':_0x281aff=_0x4c99b5[_0x39c0b5]!==''?new Function(JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5])):new Function(_0x24b82a(0x213));break;case _0x24b82a(0x23c):_0x4396c6=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):[],_0x281aff=_0x4396c6[_0x24b82a(0x240)](_0x9035ff=>new Function(JSON[_0x24b82a(0x1cb)](_0x9035ff)));break;case _0x24b82a(0x233):_0x281aff=_0x4c99b5[_0x39c0b5]!==''?String(_0x4c99b5[_0x39c0b5]):'';break;case _0x24b82a(0x1db):_0x4396c6=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):[],_0x281aff=_0x4396c6[_0x24b82a(0x240)](_0x24c6d5=>String(_0x24c6d5));break;case _0x24b82a(0x1f4):_0x5bb03e=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):{},_0x281aff=VisuMZ[_0x24b82a(0x20d)]({},_0x5bb03e);break;case _0x24b82a(0x1fe):_0x4396c6=_0x4c99b5[_0x39c0b5]!==''?JSON[_0x24b82a(0x1cb)](_0x4c99b5[_0x39c0b5]):[],_0x281aff=_0x4396c6['map'](_0x58b135=>VisuMZ[_0x24b82a(0x20d)]({},JSON[_0x24b82a(0x1cb)](_0x58b135)));break;default:continue;}_0x2ab34c[_0x55e67c]=_0x281aff;}}return _0x2ab34c;},(_0x5162e7=>{const _0xa954ec=_0x2f7503,_0x196433=_0x5162e7[_0xa954ec(0x21d)];for(const _0x47768e of dependencies){if(!Imported[_0x47768e]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xa954ec(0x20f)](_0x196433,_0x47768e)),SceneManager[_0xa954ec(0x1da)]();break;}}const _0x34cb12=_0x5162e7['description'];if(_0x34cb12[_0xa954ec(0x21b)](/\[Version[ ](.*?)\]/i)){const _0x29e3db=Number(RegExp['$1']);_0x29e3db!==VisuMZ[label]['version']&&(alert(_0xa954ec(0x1e7)[_0xa954ec(0x20f)](_0x196433,_0x29e3db)),SceneManager['exit']());}if(_0x34cb12[_0xa954ec(0x21b)](/\[Tier[ ](\d+)\]/i)){const _0xa5b2f6=Number(RegExp['$1']);_0xa5b2f6<tier?(alert(_0xa954ec(0x245)['format'](_0x196433,_0xa5b2f6,tier)),SceneManager[_0xa954ec(0x1da)]()):tier=Math[_0xa954ec(0x21f)](_0xa5b2f6,tier);}VisuMZ[_0xa954ec(0x20d)](VisuMZ[label]['Settings'],_0x5162e7[_0xa954ec(0x1e0)]);})(pluginData),VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x207)]=function(_0x383dab){const _0x108e0d=_0x2f7503;_0x383dab=JsonEx[_0x108e0d(0x243)](_0x383dab);if(_0x383dab[_0x108e0d(0x1d4)]){const _0x3558f9=_0x383dab['FolderFilename'][_0x108e0d(0x1dd)]('/');_0x383dab['Filename']=_0x3558f9[_0x108e0d(0x236)](),_0x383dab[_0x108e0d(0x209)]=_0x3558f9['join']('/');}else _0x383dab[_0x108e0d(0x209)]='',_0x383dab[_0x108e0d(0x1f9)]='';return _0x383dab[_0x108e0d(0x20b)]=_0x383dab[_0x108e0d(0x20b)]||{},_0x383dab[_0x108e0d(0x20b)][_0x108e0d(0x204)]=_0x383dab['Extra']['ScaleStyle']??_0x108e0d(0x217),_0x383dab[_0x108e0d(0x20b)]['blendMode']=_0x383dab[_0x108e0d(0x20b)]['blendMode']??0x0,_0x383dab[_0x108e0d(0x20b)]['opacity']=_0x383dab[_0x108e0d(0x20b)][_0x108e0d(0x223)]??0xff,_0x383dab['Extra']['ScrollHorz']=_0x383dab[_0x108e0d(0x20b)]['ScrollHorz']??0x0,_0x383dab['Extra'][_0x108e0d(0x1e2)]=_0x383dab['Extra']['ScrollVert']??0x0,_0x383dab;},PluginManager[_0x2f7503(0x1e5)](pluginData['name'],_0x2f7503(0x1f2),_0x1cba8c=>{const _0x109b45=_0x2f7503;if(!SceneManager[_0x109b45(0x228)]())return;VisuMZ['ConvertParams'](_0x1cba8c,_0x1cba8c);const _0x5383db=VisuMZ[_0x109b45(0x221)][_0x109b45(0x207)](_0x1cba8c);if(_0x5383db['Folder'][_0x109b45(0x201)]()===''||_0x5383db[_0x109b45(0x1f9)]==='')return;const _0x4ac7a9=_0x5383db['ID']||0x0;$gameTroop['setBackEnvironmentSettings'](_0x4ac7a9,_0x5383db);}),PluginManager['registerCommand'](pluginData[_0x2f7503(0x21d)],_0x2f7503(0x1c0),_0x16152b=>{const _0x249c6b=_0x2f7503;if(!SceneManager[_0x249c6b(0x228)]())return;VisuMZ['ConvertParams'](_0x16152b,_0x16152b);const _0x47abf6=_0x16152b['opacity'],_0x4514cc=_0x16152b[_0x249c6b(0x241)];for(const _0x195019 of _0x16152b[_0x249c6b(0x1fc)]){const _0xe3a9e8=$gameTroop[_0x249c6b(0x246)](_0x195019);_0xe3a9e8['Extra'][_0x249c6b(0x223)]=_0x47abf6,_0xe3a9e8[_0x249c6b(0x241)]=_0x4514cc;}}),PluginManager['registerCommand'](pluginData[_0x2f7503(0x21d)],_0x2f7503(0x219),_0x18efcf=>{const _0x1a0e09=_0x2f7503;if(!SceneManager[_0x1a0e09(0x228)]())return;VisuMZ['ConvertParams'](_0x18efcf,_0x18efcf);const _0x18e5be=SceneManager[_0x1a0e09(0x22c)][_0x1a0e09(0x1f1)],_0x196fd5=![];for(const _0x43fc97 of _0x18efcf[_0x1a0e09(0x1fc)]){$gameTroop['removeBackEnvironmentSettings'](_0x43fc97),_0x18e5be[_0x1a0e09(0x24e)](_0x43fc97,_0x196fd5);}}),PluginManager[_0x2f7503(0x1e5)](pluginData[_0x2f7503(0x21d)],'FrontEnvironmentAddChange',_0x42a11d=>{const _0x7ae27f=_0x2f7503;if(!SceneManager[_0x7ae27f(0x228)]())return;VisuMZ[_0x7ae27f(0x20d)](_0x42a11d,_0x42a11d);const _0x597ddb=VisuMZ[_0x7ae27f(0x221)][_0x7ae27f(0x207)](_0x42a11d);if(_0x597ddb[_0x7ae27f(0x209)][_0x7ae27f(0x201)]()===''||_0x597ddb[_0x7ae27f(0x1f9)]==='')return;const _0x1927e4=_0x597ddb['ID']||0x0;$gameTroop[_0x7ae27f(0x1c8)](_0x1927e4,_0x597ddb);}),PluginManager[_0x2f7503(0x1e5)](pluginData['name'],_0x2f7503(0x21c),_0x62af43=>{const _0x31d97a=_0x2f7503;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x31d97a(0x20d)](_0x62af43,_0x62af43);const _0x860b55=_0x62af43[_0x31d97a(0x223)],_0x59fe26=_0x62af43[_0x31d97a(0x241)];for(const _0x2c417a of _0x62af43[_0x31d97a(0x1fc)]){const _0x5f0654=$gameTroop[_0x31d97a(0x1f0)](_0x2c417a);_0x5f0654[_0x31d97a(0x20b)][_0x31d97a(0x223)]=_0x860b55,_0x5f0654['duration']=_0x59fe26;}}),PluginManager[_0x2f7503(0x1e5)](pluginData[_0x2f7503(0x21d)],_0x2f7503(0x1c7),_0x349b72=>{const _0x353283=_0x2f7503;if(!SceneManager[_0x353283(0x228)]())return;VisuMZ[_0x353283(0x20d)](_0x349b72,_0x349b72);const _0x4c14fc=SceneManager['_scene'][_0x353283(0x1f1)],_0x16ab7c=!![];for(const _0x1516de of _0x349b72[_0x353283(0x1fc)]){$gameTroop[_0x353283(0x1d7)](_0x1516de),_0x4c14fc[_0x353283(0x24e)](_0x1516de,_0x16ab7c);}}),VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x1c3)]={'Type1':/<(?:NOTETAG):[ ](\d+)([%％])>/i,'Type2':/<(?:NOTETAG):[ ]([\+\-]\d+)>/i,'Type3':/<(?:NOTETAG):[ ](.*)>/i,'Type3nonGreedy':/<(?:NOTETAG):[ ](.*?)>/i,'Type4':/<(?:NOTETAG):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,'Type5':/<(?:NOTETAG):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i,'Type6':/<(?:NOTETAG)>/i,'Type7':/<\/(?:NOTETAG)>/i,'Type8':/<(?:NOTETAG)>\s*([\s\S]*)\s*<\/(?:NOTETAG)>/i},VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x21a)]=Game_Troop[_0x2f7503(0x1e4)]['setup'],Game_Troop[_0x2f7503(0x1e4)]['setup']=function(_0x2d8391){const _0xa4eb55=_0x2f7503;VisuMZ[_0xa4eb55(0x221)][_0xa4eb55(0x21a)][_0xa4eb55(0x22d)](this,_0x2d8391),this[_0xa4eb55(0x205)]();},Game_Troop[_0x2f7503(0x1e4)]['setupVisualBattleEnvironment']=function(){const _0x420be9=_0x2f7503;this[_0x420be9(0x23f)]=[],this[_0x420be9(0x1f3)]=[];},Game_Troop['prototype'][_0x2f7503(0x246)]=function(_0x2a3577){const _0x9b9f4a=_0x2f7503;return this[_0x9b9f4a(0x23f)]===undefined&&this[_0x9b9f4a(0x205)](),this['_backEnvironmentSettings'][_0x2a3577]=this[_0x9b9f4a(0x23f)][_0x2a3577]||{},this['_backEnvironmentSettings'][_0x2a3577];},Game_Troop[_0x2f7503(0x1e4)]['setBackEnvironmentSettings']=function(_0x5b1faf,_0x3280a1){const _0x25517d=_0x2f7503;this[_0x25517d(0x23f)]===undefined&&this['setupVisualBattleEnvironment']();this[_0x25517d(0x23f)][_0x5b1faf]=JsonEx[_0x25517d(0x243)](_0x3280a1);if(SceneManager[_0x25517d(0x228)]()){const _0x3e4b10=SceneManager[_0x25517d(0x22c)][_0x25517d(0x1f1)];_0x3e4b10[_0x25517d(0x227)](_0x5b1faf,![]);}},Game_Troop[_0x2f7503(0x1e4)][_0x2f7503(0x1d0)]=function(_0x191fdc){const _0x3cdf1e=_0x2f7503;this['_backEnvironmentSettings']===undefined&&this['setupVisualBattleEnvironment'](),this[_0x3cdf1e(0x23f)][_0x191fdc]&&delete this[_0x3cdf1e(0x23f)][_0x191fdc];},Game_Troop['prototype']['getFrontEnvironmentSettings']=function(_0x32741a){const _0x4a5b70=_0x2f7503;return this[_0x4a5b70(0x1f3)]===undefined&&this['setupVisualBattleEnvironment'](),this[_0x4a5b70(0x1f3)][_0x32741a]=this[_0x4a5b70(0x1f3)][_0x32741a]||{},this[_0x4a5b70(0x1f3)][_0x32741a];},Game_Troop['prototype'][_0x2f7503(0x1c8)]=function(_0x5302ac,_0x3e1667){const _0x867044=_0x2f7503;this['_frontEnvironmentSettings']===undefined&&this[_0x867044(0x205)]();this[_0x867044(0x1f3)][_0x5302ac]=JsonEx[_0x867044(0x243)](_0x3e1667);if(SceneManager[_0x867044(0x228)]()){const _0x1f57bb=SceneManager[_0x867044(0x22c)]['_spriteset'];_0x1f57bb[_0x867044(0x227)](_0x5302ac,!![]);}},Game_Troop[_0x2f7503(0x1e4)][_0x2f7503(0x1d7)]=function(_0x3b2b4f){const _0x5c5e77=_0x2f7503;this[_0x5c5e77(0x1f3)]===undefined&&this[_0x5c5e77(0x205)](),this[_0x5c5e77(0x1f3)][_0x3b2b4f]&&delete this[_0x5c5e77(0x1f3)][_0x3b2b4f];},VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x238)]=Scene_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x234)],Scene_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x234)]=function(){const _0x2de5b5=_0x2f7503;VisuMZ[_0x2de5b5(0x221)]['Scene_Battle_createSpriteset'][_0x2de5b5(0x22d)](this),this[_0x2de5b5(0x1d2)]();},Scene_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x1d2)]=function(){const _0xecba61=_0x2f7503;if(!SceneManager[_0xecba61(0x1df)]())return;const _0xe43255=$gameTroop['_backEnvironmentSettings']||[];for(const _0x239b70 of _0xe43255){if(!_0x239b70)continue;const _0x535785=_0x239b70['ID'];_0x239b70[_0xecba61(0x241)]=0x1,$gameTroop[_0xecba61(0x220)](_0x535785,_0x239b70);}const _0x4d5c4a=$gameTroop[_0xecba61(0x1f3)]||[];for(const _0x203a9a of _0x4d5c4a){if(!_0x203a9a)continue;const _0x5b2fd7=_0x203a9a['ID'];_0x203a9a[_0xecba61(0x241)]=0x1,$gameTroop[_0xecba61(0x1c8)](_0x5b2fd7,_0x203a9a);}};function _0x3ea2(){const _0x52518e=['createWeather','bind','colorTone','filter','removeBattleEnvironmentSprite','Spriteset_Battle_update','BackEnvironmentFade','BattlebackScale','Spriteset_Battle_createBattleback','RegExp','adjustPosition','find','_frontEnvironmentContainer','FrontEnvironmentRemove','setFrontEnvironmentSettings','_folder','setHue','parse','8964qEkAIa','DefaultStyle','_updateColorFilter','createBattleEnvironmentSprite','removeBackEnvironmentSettings','_colorFilter','restoreVisualBattleEnv','68372cUFGQq','FolderFilename','ARRAYNUM','_backEnvironmentContainer','removeFrontEnvironmentSettings','ARRAYEVAL','32108IvuEoX','exit','ARRAYSTR','update','split','120TDhjPq','isPreviousSceneBattleTransitionable','parameters','sort','ScrollVert','processBitmap','prototype','registerCommand','adjustPosition_1for1','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','removeChild','blendMode','170uawlbJ','ScaleUp','createBattleback','12HLiwdf','_battleField','createBackEnvironmentContainer','getFrontEnvironmentSettings','_spriteset','BackEnvironmentAddChange','_frontEnvironmentSettings','STRUCT','NUM','includes','setColorTone','origin','Filename','Spriteset_Battle_createWeather','4424jNMCkG','list','getBattleEnvironmentContainer','ARRAYSTRUCT','VisuMZ_2_WeatherEffects','ScaleDown','trim','232122qEkqci','children','ScaleStyle','setupVisualBattleEnvironment','51ehIoqD','AdjustSettings','_id','Folder','initialize','Extra','ScaleToFit','ConvertParams','VisuMZ_1_BattleCore','format','getBattleEnvironmentSprite','adjustPosition_ScaleToFit','1:1','return\x200','updateScrolling','create','Sprite_Battleback_adjustPosition','BattleCore','battleback1Bitmap','BackEnvironmentRemove','Game_Troop_setup','match','FrontEnvironmentFade','name','settings','max','setBackEnvironmentSettings','VisualBattleEnv','_createColorFilter','opacity','hueShift','constructor','Battleback','updateBattleEnvironmentSprite','isSceneBattle','img/%1/','loadBitmap','description','_scene','call','addChild','16657UicfPZ','updateOpacity','594arRsuR','addLoadListener','STR','createSpriteset','createFrontEnvironmentContainer','pop','ARRAYJSON','Scene_Battle_createSpriteset','hue','push','16146364yyuolf','ARRAYFUNC','adjustPosition_ScaleDown','bitmap','_backEnvironmentSettings','map','duration','_filename','makeDeepCopy','21161YVYOas','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getBackEnvironmentSettings','EVAL','Settings','_front'];_0x3ea2=function(){return _0x52518e;};return _0x3ea2();}function Sprite_BattleEnvironment(){const _0x1e097c=_0x2f7503;this[_0x1e097c(0x20a)](...arguments);}Sprite_BattleEnvironment['prototype']=Object[_0x2f7503(0x215)](Sprite_Battleback[_0x2f7503(0x1e4)]),Sprite_BattleEnvironment['prototype'][_0x2f7503(0x225)]=Sprite_BattleEnvironment,Sprite_BattleEnvironment[_0x2f7503(0x1e4)][_0x2f7503(0x20a)]=function(_0x1fa352,_0x256525){const _0x191c44=_0x2f7503;this[_0x191c44(0x208)]=_0x1fa352,this[_0x191c44(0x249)]=_0x256525,Sprite_Battleback[_0x191c44(0x1e4)][_0x191c44(0x20a)][_0x191c44(0x22d)](this,0x0),this[_0x191c44(0x222)](),this[_0x191c44(0x223)]=0x0;},Sprite_BattleEnvironment[_0x2f7503(0x1e4)][_0x2f7503(0x218)]=function(){},Sprite_BattleEnvironment['prototype'][_0x2f7503(0x222)]=function(){const _0x4bf08d=_0x2f7503;!this[_0x4bf08d(0x1d1)]&&(this['_colorFilter']=new ColorFilter()),!this['filters']&&(this['filters']=[]),this['filters'][_0x4bf08d(0x23a)](this[_0x4bf08d(0x1d1)]);},Sprite_BattleEnvironment[_0x2f7503(0x1e4)][_0x2f7503(0x21e)]=function(){const _0x13c7b2=_0x2f7503;return this['_front']?$gameTroop[_0x13c7b2(0x1f0)](this[_0x13c7b2(0x208)]):$gameTroop['getBackEnvironmentSettings'](this[_0x13c7b2(0x208)]);},Sprite_BattleEnvironment[_0x2f7503(0x1e4)][_0x2f7503(0x1dc)]=function(){const _0x590960=_0x2f7503;Sprite_Battleback[_0x590960(0x1e4)][_0x590960(0x1dc)][_0x590960(0x22d)](this),this['updateBitmap'](),this['updateBlendMode'](),this[_0x590960(0x230)](),this[_0x590960(0x214)](),this['_updateColorFilter']();},Sprite_BattleEnvironment[_0x2f7503(0x1e4)]['updateBitmap']=function(){const _0x309b0f=_0x2f7503,_0x49f470=this[_0x309b0f(0x21e)]();if(!_0x49f470)return;if(this[_0x309b0f(0x1c9)]===_0x49f470[_0x309b0f(0x209)]&&this[_0x309b0f(0x242)]===_0x49f470[_0x309b0f(0x1f9)])return;this[_0x309b0f(0x1c9)]=_0x49f470[_0x309b0f(0x209)],this[_0x309b0f(0x242)]=_0x49f470[_0x309b0f(0x1f9)];const _0x156d61=_0x309b0f(0x229)[_0x309b0f(0x20f)](this['_folder'][_0x309b0f(0x201)]()),_0x12c72c=ImageManager[_0x309b0f(0x22a)](_0x156d61,this[_0x309b0f(0x242)][_0x309b0f(0x201)]());_0x12c72c[_0x309b0f(0x232)](this[_0x309b0f(0x1e3)][_0x309b0f(0x24b)](this,_0x12c72c));},Sprite_BattleEnvironment[_0x2f7503(0x1e4)]['processBitmap']=function(_0x2c2370){const _0xbdd819=_0x2f7503;this[_0xbdd819(0x23e)]=_0x2c2370,this[_0xbdd819(0x1c4)](),this['origin']['x']=0x0,this[_0xbdd819(0x1f8)]['y']=0x0;},Sprite_BattleEnvironment['prototype'][_0x2f7503(0x1c4)]=function(){const _0x548dd9=_0x2f7503,_0x18e040=this[_0x548dd9(0x21e)]();if(!_0x18e040)return;let _0x33ffd4=_0x18e040[_0x548dd9(0x20b)][_0x548dd9(0x204)]||_0x548dd9(0x217);if(_0x33ffd4===_0x548dd9(0x217)){if(VisuMZ[_0x548dd9(0x217)][_0x548dd9(0x248)][_0x548dd9(0x1c1)])_0x33ffd4=VisuMZ[_0x548dd9(0x217)]['Settings'][_0x548dd9(0x1c1)][_0x548dd9(0x1cd)]||'MZ';else VisuMZ['BattleCore'][_0x548dd9(0x248)][_0x548dd9(0x226)]&&(_0x33ffd4=VisuMZ[_0x548dd9(0x217)][_0x548dd9(0x248)]['Battleback']['DefaultStyle']||'MZ');}switch(_0x33ffd4){case'MZ':VisuMZ['BattleCore'][_0x548dd9(0x216)][_0x548dd9(0x22d)](this);break;case _0x548dd9(0x212):this[_0x548dd9(0x1e6)]();break;case _0x548dd9(0x20c):this[_0x548dd9(0x211)]();break;case _0x548dd9(0x200):this[_0x548dd9(0x23d)]();break;case _0x548dd9(0x1eb):this['adjustPosition_ScaleUp']();break;}},Sprite_BattleEnvironment[_0x2f7503(0x1e4)]['updateBlendMode']=function(){const _0x3d5f4e=_0x2f7503,_0x2f5335=this['settings']();if(!_0x2f5335)return;this[_0x3d5f4e(0x1e9)]!==_0x2f5335['Extra'][_0x3d5f4e(0x1e9)]&&(this[_0x3d5f4e(0x1e9)]=_0x2f5335[_0x3d5f4e(0x20b)][_0x3d5f4e(0x1e9)]);},Sprite_BattleEnvironment[_0x2f7503(0x1e4)][_0x2f7503(0x230)]=function(){const _0x2d204a=_0x2f7503,_0x1344c8=this[_0x2d204a(0x21e)]();if(!_0x1344c8)return;if(_0x1344c8[_0x2d204a(0x241)]>0x0){const _0x5c3953=_0x1344c8[_0x2d204a(0x241)],_0x148033=_0x1344c8[_0x2d204a(0x20b)][_0x2d204a(0x223)];this[_0x2d204a(0x223)]=(this[_0x2d204a(0x223)]*(_0x5c3953-0x1)+_0x148033)/_0x5c3953,_0x1344c8[_0x2d204a(0x241)]--;}},Sprite_BattleEnvironment['prototype'][_0x2f7503(0x214)]=function(){const _0x5cc63a=_0x2f7503,_0x196708=this[_0x5cc63a(0x21e)]();if(!_0x196708)return;this[_0x5cc63a(0x1f8)]['x']+=_0x196708[_0x5cc63a(0x20b)]['ScrollHorz'],this['origin']['y']+=_0x196708[_0x5cc63a(0x20b)]['ScrollVert'];},Sprite_BattleEnvironment[_0x2f7503(0x1e4)][_0x2f7503(0x1ce)]=function(){const _0x4fc01d=_0x2f7503,_0x451774=this[_0x4fc01d(0x21e)]();if(!_0x451774)return;!this['_colorFilter']&&this['_createColorFilter']();this['_colorFilter'][_0x4fc01d(0x1ca)](_0x451774[_0x4fc01d(0x20b)]['hue']);try{this[_0x4fc01d(0x1d1)]['setColorTone'](_0x451774[_0x4fc01d(0x20b)][_0x4fc01d(0x24c)]||[0x0,0x0,0x0,0x0]);}catch(_0x386024){this[_0x4fc01d(0x1d1)][_0x4fc01d(0x1f7)]([0x0,0x0,0x0,0x0]);}_0x451774[_0x4fc01d(0x20b)][_0x4fc01d(0x239)]+=_0x451774[_0x4fc01d(0x20b)][_0x4fc01d(0x224)];},VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x1c2)]=Spriteset_Battle[_0x2f7503(0x1e4)]['createBattleback'],Spriteset_Battle['prototype'][_0x2f7503(0x1ec)]=function(){const _0x2f3360=_0x2f7503;VisuMZ[_0x2f3360(0x221)][_0x2f3360(0x1c2)][_0x2f3360(0x22d)](this),this[_0x2f3360(0x1ef)]();},Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x1ef)]=function(){const _0xe3d079=_0x2f7503;this[_0xe3d079(0x1d6)]=new Sprite(),this['_baseSprite'][_0xe3d079(0x22e)](this[_0xe3d079(0x1d6)]);},VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x1fa)]=Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x24a)],Spriteset_Battle[_0x2f7503(0x1e4)]['createWeather']=function(){const _0x5197cb=_0x2f7503;if(!Imported[_0x5197cb(0x1ff)])this[_0x5197cb(0x235)]();VisuMZ['VisualBattleEnv'][_0x5197cb(0x1fa)]['call'](this);},Spriteset_Battle[_0x2f7503(0x1e4)]['createFrontEnvironmentContainer']=function(){const _0x57cff7=_0x2f7503;this['_frontEnvironmentContainer']=new Sprite(),this[_0x57cff7(0x1ee)][_0x57cff7(0x22e)](this[_0x57cff7(0x1c6)]),this['_frontEnvironmentContainer']['x']=-this['_battleField']['x'],this[_0x57cff7(0x1c6)]['y']=-this[_0x57cff7(0x1ee)]['y'];},VisuMZ[_0x2f7503(0x221)][_0x2f7503(0x24f)]=Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x1dc)],Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x1dc)]=function(){const _0x5b4981=_0x2f7503;VisuMZ[_0x5b4981(0x221)]['Spriteset_Battle_update'][_0x5b4981(0x22d)](this);},Spriteset_Battle[_0x2f7503(0x1e4)]['updateBattleEnvironmentContainers']=function(){const _0x35c98d=_0x2f7503;if(this[_0x35c98d(0x1c6)]){}},Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x1fd)]=function(_0x1ae1ec){const _0xe59502=_0x2f7503;return _0x1ae1ec?this[_0xe59502(0x1c6)]:this['_backEnvironmentContainer'];},Spriteset_Battle['prototype']['getBattleEnvironmentSprite']=function(_0x326b0a,_0x31f9be){const _0x21a933=_0x2f7503,_0x3659a3=this[_0x21a933(0x1fd)](_0x31f9be);return _0x3659a3[_0x21a933(0x203)][_0x21a933(0x1c5)](_0x235bdd=>_0x235bdd[_0x21a933(0x208)]===_0x326b0a);},Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x227)]=function(_0x23f52b,_0x3617ea){const _0x2afac0=_0x2f7503,_0x38a85e=this[_0x2afac0(0x1fd)](_0x3617ea);if(!_0x38a85e)return;!this[_0x2afac0(0x210)](_0x23f52b,_0x3617ea)&&this['createBattleEnvironmentSprite'](_0x23f52b,_0x3617ea);},Spriteset_Battle['prototype'][_0x2f7503(0x1cf)]=function(_0x1f202d,_0x598095){const _0x37fdca=_0x2f7503,_0x410cb5=this['getBattleEnvironmentContainer'](_0x598095);if(!_0x410cb5)return;if(!this['getBattleEnvironmentSprite'](_0x1f202d,_0x598095)){const _0x5b24c4=new Sprite_BattleEnvironment(_0x1f202d,_0x598095);_0x410cb5[_0x37fdca(0x22e)](_0x5b24c4),_0x410cb5[_0x37fdca(0x203)][_0x37fdca(0x1e1)]((_0xaffc56,_0x106fd3)=>_0xaffc56[_0x37fdca(0x208)]-_0x106fd3['_id']);}},Spriteset_Battle[_0x2f7503(0x1e4)][_0x2f7503(0x24e)]=function(_0x5c3ac3,_0x2667aa){const _0x24c1ce=_0x2f7503,_0xb0413=this['getBattleEnvironmentContainer'](_0x2667aa);if(!_0xb0413)return;const _0x213529=this[_0x24c1ce(0x210)](_0x5c3ac3,_0x2667aa);_0x213529&&(_0xb0413[_0x24c1ce(0x1e8)](_0x213529),_0xb0413[_0x24c1ce(0x203)][_0x24c1ce(0x1e1)]((_0x43f93e,_0x4f2d3e)=>_0x43f93e['_id']-_0x4f2d3e[_0x24c1ce(0x208)]));};