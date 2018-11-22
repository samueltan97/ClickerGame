import { Fighter } from "./javascript/Classes/Fighters"
import { Player } from "./javascript/InterfacesBaseClasses/Player";
import { Kore } from "@kirinnee/core";
import $ from "jquery";
import { Repository } from "./javascript/InterfacesBaseClasses/Repository";
import { Storage } from "./javascript/InterfacesBaseClasses/Storage";
import { StageLevel } from "./javascript/InterfacesBaseClasses/StageLevel";
import { Unit, Enemy, Resource, RefinerTrainer, Hero } from "./javascript/InterfacesBaseClasses/BaseClass";
import { IPlayer } from "./javascript/InterfacesBaseClasses/IPlayer";
import { ISkillFactory } from "./javascript/InterfacesBaseClasses/Skills/ISkillFactory";
import { SkillFactory } from "./javascript/InterfacesBaseClasses/Skills/PlayerSkill";
import { IActiveSkill } from "./javascript/InterfacesBaseClasses/Skills/IActiveSkill";
import { ClickerIndex } from "./javascript/InterfacesBaseClasses/ClickerIndex";
import { PlayerActiveSkill } from "./javascript/InterfacesBaseClasses/Skills/PlayerSkillsBaseClass";
import { IPassiveSkill } from "./javascript/InterfacesBaseClasses/Skills/IPassiveSkill";
import { adjustValueToExponential } from "./javascript/CSSAnimation/CSSAnimation";
let core: Core = new Kore();
core.ExtendPrimitives();

var thePlayer: Player = new Player(1, 0);
let StageOne: StageLevel = new StageLevel(1, "Kroigren");
let StageTwo: StageLevel = new StageLevel(2, "Brostika");
let StageThree: StageLevel = new StageLevel(3, "Erithven");
let StageFour: StageLevel = new StageLevel(4, "Boriolsis");
let StageFive: StageLevel = new StageLevel(5, "Malidret");
let StageArray: StageLevel[] = [StageOne, StageTwo, StageThree, StageFour, StageFive];

//Resources
var Man: Resource = new Resource(0, "abc", "Man");
var Wood: Resource = new Resource(1, "abc", "Wood");
var Iron: Resource = new Resource(2, "abc", "Iron");
var Thread: Resource = new Resource(3, "abc", "Thread");
var Steel: Resource = new Resource(4, "abc", "Steel");
var Gunpowder: Resource = new Resource(5, "abc", "Gunpowder");
var ManaShard: Resource = new Resource(6, "abc", "Mana Shard");
var Coin: Resource = new Resource(7, "abc", "Coin");
var Plank: Resource = new Resource(8, "abc", "Plank");
var IronBar: Resource = new Resource(9, "abc", "Iron Bar");
var Nylon: Resource = new Resource(10, "abc", "Nylon");
var IronBlade: Resource = new Resource(11, "abc", "Iron Blade");
var Manacyte: Resource = new Resource(12, "abc", "Manacyte");
var Bullet: Resource = new Resource(13, "abc", "Bullet");
var SteelBar: Resource = new Resource(14, "abc", "Steel Bar");
var Arrow: Resource = new Resource(15, "abc", "Arrow");
var SteelPlate: Resource = new Resource(16, "abc", "Steel Plate");
var Spear: Resource = new Resource(17, "abc", "Spear");
var Sword: Resource = new Resource(18, "abc", "Sword");
var Bow: Resource = new Resource(19, "abc", "Bow");
var WoodenShield: Resource = new Resource(20, "abc", "Wooden Shield");
var Rifle: Resource = new Resource(21, "abc", "Rifle");
var IronShield: Resource = new Resource(22, "abc", "Iron Shield");
var SteelArmor: Resource = new Resource(23, "abc", "Steel Armor");
var Wand: Resource = new Resource(24, "abc", "Wand");
var Crossbow: Resource = new Resource(25, "abc", "Crossbow");
var Staff: Resource = new Resource(26, "abc", "Staff");
var EnchantedBlade: Resource = new Resource(27, "abc", "Enchanted Blade");
var MysticBow: Resource = new Resource(28, "abc", "Mystic Bow");
var ArcaneRifle: Resource = new Resource(29, "abc", "Arcane Rifle");
var HolyLance: Resource = new Resource(30, "abc", "Holy Lance");
var ResourceArr: Resource[] = [Man, Wood, Iron, Thread, Steel, Gunpowder, ManaShard, Coin, Plank,
    IronBar, Nylon, IronBlade, Manacyte, Bullet, SteelBar, Arrow, SteelPlate, Spear, Sword,
    Bow, WoodenShield, Rifle, IronShield, SteelArmor, Wand, Crossbow, Staff, EnchantedBlade,
    MysticBow, ArcaneRifle, HolyLance];

//Units
var Spearman: Unit = new Unit(0, "abc", "Spearman", 6, 1, 2, 0, thePlayer, 20);
var Swordsman: Unit = new Unit(1, "abc", "Swordsman", 6, 10, 1, 0, thePlayer, 40);
var Archer: Unit = new Unit(2, "abc", "Archer", 5, 100, 4, 0, thePlayer, 160);
var Pikeman: Unit = new Unit(3, "abc", "Pikeman", 7, 14, 2, 0, thePlayer, 20);
var Warrior: Unit = new Unit(4, "abc", "Warrior", 7.5, 60, 1, 0, thePlayer, 40);
var Rifleman: Unit = new Unit(5, "abc", "Rifleman", 5, 250, 3, 0, thePlayer, 80);
var Knight: Unit = new Unit(6, "abc", "Knight", 10, 200, 1, 0, thePlayer, 40);
var CrossArcher: Unit = new Unit(7, "abc", "Cross Archer", 6, 1500, 5, 0, thePlayer, 160);
var Chanter: Unit = new Unit(8, "abc", "Chanter", 5, 6000, 5, 0, thePlayer, 400);
var Paladin: Unit = new Unit(9, "abc", "Paladin", 10, 800, 2, 0, thePlayer, 20);
var Gladiator: Unit = new Unit(10, "abc", "Gladiator", 12.5, 4000, 1, 0, thePlayer, 40);
var Magus: Unit = new Unit(11, "abc", "Magus", 12.5, 100000, 6, 0, thePlayer, 400);
var ArcaneGunslinger: Unit = new Unit(12, "abc", "Arcane Gunslinger", 6, 55000, 6, 0, thePlayer, 80);
var MysticRanger: Unit = new Unit(13, "abc", "MysticRanger", 7.5, 320000, 5, 0, thePlayer, 160);

