//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.13] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
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
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
 *
 * ---
 * 
 * VisuMZ_3_ActiveChainSkills
 * 
 * Boosts now carry over across the entire chain and granting bonuses to all
 * chained skills instead of just the first skill of the chain. The bonus
 * effects of the boosts will end when the chains end.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Sealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost{text}         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0{text}        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x{text}      The text inside the brackets will only appear if at
 *                      least x Boosts are used. In battle use only!
 * 
 * \boost>x{text}       The text inside the brackets will only appear if more
 *                      than x Boosts are used. In battle use only!
 * 
 * \boost=x{text}       The text inside the brackets will only appear if
 *                      exactly x Boosts are used. In battle use only!
 * 
 * \boost<x{text}       The text inside the brackets will only appear if less
 *                      than x Boosts are used. In battle use only!
 * 
 * \boost<=x{text}      The text inside the brackets will only appear if at
 *                      most x Boosts are used. In battle use only!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - This is used for on boost.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - This is used for on boost.
 * 
 *   Repeat Animation?:
 *   - Repeat boost animation played?
 *   - Only repeated during command input.
 * 
 *     Repeat Cycle:
 *     - How many frames to wait between each animation?
 *     - 60 frames = 1 second.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation when repeated?
 *     - Overrides on boost Mirror setting.
 * 
 *     Mute Animation:
 *     - Mute the effect animation when repeated?
 *     - Overrides on boost Mute setting.
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.13: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug that would cause Boost Points to not work properly. Fix made
 *    by Arisu.
 * 
 * Version 1.12: April 17, 2025
 * * Compatibility Update!
 * ** Better compatibility with Message Core's wordwrap.
 * * Documentation Update!
 * ** The follow text codes now have added notes to them:
 * *** \boost>=x[text]
 * *** \boost>x[text]
 * *** \boost=x[text]
 * *** \boost<x[text]
 * *** \boost<=x[text]
 * **** Added note: In battle use only!
 * * Feature Update!
 * ** \boost=0[x] now functions the same as \boost0[x] and does not require
 *    being in battle. Update made by Arisu.
 * 
 * Version 1.11: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Mechanics > Boost Animations > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Mute Animation
 * **** Mirror/Mute the effect animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat Animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat > Repeat Cycle
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mute Animation
 * **** Allows repeating animations while boosted and inputting.
 * **** Only repeated during command input.
 * 
 * Version 1.10: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where boost would cause softlocks in certain menus. Fix made
 *    by Olivia.
 * 
 * Version 1.09: March 14, 2024
 * * Feature Update!
 * ** Removed VisuMZ_1_MessageCore dependency.
 * 
 * Version 1.08: October 12, 2023
 * * Documentation Update!
 * ** Fixed a typo found within a notetag:
 * *** <Boost Stealed> should be <Boost Sealed>.
 * **** That is some massive Engrish there, Olivia.
 * ***** Don't sneak these kinds of comments in. They're not funny.
 * 
 * Version 1.07: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles. Update made by Olivia.
 * 
 * Version 1.06: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a crash that would occur with <Seal Attack> notetag on any actor
 *    that focuses on auto-battle. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added better compatibility with Active Chain Skills. Boosts now carry
 *    over across the entire chain and granting bonuses to all chained skills
 *    instead of just the first skill of the chain. The bonus effects of the
 *    boosts will end when the chains end.
 * * Documentation Update!
 * ** Added section to "VisuStella MZ Compatibility"
 * *** VisuMZ_3_ActiveChainSkills
 * **** Boosts now carry over across the entire chain and granting bonuses to
 *      all chained skills instead of just the first skill of the chain. The
 *      bonus effects of the boosts will end when the chains end.
 * 
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
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
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 *
 * @param BoostAniMirror:eval
 * @text Mirror Animation
 * @parent Animations
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param BoostAniMute:eval
 * @text Mute Animation
 * @parent Animations
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param RepeatBoostAni:eval
 * @text Repeat Animation?
 * @parent Animations
 * @type boolean
 * @on Repeat
 * @off Single
 * @desc Repeat boost animation played?
 * Only repeated during command input.
 * @default false
 * 
 * @param RepeatAniCycle:num
 * @text Repeat Cycle
 * @parent RepeatBoostAni:eval
 * @desc How many frames to wait between each animation?
 * 60 frames = 1 second.
 * @default 120
 *
 * @param RepeatAniMirror:eval
 * @text Mirror Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation when repeated?
 * Overrides on boost Mirror setting.
 * @default false
 *
 * @param RepeatAniMute:eval
 * @text Mute Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation when repeated?
 * Overrides on boost Mute setting.
 * @default true
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

