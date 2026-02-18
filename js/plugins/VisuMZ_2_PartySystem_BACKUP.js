//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.34] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 * 
 * Temporary Parties
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 * 
 * VisuMZ_2_BattleSystemSTB
 * 
 * With Battle System - STB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Standard Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 * 
 * === Temporary Parties Plugin Commands ===
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (Normal)
 * - Creates a temporary party with specific actors.
 * - Can't be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to be added to the temporary party until the
 *     temporary party is disbanded.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (JS)
 * - Creates a temporary party selected with JavaScript.
 * - Can't be used in battle.
 * 
 *   JS: Actor ID(s):
 *   - Use JavaScript to determine which actor(s) are added to the temporary
 *     party until disbanded.
 * 
 * ---
 * 
 * Temp: Disband Temporary Party
 * - Clears temporary party.
 * - Can't be used in battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.34: July 17, 2025
 * * Compatibility Update!
 * ** Added better compatibility with TPB when using the in-battle Party switch
 *    command from the Party Command Window. Update made by Irina.
 * 
 * Version 1.33: May 15, 2025
 * * Compatibility Update!
 * ** Added better compatibility for $gameParty.swapOrder function to allow it
 *    to work on the map. Update made by Irina.
 * 
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon adding new members if the
 *    VisuStella Core Engine wasn't installed. Fix made by Arisu.
 * 
 * Version 1.31: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added to "Major Changes":
 * *** Temporary Parties
 * **** Temporary parties are very specific parties that will overwrite
 *      whatever the player has set as a party. These can include current party
 *      members or even actors that haven't joined. The temporary party cannot
 *      be changed nor can the positions of said party members can be changed.
 * **** When a temporary party is present, menu and battle commands involving
 *      changing party members will be disabled.
 * **** Once the temporary party is disbanded, the player's selected party will
 *      be available once again as well as all of the functions to change party
 *      members and their positions.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Temp: Create Temporary Party (Normal)
 * **** Creates a temporary party with specific actors.
 * *** Temp: Create Temporary Party (JS)
 * **** Creates a temporary party selected with JavaScript.
 * *** Temp: Disband Temporary Party
 * **** Clears temporary party.
 * 
 * Version 1.30: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with FTB, ETB, and PTB did not replace
 *    the newely added party member on the turn order timeline. Fix by Olivia.
 * 
 * Version 1.29: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with PTB did not register correctly.
 *    Fix made by Olivia.
 * 
 * Version 1.28: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: February 16, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * Feature Update!
 * ** When holding the "up" keyboard button with the reserve window active, the
 *    return to the active party window will no longer happen unless the "up"
 *    key is released and then pressed again. Update made by Olivia.
 * 
 * Version 1.26: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Temp
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyNormal
 * @text Temp: Create Temporary Party (Normal)
 * @desc Creates a temporary party with specific actors.
 * Can't be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to be added to the temporary party
 * until the temporary party is disbanded.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyJS
 * @text Temp: Create Temporary Party (JS)
 * @desc Creates a temporary party selected with JavaScript.
 * Can't be used in battle.
 *
 * @arg ActorsJS:func
 * @text JS: Actor ID(s)
 * @type note
 * @desc Use JavaScript to determine which actor(s) are added to
 * the temporary party until disbanded.
 * @default "// Declare Actor ID's\nconst actorIDs = [];\n\n// Add Actor ID's\nactorIDs.push(1);\nactorIDs.push(2);\nactorIDs.push(3);\nactorIDs.push(4);\n\n// Return Actor IDs\nreturn actorIDs;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempDisbandTempParty
 * @text Temp: Disband Temporary Party
 * @desc Clears temporary party.
 * Can't be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0xee71c=_0x526a;(function(_0x1ebbad,_0x50fc05){const _0x5ee93e=_0x526a,_0xe3dc97=_0x1ebbad();while(!![]){try{const _0x1c3c0=-parseInt(_0x5ee93e(0x20e))/0x1*(parseInt(_0x5ee93e(0x190))/0x2)+parseInt(_0x5ee93e(0x22d))/0x3+parseInt(_0x5ee93e(0x309))/0x4+-parseInt(_0x5ee93e(0x1f4))/0x5*(-parseInt(_0x5ee93e(0x265))/0x6)+-parseInt(_0x5ee93e(0x1da))/0x7*(parseInt(_0x5ee93e(0x14d))/0x8)+parseInt(_0x5ee93e(0x180))/0x9*(-parseInt(_0x5ee93e(0x188))/0xa)+-parseInt(_0x5ee93e(0x2c4))/0xb;if(_0x1c3c0===_0x50fc05)break;else _0xe3dc97['push'](_0xe3dc97['shift']());}catch(_0x459add){_0xe3dc97['push'](_0xe3dc97['shift']());}}}(_0x5e89,0xd99ed));var label=_0xee71c(0x2b6),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xee71c(0x1b2)](function(_0x2f08c6){const _0x5e96ba=_0xee71c;return _0x2f08c6[_0x5e96ba(0x2e6)]&&_0x2f08c6[_0x5e96ba(0x1e0)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0xee71c(0x21a)]=VisuMZ[label][_0xee71c(0x21a)]||{},VisuMZ['ConvertParams']=function(_0x51cfb2,_0x1e71bf){const _0x19fe27=_0xee71c;for(const _0x1a82d2 in _0x1e71bf){if(_0x1a82d2['match'](/(.*):(.*)/i)){const _0x2a9bf1=String(RegExp['$1']),_0x3dc71c=String(RegExp['$2'])[_0x19fe27(0x175)]()[_0x19fe27(0x1a0)]();let _0x1f9734,_0x19f89a,_0x3daf50;switch(_0x3dc71c){case _0x19fe27(0x131):_0x1f9734=_0x1e71bf[_0x1a82d2]!==''?Number(_0x1e71bf[_0x1a82d2]):0x0;break;case _0x19fe27(0x24e):_0x19f89a=_0x1e71bf[_0x1a82d2]!==''?JSON['parse'](_0x1e71bf[_0x1a82d2]):[],_0x1f9734=_0x19f89a['map'](_0x57bf57=>Number(_0x57bf57));break;case _0x19fe27(0x25e):_0x1f9734=_0x1e71bf[_0x1a82d2]!==''?eval(_0x1e71bf[_0x1a82d2]):null;break;case'ARRAYEVAL':_0x19f89a=_0x1e71bf[_0x1a82d2]!==''?JSON[_0x19fe27(0x19e)](_0x1e71bf[_0x1a82d2]):[],_0x1f9734=_0x19f89a[_0x19fe27(0x332)](_0x3f1c4c=>eval(_0x3f1c4c));break;case _0x19fe27(0x270):_0x1f9734=_0x1e71bf[_0x1a82d2]!==''?JSON['parse'](_0x1e71bf[_0x1a82d2]):'';break;case _0x19fe27(0x28d):_0x19f89a=_0x1e71bf[_0x1a82d2]!==''?JSON['parse'](_0x1e71bf[_0x1a82d2]):[],_0x1f9734=_0x19f89a[_0x19fe27(0x332)](_0x496aa2=>JSON['parse'](_0x496aa2));break;case _0x19fe27(0x250):_0x1f9734=_0x1e71bf[_0x1a82d2]!==''?new Function(JSON['parse'](_0x1e71bf[_0x1a82d2])):new Function(_0x19fe27(0x1fc));break;case _0x19fe27(0x2e2):_0x19f89a=_0x1e71bf[_0x1a82d2]!==''?JSON[_0x19fe27(0x19e)](_0x1e71bf[_0x1a82d2]):[],_0x1f9734=_0x19f89a['map'](_0x4a745a=>new Function(JSON[_0x19fe27(0x19e)](_0x4a745a)));break;case _0x19fe27(0x31f):_0x1f9734=_0x1e71bf[_0x1a82d2]!==''?String(_0x1e71bf[_0x1a82d2]):'';break;case'ARRAYSTR':_0x19f89a=_0x1e71bf[_0x1a82d2]!==''?JSON[_0x19fe27(0x19e)](_0x1e71bf[_0x1a82d2]):[],_0x1f9734=_0x19f89a[_0x19fe27(0x332)](_0x55dc69=>String(_0x55dc69));break;case _0x19fe27(0x21b):_0x3daf50=_0x1e71bf[_0x1a82d2]!==''?JSON[_0x19fe27(0x19e)](_0x1e71bf[_0x1a82d2]):{},_0x1f9734=VisuMZ['ConvertParams']({},_0x3daf50);break;case _0x19fe27(0x256):_0x19f89a=_0x1e71bf[_0x1a82d2]!==''?JSON['parse'](_0x1e71bf[_0x1a82d2]):[],_0x1f9734=_0x19f89a[_0x19fe27(0x332)](_0x4d9446=>VisuMZ[_0x19fe27(0x1d5)]({},JSON[_0x19fe27(0x19e)](_0x4d9446)));break;default:continue;}_0x51cfb2[_0x2a9bf1]=_0x1f9734;}}return _0x51cfb2;},(_0x51df62=>{const _0x1f699b=_0xee71c,_0x574eda=_0x51df62[_0x1f699b(0x26a)];for(const _0x3da5f3 of dependencies){if(!Imported[_0x3da5f3]){alert(_0x1f699b(0x335)[_0x1f699b(0x286)](_0x574eda,_0x3da5f3)),SceneManager[_0x1f699b(0x1c9)]();break;}}const _0x5b87ad=_0x51df62[_0x1f699b(0x1e0)];if(_0x5b87ad['match'](/\[Version[ ](.*?)\]/i)){const _0x4db1d7=Number(RegExp['$1']);_0x4db1d7!==VisuMZ[label][_0x1f699b(0x288)]&&(alert(_0x1f699b(0x12c)[_0x1f699b(0x286)](_0x574eda,_0x4db1d7)),SceneManager[_0x1f699b(0x1c9)]());}if(_0x5b87ad[_0x1f699b(0x214)](/\[Tier[ ](\d+)\]/i)){const _0x43b8be=Number(RegExp['$1']);_0x43b8be<tier?(alert(_0x1f699b(0x31d)['format'](_0x574eda,_0x43b8be,tier)),SceneManager[_0x1f699b(0x1c9)]()):tier=Math['max'](_0x43b8be,tier);}VisuMZ[_0x1f699b(0x1d5)](VisuMZ[label][_0x1f699b(0x21a)],_0x51df62[_0x1f699b(0x2ac)]);})(pluginData),PluginManager[_0xee71c(0x2d0)](pluginData[_0xee71c(0x26a)],'CallPartyScene',_0x59ebe6=>{SceneManager['push'](Scene_Party);}),PluginManager[_0xee71c(0x2d0)](pluginData['name'],_0xee71c(0x138),_0x482bf6=>{const _0x1179f2=_0xee71c;if($gameParty[_0x1179f2(0x328)]())return;VisuMZ[_0x1179f2(0x1d5)](_0x482bf6,_0x482bf6);const _0x51bf3d=_0x482bf6['Value'];$gameParty[_0x1179f2(0x1b7)](_0x51bf3d);}),PluginManager[_0xee71c(0x2d0)](pluginData[_0xee71c(0x26a)],_0xee71c(0x1a1),_0xacb47b=>{const _0x59ac61=_0xee71c;if(!SceneManager[_0x59ac61(0x2e9)]())return;VisuMZ['ConvertParams'](_0xacb47b,_0xacb47b);const _0x173632=_0xacb47b[_0x59ac61(0x25b)];for(const _0x3541d1 of _0x173632){$gameParty[_0x59ac61(0x1b5)](_0x3541d1);}$gamePlayer[_0x59ac61(0x17f)]();}),PluginManager['registerCommand'](pluginData[_0xee71c(0x26a)],_0xee71c(0x2a6),_0x27fdde=>{const _0x41143a=_0xee71c;if(!SceneManager[_0x41143a(0x2e9)]())return;VisuMZ['ConvertParams'](_0x27fdde,_0x27fdde);const _0x356a0c=_0x27fdde[_0x41143a(0x25b)];for(const _0x2d7eac of _0x356a0c){if($gameParty[_0x41143a(0x143)]()[_0x41143a(0x323)]<=0x1)break;$gameParty[_0x41143a(0x1b6)](_0x2d7eac);}$gamePlayer[_0x41143a(0x17f)]();}),PluginManager[_0xee71c(0x2d0)](pluginData['name'],_0xee71c(0x253),_0x1e743c=>{const _0x53bec0=_0xee71c;if(!SceneManager[_0x53bec0(0x2e9)]())return;if($gameParty[_0x53bec0(0x143)]()[_0x53bec0(0x323)]<=0x1)return;if(!$gameParty['_battleMembers'])return;if($gameParty[_0x53bec0(0x308)][_0x53bec0(0x323)]<=0x0)return;VisuMZ[_0x53bec0(0x1d5)](_0x1e743c,_0x1e743c);const _0xc8b55=_0x1e743c['Index'],_0x411a97=$gameParty[_0x53bec0(0x308)][_0xc8b55];$gameParty['removeActorFromBattleMembers'](_0x411a97),$gamePlayer[_0x53bec0(0x17f)]();}),PluginManager['registerCommand'](pluginData[_0xee71c(0x26a)],_0xee71c(0x13e),_0x475344=>{const _0x8b5b4c=_0xee71c;if(!SceneManager['isSceneMap']())return;if($gameParty[_0x8b5b4c(0x143)]()[_0x8b5b4c(0x323)]>=$gameParty[_0x8b5b4c(0x1ad)]())return;if($gameParty[_0x8b5b4c(0x217)]()[_0x8b5b4c(0x323)]<=0x0)return;const _0x1c7679=$gameParty[_0x8b5b4c(0x217)](),_0x598dad=_0x1c7679[Math['floor'](Math[_0x8b5b4c(0x2ad)]()*_0x1c7679[_0x8b5b4c(0x323)])],_0xc7b92=_0x598dad[_0x8b5b4c(0x174)]();$gameParty[_0x8b5b4c(0x1b5)](_0xc7b92),$gamePlayer[_0x8b5b4c(0x17f)]();}),PluginManager['registerCommand'](pluginData[_0xee71c(0x26a)],_0xee71c(0x152),_0x3db01c=>{const _0x4fd44f=_0xee71c;VisuMZ[_0x4fd44f(0x1d5)](_0x3db01c,_0x3db01c);const _0x3ba59c=_0x3db01c[_0x4fd44f(0x25b)]['map'](_0x45cfd4=>$gameActors['actor'](_0x45cfd4))[_0x4fd44f(0x19b)](null),_0x1aca8d=_0x3db01c[_0x4fd44f(0x233)];for(const _0x24038e of _0x3ba59c){if(!_0x24038e)continue;_0x24038e[_0x4fd44f(0x227)](_0x1aca8d);}}),PluginManager[_0xee71c(0x2d0)](pluginData[_0xee71c(0x26a)],'RequirePartyMembers',_0x699d44=>{const _0x349768=_0xee71c;VisuMZ[_0x349768(0x1d5)](_0x699d44,_0x699d44);const _0x48490c=_0x699d44[_0x349768(0x25b)][_0x349768(0x332)](_0x437d98=>$gameActors[_0x349768(0x271)](_0x437d98))[_0x349768(0x19b)](null),_0x5241cf=_0x699d44[_0x349768(0x2ef)];for(const _0xd343ed of _0x48490c){if(!_0xd343ed)continue;_0xd343ed[_0x349768(0x148)](_0x5241cf);}}),PluginManager['registerCommand'](pluginData['name'],_0xee71c(0x1d3),_0x1b0d16=>{const _0x57797d=_0xee71c;if($gameParty[_0x57797d(0x328)]())return;VisuMZ[_0x57797d(0x1d5)](_0x1b0d16,_0x1b0d16);const _0x5bbfa9=_0x1b0d16['Actors']||[];if(_0x5bbfa9[_0x57797d(0x323)]<=0x0)return;$gameParty[_0x57797d(0x2d8)](_0x5bbfa9);}),PluginManager[_0xee71c(0x2d0)](pluginData['name'],_0xee71c(0x32c),_0x2ab23a=>{const _0x456c27=_0xee71c;if($gameParty['inBattle']())return;VisuMZ[_0x456c27(0x1d5)](_0x2ab23a,_0x2ab23a);let _0x4aaeb1=[];try{_0x4aaeb1=_0x2ab23a[_0x456c27(0x2a0)]()||[];}catch(_0x1d4fb0){console[_0x456c27(0x260)](_0x456c27(0x2fe)),console[_0x456c27(0x260)](_0x1d4fb0);return;}if(_0x4aaeb1['length']<=0x0)return;$gameParty[_0x456c27(0x2d8)](_0x4aaeb1);}),PluginManager[_0xee71c(0x2d0)](pluginData[_0xee71c(0x26a)],_0xee71c(0x1df),_0x3df1cf=>{const _0x283ea7=_0xee71c;if($gameParty[_0x283ea7(0x328)]())return;VisuMZ[_0x283ea7(0x1d5)](_0x3df1cf,_0x3df1cf),$gameParty[_0x283ea7(0x306)]();}),ImageManager[_0xee71c(0x320)]=VisuMZ[_0xee71c(0x2b6)]['Settings'][_0xee71c(0x2da)][_0xee71c(0x171)],ImageManager[_0xee71c(0x157)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x2da)][_0xee71c(0x179)],TextManager['activeParty']=VisuMZ['PartySystem']['Settings'][_0xee71c(0x145)][_0xee71c(0x25c)],TextManager[_0xee71c(0x18b)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x296)],TextManager[_0xee71c(0x2f4)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)]['Vocab'][_0xee71c(0x2c6)],TextManager[_0xee71c(0x28c)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)]['Vocab']['Empty'],TextManager['removePartyMember']=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x139)],TextManager[_0xee71c(0x29b)]=VisuMZ[_0xee71c(0x2b6)]['Settings'][_0xee71c(0x145)][_0xee71c(0x1bd)],TextManager['assistRemovePartyMember']=VisuMZ['PartySystem'][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x1f7)],TextManager[_0xee71c(0x208)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)]['AssistSort'],TextManager[_0xee71c(0x29e)]=VisuMZ[_0xee71c(0x2b6)]['Settings'][_0xee71c(0x145)]['AssistSwapIn'],TextManager['assistSwapOutPartyMember']=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)]['AssistSwapOut'],ColorManager[_0xee71c(0x324)]=function(_0x1d7d1d){const _0x4cd8a0=_0xee71c;return _0x1d7d1d=String(_0x1d7d1d),_0x1d7d1d[_0x4cd8a0(0x214)](/#(.*)/i)?_0x4cd8a0(0x196)[_0x4cd8a0(0x286)](String(RegExp['$1'])):this[_0x4cd8a0(0x1cb)](Number(_0x1d7d1d));},SceneManager['isSceneBattle']=function(){const _0x14e79b=_0xee71c;return this[_0x14e79b(0x240)]&&this[_0x14e79b(0x240)]['constructor']===Scene_Battle;},SceneManager[_0xee71c(0x2c0)]=function(){const _0xf3376d=_0xee71c;return this[_0xf3376d(0x240)]&&this[_0xf3376d(0x240)][_0xf3376d(0x1bf)]===Scene_Party;},SceneManager['isSceneMap']=function(){const _0x798bc=_0xee71c;return this['_scene']&&this[_0x798bc(0x240)]['constructor']===Scene_Map;},VisuMZ[_0xee71c(0x2b6)]['BattleManager_setup']=BattleManager[_0xee71c(0x166)],BattleManager[_0xee71c(0x166)]=function(_0x3ea04e,_0x5a77bf,_0x27843d){const _0x243a8d=_0xee71c;VisuMZ['PartySystem']['BattleManager_setup'][_0x243a8d(0x1fd)](this,_0x3ea04e,_0x5a77bf,_0x27843d),$gameParty[_0x243a8d(0x235)]();},BattleManager['updateTargetsForPartySwitch']=function(_0x25e32e,_0x3d3953){const _0x1ca89e=_0xee71c;if(_0x25e32e===_0x3d3953)return;if(!_0x25e32e)return;if(!_0x3d3953)return;if(this[_0x1ca89e(0x168)]===_0x25e32e)this[_0x1ca89e(0x168)]=_0x3d3953;while(this[_0x1ca89e(0x2af)][_0x1ca89e(0x30a)](_0x25e32e)){const _0x1cab43=this[_0x1ca89e(0x2af)]['indexOf'](_0x25e32e);this[_0x1ca89e(0x2af)][_0x1cab43]=_0x3d3953;}},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x30d)]=Game_Battler['prototype']['onBattleStart'],Game_Battler[_0xee71c(0x2ed)][_0xee71c(0x164)]=function(_0x5bb3ee){const _0x2ca9c1=_0xee71c;VisuMZ[_0x2ca9c1(0x2b6)][_0x2ca9c1(0x30d)][_0x2ca9c1(0x1fd)](this,_0x5bb3ee);if(this[_0x2ca9c1(0x228)]())this['clearPartySwitchCommandCooldown']();this[_0x2ca9c1(0x32b)]();},VisuMZ[_0xee71c(0x2b6)]['Game_Battler_regenerateAll']=Game_Battler[_0xee71c(0x2ed)][_0xee71c(0x187)],Game_Battler[_0xee71c(0x2ed)][_0xee71c(0x187)]=function(){const _0x3a023c=_0xee71c;VisuMZ[_0x3a023c(0x2b6)][_0x3a023c(0x165)]['call'](this);if(this[_0x3a023c(0x228)]()&&$gameParty[_0x3a023c(0x328)]())this[_0x3a023c(0x272)]();},VisuMZ['PartySystem'][_0xee71c(0x307)]=Game_Actor['prototype'][_0xee71c(0x166)],Game_Actor[_0xee71c(0x2ed)][_0xee71c(0x166)]=function(_0x3bd252){const _0x592caf=_0xee71c;VisuMZ[_0x592caf(0x2b6)][_0x592caf(0x307)][_0x592caf(0x1fd)](this,_0x3bd252),this[_0x592caf(0x16b)](),this[_0x592caf(0x326)]();},Game_Actor[_0xee71c(0x2ed)]['initPartySystem']=function(){const _0x5024f3=_0xee71c;this['_partyLocked']=![],this[_0x5024f3(0x303)]=![];},Game_Actor[_0xee71c(0x2ed)]['isFormationChangeOk']=function(){const _0x1e649b=_0xee71c;if(this[_0x1e649b(0x315)]===undefined)this['initPartySystem']();return!this[_0x1e649b(0x315)];},Game_Actor['prototype'][_0xee71c(0x227)]=function(_0x30d5de){const _0x1b1411=_0xee71c;if(this[_0x1b1411(0x315)]===undefined)this[_0x1b1411(0x16b)]();this['_partyLocked']=_0x30d5de;},Game_Actor[_0xee71c(0x2ed)][_0xee71c(0x135)]=function(){const _0x4f4dae=_0xee71c;if(this[_0x4f4dae(0x303)]===undefined)this['initPartySystem']();return this[_0x4f4dae(0x303)];},Game_Actor[_0xee71c(0x2ed)]['setPartyRequirement']=function(_0x633054){const _0x182cc6=_0xee71c;if(this[_0x182cc6(0x303)]===undefined)this[_0x182cc6(0x16b)]();this['_partyRequired']=_0x633054;},Game_Actor[_0xee71c(0x2ed)]['clearPartySwitchCommandCooldown']=function(){const _0x552ebb=_0xee71c;this[_0x552ebb(0x283)]=0x0;},Game_Actor['prototype'][_0xee71c(0x21f)]=function(){const _0x1c9d37=_0xee71c;if(this[_0x1c9d37(0x283)]===undefined)this[_0x1c9d37(0x326)]();if(!this[_0x1c9d37(0x22c)]())return![];if(this['isRequiredInParty']())return![];return this[_0x1c9d37(0x283)]<=0x0;},Game_Actor['prototype'][_0xee71c(0x322)]=function(){const _0x588682=_0xee71c;if(this[_0x588682(0x283)]===undefined)this['clearPartySwitchCommandCooldown']();return this[_0x588682(0x283)];},Game_Actor[_0xee71c(0x2ed)][_0xee71c(0x337)]=function(_0x33da91){const _0x368705=_0xee71c;if(this[_0x368705(0x283)]===undefined)this['clearPartySwitchCommandCooldown']();this[_0x368705(0x283)]=_0x33da91||0x0;},Game_Actor['prototype'][_0xee71c(0x154)]=function(){const _0x29b84e=_0xee71c;if(this[_0x29b84e(0x283)]===undefined)this[_0x29b84e(0x326)]();const _0x4a35b0=VisuMZ[_0x29b84e(0x2b6)][_0x29b84e(0x21a)][_0x29b84e(0x2da)][_0x29b84e(0x1f6)];this['setBattlePartySwitchCooldown'](_0x4a35b0);},Game_Actor[_0xee71c(0x2ed)]['updateBattlePartySwitchCooldown']=function(){const _0x5d38bf=_0xee71c;if(this[_0x5d38bf(0x283)]===undefined)this['clearPartySwitchCommandCooldown']();this[_0x5d38bf(0x283)]--;},Game_Actor[_0xee71c(0x2ed)][_0xee71c(0x25f)]=function(_0x1a0628){const _0x216ec3=_0xee71c;Imported['VisuMZ_2_BattleSystemCTB']&&BattleManager[_0x216ec3(0x31a)]()&&BattleManager['updateTurnOrderCTB']();Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager[_0x216ec3(0x2d6)]()&&(BattleManager['updateTurnOrderSTB'](),BattleManager[_0x216ec3(0x141)]=this,BattleManager[_0x216ec3(0x1a3)]=this);if(Imported[_0x216ec3(0x225)]&&BattleManager[_0x216ec3(0x1dc)]()){BattleManager[_0x216ec3(0x141)]=undefined,BattleManager['_currentActor']=this;const _0x5560b2=BattleManager[_0x216ec3(0x2a2)][_0x216ec3(0x258)](_0x1a0628);BattleManager[_0x216ec3(0x2a2)][_0x5560b2]=this,BattleManager[_0x216ec3(0x142)]();}Imported[_0x216ec3(0x244)]&&BattleManager[_0x216ec3(0x12f)]()&&(BattleManager[_0x216ec3(0x141)]=this,BattleManager['_currentActor']=this,BattleManager['replaceActionBattlersPartySwitch'](_0x1a0628,this));Imported[_0x216ec3(0x192)]&&BattleManager[_0x216ec3(0x242)]()&&(BattleManager[_0x216ec3(0x141)]=this,BattleManager[_0x216ec3(0x1a3)]=this,BattleManager[_0x216ec3(0x262)](_0x1a0628,this));Imported[_0x216ec3(0x173)]&&BattleManager[_0x216ec3(0x2a7)]()&&(BattleManager[_0x216ec3(0x141)]=this,BattleManager['_currentActor']=this,BattleManager['replaceActionBattlersPartySwitch'](_0x1a0628,this));if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager['isOTB']()){BattleManager[_0x216ec3(0x141)]=this,BattleManager[_0x216ec3(0x1a3)]=this;for(let _0x5b4e0a=0x0;_0x5b4e0a<BattleManager[_0x216ec3(0x2a2)][_0x216ec3(0x323)];_0x5b4e0a++){const _0x4dc38b=BattleManager['_actionBattlers'][_0x5b4e0a];_0x4dc38b===_0x1a0628&&(BattleManager['_actionBattlers'][_0x5b4e0a]=this);}for(let _0x452914=0x0;_0x452914<BattleManager[_0x216ec3(0x2fd)]['length'];_0x452914++){const _0x1c372b=BattleManager[_0x216ec3(0x2fd)][_0x452914];_0x1c372b===_0x1a0628&&(BattleManager[_0x216ec3(0x2fd)][_0x452914]=this);}}if(Imported['VisuMZ_2_BattleGridSystem']&&BattleManager['isUsingGridSystem']()){const _0x5c44d5=_0x1a0628[_0x216ec3(0x204)](),_0x375927=_0x1a0628['gridFlank']();this['gridMoveTo'](_0x5c44d5,_0x375927);}},BattleManager['replaceActionBattlersPartySwitch']=function(_0x3f29c6,_0x2da650){this['_actionBattlers']=this['_actionBattlers']['map'](_0x163d9b=>_0x163d9b===_0x3f29c6?_0x2da650:_0x163d9b);},VisuMZ[_0xee71c(0x2b6)]['Game_Unit_inBattle']=Game_Unit[_0xee71c(0x2ed)][_0xee71c(0x328)],Game_Unit['prototype']['inBattle']=function(){const _0x40ec1e=_0xee71c;if(SceneManager[_0x40ec1e(0x2c0)]())return![];return VisuMZ[_0x40ec1e(0x2b6)]['Game_Unit_inBattle'][_0x40ec1e(0x1fd)](this);},Game_Party[_0xee71c(0x207)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)]['General']['MaxBattleMembers'],VisuMZ['PartySystem'][_0xee71c(0x1c4)]=Game_Party['prototype'][_0xee71c(0x317)],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x317)]=function(){const _0x34a8b4=_0xee71c;VisuMZ[_0x34a8b4(0x2b6)][_0x34a8b4(0x1c4)]['call'](this),this[_0x34a8b4(0x235)](),this[_0x34a8b4(0x292)](),this[_0x34a8b4(0x2f9)]();},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x235)]=function(){const _0x5b821a=_0xee71c;this[_0x5b821a(0x1cd)]=0x0;},Game_Party['prototype'][_0xee71c(0x21f)]=function(){const _0x1df0fd=_0xee71c;if(this[_0x1df0fd(0x1cd)]===undefined)this[_0x1df0fd(0x235)]();return this[_0x1df0fd(0x1cd)]<=0x0;},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x322)]=function(){const _0x295436=_0xee71c;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x295436(0x235)]();return this[_0x295436(0x1cd)];},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x337)]=function(_0xeaf78){const _0x42fb21=_0xee71c;if(this[_0x42fb21(0x1cd)]===undefined)this[_0x42fb21(0x235)]();this[_0x42fb21(0x1cd)]=_0xeaf78;},Game_Party[_0xee71c(0x2ed)]['applyBattlePartySwitchCooldown']=function(){const _0x1d78c9=_0xee71c;if(this[_0x1d78c9(0x1cd)]===undefined)this[_0x1d78c9(0x235)]();this[_0x1d78c9(0x1cd)]=VisuMZ['PartySystem'][_0x1d78c9(0x21a)]['General']['PartyCmdCooldown']||0x0;},Game_Party['prototype'][_0xee71c(0x272)]=function(){const _0x21f9a8=_0xee71c;if(this[_0x21f9a8(0x1cd)]===undefined)this[_0x21f9a8(0x235)]();this[_0x21f9a8(0x1cd)]--;},Game_Party['prototype'][_0xee71c(0x292)]=function(){this['_battleMaxSize']=0x0;},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x1b7)]=function(_0x2de6c1){const _0x4b7adc=_0xee71c;this[_0x4b7adc(0x13f)]=_0x2de6c1,this['initBattleMembers'](!![]),$gamePlayer&&$gamePlayer[_0x4b7adc(0x2f0)]()&&$gamePlayer[_0x4b7adc(0x2f0)]()[_0x4b7adc(0x1b7)]();},Game_Followers[_0xee71c(0x2ed)][_0xee71c(0x1b7)]=function(){const _0x1e086a=_0xee71c;if(!SceneManager[_0x1e086a(0x2e9)]())return;this['setup']();const _0x44040d=$gameMap[_0x1e086a(0x1a7)](),_0x5ad1d7=$gamePlayer['x'],_0x3133a5=$gamePlayer['y'],_0x415022=$gamePlayer[_0x1e086a(0x130)]();$gameTemp[_0x1e086a(0x311)]=!![],$gamePlayer['reserveTransfer'](_0x44040d,_0x5ad1d7,_0x3133a5,_0x415022,0x2),setTimeout(this[_0x1e086a(0x319)][_0x1e086a(0x195)](this),0x7d0);},Game_Followers['prototype'][_0xee71c(0x319)]=function(){$gameTemp['_bypassAutoSavePartySystem']=![];},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x1d2)]=Scene_Base['prototype'][_0xee71c(0x1b4)],Scene_Base[_0xee71c(0x2ed)]['isAutosaveEnabled']=function(){const _0x3f8585=_0xee71c;if($gameTemp[_0x3f8585(0x311)])return![];return VisuMZ['PartySystem'][_0x3f8585(0x1d2)][_0x3f8585(0x1fd)](this);},Game_Party[_0xee71c(0x2ed)]['maxBattleMembers']=function(){const _0x116468=_0xee71c;if(this[_0x116468(0x13f)]===undefined)this[_0x116468(0x2f9)]();let _0x365c58=this[_0x116468(0x13f)]||Game_Party[_0x116468(0x207)];return Imported[_0x116468(0x30c)]&&BattleManager[_0x116468(0x134)]()&&(_0x365c58=_0x365c58[_0x116468(0x29c)](0x1,0x14)),_0x365c58;},Game_Party[_0xee71c(0x2ed)]['checkInitBattleMembers']=function(){const _0x51b5e8=_0xee71c;if(this[_0x51b5e8(0x13f)]===undefined)this[_0x51b5e8(0x2f9)]();if(!this['_battleMembers'])this[_0x51b5e8(0x2f9)]();while(this[_0x51b5e8(0x308)][_0x51b5e8(0x323)]<this[_0x51b5e8(0x13f)]){this['_battleMembers'][_0x51b5e8(0x156)](0x0);}},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x2f9)]=function(_0x4774a9){const _0x1464ad=_0xee71c;!_0x4774a9&&(this[_0x1464ad(0x13f)]=Game_Party[_0x1464ad(0x207)]);this[_0x1464ad(0x308)]=this[_0x1464ad(0x25d)][_0x1464ad(0x2b4)](0x0,this[_0x1464ad(0x13f)]);while(this[_0x1464ad(0x308)]['length']<this['_battleMaxSize']){this[_0x1464ad(0x308)][_0x1464ad(0x156)](0x0);}},Game_Party['prototype'][_0xee71c(0x143)]=function(){const _0x29e492=_0xee71c;if(Imported[_0x29e492(0x30c)]&&SceneManager[_0x29e492(0x15a)]())return this[_0x29e492(0x18c)](!![]);return this[_0x29e492(0x18c)]()[_0x29e492(0x1b2)](_0x36eccf=>!!_0x36eccf);},Game_Party['prototype'][_0xee71c(0x18c)]=function(_0x3d4047){const _0x49e07d=_0xee71c;this['checkInitBattleMembers']();const _0x2f9fea=this[_0x49e07d(0x308)]['map'](_0x493694=>$gameActors['actor'](_0x493694));if(_0x3d4047)return _0x2f9fea;return SceneManager['isSceneParty']()?_0x2f9fea:_0x2f9fea[_0x49e07d(0x1b2)](_0x5b112d=>_0x5b112d&&_0x5b112d[_0x49e07d(0x16a)]());},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x217)]=function(){const _0x4ae27a=_0xee71c,_0xfd79ca=this['battleMembers']();return this[_0x4ae27a(0x2c2)]()['filter'](_0x240dc3=>!_0xfd79ca[_0x4ae27a(0x30a)](_0x240dc3));},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x1d1)]=Game_Party['prototype']['setupStartingMembers'],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x2bb)]=function(){const _0x146465=_0xee71c;VisuMZ[_0x146465(0x2b6)][_0x146465(0x1d1)][_0x146465(0x1fd)](this),this[_0x146465(0x2f9)]();},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x126)]=Game_Party[_0xee71c(0x2ed)][_0xee71c(0x327)],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x327)]=function(){const _0x47b087=_0xee71c;VisuMZ[_0x47b087(0x2b6)][_0x47b087(0x126)][_0x47b087(0x1fd)](this),this['addNonBattleTestMembers']();},Game_Party['prototype'][_0xee71c(0x313)]=function(){const _0x17d443=_0xee71c;this['_battleMaxSize']=Game_Party[_0x17d443(0x207)],this[_0x17d443(0x308)]=[],this['_actors']=[];for(const _0x5f44b3 of $dataSystem[_0x17d443(0x2e3)]){const _0x4a4786=$gameActors[_0x17d443(0x271)](_0x5f44b3[_0x17d443(0x174)]);if(!_0x4a4786)continue;_0x4a4786[_0x17d443(0x1f0)](_0x5f44b3['level'],![]),_0x4a4786[_0x17d443(0x1d8)](_0x5f44b3[_0x17d443(0x31b)]),_0x4a4786['recoverAll'](),this[_0x17d443(0x308)][_0x17d443(0x156)](_0x5f44b3[_0x17d443(0x174)]),this[_0x17d443(0x25d)]['push'](_0x5f44b3[_0x17d443(0x174)]);}this[_0x17d443(0x308)][_0x17d443(0x19b)](0x0);while(this['_battleMembers'][_0x17d443(0x323)]<this[_0x17d443(0x13f)]){this[_0x17d443(0x308)][_0x17d443(0x156)](0x0);}while(this[_0x17d443(0x308)][_0x17d443(0x323)]>this[_0x17d443(0x1ad)]()){this[_0x17d443(0x308)][_0x17d443(0x2ba)]();}if($gamePlayer)$gamePlayer[_0x17d443(0x17f)]();},Game_Party['prototype'][_0xee71c(0x213)]=function(){const _0x974e43=_0xee71c,_0x4601ca=this['battleMembers']();for(let _0xef3e48=0x1;_0xef3e48<$dataActors[_0x974e43(0x323)];_0xef3e48++){const _0x42fb5f=$gameActors['actor'](_0xef3e48);if(!_0x42fb5f)continue;if(_0x42fb5f[_0x974e43(0x26a)]()['length']<=0x0)continue;if(_0x42fb5f[_0x974e43(0x26a)]()[_0x974e43(0x214)](/-----/i))continue;if(_0x4601ca[_0x974e43(0x30a)](_0x42fb5f))continue;this[_0x974e43(0x25d)][_0x974e43(0x156)](_0x42fb5f[_0x974e43(0x174)]());}},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x136)]=Game_Party[_0xee71c(0x2ed)]['addActor'],Game_Party['prototype']['addActor']=function(_0x2c7ea1){const _0x3da4c8=_0xee71c;VisuMZ[_0x3da4c8(0x2b6)][_0x3da4c8(0x136)][_0x3da4c8(0x1fd)](this,_0x2c7ea1),this[_0x3da4c8(0x1b5)](_0x2c7ea1),SceneManager[_0x3da4c8(0x2f6)]()&&(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager['isOTB']()&&(BattleManager[_0x3da4c8(0x2d4)](),BattleManager[_0x3da4c8(0x318)]($gameActors[_0x3da4c8(0x271)](_0x2c7ea1))));},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x1b5)]=function(_0x4da044){const _0x48d5cf=_0xee71c;this['checkInitBattleMembers']();if(this[_0x48d5cf(0x308)][_0x48d5cf(0x30a)](_0x4da044))return;if(!this[_0x48d5cf(0x25d)][_0x48d5cf(0x30a)](_0x4da044))return;if(!this['_battleMembers'][_0x48d5cf(0x30a)](0x0))return;const _0x4105b9=$gameActors[_0x48d5cf(0x271)](_0x4da044);if(!_0x4105b9)return;const _0x81f29c=this[_0x48d5cf(0x308)]['indexOf'](0x0);if(_0x81f29c<0x0)return;this[_0x48d5cf(0x308)][_0x81f29c]=_0x4da044,SceneManager[_0x48d5cf(0x2f6)]()&&(_0x4105b9[_0x48d5cf(0x164)](),_0x4105b9[_0x48d5cf(0x16c)]()),this['partyChangeRefresh']();},Game_Party[_0xee71c(0x2ed)]['addActorToBattleMembersAtIndex']=function(_0x306397,_0x25fe3f){const _0x2304b8=_0xee71c;this[_0x2304b8(0x275)]();if(this[_0x2304b8(0x308)][_0x2304b8(0x30a)](_0x306397))return;if(!this[_0x2304b8(0x308)][_0x2304b8(0x30a)](0x0))return;const _0x3fc86e=$gameActors[_0x2304b8(0x271)](_0x306397);if(!_0x3fc86e)return;this[_0x2304b8(0x308)][_0x25fe3f]=_0x306397,_0x3fc86e['makeActions'](),this[_0x2304b8(0x276)](),SceneManager[_0x2304b8(0x12e)](Scene_Battle)&&BattleManager['isTpb']()&&(_0x3fc86e['initTpbChargeTime'](),_0x3fc86e[_0x2304b8(0x1e4)]=_0x2304b8(0x1bc),_0x3fc86e[_0x2304b8(0x241)]=_0x2304b8(0x293),_0x3fc86e[_0x2304b8(0x25a)]=0x0);},VisuMZ[_0xee71c(0x2b6)]['Game_Party_removeActor']=Game_Party[_0xee71c(0x2ed)][_0xee71c(0x26c)],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x26c)]=function(_0x3b861f){const _0x2ac0b7=_0xee71c;this[_0x2ac0b7(0x1b6)](_0x3b861f),VisuMZ[_0x2ac0b7(0x2b6)]['Game_Party_removeActor'][_0x2ac0b7(0x1fd)](this,_0x3b861f);},Game_Party['prototype'][_0xee71c(0x1b6)]=function(_0x2bdcc5){const _0x31997f=_0xee71c;this[_0x31997f(0x275)]();if(!this[_0x31997f(0x308)][_0x31997f(0x30a)](_0x2bdcc5))return;if(_0x2bdcc5<=0x0)return;const _0x233d2b=this[_0x31997f(0x308)][_0x31997f(0x258)](_0x2bdcc5);this[_0x31997f(0x308)][_0x233d2b]=0x0,this[_0x31997f(0x25d)][_0x31997f(0x19b)](_0x2bdcc5),this[_0x31997f(0x25d)]['push'](_0x2bdcc5),this['partyChangeRefresh']();},Game_Party['prototype'][_0xee71c(0x276)]=function(){const _0x199531=_0xee71c;this[_0x199531(0x1aa)](),$gamePlayer['refresh'](),$gameMap[_0x199531(0x2f8)]();},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x1aa)]=function(){const _0x1e4277=_0xee71c;this['checkInitBattleMembers']();const _0x16156c=this[_0x1e4277(0x143)]()[_0x1e4277(0x2ee)](this['reserveMembers']());this[_0x1e4277(0x25d)]=_0x16156c[_0x1e4277(0x332)](_0x57aee6=>_0x57aee6?_0x57aee6[_0x1e4277(0x174)]():0x0)[_0x1e4277(0x19b)](0x0);},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x1ef)]=function(){const _0x1a58e3=_0xee71c;this[_0x1a58e3(0x25d)][_0x1a58e3(0x321)]((_0x4b2ca1,_0x293965)=>_0x4b2ca1-_0x293965),this['rearrangePartyActors'](),this[_0x1a58e3(0x276)]();},Game_Party[_0xee71c(0x2ed)]['anyRequiredPartyMembersInReserve']=function(){const _0x4c0512=_0xee71c;for(const _0x3f075d of this[_0x4c0512(0x217)]()){if(!_0x3f075d)continue;if(_0x3f075d[_0x4c0512(0x135)]())return!![];}return![];},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x1a2)]=Game_Party[_0xee71c(0x2ed)][_0xee71c(0x1e1)],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x1e1)]=function(_0x750907,_0x1d4882){const _0x25341c=_0xee71c,_0x57a519=this[_0x25341c(0x143)]()[_0x25341c(0x19b)](null)[_0x25341c(0x19b)](undefined)['length'];VisuMZ[_0x25341c(0x2b6)][_0x25341c(0x1a2)]['call'](this,_0x750907,_0x1d4882),this[_0x25341c(0x2df)](_0x750907,_0x1d4882,_0x57a519);},Game_Party['prototype'][_0xee71c(0x2df)]=function(_0x434f08,_0x476be7,_0x1eb520){const _0x20bc63=_0xee71c;this[_0x20bc63(0x308)]=[];for(let _0x5d88ff=0x0;_0x5d88ff<this['_actors'][_0x20bc63(0x323)];_0x5d88ff++){if(this[_0x20bc63(0x308)][_0x20bc63(0x323)]>=this[_0x20bc63(0x1ad)]())break;if(SceneManager[_0x20bc63(0x240)][_0x20bc63(0x185)]&&SceneManager[_0x20bc63(0x240)][_0x20bc63(0x185)]()){if(this['_battleMembers'][_0x20bc63(0x323)]>=_0x1eb520)break;}this[_0x20bc63(0x308)][_0x5d88ff]=this[_0x20bc63(0x25d)][_0x5d88ff];}$gamePlayer[_0x20bc63(0x17f)]();},Scene_MenuBase[_0xee71c(0x2ed)]['allowEarlySwapOrderBreak']=function(){const _0x1a0133=_0xee71c;if(this[_0x1a0133(0x1bf)]['name']==='Scene_BattleGridTactics')return!![];return![];},Game_Party['prototype'][_0xee71c(0x2d8)]=function(_0x386451){const _0x89391a=_0xee71c;if(this[_0x89391a(0x328)]())return;if(!_0x386451)return;if(_0x386451[_0x89391a(0x323)]<=0x0)return;this[_0x89391a(0x12b)]=_0x386451[_0x89391a(0x30e)](),this['_forcedPartyActors']=this['_forcedPartyActors'][_0x89391a(0x1b2)](_0x1f2103=>!!$gameActors[_0x89391a(0x271)](_0x1f2103));while(this[_0x89391a(0x12b)][_0x89391a(0x323)]>this[_0x89391a(0x1ad)]()){this[_0x89391a(0x12b)]['pop']();}$gamePlayer[_0x89391a(0x17f)](),$gameMap[_0x89391a(0x2f8)]();},Game_Party[_0xee71c(0x2ed)][_0xee71c(0x306)]=function(){const _0x3b5bcb=_0xee71c;if(this[_0x3b5bcb(0x328)]())return;this[_0x3b5bcb(0x12b)]=undefined,$gamePlayer[_0x3b5bcb(0x17f)](),$gameMap[_0x3b5bcb(0x2f8)]();},VisuMZ['PartySystem'][_0xee71c(0x186)]=Game_Party['prototype'][_0xee71c(0x2c2)],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x2c2)]=function(){const _0x40b971=_0xee71c;if(this[_0x40b971(0x12b)]!==undefined)return this[_0x40b971(0x12b)]['map'](_0x3ce5a1=>$gameActors[_0x40b971(0x271)](_0x3ce5a1));return VisuMZ[_0x40b971(0x2b6)]['Game_Party_allMembers_FP'][_0x40b971(0x1fd)](this);},VisuMZ[_0xee71c(0x2b6)]['Game_Party_rawBattleMembers_FP']=Game_Party[_0xee71c(0x2ed)]['rawBattleMembers'],Game_Party['prototype'][_0xee71c(0x18c)]=function(_0x476132){const _0x1d99f=_0xee71c;if(this[_0x1d99f(0x12b)]!==undefined)return this['_forcedPartyActors'][_0x1d99f(0x332)](_0x3a621d=>$gameActors[_0x1d99f(0x271)](_0x3a621d));return VisuMZ[_0x1d99f(0x2b6)][_0x1d99f(0x2bd)]['call'](this,_0x476132);},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x161)]=Game_Party[_0xee71c(0x2ed)][_0xee71c(0x217)],Game_Party[_0xee71c(0x2ed)][_0xee71c(0x217)]=function(){const _0x58e38c=_0xee71c;if(this[_0x58e38c(0x12b)]!==undefined)return[];return VisuMZ[_0x58e38c(0x2b6)]['Game_Party_reserveMembers_FP']['call'](this);},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x298)]=Game_System[_0xee71c(0x2ed)][_0xee71c(0x128)],Game_System['prototype'][_0xee71c(0x128)]=function(){const _0x27e394=_0xee71c;if($gameParty[_0x27e394(0x12b)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x27e394(0x2b6)][_0x27e394(0x298)][_0x27e394(0x1fd)](this);},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x27d)]=Game_Actor[_0xee71c(0x2ed)]['canSwitchPartyInBattle'],Game_Actor[_0xee71c(0x2ed)]['canSwitchPartyInBattle']=function(){const _0xab0042=_0xee71c;if($gameParty[_0xab0042(0x12b)]!==undefined)return![];if($gameParty[_0xab0042(0x15f)]!==undefined)return![];return VisuMZ[_0xab0042(0x2b6)][_0xab0042(0x27d)][_0xab0042(0x1fd)](this);},VisuMZ['PartySystem']['Game_Party_canSwitchPartyInBattle_FP']=Game_Party[_0xee71c(0x2ed)]['canSwitchPartyInBattle'],Game_Party['prototype'][_0xee71c(0x21f)]=function(){const _0x265d5d=_0xee71c;if($gameParty['_forcedPartyActors']!==undefined)return![];if($gameParty[_0x265d5d(0x15f)]!==undefined)return![];return VisuMZ['PartySystem'][_0x265d5d(0x2dc)][_0x265d5d(0x1fd)](this);},VisuMZ['PartySystem'][_0xee71c(0x2cb)]=Game_Troop['prototype'][_0xee71c(0x14e)],Game_Troop[_0xee71c(0x2ed)][_0xee71c(0x14e)]=function(){const _0x4f2416=_0xee71c;VisuMZ[_0x4f2416(0x2b6)]['Game_Troop_increaseTurn'][_0x4f2416(0x1fd)](this),$gameParty[_0x4f2416(0x272)]();},Scene_Menu[_0xee71c(0x2ed)][_0xee71c(0x338)]=function(){const _0x4e58e6=_0xee71c;SceneManager[_0x4e58e6(0x156)](Scene_Party);};function Scene_Party(){const _0x180522=_0xee71c;this[_0x180522(0x317)](...arguments);}Scene_Party[_0xee71c(0x2ed)]=Object[_0xee71c(0x177)](Scene_MenuBase['prototype']),Scene_Party[_0xee71c(0x2ed)]['constructor']=Scene_Party,Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x317)]=function(){const _0x23a262=_0xee71c;this[_0x23a262(0x193)](),Scene_MenuBase[_0x23a262(0x2ed)][_0x23a262(0x317)][_0x23a262(0x1fd)](this);},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x15b)]=function(){const _0x3bcddd=_0xee71c;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x3bcddd(0x27e)]!==undefined)return ConfigManager['uiInputPosition'];else return ConfigManager[_0x3bcddd(0x294)]===![]?![]:Scene_MenuBase['prototype'][_0x3bcddd(0x15b)]['call'](this);},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x1fa)]=function(){return 0x0;},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x140)]=function(){return!![];},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x1ab)]=function(){const _0x27601c=_0xee71c;Scene_MenuBase[_0x27601c(0x2ed)][_0x27601c(0x1ab)][_0x27601c(0x1fd)](this),this[_0x27601c(0x330)][_0x27601c(0x232)]=undefined,this['_pagedownButton'][_0x27601c(0x232)]=undefined;},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x193)]=function(){const _0x5658a0=_0xee71c;for(const _0x2bd35b of $gameParty[_0x5658a0(0x132)]()){ImageManager[_0x5658a0(0x18f)](_0x2bd35b[_0x5658a0(0x15c)]()),ImageManager['loadCharacter'](_0x2bd35b['characterName']()),ImageManager[_0x5658a0(0x2a1)](_0x2bd35b[_0x5658a0(0x14b)]());}},Scene_Party[_0xee71c(0x2ed)]['create']=function(){const _0x5312f6=_0xee71c;Scene_MenuBase[_0x5312f6(0x2ed)][_0x5312f6(0x177)][_0x5312f6(0x1fd)](this),this['createActivePartyLabel'](),this[_0x5312f6(0x2e7)](),this[_0x5312f6(0x14a)](),this[_0x5312f6(0x23c)](),this[_0x5312f6(0x1ac)](),this[_0x5312f6(0x26e)]();},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x2c9)]=function(){const _0x49b57f=_0xee71c,_0x2f45fa=this[_0x49b57f(0x300)]();this[_0x49b57f(0x28b)]=new Window_PartyLabel(_0x2f45fa,TextManager['activeParty']),this[_0x49b57f(0x28b)]['setBackgroundType'](VisuMZ[_0x49b57f(0x2b6)]['Settings'][_0x49b57f(0x1d6)][_0x49b57f(0x17d)]),this[_0x49b57f(0x301)](this[_0x49b57f(0x28b)]);},Scene_Party['prototype'][_0xee71c(0x300)]=function(){const _0x482093=_0xee71c;return VisuMZ['PartySystem'][_0x482093(0x21a)][_0x482093(0x1d6)]['ActivePartyLabelRect'][_0x482093(0x1fd)](this);},Scene_Party['prototype'][_0xee71c(0x2e7)]=function(){const _0x445425=_0xee71c,_0x415e19=this[_0x445425(0x198)]();this[_0x445425(0x14f)]=new Window_PartyActive(_0x415e19),this[_0x445425(0x14f)]['setBackgroundType'](VisuMZ[_0x445425(0x2b6)][_0x445425(0x21a)][_0x445425(0x1d6)]['ActivePartyWindowBgType']),this[_0x445425(0x14f)][_0x445425(0x224)]('ok',this[_0x445425(0x2b1)][_0x445425(0x195)](this)),this[_0x445425(0x14f)][_0x445425(0x224)](_0x445425(0x19d),this[_0x445425(0x144)][_0x445425(0x195)](this)),this[_0x445425(0x301)](this[_0x445425(0x14f)]);},Scene_Party[_0xee71c(0x2ed)]['activePartyWindowRect']=function(){const _0x152c29=_0xee71c;return VisuMZ['PartySystem'][_0x152c29(0x21a)][_0x152c29(0x1d6)]['ActivePartyWindowRect'][_0x152c29(0x1fd)](this);},Scene_Party['prototype'][_0xee71c(0x2b1)]=function(){const _0x2fcdc3=_0xee71c;this[_0x2fcdc3(0x2f1)][_0x2fcdc3(0x20c)](),this[_0x2fcdc3(0x2f1)][_0x2fcdc3(0x205)]();},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x14a)]=function(){const _0x1ef26a=_0xee71c,_0x1caa50=this[_0x1ef26a(0x2bc)]();this[_0x1ef26a(0x1e6)]=new Window_PartyLabel(_0x1caa50,TextManager['reserveParty']),this['_reservePartyLabel'][_0x1ef26a(0x1ce)](VisuMZ['PartySystem'][_0x1ef26a(0x21a)][_0x1ef26a(0x1d6)]['ReservePartyLabelBgType']),this['addWindow'](this[_0x1ef26a(0x1e6)]);},Scene_Party['prototype'][_0xee71c(0x2bc)]=function(){const _0x40db2f=_0xee71c;return VisuMZ[_0x40db2f(0x2b6)][_0x40db2f(0x21a)][_0x40db2f(0x1d6)][_0x40db2f(0x287)][_0x40db2f(0x1fd)](this);},Scene_Party[_0xee71c(0x2ed)]['createReservePartyWindow']=function(){const _0x23a42a=_0xee71c,_0x31b87d=this['reservePartyWindowRect']();this['_reservePartyWindow']=new Window_PartyReserve(_0x31b87d),this[_0x23a42a(0x2f1)][_0x23a42a(0x1ce)](VisuMZ[_0x23a42a(0x2b6)][_0x23a42a(0x21a)][_0x23a42a(0x1d6)]['ReservePartyWindowBgType']),this[_0x23a42a(0x2f1)][_0x23a42a(0x224)]('ok',this[_0x23a42a(0x22a)][_0x23a42a(0x195)](this)),this['_reservePartyWindow'][_0x23a42a(0x224)](_0x23a42a(0x19d),this[_0x23a42a(0x259)][_0x23a42a(0x195)](this)),this[_0x23a42a(0x301)](this['_reservePartyWindow']);},Scene_Party[_0xee71c(0x2ed)]['reservePartyWindowRect']=function(){const _0xa42664=_0xee71c;return VisuMZ[_0xa42664(0x2b6)][_0xa42664(0x21a)][_0xa42664(0x1d6)][_0xa42664(0x176)][_0xa42664(0x1fd)](this);},Scene_Party[_0xee71c(0x2ed)]['onReserveOk']=function(){const _0x1056f6=_0xee71c,_0x152041=this[_0x1056f6(0x2f1)][_0x1056f6(0x28e)](),_0x1322cb=this['_activePartyWindow'][_0x1056f6(0x2c8)]();if(_0x152041<0x0){if(_0x1322cb)$gameParty['removeActorFromBattleMembers'](_0x1322cb[_0x1056f6(0x174)]());}else{const _0x3613ed=this[_0x1056f6(0x2f1)][_0x1056f6(0x2c8)]()[_0x1056f6(0x174)](),_0x5b7048=this[_0x1056f6(0x14f)][_0x1056f6(0x29d)]();if(_0x1322cb)$gameParty[_0x1056f6(0x1b6)](_0x1322cb[_0x1056f6(0x174)]());$gameParty['addActorToBattleMembersAtIndex'](_0x3613ed,_0x5b7048);}this[_0x1056f6(0x223)](),this[_0x1056f6(0x259)]();},Scene_Party[_0xee71c(0x2ed)]['refreshAllWindows']=function(){const _0x54da21=_0xee71c;this[_0x54da21(0x14f)]['refresh'](),this[_0x54da21(0x2f1)][_0x54da21(0x17f)]();},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x259)]=function(){const _0xdb228d=_0xee71c;this[_0xdb228d(0x2f1)][_0xdb228d(0x2d2)](),this[_0xdb228d(0x2f1)][_0xdb228d(0x19a)](),this[_0xdb228d(0x14f)][_0xdb228d(0x20c)]();},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x1ac)]=function(){const _0x58e01a=_0xee71c,_0x15bfef=this[_0x58e01a(0x1cf)]();this[_0x58e01a(0x21c)]=new Window_PartyLabel(_0x15bfef,TextManager[_0x58e01a(0x2f4)]),this[_0x58e01a(0x21c)][_0x58e01a(0x1ce)](VisuMZ['PartySystem'][_0x58e01a(0x21a)]['Window'][_0x58e01a(0x316)]),this['addWindow'](this['_statusPartyLabel']);},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x1cf)]=function(){const _0x30b386=_0xee71c;return VisuMZ[_0x30b386(0x2b6)][_0x30b386(0x21a)][_0x30b386(0x1d6)]['StatusLabelRect'][_0x30b386(0x1fd)](this);},Scene_Party[_0xee71c(0x2ed)]['createStatusWindow']=function(){const _0x1fa024=_0xee71c,_0x1d3d18=this[_0x1fa024(0x284)]();this[_0x1fa024(0x13b)]=new Window_PartyStatus(_0x1d3d18),this[_0x1fa024(0x13b)]['setBackgroundType'](VisuMZ[_0x1fa024(0x2b6)]['Settings']['Window'][_0x1fa024(0x1f2)]),this['addWindow'](this[_0x1fa024(0x13b)]),this[_0x1fa024(0x2f1)][_0x1fa024(0x2e5)](this['_statusPartyWindow']),this[_0x1fa024(0x14f)][_0x1fa024(0x2e5)](this[_0x1fa024(0x13b)]);},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x284)]=function(){const _0x309fe8=_0xee71c;return VisuMZ[_0x309fe8(0x2b6)]['Settings'][_0x309fe8(0x1d6)][_0x309fe8(0x255)]['call'](this);},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x1c1)]=function(){const _0x54998c=_0xee71c;return TextManager[_0x54998c(0x162)](_0x54998c(0x2ec));},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x17c)]=function(){const _0x4428cc=_0xee71c;return TextManager[_0x4428cc(0x29b)];},Scene_Party['prototype'][_0xee71c(0x1e3)]=function(){const _0x791660=_0xee71c,_0x4e2774=this['_activePartyWindow'],_0x4637a2=this['_reservePartyWindow'];if(_0x4e2774&&_0x4e2774[_0x791660(0x1ed)]&&_0x4e2774[_0x791660(0x2c8)]()&&_0x4e2774[_0x791660(0x19f)]())return TextManager['assistRemovePartyMember'];else return _0x4637a2&&_0x4637a2[_0x791660(0x1ed)]&&$gameParty[_0x791660(0x217)]()[_0x791660(0x323)]>0x0?TextManager[_0x791660(0x208)]:'';},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x339)]=function(){const _0xbecae9=_0xee71c;if(this[_0xbecae9(0x14f)]&&this[_0xbecae9(0x14f)]['active'])return TextManager[_0xbecae9(0x2d9)];else return this[_0xbecae9(0x2f1)]&&this[_0xbecae9(0x2f1)][_0xbecae9(0x1ed)]?TextManager[_0xbecae9(0x29e)]:Scene_MenuBase[_0xbecae9(0x2ed)][_0xbecae9(0x339)][_0xbecae9(0x1fd)](this);},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x18a)]=function(){const _0x11b5f2=_0xee71c;Scene_MenuBase[_0x11b5f2(0x2ed)][_0x11b5f2(0x18a)][_0x11b5f2(0x1fd)](this),this['setBackgroundOpacity'](this[_0x11b5f2(0x27b)]()),this[_0x11b5f2(0x23e)]();},Scene_Party['prototype'][_0xee71c(0x27b)]=function(){const _0x475d5c=_0xee71c;return VisuMZ['PartySystem']['Settings'][_0x475d5c(0x1dd)][_0x475d5c(0x2a5)];},Scene_Party[_0xee71c(0x2ed)]['createCustomBackgroundImages']=function(){const _0xef62c1=_0xee71c,_0x3a2ba0={'BgFilename1':VisuMZ[_0xef62c1(0x2b6)]['Settings'][_0xef62c1(0x1dd)][_0xef62c1(0x2be)],'BgFilename2':VisuMZ[_0xef62c1(0x2b6)][_0xef62c1(0x21a)][_0xef62c1(0x1dd)][_0xef62c1(0x163)]};_0x3a2ba0&&(_0x3a2ba0[_0xef62c1(0x2be)]!==''||_0x3a2ba0['BgFilename2']!=='')&&(this[_0xef62c1(0x295)]=new Sprite(ImageManager[_0xef62c1(0x226)](_0x3a2ba0['BgFilename1'])),this[_0xef62c1(0x1f5)]=new Sprite(ImageManager[_0xef62c1(0x21d)](_0x3a2ba0['BgFilename2'])),this[_0xef62c1(0x2a4)](this[_0xef62c1(0x295)]),this[_0xef62c1(0x2a4)](this[_0xef62c1(0x1f5)]),this[_0xef62c1(0x295)]['bitmap'][_0xef62c1(0x269)](this[_0xef62c1(0x133)][_0xef62c1(0x195)](this,this[_0xef62c1(0x295)])),this[_0xef62c1(0x1f5)][_0xef62c1(0x285)]['addLoadListener'](this[_0xef62c1(0x133)]['bind'](this,this[_0xef62c1(0x1f5)])));},Scene_Party[_0xee71c(0x2ed)][_0xee71c(0x133)]=function(_0x1c3934){const _0x431e2b=_0xee71c;this[_0x431e2b(0x194)](_0x1c3934),this[_0x431e2b(0x32e)](_0x1c3934);},Scene_Party['prototype'][_0xee71c(0x261)]=function(){const _0x458bcf=_0xee71c;Scene_MenuBase[_0x458bcf(0x2ed)][_0x458bcf(0x261)][_0x458bcf(0x1fd)](this),$gameParty['partyChangeRefresh']();},Window_StatusBase[_0xee71c(0x2ed)][_0xee71c(0x2aa)]=function(_0x26bded,_0x1a80f3,_0x1dac61,_0x214428){const _0x2ec36a=_0xee71c;if(!_0x26bded)return;_0x214428?this[_0x2ec36a(0x1c8)](_0x26bded,_0x1a80f3,_0x1dac61):this[_0x2ec36a(0x210)](_0x26bded,_0x1a80f3,_0x1dac61);},Window_StatusBase[_0xee71c(0x2ed)][_0xee71c(0x210)]=function(_0x3f2273,_0x5a0ab3,_0x431c51){const _0x3d8278=_0xee71c;_0x431c51+=Math[_0x3d8278(0x2b3)]((this[_0x3d8278(0x18e)]()-ImageManager[_0x3d8278(0x2f2)])/0x2),!_0x3f2273[_0x3d8278(0x22c)]()&&(this[_0x3d8278(0x257)](ImageManager[_0x3d8278(0x320)],_0x5a0ab3,_0x431c51),_0x5a0ab3+=ImageManager['iconWidth']+0x4),_0x3f2273[_0x3d8278(0x135)]()&&(this[_0x3d8278(0x257)](ImageManager[_0x3d8278(0x157)],_0x5a0ab3,_0x431c51),_0x5a0ab3+=ImageManager[_0x3d8278(0x12d)]+0x4);},Window_StatusBase[_0xee71c(0x2ed)][_0xee71c(0x1c8)]=function(_0x4048af,_0x5501e8,_0xfcc235){const _0x105ade=_0xee71c;let _0x278a55=0x0;if(!_0x4048af[_0x105ade(0x22c)]())_0x278a55+=0x1;if(_0x4048af[_0x105ade(0x135)]())_0x278a55+=0x1;if(_0x278a55<=0x1)return this['drawActorPartyIconsHorz'](_0x4048af,_0x5501e8,_0xfcc235);_0xfcc235+=Math['round']((this['lineHeight']()-ImageManager[_0x105ade(0x2f2)])/0x2),_0xfcc235-=Math[_0x105ade(0x2b3)](this['lineHeight']()/0x2),this[_0x105ade(0x257)](ImageManager[_0x105ade(0x320)],_0x5501e8,_0xfcc235),_0xfcc235+=this[_0x105ade(0x18e)](),this[_0x105ade(0x257)](ImageManager[_0x105ade(0x157)],_0x5501e8,_0xfcc235);};function Window_PartyLabel(){this['initialize'](...arguments);}Window_PartyLabel[_0xee71c(0x2ed)]=Object[_0xee71c(0x177)](Window_Base[_0xee71c(0x2ed)]),Window_PartyLabel[_0xee71c(0x2ed)][_0xee71c(0x1bf)]=Window_PartyLabel,Window_PartyLabel['prototype'][_0xee71c(0x317)]=function(_0x49c184,_0x25dc8b){const _0xafb7d4=_0xee71c;Window_Base[_0xafb7d4(0x2ed)][_0xafb7d4(0x317)]['call'](this,_0x49c184),this[_0xafb7d4(0x15e)](_0x25dc8b);},Window_PartyLabel[_0xee71c(0x2ed)][_0xee71c(0x1be)]=function(){const _0x409bf8=_0xee71c;this[_0x409bf8(0x181)]=0x0;},Window_PartyLabel[_0xee71c(0x2ed)]['setText']=function(_0x108ece){const _0x524711=_0xee71c;this[_0x524711(0x236)][_0x524711(0x1f8)](),this[_0x524711(0x26f)](_0x108ece,0x0,0x0,this[_0x524711(0x2de)],'center');};function Window_PartyActive(){const _0x329530=_0xee71c;this[_0x329530(0x317)](...arguments);}Window_PartyActive[_0xee71c(0x2ed)]=Object[_0xee71c(0x177)](Window_StatusBase[_0xee71c(0x2ed)]),Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x1bf)]=Window_PartyActive,Window_PartyActive[_0xee71c(0x2e0)]=VisuMZ['PartySystem'][_0xee71c(0x21a)][_0xee71c(0x1d6)][_0xee71c(0x281)],Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x317)]=function(_0x4a2551){const _0x5db9dd=_0xee71c;Window_StatusBase[_0x5db9dd(0x2ed)][_0x5db9dd(0x317)][_0x5db9dd(0x1fd)](this,_0x4a2551),this['refresh'](),this[_0x5db9dd(0x20c)](),this[_0x5db9dd(0x1a4)](0x0);},Window_PartyActive['prototype'][_0xee71c(0x2cc)]=function(){const _0x21f997=_0xee71c;return VisuMZ['PartySystem']['Settings'][_0x21f997(0x2da)]['AddRemoveCmd'];},Window_PartyActive[_0xee71c(0x2ed)]['maxItems']=function(){const _0x336c0e=_0xee71c;return $gameParty[_0x336c0e(0x1ad)]();},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x212)]=function(){return $gameParty['maxBattleMembers']();},Window_PartyActive[_0xee71c(0x2ed)]['itemHeight']=function(){const _0x5f562a=_0xee71c;return this[_0x5f562a(0x13a)];},Window_PartyActive[_0xee71c(0x2ed)]['actor']=function(_0x38c575){return $gameParty['rawBattleMembers']()[_0x38c575];},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x2c8)]=function(){const _0x383ec1=_0xee71c;return this[_0x383ec1(0x271)](this[_0x383ec1(0x29d)]());},Window_PartyActive[_0xee71c(0x2ed)]['isCurrentItemEnabled']=function(){const _0x3cbea6=this['actor'](this['index']());return _0x3cbea6?_0x3cbea6['isFormationChangeOk']():!![];},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x334)]=function(){const _0x87f7dd=_0xee71c;if($gameParty[_0x87f7dd(0x132)]()[_0x87f7dd(0x323)]<=0x0)return!![];if($gameParty['anyRequiredPartyMembersInReserve']())return![];return $gameParty[_0x87f7dd(0x143)]()[_0x87f7dd(0x323)]>0x0;},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x23a)]=function(){const _0x3e2fd8=_0xee71c;Window_StatusBase['prototype'][_0x3e2fd8(0x23a)]['call'](this),this[_0x3e2fd8(0x238)]();},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x202)]=function(_0x373514){this['isOkEnabled']()&&this['processOk']();},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x22b)]=function(){const _0x55345e=_0xee71c,_0x4cc862=this[_0x55345e(0x29d)](),_0x45f663=_0x4cc862+0x1>=this['maxItems']()?0x0:_0x4cc862+0x1;this[_0x55345e(0x1eb)](_0x4cc862,_0x45f663);},Window_PartyActive[_0xee71c(0x2ed)]['cursorPageup']=function(){const _0x2c952d=_0xee71c,_0x13ab1c=this[_0x2c952d(0x29d)](),_0x37351c=_0x13ab1c-0x1<0x0?this['maxItems']()-0x1:_0x13ab1c-0x1;this[_0x2c952d(0x1eb)](_0x13ab1c,_0x37351c);},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x1eb)]=function(_0x2ec660,_0x3ec1b8){const _0x34610e=_0xee71c,_0x29a759=this['actor'](_0x2ec660),_0xc0f9c5=this[_0x34610e(0x271)](_0x3ec1b8);if(_0x29a759&&!_0x29a759[_0x34610e(0x22c)]())return;if(_0xc0f9c5&&!_0xc0f9c5[_0x34610e(0x22c)]())return;const _0x10e90b=$gameParty[_0x34610e(0x308)];_0x10e90b[_0x2ec660]=_0xc0f9c5?_0xc0f9c5[_0x34610e(0x174)]():0x0,_0x10e90b[_0x3ec1b8]=_0x29a759?_0x29a759['actorId']():0x0,this['refresh'](),this[_0x34610e(0x290)](),this[_0x34610e(0x1a4)](_0x3ec1b8);},Window_PartyActive[_0xee71c(0x2ed)]['checkShiftRemoveShortcut']=function(){const _0x1e5cf2=_0xee71c;if(!this[_0x1e5cf2(0x19f)]())return;if(Input[_0x1e5cf2(0x263)](_0x1e5cf2(0x2ec))){const _0x415fe9=this[_0x1e5cf2(0x2c8)]();this[_0x1e5cf2(0x209)]();}},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x209)]=function(){const _0x42687d=_0xee71c;SoundManager[_0x42687d(0x2e8)]();const _0x3a1012=this[_0x42687d(0x2c8)]();$gameParty['removeActorFromBattleMembers'](_0x3a1012[_0x42687d(0x174)]()),this[_0x42687d(0x2ae)](),SceneManager[_0x42687d(0x240)]['refreshAllWindows']();},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x19f)]=function(){const _0x326f33=_0xee71c;if(!this[_0x326f33(0x2cc)]())return![];const _0x287685=this[_0x326f33(0x2c8)]();return this[_0x326f33(0x1ed)]&&_0x287685&&_0x287685[_0x326f33(0x22c)]();},Window_PartyActive['prototype']['drawItem']=function(_0x433215){const _0xa1133=_0xee71c,_0x2e30fb=this['actor'](_0x433215);if(!_0x2e30fb)return this[_0xa1133(0x2fa)](_0x433215);this[_0xa1133(0x2fc)]();const _0x2e9692=this[_0xa1133(0x289)](_0x433215);this[_0xa1133(0x1a8)](_0x433215);const _0x3c81ef=_0x2e9692['y']+_0x2e9692[_0xa1133(0x268)]-this[_0xa1133(0x18e)]();this[_0xa1133(0x27c)](_0x2e9692['x'],_0x3c81ef,_0x2e9692[_0xa1133(0x1c2)],0x2),this[_0xa1133(0x2aa)](_0x2e30fb,_0x2e9692['x']+0x2,_0x2e9692['y']),this[_0xa1133(0x150)](_0x2e30fb,_0x2e9692['x'],_0x3c81ef,_0x2e9692[_0xa1133(0x1c2)]);},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x2fa)]=function(_0x34b9e6){const _0x12c0b8=_0xee71c;this[_0x12c0b8(0x2fc)]();const _0x59d26f=this[_0x12c0b8(0x289)](_0x34b9e6);this['drawItemDarkRect'](_0x59d26f['x'],_0x59d26f['y'],_0x59d26f[_0x12c0b8(0x1c2)],_0x59d26f[_0x12c0b8(0x268)]);const _0x25937b=_0x59d26f['y']+Math[_0x12c0b8(0x2b3)]((_0x59d26f['height']-this['lineHeight']())/0x2);this[_0x12c0b8(0x184)](ColorManager[_0x12c0b8(0x2b0)]()),this['drawText'](TextManager[_0x12c0b8(0x28c)],_0x59d26f['x'],_0x25937b,_0x59d26f['width'],_0x12c0b8(0x254));},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x27a)]=function(_0x334c57,_0x4c1685,_0x22799e,_0x50dd8e,_0x3e9f40){const _0x23cdc5=_0xee71c;_0x3e9f40=Math[_0x23cdc5(0x248)](_0x3e9f40||0x1,0x1);while(_0x3e9f40--){_0x50dd8e=_0x50dd8e||this[_0x23cdc5(0x18e)](),this[_0x23cdc5(0x236)][_0x23cdc5(0x21e)]=0xa0;const _0x3a4d5a=ColorManager[_0x23cdc5(0x277)]();this[_0x23cdc5(0x236)][_0x23cdc5(0x1de)](_0x334c57+0x1,_0x4c1685+0x1,_0x22799e-0x2,_0x50dd8e-0x2,_0x3a4d5a),this[_0x23cdc5(0x236)][_0x23cdc5(0x21e)]=0xff;}},Window_PartyActive[_0xee71c(0x2ed)]['drawItemImage']=function(_0x59f492){const _0x14c7f2=_0xee71c;switch(Window_PartyActive[_0x14c7f2(0x2e0)][_0x14c7f2(0x234)]()['trim']()){case _0x14c7f2(0x264):this[_0x14c7f2(0x2b9)](_0x59f492);break;case'sprite':this['drawItemImageSprite'](_0x59f492);break;case _0x14c7f2(0x2dd):Imported[_0x14c7f2(0x151)]&&this[_0x14c7f2(0x2c5)](_0x59f492);break;};},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x2b9)]=function(_0x20c8ec){const _0x3abb1a=_0xee71c,_0x277a20=this[_0x3abb1a(0x271)](_0x20c8ec),_0x5b81dc=this[_0x3abb1a(0x289)](_0x20c8ec),_0x5df5f2=Math[_0x3abb1a(0x32f)](ImageManager['faceWidth'],_0x5b81dc[_0x3abb1a(0x1c2)]-0x2),_0x1cdb96=_0x5b81dc['height']-0x2;this[_0x3abb1a(0x305)](_0x277a20[_0x3abb1a(0x22c)]());const _0x326cfc=Math[_0x3abb1a(0x2b3)](_0x5b81dc['x']+(_0x5b81dc[_0x3abb1a(0x1c2)]-_0x5df5f2)/0x2);this[_0x3abb1a(0x2ea)](_0x277a20,_0x326cfc,_0x5b81dc['y']+0x1,_0x5df5f2,_0x1cdb96),this[_0x3abb1a(0x305)](!![]);},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x333)]=function(_0x4edc33){const _0x328380=_0xee71c,_0x325675=this[_0x328380(0x271)](_0x4edc33),_0x401178=this[_0x328380(0x289)](_0x4edc33),_0x5cf5e9=VisuMZ[_0x328380(0x2b6)][_0x328380(0x21a)]['Window'],_0x5468c7=_0x401178['x']+Math[_0x328380(0x2b3)](_0x401178[_0x328380(0x1c2)]/0x2)+_0x5cf5e9[_0x328380(0x1f1)],_0x1b78c4=_0x401178['y']+_0x401178[_0x328380(0x268)]-this[_0x328380(0x18e)]()-_0x5cf5e9[_0x328380(0x2c1)];this[_0x328380(0x153)](_0x325675,_0x5468c7,_0x1b78c4);},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x2c5)]=function(_0xa2650c){const _0x97ddbd=_0xee71c,_0x51549b=this[_0x97ddbd(0x271)](_0xa2650c),_0x2f33eb=_0x51549b[_0x97ddbd(0x14b)](),_0x5d47c1=this[_0x97ddbd(0x289)](_0xa2650c),_0x511df1=VisuMZ['PartySystem'][_0x97ddbd(0x21a)][_0x97ddbd(0x1d6)],_0x6554da=_0x5d47c1['x']+Math[_0x97ddbd(0x2b3)](_0x5d47c1[_0x97ddbd(0x1c2)]/0x2)+_0x511df1['ActiveBattlerOffsetX'],_0x25cc7d=_0x5d47c1['y']+_0x5d47c1['height']-this['lineHeight']()-_0x511df1['ActiveBattlerOffsetY'];this[_0x97ddbd(0x1a5)](_0x2f33eb,_0x6554da,_0x25cc7d);},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x27c)]=function(_0x5ae3d7,_0x24de69,_0x5836e2,_0x1ea62d){const _0x42d9a8=_0xee71c,_0x26245f=ColorManager[_0x42d9a8(0x251)](),_0x35b121=ColorManager[_0x42d9a8(0x1b0)](),_0x9ed85e=_0x5836e2/0x2,_0x224e84=this['lineHeight']();while(_0x1ea62d--){this[_0x42d9a8(0x236)][_0x42d9a8(0x158)](_0x5ae3d7,_0x24de69,_0x9ed85e,_0x224e84,_0x35b121,_0x26245f),this[_0x42d9a8(0x236)]['gradientFillRect'](_0x5ae3d7+_0x9ed85e,_0x24de69,_0x9ed85e,_0x224e84,_0x26245f,_0x35b121);}},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x150)]=function(_0x3d96cd,_0x3c4b84,_0x3f9bde,_0x1bfb5e){const _0x21ebe6=_0xee71c;_0x1bfb5e=_0x1bfb5e||0xa8,this[_0x21ebe6(0x184)](ColorManager[_0x21ebe6(0x127)](_0x3d96cd)),this[_0x21ebe6(0x26f)](_0x3d96cd[_0x21ebe6(0x26a)](),_0x3c4b84,_0x3f9bde,_0x1bfb5e,_0x21ebe6(0x254));},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x2e5)]=function(_0x58b1ef){const _0x443edd=_0xee71c;this[_0x443edd(0x297)]=_0x58b1ef,this[_0x443edd(0x2ae)]();},Window_PartyActive[_0xee71c(0x2ed)][_0xee71c(0x2ae)]=function(){const _0x18bef5=_0xee71c;if(this[_0x18bef5(0x297)])this[_0x18bef5(0x297)][_0x18bef5(0x146)](this['actor'](this[_0x18bef5(0x29d)]()));};function Window_PartyReserve(){const _0x1718d9=_0xee71c;this[_0x1718d9(0x317)](...arguments);}Window_PartyReserve['prototype']=Object[_0xee71c(0x177)](Window_StatusBase[_0xee71c(0x2ed)]),Window_PartyReserve['prototype']['constructor']=Window_PartyReserve,Window_PartyReserve[_0xee71c(0x2e0)]=VisuMZ[_0xee71c(0x2b6)]['Settings'][_0xee71c(0x1d6)][_0xee71c(0x137)],Window_PartyReserve['_rowThickness']=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x1d6)][_0xee71c(0x29a)],Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x317)]=function(_0x149f6a){const _0x7ae53b=_0xee71c;Window_StatusBase['prototype'][_0x7ae53b(0x317)]['call'](this,_0x149f6a),this[_0x7ae53b(0x2f3)]=0x0,this[_0x7ae53b(0x17f)]();},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x212)]=function(){const _0x4b466c=_0xee71c;return VisuMZ[_0x4b466c(0x2b6)]['Settings']['Window'][_0x4b466c(0x1b8)]||0x1;},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x2fb)]=function(){const _0x4e669c=_0xee71c;return this[_0x4e669c(0x18e)]()*Window_PartyReserve[_0x4e669c(0x19c)]+0x6;},Window_PartyReserve['prototype'][_0xee71c(0x2cc)]=function(){const _0x2955f4=_0xee71c;return VisuMZ[_0x2955f4(0x2b6)]['Settings'][_0x2955f4(0x2da)]['AddRemoveCmd'];},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x1e7)]=function(){const _0x313316=_0xee71c;let _0x3c6504=$gameParty[_0x313316(0x217)]()[_0x313316(0x323)];if(this[_0x313316(0x2cc)]())_0x3c6504++;return _0x3c6504;},Window_PartyReserve['prototype']['actor']=function(_0x2effb2){const _0x398f28=_0xee71c;return $gameParty[_0x398f28(0x217)]()[_0x2effb2];},Window_PartyReserve['prototype'][_0xee71c(0x2c8)]=function(){const _0x4b994f=_0xee71c;return this[_0x4b994f(0x271)](this[_0x4b994f(0x29d)]());},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x147)]=function(){const _0x5b8181=_0xee71c;SoundManager[_0x5b8181(0x2e8)]();},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x247)]=function(){const _0x3a69b3=_0xee71c,_0x51fdcd=this[_0x3a69b3(0x271)](this['index']());return _0x51fdcd?_0x51fdcd['isFormationChangeOk']():!![];},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x23a)]=function(){const _0x4c18a2=_0xee71c;Window_StatusBase[_0x4c18a2(0x2ed)]['processCursorMove']['call'](this),this['checkShiftSortShortcut']();},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x1ba)]=function(_0x5d4176){const _0x59d68c=_0xee71c;this['index']()<=0x0&&Input[_0x59d68c(0x263)]('up')?this[_0x59d68c(0x13c)]():Window_StatusBase['prototype'][_0x59d68c(0x1ba)][_0x59d68c(0x1fd)](this,_0x5d4176);},Window_PartyReserve['prototype'][_0xee71c(0x22b)]=function(){const _0x1f01dc=_0xee71c,_0x2e2764=this[_0x1f01dc(0x29d)](),_0x40788c=_0x2e2764+0x1>=this[_0x1f01dc(0x1e7)]()-0x1?0x0:_0x2e2764+0x1;this[_0x1f01dc(0x1eb)](_0x2e2764,_0x40788c);},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x230)]=function(){const _0x21ba85=_0xee71c,_0x3b3ba7=this[_0x21ba85(0x29d)](),_0x2aa977=_0x3b3ba7-0x1<0x0?this[_0x21ba85(0x1e7)]()-0x2:_0x3b3ba7-0x1;this['quickSwap'](_0x3b3ba7,_0x2aa977);},Window_PartyReserve[_0xee71c(0x2ed)]['quickSwap']=function(_0x45f53a,_0x36025a){const _0x3e7e47=_0xee71c,_0x1bf125=this['actor'](_0x45f53a),_0x49b8ff=this['actor'](_0x36025a);if(!_0x1bf125?.[_0x3e7e47(0x22c)]()||!_0x49b8ff?.[_0x3e7e47(0x22c)]())return;else{if(!_0x1bf125||!_0x49b8ff)return;}const _0x3742e2=$gameParty[_0x3e7e47(0x25d)],_0x17d064=_0x3742e2[_0x3e7e47(0x258)](_0x1bf125['actorId']()),_0x4b6963=_0x3742e2[_0x3e7e47(0x258)](_0x49b8ff[_0x3e7e47(0x174)]());_0x3742e2[_0x17d064]=_0x49b8ff?_0x49b8ff['actorId']():0x0,_0x3742e2[_0x4b6963]=_0x1bf125?_0x1bf125['actorId']():0x0,this[_0x3e7e47(0x17f)](),this['playCursorSound'](),this[_0x3e7e47(0x1a4)](_0x36025a);},Window_PartyReserve['prototype'][_0xee71c(0x312)]=function(){const _0x56bda9=_0xee71c;if(!this[_0x56bda9(0x1e9)]())return;Input[_0x56bda9(0x263)](_0x56bda9(0x2ec))&&this[_0x56bda9(0x1ee)]();},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x1ee)]=function(){const _0x56fe0b=_0xee71c;SoundManager[_0x56fe0b(0x2e8)](),$gameParty[_0x56fe0b(0x1ef)](),this[_0x56fe0b(0x1a4)](0x0),SceneManager[_0x56fe0b(0x240)][_0x56fe0b(0x223)]();},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x1e9)]=function(){const _0x4bda05=_0xee71c;return this[_0x4bda05(0x1ed)];},Window_PartyReserve['prototype'][_0xee71c(0x28e)]=function(){const _0x23ce63=_0xee71c,_0xaba114=this[_0x23ce63(0x2c8)]();return _0xaba114?_0xaba114[_0x23ce63(0x29d)]():-0x1;},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x22e)]=function(_0x378b37){const _0x1cbe10=_0xee71c;Window_StatusBase['prototype'][_0x1cbe10(0x22e)][_0x1cbe10(0x1fd)](this,_0x378b37);if(_0x378b37>=0x0)this[_0x1cbe10(0x2f3)]=_0x378b37;},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x205)]=function(){const _0x58769b=_0xee71c;this[_0x58769b(0x2f3)]=Math['min'](this[_0x58769b(0x2f3)],this['maxItems']()-0x1),this['smoothSelect'](this['_lastIndex']),this['ensureCursorVisible'](!![]),this['cursorVisible']=!![];},Window_PartyReserve[_0xee71c(0x2ed)]['drawItem']=function(_0x1d0514){const _0x205740=_0xee71c,_0xf574d1=this[_0x205740(0x271)](_0x1d0514);if(!_0xf574d1)return this[_0x205740(0x1cc)](_0x1d0514);const _0x4f8b9e=this[_0x205740(0x2bf)](_0x1d0514);this[_0x205740(0x1a8)](_0x1d0514);const _0x105b14=0xa8,_0x1cfff6=Window_PartyReserve[_0x205740(0x19c)]===0x1,_0x2f14a2=ImageManager[_0x205740(0x12d)]*(_0x1cfff6?0x2:0x1),_0x49f466=this['nameStartPosition']()+this[_0x205740(0x1b1)](),_0x243b50=_0x4f8b9e[_0x205740(0x1c2)]-_0x105b14,_0xbfe38d=_0x4f8b9e['x']+_0x2f14a2+Math[_0x205740(0x32f)](_0x49f466,_0x243b50),_0x25474d=_0x1cfff6?![]:!![];this[_0x205740(0x305)](_0xf574d1[_0x205740(0x22c)]()),this[_0x205740(0x2aa)](_0xf574d1,_0x4f8b9e['x'],_0x4f8b9e['y'],_0x25474d),this['drawActorName'](_0xf574d1,_0xbfe38d,_0x4f8b9e['y'],_0x105b14),this[_0x205740(0x305)](!![]);},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x1e2)]=function(){const _0x57ce08=_0xee71c,_0x15c93c=VisuMZ[_0x57ce08(0x2b6)][_0x57ce08(0x21a)][_0x57ce08(0x1d6)];switch(Window_PartyReserve[_0x57ce08(0x2e0)][_0x57ce08(0x234)]()[_0x57ce08(0x1a0)]()){case _0x57ce08(0x264):return ImageManager[_0x57ce08(0x1fe)];case _0x57ce08(0x170):return _0x15c93c[_0x57ce08(0x203)]*0x2;case _0x57ce08(0x2dd):return _0x15c93c[_0x57ce08(0x2a8)]*0x2;};},Window_PartyReserve['prototype']['drawRemoveCommand']=function(_0x562c9b){const _0x48bb71=_0xee71c,_0x2ed66c=this[_0x48bb71(0x2bf)](_0x562c9b);this['changePaintOpacity'](!![]);const _0x10af8f=TextManager[_0x48bb71(0x28f)];this['drawText'](_0x10af8f,_0x2ed66c['x'],_0x2ed66c['y'],_0x2ed66c['width'],_0x48bb71(0x254));},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x1a8)]=function(_0x4c2ced){const _0x2a589f=_0xee71c;switch(Window_PartyReserve[_0x2a589f(0x2e0)][_0x2a589f(0x234)]()[_0x2a589f(0x1a0)]()){case _0x2a589f(0x264):this[_0x2a589f(0x2b9)](_0x4c2ced);break;case _0x2a589f(0x170):this['drawItemImageSprite'](_0x4c2ced);break;case _0x2a589f(0x2dd):Imported[_0x2a589f(0x151)]&&this['drawItemImageSvActor'](_0x4c2ced);break;};},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x2b9)]=function(_0x393ff4){const _0x42eda7=_0xee71c,_0x33b679=this[_0x42eda7(0x271)](_0x393ff4),_0x55a61b=this[_0x42eda7(0x289)](_0x393ff4),_0x6899f0=Window_PartyReserve[_0x42eda7(0x19c)]===0x1;_0x55a61b['x']+=ImageManager[_0x42eda7(0x12d)]*(_0x6899f0?0x2:0x1);const _0x59bd02=ImageManager[_0x42eda7(0x1fe)],_0x1ba27b=_0x55a61b[_0x42eda7(0x268)]-0x2;this[_0x42eda7(0x305)](_0x33b679[_0x42eda7(0x22c)]()),this[_0x42eda7(0x2ea)](_0x33b679,_0x55a61b['x']+0x1,_0x55a61b['y']+0x1,_0x59bd02,_0x1ba27b),this['changePaintOpacity'](!![]);},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x333)]=function(_0x3b01b3){const _0x5e66f3=_0xee71c,_0x318aa4=this['actor'](_0x3b01b3),_0x2eb141=this[_0x5e66f3(0x289)](_0x3b01b3),_0x32f93d=Window_PartyReserve['_rowThickness']===0x1;_0x2eb141['x']+=ImageManager['iconWidth']*(_0x32f93d?0x2:0x1);const _0x57c65c=VisuMZ['PartySystem']['Settings'][_0x5e66f3(0x1d6)],_0x4762d1=_0x2eb141['x']+_0x57c65c[_0x5e66f3(0x203)]+this[_0x5e66f3(0x1b1)](),_0x5c9922=_0x2eb141['y']+_0x2eb141[_0x5e66f3(0x268)]-_0x57c65c[_0x5e66f3(0x279)];this['drawActorCharacter'](_0x318aa4,_0x4762d1,_0x5c9922);},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x2c5)]=function(_0x489b26){const _0x28e260=_0xee71c,_0x41ff87=this['actor'](_0x489b26),_0x1e3e11=_0x41ff87[_0x28e260(0x14b)](),_0x21a766=this[_0x28e260(0x289)](_0x489b26),_0x200b6c=Window_PartyReserve[_0x28e260(0x19c)]===0x1;_0x21a766['x']+=ImageManager[_0x28e260(0x12d)]*(_0x200b6c?0x2:0x1);const _0x3be5da=VisuMZ[_0x28e260(0x2b6)]['Settings']['Window'],_0x2ce6e4=_0x21a766['x']+_0x3be5da[_0x28e260(0x2a8)]+this[_0x28e260(0x1b1)](),_0xb62d85=_0x21a766['y']+_0x21a766[_0x28e260(0x268)]-_0x3be5da[_0x28e260(0x28a)];this[_0x28e260(0x1a5)](_0x1e3e11,_0x2ce6e4,_0xb62d85);},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x2e5)]=function(_0x409cde){const _0x2357af=_0xee71c;this[_0x2357af(0x297)]=_0x409cde,this[_0x2357af(0x2ae)]();},Window_PartyReserve[_0xee71c(0x2ed)][_0xee71c(0x2ae)]=function(){const _0x467ac0=_0xee71c;this[_0x467ac0(0x297)]&&this['_statusWindow'][_0x467ac0(0x146)](this[_0x467ac0(0x271)](this[_0x467ac0(0x29d)]()));};function _0x526a(_0x45dee5,_0x3c0741){const _0x5e89e2=_0x5e89();return _0x526a=function(_0x526a14,_0x5bc7f1){_0x526a14=_0x526a14-0x125;let _0x767155=_0x5e89e2[_0x526a14];return _0x767155;},_0x526a(_0x45dee5,_0x3c0741);}function Window_PartyStatus(){const _0x284b08=_0xee71c;this[_0x284b08(0x317)](...arguments);}Window_PartyStatus['prototype']=Object[_0xee71c(0x177)](Window_StatusBase[_0xee71c(0x2ed)]),Window_PartyStatus[_0xee71c(0x2ed)][_0xee71c(0x1bf)]=Window_PartyStatus,Window_PartyStatus['prototype'][_0xee71c(0x317)]=function(_0x2d3784){const _0x29d509=_0xee71c;this[_0x29d509(0x2b8)]=null,Window_StatusBase[_0x29d509(0x2ed)][_0x29d509(0x317)]['call'](this,_0x2d3784);},Window_PartyStatus[_0xee71c(0x2ed)]['drawItemDarkRect']=function(_0x4f0224,_0x49da1c,_0x99989,_0x30835f,_0x42a6aa){const _0x56f9b9=_0xee71c;if(VisuMZ[_0x56f9b9(0x2b6)][_0x56f9b9(0x21a)]['General'][_0x56f9b9(0x2b2)]===![])return;_0x42a6aa=Math[_0x56f9b9(0x248)](_0x42a6aa||0x1,0x1);while(_0x42a6aa--){_0x30835f=_0x30835f||this['lineHeight'](),this[_0x56f9b9(0x236)]['paintOpacity']=0xa0;const _0x402d6f=ColorManager[_0x56f9b9(0x1ca)]();this[_0x56f9b9(0x236)][_0x56f9b9(0x1de)](_0x4f0224+0x1,_0x49da1c+0x1,_0x99989-0x2,_0x30835f-0x2,_0x402d6f),this['contents'][_0x56f9b9(0x21e)]=0xff;}},ColorManager['getPartySystemBackColor']=function(){const _0x5cf848=_0xee71c,_0x330cf8=VisuMZ[_0x5cf848(0x2b6)][_0x5cf848(0x21a)][_0x5cf848(0x2da)];let _0x413786=_0x330cf8[_0x5cf848(0x2d3)]!==undefined?_0x330cf8[_0x5cf848(0x2d3)]:0x13;return ColorManager['getColor'](_0x413786);},Window_PartyStatus[_0xee71c(0x2ed)][_0xee71c(0x146)]=function(_0x597265){const _0x564006=_0xee71c;if(this[_0x564006(0x2b8)]===_0x597265)return;this[_0x564006(0x2b8)]=_0x597265;if(_0x597265){const _0x506d2d=ImageManager['loadFace'](_0x597265['faceName']());_0x506d2d['addLoadListener'](this[_0x564006(0x17f)][_0x564006(0x195)](this));}else this['refresh']();},Window_PartyStatus[_0xee71c(0x2ed)]['refresh']=function(){const _0x26d27b=_0xee71c;Window_StatusBase['prototype']['refresh'][_0x26d27b(0x1fd)](this),this[_0x26d27b(0x236)][_0x26d27b(0x1f8)](),this[_0x26d27b(0x2fc)](),VisuMZ['PartySystem'][_0x26d27b(0x21a)][_0x26d27b(0x1d6)][_0x26d27b(0x1e8)][_0x26d27b(0x1fd)](this);},Window_PartyStatus[_0xee71c(0x2ed)][_0xee71c(0x22f)]=function(){const _0x535002=_0xee71c;if(!this[_0x535002(0x2b8)]){this['drawItemDarkRect'](0x0,0x0,this[_0x535002(0x2de)],this[_0x535002(0x13a)]);const _0x1c1f05=Math['round']((this[_0x535002(0x13a)]-this[_0x535002(0x18e)]())/0x2);this['changeTextColor'](ColorManager[_0x535002(0x2b0)]()),this[_0x535002(0x26f)](TextManager[_0x535002(0x28c)],0x0,_0x1c1f05,this[_0x535002(0x2de)],'center');return;}this[_0x535002(0x2ea)](this[_0x535002(0x2b8)],0x1,0x0,ImageManager[_0x535002(0x1fe)],ImageManager[_0x535002(0x1c0)]),this[_0x535002(0x2e4)](this[_0x535002(0x2b8)],ImageManager[_0x535002(0x1fe)]+0x24,0x0);const _0x20983d=this[_0x535002(0x18e)](),_0x2259ae=this[_0x535002(0x20b)](),_0x2990f4=Math[_0x535002(0x2b3)](this[_0x535002(0x2de)]/0x2),_0x51c551=Math['ceil'](_0x2259ae[_0x535002(0x323)]/0x2)*_0x20983d,_0x4c4d0e=0x0;let _0x46dc88=0x0,_0x3fb5a8=ImageManager[_0x535002(0x1c0)]+_0x20983d/0x2;for(const _0x536bd8 of _0x2259ae){this[_0x535002(0x27a)](_0x46dc88,_0x3fb5a8,_0x2990f4,_0x20983d),this[_0x535002(0x17a)](_0x536bd8,_0x46dc88,_0x3fb5a8,_0x2990f4),this[_0x535002(0x23b)](_0x536bd8,_0x46dc88,_0x3fb5a8,_0x2990f4),_0x46dc88===_0x4c4d0e?_0x46dc88+=_0x2990f4:(_0x46dc88=_0x4c4d0e,_0x3fb5a8+=_0x20983d);}},Window_PartyStatus[_0xee71c(0x2ed)][_0xee71c(0x20b)]=function(){const _0x2c4e3d=_0xee71c;return Imported[_0x2c4e3d(0x1b3)]?VisuMZ[_0x2c4e3d(0x274)][_0x2c4e3d(0x21a)]['Param'][_0x2c4e3d(0x1c6)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus['prototype'][_0xee71c(0x17a)]=function(_0x5b2c44,_0x37979d,_0x533b78,_0x59872f){const _0x218ed7=_0xee71c,_0x232c8a=this[_0x218ed7(0x1b1)]();_0x59872f-=_0x232c8a*0x2;if(Imported['VisuMZ_0_CoreEngine'])this[_0x218ed7(0x1ea)](_0x37979d+_0x232c8a,_0x533b78,_0x59872f,_0x5b2c44,![]);else{const _0x36cc7e=TextManager[_0x218ed7(0x24d)](_0x5b2c44);this[_0x218ed7(0x184)](ColorManager[_0x218ed7(0x2b0)]()),this[_0x218ed7(0x26f)](_0x36cc7e,_0x37979d+_0x232c8a,_0x533b78,_0x59872f);}},Window_PartyStatus[_0xee71c(0x2ed)][_0xee71c(0x23b)]=function(_0xa94f,_0x3889f6,_0x2721a8,_0x2bfd77){const _0x113adc=_0xee71c;this['resetFontSettings']();const _0x55557b=this[_0x113adc(0x1b1)](),_0x5db91e=this['getParamValue'](_0xa94f);this[_0x113adc(0x26f)](_0x5db91e,_0x3889f6+_0x55557b,_0x2721a8,_0x2bfd77-_0x55557b*0x2,_0x113adc(0x159));},Window_PartyStatus[_0xee71c(0x2ed)]['getParamValue']=function(_0x1b628a){const _0xd39b87=_0xee71c,_0x26f44f=this[_0xd39b87(0x2b8)];return Imported['VisuMZ_0_CoreEngine']?_0x26f44f[_0xd39b87(0x1c7)](_0x1b628a,!![]):_0x26f44f[_0xd39b87(0x24d)](_0x1b628a);};function Window_PartyBattleSwitch(){const _0x4d03df=_0xee71c;this[_0x4d03df(0x317)](...arguments);}Window_PartyBattleSwitch[_0xee71c(0x2ed)]=Object[_0xee71c(0x177)](Window_StatusBase[_0xee71c(0x2ed)]),Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x1bf)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0xee71c(0x2ed)]['initialize']=function(_0x1f67db){const _0x5ec0fe=_0xee71c;Window_StatusBase[_0x5ec0fe(0x2ed)][_0x5ec0fe(0x317)][_0x5ec0fe(0x1fd)](this,_0x1f67db),this[_0x5ec0fe(0x1ce)](VisuMZ[_0x5ec0fe(0x2b6)]['Settings'][_0x5ec0fe(0x1d6)]['BattleSwitchWindowBgType']),this[_0x5ec0fe(0x2e1)]=0x0;},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x2d7)]=function(){const _0x148ebf=_0xee71c;for(const _0x1d0d3d of $gameParty[_0x148ebf(0x2c2)]()){ImageManager['loadFace'](_0x1d0d3d['faceName']());}},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x212)]=function(){return 0x1;},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x271)]=function(_0x3f8f69){const _0x199579=_0xee71c;return $gameParty[_0x199579(0x217)]()[_0x3f8f69];},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x2c8)]=function(){const _0x8b16aa=_0xee71c;return this['actor'](this[_0x8b16aa(0x29d)]());},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x2fb)]=function(){const _0x541ee=_0xee71c;return this[_0x541ee(0x18e)]()*0x2+0x8;},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x1e7)]=function(){const _0x4f12bd=_0xee71c;return $gameParty[_0x4f12bd(0x217)]()[_0x4f12bd(0x323)];},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x20c)]=function(){const _0x5e57b5=_0xee71c;Window_StatusBase[_0x5e57b5(0x2ed)][_0x5e57b5(0x20c)][_0x5e57b5(0x1fd)](this),this[_0x5e57b5(0x249)](),this[_0x5e57b5(0x17f)](),this[_0x5e57b5(0x1a4)](0x0);},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x2d2)]=function(){const _0x115c37=_0xee71c;Window_StatusBase[_0x115c37(0x2ed)]['deactivate'][_0x115c37(0x1fd)](this),this[_0x115c37(0x16e)]();},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x247)]=function(){const _0x5e8b0c=_0xee71c;return this[_0x5e8b0c(0x17e)](this[_0x5e8b0c(0x2c8)]());},Window_PartyBattleSwitch[_0xee71c(0x2ed)]['isEnabled']=function(_0x32001b){const _0x5c800b=_0xee71c;if(!_0x32001b)return![];return _0x32001b[_0x5c800b(0x22c)]()&&_0x32001b[_0x5c800b(0x1ff)]();},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x2a9)]=function(_0x5081a6){const _0x1f8f0d=_0xee71c,_0x3fba83=this[_0x1f8f0d(0x271)](_0x5081a6);if(!_0x3fba83)return;const _0x3a856e=ImageManager['loadFace'](_0x3fba83[_0x1f8f0d(0x15c)]());_0x3a856e[_0x1f8f0d(0x269)](this[_0x1f8f0d(0x243)]['bind'](this,_0x5081a6));},Window_PartyBattleSwitch[_0xee71c(0x2ed)]['processDrawItem']=function(_0x2688af){const _0x5e10be=_0xee71c;this[_0x5e10be(0x1a8)](_0x2688af),this[_0x5e10be(0x206)](_0x2688af);},Window_PartyBattleSwitch['prototype'][_0xee71c(0x1a8)]=function(_0x3f0a3d){const _0x2e064d=_0xee71c,_0x3a0533=this['actor'](_0x3f0a3d),_0x2eeb54=this[_0x2e064d(0x289)](_0x3f0a3d);this[_0x2e064d(0x305)](this[_0x2e064d(0x17e)](_0x3a0533)),this[_0x2e064d(0x2ea)](_0x3a0533,_0x2eeb54['x']+0x1,_0x2eeb54['y']+0x1,ImageManager['faceWidth'],_0x2eeb54['height']-0x2),this[_0x2e064d(0x305)](!![]);},Window_PartyBattleSwitch[_0xee71c(0x2ed)][_0xee71c(0x206)]=function(_0x5f05c2){const _0x1e09b1=_0xee71c,_0x2feec0=this[_0x1e09b1(0x271)](_0x5f05c2),_0x4f95e5=this[_0x1e09b1(0x1af)](_0x5f05c2),_0x578f2d=_0x4f95e5['x']+ImageManager[_0x1e09b1(0x1fe)]+0x24,_0x569564=_0x578f2d+0xb4;this[_0x1e09b1(0x305)](this[_0x1e09b1(0x17e)](_0x2feec0)),this['drawActorName'](_0x2feec0,_0x578f2d,_0x4f95e5['y']),this['drawActorClass'](_0x2feec0,_0x578f2d,_0x4f95e5['y']+this[_0x1e09b1(0x18e)]()),this[_0x1e09b1(0x189)](_0x2feec0,_0x569564,_0x4f95e5['y']),this[_0x1e09b1(0x305)](!![]);};Imported[_0xee71c(0x199)]&&(ImageManager[_0xee71c(0x1db)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x2da)][_0xee71c(0x20f)]??0x4b,TextManager['battlePartyChangeCmd']=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x31e)],TextManager[_0xee71c(0x304)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x282)],TextManager[_0xee71c(0x218)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x31c)],TextManager[_0xee71c(0x197)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)][_0xee71c(0x24a)],TextManager[_0xee71c(0x273)]=VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x145)]['QueuePartyScene'],VisuMZ[_0xee71c(0x2b6)]['SceneManager_isPreviousSceneBattleTransitionable']=SceneManager['isPreviousSceneBattleTransitionable'],SceneManager[_0xee71c(0x201)]=function(){const _0x155e24=_0xee71c;if(SceneManager[_0x155e24(0x12e)](Scene_Party))return!![];return VisuMZ['PartySystem']['SceneManager_isPreviousSceneBattleTransitionable'][_0x155e24(0x1fd)](this);},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x314)]=SceneManager[_0xee71c(0x267)],SceneManager[_0xee71c(0x267)]=function(){const _0x1f8c24=_0xee71c;if(SceneManager[_0x1f8c24(0x1d4)](Scene_Party))return!![];return VisuMZ[_0x1f8c24(0x2b6)][_0x1f8c24(0x314)]['call'](this);},SceneManager['isSceneMap']=function(){const _0x115935=_0xee71c;return this[_0x115935(0x240)]&&this['_scene']['constructor']===Scene_Map;},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x2cf)]=Scene_Battle['prototype'][_0xee71c(0x302)],Scene_Battle['prototype'][_0xee71c(0x302)]=function(){const _0xf0685b=_0xee71c;VisuMZ[_0xf0685b(0x2b6)][_0xf0685b(0x2cf)][_0xf0685b(0x1fd)](this),this[_0xf0685b(0x1d9)](),this[_0xf0685b(0x20a)](),this[_0xf0685b(0x2a3)]();},Scene_Battle[_0xee71c(0x2ed)]['createPartySwitchWindow']=function(){const _0x384bc0=_0xee71c,_0x47095=this[_0x384bc0(0x2ab)]();this[_0x384bc0(0x1d7)]=new Window_PartyBattleSwitch(_0x47095),this[_0x384bc0(0x301)](this[_0x384bc0(0x1d7)]),this[_0x384bc0(0x1d7)][_0x384bc0(0x224)]('ok',this['onPartySwitchOk'][_0x384bc0(0x195)](this)),this[_0x384bc0(0x1d7)]['setHandler'](_0x384bc0(0x19d),this[_0x384bc0(0x1f9)][_0x384bc0(0x195)](this));},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x2ab)]=function(){const _0x30143f=_0xee71c,_0x3dbc96=this[_0x30143f(0x20d)]();return _0x3dbc96==='border'?this[_0x30143f(0x1fb)]():this[_0x30143f(0x14c)]();},Scene_Battle[_0xee71c(0x2ed)]['partySwitchWindowRectStandard']=function(){const _0x27abac=_0xee71c;return VisuMZ[_0x27abac(0x2b6)][_0x27abac(0x21a)]['Window']['BattleSwitchWindowRect']['call'](this);},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x1fb)]=function(){const _0x40a16a=_0xee71c,_0x5922ee=this[_0x40a16a(0x2db)](),_0x54b43=$gameSystem['windowPadding']()*0x2;return _0x5922ee['width']=0x204+_0x54b43,_0x5922ee;},VisuMZ['PartySystem'][_0xee71c(0x12a)]=Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x2b5)],Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x2b5)]=function(){const _0x1bd06b=_0xee71c;if(this[_0x1bd06b(0x1d7)]&&this['_partyMemberSwitchWindow']['active'])return!![];if(this[_0x1bd06b(0x149)])return!![];if(this[_0x1bd06b(0x2ff)])return!![];if(this[_0x1bd06b(0x1c5)])return!![];return VisuMZ[_0x1bd06b(0x2b6)][_0x1bd06b(0x12a)]['call'](this);},VisuMZ['PartySystem'][_0xee71c(0x325)]=Scene_Battle['prototype']['createPartyCommandWindowBattleCore'],Scene_Battle['prototype'][_0xee71c(0x16f)]=function(){const _0x1c273a=_0xee71c;VisuMZ[_0x1c273a(0x2b6)]['Scene_Battle_createPartyCommandWindowBattleCore'][_0x1c273a(0x1fd)](this),this['_partyCommandWindow'][_0x1c273a(0x224)](_0x1c273a(0x24c),this[_0x1c273a(0x338)][_0x1c273a(0x195)](this));},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x338)]=function(){const _0x33da59=_0xee71c;this[_0x33da59(0x1bb)]()?(this['_callSceneParty']=!![],this[_0x33da59(0x182)][_0x33da59(0x219)](TextManager[_0x33da59(0x273)][_0x33da59(0x286)](TextManager[_0x33da59(0x24c)]))):this['callFormation']();},Scene_Battle['prototype'][_0xee71c(0x1bb)]=function(){const _0x4bb56b=_0xee71c;return BattleManager[_0x4bb56b(0x222)]();},Scene_Battle['prototype']['callFormation']=function(){const _0x194856=_0xee71c;this[_0x194856(0x1c5)]=![],this[_0x194856(0x167)][_0x194856(0x200)](),this[_0x194856(0x336)]['visible']=![],SceneManager[_0x194856(0x221)](),SceneManager['push'](Scene_Party),$gameParty[_0x194856(0x154)](),BattleManager['isTpb']()&&(BattleManager[_0x194856(0x1b9)]=BattleManager[_0x194856(0x271)]());},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x1e5)]=Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x26d)],Scene_Battle['prototype']['updateBattleProcess']=function(){const _0x3fcb92=_0xee71c;VisuMZ[_0x3fcb92(0x2b6)][_0x3fcb92(0x1e5)][_0x3fcb92(0x1fd)](this),this['_callSceneParty']&&!BattleManager['_subject']&&this[_0x3fcb92(0x129)](),this[_0x3fcb92(0x2ff)]&&!BattleManager['_subject']&&this[_0x3fcb92(0x2b7)]();},VisuMZ['PartySystem'][_0xee71c(0x310)]=Scene_Battle[_0xee71c(0x2ed)]['isTimeActive'],Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x220)]=function(){const _0x15a3e8=_0xee71c;if(BattleManager[_0x15a3e8(0x222)]()){if(this[_0x15a3e8(0x1d7)]&&this['_partyMemberSwitchWindow'][_0x15a3e8(0x1ed)])return![];}return VisuMZ['PartySystem']['Scene_Battle_isTimeActive'][_0x15a3e8(0x1fd)](this);},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x1d0)]=Scene_Battle['prototype'][_0xee71c(0x2d1)],Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x2d1)]=function(){const _0x3d53ad=_0xee71c;VisuMZ[_0x3d53ad(0x2b6)][_0x3d53ad(0x1d0)][_0x3d53ad(0x1fd)](this),this[_0x3d53ad(0x331)][_0x3d53ad(0x224)](_0x3d53ad(0x24c),this[_0x3d53ad(0x2d5)]['bind'](this));},Scene_Battle['prototype'][_0xee71c(0x2d5)]=function(){const _0x1ea849=_0xee71c;this[_0x1ea849(0x1bb)]()?(this['_callPartyMemberSwitch']=!![],this[_0x1ea849(0x182)][_0x1ea849(0x219)](TextManager[_0x1ea849(0x273)][_0x1ea849(0x286)](TextManager[_0x1ea849(0x24c)]))):this[_0x1ea849(0x2b7)]();},Scene_Battle['prototype'][_0xee71c(0x2b7)]=function(){const _0x2e061b=_0xee71c;this[_0x2e061b(0x2ff)]=![],this['_logWindow'][_0x2e061b(0x1f8)](),BattleManager['actor']()&&this[_0x2e061b(0x1d7)][_0x2e061b(0x20c)]();},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x2f7)]=function(){const _0x285831=_0xee71c,_0x1da35f=this[_0x285831(0x1d7)]['currentActor']();_0x1da35f?this[_0x285831(0x23d)](_0x1da35f):(this[_0x285831(0x1d7)][_0x285831(0x2d2)](),this[_0x285831(0x331)][_0x285831(0x20c)]());},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x23d)]=function(_0x2a8cd9){const _0x3067c1=_0xee71c,_0x1ddf52=BattleManager[_0x3067c1(0x271)](),_0x4f367b=_0x1ddf52[_0x3067c1(0x278)]();this[_0x3067c1(0x1d7)][_0x3067c1(0x2d2)](),this['isShowPartySwitchOutAnimation']()&&_0x4f367b?(this['_partySystemSwitchOut']=!![],_0x4f367b[_0x3067c1(0x2f5)](_0x2a8cd9)):this['processPartySwitchMember'](_0x2a8cd9);},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x2ca)]=function(){const _0xc9caa=_0xee71c;return VisuMZ[_0xc9caa(0x2b6)][_0xc9caa(0x21a)][_0xc9caa(0x2da)]['SwitchOutAnimation'];},Scene_Battle[_0xee71c(0x2ed)]['processPartySwitchMember']=function(_0x209729){const _0x2e5734=_0xee71c;this['_partySystemSwitchOut']=![];const _0x24e72c=BattleManager['actor'](),_0x411659=_0x24e72c[_0x2e5734(0x278)](),_0x57a0a9=$gameParty['_battleMembers'][_0x2e5734(0x258)](_0x24e72c[_0x2e5734(0x174)]());$gameParty['_battleMembers'][_0x57a0a9]=_0x209729[_0x2e5734(0x174)](),$gameParty[_0x2e5734(0x276)]();if(this['isImmediateTpb']())_0x209729[_0x2e5734(0x25a)]=_0x24e72c[_0x2e5734(0x25a)],_0x209729[_0x2e5734(0x241)]='charged';else BattleManager[_0x2e5734(0x172)]()&&_0x209729[_0x2e5734(0x24f)]();BattleManager[_0x2e5734(0x1a3)]=_0x209729,BattleManager[_0x2e5734(0x16d)](_0x24e72c,_0x209729),_0x209729[_0x2e5734(0x154)](),_0x209729['makeActions'](),_0x209729['onBattlePartySwitch'](_0x24e72c),_0x411659&&_0x411659[_0x2e5734(0x329)](_0x209729),this[_0x2e5734(0x297)][_0x2e5734(0x216)](_0x24e72c,_0x209729),this[_0x2e5734(0x297)][_0x2e5734(0x17f)](),this[_0x2e5734(0x331)][_0x2e5734(0x166)](_0x209729),this[_0x2e5734(0x331)][_0x2e5734(0x1a4)](0x0),this[_0x2e5734(0x331)][_0x2e5734(0x20c)](),this[_0x2e5734(0x331)][_0x2e5734(0x32a)]=!![];},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x30b)]=function(){const _0x462766=_0xee71c;if(!BattleManager['isTpb']())return![];const _0x12ac42=VisuMZ['PartySystem'][_0x462766(0x21a)][_0x462766(0x2da)];return _0x12ac42[_0x462766(0x2c3)]===undefined&&(_0x12ac42[_0x462766(0x2c3)]=!![]),_0x12ac42['tpbImmediateAction'];},Window_StatusBase['prototype'][_0xee71c(0x216)]=function(_0x267e7d,_0x1d1e8c){const _0x2f8480=_0xee71c,_0x3503de='actor%1-stateIcon'[_0x2f8480(0x286)](_0x267e7d[_0x2f8480(0x174)]()),_0x4df3e1=this[_0x2f8480(0x191)](_0x3503de,Sprite_StateIcon);_0x4df3e1[_0x2f8480(0x166)](_0x1d1e8c);},Scene_Battle[_0xee71c(0x2ed)][_0xee71c(0x1f9)]=function(){const _0x3ae268=_0xee71c;this[_0x3ae268(0x1d7)][_0x3ae268(0x2d2)](),this[_0x3ae268(0x331)][_0x3ae268(0x20c)](),this[_0x3ae268(0x331)][_0x3ae268(0x17f)]();},Scene_Battle['prototype'][_0xee71c(0x20a)]=function(){const _0x8bd814=_0xee71c;if(!BattleManager[_0x8bd814(0x172)]())return;if(!SceneManager[_0x8bd814(0x12e)](Scene_Party))return;this[_0x8bd814(0x30f)][_0x8bd814(0x2d2)](),this[_0x8bd814(0x30f)][_0x8bd814(0x16e)](),this['_actorCommandWindow'][_0x8bd814(0x2d2)](),this[_0x8bd814(0x331)][_0x8bd814(0x16e)](),BattleManager[_0x8bd814(0x1a3)]=null,BattleManager['_inputting']=![];},Scene_Battle[_0xee71c(0x2ed)]['postPartySwitchMenuTurnBased']=function(){const _0x55563c=_0xee71c;if(BattleManager[_0x55563c(0x172)]())return;if(!SceneManager['isPreviousScene'](Scene_Party))return;Imported[_0x55563c(0x225)]&&BattleManager[_0x55563c(0x1dc)]()&&BattleManager[_0x55563c(0x239)](),Imported[_0x55563c(0x244)]&&BattleManager[_0x55563c(0x12f)]()&&(BattleManager['makeActionOrders'](),BattleManager[_0x55563c(0x1a3)]=$gameParty[_0x55563c(0x26b)](),BattleManager['_subject']=BattleManager[_0x55563c(0x271)](),BattleManager[_0x55563c(0x169)]=!![],this[_0x55563c(0x331)][_0x55563c(0x166)](BattleManager[_0x55563c(0x271)]()),this[_0x55563c(0x297)][_0x55563c(0x245)](BattleManager[_0x55563c(0x271)]())),Imported[_0x55563c(0x192)]&&BattleManager[_0x55563c(0x242)]()&&(BattleManager[_0x55563c(0x239)](),BattleManager['_currentActor']=$gameParty['teamBasedFirstAvailableMember'](),BattleManager[_0x55563c(0x141)]=BattleManager[_0x55563c(0x271)](),BattleManager['_inputting']=!![],this[_0x55563c(0x331)][_0x55563c(0x166)](BattleManager['actor']()),this[_0x55563c(0x297)][_0x55563c(0x245)](BattleManager[_0x55563c(0x271)]())),Imported[_0x55563c(0x173)]&&BattleManager[_0x55563c(0x2a7)]()&&(BattleManager[_0x55563c(0x239)](),BattleManager[_0x55563c(0x1a3)]=$gameParty[_0x55563c(0x26b)](),BattleManager[_0x55563c(0x141)]=BattleManager['actor'](),BattleManager[_0x55563c(0x169)]=!![],this[_0x55563c(0x331)][_0x55563c(0x166)](BattleManager[_0x55563c(0x271)]()),this[_0x55563c(0x297)]['selectActor'](BattleManager[_0x55563c(0x271)]()));},Game_Party[_0xee71c(0x2ed)]['teamBasedFirstAvailableMember']=function(){const _0x15e32b=_0xee71c;let _0x2407b6=this[_0x15e32b(0x143)]();return _0x2407b6[0x0];},Sprite_Actor['_partySwitchDuration']=0xc,Sprite_Actor[_0xee71c(0x2ed)][_0xee71c(0x2f5)]=function(_0x220876){const _0x1115ed=_0xee71c;this['_partySwitchTargetActor']=_0x220876;const _0x8d4737=Sprite_Actor[_0x1115ed(0x1ec)];this[_0x1115ed(0x27f)](0x12c,0x0,_0x8d4737),this[_0x1115ed(0x246)](0x0,_0x8d4737),this[_0x1115ed(0x1ec)]=_0x8d4737;},Sprite_Actor[_0xee71c(0x2ed)]['startSwitchInAnimation']=function(_0xfa4cd2){const _0x498ef9=_0xee71c;if(SceneManager[_0x498ef9(0x2f6)]()){SceneManager['_scene']['processPartySwitchMember'](_0xfa4cd2);const _0x1ef062=Sprite_Actor[_0x498ef9(0x1ec)];this[_0x498ef9(0x237)](),this[_0x498ef9(0x246)](0xff,_0x1ef062);}this[_0x498ef9(0x231)]=null;},VisuMZ['PartySystem'][_0xee71c(0x1f3)]=Sprite_Actor[_0xee71c(0x2ed)][_0xee71c(0x200)],Sprite_Actor[_0xee71c(0x2ed)][_0xee71c(0x200)]=function(){const _0x1ca5ea=_0xee71c;VisuMZ[_0x1ca5ea(0x2b6)][_0x1ca5ea(0x1f3)]['call'](this);if(this[_0x1ca5ea(0x1ec)])this['updatePartySwitch']();},Sprite_Actor[_0xee71c(0x2ed)][_0xee71c(0x299)]=function(){const _0x41bccf=_0xee71c;this['_partySwitchDuration']=this[_0x41bccf(0x1ec)]||0x0,this['_partySwitchDuration']--,this[_0x41bccf(0x1ec)]<=0x0&&this[_0x41bccf(0x229)](this[_0x41bccf(0x231)]);},Window_PartyCommand[_0xee71c(0x2ed)][_0xee71c(0x15d)]=function(){this['addFormationCommand']();},Window_PartyCommand['prototype']['addFormationCommand']=function(){const _0x2ba7ae=_0xee71c;if(!this[_0x2ba7ae(0x211)]())return;if(this[_0x2ba7ae(0x18d)]()){$gameTemp[_0x2ba7ae(0x1a9)]()&&!BattleManager['_battleSystemIncompatibilityError']&&(console[_0x2ba7ae(0x260)](_0x2ba7ae(0x1c3)),BattleManager['_battleSystemIncompatibilityError']=!![]);return;}const _0x469580=this[_0x2ba7ae(0x2c7)](),_0x19d747=ImageManager[_0x2ba7ae(0x1db)],_0x29ade8=_0x469580===_0x2ba7ae(0x291)?TextManager['battlePartyChangeCmd']:_0x2ba7ae(0x125)[_0x2ba7ae(0x286)](_0x19d747,TextManager[_0x2ba7ae(0x280)]),_0x334f20=this[_0x2ba7ae(0x2ce)]();this[_0x2ba7ae(0x2eb)](_0x29ade8,_0x2ba7ae(0x24c),_0x334f20);},Window_PartyCommand[_0xee71c(0x2ed)][_0xee71c(0x211)]=function(){const _0x4e7a00=_0xee71c;if(Imported[_0x4e7a00(0x178)]&&BattleManager['isOTB']())return![];if(Imported[_0x4e7a00(0x252)]&&BattleManager[_0x4e7a00(0x2d6)]())return![];if(Imported['VisuMZ_2_BattleGridSystem']&&BattleManager[_0x4e7a00(0x23f)]())return![];return VisuMZ['PartySystem'][_0x4e7a00(0x21a)][_0x4e7a00(0x2da)]['PartyCmdWinAddParty'];},Window_PartyCommand[_0xee71c(0x2ed)][_0xee71c(0x18d)]=function(){return![];},Window_PartyCommand[_0xee71c(0x2ed)]['isFormationCommandEnabled']=function(){const _0x1304ae=_0xee71c;if($gameParty['allMembers']()[_0x1304ae(0x323)]<=0x1)return![];if(!$gameParty[_0x1304ae(0x21f)]())return![];return $gameSystem[_0x1304ae(0x128)]();},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)]['Window_PartyCommand_updateHelp']=Window_PartyCommand[_0xee71c(0x2ed)]['updateHelp'],Window_PartyCommand[_0xee71c(0x2ed)]['updateHelp']=function(){const _0x571ba3=_0xee71c,_0x51bfaf=this[_0x571ba3(0x155)]();switch(_0x51bfaf){case _0x571ba3(0x24c):this['_helpWindow'][_0x571ba3(0x15e)](TextManager[_0x571ba3(0x304)]);break;default:VisuMZ[_0x571ba3(0x2b6)]['Settings'][_0x571ba3(0x183)][_0x571ba3(0x1fd)](this);break;}},Window_ActorCommand['prototype'][_0xee71c(0x24b)]=function(){const _0x254400=_0xee71c;if(!this['isPartyCommandAdded']())return;this[_0x254400(0x160)]('formation')>=0x0&&this[_0x254400(0x17b)]();const _0x271f27=this['commandStyle'](),_0x25d848=ImageManager[_0x254400(0x1db)],_0x455977=_0x271f27===_0x254400(0x291)?TextManager[_0x254400(0x218)]:_0x254400(0x125)[_0x254400(0x286)](_0x25d848,TextManager[_0x254400(0x280)]),_0x34f583=this['isPartyCommandEnabled']();this['addCommand'](_0x455977,'formation',_0x34f583);},Window_ActorCommand[_0xee71c(0x2ed)][_0xee71c(0x1a6)]=function(){const _0x270054=_0xee71c;if(!this['_actor'])return![];return VisuMZ['PartySystem']['Settings'][_0x270054(0x2da)][_0x270054(0x29f)];},Window_ActorCommand[_0xee71c(0x2ed)][_0xee71c(0x13d)]=function(){const _0x6b08b3=_0xee71c;if($gameParty[_0x6b08b3(0x2c2)]()[_0x6b08b3(0x323)]<=0x1)return![];if(!this[_0x6b08b3(0x2b8)])return![];if(!this[_0x6b08b3(0x2b8)][_0x6b08b3(0x21f)]())return![];return this['_actor']['isFormationChangeOk']();},VisuMZ[_0xee71c(0x2b6)][_0xee71c(0x21a)][_0xee71c(0x2cd)]=Window_ActorCommand['prototype'][_0xee71c(0x1ae)],Window_ActorCommand[_0xee71c(0x2ed)][_0xee71c(0x1ae)]=function(){const _0x12a4d7=_0xee71c,_0x14f67e=this[_0x12a4d7(0x155)]();if(!_0x14f67e)return;switch(_0x14f67e[_0x12a4d7(0x234)]()){case _0x12a4d7(0x24c):this[_0x12a4d7(0x32d)][_0x12a4d7(0x15e)](TextManager[_0x12a4d7(0x197)]);break;default:VisuMZ[_0x12a4d7(0x2b6)]['Settings'][_0x12a4d7(0x2cd)][_0x12a4d7(0x1fd)](this);break;}},Window_ActorCommand[_0xee71c(0x2ed)][_0xee71c(0x17b)]=function(){const _0x1612ec=_0xee71c;while(this[_0x1612ec(0x160)](_0x1612ec(0x24c))>=0x0){const _0xa249af=this[_0x1612ec(0x160)](_0x1612ec(0x24c));this[_0x1612ec(0x266)][_0x1612ec(0x215)](_0xa249af,0x1);}});;function _0x5e89(){const _0x558dfb=['_callSceneParty','DisplayedParams','paramValueByName','drawActorPartyIconsVert','exit','getPartySystemBackColor','textColor','drawRemoveCommand','_partySystemBattleCommandCooldown','setBackgroundType','statusLabelRect','Scene_Battle_createActorCommandWindow','Game_Party_setupStartingMembers','Scene_Base_isAutosaveEnabled','TempCreatePartyNormal','isNextScene','ConvertParams','Window','_partyMemberSwitchWindow','initEquips','createPartySwitchWindow','14FXjIWL','battlePartyChangeIcon','isBTB','BgSettings','fillRect','TempDisbandTempParty','description','swapOrder','nameStartPosition','buttonAssistText3','_actionState','Scene_Battle_updateBattleProcess','_reservePartyLabel','maxItems','StatusWindowDraw','isShiftShortcutEnabled','drawParamText','quickSwap','_partySwitchDuration','active','processShiftSortShortcut','sortActors','changeLevel','ActiveSpriteOffsetX','StatusWindowBgType','Sprite_Actor_update','11890sdKqos','_backSprite2','ActorCmdCooldown','AssistRemove','clear','onPartySwitchCancel','helpAreaHeight','partySwitchWindowRectBorder','return\x200','call','faceWidth','isAlive','update','isPreviousSceneBattleTransitionable','cursorDown','ReserveSpriteOffsetX','gridRank','reselect','drawItemStatus','defaultMaxBattleMembers','assistSortPartyMembers','processShiftRemoveShortcut','postPartySwitchMenuTpb','actorParams','activate','battleLayoutStyle','5uwHzHw','BattlePartyIcon','drawActorPartyIconsHorz','isFormationCommandAdded','maxCols','addNonBattleTestMembers','match','splice','switchStateIconActor','reserveMembers','battlePartySwitchCmd','addText','Settings','STRUCT','_statusPartyLabel','loadTitle2','paintOpacity','canSwitchPartyInBattle','isTimeActive','snapForBackground','isActiveTpb','refreshAllWindows','setHandler','VisuMZ_2_BattleSystemBTB','loadTitle1','setPartyLock','isActor','startSwitchInAnimation','onReserveOk','cursorPagedown','isFormationChangeOk','4223427MDXltb','select','refreshOG','cursorPageup','_partySwitchTargetActor','_clickHandler','Lock','toLowerCase','clearPartyBattleCommandCooldown','contents','stepForward','checkShiftRemoveShortcut','makeActionOrders','processCursorMove','drawParamValue','createReservePartyWindow','preparePartySwitchMember','createCustomBackgroundImages','isUsingGridSystem','_scene','_tpbState','isETB','processDrawItem','VisuMZ_2_BattleSystemFTB','selectActor','startOpacity','isCurrentItemEnabled','max','open','BattleHelpSwitch','addPartyCommand','formation','param','ARRAYNUM','clearTpbChargeTime','FUNC','dimColor1','VisuMZ_2_BattleSystemSTB','MovePartyIndexToReserve','center','StatusWindowRect','ARRAYSTRUCT','drawIcon','indexOf','onReserveCancel','_tpbChargeTime','Actors','ActiveParty','_actors','EVAL','onBattlePartySwitch','log','terminate','replaceActionBattlersPartySwitch','isTriggered','face','3738gOLusS','_list','isNextSceneBattleTransitionable','height','addLoadListener','name','teamBasedFirstAvailableMember','removeActor','updateBattleProcess','createStatusWindow','drawText','JSON','actor','updateBattlePartySwitchCooldown','ActiveTpbFormationMessage','CoreEngine','checkInitBattleMembers','partyChangeRefresh','gaugeBackColor','battler','ReserveSpriteOffsetY','drawItemDarkRect','getBackgroundOpacity','drawDarkRect','Game_Actor_canSwitchPartyInBattle_FP','uiInputPosition','startMove','battlePartyChangeCmd','ActivePartyGraphic','BattleHelpFormation','_partySwitchBattleCommandCooldown','statusWindowRect','bitmap','format','ReservePartyLabelRect','version','itemRect','ReserveBattlerOffsetY','_activePartyLabel','emptyPartyMember','ARRAYJSON','pendingIndex','removePartyMember','playCursorSound','text','initMaxBattleMembers','charging','uiMenuStyle','_backSprite1','ReserveParty','_statusWindow','Game_System_isFormationEnabled_FP','updatePartySwitch','ReserveItemThickness','assistSwapPositions','clamp','index','assistSwapInPartyMember','ActorCmdWinAddParty','ActorsJS','loadSvActor','_actionBattlers','postPartySwitchMenuTurnBased','addChild','SnapshotOpacity','MoveActorsToReserve','isPTB','ReserveBattlerOffsetX','drawItem','drawActorPartyIcons','partySwitchWindowRect','parameters','random','callUpdateHelp','_targets','systemColor','onActiveOk','DrawBackRect','round','slice','isAnyInputWindowActive','PartySystem','callPartyMemberSwitch','_actor','drawItemImageFace','pop','setupStartingMembers','reservePartyLabelRect','Game_Party_rawBattleMembers_FP','BgFilename1','itemLineRect','isSceneParty','ActiveSpriteOffsetY','allMembers','tpbImmediateAction','16645277IRDQkY','drawItemImageSvActor','Status','commandStyle','currentActor','createActivePartyLabel','isShowPartySwitchOutAnimation','Game_Troop_increaseTurn','addRemoveCommand','Window_ActorCommand_updateHelp','isFormationCommandEnabled','Scene_Battle_createAllWindows','registerCommand','createActorCommandWindow','deactivate','BackRectColor','removeActionBattlersOTB','commandPartyMemberSwitch','isSTB','loadFaceImages','createForcedParty','assistSwapOutPartyMember','General','skillItemWindowRectBorderStyle','Game_Party_canSwitchPartyInBattle_FP','svbattler','innerWidth','swapOrderPartySystemPlugin','_actorGraphic','openness','ARRAYFUNC','testBattlers','drawActorSimpleStatus','setStatusWindow','status','createActivePartyWindow','playEquip','isSceneMap','drawActorFace','addCommand','shift','prototype','concat','Require','followers','_reservePartyWindow','iconHeight','_lastIndex','statusParty','startSwitchOutAnimation','isSceneBattle','onPartySwitchOk','requestRefresh','initBattleMembers','drawItemEmpty','itemHeight','resetFontSettings','_otb_actionBattlersNext','Temp:\x20Create\x20Temporary\x20Party\x20(JS)\x20Error','_callPartyMemberSwitch','activePartyLabelRect','addWindow','createAllWindows','_partyRequired','battlePartyChangeCmdHelp','changePaintOpacity','clearForcedParty','Game_Actor_setup','_battleMembers','5874672ZrDXrx','includes','isImmediateTpb','VisuMZ_2_BattleGridSystem','Game_Battler_onBattleStart','clone','_partyCommandWindow','Scene_Battle_isTimeActive','_bypassAutoSavePartySystem','checkShiftSortShortcut','setupBattleTestMembers','SceneManager_isNextSceneBattleTransitionable','_partyLocked','StatusLabelBgType','initialize','otbReturnBattlerToTurnOrders','clearBypassAutoSave','isCTB','equips','BattleSwitchOut','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BattlePartyCmd','STR','lockPartyMemberIcon','sort','battlePartySwitchCooldown','length','getColor','Scene_Battle_createPartyCommandWindowBattleCore','clearPartySwitchCommandCooldown','setupBattleTest','inBattle','setBattler','_debug','clearDamagePopup','TempCreatePartyJS','_helpWindow','centerSprite','min','_pageupButton','_actorCommandWindow','map','drawItemImageSprite','isCancelEnabled','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_windowLayer','setBattlePartySwitchCooldown','commandFormation','buttonAssistText4','\x5cI[%1]%2','Game_Party_setupBattleTest','hpColor','isFormationEnabled','callFormation','Scene_Battle_isAnyInputWindowActive','_forcedPartyActors','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','iconWidth','isPreviousScene','isFTB','direction','NUM','members','adjustSprite','isUsingBattleGridTactics','isRequiredInParty','Game_Party_addActor','ReservePartyGraphic','ChangeMaxBattleMembers','Remove','innerHeight','_statusPartyWindow','processCancel','isPartyCommandEnabled','MoveRandomToActive','_battleMaxSize','needsPageButtons','_subject','sortActionOrdersBTB','battleMembers','popScene','Vocab','setActor','playOkSound','setPartyRequirement','_partySystemSwitchOut','createReservePartyLabel','battlerName','partySwitchWindowRectStandard','648920XWDYyq','increaseTurn','_activePartyWindow','drawActorName','VisuMZ_1_MainMenuCore','LockPartyMembers','drawActorCharacter','applyBattlePartySwitchCooldown','currentSymbol','push','requiredPartyMemberIcon','gradientFillRect','right','isSceneGridTactics','isRightInputMode','faceName','addCustomCommands','setText','_forcedBattleGridTactics','findSymbol','Game_Party_reserveMembers_FP','getInputButtonString','BgFilename2','onBattleStart','Game_Battler_regenerateAll','setup','_spriteset','_target','_inputting','isAppeared','initPartySystem','makeActions','updateTargetsForPartySwitch','close','createPartyCommandWindowBattleCore','sprite','LockIcon','isTpb','VisuMZ_2_BattleSystemPTB','actorId','toUpperCase','ReservePartyWindowRect','create','VisuMZ_2_BattleSystemOTB','RequireIcon','drawParamName','removePartyCommand','buttonAssistText1','ActivePartyLabelBgType','isEnabled','refresh','7234857bhAOFE','padding','_logWindow','Window_PartyCommand_updateHelp','changeTextColor','allowEarlySwapOrderBreak','Game_Party_allMembers_FP','regenerateAll','20ULJVjU','placeBasicGauges','createBackground','reserveParty','rawBattleMembers','hasBattleSystemIncompatibilities','lineHeight','loadFace','73366AxOKMA','createInnerSprite','VisuMZ_2_BattleSystemETB','loadPartyImages','scaleSprite','bind','#%1','battlePartySwitchCmdHelp','activePartyWindowRect','VisuMZ_1_BattleCore','deselect','remove','_rowThickness','cancel','parse','isShiftRemoveShortcutEnabled','trim','MoveActorsToActive','Game_Party_swapOrder','_currentActor','smoothSelect','drawSvActor','isPartyCommandAdded','mapId','drawItemImage','isPlaytest','rearrangePartyActors','createPageButtons','createStatusLabel','maxBattleMembers','updateHelp','itemRectWithPadding','dimColor2','itemPadding','filter','VisuMZ_0_CoreEngine','isAutosaveEnabled','addActorToBattleMembers','removeActorFromBattleMembers','changeMaxBattleMembers','ReserveCol','_tpbSceneChangeCacheActor','cursorUp','isQueueFormationMenu','undecided','AssistSwapPosition','updatePadding','constructor','faceHeight','buttonAssistKey3','width','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','Game_Party_initialize'];_0x5e89=function(){return _0x558dfb;};return _0x5e89();}