//RefinerTrainer
var Recruiter: RefinerTrainer = new RefinerTrainer(0, "abc", "Recruiter", [Coin], [1], [Man], [1], 200);
var Woodworker: RefinerTrainer = new RefinerTrainer(1, "abc", "Woodworker", [Wood], [1], [Plank], [2], 100);
var Ironsmith: RefinerTrainer = new RefinerTrainer(2, "abc", "Ironsmith", [Iron], [5], [IronBar], [1], 60);
var Couturier: RefinerTrainer = new RefinerTrainer(3, "abc", "Couturier", [Thread], [8], [Nylon], [1], 50);
var BladeSmith: RefinerTrainer = new RefinerTrainer(4, "abc", "Bladesmith", [IronBar], [2], [IronBlade], [1], 100);
var ManaRefiner: RefinerTrainer = new RefinerTrainer(5, "abc", "Mana Refiner", [ManaShard], [1], [Manacyte], [1], 80);
var PyrotechnicExpert: RefinerTrainer = new RefinerTrainer(6, "abc", "Pyrotechnic Expert", [IronBar], [1], [Bullet], [10], 30);
var SteelWorker: RefinerTrainer = new RefinerTrainer(7, "abc", "Steel Worker", [Steel], [5], [SteelBar], [1], 60);
var Fletcher: RefinerTrainer = new RefinerTrainer(8, "abc", "Fletcher", [Plank, Iron], [5, 1], [Arrow], [20], 80);
var Metallurgist: RefinerTrainer = new RefinerTrainer(9, "abc", "Metallurgist", [SteelBar], [2], [SteelPlate], [1], 200);
var SpearCrafter: RefinerTrainer = new RefinerTrainer(10, "abc", "Spear Crafter", [IronBar, Plank], [1, 2], [Spear], [2], 120);
var Blacksmith: RefinerTrainer = new RefinerTrainer(11, "abc", "Blacksmith", [IronBlade, Plank], [1, 1], [Sword], [1], 100);
var Bowyer: RefinerTrainer = new RefinerTrainer(12, "abc", "Bowyer", [Nylon, Plank], [3, 1], [Bow], [1], 160);
var WoodenShieldSmith: RefinerTrainer = new RefinerTrainer(13, "abc", "Wooden Shield Smith", [Plank], [3], [WoodenShield], [1], 160);
var IronShieldSmith: RefinerTrainer = new RefinerTrainer(14, "abc", "Iron Shield Smith", [WoodenShield, IronBar], [1, 1], [IronShield], [1], 160);
var Armorer: RefinerTrainer = new RefinerTrainer(15, "abc", "Armorer", [SteelPlate], [2], [SteelArmor], [1], 300);
var Gunsmith: RefinerTrainer = new RefinerTrainer(16, "abc", "Gunsmith", [SteelBar], [2], [Rifle], [1], 300);
var Crossbowyer: RefinerTrainer = new RefinerTrainer(17, "abc", "Crossbowyer", [Bow, Steel], [1, 1], [Crossbow], [1], 200);
var Wandmaker: RefinerTrainer = new RefinerTrainer(18, "abc", "Wandmaker", [Manacyte, Plank], [1, 1], [Wand], [1], 200);
var StaffCrafter: RefinerTrainer = new RefinerTrainer(19, "abc", "Staff Crafter", [Wand, Steel], [1, 1], [Staff], [1], 200);
var EnchantedBladeSmith: RefinerTrainer = new RefinerTrainer(20, "abc", "Enchanted Blade Smith", [Sword, Manacyte], [5, 1], [EnchantedBlade], [1], 1200);
var MysticBowyer: RefinerTrainer = new RefinerTrainer(21, "abc", "Mystic Bowyer", [Bow, Manacyte], [5, 1], [MysticBow], [1], 1200);
var ArcaneGunsmith: RefinerTrainer = new RefinerTrainer(22, "abc", "Arcane Gunsmith", [Rifle, Manacyte], [5, 1], [ArcaneRifle], [1], 1200);
var LanceSmith: RefinerTrainer = new RefinerTrainer(23, "abc", "Lance Smith", [Spear, Manacyte], [5, 1], [HolyLance], [1], 1200);
var SpearmanInstructor: RefinerTrainer = new RefinerTrainer(24, "abc", "Spearman Instructor", [Spear, Man, Coin], [1, 3, 1], [Spearman], [1], 40);
var SwordsmanInstructor: RefinerTrainer = new RefinerTrainer(25, "abc", "Swordsman Instructor", [Sword, Man, Coin], [1, 3, 1], [Swordsman], [1], 70);
var BowmanInstructor: RefinerTrainer = new RefinerTrainer(26, "abc", "Bowman Instructor", [Bow, Man, Coin, Arrow], [1, 1, 5, 10], [Archer], [1], 70);
var RiflemanInstructor: RefinerTrainer = new RefinerTrainer(27, "abc", "Rifleman Instructor", [Rifle, Coin, Bullet, Man], [1, 30, 10, 1], [Rifleman], [1], 160);
var ChanterInstructor: RefinerTrainer = new RefinerTrainer(28, "abc", "Chanter Instructor", [Wand, Man, Coin], [1, 1, 200], [Chanter], [1], 400);
var PikemanTrainer: RefinerTrainer = new RefinerTrainer(29, "abc", "Pikeman Trainer", [Spearman, Coin, WoodenShield], [1, 10, 1], [Pikeman], [1], 160);
var WarriorTrainer: RefinerTrainer = new RefinerTrainer(30, "abc", "Warrior Trainer", [Swordsman, Coin, WoodenShield], [1, 10, 1], [Warrior], [1], 240);
var KnightMentor: RefinerTrainer = new RefinerTrainer(31, "abc", "Knight Mentor", [Warrior, SteelArmor, IronShield, Coin], [1, 1, 1, 75], [Knight], [1], 400);
var CrossArcherTrainer: RefinerTrainer = new RefinerTrainer(32, "abc", "Cross Archer Trainer", [Archer, Crossbow, Coin], [1, 1, 120], [CrossArcher], [1], 240);
var MagusMaster: RefinerTrainer = new RefinerTrainer(33, "abc", "Magus Master", [Chanter, Staff, Coin], [1, 1, 2500], [Magus], [1], 900);
var PaladinMaster: RefinerTrainer = new RefinerTrainer(34, "abc", "Paladin Master", [Pikeman, HolyLance, SteelArmor, Coin], [1, 1, 1, 500], [Paladin], [1], 900);
var ArcaneGunslingerMaster: RefinerTrainer = new RefinerTrainer(35, "abc", "Arcane Gunslinger Master", [Rifleman, ArcaneRifle, Coin], [1, 1, 5500], [ArcaneGunslinger], [1], 900);
var MysticRangerMaster: RefinerTrainer = new RefinerTrainer(36, "abc", "Mystic Ranger Master", [CrossArcher, MysticBow, Coin], [1, 1, 15000], [MysticRanger], [1], 900);
var RefinerTrainerArr: RefinerTrainer[] = [Recruiter, Woodworker, Ironsmith, Couturier, BladeSmith, ManaRefiner, PyrotechnicExpert,
    SteelWorker, Fletcher, Metallurgist, SpearCrafter, Blacksmith, Bowyer, WoodenShieldSmith, IronShieldSmith, Armorer, Gunsmith, Crossbowyer,
    Wandmaker, StaffCrafter, EnchantedBladeSmith, MysticBowyer, ArcaneGunsmith, LanceSmith, SpearmanInstructor, SwordsmanInstructor,
    BowmanInstructor, RiflemanInstructor, ChanterInstructor, PikemanTrainer, WarriorTrainer, KnightMentor, CrossArcherTrainer,
    MagusMaster, PaladinMaster, ArcaneGunslingerMaster, MysticRangerMaster];