function _0x5d0d(_0x5cca4d,_0xc0d317){const _0x2fbad2=_0x2fba();return _0x5d0d=function(_0x5d0d6c,_0x4d6f89){_0x5d0d6c=_0x5d0d6c-0x1b2;let _0x7f0114=_0x2fbad2[_0x5d0d6c];return _0x7f0114;},_0x5d0d(_0x5cca4d,_0xc0d317);}const _0x44a3b8=_0x5d0d;(function(_0x260131,_0x497b0e){const _0x51e2cc=_0x5d0d,_0x12754b=_0x260131();while(!![]){try{const _0xaca638=parseInt(_0x51e2cc(0x2d7))/0x1*(-parseInt(_0x51e2cc(0x2ee))/0x2)+parseInt(_0x51e2cc(0x1dc))/0x3+parseInt(_0x51e2cc(0x23b))/0x4*(-parseInt(_0x51e2cc(0x248))/0x5)+parseInt(_0x51e2cc(0x300))/0x6+parseInt(_0x51e2cc(0x1e4))/0x7*(parseInt(_0x51e2cc(0x1cd))/0x8)+parseInt(_0x51e2cc(0x216))/0x9+parseInt(_0x51e2cc(0x22d))/0xa;if(_0xaca638===_0x497b0e)break;else _0x12754b['push'](_0x12754b['shift']());}catch(_0xc2a30e){_0x12754b['push'](_0x12754b['shift']());}}}(_0x2fba,0x3da82));var label=_0x44a3b8(0x1ee),tier=tier||0x0,dependencies=[_0x44a3b8(0x271),_0x44a3b8(0x230),'VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x44a3b8(0x1f6)](function(_0x2452a1){const _0x21dab5=_0x44a3b8;return _0x2452a1[_0x21dab5(0x202)]&&_0x2452a1['description'][_0x21dab5(0x2f5)]('['+label+']');})[0x0];VisuMZ[label][_0x44a3b8(0x2e2)]=VisuMZ[label][_0x44a3b8(0x2e2)]||{},VisuMZ[_0x44a3b8(0x1b4)]=function(_0x2363f2,_0x50f55d){const _0x27ebfc=_0x44a3b8;for(const _0x553727 in _0x50f55d){if(_0x553727['match'](/(.*):(.*)/i)){const _0x257272=String(RegExp['$1']),_0x3dce62=String(RegExp['$2'])[_0x27ebfc(0x301)]()[_0x27ebfc(0x2c1)]();let _0xdcf0bc,_0x288f83,_0x21f7ec;switch(_0x3dce62){case _0x27ebfc(0x1e9):_0xdcf0bc=_0x50f55d[_0x553727]!==''?Number(_0x50f55d[_0x553727]):0x0;break;case _0x27ebfc(0x201):_0x288f83=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):[],_0xdcf0bc=_0x288f83[_0x27ebfc(0x229)](_0x362f53=>Number(_0x362f53));break;case'EVAL':_0xdcf0bc=_0x50f55d[_0x553727]!==''?eval(_0x50f55d[_0x553727]):null;break;case'ARRAYEVAL':_0x288f83=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):[],_0xdcf0bc=_0x288f83[_0x27ebfc(0x229)](_0x588ac4=>eval(_0x588ac4));break;case _0x27ebfc(0x293):_0xdcf0bc=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):'';break;case'ARRAYJSON':_0x288f83=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):[],_0xdcf0bc=_0x288f83[_0x27ebfc(0x229)](_0x2b7617=>JSON[_0x27ebfc(0x245)](_0x2b7617));break;case _0x27ebfc(0x256):_0xdcf0bc=_0x50f55d[_0x553727]!==''?new Function(JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727])):new Function('return\x200');break;case _0x27ebfc(0x213):_0x288f83=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):[],_0xdcf0bc=_0x288f83[_0x27ebfc(0x229)](_0x18eebd=>new Function(JSON[_0x27ebfc(0x245)](_0x18eebd)));break;case _0x27ebfc(0x20a):_0xdcf0bc=_0x50f55d[_0x553727]!==''?String(_0x50f55d[_0x553727]):'';break;case _0x27ebfc(0x244):_0x288f83=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):[],_0xdcf0bc=_0x288f83[_0x27ebfc(0x229)](_0x2d0ab4=>String(_0x2d0ab4));break;case _0x27ebfc(0x1bf):_0x21f7ec=_0x50f55d[_0x553727]!==''?JSON['parse'](_0x50f55d[_0x553727]):{},_0xdcf0bc=VisuMZ['ConvertParams']({},_0x21f7ec);break;case _0x27ebfc(0x257):_0x288f83=_0x50f55d[_0x553727]!==''?JSON[_0x27ebfc(0x245)](_0x50f55d[_0x553727]):[],_0xdcf0bc=_0x288f83['map'](_0x3b11ec=>VisuMZ[_0x27ebfc(0x1b4)]({},JSON[_0x27ebfc(0x245)](_0x3b11ec)));break;default:continue;}_0x2363f2[_0x257272]=_0xdcf0bc;}}return _0x2363f2;},(_0x204894=>{const _0x1d2877=_0x44a3b8,_0x5104de=_0x204894['name'];for(const _0x51f7f1 of dependencies){if(!Imported[_0x51f7f1]){alert(_0x1d2877(0x23c)[_0x1d2877(0x2d5)](_0x5104de,_0x51f7f1)),SceneManager[_0x1d2877(0x27e)]();break;}}const _0x3e56f8=_0x204894[_0x1d2877(0x2e9)];if(_0x3e56f8[_0x1d2877(0x2c2)](/\[Version[ ](.*?)\]/i)){const _0x2c0dab=Number(RegExp['$1']);_0x2c0dab!==VisuMZ[label][_0x1d2877(0x292)]&&(alert(_0x1d2877(0x203)[_0x1d2877(0x2d5)](_0x5104de,_0x2c0dab)),SceneManager[_0x1d2877(0x27e)]());}if(_0x3e56f8[_0x1d2877(0x2c2)](/\[Tier[ ](\d+)\]/i)){const _0x3ea1ae=Number(RegExp['$1']);_0x3ea1ae<tier?(alert(_0x1d2877(0x1d9)[_0x1d2877(0x2d5)](_0x5104de,_0x3ea1ae,tier)),SceneManager[_0x1d2877(0x27e)]()):tier=Math[_0x1d2877(0x28f)](_0x3ea1ae,tier);}VisuMZ[_0x1d2877(0x1b4)](VisuMZ[label][_0x1d2877(0x2e2)],_0x204894[_0x1d2877(0x2cf)]);})(pluginData),VisuMZ[_0x44a3b8(0x1ee)]['RegExp']={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager[_0x44a3b8(0x298)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI'][_0x44a3b8(0x1c5)],ImageManager[_0x44a3b8(0x238)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI'][_0x44a3b8(0x23e)],ImageManager[_0x44a3b8(0x2b0)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI']['SmoothIcons'],ImageManager[_0x44a3b8(0x1c0)]=function(){const _0x36ce10=_0x44a3b8;if(!this[_0x36ce10(0x249)]){this[_0x36ce10(0x249)]=new Bitmap();const _0x453c74=ImageManager[_0x36ce10(0x279)](_0x36ce10(0x1c3));_0x453c74[_0x36ce10(0x304)](this['boostTransferBitmap']['bind'](this,_0x453c74));}return this[_0x36ce10(0x249)];},ImageManager[_0x44a3b8(0x24a)]=function(_0x19fea9){const _0x265552=_0x44a3b8;this[_0x265552(0x249)][_0x265552(0x2bb)](_0x19fea9[_0x265552(0x29c)],_0x19fea9['height']),this[_0x265552(0x249)][_0x265552(0x24f)](_0x19fea9,0x0,0x0,_0x19fea9[_0x265552(0x29c)],_0x19fea9['height'],0x0,0x0),this[_0x265552(0x249)][_0x265552(0x1b5)]=ImageManager[_0x265552(0x2b0)],this[_0x265552(0x249)][_0x265552(0x2fe)]=![];},TextManager[_0x44a3b8(0x20c)]=VisuMZ['BoostAction']['Settings']['UI'][_0x44a3b8(0x2f7)],TextManager[_0x44a3b8(0x2e8)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI'][_0x44a3b8(0x2dc)],VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x25d)]=BattleManager[_0x44a3b8(0x251)],BattleManager[_0x44a3b8(0x251)]=function(_0x3fb7a4,_0x449c62,_0x425e31){const _0x53e3e9=_0x44a3b8;VisuMZ['BoostAction'][_0x53e3e9(0x25d)]['call'](this,_0x3fb7a4,_0x449c62,_0x425e31),$gameParty[_0x53e3e9(0x1c8)](),$gameTroop[_0x53e3e9(0x1c8)]();},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2de)]=BattleManager['processTurn'],BattleManager[_0x44a3b8(0x2f9)]=function(){const _0x4ac83f=_0x44a3b8;this['processEnemyUseBoost'](),VisuMZ[_0x4ac83f(0x1ee)]['BattleManager_processTurn'][_0x4ac83f(0x2d4)](this);},BattleManager[_0x44a3b8(0x1ca)]=function(){const _0xfe5dc6=_0x44a3b8;var _0x4750ae=this[_0xfe5dc6(0x275)],_0x7b9515=_0x4750ae[_0xfe5dc6(0x2be)]();!!_0x4750ae&&_0x4750ae[_0xfe5dc6(0x27f)]()&&!!_0x7b9515&&_0x7b9515[_0xfe5dc6(0x2c6)]()&&_0x4750ae[_0xfe5dc6(0x2c0)]()>0x0&&!_0x4750ae['isBoostSealed']()&&_0x4750ae[_0xfe5dc6(0x2da)](_0x7b9515[_0xfe5dc6(0x1e6)]());},BattleManager[_0x44a3b8(0x2d9)]=function(){const _0x521504=_0x44a3b8;if(Imported[_0x521504(0x27b)]&&this[_0x521504(0x2bd)]())return![];return!![];},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x232)]=Game_Action[_0x44a3b8(0x281)][_0x44a3b8(0x26b)],Game_Action[_0x44a3b8(0x281)][_0x44a3b8(0x26b)]=function(){const _0x104bfa=_0x44a3b8;var _0x4ad0f4=VisuMZ[_0x104bfa(0x1ee)][_0x104bfa(0x232)][_0x104bfa(0x2d4)](this);_0x4ad0f4=this[_0x104bfa(0x2c5)](_0x4ad0f4);return Math[_0x104bfa(0x253)](_0x4ad0f4);;},Game_Action[_0x44a3b8(0x281)]['applyBoostPointRepeats']=function(_0x2613c9){const _0x1db303=_0x44a3b8,_0x44a4c3=VisuMZ['BoostAction'][_0x1db303(0x265)];if(!!this['subject']()&&!!this[_0x1db303(0x1e6)]()&&this[_0x1db303(0x1e6)]()[_0x1db303(0x1c9)][_0x1db303(0x2c2)](_0x44a4c3[_0x1db303(0x1f5)])){var _0x218e29=this[_0x1db303(0x283)]()[_0x1db303(0x287)](_0x1db303(0x303));_0x2613c9=Math['round'](_0x2613c9*_0x218e29),_0x2613c9+=this['subject']()[_0x1db303(0x29b)](_0x1db303(0x303));}return _0x2613c9;},VisuMZ['BoostAction']['Game_Action_applyGuard']=Game_Action['prototype'][_0x44a3b8(0x2a5)],Game_Action[_0x44a3b8(0x281)][_0x44a3b8(0x2a5)]=function(_0x560ca9,_0x88662d){const _0x19be5f=_0x44a3b8;return _0x560ca9=this['applyBoostPointDamage'](_0x560ca9),VisuMZ[_0x19be5f(0x1ee)][_0x19be5f(0x2af)][_0x19be5f(0x2d4)](this,_0x560ca9,_0x88662d);},Game_Action[_0x44a3b8(0x281)][_0x44a3b8(0x2dd)]=function(_0x23b40b){const _0x44320e=_0x44a3b8,_0x1182ea=VisuMZ['BoostAction']['RegExp'];if(!!this[_0x44320e(0x283)]()&&this[_0x44320e(0x1e6)]()[_0x44320e(0x1c9)][_0x44320e(0x2c2)](_0x1182ea['BoostDamage'])){var _0x3e7d47=this[_0x44320e(0x283)]()[_0x44320e(0x287)](_0x44320e(0x2ec));_0x23b40b=Math[_0x44320e(0x253)](_0x23b40b*_0x3e7d47),_0x23b40b+=this[_0x44320e(0x283)]()[_0x44320e(0x29b)]('Damage');}return _0x23b40b;},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x28e)]=Game_Action[_0x44a3b8(0x281)]['apply'],Game_Action[_0x44a3b8(0x281)][_0x44a3b8(0x2c8)]=function(_0x3fea2a){const _0x33ca82=_0x44a3b8;this[_0x33ca82(0x252)](![]),VisuMZ[_0x33ca82(0x1ee)]['Game_Action_apply'][_0x33ca82(0x2d4)](this,_0x3fea2a),this[_0x33ca82(0x252)](!![]);},Game_Action['prototype'][_0x44a3b8(0x252)]=function(_0x3ae9eb){const _0x28142f=_0x44a3b8,_0x56d71c=VisuMZ[_0x28142f(0x1ee)]['RegExp'];if(!!this[_0x28142f(0x283)]()&&this[_0x28142f(0x1e6)]()[_0x28142f(0x1c9)]['match'](_0x56d71c[_0x28142f(0x261)])){var _0x261516=this[_0x28142f(0x283)]()[_0x28142f(0x287)]('Turn');$gameTemp[_0x28142f(0x2ea)]=_0x261516,$gameTemp[_0x28142f(0x2fa)]=this['subject']()[_0x28142f(0x29b)]('Turn');}_0x3ae9eb&&($gameTemp[_0x28142f(0x2ea)]=undefined,$gameTemp[_0x28142f(0x2fa)]=undefined);},VisuMZ['BoostAction'][_0x44a3b8(0x1c2)]=Game_Action[_0x44a3b8(0x281)]['applyItemUserEffect'],Game_Action[_0x44a3b8(0x281)]['applyItemUserEffect']=function(_0x537be6){const _0x4d64e2=_0x44a3b8;VisuMZ[_0x4d64e2(0x1ee)][_0x4d64e2(0x1c2)][_0x4d64e2(0x2d4)](this,_0x537be6),this[_0x4d64e2(0x205)](_0x537be6);},Game_Action[_0x44a3b8(0x281)][_0x44a3b8(0x205)]=function(_0x54c835){const _0x3259d2=_0x44a3b8,_0x435da2=VisuMZ['BoostAction'][_0x3259d2(0x265)];if(!!_0x54c835&&this[_0x3259d2(0x1e6)]()[_0x3259d2(0x1c9)]['match'](_0x435da2['TargetBoostPoints'])){var _0x1b3b81=parseInt(RegExp['$1']);this[_0x3259d2(0x1e6)]()[_0x3259d2(0x1c9)][_0x3259d2(0x2c2)](_0x435da2[_0x3259d2(0x2bc)])&&(_0x1b3b81=Math[_0x3259d2(0x253)](this[_0x3259d2(0x283)]()[_0x3259d2(0x287)]('BP\x20Effect')*_0x1b3b81),_0x1b3b81+=this[_0x3259d2(0x283)]()[_0x3259d2(0x29b)](_0x3259d2(0x2e1))),_0x54c835['gainStoredBoostPoints'](_0x1b3b81);}if(!!this[_0x3259d2(0x283)]()&&this[_0x3259d2(0x1e6)]()['note'][_0x3259d2(0x2c2)](_0x435da2[_0x3259d2(0x28c)])){var _0x1b3b81=parseInt(RegExp['$1']);this[_0x3259d2(0x1e6)]()[_0x3259d2(0x1c9)][_0x3259d2(0x2c2)](_0x435da2[_0x3259d2(0x2bc)])&&(_0x1b3b81=Math[_0x3259d2(0x253)](this['subject']()[_0x3259d2(0x287)](_0x3259d2(0x2e1))*_0x1b3b81),_0x1b3b81+=this[_0x3259d2(0x283)]()['boostAddition']('BP\x20Effect')),this[_0x3259d2(0x283)]()[_0x3259d2(0x2f0)](_0x1b3b81);}},Game_BattlerBase['BOOST_POINTS_MAX_STORED']=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)]['MaxStored'],Game_BattlerBase[_0x44a3b8(0x1b7)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['Mechanics'][_0x44a3b8(0x1d3)],Game_BattlerBase['BOOST_POINTS_DEATH_REGEN']=VisuMZ['BoostAction'][_0x44a3b8(0x2e2)]['Mechanics'][_0x44a3b8(0x2ab)],Game_BattlerBase[_0x44a3b8(0x2a8)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['Mechanics'][_0x44a3b8(0x214)],Game_BattlerBase[_0x44a3b8(0x2c7)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x1c4)],Game_BattlerBase[_0x44a3b8(0x211)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['Mechanics'][_0x44a3b8(0x1f9)],Game_BattlerBase['BOOST_POINTS_START_BATTLE']=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x2c3)],VisuMZ['BoostAction'][_0x44a3b8(0x1b9)]=Game_BattlerBase[_0x44a3b8(0x281)]['initialize'],Game_BattlerBase[_0x44a3b8(0x281)]['initialize']=function(){const _0x16f6d3=_0x44a3b8;VisuMZ[_0x16f6d3(0x1ee)][_0x16f6d3(0x1b9)]['call'](this),this['initBoostAction']();},Game_BattlerBase[_0x44a3b8(0x281)][_0x44a3b8(0x2e7)]=function(){const _0x22c957=_0x44a3b8;this[_0x22c957(0x200)]=this[_0x22c957(0x200)]||0x0,this[_0x22c957(0x2f4)]=this['_toUseBoostPoints']||0x0,this[_0x22c957(0x2a3)]=this['_turnUsedBoostPoints']||0x0;},Game_BattlerBase[_0x44a3b8(0x281)][_0x44a3b8(0x2c0)]=function(){return this['_storedBoostPoints']===undefined&&this['initBoostAction'](),this['_storedBoostPoints'];},Game_BattlerBase[_0x44a3b8(0x281)][_0x44a3b8(0x1cf)]=function(_0x3c6337){const _0x35b55b=_0x44a3b8;this[_0x35b55b(0x200)]===undefined&&this['initBoostAction'](),_0x3c6337=Math[_0x35b55b(0x253)](_0x3c6337),this['_storedBoostPoints']=_0x3c6337[_0x35b55b(0x2bf)](0x0,Game_BattlerBase[_0x35b55b(0x2ac)]),this['refresh']();},Game_BattlerBase[_0x44a3b8(0x281)][_0x44a3b8(0x1ec)]=function(){const _0x3e031e=_0x44a3b8;if(!$gameParty['inBattle']())return 0x0;return this[_0x3e031e(0x2f4)]===undefined&&this[_0x3e031e(0x2e7)](),this[_0x3e031e(0x2f4)];},Game_BattlerBase[_0x44a3b8(0x281)][_0x44a3b8(0x2e6)]=function(_0x45e983){const _0x22bfbf=_0x44a3b8;this[_0x22bfbf(0x2f4)]===undefined&&this[_0x22bfbf(0x2e7)](),_0x45e983=Math[_0x22bfbf(0x253)](_0x45e983),this['_toUseBoostPoints']=_0x45e983[_0x22bfbf(0x2bf)](0x0,Game_BattlerBase[_0x22bfbf(0x1b7)]),this['refresh']();},Game_BattlerBase[_0x44a3b8(0x281)]['boostPointsRegenValue']=function(){const _0x5d376c=_0x44a3b8;if(!Game_BattlerBase[_0x5d376c(0x23f)]&&(this[_0x5d376c(0x2a2)]()||this[_0x5d376c(0x22b)]()))return 0x0;else{var _0x1adab9=Game_BattlerBase[_0x5d376c(0x211)];return _0x1adab9=this[_0x5d376c(0x2a7)](_0x1adab9),_0x1adab9=this[_0x5d376c(0x2eb)](_0x1adab9),_0x1adab9;}},Game_BattlerBase['prototype']['isBoostSealed']=function(){const _0x3e1b7f=_0x44a3b8,_0x5f01fd=this['traitObjects'](),_0x80f644=VisuMZ[_0x3e1b7f(0x1ee)]['RegExp'];return _0x5f01fd[_0x3e1b7f(0x22f)](_0x3961d1=>_0x3961d1&&_0x3961d1[_0x3e1b7f(0x1c9)][_0x3e1b7f(0x2c2)](_0x80f644[_0x3e1b7f(0x1fb)]));},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x1d1)]=Game_BattlerBase['prototype'][_0x44a3b8(0x228)],Game_BattlerBase['prototype'][_0x44a3b8(0x228)]=function(_0x1e0bdf){const _0x9606dc=_0x44a3b8;var _0x3d20e6=this[_0x9606dc(0x1f4)][_0x1e0bdf]||0x0;VisuMZ[_0x9606dc(0x1ee)][_0x9606dc(0x1d1)][_0x9606dc(0x2d4)](this,_0x1e0bdf);if(!!$gameTemp[_0x9606dc(0x2ea)]){$gameTemp[_0x9606dc(0x2fa)]=$gameTemp['_bpTurnFlat']||0x0;var _0x864c62=$dataStates[_0x1e0bdf],_0x1bea71=Math['round'](_0x864c62['maxTurns']*$gameTemp['_bpTurnRate'])+$gameTemp[_0x9606dc(0x2fa)],_0x5bbd23=Math[_0x9606dc(0x253)](_0x864c62['minTurns']*$gameTemp[_0x9606dc(0x2ea)])+$gameTemp[_0x9606dc(0x2fa)],_0x1298bb=0x1+Math[_0x9606dc(0x28f)](_0x1bea71-_0x5bbd23,0x0);const _0x30fdce=this[_0x9606dc(0x221)](_0x864c62)[_0x9606dc(0x2b2)]()[_0x9606dc(0x2c1)]();switch(_0x30fdce){case'reset':this[_0x9606dc(0x1f4)][_0x1e0bdf]=_0x5bbd23+Math[_0x9606dc(0x2b1)](_0x1298bb);break;case _0x9606dc(0x20d):const _0x32ec53=this[_0x9606dc(0x1f4)][_0x1e0bdf],_0x1fb7bb=_0x5bbd23+Math[_0x9606dc(0x2b1)](_0x1298bb);this[_0x9606dc(0x1f4)][_0x1e0bdf]=Math[_0x9606dc(0x28f)](_0x32ec53,_0x1fb7bb);break;case _0x9606dc(0x254):this[_0x9606dc(0x1f4)][_0x1e0bdf]=_0x5bbd23+Math[_0x9606dc(0x2b1)](_0x1298bb)+_0x3d20e6;break;}}},VisuMZ[_0x44a3b8(0x1ee)]['Game_BattlerBase_meetsUsableItemConditions']=Game_BattlerBase[_0x44a3b8(0x281)]['meetsUsableItemConditions'],Game_BattlerBase[_0x44a3b8(0x281)]['meetsUsableItemConditions']=function(_0x238a5f){const _0x54cbbb=_0x44a3b8;return VisuMZ[_0x54cbbb(0x1ee)][_0x54cbbb(0x274)][_0x54cbbb(0x2d4)](this,_0x238a5f)?this['meetstoUseBoostPointsRequirement'](_0x238a5f):![];},Game_BattlerBase['prototype'][_0x44a3b8(0x242)]=function(_0x1d8c4c){const _0x32e462=_0x44a3b8,_0x58482a=VisuMZ[_0x32e462(0x1ee)]['RegExp'];var _0x417b95=_0x1d8c4c[_0x32e462(0x1c9)];if(_0x417b95[_0x32e462(0x2c2)](_0x58482a[_0x32e462(0x1d7)][_0x32e462(0x2a6)])||_0x417b95[_0x32e462(0x2c2)](_0x58482a[_0x32e462(0x1d7)][_0x32e462(0x1d0)])){var _0x510049=parseInt(RegExp['$1']);return this[_0x32e462(0x235)]()?this['toUseBoostPoints']()>=_0x510049:this[_0x32e462(0x2c0)]()>=_0x510049;}else{if(_0x1d8c4c['note'][_0x32e462(0x2c2)](_0x58482a[_0x32e462(0x1d7)][_0x32e462(0x1d0)])){var _0x510049=parseInt(RegExp['$1']);return this[_0x32e462(0x235)]()?this[_0x32e462(0x1ec)]()>_0x510049:this['storedBoostPoints']()>_0x510049;}else{if(_0x1d8c4c['note'][_0x32e462(0x2c2)](_0x58482a[_0x32e462(0x1d7)][_0x32e462(0x28d)])){var _0x510049=parseInt(RegExp['$1']);return this['isActor']()?this['toUseBoostPoints']()===_0x510049:this[_0x32e462(0x2c0)]()===_0x510049;}else{if(_0x1d8c4c['note']['match'](_0x58482a[_0x32e462(0x1d7)]['Less'])){var _0x510049=parseInt(RegExp['$1']);return this[_0x32e462(0x235)]()?this[_0x32e462(0x1ec)]()<_0x510049:this['storedBoostPoints']()<_0x510049;}else{if(_0x1d8c4c[_0x32e462(0x1c9)][_0x32e462(0x2c2)](_0x58482a[_0x32e462(0x1d7)][_0x32e462(0x222)])){var _0x510049=parseInt(RegExp['$1']);return this[_0x32e462(0x235)]()?this[_0x32e462(0x1ec)]()<=_0x510049:this[_0x32e462(0x2c0)]()<=_0x510049;}else return!![];}}}}},Game_Battler[_0x44a3b8(0x2ca)]={'Damage':VisuMZ['BoostAction'][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x266)],'Turn':VisuMZ['BoostAction'][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x1ba)],'Repeat':VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)]['RepeatMultiply'],'BpEffect':VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x243)],'Analyze':VisuMZ['BoostAction']['Settings'][_0x44a3b8(0x1c6)][_0x44a3b8(0x269)]},Game_Battler['BOOST_POINTS_ADDITION']={'Damage':VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['Mechanics']['DmgAddition'],'Turn':VisuMZ['BoostAction'][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x1d8)],'Repeat':VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)]['RepeatAddition'],'BpEffect':VisuMZ[_0x44a3b8(0x1ee)]['Settings'][_0x44a3b8(0x1c6)][_0x44a3b8(0x294)],'Analyze':VisuMZ[_0x44a3b8(0x1ee)]['Settings'][_0x44a3b8(0x1c6)][_0x44a3b8(0x2cb)]},Game_Battler[_0x44a3b8(0x1da)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)]['Animations'],Game_Battler['prototype']['gainStoredBoostPoints']=function(_0x2e376d){const _0x504ad5=_0x44a3b8;this[_0x504ad5(0x1cf)](this[_0x504ad5(0x2c0)]()+_0x2e376d);},Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x26a)]=function(_0x4a13ad){const _0x27c4d4=_0x44a3b8;this[_0x27c4d4(0x2e6)](this['toUseBoostPoints']()+_0x4a13ad);},Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x287)]=function(_0x4a6b96){const _0x420d30=_0x44a3b8,_0x53e1be=Game_Battler[_0x420d30(0x2ca)];if(_0x4a6b96[_0x420d30(0x2c2)](/Damage/i))var _0x5cc0f7=_0x53e1be['Damage'];else{if(_0x4a6b96[_0x420d30(0x2c2)](/Turn/i))var _0x5cc0f7=_0x53e1be[_0x420d30(0x268)];else{if(_0x4a6b96[_0x420d30(0x2c2)](/Repeat/i))var _0x5cc0f7=_0x53e1be[_0x420d30(0x303)];else{if(_0x4a6b96[_0x420d30(0x2c2)](/BP Effect/i))var _0x5cc0f7=_0x53e1be[_0x420d30(0x2d3)];else{if(_0x4a6b96[_0x420d30(0x2c2)](/Analyze/i))var _0x5cc0f7=_0x53e1be[_0x420d30(0x2d8)];else return this[_0x420d30(0x1ec)]();}}}}var _0x4cfc4b=this[_0x420d30(0x1ec)]();return _0x5cc0f7[_0x4cfc4b]||_0x5cc0f7[0x0];},Game_Battler[_0x44a3b8(0x281)]['boostAddition']=function(_0x3a1230){const _0x500ec1=_0x44a3b8,_0x571f65=Game_Battler[_0x500ec1(0x278)];if(_0x3a1230['match'](/Damage/i))var _0x4da750=_0x571f65[_0x500ec1(0x2ec)];else{if(_0x3a1230[_0x500ec1(0x2c2)](/Turn/i))var _0x4da750=_0x571f65[_0x500ec1(0x268)];else{if(_0x3a1230[_0x500ec1(0x2c2)](/Repeat/i))var _0x4da750=_0x571f65['Repeat'];else{if(_0x3a1230[_0x500ec1(0x2c2)](/BP Effect/i))var _0x4da750=_0x571f65[_0x500ec1(0x2d3)];else{if(_0x3a1230['match'](/Analyze/i))var _0x4da750=_0x571f65['Analyze'];else return this['toUseBoostPoints']();}}}}var _0x116a93=this[_0x500ec1(0x1ec)]();return parseInt(_0x4da750[_0x116a93]||_0x4da750[0x0]);},Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x1c8)]=function(){const _0x245223=_0x44a3b8;if(this['_previousBattleChainBoostActions']){this[_0x245223(0x1e1)]=undefined;return;}var _0x2ca580=Game_BattlerBase[_0x245223(0x24b)];_0x2ca580=this[_0x245223(0x1d5)](_0x2ca580),_0x2ca580=this[_0x245223(0x1fe)](_0x2ca580),_0x2ca580=Math[_0x245223(0x253)](_0x2ca580),this[_0x245223(0x1cf)](_0x2ca580);},Game_Battler[_0x44a3b8(0x281)]['setupBattleBoostPointsMultiplier']=function(_0xfb246a){const _0x2f2b6a=_0x44a3b8,_0xe01d63=this[_0x2f2b6a(0x2ae)](),_0x458e5a=VisuMZ[_0x2f2b6a(0x1ee)][_0x2f2b6a(0x265)];for(const _0x487ee6 of _0xe01d63){if(!_0x487ee6)continue;_0x487ee6[_0x2f2b6a(0x1c9)]['match'](_0x458e5a[_0x2f2b6a(0x2b4)])&&(_0xfb246a*=Number(RegExp['$1'])*0.01);}return _0xfb246a;},Game_Battler['prototype']['setupBattleBoostPointsAdded']=function(_0x530fc1){const _0x5a4464=_0x44a3b8,_0x31fd06=this[_0x5a4464(0x2ae)](),_0x1a12fc=VisuMZ['BoostAction'][_0x5a4464(0x265)];for(const _0x130b8b of _0x31fd06){if(!_0x130b8b)continue;_0x130b8b[_0x5a4464(0x1c9)][_0x5a4464(0x2c2)](_0x1a12fc[_0x5a4464(0x288)])&&(_0x530fc1+=Number(RegExp['$1']));}return _0x530fc1;},Game_Battler['prototype']['startChangeBoostPointsAnimation']=function(_0x447937){const _0xcc7925=_0x44a3b8;var _0x14056b=this['toUseBoostPoints']()['clamp'](0x0,Game_BattlerBase[_0xcc7925(0x1b7)]);const _0x5cf464=Game_Battler[_0xcc7925(0x1da)];var _0x3b2e4c=Number(_0x5cf464[_0x14056b]||_0x5cf464[0x0]);if(_0x3b2e4c>0x0){const _0x35dd19=VisuMZ['BoostAction'][_0xcc7925(0x2e2)]['Mechanics'],_0x1fd311=_0x447937?_0x35dd19[_0xcc7925(0x2a9)]||![]:_0x35dd19['BoostAniMirror']||![],_0x133082=_0x447937?_0x35dd19[_0xcc7925(0x220)]||![]:_0x35dd19[_0xcc7925(0x1f2)]||![];$gameTemp[_0xcc7925(0x2f8)]([this],_0x3b2e4c,_0x1fd311,_0x133082);}},Game_Battler['prototype']['canUseBoostPoints']=function(){const _0x1ee3fc=_0x44a3b8;if(this['isBoostSealed']())return![];return this[_0x1ee3fc(0x1ec)]()<Game_BattlerBase[_0x1ee3fc(0x1b7)]&&this[_0x1ee3fc(0x2c0)]()>0x0;},Game_Battler[_0x44a3b8(0x281)]['canUndoBoostPoints']=function(){const _0x300fc4=_0x44a3b8;return this[_0x300fc4(0x1ec)]()>0x0;},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x1c1)]=Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2c9)],Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2c9)]=function(){const _0x1bfb8c=_0x44a3b8;VisuMZ['BoostAction'][_0x1bfb8c(0x1c1)][_0x1bfb8c(0x2d4)](this),this[_0x1bfb8c(0x200)]=0x0,this[_0x1bfb8c(0x2f4)]=0x0;},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2a4)]=Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2ef)],Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2ef)]=function(){const _0x1c023c=_0x44a3b8;VisuMZ[_0x1c023c(0x1ee)][_0x1c023c(0x2a4)][_0x1c023c(0x2d4)](this),this[_0x1c023c(0x2d6)]();},VisuMZ['BoostAction'][_0x44a3b8(0x236)]=Game_Battler['prototype'][_0x44a3b8(0x2b6)],Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2b6)]=function(){const _0x233fca=_0x44a3b8;VisuMZ['BoostAction'][_0x233fca(0x236)]['call'](this),Game_BattlerBase[_0x233fca(0x23f)]&&this[_0x233fca(0x2a2)]()&&$gameParty['inBattle']()&&this[_0x233fca(0x2d6)]();},Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2d6)]=function(){const _0x5af7fc=_0x44a3b8;(Game_BattlerBase[_0x5af7fc(0x2c7)]||this[_0x5af7fc(0x2a3)]<=0x0)&&this[_0x5af7fc(0x2f0)](this[_0x5af7fc(0x20b)]()),this[_0x5af7fc(0x2a3)]=0x0;},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x209)]=BattleManager[_0x44a3b8(0x1b2)],BattleManager[_0x44a3b8(0x1b2)]=function(){const _0x8f626a=_0x44a3b8;this['_subject']&&this['_subject'][_0x8f626a(0x2b8)](),VisuMZ[_0x8f626a(0x1ee)][_0x8f626a(0x209)][_0x8f626a(0x2d4)](this);},Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2b8)]=function(){const _0x356ea0=_0x44a3b8;if(Imported[_0x356ea0(0x24c)]&&$gameTemp[_0x356ea0(0x258)]())return;this[_0x356ea0(0x2a3)]+=this['toUseBoostPoints'](),this[_0x356ea0(0x2e6)](0x0);},Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x2a7)]=function(_0x31dc2f){const _0xeaf624=_0x44a3b8,_0x181537=this[_0xeaf624(0x2ae)](),_0x419626=VisuMZ[_0xeaf624(0x1ee)]['RegExp'];for(const _0x3ad27e of _0x181537){if(!_0x3ad27e)continue;_0x3ad27e[_0xeaf624(0x1c9)][_0xeaf624(0x2c2)](_0x419626[_0xeaf624(0x299)])&&(_0x31dc2f*=Number(RegExp['$1'])*0.01);}return _0x31dc2f;},Game_Battler[_0x44a3b8(0x281)]['bpRegenAdded']=function(_0x4e8e57){const _0x2c8220=_0x44a3b8,_0x422803=this[_0x2c8220(0x2ae)](),_0x1ec96d=VisuMZ[_0x2c8220(0x1ee)][_0x2c8220(0x265)];for(const _0x5eba8b of _0x422803){if(!_0x5eba8b)continue;_0x5eba8b['note'][_0x2c8220(0x2c2)](_0x1ec96d[_0x2c8220(0x1eb)])&&(_0x4e8e57+=Number(RegExp['$1']));}return _0x4e8e57;},VisuMZ['BoostAction'][_0x44a3b8(0x208)]=Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x1de)],Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x1de)]=function(_0x5c35ef){const _0x273892=_0x44a3b8;var _0xcbcf5c=this[_0x273892(0x2a2)]();VisuMZ[_0x273892(0x1ee)][_0x273892(0x208)][_0x273892(0x2d4)](this,_0x5c35ef),Game_BattlerBase[_0x273892(0x2a8)]&&!_0xcbcf5c&&this[_0x273892(0x2a2)]()&&this[_0x273892(0x1cf)](0x0);},VisuMZ['BoostAction'][_0x44a3b8(0x2f3)]=Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x1b8)],Game_Battler['prototype'][_0x44a3b8(0x1b8)]=function(_0x3a77ac,_0x42fb7e){const _0x2973e3=_0x44a3b8;!!$gameTemp[_0x2973e3(0x2ea)]&&($gameTemp['_bpTurnFlat']=$gameTemp['_bpTurnFlat']||0x0,_0x42fb7e=Math[_0x2973e3(0x253)]($gameTemp[_0x2973e3(0x2ea)]*_0x42fb7e)+$gameTemp[_0x2973e3(0x2fa)]),VisuMZ[_0x2973e3(0x1ee)][_0x2973e3(0x2f3)][_0x2973e3(0x2d4)](this,_0x3a77ac,_0x42fb7e);},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x1e2)]=Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x273)],Game_Battler[_0x44a3b8(0x281)][_0x44a3b8(0x273)]=function(_0x2e230c,_0x94a19c){const _0x3f6e1a=_0x44a3b8;!!$gameTemp['_bpTurnRate']&&($gameTemp[_0x3f6e1a(0x2fa)]=$gameTemp[_0x3f6e1a(0x2fa)]||0x0,_0x94a19c=Math['round']($gameTemp['_bpTurnRate']*_0x94a19c)+$gameTemp[_0x3f6e1a(0x2fa)]),VisuMZ[_0x3f6e1a(0x1ee)][_0x3f6e1a(0x1e2)]['call'](this,_0x2e230c,_0x94a19c);},Game_Enemy[_0x44a3b8(0x26d)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)][_0x44a3b8(0x1c6)][_0x44a3b8(0x2d1)],VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x210)]=Game_Enemy[_0x44a3b8(0x281)]['setup'],Game_Enemy[_0x44a3b8(0x281)][_0x44a3b8(0x251)]=function(_0x48aa8c,_0x40102e,_0x4df78b){const _0x65869f=_0x44a3b8;VisuMZ[_0x65869f(0x1ee)][_0x65869f(0x210)][_0x65869f(0x2d4)](this,_0x48aa8c,_0x40102e,_0x4df78b),this[_0x65869f(0x26f)]();},Game_Enemy[_0x44a3b8(0x281)]['setupBoostAI']=function(){const _0x23ad5c=_0x44a3b8,_0x2f5d5a=VisuMZ['BoostAction'][_0x23ad5c(0x265)];if(this[_0x23ad5c(0x263)]()[_0x23ad5c(0x237)]===undefined){this[_0x23ad5c(0x263)]()[_0x23ad5c(0x237)]={};var _0x458234=this['enemy']()[_0x23ad5c(0x1c9)][_0x23ad5c(0x2e0)](/[\r\n]+/);for(var _0x411219=0x0;_0x411219<_0x458234[_0x23ad5c(0x1ea)];_0x411219++){var _0x2b8034=_0x458234[_0x411219];if(_0x2b8034[_0x23ad5c(0x2c2)](_0x2f5d5a['EnemyBoostSkillID'])){var _0x19afee=_0x23ad5c(0x1f0)+parseInt(RegExp['$1']),_0x39eac2=String(RegExp['$2'])['toLowerCase']();this[_0x23ad5c(0x263)]()[_0x23ad5c(0x237)][_0x19afee]=_0x39eac2;}else{if(_0x2b8034['match'](_0x2f5d5a[_0x23ad5c(0x295)])){var _0x366bcd=String(RegExp['$1']),_0x39eac2=String(RegExp['$2'])[_0x23ad5c(0x2b2)]();this[_0x23ad5c(0x263)]()[_0x23ad5c(0x237)][_0x366bcd]=_0x39eac2;}}}}},Game_Enemy['prototype']['processtoUseBoostPoints']=function(_0x4b932a){const _0x4bdc79=_0x44a3b8;this[_0x4bdc79(0x26f)]();var _0x235d2a=this['calculateBPtoUse'](_0x4b932a);_0x235d2a>0x0&&(this[_0x4bdc79(0x25a)](_0x235d2a),this[_0x4bdc79(0x240)]());},Game_Enemy['prototype'][_0x44a3b8(0x2f1)]=function(_0x12e0a9){const _0x5728d0=_0x44a3b8;if(this[_0x5728d0(0x2c0)]()<=0x0)return 0x0;var _0x3b31af=_0x12e0a9[_0x5728d0(0x1e8)],_0x2f8a0e=_0x5728d0(0x1f0)+_0x12e0a9['id'],_0x15eb58=0x0;if(this[_0x5728d0(0x263)]()[_0x5728d0(0x237)][_0x3b31af]||this['enemy']()[_0x5728d0(0x237)][_0x2f8a0e]){var _0x37c6a6=this['enemy']()[_0x5728d0(0x237)][_0x3b31af]||this['enemy']()[_0x5728d0(0x237)][_0x2f8a0e];if(_0x37c6a6[_0x5728d0(0x2c2)](/(?:ALL|FULL)/i))_0x15eb58=this[_0x5728d0(0x2c0)]();else{if(_0x37c6a6[_0x5728d0(0x2c2)](/AT LEAST (\d+)/i)){var _0x13867e=parseInt(RegExp['$1']);this[_0x5728d0(0x2c0)]()>=_0x13867e&&(_0x15eb58=this[_0x5728d0(0x2c0)]());}else{if(_0x37c6a6[_0x5728d0(0x2c2)](/AT MOST (\d+)/i)){var _0x13867e=parseInt(RegExp['$1']);this['storedBoostPoints']()<=_0x13867e&&(_0x15eb58=this['storedBoostPoints']());}else{if(_0x37c6a6[_0x5728d0(0x2c2)](/EXACTLY (\d+)/i)){var _0x13867e=parseInt(RegExp['$1']);this[_0x5728d0(0x2c0)]()===_0x13867e&&(_0x15eb58=_0x13867e);}}}}}return _0x15eb58[_0x5728d0(0x2bf)](0x0,Game_BattlerBase[_0x5728d0(0x1b7)]);},Game_Enemy[_0x44a3b8(0x281)][_0x44a3b8(0x25a)]=function(_0x23ee11){const _0x5d910a=_0x44a3b8;_0x23ee11=_0x23ee11[_0x5d910a(0x2bf)](0x0,this[_0x5d910a(0x2c0)]()),_0x23ee11=_0x23ee11[_0x5d910a(0x2bf)](0x0,Game_BattlerBase[_0x5d910a(0x1b7)]),this[_0x5d910a(0x2f0)](-_0x23ee11),this[_0x5d910a(0x26a)](_0x23ee11);},Game_Enemy[_0x44a3b8(0x281)][_0x44a3b8(0x240)]=function(){const _0x21aa90=_0x44a3b8;var _0x19b6c8=0x0,_0x434e21=this[_0x21aa90(0x1ec)]()[_0x21aa90(0x2bf)](0x0,Game_BattlerBase[_0x21aa90(0x1b7)]);const _0x5d5c14=Game_Battler[_0x21aa90(0x1da)],_0x56e283=Game_Enemy[_0x21aa90(0x26d)],_0x5a28f4=0x3e8/0x3c;for(var _0x218452=0x1;_0x218452<=_0x434e21;_0x218452++){var _0x362b03=_0x5d5c14[_0x218452]||_0x5d5c14[0x0];if(_0x362b03>0x0){let _0x50cd2b=_0x56e283*(_0x218452-0x1);setTimeout($gameTemp[_0x21aa90(0x2f8)]['bind']($gameTemp,[this],_0x362b03,![],![]),_0x50cd2b);}_0x19b6c8+=_0x56e283/_0x5a28f4;}_0x19b6c8=Math[_0x21aa90(0x276)](_0x19b6c8),SceneManager[_0x21aa90(0x223)]['_logWindow'][_0x21aa90(0x226)]=_0x19b6c8;},Game_Unit[_0x44a3b8(0x281)][_0x44a3b8(0x1c8)]=function(){const _0x15d641=_0x44a3b8;var _0x233fb0=this[_0x15d641(0x1d4)];this[_0x15d641(0x1d4)]=![];for(const _0x543686 of this[_0x15d641(0x1bd)]()){if(!_0x543686)continue;_0x543686['setupBattleBoostPoints']();}this['_inBattle']=_0x233fb0;},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x21e)]=Game_Party[_0x44a3b8(0x281)]['addActor'],Game_Party['prototype']['addActor']=function(_0x27d682){const _0xd9e9e3=_0x44a3b8;VisuMZ[_0xd9e9e3(0x1ee)][_0xd9e9e3(0x21e)]['call'](this,_0x27d682),setTimeout(VisuMZ[_0xd9e9e3(0x1ee)]['RefreshHelpWindowInBattle'][_0xd9e9e3(0x1bc)](this),0x32);},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x1df)]=Game_Party[_0x44a3b8(0x281)][_0x44a3b8(0x1f3)],Game_Party[_0x44a3b8(0x281)][_0x44a3b8(0x1f3)]=function(_0x1d7fe3){const _0x3548ca=_0x44a3b8;VisuMZ[_0x3548ca(0x1ee)]['Game_Party_removeActor'][_0x3548ca(0x2d4)](this,_0x1d7fe3),setTimeout(VisuMZ[_0x3548ca(0x1ee)][_0x3548ca(0x24e)][_0x3548ca(0x1bc)](this),0x32);},VisuMZ[_0x44a3b8(0x1ee)]['Game_Party_partyChangeRefresh']=Game_Party[_0x44a3b8(0x281)]['partyChangeRefresh'],Game_Party[_0x44a3b8(0x281)][_0x44a3b8(0x284)]=function(){const _0x3c7460=_0x44a3b8;VisuMZ[_0x3c7460(0x1ee)][_0x3c7460(0x212)][_0x3c7460(0x2d4)](this),setTimeout(VisuMZ[_0x3c7460(0x1ee)][_0x3c7460(0x24e)]['bind'](this),0x32);},VisuMZ[_0x44a3b8(0x1ee)]['RefreshHelpWindowInBattle']=function(){const _0x281f46=_0x44a3b8;if(!SceneManager[_0x281f46(0x20f)]())return;const _0x31632d=SceneManager[_0x281f46(0x223)]['_helpWindow'];if(!_0x31632d)return;_0x31632d[_0x281f46(0x255)](BattleManager[_0x281f46(0x260)]()),_0x31632d[_0x281f46(0x2ce)]();},VisuMZ['BoostAction']['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype'][_0x44a3b8(0x1dd)],Scene_Battle[_0x44a3b8(0x281)]['createActorCommandWindow']=function(){const _0x8dbbd8=_0x44a3b8;VisuMZ['BoostAction'][_0x8dbbd8(0x217)][_0x8dbbd8(0x2d4)](this),this[_0x8dbbd8(0x305)][_0x8dbbd8(0x2aa)](_0x8dbbd8(0x22e),this['commandBoost'][_0x8dbbd8(0x1bc)](this)),this[_0x8dbbd8(0x305)][_0x8dbbd8(0x2aa)]('unboost',this['commandUnboost'][_0x8dbbd8(0x1bc)](this));},Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x219)]=function(_0x5a0e48){const _0x1858f1=_0x44a3b8;BattleManager[_0x1858f1(0x260)]()[_0x1858f1(0x2f0)](-0x1),BattleManager['actor']()['gainToUseBoostPoints'](0x1),BattleManager[_0x1858f1(0x260)]()[_0x1858f1(0x240)](),this[_0x1858f1(0x29a)](),this['_helpWindow'][_0x1858f1(0x2ce)](),!_0x5a0e48&&this[_0x1858f1(0x305)][_0x1858f1(0x218)](),this['_actorCommandWindow'][_0x1858f1(0x2ce)]();},Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x1c7)]=function(_0x2b7c3d){const _0x26a717=_0x44a3b8;BattleManager[_0x26a717(0x260)]()[_0x26a717(0x26a)](-0x1),BattleManager[_0x26a717(0x260)]()[_0x26a717(0x2f0)](0x1),BattleManager[_0x26a717(0x260)]()['startChangeBoostPointsAnimation'](),this[_0x26a717(0x29a)](),this[_0x26a717(0x2b5)][_0x26a717(0x2ce)](),!_0x2b7c3d&&this[_0x26a717(0x305)][_0x26a717(0x218)](),this[_0x26a717(0x305)]['refresh']();},VisuMZ[_0x44a3b8(0x1ee)]['Scene_Battle_selectNextCommand']=Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x270)],Scene_Battle['prototype']['selectNextCommand']=function(){const _0x3a299b=_0x44a3b8;this[_0x3a299b(0x2b5)]&&(this[_0x3a299b(0x2b5)]['clearBoostSubject'](),this[_0x3a299b(0x2e5)]()),VisuMZ[_0x3a299b(0x1ee)][_0x3a299b(0x2b7)][_0x3a299b(0x2d4)](this);},VisuMZ[_0x44a3b8(0x1ee)]['Scene_Battle_startActorCommandSelection']=Scene_Battle['prototype']['startActorCommandSelection'],Scene_Battle['prototype']['startActorCommandSelection']=function(){const _0x4e6eb7=_0x44a3b8;VisuMZ[_0x4e6eb7(0x1ee)][_0x4e6eb7(0x2b3)]['call'](this),this[_0x4e6eb7(0x2b5)]&&(this[_0x4e6eb7(0x2b5)][_0x4e6eb7(0x255)](BattleManager[_0x4e6eb7(0x260)]()),this[_0x4e6eb7(0x2e5)]());},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x25c)]=Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x1db)],Scene_Battle[_0x44a3b8(0x281)]['update']=function(){const _0x2dce6d=_0x44a3b8;VisuMZ[_0x2dce6d(0x1ee)][_0x2dce6d(0x25c)][_0x2dce6d(0x2d4)](this),this[_0x2dce6d(0x233)]();},Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x1d2)]=function(){const _0x450d2b=_0x44a3b8;return this[_0x450d2b(0x1b3)]===undefined&&this[_0x450d2b(0x2e5)](),VisuMZ[_0x450d2b(0x1ee)][_0x450d2b(0x2e2)][_0x450d2b(0x1c6)]['RepeatBoostAni']??![];},Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x2e5)]=function(){this['_repeatBoostAnimationTimer']=-0x1;},Scene_Battle[_0x44a3b8(0x281)][_0x44a3b8(0x29a)]=function(){const _0x9c0513=_0x44a3b8,_0x56d36e=BattleManager['actor']()[_0x9c0513(0x1ec)]();this[_0x9c0513(0x1b3)]=_0x56d36e>0x0?VisuMZ[_0x9c0513(0x1ee)][_0x9c0513(0x2e2)][_0x9c0513(0x1c6)][_0x9c0513(0x1e3)]||0x1:-0x1;},Scene_Battle['prototype'][_0x44a3b8(0x233)]=function(){const _0xdeeca=_0x44a3b8;if(!this[_0xdeeca(0x1d2)]())return;if(this['_repeatBoostAnimationTimer']<=0x0)return;this['_repeatBoostAnimationTimer']--,this[_0xdeeca(0x1b3)]<=0x0&&BattleManager['actor']()&&(BattleManager[_0xdeeca(0x260)]()[_0xdeeca(0x240)](!![]),BattleManager[_0xdeeca(0x260)]()['toUseBoostPoints']()>0x0&&this[_0xdeeca(0x29a)]());};function Sprite_BoostContainer(){const _0x3d467b=_0x44a3b8;this[_0x3d467b(0x1ed)](...arguments);}Sprite_BoostContainer[_0x44a3b8(0x281)]=Object[_0x44a3b8(0x22a)](Sprite[_0x44a3b8(0x281)]),Sprite_BoostContainer[_0x44a3b8(0x281)]['constructor']=Sprite_BoostContainer,Sprite_BoostContainer['ICON_SIZE_RATE']=VisuMZ[_0x44a3b8(0x1ee)]['Settings']['UI'][_0x44a3b8(0x26c)],Sprite_BoostContainer[_0x44a3b8(0x281)][_0x44a3b8(0x1ed)]=function(){const _0x343595=_0x44a3b8;Sprite['prototype']['initialize']['call'](this),this[_0x343595(0x1cb)](),this[_0x343595(0x2ba)]();},Sprite_BoostContainer[_0x44a3b8(0x281)][_0x44a3b8(0x1cb)]=function(){const _0x117b0b=_0x44a3b8;this[_0x117b0b(0x259)]['x']=Sprite_BoostContainer[_0x117b0b(0x291)],this[_0x117b0b(0x259)]['y']=Sprite_BoostContainer[_0x117b0b(0x291)];},Sprite_BoostContainer['prototype'][_0x44a3b8(0x2ba)]=function(){const _0x3e48cb=_0x44a3b8;this[_0x3e48cb(0x2fb)]=[];for(let _0x2e570f=0x1;_0x2e570f<=Game_BattlerBase[_0x3e48cb(0x2ac)];_0x2e570f++){const _0x3e7372=new Sprite_BoostIcon(_0x2e570f);this['addChild'](_0x3e7372),this[_0x3e48cb(0x2fb)][_0x3e48cb(0x1fd)](_0x3e7372);}},Sprite_BoostContainer[_0x44a3b8(0x281)][_0x44a3b8(0x251)]=function(_0x41550b){const _0x4a7012=_0x44a3b8;if(!this[_0x4a7012(0x2fb)])return;for(const _0x48e320 of this[_0x4a7012(0x2fb)]){_0x48e320['setup'](_0x41550b);}};function _0x2fba(){const _0x341248=['convertBoostLessEscape','exit','isEnemy','BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN','prototype','Window_BattleStatus_drawItemStatus','subject','partyChangeRefresh','\x5cI[%1]%2','BOOST_POINTS_DISPLAY_BATTLE_STATUS','boostMultiplier','BoostBattleStartFlat','_bpSubject','UNBOOST_ACTION_SHOW','BOOST_POINTS_DISPLAY_OFFSET_Y','UserBoostPoints','Equal','Game_Action_apply','max','addGuardCommand','ICON_SIZE_RATE','version','JSON','EffectAddition','EnemyBoostSkillName','lineHeight','height','boostIcon','BoostPointsRegenRate','startRepeatBoostAnimation','boostAddition','width','PgUpDnShortcuts','addBoostCommand','drawItemStatusBoostPointsDefault','clear','canUndoBoostPoints','isDead','_turnUsedBoostPoints','Game_Battler_regenerateTp','applyGuard','Amount','bpRegenMultipliers','BOOST_POINTS_DEATH_REMOVE','RepeatAniMirror','setHandler','DeathRegen','BOOST_POINTS_MAX_STORED','default','traitObjects','Game_Action_applyGuard','boostSmooth','randomInt','toLowerCase','Scene_Battle_startActorCommandSelection','BoostBattleStartRate','_helpWindow','regenerateAll','Scene_Battle_selectNextCommand','endActionBoostPoints','_actor','createChildSprites','resize','BoostGainPoints','isBTB','currentAction','clamp','storedBoostPoints','trim','match','StartBattle','convertBoostUpEscape','applyBoostPointRepeats','isSkill','BOOST_POINTS_REGEN_ALWAYS','apply','removeBattleStates','BOOST_POINTS_MULTIPLIERS','AnalyzeAddition','convertBoostRepeatEscape','convertEscapeCharacters','refresh','parameters','clearBoostSubject','AnimationDelay','Window_Base_convertEscapeCharacters','BpEffect','call','format','regenerateBoostPoints','28216XOBioK','Analyze','allowBoostAction','processtoUseBoostPoints','unboost','UnboostCmd','applyBoostPointDamage','BattleManager_processTurn','Window_ActorCommand_addGuardCommand','split','BP\x20Effect','Settings','itemRect','convertBoostGreaterEscape','clearRepeatBoostAnimation','setToUseBoostPoints','initBoostAction','unboostCommandName','description','_bpTurnRate','bpRegenAdded','Damage','ShowFacesListStyle','24IQrIVL','regenerateTp','gainStoredBoostPoints','calculateBPtoUse','show','Game_Battler_addBuff','_toUseBoostPoints','includes','cursorPageup','BoostCmd','requestFauxAnimation','processTurn','_bpTurnFlat','_icons','iconWidth','convertBoostLessEqualEscape','_customModified','convertBoostEffectEscape','1165326PkCMSr','toUpperCase','convertBoostDamageEscape','Repeat','addLoadListener','_actorCommandWindow','meetsBoostShortcutRequirements','endAction','_repeatBoostAnimationTimer','ConvertParams','smooth','convertBoostAnalyzeEscape','BOOST_POINTS_MAX_TOUSE','addBuff','Game_BattlerBase_initialize','TurnMultiply','itemRectWithPadding','bind','members','playOkSound','STRUCT','boostIconsheetBitmap','Game_Battler_removeBattleStates','__Game_Action_applyItemUserEffect','IconSet','AlwaysRegen','BoostIcon','Mechanics','commandUnboost','setupBattleBoostPoints','note','processEnemyUseBoost','initMembers','commandStyle','10496JomKMm','_iconIndex','setStoredBoostPoints','GreaterEqual','Game_BattlerBase_resetStateCounts','isUsingRepeatBoostAnimation','Usable','_inBattle','setupBattleBoostPointsMultiplier','BypassConstructors','Require','TurnAddition','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','BOOST_POINTS_ANIMATIONS','update','622833uOAgqr','createActorCommandWindow','addState','Game_Party_removeActor','battleLayoutStyle','_previousBattleChainBoostActions','Game_Battler_addDebuff','RepeatAniCycle','2219WrNuRm','ShowBoostCmd','item','drawItemStatusBoostPoints','name','NUM','length','BoostPointsRegenFlat','toUseBoostPoints','initialize','BoostAction','placeBoostPoints','Skill\x20','Window_Base_postConvertEscapeCharacters','BoostAniMute','removeActor','_stateTurns','BoostRepeat','filter','inBattle','loadBitmap','Regen','createInnerSprite','BoostSealed','actor%1-boostPoints','push','setupBattleBoostPointsAdded','BOOST_ACTION_BYPASS_CONSTRUCTORS','_storedBoostPoints','ARRAYNUM','status','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawItemStatus','applyBPEffects','iconHeight','convertBoostGreaterEqualEscape','Game_Battler_addState','BattleManager_endAction','STR','boostPointsRegenValue','boostCommandName','greater','updateIcon','isSceneBattle','Game_Enemy_setup','BOOST_POINTS_TURN_REGEN','Game_Party_partyChangeRefresh','ARRAYFUNC','DeathRemoval','createFallbackBoostSubject','1003050hzvlxK','Scene_Battle_createActorCommandWindow','activate','commandBoost','actorId','shouldDrawBoostIcons','addUnboostCommand','updateFrame','Game_Party_addActor','convertBoostEscapeCharacters','RepeatAniMute','getStateReapplyRulings','LessEqual','_scene','Window_Selectable_cursorPagedown','BOOST_POINTS_DISPLAY_AUTO_POS','_waitCount','BOOST_ACTION_SHOW','resetStateCounts','map','create','isHidden','portrait','855060zdFHJd','boost','some','VisuMZ_1_BattleCore','VisuMZ_1_MessageCore','Game_Action_numRepeats','updateRepeatBoostAnimation','bitmap','isActor','Game_Battler_regenerateAll','_boostAI','unboostIcon','_slot','convertBoostTurnEscape','8QjaTUx','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setFrame','EmptyIcon','BOOST_POINTS_DEATH_REGEN','startChangeBoostPointsAnimation','BattleStatusAutoPosition','meetstoUseBoostPointsRequirement','EffectMultiply','ARRAYSTR','parse','convertBoost0Escape','canUseBoostShortcut','1058885DZPyPM','_boostIconSheet','boostTransferBitmap','BOOST_POINTS_START_BATTLE','VisuMZ_3_ActiveChainSkills','_battler','RefreshHelpWindowInBattle','blt','replace','setup','applyBoostPointTurns','round','add','setBoostSubject','FUNC','ARRAYSTRUCT','getActiveChainSkillSelected','scale','processEnemyBPUsage','currentSymbol','Scene_Battle_update','BattleManager_setup','BOOST_POINTS_DISPLAY_OFFSET_X','ShowUnboostCmd','actor','BoostTurns','drawItemStatusBoostPointsAuto','enemy','convertBoostEqualEscape','RegExp','DmgMultiply','border','Turn','AnalyzeMultiply','gainToUseBoostPoints','numRepeats','IconSizeRate','BOOST_POINTS_ANIMATION_DELAY','postConvertEscapeCharacters','setupBoostAI','selectNextCommand','VisuMZ_0_CoreEngine','floor','addDebuff','Game_BattlerBase_meetsUsableItemConditions','_subject','ceil','callUpdateHelp','BOOST_POINTS_ADDITION','loadSystem','BattleCore','VisuMZ_2_BattleSystemBTB','text'];_0x2fba=function(){return _0x341248;};return _0x2fba();}function Sprite_BoostIcon(){const _0x47cdc1=_0x44a3b8;this[_0x47cdc1(0x1ed)](...arguments);}Sprite_BoostIcon[_0x44a3b8(0x281)]=Object[_0x44a3b8(0x22a)](Sprite[_0x44a3b8(0x281)]),Sprite_BoostIcon[_0x44a3b8(0x281)]['constructor']=Sprite_BoostIcon,Sprite_BoostIcon[_0x44a3b8(0x281)][_0x44a3b8(0x1ed)]=function(_0x426258){const _0x3873de=_0x44a3b8;this[_0x3873de(0x239)]=_0x426258,Sprite[_0x3873de(0x281)][_0x3873de(0x1ed)][_0x3873de(0x2d4)](this),this[_0x3873de(0x1cb)](),this[_0x3873de(0x1f8)]();},Sprite_BoostIcon[_0x44a3b8(0x281)][_0x44a3b8(0x1cb)]=function(){const _0x41e32a=_0x44a3b8;this[_0x41e32a(0x1ce)]=ImageManager['unboostIcon'],this['x']=ImageManager[_0x41e32a(0x2fc)]*(this[_0x41e32a(0x239)]-0x1);},Sprite_BoostIcon[_0x44a3b8(0x281)][_0x44a3b8(0x1f8)]=function(){const _0x28a5ff=_0x44a3b8;this[_0x28a5ff(0x234)]=ImageManager[_0x28a5ff(0x1c0)](),this[_0x28a5ff(0x23d)](0x0,0x0,0x0,0x0);},Sprite_BoostIcon['prototype']['setup']=function(_0x186c4d){const _0x4bf646=_0x44a3b8;this['_battler']!==_0x186c4d&&(this[_0x4bf646(0x24d)]=_0x186c4d);},Sprite_BoostIcon[_0x44a3b8(0x281)]['update']=function(){const _0x1f27a6=_0x44a3b8;Sprite[_0x1f27a6(0x281)][_0x1f27a6(0x1db)][_0x1f27a6(0x2d4)](this),this[_0x1f27a6(0x20e)](),this[_0x1f27a6(0x21d)]();},Sprite_BoostIcon[_0x44a3b8(0x281)]['updateIcon']=function(){const _0x3d9a2c=_0x44a3b8;if(this[_0x3d9a2c(0x24d)]){let _0x3697d2=this[_0x3d9a2c(0x24d)][_0x3d9a2c(0x2c0)]();_0x3697d2>=this[_0x3d9a2c(0x239)]?this[_0x3d9a2c(0x1ce)]=ImageManager[_0x3d9a2c(0x298)]:this[_0x3d9a2c(0x1ce)]=ImageManager['unboostIcon'];}else this[_0x3d9a2c(0x1ce)]=0x0;},Sprite_BoostIcon[_0x44a3b8(0x281)][_0x44a3b8(0x21d)]=function(){const _0x3f57b3=_0x44a3b8,_0x21a2bc=ImageManager[_0x3f57b3(0x2fc)],_0x1d5d31=ImageManager['iconHeight'],_0x5f1195=this[_0x3f57b3(0x1ce)]%0x10*_0x21a2bc,_0x4887e1=Math[_0x3f57b3(0x272)](this[_0x3f57b3(0x1ce)]/0x10)*_0x1d5d31;this['setFrame'](_0x5f1195,_0x4887e1,_0x21a2bc,_0x1d5d31);},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2d2)]=Window_Base['prototype'][_0x44a3b8(0x2cd)],Window_Base[_0x44a3b8(0x281)]['convertEscapeCharacters']=function(_0x5d11da){const _0x21e7fe=_0x44a3b8;return _0x5d11da=VisuMZ[_0x21e7fe(0x1ee)][_0x21e7fe(0x2d2)][_0x21e7fe(0x2d4)](this,_0x5d11da),!Imported[_0x21e7fe(0x231)]&&(_0x5d11da=this[_0x21e7fe(0x21f)](_0x5d11da)),_0x5d11da;},VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x1f1)]=Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x26e)],Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x26e)]=function(_0x5165b3){const _0x4254aa=_0x44a3b8;return _0x5165b3=VisuMZ[_0x4254aa(0x1ee)][_0x4254aa(0x1f1)][_0x4254aa(0x2d4)](this,_0x5165b3),_0x5165b3=this['convertBoostEscapeCharacters'](_0x5165b3),_0x5165b3;},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x215)]=function(){const _0x5b3cd0=_0x44a3b8;if(!!this['_bpSubject'])return;if($gameParty[_0x5b3cd0(0x1f7)]())this[_0x5b3cd0(0x289)]=BattleManager[_0x5b3cd0(0x260)]()||BattleManager[_0x5b3cd0(0x275)];else{const _0x219708=SceneManager[_0x5b3cd0(0x223)];this[_0x5b3cd0(0x289)]=_0x219708[_0x5b3cd0(0x2b9)];}},Window_Base['prototype'][_0x44a3b8(0x21f)]=function(_0x55ef54){const _0x2ef422=_0x44a3b8;return _0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){const _0x5444ad=_0x2ef422;return this[_0x5444ad(0x302)](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){return this['convertBoostDamageEscape'](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54['replace'](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){const _0x593961=_0x2ef422;return this[_0x593961(0x23a)](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){const _0x41e8a4=_0x2ef422;return this[_0x41e8a4(0x23a)](parseInt(arguments[0x1]));}['bind'](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}['bind'](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){const _0x247ca0=_0x2ef422;return this[_0x247ca0(0x2cc)](parseInt(arguments[0x1]));}['bind'](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){const _0x3115f9=_0x2ef422;return this[_0x3115f9(0x2cc)](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x5b344c=_0x2ef422;return this[_0x5b344c(0x1b6)](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x4ab5a8=_0x2ef422;return this[_0x4ab5a8(0x2ff)](parseInt(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54['replace'](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x3d84db=_0x2ef422;return this[_0x3d84db(0x2c4)](String(arguments[0x1]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){const _0x2e433e=_0x2ef422;return this[_0x2e433e(0x246)](String(arguments[0x1]));}['bind'](this)),_0x55ef54=_0x55ef54['replace'](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x3bae75=_0x2ef422;return this[_0x3bae75(0x264)](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0x55ef54=_0x55ef54['replace'](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){const _0x1072d7=_0x2ef422;return this[_0x1072d7(0x2fd)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54['replace'](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x59a39f=_0x2ef422;return this[_0x59a39f(0x27d)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54['replace'](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){const _0x52938b=_0x2ef422;return this[_0x52938b(0x207)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x2ef422(0x1bc)](this)),_0x55ef54=_0x55ef54[_0x2ef422(0x250)](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){const _0x2132e5=_0x2ef422;return this[_0x2132e5(0x2e4)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x2ef422(0x1bc)](this)),_0x55ef54;},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x302)]=function(_0x1acdce){const _0x440c65=_0x44a3b8;if(!!this['_bpSubject']){var _0x4dc811=this[_0x440c65(0x289)][_0x440c65(0x287)](_0x440c65(0x2ec));_0x1acdce=Math[_0x440c65(0x253)](_0x1acdce*_0x4dc811),_0x1acdce+=this['_bpSubject'][_0x440c65(0x29b)]('Damage');}return _0x1acdce;},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x23a)]=function(_0x9a2be1){const _0x3444ed=_0x44a3b8;if(!!this['_bpSubject']){var _0x86e4a8=this[_0x3444ed(0x289)][_0x3444ed(0x287)](_0x3444ed(0x268));_0x9a2be1=Math['round'](_0x9a2be1*_0x86e4a8),_0x9a2be1+=this[_0x3444ed(0x289)][_0x3444ed(0x29b)]('Turn');}return _0x9a2be1;},Window_Base[_0x44a3b8(0x281)]['convertBoostRepeatEscape']=function(_0x2801a8){const _0x54ce95=_0x44a3b8;if(!!this['_bpSubject']){var _0x270040=this[_0x54ce95(0x289)][_0x54ce95(0x287)](_0x54ce95(0x303));_0x2801a8=Math[_0x54ce95(0x253)](_0x2801a8*_0x270040),_0x2801a8+=this[_0x54ce95(0x289)][_0x54ce95(0x29b)](_0x54ce95(0x303));}return _0x2801a8;},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x1b6)]=function(_0x176d13){const _0x180f82=_0x44a3b8;if(!!this[_0x180f82(0x289)]){var _0xce9368=this[_0x180f82(0x289)][_0x180f82(0x287)](_0x180f82(0x2d8));_0x176d13=Math[_0x180f82(0x253)](_0x176d13*_0xce9368),_0x176d13+=this['_bpSubject'][_0x180f82(0x29b)](_0x180f82(0x2d8));}return _0x176d13;},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x2ff)]=function(_0x5576a0){const _0x3024b5=_0x44a3b8;if(!!this[_0x3024b5(0x289)]){var _0x5b0933=this[_0x3024b5(0x289)][_0x3024b5(0x287)]('BP\x20Effect');_0x5576a0=Math['round'](_0x5576a0*_0x5b0933),_0x5576a0+=this[_0x3024b5(0x289)][_0x3024b5(0x29b)](_0x3024b5(0x2e1));}return _0x5576a0;},Window_Base[_0x44a3b8(0x281)]['convertBoostUpEscape']=function(_0x542cad){const _0x39a929=_0x44a3b8;return!!this[_0x39a929(0x289)]&&this[_0x39a929(0x289)][_0x39a929(0x1ec)]()>0x0?_0x542cad:'';},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x246)]=function(_0x4c5233){const _0x479510=_0x44a3b8;return!this[_0x479510(0x289)]||this[_0x479510(0x289)][_0x479510(0x1ec)]()<=0x0?_0x4c5233:'';},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x264)]=function(_0xf3a1a5,_0x339982){const _0x4a7bcc=_0x44a3b8;this[_0x4a7bcc(0x215)]();if(!!this[_0x4a7bcc(0x289)]&&this['_bpSubject']['toUseBoostPoints']()===_0xf3a1a5)return _0x339982;else return _0xf3a1a5===0x0?_0x339982:'';},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x2fd)]=function(_0x2e44ea,_0x22343d){const _0x10161e=_0x44a3b8;return this['createFallbackBoostSubject'](),!!this[_0x10161e(0x289)]&&this[_0x10161e(0x289)]['toUseBoostPoints']()<=_0x2e44ea?_0x22343d:'';},Window_Base[_0x44a3b8(0x281)]['convertBoostLessEscape']=function(_0x5effb9,_0x3ea7f6){const _0x1952ca=_0x44a3b8;return this[_0x1952ca(0x215)](),!!this[_0x1952ca(0x289)]&&this['_bpSubject'][_0x1952ca(0x1ec)]()<_0x5effb9?_0x3ea7f6:'';},Window_Base[_0x44a3b8(0x281)][_0x44a3b8(0x207)]=function(_0x41d858,_0x4bdeb9){const _0x17b1ee=_0x44a3b8;return this['createFallbackBoostSubject'](),!!this[_0x17b1ee(0x289)]&&this[_0x17b1ee(0x289)][_0x17b1ee(0x1ec)]()>=_0x41d858?_0x4bdeb9:'';},Window_Base[_0x44a3b8(0x281)]['convertBoostGreaterEscape']=function(_0x1a8322,_0x5f6a40){const _0x5eef64=_0x44a3b8;return this[_0x5eef64(0x215)](),!!this['_bpSubject']&&this['_bpSubject'][_0x5eef64(0x1ec)]()>_0x1a8322?_0x5f6a40:'';},Window_Selectable[_0x44a3b8(0x280)]=VisuMZ[_0x44a3b8(0x1ee)]['Settings']['UI'][_0x44a3b8(0x29d)],Window_Selectable[_0x44a3b8(0x1ff)]=VisuMZ[_0x44a3b8(0x1ee)]['Settings']['UI'][_0x44a3b8(0x1d6)],Window_Selectable['prototype'][_0x44a3b8(0x247)]=function(){const _0x5ac0fe=_0x44a3b8,_0x1bf661=this['constructor'][_0x5ac0fe(0x1e8)];return Window_Selectable[_0x5ac0fe(0x1ff)]['includes'](_0x1bf661)?![]:!![];},Window_Selectable['prototype'][_0x44a3b8(0x306)]=function(){const _0x200a2a=_0x44a3b8;if(!SceneManager['isSceneBattle']())return![];if(!Window_Selectable[_0x200a2a(0x280)])return![];if(!BattleManager['allowBoostAction']())return![];return this[_0x200a2a(0x247)]();},VisuMZ['BoostAction'][_0x44a3b8(0x224)]=Window_Selectable['prototype']['cursorPagedown'],Window_Selectable[_0x44a3b8(0x281)]['cursorPagedown']=function(){const _0x39ab3d=_0x44a3b8;if(this[_0x39ab3d(0x306)]()){const _0x385da0=BattleManager['actor']();_0x385da0&&_0x385da0['canUseBoostPoints']()&&(SceneManager[_0x39ab3d(0x223)][_0x39ab3d(0x219)](!![]),this[_0x39ab3d(0x2ce)](),this['callUpdateHelp']()),Input[_0x39ab3d(0x2a0)]();}else VisuMZ['BoostAction']['Window_Selectable_cursorPagedown'][_0x39ab3d(0x2d4)](this);},VisuMZ['BoostAction']['Window_Selectable_cursorPageup']=Window_Selectable[_0x44a3b8(0x281)][_0x44a3b8(0x2f6)],Window_Selectable[_0x44a3b8(0x281)][_0x44a3b8(0x2f6)]=function(){const _0x2d48ab=_0x44a3b8;if(this[_0x2d48ab(0x306)]()){const _0x336e5f=BattleManager[_0x2d48ab(0x260)]();_0x336e5f&&_0x336e5f[_0x2d48ab(0x2a1)]()&&(SceneManager[_0x2d48ab(0x223)][_0x2d48ab(0x1c7)](!![]),this[_0x2d48ab(0x2ce)](),this[_0x2d48ab(0x277)]()),Input[_0x2d48ab(0x2a0)]();}else VisuMZ[_0x2d48ab(0x1ee)]['Window_Selectable_cursorPageup'][_0x2d48ab(0x2d4)](this);},Window_Help[_0x44a3b8(0x281)][_0x44a3b8(0x255)]=function(_0x13a2da){this['_bpSubject']=_0x13a2da;},Window_Help[_0x44a3b8(0x281)][_0x44a3b8(0x2d0)]=function(){const _0x4a396f=_0x44a3b8;this[_0x4a396f(0x289)]=undefined;},Window_StatusBase['prototype'][_0x44a3b8(0x21b)]=function(){return BattleManager['allowBoostAction']();},Window_StatusBase['prototype']['placeBoostPoints']=function(_0x462760,_0x2f5f5a,_0x355919){const _0x44ebc9=_0x44a3b8;if(!this[_0x44ebc9(0x21b)]())return;const _0xfa0cf7=_0x44ebc9(0x1fc)[_0x44ebc9(0x2d5)](_0x462760[_0x44ebc9(0x21a)]()),_0x73b673=this[_0x44ebc9(0x1fa)](_0xfa0cf7,Sprite_BoostContainer);_0x73b673[_0x44ebc9(0x251)](_0x462760),_0x73b673['move'](_0x2f5f5a,_0x355919),_0x73b673[_0x44ebc9(0x2f2)]();},Window_ActorCommand[_0x44a3b8(0x227)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI'][_0x44a3b8(0x1e5)],Window_ActorCommand['UNBOOST_ACTION_SHOW']=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI'][_0x44a3b8(0x25f)],VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2df)]=Window_ActorCommand[_0x44a3b8(0x281)][_0x44a3b8(0x290)],Window_ActorCommand[_0x44a3b8(0x281)]['addGuardCommand']=function(){const _0x230e51=_0x44a3b8;BattleManager['allowBoostAction']()&&(this['addBoostCommand'](),this['addUnboostCommand']()),VisuMZ[_0x230e51(0x1ee)][_0x230e51(0x2df)][_0x230e51(0x2d4)](this);},Window_ActorCommand[_0x44a3b8(0x281)][_0x44a3b8(0x29e)]=function(){const _0x4bf5a7=_0x44a3b8;if(!Window_ActorCommand[_0x4bf5a7(0x227)])return;const _0x51f51e=this[_0x4bf5a7(0x1cc)](),_0xf9713f=TextManager['boostCommandName'],_0x13ddd8=ImageManager[_0x4bf5a7(0x298)],_0x276f00=_0x51f51e===_0x4bf5a7(0x27c)?_0xf9713f:_0x4bf5a7(0x285)[_0x4bf5a7(0x2d5)](_0x13ddd8,_0xf9713f);var _0x66bc75=this[_0x4bf5a7(0x2b9)]['canUseBoostPoints']();this['addCommand'](_0x276f00,_0x4bf5a7(0x22e),_0x66bc75);},Window_ActorCommand[_0x44a3b8(0x281)][_0x44a3b8(0x21c)]=function(){const _0xdc6af7=_0x44a3b8;if(!Window_ActorCommand[_0xdc6af7(0x28a)])return;const _0x52b238=this[_0xdc6af7(0x1cc)](),_0x2a91ae=TextManager[_0xdc6af7(0x2e8)],_0x361b31=ImageManager[_0xdc6af7(0x238)],_0x556bcc=_0x52b238===_0xdc6af7(0x27c)?_0x2a91ae:'\x5cI[%1]%2'['format'](_0x361b31,_0x2a91ae);var _0x32f8a5=this[_0xdc6af7(0x2b9)][_0xdc6af7(0x2a1)]();this['addCommand'](_0x556bcc,'unboost',_0x32f8a5);},Window_ActorCommand[_0x44a3b8(0x281)][_0x44a3b8(0x1be)]=function(){const _0x238e71=_0x44a3b8;this['currentSymbol']()!=='boost'&&this[_0x238e71(0x25b)]()!==_0x238e71(0x2db)&&Window_Selectable[_0x238e71(0x281)][_0x238e71(0x1be)]['call'](this);},Window_BattleStatus[_0x44a3b8(0x286)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI']['BattleStatusShow'],Window_BattleStatus['BOOST_POINTS_DISPLAY_AUTO_POS']=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI'][_0x44a3b8(0x241)],Window_BattleStatus[_0x44a3b8(0x25e)]=VisuMZ['BoostAction'][_0x44a3b8(0x2e2)]['UI']['BattleStatusOffsetX'],Window_BattleStatus[_0x44a3b8(0x28b)]=VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x2e2)]['UI']['BattleStatusOffsetY'],VisuMZ[_0x44a3b8(0x1ee)][_0x44a3b8(0x282)]=Window_BattleStatus[_0x44a3b8(0x281)][_0x44a3b8(0x204)],Window_BattleStatus['prototype']['drawItemStatus']=function(_0x563410){const _0x25013c=_0x44a3b8;VisuMZ[_0x25013c(0x1ee)][_0x25013c(0x282)][_0x25013c(0x2d4)](this,_0x563410),this[_0x25013c(0x1e7)](_0x563410);},Window_BattleStatus[_0x44a3b8(0x281)][_0x44a3b8(0x1e7)]=function(_0x1e03df){const _0x4743b4=_0x44a3b8;if(!Window_BattleStatus[_0x4743b4(0x286)])return;const _0x598be6=this[_0x4743b4(0x260)](_0x1e03df);if(!_0x598be6)return;!Window_BattleStatus[_0x4743b4(0x225)]?this['drawItemStatusBoostPointsDefault'](_0x1e03df):this[_0x4743b4(0x262)](_0x1e03df);},Window_BattleStatus[_0x44a3b8(0x281)][_0x44a3b8(0x29f)]=function(_0x1337da){const _0x135f6e=_0x44a3b8,_0x4d8d72=this[_0x135f6e(0x260)](_0x1337da),_0x334dab=this[_0x135f6e(0x1bb)](_0x1337da);let _0x21e2b7=_0x334dab['x']-0x4+Window_BattleStatus[_0x135f6e(0x25e)],_0x3f9f66=_0x334dab['y']+0x4+Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_Y'];this[_0x135f6e(0x1ef)](_0x4d8d72,_0x21e2b7,_0x3f9f66);},Window_BattleStatus[_0x44a3b8(0x281)]['drawItemStatusBoostPointsAuto']=function(_0x24ebdf){const _0x300567=_0x44a3b8,_0x4526ce=this['actor'](_0x24ebdf),_0x407ec5=this[_0x300567(0x2e3)](_0x24ebdf),_0x9c9f01=Math['ceil'](ImageManager[_0x300567(0x2fc)]*Game_BattlerBase[_0x300567(0x2ac)]*Sprite_BoostContainer['ICON_SIZE_RATE']),_0x3e6c19=Math['ceil'](ImageManager[_0x300567(0x206)]*Sprite_BoostContainer['ICON_SIZE_RATE']);let _0x50cbef=_0x407ec5['x']+0x4,_0x26e3f7=_0x407ec5['y']+0x4;const _0x2ca571=this[_0x300567(0x1e0)]();switch(_0x2ca571){case'list':VisuMZ[_0x300567(0x27a)][_0x300567(0x2e2)]['BattleLayout'][_0x300567(0x2ed)]?_0x50cbef+=ImageManager['faceWidth']+0x8:_0x50cbef+=ImageManager[_0x300567(0x2fc)]+0x8;_0x50cbef+=0x88,_0x50cbef+=0x88*0x2;$dataSystem['optDisplayTp']&&(_0x50cbef+=0x88);_0x26e3f7+=Math['max'](0x0,Math[_0x300567(0x253)]((this['lineHeight']()-_0x3e6c19)/0x2));break;case'xp':case _0x300567(0x2ad):case _0x300567(0x267):_0x50cbef=Math[_0x300567(0x253)](_0x407ec5['x']+(_0x407ec5['width']-_0x9c9f01)/0x2);break;case _0x300567(0x22c):_0x50cbef=Math[_0x300567(0x253)](_0x407ec5['x']+(_0x407ec5['width']-_0x9c9f01)/0x2);const _0xcfb13e=$dataSystem['optDisplayTp']?0x4:0x3;_0x26e3f7=Math['round'](_0x407ec5['y']+_0x407ec5[_0x300567(0x297)]-0x4-this[_0x300567(0x296)]()*_0xcfb13e);break;}_0x50cbef+=Window_BattleStatus[_0x300567(0x25e)],_0x26e3f7+=Window_BattleStatus[_0x300567(0x28b)],this[_0x300567(0x1ef)](_0x4526ce,_0x50cbef,_0x26e3f7);};