//=============================================================================
// VisuStella MZ - Weapon Swap System
// VisuMZ_2_WeaponSwapSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_WeaponSwapSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponSwapSystem = VisuMZ.WeaponSwapSystem || {};
VisuMZ.WeaponSwapSystem.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [WeaponSwapSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Swap_System_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds in a Weapon Swap System. Actors can equip a different
 * weapon for each weapon type available for use. These weapons can be swapped
 * to and from during the middle of a battle. Swapping weapons can let the
 * player's team adapt to certain situations better or giving them the ability
 * to hit certain weapon weaknesses in battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can equip multiple weapons, one for each weapon type.
 * * These weapons can be switched during the middle of battle.
 * * Choose to display only equippable weapon types in the Equip Menu or all
 *   of the possible weapon types.
 * * Have certain skills switch over to different equipped weapons when
 *   performing them.
 * * Shortcut keys to allow switching between weapon types easily when
 *   selecting commands.
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
 * * VisuMZ_1_ItemsEquipsCore
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
 * Dual Wielding
 * 
 * Dual Wielding properties have been disabled to allow for the Weapon Swap
 * System. There are too many conflicts between it and the Weapon Swap System.
 * There is simply no way around it.
 *
 * ---
 * 
 * Required Weapons
 * 
 * RPG Maker MZ's skills allowed for Required Weapons and needed the actor to
 * have any of the said weapon type(s) equipped upon usage. This function has
 * now been changed. Now, as long as the actor has any of the weapon types
 * available and a weapon attached to it, the actor will be able to use the
 * skill without needing to switch to that weapon first.
 * 
 * When using the skill, the actor will switch to the first available weapon
 * type if needed as long as it is a requirement.
 * 
 * ---
 * 
 * Locked Weapons and Sealed Weapons
 * 
 * Actors that can weapon swap are now immune to Lock Weapon and Seal Weapon
 * traits as they go against the nature of this plugin.
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
 * VisuMZ_1_ItemsEquipsCore
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === Skill Usage-Related Notetags ===
 * 
 * ---
 *
 * <Require Any Weapon>
 *
 * - Used for: Skill Notetags
 * - Requires the actor to have any weapon equipped in order to use the skill,
 *   regardless of the weapon's type.
 * - This does not affect enemies.
 *
 * ---
 *
 * <Switch to Weapon Type: id>
 * <Switch to Weapon Type: name>
 *
 * - Used for: Skill Notetags
 * - When using the skill, the actor will switch to the equipped weapon of the
 *   matching type.
 * - Replace 'id' with a number representing the weapon type's ID.
 * - Replace 'name' with the name of the weapon type.
 * - Weapon types are not the same as weapons. Weapon types are found in the
 *   Database > Types tab.
 * - This does not affect enemies.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * There's not too many mechanics that can be modified through the Plugin
 * Parameters, but the setting here will at least let you ease up on testing
 * battles from the database.
 *
 * ---
 *
 * Battle Test
 * 
 *   Equip All Weapons?:
 *   - Do you want to equip one of each weapon type during battle tests for
 *     all actors?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * The following Plugin Parameters are dedicated towards modifying the UI
 * elements added through this plugin.
 *
 * ---
 *
 * Attack Command
 * 
 *   Change Attack Icon?:
 *   - Change the Attack command to show the weapon?
 *   - Or have it represent the Attack skill?
 * 
 *   Swap Shortcut?:
 *   - Allow shortcut to switch weapons while selecting the Attack command?
 * 
 *     Show Arrows?:
 *     - Show arrows to the left and right of the Attack command for an easy
 *       reminder of the shortcut?
 *
 * ---
 *
 * Swap Command
 * 
 *   Show Command?:
 *   - Show the Swap weapon command in the Actor Command Window?
 *   - The Swap weapon command will be listed by default after the Attack
 *     command.
 *     - If you do not have the Attack command, it will not be shown unless you
 *       add "Weapon Swap" to the battle command list.
 * 
 * 
 *   Swap Icon:
 *   - What icon do you wish to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Swap Name:
 *   - What text do you want to use to represent the Swap command for the
 *     Actor Command Window?
 * 
 *   Help: Swap:
 *   - Help text for Swap command.
 *
 * ---
 *
 * Equip Scene
 * 
 *   Show Unequippable?:
 *   - Show all weapon types in the equip scene?
 *   - Or only just the equippable ones?
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
 * Version 1.14: July 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the default status scene would not display the correct
 *    weapons. Fix made by Irina.
 * 
 * Version 1.13: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if an actor does not have any weapons equipped, the
 *    "Swap" command will not appear. Fix made by Olivia.
 * 
 * Version 1.12: July 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the incorrect difference is displayed for swap weapons.
 *    Fix made by Olivia.
 * 
 * Version 1.11: March 14, 2024
 * * Documentation Update!
 * ** Added "Locked Weapons and Sealed Weapons" to Major Changes.
 * * Feature Update!
 * ** Actors that can weapon swap are now immune to Lock Weapon and Seal Weapon
 *    traits as they go against the nature of this plugin.
 * 
 * Version 1.10: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused item duplication with the "Clear Equipment"
 *    command found in the equip scene. Fix made by Irina.
 * ** Fixed a bug that caused the optimize command to not factor in the weapons
 *    held by the current actor. Fix made by Irina.
 * 
 * Version 1.09: December 9, 2021
 * * Compatibility Update!
 * ** Changing classes via the Class Change System plugin should no longer dupe
 *    weapons under specific circumstances. Update made by Olivia.
 * * Feature Update!
 * ** Upon an actor's turn to input a command, if the actor is barefisted while
 *    having available swap weapons, it will default the choice to the first
 *    available slot. Update made by Olivia.
 * ** The barefisted equip would occur before because when navigating the equip
 *    menu, the switched weapon type would change to whatever is selected. If
 *    you go to a slot without any weapons equipped, it would be as having a
 *    barehanded setup.
 * 
 * Version 1.08: July 9, 2021
 * * Bug Fixes!
 * ** Removed a potential equipment duplication exploit with changing classes.
 *    Fix made by Olivia.
 * 
 * Version 1.07: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: June 25, 2021
 * * Bug Fixes!
 * ** Have the "Shortcut" plugin parameter off will no longer cause crashes.
 *    Fix made by Olivia.
 * 
 * Version 1.05: June 4, 2021
 * * Bug Fixes!
 * ** Fixed weapon swap notetags to have them occur naturally. Fix by Arisu.
 * 
 * Version 1.04: May 28, 2021
 * * Bug Fixes!
 * ** Cache clear will now occur when using automatic switching to update any
 *    cached stats for actors. Fix made by Olivia.
 * 
 * Version 1.03: May 21, 2021
 * * Bug Fixes!
 * ** Weapon type requirements for skills will the weapon type to be equipped
 *    as one of the available slots. Fix made by Olivia.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Shortcut arrows should no longer be visible when an actor has only one
 *    weapon to swap to and from. Fix made by Olivia.
 * * Compatibility Update!
 * ** Weapon Swap System should now be compatible with the Item and Equip
 *    Core's non-removable types setting. Update made by Irina.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Shortcut arrow now accounts for changes in the actor command window size
 *    when updated post-initialization. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Documentation updated for the "UI Settings Plugin Parameters":
 * *** The Swap weapon command will be listed by default after the Attack
 *     command.
 * **** If you do not have the Attack command, it will not be shown unless you
 *      add "Weapon Swap" to the battle command list.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > UI Settings > Help: Swap
 * **** Help text for Swap command.
 *
 * Version 1.00 Official Release Date: May 3, 2021
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
 * @param WeaponSwapSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for the Weapon Swap System.
 * @default {"Testing":"","BattleTestAllWeapons:eval":"true"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc UI settings for the Weapon Swap System.
 * @default {"AttackCommand":"","ChangeAttackIcon:eval":"true","SwapShortcut:eval":"true","ShowShortcutArrows:eval":"true","SwapCommand":"","ShowSwapCommand:eval":"false","SwapCommandIcon:num":"76","SwapCommandName:str":"Swap","EquipScene":"","ShowUnequippable:eval":"false"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Testing
 * @text Battle Test
 *
 * @param BattleTestAllWeapons:eval
 * @text Equip All Weapons?
 * @parent Testing
 * @type boolean
 * @on All Weapons
 * @off Just Settings
 * @desc Do you want to equip one of each weapon type during
 * battle tests for all actors?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param AttackCommand
 * @text Attack Command
 *
 * @param ChangeAttackIcon:eval
 * @text Change Attack Icon?
 * @parent AttackCommand
 * @type boolean
 * @on Represent Weapon
 * @off Represent Skill Icon
 * @desc Change the Attack command to show the weapon?
 * Or have it represent the Attack skill?
 * @default true
 *
 * @param SwapShortcut:eval
 * @text Swap Shortcut?
 * @parent AttackCommand
 * @type boolean
 * @on Allow Shortcut
 * @off Don't Use
 * @desc Allow shortcut to switch weapons while selecting
 * the Attack command?
 * @default true
 *
 * @param ShowShortcutArrows:eval
 * @text Show Arrows?
 * @parent SwapShortcut:eval
 * @type boolean
 * @on Show Arrows
 * @off Hide Arrows
 * @desc Show arrows to the left and right of the Attack
 * command for an easy reminder of the shortcut?
 * @default true
 *
 * @param SwapCommand
 * @text Swap Command
 *
 * @param ShowSwapCommand:eval
 * @text Show Command?
 * @parent SwapCommand
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show the Swap weapon command in the
 * Actor Command Window?
 * @default true
 *
 * @param SwapCommandIcon:num
 * @text Swap Icon
 * @parent SwapCommand
 * @desc What icon do you wish to use to represent the
 * Swap command for the Actor Command Window?
 * @default 76
 *
 * @param SwapCommandName:str
 * @text Swap Name
 * @parent SwapCommand
 * @desc What text do you want to use to represent the
 * Swap command for the Actor Command Window?
 * @default Swap
 *
 * @param BattleHelpSwap:json
 * @text Help: Swap
 * @parent SwapCommand
 * @type note
 * @desc Help text for Swap command.
 * @default "Switch out the current weapon."
 *
 * @param EquipScene
 * @text Equip Scene
 *
 * @param ShowUnequippable:eval
 * @text Show Unequippable?
 * @parent EquipScene
 * @type boolean
 * @on All Weapons
 * @off Equippable Weapons
 * @desc Show all weapon types in the equip scene?
 * Or only just the equippable ones?
 * @default false
 *
 */
//=============================================================================

const _0xfa4451=_0x5221;(function(_0x58a111,_0x2c25b1){const _0x29d813=_0x5221,_0x1e876c=_0x58a111();while(!![]){try{const _0x247067=parseInt(_0x29d813(0x176))/0x1*(-parseInt(_0x29d813(0x17c))/0x2)+-parseInt(_0x29d813(0x165))/0x3*(-parseInt(_0x29d813(0x1d0))/0x4)+-parseInt(_0x29d813(0x122))/0x5+-parseInt(_0x29d813(0x174))/0x6*(-parseInt(_0x29d813(0x19a))/0x7)+parseInt(_0x29d813(0x152))/0x8*(-parseInt(_0x29d813(0x150))/0x9)+parseInt(_0x29d813(0xd7))/0xa+parseInt(_0x29d813(0x137))/0xb;if(_0x247067===_0x2c25b1)break;else _0x1e876c['push'](_0x1e876c['shift']());}catch(_0xe07544){_0x1e876c['push'](_0x1e876c['shift']());}}}(_0x3790,0x49d1f));function _0x5221(_0x3ef4ec,_0x2d695c){const _0x3790fb=_0x3790();return _0x5221=function(_0x5221cb,_0x4dc1d8){_0x5221cb=_0x5221cb-0xcf;let _0x147911=_0x3790fb[_0x5221cb];return _0x147911;},_0x5221(_0x3ef4ec,_0x2d695c);}function _0x3790(){const _0xcada0d=['match','Window_EquipItem_includes','splice','JSON','tradeItemWithParty','getSwapWeapon','_scene','max','_itemWindow','return\x200','VisuMZ_1_BattleCore','bitmap','Settings','initWeaponSwapSystem','iconIndex','7786416wnHJBa','switchToWeaponType','Window_ActorCommand_setup','prototype','Window_StatusEquip_maxItems','Game_Actor_equipSlots','STRUCT','Window_EquipSlot_maxItems','log','setSlotId','onWeaponSwap','swapWeaponNext','SwapCommandName','Window_ActorCommand_addAttackCommand','_cache','setHandler','_currentWeaponType','SwitchWpnTypeNum','remove','drawText','drawItem','Window_ActorCommand_initialize','round','Window_ShopStatus_drawActorParamDifference','WEAPON_SWAP_CHANGE_ATTACK_ICON','99OCdBOH','checkCacheKey','350992JLYVEL','Game_Action_applyGlobal','Game_Actor_changeEquip','_checkingWeaponSwaps','meetsAnyWeaponEquippedCondition','systemColor','RegExp','length','opacity','Game_Actor_isDualWield','setText','Window_EquipSlot_itemAt','removeWeaponSwapCommand','canAddSkillCommand','updateSwapToNextAvailableWeapon','text','commandStyle','addChild','Game_BattlerBase_meetsSkillConditions','74565snxIVR','Window','Game_Actor_optimizeEquipments','Game_Actor_clearEquipments','itemRect','_actorCommandWindow','battler','changeEquip','Window_Base_playOkSound','indexOf','executeEquipChange','concat','optimizeEquipments','_swapWeapons','_firstOfEachWeaponType','6DTwnax','performWeaponSwap','9ZjIGaI','ARRAYJSON','_statusWindow','Game_Battler_requestMotionRefresh','setupBattleTestWeapons','FUNC','31134OvpXfN','WEAPON_SWAP_SHORTCUT_ENABLE','_weaponSwapShortcutSprite_Right','createWeaponSwapShortcutSprites','canWeaponSwap','cursorLeft','Game_Actor_isEquipChangeOk','object','isActor','exit','Sprite_Actor_refreshMotion','Game_Actor_initEquips','Window_ActorCommand','name','refresh','STR','Game_Actor_releaseUnequippableItems','Window_ActorCommand_updateHelp','setFrame','processWeaponSwapRelease','WEAPON_SWAP_SHOW_COMMAND','subject','version','getWtypeIdWithName','gainItem','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Actor_isClearEquipOk','changeWeapon','swapWeaponPrevious','constructor','1934282dddCuv','weaponTypes','ChangeAttackIcon','WEAPON_SWAP_BATTLE_TEST_ALL_WEAPONS','height','isSkill','drawActorParamDifference','WEAPON_SWAP_SHORTCUT_ARROWS','currentSymbol','releaseUnequippableItems','replace','swapWeaponHelp','Window_EquipItem_initialize','_equips','Window_EquipItem_setSlotId','Scene_Battle_createActorCommandWindow','wtypeId','applyGlobal','parent','performAttack','RequireAnyWpn','actorSlotNameWeaponSwap','updateShortcutOpacity','contentsOpacity','visible','setupBattleTestMembers','isDualWield','_weaponSwapShortcutSprite_Left','_currentweapontype','status','refreshMotion','BattleTestAllWeapons','updateWeaponSwapShortcutSprites','_item','drawItemName','_wtypeID','ConvertParams','createActorCommandWindow','setup','ShowSwapCommand','itemAt','VisuMZ_1_ItemsEquipsCore','BattleHelpSwap','toUpperCase','format','getAllEquippedSwapWeapons','_helpWindow','loadSystem','drawItemForWeaponSwap','requiredWtypeId1','Game_Party_setupBattleTestMembers','equipSlotIndex','requestMotionRefresh','Switch\x20out\x20the\x20current\x20weapon.','28pPYTQt','playOkSound','isEquipTypeSealed','etypeId','map','ARRAYSTRUCT','WEAPON_SWAP_SYSTEM_SHOW_UNEQUIPPABLE_SLOTS','description','swapWeaponCmd','isEnabled','actorSlotName','1849550WaotZj','padding','maxItemsWeaponSwap','_inBattle','optimizeSwappableWeapons','SwapCommandIcon','setObject','item','isWeapon','Window_StatusBase_actorSlotName','isOptimizeEquipOk','includes','swapWeaponIcon','filter','getFirstOfEachWeaponType','lineHeight','updateHelp','_wtypeIDs','setSwapWeapon','findSymbol','Game_Actor_isOptimizeEquipOk','isWeaponSwapShortcutVisible','_swappingWeapon','equipSlots','EVAL','weaponSwapTypes','itemAtWeaponSwap','createWeaponSwapTypes','weaponSwap','battleCommandName','clearSwappableWeapons','clearEquipments','meetsSkillConditions','commandWeaponSwap','Window_EquipItem_isEnabled','ARRAYFUNC','_actor','isWeaponSwapShortcutEnabled','isEnabledWeaponSwap','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','playEquip','note','bind','call','attackSkillId','addWeaponSwapCommand','WeaponSwapSystem','parse','maxItems','isEquipChangeOk','trim','isEquipWtypeOk','isSkillWtypeOk','actor','Window_EquipSlot_isEnabled','Mechanics','anchor','alterAttackCommand','initialize','activate','requiredWtypeId2','Game_BattlerBase_isEquipTypeSealed','applyWeaponSwapAction','_slotId','_list','BARE\x20HANDS','isClearEquipOk','bestEquipWeapon','addCommand','Window_StatusEquip_drawItem','ARRAYSTR','addAttackCommand','weapons','ARRAYEVAL','attack','2090190tsRKTH','updateArrows','cursorRight','width','\x5cI[%1]%2','nonRemovableEtypes'];_0x3790=function(){return _0xcada0d;};return _0x3790();}var label='WeaponSwapSystem',tier=tier||0x0,dependencies=[_0xfa4451(0x132),_0xfa4451(0x1c3)],pluginData=$plugins['filter'](function(_0x72d998){const _0x23c5b3=_0xfa4451;return _0x72d998[_0x23c5b3(0x1b7)]&&_0x72d998[_0x23c5b3(0xd3)][_0x23c5b3(0xe2)]('['+label+']');})[0x0];VisuMZ[label][_0xfa4451(0x134)]=VisuMZ[label][_0xfa4451(0x134)]||{},VisuMZ['ConvertParams']=function(_0x491807,_0xd830bc){const _0x51e3d7=_0xfa4451;for(const _0x3c25a3 in _0xd830bc){if(_0x3c25a3[_0x51e3d7(0x128)](/(.*):(.*)/i)){const _0x1d42c3=String(RegExp['$1']),_0x361e48=String(RegExp['$2'])[_0x51e3d7(0x1c5)]()[_0x51e3d7(0x109)]();let _0x1ad69c,_0x58a1e0,_0x70b355;switch(_0x361e48){case'NUM':_0x1ad69c=_0xd830bc[_0x3c25a3]!==''?Number(_0xd830bc[_0x3c25a3]):0x0;break;case'ARRAYNUM':_0x58a1e0=_0xd830bc[_0x3c25a3]!==''?JSON[_0x51e3d7(0x106)](_0xd830bc[_0x3c25a3]):[],_0x1ad69c=_0x58a1e0['map'](_0x26a21f=>Number(_0x26a21f));break;case _0x51e3d7(0xef):_0x1ad69c=_0xd830bc[_0x3c25a3]!==''?eval(_0xd830bc[_0x3c25a3]):null;break;case _0x51e3d7(0x120):_0x58a1e0=_0xd830bc[_0x3c25a3]!==''?JSON['parse'](_0xd830bc[_0x3c25a3]):[],_0x1ad69c=_0x58a1e0[_0x51e3d7(0xd0)](_0x2ddfa5=>eval(_0x2ddfa5));break;case _0x51e3d7(0x12b):_0x1ad69c=_0xd830bc[_0x3c25a3]!==''?JSON['parse'](_0xd830bc[_0x3c25a3]):'';break;case _0x51e3d7(0x177):_0x58a1e0=_0xd830bc[_0x3c25a3]!==''?JSON['parse'](_0xd830bc[_0x3c25a3]):[],_0x1ad69c=_0x58a1e0[_0x51e3d7(0xd0)](_0x42b2b5=>JSON[_0x51e3d7(0x106)](_0x42b2b5));break;case _0x51e3d7(0x17b):_0x1ad69c=_0xd830bc[_0x3c25a3]!==''?new Function(JSON[_0x51e3d7(0x106)](_0xd830bc[_0x3c25a3])):new Function(_0x51e3d7(0x131));break;case _0x51e3d7(0xfa):_0x58a1e0=_0xd830bc[_0x3c25a3]!==''?JSON['parse'](_0xd830bc[_0x3c25a3]):[],_0x1ad69c=_0x58a1e0[_0x51e3d7(0xd0)](_0x1da15b=>new Function(JSON[_0x51e3d7(0x106)](_0x1da15b)));break;case _0x51e3d7(0x18b):_0x1ad69c=_0xd830bc[_0x3c25a3]!==''?String(_0xd830bc[_0x3c25a3]):'';break;case _0x51e3d7(0x11d):_0x58a1e0=_0xd830bc[_0x3c25a3]!==''?JSON['parse'](_0xd830bc[_0x3c25a3]):[],_0x1ad69c=_0x58a1e0['map'](_0x124e6e=>String(_0x124e6e));break;case _0x51e3d7(0x13d):_0x70b355=_0xd830bc[_0x3c25a3]!==''?JSON['parse'](_0xd830bc[_0x3c25a3]):{},_0x1ad69c=VisuMZ['ConvertParams']({},_0x70b355);break;case _0x51e3d7(0xd1):_0x58a1e0=_0xd830bc[_0x3c25a3]!==''?JSON[_0x51e3d7(0x106)](_0xd830bc[_0x3c25a3]):[],_0x1ad69c=_0x58a1e0[_0x51e3d7(0xd0)](_0x3c8d35=>VisuMZ[_0x51e3d7(0x1be)]({},JSON[_0x51e3d7(0x106)](_0x3c8d35)));break;default:continue;}_0x491807[_0x1d42c3]=_0x1ad69c;}}return _0x491807;},(_0x54446f=>{const _0x159fcd=_0xfa4451,_0x196c8b=_0x54446f[_0x159fcd(0x189)];for(const _0x4880ec of dependencies){if(!Imported[_0x4880ec]){alert(_0x159fcd(0x195)[_0x159fcd(0x1c6)](_0x196c8b,_0x4880ec)),SceneManager[_0x159fcd(0x185)]();break;}}const _0x236559=_0x54446f['description'];if(_0x236559[_0x159fcd(0x128)](/\[Version[ ](.*?)\]/i)){const _0x2ef42f=Number(RegExp['$1']);_0x2ef42f!==VisuMZ[label][_0x159fcd(0x192)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x159fcd(0x1c6)](_0x196c8b,_0x2ef42f)),SceneManager['exit']());}if(_0x236559[_0x159fcd(0x128)](/\[Tier[ ](\d+)\]/i)){const _0x38738e=Number(RegExp['$1']);_0x38738e<tier?(alert(_0x159fcd(0xfe)['format'](_0x196c8b,_0x38738e,tier)),SceneManager[_0x159fcd(0x185)]()):tier=Math[_0x159fcd(0x12f)](_0x38738e,tier);}VisuMZ[_0x159fcd(0x1be)](VisuMZ[label][_0x159fcd(0x134)],_0x54446f['parameters']);})(pluginData),VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x158)]={'RequireAnyWpn':/<(?:REQUIRE|REQUIRES) ANY (?:WEAPON|WEAPONS)>/i,'SwitchWpnTypeNum':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i,'SwitchWpnTypeStr':/<(?:SWITCH|SWITCHES) TO (?:WEAPON|WEAPON TYPE|WTYPE):[ ](\d+)>/i},DataManager[_0xfa4451(0xe5)]=function(){const _0x49302a=_0xfa4451;if(this[_0x49302a(0x173)])return this[_0x49302a(0x173)];this[_0x49302a(0x173)]=[];for(let _0x459d62=0x1;_0x459d62<$dataSystem['weaponTypes'][_0x49302a(0x159)];_0x459d62++){const _0x438ce8=$dataWeapons['filter'](_0x812136=>_0x812136&&_0x812136[_0x49302a(0x1aa)]===_0x459d62),_0x5d36d6=_0x438ce8[0x0]||null;!_0x5d36d6&&console[_0x49302a(0x13f)]('MISSING\x20WEAPON\x20TYPE:\x20%1'[_0x49302a(0x1c6)]($dataSystem[_0x49302a(0x19b)][_0x459d62][_0x49302a(0x1a4)](/\\I\[(\d+)\]/gi,''))),this[_0x49302a(0x173)]['push'](_0x5d36d6);}return this[_0x49302a(0x173)]['remove'](null)['remove'](undefined),this['_firstOfEachWeaponType'];},DataManager[_0xfa4451(0x193)]=function(_0x247d73){const _0x162b42=_0xfa4451;_0x247d73=_0x247d73[_0x162b42(0x1c5)]()[_0x162b42(0x109)](),this['_wtypeIDs']=this[_0x162b42(0xe8)]||{};if(this[_0x162b42(0xe8)][_0x247d73])return this[_0x162b42(0xe8)][_0x247d73];for(let _0x46bfc6=0x1;_0x46bfc6<0x64;_0x46bfc6++){if(!$dataSystem['weaponTypes'][_0x46bfc6])continue;let _0x41d3d0=$dataSystem[_0x162b42(0x19b)][_0x46bfc6][_0x162b42(0x1c5)]()[_0x162b42(0x109)]();_0x41d3d0=_0x41d3d0['replace'](/\x1I\[(\d+)\]/gi,''),_0x41d3d0=_0x41d3d0[_0x162b42(0x1a4)](/\\I\[(\d+)\]/gi,''),this['_wtypeIDs'][_0x41d3d0]=_0x46bfc6;}return this[_0x162b42(0xe8)][_0x162b42(0x118)]=0x0,this[_0x162b42(0xe8)][_0x247d73]||0x0;},ImageManager[_0xfa4451(0xe3)]=VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x134)]['UI'][_0xfa4451(0xdc)],TextManager[_0xfa4451(0xd4)]=VisuMZ[_0xfa4451(0x105)]['Settings']['UI'][_0xfa4451(0x143)],TextManager[_0xfa4451(0x1a5)]=VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x134)]['UI'][_0xfa4451(0x1c4)]??_0xfa4451(0x1cf),VisuMZ[_0xfa4451(0x105)]['Game_Action_applyGlobal']=Game_Action[_0xfa4451(0x13a)]['applyGlobal'],Game_Action['prototype'][_0xfa4451(0x1ab)]=function(){const _0x5950e9=_0xfa4451;VisuMZ[_0x5950e9(0x105)][_0x5950e9(0x153)][_0x5950e9(0x102)](this),this[_0x5950e9(0x191)]()&&this[_0x5950e9(0x191)]()[_0x5950e9(0x184)]()&&this[_0x5950e9(0x19f)]()&&this[_0x5950e9(0x191)]()[_0x5950e9(0x115)](this[_0x5950e9(0xde)]());},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x164)]=Game_BattlerBase['prototype'][_0xfa4451(0xf7)],Game_BattlerBase[_0xfa4451(0x13a)][_0xfa4451(0xf7)]=function(_0x18c20a){const _0x19f385=_0xfa4451;return VisuMZ[_0x19f385(0x105)][_0x19f385(0x164)]['call'](this,_0x18c20a)&&this[_0x19f385(0x156)](_0x18c20a);},Game_BattlerBase['prototype'][_0xfa4451(0x156)]=function(_0x4e44c8){return!![];},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x179)]=Game_Battler[_0xfa4451(0x13a)][_0xfa4451(0x1ce)],Game_Battler[_0xfa4451(0x13a)][_0xfa4451(0x1ce)]=function(){const _0x1ee0ce=_0xfa4451;if(this[_0x1ee0ce(0x16b)]()&&this['_swappingWeapon'])return;else VisuMZ[_0x1ee0ce(0x105)][_0x1ee0ce(0x179)][_0x1ee0ce(0x102)](this);},Game_Actor[_0xfa4451(0x19d)]=VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x134)][_0xfa4451(0x10e)][_0xfa4451(0x1b9)],VisuMZ['WeaponSwapSystem'][_0xfa4451(0x187)]=Game_Actor[_0xfa4451(0x13a)]['initEquips'],Game_Actor['prototype']['initEquips']=function(_0x485959){const _0x162885=_0xfa4451;VisuMZ[_0x162885(0x105)]['Game_Actor_initEquips'][_0x162885(0x102)](this,_0x485959),this['initWeaponSwapSystem']();},Game_Actor[_0xfa4451(0x13a)]['initWeaponSwapSystem']=function(){const _0x231fcc=_0xfa4451;this[_0x231fcc(0x172)]={};for(let _0x49604b=0x1;_0x49604b<$dataSystem[_0x231fcc(0x19b)][_0x231fcc(0x159)];_0x49604b++){this[_0x231fcc(0x172)][_0x49604b]=0x0;}this[_0x231fcc(0x147)]=0x0;for(const _0xa61f27 of this[_0x231fcc(0x11f)]()){if(!_0xa61f27)continue;const _0x64ed55=_0xa61f27[_0x231fcc(0x1aa)];this[_0x231fcc(0x172)][_0x64ed55]=_0xa61f27['id'],this[_0x231fcc(0x147)]=this[_0x231fcc(0x147)]||_0x64ed55;}},Game_Actor[_0xfa4451(0x13a)]['canWeaponSwap']=function(){return this['equipSlots']()['includes'](0x1);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x15b)]=Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x1b4)],Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x1b4)]=function(){return![];},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x13c)]=Game_Actor['prototype'][_0xfa4451(0xee)],Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xee)]=function(){const _0x204447=_0xfa4451;let _0x8dd153=VisuMZ['WeaponSwapSystem'][_0x204447(0x13c)][_0x204447(0x102)](this);return _0x8dd153['includes'](0x1)&&(_0x8dd153[_0x204447(0x149)](0x1),_0x8dd153['unshift'](0x1)),_0x8dd153;},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xf0)]=function(){const _0x5d932a=_0xfa4451;let _0x4ac2cc=_0x5d932a(0xf0);if(this[_0x5d932a(0x151)](_0x4ac2cc))return this['_cache'][_0x4ac2cc];return this[_0x5d932a(0x145)][_0x4ac2cc]=this[_0x5d932a(0xf2)](),this[_0x5d932a(0x145)][_0x4ac2cc];},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xf2)]=function(){const _0x2bc1c6=_0xfa4451,_0x19ad1e=[],_0x145ee6=$dataSystem[_0x2bc1c6(0x19b)][_0x2bc1c6(0x159)];for(let _0xe3e930=0x1;_0xe3e930<_0x145ee6;_0xe3e930++){if(this[_0x2bc1c6(0x10a)](_0xe3e930))_0x19ad1e['push'](_0xe3e930);}return _0x19ad1e;},Game_Actor['prototype']['getSwapWeapon']=function(_0x3196e0){const _0x1eda64=_0xfa4451;return this['_swapWeapons']===undefined&&this[_0x1eda64(0x135)](),this[_0x1eda64(0x172)][_0x3196e0]=this[_0x1eda64(0x172)][_0x3196e0]||0x0,$dataWeapons[this[_0x1eda64(0x172)][_0x3196e0]]||null;},Game_Actor['prototype'][_0xfa4451(0x1c7)]=function(){const _0xb60b69=_0xfa4451;return this['weaponSwapTypes']()[_0xb60b69(0xd0)](_0x32421d=>this[_0xb60b69(0x12d)](_0x32421d))[_0xb60b69(0x149)](null)['remove'](undefined);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xe9)]=function(_0x9d113f,_0x45b25e){const _0x159f6d=_0xfa4451;this[_0x159f6d(0x172)]===undefined&&this[_0x159f6d(0x135)](),this[_0x159f6d(0x172)][_0x9d113f]=_0x45b25e,this['refresh']();},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x142)]=function(){const _0x517dfe=_0xfa4451;this['_swapWeapons']===undefined&&this[_0x517dfe(0x135)]();const _0x3698b4=this[_0x517dfe(0x147)],_0x30bd3a=this[_0x517dfe(0xf0)]();let _0x2f76fb=_0x30bd3a[_0x517dfe(0x16e)](this['_currentWeaponType']);for(;;){_0x2f76fb++;if(_0x2f76fb>=_0x30bd3a[_0x517dfe(0x159)])_0x2f76fb=0x0;if(this[_0x517dfe(0x12d)](_0x30bd3a[_0x2f76fb]))break;}const _0x2c6538=_0x30bd3a[_0x2f76fb];this[_0x517dfe(0x138)](_0x2c6538),_0x2c6538!==_0x3698b4&&this[_0x517dfe(0x141)](!![]);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x198)]=function(){const _0x2b59c8=_0xfa4451;this[_0x2b59c8(0x172)]===undefined&&this[_0x2b59c8(0x135)]();const _0x53977f=this[_0x2b59c8(0x147)],_0x2ff81e=this['weaponSwapTypes']();let _0x11be6d=_0x2ff81e['indexOf'](this['_currentWeaponType']);for(;;){_0x11be6d--;if(_0x11be6d<0x0)_0x11be6d=_0x2ff81e['length']-0x1;if(this[_0x2b59c8(0x12d)](_0x2ff81e[_0x11be6d]))break;}const _0x4e7937=_0x2ff81e[_0x11be6d];this[_0x2b59c8(0x138)](_0x4e7937),_0x4e7937!==_0x53977f&&this[_0x2b59c8(0x141)](!![]);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x141)]=function(_0x1e1d67){const _0x6375f6=_0xfa4451,_0x32f744=this[_0x6375f6(0x11f)]()[0x0];_0x32f744&&_0x1e1d67&&(this[_0x6375f6(0xed)]=!![],this[_0x6375f6(0x1ad)]());},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x138)]=function(_0x30339e){const _0x109a0f=_0xfa4451;this[_0x109a0f(0x172)]===undefined&&this[_0x109a0f(0x135)]();_0x30339e=_0x30339e||0x0;if(!this['canWeaponSwap']())return;if(!this[_0x109a0f(0x10a)](_0x30339e))return;this['_currentWeaponType']=_0x30339e,this[_0x109a0f(0x172)][_0x30339e]=this[_0x109a0f(0x172)][_0x30339e]||0x0;const _0x2b590d=$dataWeapons[this[_0x109a0f(0x172)][_0x30339e]]||null;this[_0x109a0f(0x1a7)][0x0][_0x109a0f(0xdd)](_0x2b590d),this[_0x109a0f(0x145)]={};},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x154)]=Game_Actor['prototype']['changeEquip'],Game_Actor['prototype'][_0xfa4451(0x16c)]=function(_0x21da3f,_0x19a0cd){const _0x12eb71=_0xfa4451;DataManager[_0x12eb71(0xdf)](_0x19a0cd)||_0x21da3f===0x0&&this[_0x12eb71(0x180)]()?this[_0x12eb71(0x197)](_0x19a0cd):VisuMZ['WeaponSwapSystem'][_0x12eb71(0x154)][_0x12eb71(0x102)](this,_0x21da3f,_0x19a0cd);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x197)]=function(_0x49abb9){const _0x3f845c=_0xfa4451;if(!!_0x49abb9){const _0x25f4f9=_0x49abb9[_0x3f845c(0x1aa)];this[_0x3f845c(0x138)](_0x25f4f9);const _0x20314a=this[_0x3f845c(0x11f)]()[0x0];!!_0x20314a?this[_0x3f845c(0x12c)](_0x49abb9,_0x20314a):this[_0x3f845c(0x12c)](_0x49abb9,null),this[_0x3f845c(0xe9)](_0x25f4f9,_0x49abb9['id']),this['switchToWeaponType'](_0x25f4f9);}else{if(!!this[_0x3f845c(0x11f)]()[0x0]){const _0xca3cb5=this[_0x3f845c(0x11f)]()[0x0],_0x4ea264=_0xca3cb5[_0x3f845c(0x1aa)];this[_0x3f845c(0x138)](_0x4ea264),this[_0x3f845c(0x12c)](null,_0xca3cb5),this['setSwapWeapon'](_0x4ea264,0x0),this[_0x3f845c(0x160)]();}}this[_0x3f845c(0x18a)]();},Game_Actor[_0xfa4451(0x13a)]['updateSwapToNextAvailableWeapon']=function(){const _0x3f4ac0=_0xfa4451;if(this[_0x3f4ac0(0x11f)]()['length']>0x0)return;const _0x11a963=this['getAllEquippedSwapWeapons'](),_0x26a4de=_0x11a963[0x0]||null,_0x27f259=_0x26a4de?_0x26a4de['wtypeId']:0x0;this[_0x3f4ac0(0x138)](_0x27f259);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x18f)]=function(_0xc26a5f){const _0x1ad0cb=_0xfa4451;if(this['_checkingWeaponSwaps']||_0xc26a5f||this['_tempActor'])return;this[_0x1ad0cb(0x155)]=!![];let _0x5aa66c=![];for(let _0x579958=0x1;_0x579958<$dataSystem[_0x1ad0cb(0x19b)][_0x1ad0cb(0x159)];_0x579958++){if(this['isEquipWtypeOk'](_0x579958))continue;const _0x1489ab=this['getSwapWeapon'](_0x579958);if(!_0x1489ab)continue;this[_0x1ad0cb(0x172)][_0x579958]=0x0,$gameParty[_0x1ad0cb(0x194)](_0x1489ab,0x1),_0x5aa66c=!![],this[_0x1ad0cb(0x1a7)][0x0][_0x1ad0cb(0x183)]()===_0x1489ab&&this['_equips'][0x0][_0x1ad0cb(0xdd)](null);}if(_0x5aa66c){const _0x22e8b6=this[_0x1ad0cb(0x11f)]()[0x0]||null;this[_0x1ad0cb(0x147)]=_0x22e8b6?_0x22e8b6['wtypeId']:0x0,this[_0x1ad0cb(0x18a)]();}this[_0x1ad0cb(0x155)]=undefined;},VisuMZ['WeaponSwapSystem'][_0xfa4451(0x18c)]=Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x1a3)],Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x1a3)]=function(_0x40050b){const _0x2beea3=_0xfa4451;this[_0x2beea3(0x18f)](_0x40050b),VisuMZ['WeaponSwapSystem'][_0x2beea3(0x18c)][_0x2beea3(0x102)](this,_0x40050b);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x17a)]=function(){const _0x16cc8e=_0xfa4451,_0xa70a13=this[_0x16cc8e(0x147)],_0x384e92=DataManager[_0x16cc8e(0xe5)]();for(const _0xd2ccb6 of this[_0x16cc8e(0xf0)]()){if(this[_0x16cc8e(0x12d)](_0xd2ccb6))continue;const _0x1a4ff7=_0x384e92[_0xd2ccb6-0x1];_0x1a4ff7&&this['setSwapWeapon'](_0xd2ccb6,_0x1a4ff7['id']);}this['switchToWeaponType'](_0xa70a13);},Game_Actor['prototype'][_0xfa4451(0x156)]=function(_0x4fbb06){const _0x4e4e11=_0xfa4451;return _0x4fbb06&&_0x4fbb06[_0x4e4e11(0x100)][_0x4e4e11(0x128)](VisuMZ['WeaponSwapSystem'][_0x4e4e11(0x158)][_0x4e4e11(0x1ae)])?!!this['weapons']()[0x0]:!![];},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x10b)]=function(_0x3faaa5){const _0x3cd4e0=_0xfa4451,_0x5cd3c0=_0x3faaa5[_0x3cd4e0(0x1cb)],_0x2ffe32=_0x3faaa5[_0x3cd4e0(0x113)];if(_0x5cd3c0===0x0&&_0x2ffe32===0x0)return!![];if(_0x5cd3c0>0x0&&!this[_0x3cd4e0(0x12d)](_0x5cd3c0))return![];if(_0x2ffe32>0x0&&!this[_0x3cd4e0(0x12d)](_0x2ffe32))return![];return!![];},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x115)]=function(_0x2b6ebb){const _0xae7b1b=_0xfa4451;if(!DataManager[_0xae7b1b(0x19f)](_0x2b6ebb))return;const _0x4fdc83=VisuMZ[_0xae7b1b(0x105)]['RegExp'];if(_0x2b6ebb['note']['match'](_0x4fdc83[_0xae7b1b(0x148)])){this[_0xae7b1b(0x138)](Number(RegExp['$1']));return;}else{if(_0x2b6ebb[_0xae7b1b(0x100)][_0xae7b1b(0x128)](_0x4fdc83['SwitchWpnTypeStr'])){const _0x408853=DataManager['getWtypeIdWithName'](RegExp['$1']);this[_0xae7b1b(0x138)](_0x408853);return;}}if(this[_0xae7b1b(0x1b6)]===_0x2b6ebb[_0xae7b1b(0x1cb)]||this['_currentweapontype']===_0x2b6ebb[_0xae7b1b(0x113)])return;if(_0x2b6ebb[_0xae7b1b(0x1cb)]>0x0)this[_0xae7b1b(0x138)](_0x2b6ebb[_0xae7b1b(0x1cb)]);else _0x2b6ebb[_0xae7b1b(0x113)]>0x0&&this[_0xae7b1b(0x138)](_0x2b6ebb[_0xae7b1b(0x113)]);},VisuMZ[_0xfa4451(0x105)]['Game_Actor_optimizeEquipments']=Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x171)],Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x171)]=function(){const _0x10fc91=_0xfa4451;VisuMZ['WeaponSwapSystem'][_0x10fc91(0x167)][_0x10fc91(0x102)](this),this[_0x10fc91(0xdb)]();},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0xeb)]=Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xe1)],Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xe1)]=function(_0x328590){const _0x4252aa=_0xfa4451;if(this['canWeaponSwap']()&&_0x328590===0x0)return![];return VisuMZ[_0x4252aa(0x105)][_0x4252aa(0xeb)]['call'](this,_0x328590);},Game_Actor[_0xfa4451(0x13a)]['optimizeSwappableWeapons']=function(){const _0x21d628=_0xfa4451;if(!this[_0x21d628(0x180)]())return;if(!VisuMZ['WeaponSwapSystem'][_0x21d628(0xeb)][_0x21d628(0x102)](this,0x0))return;const _0x2c56f8=this[_0x21d628(0x147)];for(const _0x31307b of this[_0x21d628(0xf0)]()){this[_0x21d628(0x138)](_0x31307b),this['changeWeapon'](this[_0x21d628(0x11a)](_0x31307b));}this['switchToWeaponType'](_0x2c56f8),this[_0x21d628(0x18a)]();},Game_Actor['prototype']['bestEquipWeapon']=function(_0x4663eb){const _0x1cc473=_0xfa4451,_0x4e5c17=$gameParty['weapons']()[_0x1cc473(0x170)](this[_0x1cc473(0x11f)]()),_0x247ba1=_0x4e5c17[_0x1cc473(0xe4)](_0x164a9b=>_0x164a9b['wtypeId']===_0x4663eb);let _0x3692e6=null,_0x52b1cf=-0x3e8;for(let _0x2b9467=0x0;_0x2b9467<_0x247ba1[_0x1cc473(0x159)];_0x2b9467++){const _0x221875=this['calcEquipItemPerformance'](_0x247ba1[_0x2b9467]);_0x221875>_0x52b1cf&&(_0x52b1cf=_0x221875,_0x3692e6=_0x247ba1[_0x2b9467]);}return _0x3692e6;},VisuMZ['WeaponSwapSystem'][_0xfa4451(0x168)]=Game_Actor[_0xfa4451(0x13a)]['clearEquipments'],Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xf6)]=function(){const _0x305c4d=_0xfa4451;VisuMZ['WeaponSwapSystem'][_0x305c4d(0x168)][_0x305c4d(0x102)](this),this[_0x305c4d(0xf5)]();},VisuMZ[_0xfa4451(0x105)]['Game_Actor_isClearEquipOk']=Game_Actor['prototype']['isClearEquipOk'],Game_Actor['prototype'][_0xfa4451(0x119)]=function(_0x25a31c){const _0x5823ed=_0xfa4451;if(this['canWeaponSwap']()&&_0x25a31c===0x0)return![];return VisuMZ[_0x5823ed(0x105)][_0x5823ed(0x196)][_0x5823ed(0x102)](this,_0x25a31c);},Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0xf5)]=function(){const _0xc44d07=_0xfa4451;if(!this[_0xc44d07(0x180)]())return;if(!VisuMZ[_0xc44d07(0x105)][_0xc44d07(0x196)][_0xc44d07(0x102)](this,0x0))return;for(let _0x5b78a9=0x1;_0x5b78a9<$dataSystem[_0xc44d07(0x19b)]['length'];_0x5b78a9++){const _0x5299ba=this[_0xc44d07(0x12d)](_0x5b78a9);_0x5299ba&&(this[_0xc44d07(0x138)](_0x5b78a9),this[_0xc44d07(0x197)](null));}this[_0xc44d07(0x18a)]();},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x1cc)]=Game_Party[_0xfa4451(0x13a)][_0xfa4451(0x1b3)],Game_Party['prototype'][_0xfa4451(0x1b3)]=function(){const _0x50db2d=_0xfa4451;VisuMZ['WeaponSwapSystem']['Game_Party_setupBattleTestMembers']['call'](this);for(const _0x538552 of this['allMembers']()){if(!_0x538552)continue;_0x538552[_0x50db2d(0x17a)]();}this[_0x50db2d(0xda)]=!![];},Scene_Equip[_0xfa4451(0x13a)][_0xfa4451(0x16f)]=function(){const _0xf2335c=_0xfa4451,_0x42507f=this[_0xf2335c(0x10c)](),_0x27486b=this[_0xf2335c(0x130)]['_slotId'],_0x4dc7b0=this[_0xf2335c(0x130)][_0xf2335c(0xde)]();_0x42507f[_0xf2335c(0x16c)](_0x27486b,_0x4dc7b0);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x1a9)]=Scene_Battle[_0xfa4451(0x13a)][_0xfa4451(0x1bf)],Scene_Battle[_0xfa4451(0x13a)][_0xfa4451(0x1bf)]=function(){const _0x170fa0=_0xfa4451;VisuMZ[_0x170fa0(0x105)][_0x170fa0(0x1a9)][_0x170fa0(0x102)](this);const _0x4c651b=this['_actorCommandWindow'];_0x4c651b[_0x170fa0(0x146)]('weaponSwap',this[_0x170fa0(0xf8)][_0x170fa0(0x101)](this));},Scene_Battle[_0xfa4451(0x13a)][_0xfa4451(0xf8)]=function(){const _0x4b6579=_0xfa4451,_0x9e5343=BattleManager['actor']();_0x9e5343['swapWeaponNext'](),this['_actorCommandWindow'][_0x4b6579(0x112)](),this[_0x4b6579(0x16a)][_0x4b6579(0x18a)]();},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x186)]=Sprite_Actor[_0xfa4451(0x13a)]['refreshMotion'],Sprite_Actor[_0xfa4451(0x13a)][_0xfa4451(0x1b8)]=function(){const _0x5a560a=_0xfa4451;this['_actor']&&this['_actor']['_swappingWeapon']&&(this[_0x5a560a(0xfb)]['_swappingWeapon']=undefined),VisuMZ[_0x5a560a(0x105)][_0x5a560a(0x186)][_0x5a560a(0x102)](this);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x16d)]=Window_Base[_0xfa4451(0x13a)][_0xfa4451(0x1d1)],Window_Base['prototype'][_0xfa4451(0x1d1)]=function(){const _0x53b858=_0xfa4451;this[_0x53b858(0x199)]['name']===_0x53b858(0x188)&&this['currentSymbol']()==='weaponSwap'?SoundManager['playEquip']():VisuMZ[_0x53b858(0x105)][_0x53b858(0x16d)][_0x53b858(0x102)](this);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0xe0)]=Window_StatusBase[_0xfa4451(0x13a)][_0xfa4451(0xd6)],Window_StatusBase[_0xfa4451(0x13a)]['actorSlotName']=function(_0x43c4d2,_0x47b6ac){const _0xdf3781=_0xfa4451;return _0x43c4d2&&_0x43c4d2[_0xdf3781(0x180)]()?this['actorSlotNameWeaponSwap'](_0x43c4d2,_0x47b6ac):VisuMZ[_0xdf3781(0x105)][_0xdf3781(0xe0)][_0xdf3781(0x102)](this,_0x43c4d2,_0x47b6ac);},Window_StatusBase['prototype'][_0xfa4451(0x1af)]=function(_0x3278f4,_0x127444){const _0x475172=_0xfa4451;let _0x270d14=_0x3278f4['weaponSwapTypes']()[_0x475172(0x159)]-0x1;Window_EquipSlot[_0x475172(0xd2)]&&(_0x270d14=$dataSystem[_0x475172(0x19b)][_0x475172(0x159)]-0x2);if(_0x127444>_0x270d14)return _0x127444-=_0x270d14,VisuMZ['WeaponSwapSystem'][_0x475172(0xe0)][_0x475172(0x102)](this,_0x3278f4,_0x127444);else{let _0x27d8ab='';if(Window_EquipSlot[_0x475172(0xd2)])_0x27d8ab=$dataSystem['weaponTypes'][_0x127444+0x1]||'';else{const _0x27eece=_0x3278f4[_0x475172(0xf0)]()[_0x127444];_0x27d8ab=$dataSystem[_0x475172(0x19b)][_0x27eece]||'';}return _0x27d8ab=_0x27d8ab[_0x475172(0x1a4)](/\\I\[(\d+)\]/gi,''),_0x27d8ab;}},Window_EquipSlot[_0xfa4451(0xd2)]=VisuMZ['WeaponSwapSystem'][_0xfa4451(0x134)]['UI']['ShowUnequippable'],VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x13e)]=Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0x107)],Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0x107)]=function(){const _0x7673a0=_0xfa4451;return this[_0x7673a0(0xfb)]&&this['_actor']['canWeaponSwap']()?this['maxItemsWeaponSwap']():VisuMZ[_0x7673a0(0x105)][_0x7673a0(0x13e)][_0x7673a0(0x102)](this);},Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0xd9)]=function(){const _0x505f4a=_0xfa4451;let _0x1ac262=this[_0x505f4a(0xfb)][_0x505f4a(0xee)]()[_0x505f4a(0x159)]-0x1;return Window_EquipSlot[_0x505f4a(0xd2)]?_0x1ac262+=$dataSystem[_0x505f4a(0x19b)][_0x505f4a(0x159)]-0x1:_0x1ac262+=this[_0x505f4a(0xfb)]['weaponSwapTypes']()[_0x505f4a(0x159)],_0x1ac262;},VisuMZ[_0xfa4451(0x105)]['Window_EquipSlot_itemAt']=Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0x1c2)],Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0x1c2)]=function(_0x25584c){const _0x3ff0f0=_0xfa4451;return this[_0x3ff0f0(0xfb)]&&this[_0x3ff0f0(0xfb)]['canWeaponSwap']()?this[_0x3ff0f0(0xf1)](_0x25584c):VisuMZ[_0x3ff0f0(0x105)]['Window_EquipSlot_itemAt'][_0x3ff0f0(0x102)](this,_0x25584c);},Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0xf1)]=function(_0x4d0dc9){const _0x1c67da=_0xfa4451;let _0x2156c3=this[_0x1c67da(0xfb)]['weaponSwapTypes']()[_0x1c67da(0x159)]-0x1;Window_EquipSlot[_0x1c67da(0xd2)]&&(_0x2156c3=$dataSystem[_0x1c67da(0x19b)][_0x1c67da(0x159)]-0x2);if(_0x4d0dc9>_0x2156c3)return _0x4d0dc9-=_0x2156c3,VisuMZ[_0x1c67da(0x105)]['Window_EquipSlot_itemAt'][_0x1c67da(0x102)](this,_0x4d0dc9);else{let _0x2c6e4d=this[_0x1c67da(0xfb)][_0x1c67da(0xf0)]()[_0x4d0dc9];return Window_EquipSlot[_0x1c67da(0xd2)]&&(_0x2c6e4d=_0x4d0dc9+0x1),this[_0x1c67da(0xfb)][_0x1c67da(0x12d)](_0x2c6e4d);}},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x10d)]=Window_EquipSlot['prototype'][_0xfa4451(0xd5)],Window_EquipSlot[_0xfa4451(0x13a)]['isEnabled']=function(_0x2e328c){const _0x48dad1=_0xfa4451;return this[_0x48dad1(0xfb)]&&this[_0x48dad1(0xfb)][_0x48dad1(0x180)]()?this['isEnabledWeaponSwap'](_0x2e328c):VisuMZ[_0x48dad1(0x105)][_0x48dad1(0x10d)]['call'](this,_0x2e328c);},Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0xfd)]=function(_0x11c059){const _0xf573d1=_0xfa4451;let _0x236c1f=this[_0xf573d1(0xfb)]['weaponSwapTypes']()[_0xf573d1(0x159)]-0x1;Window_EquipSlot[_0xf573d1(0xd2)]&&(_0x236c1f=$dataSystem[_0xf573d1(0x19b)][_0xf573d1(0x159)]-0x2);if(_0x11c059>_0x236c1f)return _0x11c059-=_0x236c1f,VisuMZ[_0xf573d1(0x105)]['Window_EquipSlot_isEnabled'][_0xf573d1(0x102)](this,_0x11c059);else{if(!this['_actor'][_0xf573d1(0x108)](0x0))return![];else return Window_EquipSlot[_0xf573d1(0xd2)]?this[_0xf573d1(0xfb)]['weaponSwapTypes']()[_0xf573d1(0xe2)](_0x11c059+0x1):!![];}},VisuMZ['WeaponSwapSystem'][_0xfa4451(0x182)]=Game_Actor[_0xfa4451(0x13a)][_0xfa4451(0x108)],Game_Actor['prototype'][_0xfa4451(0x108)]=function(_0x4e3d04){const _0x1b12fa=_0xfa4451;if(_0x4e3d04<=0x0&&this[_0x1b12fa(0x180)]())return!![];return VisuMZ[_0x1b12fa(0x105)]['Game_Actor_isEquipChangeOk'][_0x1b12fa(0x102)](this,_0x4e3d04);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x114)]=Game_BattlerBase[_0xfa4451(0x13a)][_0xfa4451(0x1d2)],Game_BattlerBase[_0xfa4451(0x13a)][_0xfa4451(0x1d2)]=function(_0x1bc1e6){const _0xabaefb=_0xfa4451;if(_0x1bc1e6<=0x0&&this[_0xabaefb(0x180)]())return![];return VisuMZ[_0xabaefb(0x105)]['Game_BattlerBase_isEquipTypeSealed'][_0xabaefb(0x102)](this,_0x1bc1e6);},Window_EquipSlot[_0xfa4451(0x13a)]['processShiftRemoveShortcut']=function(){const _0x3d5c48=_0xfa4451;SoundManager[_0x3d5c48(0xff)]();const _0x40816b=SceneManager[_0x3d5c48(0x12e)][_0x3d5c48(0xfb)];this['_itemWindow'][_0x3d5c48(0x116)]>0x0?_0x40816b['changeEquip'](this[_0x3d5c48(0x130)]['_slotId'],null):(_0x40816b[_0x3d5c48(0x138)](this[_0x3d5c48(0x130)]['_wtypeID']),_0x40816b['changeWeapon'](null));this['refresh'](),this[_0x3d5c48(0x130)][_0x3d5c48(0x18a)](),this['callUpdateHelp']();const _0x1a8e86=SceneManager['_scene'][_0x3d5c48(0x178)];if(_0x1a8e86)_0x1a8e86[_0x3d5c48(0x18a)]();},VisuMZ[_0xfa4451(0x105)]['Window_EquipSlot_equipSlotIndex']=Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0x1cd)],Window_EquipSlot[_0xfa4451(0x13a)][_0xfa4451(0x1cd)]=function(){const _0x2895b3=_0xfa4451;let _0x43f6be=VisuMZ[_0x2895b3(0x105)]['Window_EquipSlot_equipSlotIndex'],_0x2f66ac=this[_0x2895b3(0xfb)][_0x2895b3(0xf0)]()[_0x2895b3(0x159)]-0x1;return Window_EquipSlot[_0x2895b3(0xd2)]&&(_0x2f66ac=$dataSystem[_0x2895b3(0x19b)][_0x2895b3(0x159)]-0x2),Math[_0x2895b3(0x12f)](0x0,_0x43f6be-_0x2f66ac);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x1a6)]=Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0x111)],Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0x111)]=function(_0x4c094e){const _0x2bf93b=_0xfa4451;VisuMZ[_0x2bf93b(0x105)][_0x2bf93b(0x1a6)][_0x2bf93b(0x102)](this,_0x4c094e),this[_0x2bf93b(0x1bd)]=0x0;},VisuMZ[_0xfa4451(0x105)]['Window_EquipItem_setSlotId']=Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0x140)],Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0x140)]=function(_0x15630a){const _0x1a0a24=_0xfa4451;if(!this[_0x1a0a24(0xfb)])return VisuMZ[_0x1a0a24(0x105)]['Window_EquipItem_setSlotId'][_0x1a0a24(0x102)](this,_0x15630a);let _0x3628a1=this['_actor'][_0x1a0a24(0xf0)]()[_0x1a0a24(0x159)]-0x1;Window_EquipSlot[_0x1a0a24(0xd2)]&&(_0x3628a1=$dataSystem[_0x1a0a24(0x19b)][_0x1a0a24(0x159)]-0x2),_0x15630a>_0x3628a1?(_0x15630a-=_0x3628a1,this['_wtypeID']=0x0,VisuMZ[_0x1a0a24(0x105)][_0x1a0a24(0x1a8)][_0x1a0a24(0x102)](this,_0x15630a)):(Window_EquipSlot[_0x1a0a24(0xd2)]?this['_wtypeID']=_0x15630a+0x1:this['_wtypeID']=this[_0x1a0a24(0xfb)][_0x1a0a24(0xf0)]()[_0x15630a],_0x15630a=0x0,VisuMZ[_0x1a0a24(0x105)][_0x1a0a24(0x1a8)]['call'](this,_0x15630a),this[_0x1a0a24(0xfb)][_0x1a0a24(0x138)](this[_0x1a0a24(0x1bd)]),this['_statusWindow']&&this['_statusWindow']['refresh']());},VisuMZ['WeaponSwapSystem'][_0xfa4451(0x129)]=Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0xe2)],Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0xe2)]=function(_0x43e8e4){const _0x23996e=_0xfa4451;if(_0x43e8e4===null)return!this['nonRemovableEtypes']()[_0x23996e(0xe2)](this['etypeId']());else return this[_0x23996e(0x116)]===0x0&&this[_0x23996e(0x1bd)]!==0x0?_0x43e8e4[_0x23996e(0x1aa)]===this[_0x23996e(0x1bd)]:VisuMZ[_0x23996e(0x105)][_0x23996e(0x129)][_0x23996e(0x102)](this,_0x43e8e4);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0xf9)]=Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0xd5)],Window_EquipItem[_0xfa4451(0x13a)][_0xfa4451(0xd5)]=function(_0x45b743){const _0x41fa79=_0xfa4451;if(!_0x45b743)return!this[_0x41fa79(0x127)]()['includes'](this[_0x41fa79(0xcf)]());return VisuMZ[_0x41fa79(0x105)][_0x41fa79(0xf9)][_0x41fa79(0x102)](this,_0x45b743);},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x13b)]=Window_StatusEquip['prototype'][_0xfa4451(0x107)],Window_StatusEquip[_0xfa4451(0x13a)][_0xfa4451(0x107)]=function(){const _0x4504df=_0xfa4451;return this[_0x4504df(0xfb)]&&this[_0x4504df(0xfb)][_0x4504df(0x180)]()?this[_0x4504df(0xd9)]():VisuMZ[_0x4504df(0x105)][_0x4504df(0x13b)][_0x4504df(0x102)](this);},Window_StatusEquip[_0xfa4451(0x13a)][_0xfa4451(0xd9)]=function(){const _0x7c5e2b=_0xfa4451;let _0x53e0e4=this[_0x7c5e2b(0xfb)]['equipSlots']()[_0x7c5e2b(0x159)]-0x1;return Window_EquipSlot[_0x7c5e2b(0xd2)]?_0x53e0e4+=$dataSystem[_0x7c5e2b(0x19b)][_0x7c5e2b(0x159)]-0x1:_0x53e0e4+=this[_0x7c5e2b(0xfb)]['weaponSwapTypes']()[_0x7c5e2b(0x159)],_0x53e0e4;},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x11c)]=Window_StatusEquip[_0xfa4451(0x13a)]['drawItem'],Window_StatusEquip['prototype'][_0xfa4451(0x14b)]=function(_0x3019bb){const _0x5224d4=_0xfa4451;this['_actor']&&this[_0x5224d4(0xfb)][_0x5224d4(0x180)]()?this[_0x5224d4(0x1ca)](_0x3019bb):VisuMZ[_0x5224d4(0x105)]['Window_StatusEquip_drawItem'][_0x5224d4(0x102)](this,_0x3019bb);},Window_StatusEquip['prototype']['drawItemForWeaponSwap']=function(_0x546313){const _0x3e8b16=_0xfa4451,_0x16a5ac=this['itemLineRect'](_0x546313),_0x334df7=this['itemAt'](_0x546313),_0x3df20f=this[_0x3e8b16(0xd6)](this[_0x3e8b16(0xfb)],_0x546313),_0xfcb685=0x8a;this['changeTextColor'](ColorManager[_0x3e8b16(0x157)]()),this[_0x3e8b16(0x14a)](_0x3df20f,_0x16a5ac['x'],_0x16a5ac['y'],_0xfcb685,_0x16a5ac[_0x3e8b16(0x19e)]),this[_0x3e8b16(0x1bc)](_0x334df7,_0x16a5ac['x']+_0xfcb685,_0x16a5ac['y'],_0x16a5ac[_0x3e8b16(0x125)]-_0xfcb685);},Window_StatusEquip[_0xfa4451(0x13a)]['itemAt']=function(_0x49669e){const _0x454e47=_0xfa4451;let _0x31bbb6=this[_0x454e47(0xfb)][_0x454e47(0xf0)]()[_0x454e47(0x159)]-0x1;Window_EquipSlot[_0x454e47(0xd2)]&&(_0x31bbb6=$dataSystem[_0x454e47(0x19b)]['length']-0x2);if(_0x49669e>_0x31bbb6)return _0x49669e-=_0x31bbb6,VisuMZ[_0x454e47(0x105)][_0x454e47(0x15d)][_0x454e47(0x102)](this,_0x49669e);else{let _0x582fe7=this[_0x454e47(0xfb)][_0x454e47(0xf0)]()[_0x49669e];return Window_EquipSlot[_0x454e47(0xd2)]&&(_0x582fe7=_0x49669e+0x1),this[_0x454e47(0xfb)][_0x454e47(0x12d)](_0x582fe7);}},Window_ActorCommand['WEAPON_SWAP_CHANGE_ATTACK_ICON']=VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x134)]['UI'][_0xfa4451(0x19c)],Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE']=VisuMZ['WeaponSwapSystem'][_0xfa4451(0x134)]['UI']['SwapShortcut'],Window_ActorCommand[_0xfa4451(0x1a1)]=VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x134)]['UI']['ShowShortcutArrows'],Window_ActorCommand[_0xfa4451(0x190)]=VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x134)]['UI'][_0xfa4451(0x1c1)],VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x14c)]=Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x111)],Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x111)]=function(_0x45c948){const _0x8eec5b=_0xfa4451;VisuMZ['WeaponSwapSystem']['Window_ActorCommand_initialize'][_0x8eec5b(0x102)](this,_0x45c948),this[_0x8eec5b(0x17f)]();},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x144)]=Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x11e)],Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x11e)]=function(){const _0x10b23c=_0xfa4451;if(this[_0x10b23c(0xfb)])this[_0x10b23c(0xfb)]['updateSwapToNextAvailableWeapon']();VisuMZ[_0x10b23c(0x105)][_0x10b23c(0x144)][_0x10b23c(0x102)](this);if(!this['_actor'][_0x10b23c(0x180)]())return;this[_0x10b23c(0x110)]();if(this['findSymbol'](_0x10b23c(0xf3))>=0x0)return;this[_0x10b23c(0x104)]();},Window_ActorCommand['prototype'][_0xfa4451(0x110)]=function(){const _0x372a47=_0xfa4451,_0x502f1c=$dataSkills[this[_0x372a47(0xfb)][_0x372a47(0x103)]()];if(!_0x502f1c)return;if(!this[_0x372a47(0x15f)](_0x502f1c))return;if(!Window_ActorCommand[_0x372a47(0x14f)])return;const _0x3056c3=this[_0x372a47(0xfb)]['weapons']()[0x0];if(!_0x3056c3)return;const _0x308f0f=this[_0x372a47(0x162)](),_0x273a38=DataManager[_0x372a47(0xf4)](_0x502f1c),_0x152660=_0x3056c3[_0x372a47(0x136)],_0x520fc4=_0x308f0f===_0x372a47(0x161)?_0x273a38:_0x372a47(0x126)['format'](_0x152660,_0x273a38),_0x12c736=this[_0x372a47(0xea)](_0x372a47(0x121));if(_0x12c736>=0x0){const _0x15efc5=this['_list'][_0x12c736];_0x15efc5[_0x372a47(0x189)]=_0x520fc4;}},Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x104)]=function(_0x5be755){const _0x3b5b9e=_0xfa4451;if(!Window_ActorCommand[_0x3b5b9e(0x190)]&&!_0x5be755)return;if(this['_actor'][_0x3b5b9e(0xf0)]()[_0x3b5b9e(0x159)]<=0x1)return;if(this[_0x3b5b9e(0xfb)][_0x3b5b9e(0x1c7)]()[_0x3b5b9e(0x159)]<=0x0)return;this[_0x3b5b9e(0xea)](_0x3b5b9e(0xf3))>=0x0&&this['removeWeaponSwapCommand']();const _0x43a932=this[_0x3b5b9e(0x162)](),_0x31a79a=TextManager['swapWeaponCmd'],_0x1c05e1=ImageManager[_0x3b5b9e(0xe3)],_0x2d78fd=_0x43a932===_0x3b5b9e(0x161)?_0x31a79a:'\x5cI[%1]%2'[_0x3b5b9e(0x1c6)](_0x1c05e1,_0x31a79a);this[_0x3b5b9e(0x11b)](_0x2d78fd,_0x3b5b9e(0xf3));},Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x15e)]=function(){const _0x70e1fe=_0xfa4451;while(this[_0x70e1fe(0xea)](_0x70e1fe(0xf3))>=0x0){const _0x2431d3=this[_0x70e1fe(0xea)](_0x70e1fe(0xf3));this[_0x70e1fe(0x117)][_0x70e1fe(0x12a)](_0x2431d3,0x1);}},Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0xfc)]=function(){const _0x3d1406=_0xfa4451;return Window_ActorCommand[_0x3d1406(0x17d)]&&this['currentSymbol']()===_0x3d1406(0x121)&&this['_actor']&&this[_0x3d1406(0xfb)][_0x3d1406(0x180)]()&&this[_0x3d1406(0xfb)]['getAllEquippedSwapWeapons']()['length']>0x1;},Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x124)]=function(_0x48076c){const _0x51ac65=_0xfa4451;this[_0x51ac65(0xfc)]()?this[_0x51ac65(0x175)](!![]):Window_Command[_0x51ac65(0x13a)][_0x51ac65(0x124)][_0x51ac65(0x102)](this,_0x48076c);},Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x181)]=function(_0x3d3ba7){const _0x2fe140=_0xfa4451;this[_0x2fe140(0xfc)]()?this[_0x2fe140(0x175)](![]):Window_Command[_0x2fe140(0x13a)][_0x2fe140(0x181)][_0x2fe140(0x102)](this,_0x3d3ba7);},Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x175)]=function(_0x3a2981){const _0x1e6716=_0xfa4451;_0x3a2981?this['_actor']['swapWeaponNext']():this['_actor'][_0x1e6716(0x198)](),SoundManager[_0x1e6716(0xff)](),this[_0x1e6716(0x18a)]();},Window_ActorCommand['prototype'][_0xfa4451(0x17f)]=function(){const _0x51a063=_0xfa4451;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ENABLE'])return;if(!Window_ActorCommand['WEAPON_SWAP_SHORTCUT_ARROWS'])return;const _0xfde2c2=[new Sprite(),new Sprite()];for(const _0x10d21a of _0xfde2c2){this[_0x51a063(0x163)](_0x10d21a),_0x10d21a['opacity']=0x0,_0x10d21a[_0x51a063(0x10f)]['y']=0.5,_0x10d21a[_0x51a063(0x133)]=ImageManager[_0x51a063(0x1c9)](_0x51a063(0x166));}_0xfde2c2[0x0]['anchor']['x']=0x0,_0xfde2c2[0x0]['setFrame'](0x78,0x24,0x18,0x18),_0xfde2c2[0x0]['x']=0x0,this['_weaponSwapShortcutSprite_Left']=_0xfde2c2[0x0],_0xfde2c2[0x1][_0x51a063(0x10f)]['x']=0x1,_0xfde2c2[0x1][_0x51a063(0x18e)](0x90,0x24,0x18,0x18),_0xfde2c2[0x1]['x']=this[_0x51a063(0x125)],this['_weaponSwapShortcutSprite_Right']=_0xfde2c2[0x1];},Window_ActorCommand[_0xfa4451(0x13a)]['updateArrows']=function(){const _0x14cee2=_0xfa4451;Window_Scrollable[_0x14cee2(0x13a)][_0x14cee2(0x123)][_0x14cee2(0x102)](this),this[_0x14cee2(0x1ba)]();},Window_ActorCommand['prototype'][_0xfa4451(0x1ba)]=function(){const _0x51b2cd=_0xfa4451;if(!Window_ActorCommand[_0x51b2cd(0x17d)])return;if(!Window_ActorCommand[_0x51b2cd(0x1a1)])return;VisuMZ['WeaponSwapSystem']['updateShortcutOpacity']['call'](this[_0x51b2cd(0x1b5)]),VisuMZ[_0x51b2cd(0x105)][_0x51b2cd(0x1b0)]['call'](this['_weaponSwapShortcutSprite_Right']);},Window_ActorCommand['prototype'][_0xfa4451(0xec)]=function(){const _0x2780c6=_0xfa4451;if(!this[_0x2780c6(0xfb)])return![];if(this[_0x2780c6(0x1a2)]()!==_0x2780c6(0x121))return![];if(this[_0x2780c6(0xfb)][_0x2780c6(0xf0)]()[_0x2780c6(0x159)]<=0x1)return![];return this['_actor'][_0x2780c6(0x1c7)]()[_0x2780c6(0x159)]>0x1;},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x1b0)]=function(){const _0x2b35ee=_0xfa4451;if(!this[_0x2b35ee(0x1ac)][_0x2b35ee(0x1b2)]||this[_0x2b35ee(0x1ac)][_0x2b35ee(0x1b1)]<0xff||this[_0x2b35ee(0x1ac)]['openness']<0xff)this['opacity']=0x0;else{if(this[_0x2b35ee(0x1ac)][_0x2b35ee(0xec)]()){var _0x1c8d5d=this['parent'][_0x2b35ee(0x169)](this[_0x2b35ee(0x1ac)][_0x2b35ee(0xea)](_0x2b35ee(0x121))),_0x14c4e6=_0x1c8d5d['y']+this[_0x2b35ee(0x1ac)]['padding'];_0x14c4e6>0x0&&_0x14c4e6<this[_0x2b35ee(0x1ac)][_0x2b35ee(0x19e)]-this[_0x2b35ee(0x1ac)][_0x2b35ee(0xd8)]*0x2&&(_0x14c4e6+=Math[_0x2b35ee(0x14d)](this['parent'][_0x2b35ee(0xe6)]()/0x2),this[_0x2b35ee(0x15a)]=0xff,this['y']=_0x14c4e6);}else this[_0x2b35ee(0x15a)]-=0x20;}},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x139)]=Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x1c0)],Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0x1c0)]=function(_0x448402){const _0x30623e=_0xfa4451;VisuMZ['WeaponSwapSystem'][_0x30623e(0x139)]['call'](this,_0x448402),this[_0x30623e(0x17e)]&&(this[_0x30623e(0x17e)]['x']=this['width']);},VisuMZ['WeaponSwapSystem']['Settings'][_0xfa4451(0x18d)]=Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0xe7)],Window_ActorCommand[_0xfa4451(0x13a)][_0xfa4451(0xe7)]=function(){const _0x5bd783=_0xfa4451,_0x3d3b88=this[_0x5bd783(0x1a2)]();switch(_0x3d3b88){case _0x5bd783(0xf3):this[_0x5bd783(0x1c8)][_0x5bd783(0x15c)](TextManager['swapWeaponHelp']);break;default:VisuMZ[_0x5bd783(0x105)]['Settings'][_0x5bd783(0x18d)][_0x5bd783(0x102)](this);break;}},VisuMZ[_0xfa4451(0x105)][_0xfa4451(0x14e)]=Window_ShopStatus[_0xfa4451(0x13a)][_0xfa4451(0x1a0)],Window_ShopStatus['prototype'][_0xfa4451(0x1a0)]=function(_0x2d40f6,_0x21d231,_0x2fdad4,_0xcf499b,_0x327a23){const _0x5cca98=_0xfa4451;let _0x59cdda=0x0;_0x2d40f6&&_0x2d40f6[_0x5cca98(0x180)]()&&DataManager[_0x5cca98(0xdf)](this[_0x5cca98(0x1bb)])&&(_0x59cdda=_0x2d40f6[_0x5cca98(0x147)],_0x2d40f6[_0x5cca98(0x138)](this['_item']['wtypeId'])),VisuMZ[_0x5cca98(0x105)][_0x5cca98(0x14e)][_0x5cca98(0x102)](this,_0x2d40f6,_0x21d231,_0x2fdad4,_0xcf499b,_0x327a23),_0x2d40f6&&_0x2d40f6[_0x5cca98(0x180)]()&&_0x59cdda>0x0&&_0x2d40f6[_0x5cca98(0x138)](_0x59cdda);};