//Heroes
var Charles: Hero = new Hero(0, "abc", "Charles the Mage Doctor", 1000, 0, 50, 1, [19, 20, 21, 22, 23], thePlayer);
var Yusie: Hero = new Hero(1, "abc", "Yusie the Gunslinger", 1500, 50, 50, 1, [24, 25, 26, 27, 28], thePlayer);
var Halley: Hero = new Hero(2, "abc", "Halley the Ranger", 3500, 30, 50, 1, [29, 30, 31, 32, 33], thePlayer);
var Helmuth: Hero = new Hero(3, "abc", "Helmuth the Lancer", 10000, 10, 50, 1, [34, 35, 36, 37, 38], thePlayer);
var HeroArr: Hero[] = [Charles, Yusie, Halley, Helmuth];

function HeroUnlock(index: number): void {
    HeroArr[index].Unlocked();
    SkillArray[(index * 5) + 19].Unlock(); //Hero's basic skill
}

function HeroKillMechanics(damage: number, count: number): void {
    let index: number = Math.round(Math.random() * (HeroArr.length - 1));
    let counter: number = 0;
    while (counter < count) {
        HeroArr[index].ReceiveDamage(damage);
        counter += 1;
        do {
            index = Math.round(Math.random() * (HeroArr.length - 1));
        }
        while (HeroArr[index].CurrentHP < damage);
    }
}

function RefinerTrainerKillMechanics(isCount: boolean, countOrPercentage: number): void {
    if (isCount) {
        let counter: number = 0;
        while (counter < countOrPercentage) {
            let killArray: RefinerTrainer[] = [];
            for (var i = 0; i < RefinerTrainerArr.length; i++) {
                if (RefinerTrainerArr[i].Count > 0) {
                    killArray.push(RefinerTrainerArr[i]);
                }
            }
            if (killArray.length < 1) { counter = countOrPercentage;} 
            let countShare: number = Math.max(1, Math.floor((countOrPercentage - counter) / killArray.length));
            for (var i = 0; i < killArray.length && counter < countOrPercentage; i++) {
                let toBeDeducted = Math.min(countShare, RefinerTrainerArr[i].Count);
                counter += toBeDeducted;
                RefinerTrainerArr[i].Decrease(toBeDeducted);
            }
        }
    } else {
        for (var i = 0; i < RefinerTrainerArr.length; i++) {
            RefinerTrainerArr[i].Decrease(RefinerTrainerArr[i].Count * countOrPercentage);
        }
    }
}

//Enemy (Base Exp and Resource not confirmed)
let Slime: Enemy = new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1, 6], 40, 0, 20, function (currentDamage: number, stage: StageLevel): number { return 1; }, 100000, StageOne, false);
let Boar: Enemy = new Enemy(0, 1, "abc", "Boar", 15, 4, 5, [1, 1, 1, 1, 6, 6], 40, 1, 100, function (currentDamage: number, stage: StageLevel): number { HeroKillMechanics(2 * currentDamage, 1); return 1; }, 200, StageOne, false);
let Ashwinder1: Enemy = new Enemy(0, 2, "abc", "Ashwinder", 8, 2, 5, [1, 1, 3, 3, 6, 6], 40, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 1); return 1; }, 200, StageOne, false);
let Arachne: Enemy = new Enemy(0, 3, "abc", "Arachne", 10, 4, 5, [3, 3, 3, 3, 6, 6], 20, 0, 100, function (currentDamage: number, stage: StageLevel): number { return 1; }, 100000, StageOne, false);
let Drunkard: Enemy = new Enemy(0, 4, "abc", "Drunkard", 5, 2, 5, [2, 2, 2, 2, 4, 4, 7, 7, 6], 10, 0, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 1); return 1; }, 100, StageOne, false);
let Bandit: Enemy = new Enemy(0, 5, "abc", "Bandit", 7, 3, 5, [4, 2, 5, 5, 7, 7, 7, 7, 7, 6, 6, 6], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { return 3; }, 200, StageOne, false);
let RevoltBrawler: Enemy = new Enemy(0, 6, "abc", "Revolt Brawler", 8, 4, 5, [4, 4, 4, 4, 2, 2, 2, 2, 7, 7, 7, 7], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { HeroKillMechanics(5 * currentDamage, 1); return 1; }, 300, StageOne, false);
let RevoltFootman: Enemy = new Enemy(0, 7, "abc", "Revolt Footman", 10, 5, 5, [4, 4, 4, 4, 2, 2, 2, 2, 5, 5, 5, 7, 7, 7, 7], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 2); return 1; }, 160, StageOne, true);
// let Ashwinder2: Enemy = new Enemy(1, 8, "abc", "Ashwinder", 8, 2, 5, [1, 1, 3, 3, 6, 6, 10], 40, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 1); return 1; }, 200, theStage);
// let RevoltFootman2: Enemy = new Enemy(1, 9, "abc", "Revolt Footman", 10, 5, 5, [4, 4, 4, 4, 2, 2, 2, 2, 5, 5, 5, 7, 7, 7, 7, 9, 14], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 2); return 1; }, 160, theStage);
// let Harpy1: Enemy = new Enemy(1, 10, "abc", "Harpy", 100, 55, 5, [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 10], 40, 5, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 2); HeroKillMechanics(2 * currentDamage, 2); return 4; }, 300, theStage);
// let Knarl: Enemy = new Enemy(1, 11, "abc", "Knarl", 140, 50, 5, [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 10], 60, 5, 100, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, 5); return 2;}, 300, theStage);
// let RevoltSpearman: Enemy = new Enemy(1, 12, "abc", "Revolt Spearman", 85, 45, 5, [1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 9, 14, 17], 30, 1, 100, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, stage.CurrentZone * stage.CurrentZone); return 2; }, 100, theStage);
// let RevoltArcher: Enemy = new Enemy(1, 13, "abc", "Revolt Archer", 75, 90, 5, [1, 1, 2, 2, 3, 3, 3, 3, 3, 6, 6, 7, 7, 7, 7, 7, 15, 19], 40, 0, 100, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, stage.CurrentZone * stage.CurrentZone); return 2; }, 100, theStage);
// let RevoltWarrior: Enemy = new Enemy(1, 14, "abc", "Revolt Warrior", 110, 40, 5, [1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 9, 14, 18], 20, 20, 160, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, stage.CurrentZone); return 1; }, 60, theStage);
// let RevoltFencer1: Enemy = new Enemy(1, 15, "abc", "Revolt Fencer", 70, 23, 5, [1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 13, 9, 14, 23], 10, 0, 160, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < stage.CurrentZone; i++) { RefinerTrainerRandomizer().Decrease(1); } return 1; }, 60, theStage);
// let Harpy2: Enemy = new Enemy(2, 16, "abc", "Harpy", 100, 55, 5, [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 10, 6, 6, 6, 15, 15, 19, 19], 40, 5, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerRandomizer().Decrease(1); RefinerTrainerRandomizer().Decrease(1); HeroRandomizer().ReceiveDamage(2 * currentDamage); HeroRandomizer().ReceiveDamage(2 * currentDamage); return 4; }, 300, theStage);
// let RevoltFencer2: Enemy = new Enemy(2, 17, "abc", "Revolt Fencer", 70, 23, 5, [1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 13, 13, 9, 9, 14, 14, 23, 23, 11], 10, 0, 160, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < stage.CurrentZone; i++) { RefinerTrainerRandomizer().Decrease(1); } return 1; }, 60, theStage);
// let Siren: Enemy = new Enemy(2, 18, "abc", "Siren", 1000, 255, 5, [6, 6, 6, 6, 6, 6, 6, 6, 13, 13, 13, 13, 13, 13, 13, 5, 5, 5, 5, 5, 15, 15, 15, 15, 15, 15, 15, 15, 15], 30, 200, 60, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < 5; i++) { RefinerTrainerRandomizer().Decrease(1); } return 2; }, 100, theStage);
// let RevoltRanger: Enemy = new Enemy(2, 19, "abc", "Revolt Ranger", 33500, 33000, 5, [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 711, 11, 11, 11, 13, 13, 13, 13, 12, 12, 12, 15, 15, 15, 15, 15, 21, 21], 40, 3000, 100, function (currentDamage: number, stage: StageLevel) { HeroRandomizer().ReceiveDamage(3 * currentDamage); return 1; }, 140, theStage);
// let RevoltMusketeer1: Enemy = new Enemy(2, 20, "abc", "Revolt Musketeer", 1500, 2500, 5, [1, 1], 80, 50, 100, function (currentDamage: number): number { return 1; }, 100000, theStage);
// let RevoltHexblade: Enemy = new Enemy(2, 21, "abc", "Revolt Hexblade", 2300, 1200, 5, [1, 1], 80, 500, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerRandomizer().Decrease(1); RefinerTrainerRandomizer().Decrease(1); HeroRandomizer().ReceiveDamage(5 * currentDamage); HeroRandomizer().ReceiveDamage(5 * currentDamage); HeroRandomizer().ReceiveDamage(5 * currentDamage); return 4; }, 300, theStage);
//let RevoltWarlord: Enemy = new Enemy(2, 22, "abc", "Revolt Warlord", 1900, 500, 5, [1, 1], 20, 100, 100, theStage);
//let RevoltWarlock: Enemy = new Enemy(2, 23, "abc", "Revolt Warlock", 1250, 780, 5, [1, 1], 20, 100, 100, theStage);
// let Siren2: Enemy = new Enemy(3, 24, "abc", "Siren", 1000, 255, 5, [1, 1], 30, 200, 60, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < 5; i++) { RefinerTrainerRandomizer().Decrease(1); } return 2; }, 100, theStage);
//let Yeti1: Enemy = new Enemy(3, 25, "abc", "Yeti", 40000, 30000, 5, [1, 1], 60, 5000, 100, theStage);
// let RevoltMusketeer2: Enemy = new Enemy(3, 26, "abc", "Revolt Musketeer", 1500, 2500, 5, [1, 1], 80, 50, 100, function (currentDamage: number): number { return 1; }, 100000, theStage);
//let RevoltAssasin: Enemy = new Enemy(3, 27, "abc", "Revolt Assasin", 28000, 12000, 5, [1, 1], 15, 0, 10, theStage);
//let RevoltTheurgist: Enemy = new Enemy(3, 28, "abc", "Revolt Theurgist", 1500, 3000, 5, [1, 1], 100, 150, 100, theStage);
//let RevoltCavalier: Enemy = new Enemy(3, 29, "abc", "Revolt Cavalier", 48500, 7500, 5, [1, 1], 30, 5000, 80, theStage);
//let RevoltGladiator1: Enemy = new Enemy(3, 30, "abc", "Revolt Gladiator", 300000, 240000, 5, [1, 1], 40, 20000, 100, theStage);
//let RevoltNecromancer1: Enemy = new Enemy(3, 31, "abc", "Revolt Necromancer", 35000, 9000, 5, [1, 1], 60, 1000, 120, theStage);
//let Dragon: Enemy = new Enemy(4, 32, "abc", "Dragon", 1000000, 375000, 5, [1, 1], 30, 50000, 100, theStage);
//let Yeti2: Enemy = new Enemy(4, 33, "abc", "Yeti", 40000, 30000, 5, [1, 1], 60, 5000, 100, theStage);
//let RevoltGladiator2: Enemy = new Enemy(4, 34, "abc", "Revolt Gladiator", 300000, 240000, 5, [1, 1], 40, 20000, 100, theStage);
//let RevoltNecromancer2: Enemy = new Enemy(4, 35, "abc", "Revolt Necromancer", 35000, 9000, 5, [1, 1], 60, 1000, 120, theStage);
//let RevoltArcaneRanger: Enemy = new Enemy(4, 36, "abc", "Revolt Arcane Ranger", 850000, 275000, 5, [1, 1], 20, 10000, 80, theStage);
//let RevoltMarksman: Enemy = new Enemy(4, 37, "abc", "Revolt Marksman", 700000, 750000, 5, [1, 1], 40, 20000, 100, theStage);
//let RevoltLancer: Enemy = new Enemy(4, 38, "abc", "Revolt Lancer", 1050000, 275000, 5, [1, 1], 50, 20000, 60, theStage);
//let RevoltSummoner: Enemy = new Enemy(4, 39, "abc", "Revolt Lancer", 750000, 400000, 5, [1, 1], 80, 0, 100, theStage);
// let Manticore: Enemy = new Enemy(5, 40, "abc", "Manticore", 1200000, 900000, 5, [1, 1], 60, 100000, 160, theStage);

var StageOneEnemyArr: Enemy[] = [Slime, Boar, Ashwinder1, Arachne, Drunkard, Bandit, RevoltBrawler, RevoltFootman];
var StageTwoEnemyArr: Enemy[] = [];
var StageThreeEnemyArr: Enemy[] = [];
var StageFourEnemyArr: Enemy[] = [];
var StageFiveEnemyArr: Enemy[] = [];
var RangeOneUnitArr: Unit[] = [Swordsman, Warrior, Knight];
var RangeTwoUnitArr: Unit[] = [Spearman, Pikeman, Paladin];
var RangeThreeUnitArr: Unit[] = [Rifleman];
var RangeFourUnitArr: Unit[] = [Archer];
var RangeFiveUnitArr: Unit[] = [CrossArcher, Chanter, MysticRanger];
var RangeSixUnitArr: Unit[] = [Magus, ArcaneGunslinger];
var FullUnitArr: Unit[] = [Spearman, Swordsman, Archer, Pikeman, Warrior, Rifleman, Knight, CrossArcher, Chanter, Paladin, Magus, ArcaneGunslinger, MysticRanger];

var theStorage = new Storage(thePlayer, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
    StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, FullUnitArr, HeroArr, ResourceArr, RefinerTrainerArr, StageArray);

var skillFactory: ISkillFactory = new SkillFactory(theStorage, []);
var Heal = skillFactory.CreateHeroActive("Heal");
var Purify = skillFactory.CreateHeroActive("Purify");
var ArcaneShelter = skillFactory.CreateHeroActive("ArcaneShelter");
var StrafingRun = skillFactory.CreateHeroActive("StrafingRun");
var Hurricane = skillFactory.CreateHeroActive("Hurricane");
var CrossCut = skillFactory.CreateHeroActive("CrossCut");
var LanceDance = skillFactory.CreateHeroActive("LanceDance");
var UnlimitedLanceWork = skillFactory.CreateHeroActive("UnlimitedLanceWork");
var VitalContract = skillFactory.CreateHeroPassive("VitalContract");
var RecoveryMantra = skillFactory.CreateHeroPassive("RecoveryMantra");
var Bang = skillFactory.CreateHeroPassive("Bang");
var DoubleTap = skillFactory.CreateHeroPassive("DoubleTap");
var Marksman = skillFactory.CreateHeroPassive("Marksman");
var Matrix = skillFactory.CreateHeroPassive("Matrix");
var FocusShot = skillFactory.CreateHeroPassive("FocusShot");
var TriangleFire = skillFactory.CreateHeroPassive("TriangleFire");
var AuraOfAccuracy = skillFactory.CreateHeroPassive("AuraOfAccuracy");
var SuperiorPerception = skillFactory.CreateHeroPassive("SuperiorPerception");
var Lance = skillFactory.CreateHeroPassive("Lance");
var IndraBlessing = skillFactory.CreateHeroPassive("IndraBlessing");

var heroActiveSkill: IActiveSkill[] = [Heal, Purify, ArcaneShelter, StrafingRun, Hurricane, CrossCut, LanceDance, UnlimitedLanceWork];
heroActiveSkill.forEach(x => skillFactory.HeroActiveSkill.push(x));

var Recruit: IActiveSkill = skillFactory.CreatePlayerActive("Recruit");
var Steal: IActiveSkill = skillFactory.CreatePlayerActive("Steal");
var Heist: IActiveSkill = skillFactory.CreatePlayerActive("Heist");
var MoneyIsPower: IActiveSkill = skillFactory.CreatePlayerActive("MoneyIsPower");
var Ballad: IActiveSkill = skillFactory.CreatePlayerActive("Ballad");
var Solo: IActiveSkill = skillFactory.CreatePlayerActive("Solo");
var SongOfCourage: IActiveSkill = skillFactory.CreatePlayerActive("SongOfCourage");
var ChorusOfDeath: IActiveSkill = skillFactory.CreatePlayerActive("ChorusOfDeath");
var ImpactStab: IActiveSkill = skillFactory.CreatePlayerActive("ImpactStab");
var Whirlwind: IActiveSkill = skillFactory.CreatePlayerActive("Whirlwind");
var FinalBlow: IActiveSkill = skillFactory.CreatePlayerActive("FinalBlow");
var DarkRitual: IActiveSkill = skillFactory.CreatePlayerActive("DarkRitual");
var Biohack: IActiveSkill = skillFactory.CreatePlayerActive("Biohack");
var CursedContract: IActiveSkill = skillFactory.CreatePlayerActive("CursedContract");
var Pickpocket: IPassiveSkill = skillFactory.CreatePlayerPassive("Pickpocket");
var CoinAffinity: IPassiveSkill = skillFactory.CreatePlayerPassive("CoinAffinity");
var MelodicAura: IPassiveSkill = skillFactory.CreatePlayerPassive("MelodicAura");
var Valor: IPassiveSkill = skillFactory.CreatePlayerPassive("Valor");
var WarCry: IPassiveSkill = skillFactory.CreatePlayerPassive("WarCry");

var SkillArray: any = [Recruit, Pickpocket, Steal, CoinAffinity, Heist, MoneyIsPower, Ballad, Solo, MelodicAura, SongOfCourage, ChorusOfDeath, ImpactStab, Valor, Whirlwind, WarCry, FinalBlow, DarkRitual, Biohack, CursedContract, VitalContract, Heal, Purify, RecoveryMantra, ArcaneShelter, Bang, DoubleTap, StrafingRun, Marksman, Matrix, FocusShot, TriangleFire, AuraOfAccuracy, SuperiorPerception, Hurricane, Lance, CrossCut, LanceDance, IndraBlessing, UnlimitedLanceWork]; 
var ActiveSkillArray: IActiveSkill[] = [Recruit, Steal, Heist, MoneyIsPower, Ballad, Solo, SongOfCourage, ChorusOfDeath,
    ImpactStab, Whirlwind, FinalBlow, DarkRitual, Biohack, CursedContract, Heal, Purify, ArcaneShelter,
    StrafingRun, Hurricane, CrossCut, LanceDance, UnlimitedLanceWork];

function UnlockSkill(index: number):void {
    SkillArray[index].Unlock();
}

var clickerIndex: ClickerIndex = new ClickerIndex(skillFactory);

$(document).ready(function () {
    //$("#map-image").draggable({
    //    containment: "#map-container",
    //    cursor: "crosshair"
    //});
    $("#backdrop").fadeIn(0);
    $("#sophie").click(function () {
        $("#sophie").css("z-index", "101");
        $("#resource-unit-div").css("z-index", "0");
        $("#side-panel-black-overlay,#sophie-speech,#clickable-screen").fadeIn(0, function () {
            $("#clickable-screen").click(function () {
                $("#side-panel-black-overlay,#sophie-speech,#clickable-screen").fadeOut(0);
                $("#sophie").css("z-index", "10");
            });
        });
    });
    $(".side-panel-button").click(function () {
        var button = $(this);
        var id = button.attr('name');
        $(".side-panel-info-card").animate({ "right": "-600%" }, 600);
        if (button.hasClass("selectedPanel")) {
            button.removeClass("selectedPanel");
        }
        else {
            $(".selectedPanel").removeClass("selectedPanel");
            $("#" + id).animate({ "right": "100%" }, 600);
            button.addClass("selectedPanel");
        }
    });
    $(".side-panel-block").click(function () {
        $("#sophie").css("z-index", "0");
        var id = $(this).attr('name');
        $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeIn(0);
        $("#clickable-screen").click(function () {
            $("#side-panel-black-overlay,#clickable-screen,#" + id).fadeOut(0);
            $("#sophie").css("z-index", "10");
        });
    });
    $(".refiner-trainer-button").click(function () {
        var id = $(this).attr('name');
        $("#refiner-trainer-area").children().fadeOut(0);
        if (id === "refiner-repo") {
            $("#refiner-trainer-title-text").text("Refiners");
        }
        else {
            $("#refiner-trainer-title-text").text("Trainers");
        }
        $("#" + id).fadeIn(0);
        $("#manpower-count-div, #manpower-count-separator, #Recruit-button").fadeIn(0);
    });
    $(".map-stats-skills-heroes-button").click(function () {
        var id = $(this).attr('name');
        $("#map-div-area").children().fadeOut(0);
        if (id === "stats-selected") {
            $("#map-title-text").text("Stats");
        }
        if (id === "skills-selected") {
            $("#map-title-text").text("Skills");
        }
        if (id === "heroes-selected") {
            $("#map-title-text").text("Heroes");
        }
        if (id === "map-selected") {
            $("#map-title-text").text("Map");
        }
        $("#" + id).fadeIn(0);
        if (typeof id === 'string') {
            let repoId: string = id.split("-")[0] + "-repo";
            $("#map-div-slider").attr("slideTab", repoId);
        }
        $("#map-div-slider").fadeIn(0);
    });
    $("#toggle-button").click(function () {
        if (!($("#toggle-button").hasClass("toggle-button-switched"))) {
            $("#toggle-button").addClass("toggle-button-switched").animate({ "right": "2%" }, 300);
            $("#resource-unit-title-text").text("Units");
            $("#unit-area,#unit-repo-slider").fadeIn(200);
            $("#resource-area,#primary-resource-repo-slider,#secondary-resource-repo-slider,#tertiary-resource-repo-slider").fadeOut(200);
        }
        else {
            $("#toggle-button").removeClass("toggle-button-switched").animate({ "right": "7%" }, 300);
            $("#resource-unit-title-text").text("Resources");
            $("#unit-area,#unit-repo-slider").fadeOut(200);
            $("#resource-area,#primary-resource-repo-slider,#secondary-resource-repo-slider,#tertiary-resource-repo-slider").fadeIn(200);
        }
    });

    //NEW

    clickerIndex.AddSkillUnlockFunction(UnlockSkill);//Initialize event listeners for skills
    ActiveSkillArray.forEach(x => clickerIndex.AddTimeCounterFunction(x.UpdateTimeCounter));//Initialize event listeners for skills
    Pickpocket.Unlock(); //Trial skill and to gain resources faster to see effects
    Steal.Unlock(); //Trial skill and to gain resources faster to see effects
    //CoinAffinity.Unlock(); //Trial skill and to gain resources faster to see effects
    Heal.Unlock(); //Trial skill and to gain resources faster to see effects
    clickerIndex.CurrentStorage.CurrentEnemyArr[0].Birth();
    clickerIndex.CurrentStorage.PureUnitArr[0].Unlocked();
    HeroUnlock(1);
    HeroUnlock(2);
    //HeroUnlock(3);
    for (var i = 0; i < SkillArray.length; i++) {
        UnlockSkill(i);
    }

    $("#monster-div").click(function () {
        $("#" + clickerIndex.CurrentStorage.CurrentEnemyArr[0].name.replace(/\s+/g, '') + "-hurt").stop(true).fadeOut();
        $("#" + clickerIndex.CurrentStorage.CurrentEnemyArr[0].name.replace(/\s+/g, '') + "-normal").stop(true).css("top", "0");
        clickerIndex.CurrentStorage.CurrentEnemyArr[0].ReceiveDamage(clickerIndex.CurrentStorage.CurrentPlayer.CurrentDamage);
    });

    $("#village-zone-arrow-left").click(function () {
        clickerIndex.ChangeZone(false);
    });

    $("#village-zone-arrow-right").click(function () {
        clickerIndex.ChangeZone(true);
    });

    $(".skill-button").click(function () {
        let string = $(this).attr("skillIndex");
        if (typeof (string) === "string" && string != "18") {
            let id: number = parseInt(string);
            console.log("Skill clicked");
            SkillArray[id].Action();
        }
        //For Cursed Contract, use an event listener        
    });
    $(".skills-icon").click(function () {
        let string = $(this).attr("skillIndex");
        if (typeof (string) === "string" && string != "18") {
            let id: number = parseInt(string);
            console.log("Skill clicked");
            SkillArray[id].Action();
        }
        //For Cursed Contract, use an event listener        
    });

    $(".skill-point-button").click(function () {
        let string = $(this).attr("skillTag");
        if (typeof (string) === "string" && string != "18" && clickerIndex.CurrentStorage.CurrentPlayer.SkillPoint > 0) {
            let id: number = parseInt(string);
            clickerIndex.CurrentStorage.CurrentPlayer.DecreaseSkillPoint();
            SkillArray[id].LevelUp();
        }
        //For Cursed Contract, use an event listener        
    });

    $(".refiner-calibrator-left-arrow").click(function () {
        let id = $(this).attr("refinerCalibration");
        let readQuantity: string = $("#" + id).text();
        let checkExponential: string = readQuantity[4];
        if (checkExponential == "e") {
            let realQuantity: string = readQuantity.split(" ")[1];
            let numberOfZero: number = parseInt(realQuantity.split("e")[1]);
            let currentQuantity: number = parseInt(realQuantity.split("e")[0]);
            for (var i = 0; i < numberOfZero; i++) {
                currentQuantity = parseInt(currentQuantity.toString().concat("0"));
            }
            let newQuantity: string = "X " + adjustValueToExponential(currentQuantity / 10);
            $("#" + id).text(newQuantity);
        } else {
            let currentQuantity: number = parseInt(readQuantity.split(" ")[1]);
            let newQuantity: string = "X " + adjustValueToExponential(currentQuantity / 10);
            $("#" + id).text(newQuantity);
        }
    });

    $(".refiner-calibrator-right-arrow").click(function () {
        let id = $(this).attr("refinerCalibration");
        let readQuantity: string = $("#" + id).text();
        let checkExponential: string = readQuantity[4];
        if (checkExponential == "e") {
            let realQuantity: string = readQuantity.split(" ")[1];
            let numberOfZero: number = parseInt(realQuantity.split("e")[1]);
            let currentQuantity: number = parseInt(realQuantity.split("e")[0]);
            for (var i = 0; i < numberOfZero; i++) {
                currentQuantity = parseInt(currentQuantity.toString().concat("0"));
            }
            let newQuantity: string = "X " + adjustValueToExponential(currentQuantity * 10);
            $("#" + id).text(newQuantity);
        } else {
        let currentQuantity: number = parseInt(readQuantity.split(" ")[1]);
        let newQuantity: string = "X " + adjustValueToExponential(currentQuantity * 10);
            $("#" + id).text(newQuantity);
        }
    });

    $(".refiner-train").click(function () {
        let id = $(this).attr("refinerCalibration");
        let displayNumber: string = $("#" + id).text();
        let currentQuantity: number = parseInt(displayNumber.split(" ")[1]);
        if (typeof id === "string" && currentQuantity <= clickerIndex.CurrentStorage.ResourceArr[0].Count) {
            let refinerIndex: number = parseInt(id.split("-")[1]);
            clickerIndex.CurrentStorage.RefinerTrainerArr[refinerIndex].Increase(currentQuantity);
            clickerIndex.CurrentStorage.ResourceArr[0].Decrease(currentQuantity);
        }
    });

    $(".refiner-untrain").click(function () {
        let id = $(this).attr("refinerCalibration");
        let displayNumber: string = $("#" + id).text();
        let currentQuantity: number = parseInt(displayNumber.split(" ")[1]);
        let refinerIndex: number = (typeof id === "string")? parseInt(id.split("-")[1]) : 0;
        if (currentQuantity <= clickerIndex.CurrentStorage.RefinerTrainerArr[refinerIndex].Count) {
            clickerIndex.CurrentStorage.RefinerTrainerArr[refinerIndex].Decrease(currentQuantity);
            clickerIndex.CurrentStorage.ResourceArr[0].Increase(currentQuantity);
        }
    });

    $(".trainer-calibrator-left-arrow").click(function () {
        let id = $(this).attr("trainerCalibration");
        let currentQuantity: string = $("#" + id).text();
        if (currentQuantity != "X 1") {
            let newQuantity: string = currentQuantity.RemoveLast();
            $("#" + id).text(newQuantity);
        }
    });

    $(".trainer-calibrator-right-arrow").click(function () {
        let id = $(this).attr("trainerCalibration");
        let currentQuantity: string = $("#" + id).text();
        let newQuantity: string = currentQuantity.concat("0");
        $("#" + id).text(newQuantity);
    });

    $(".trainer-train").click(function () {
        let id = $(this).attr("trainerCalibration");
        let displayNumber: string = $("#" + id).text();
        let currentQuantity: number = parseInt(displayNumber.split(" ")[1]);
        if (typeof id === "string" && currentQuantity <= clickerIndex.CurrentStorage.ResourceArr[0].Count) {
            let refinerIndex: number = parseInt(id.split("-")[1]);
            clickerIndex.CurrentStorage.RefinerTrainerArr[refinerIndex].Increase(currentQuantity);
            clickerIndex.CurrentStorage.ResourceArr[0].Decrease(currentQuantity);
        }
    });

    $(".trainer-untrain").click(function () {
        let id = $(this).attr("trainerCalibration");
        let displayNumber: string = $("#" + id).text();
        let currentQuantity: number = parseInt(displayNumber.split(" ")[1]);
        let refinerIndex: number = (typeof id === "string")? parseInt(id.split("-")[1]) : 0;
        if (currentQuantity <= clickerIndex.CurrentStorage.RefinerTrainerArr[refinerIndex].Count) {
            clickerIndex.CurrentStorage.RefinerTrainerArr[refinerIndex].Decrease(currentQuantity);
            clickerIndex.CurrentStorage.ResourceArr[0].Increase(currentQuantity);
        }
    });

    $("#map-button").click(function () {
        HeroArr[0].Unlocked();
    });

    setInterval(function () {
        $("#player-avg-dps").text("Average DPS: " + Math.floor(clickerIndex.CurrentDPS));
    }, 50);

    //setInterval(function () {
    //    $("#monster-div").click();
    //}, 150);

    HeroUnlock(0);
    //clickerIndex.CurrentStorage.HeroArr[0].Birth();
    //clickerIndex.SetUpClicker();

});

var curYPos = 0;
var curXPos = 0;
var curDown = false;

$("#map-div-slider,#primary-resource-repo-slider,#secondary-resource-repo-slider,#tertiary-resource-repo-slider,#unit-repo-slider").on("mousemove", function (event) {
    let tab = $(this).attr("slideTab");
    //alert("Detected");
    if (curDown === true && typeof tab === "string") {
        //alert("Detected1");
        let scrollTop: any = $("#" + tab).scrollTop();
        let scrollLeft: any = $("#" + tab).scrollLeft();
        if (typeof scrollTop === "number" || typeof scrollLeft === "number") {
            //alert("Detected2");
            $("#" + tab).scrollTop(scrollTop + (curYPos - (event.pageY*1.1)));
            $("#" + tab).scrollLeft(scrollLeft + (curXPos - (event.pageX*1.1)));
        }
    }
});

$("#map-div-slider,#primary-resource-repo-slider,#secondary-resource-repo-slider,#tertiary-resource-repo-slider,#unit-repo-slider").on("mousedown", function (e) {
    curDown = true; 
curYPos = e.pageY; curXPos = e.pageX; e.preventDefault(); });
$("#map-div-slider,#primary-resource-repo-slider,#secondary-resource-repo-slider,#tertiary-resource-repo-slider,#unit-repo-slider").on("mouseup", function (e) {
    curDown = false; 
});
$("#map-div-slider,#primary-resource-repo-slider,#secondary-resource-repo-slider,#tertiary-resource-repo-slider,#unit-repo-slider").on("mouseout", function (e) {
    curDown = false;
});
