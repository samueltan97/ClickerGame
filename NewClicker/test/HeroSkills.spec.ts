//import { Enemy, Unit, Resource, RefinerTrainer, Hero } from "../src/javascript/InterfacesBaseClasses/BaseClass";
//import { Storage } from "../src/javascript/InterfacesBaseClasses/Storage";
//import { should, expect } from "chai";
//import { Player } from "../src/javascript/InterfacesBaseClasses/Player";
//import { StageLevel } from "../src/javascript/InterfacesBaseClasses/StageLevel";
//import { ClickerIndex } from "../src/javascript/InterfacesBaseClasses/ClickerIndex";
//import { EnemyValueUpdateEvent, UnitValueUpdateEvent } from "../src/javascript/InterfacesBaseClasses/ValueUpdateEvent";
//import { IStorage } from "../src/javascript/InterfacesBaseClasses/IStorage";
//import { Steal } from "../src/javascript/InterfacesBaseClasses/Skills/PlayerSkillsBaseClass";
//import { SkillFactory } from "../src/javascript/InterfacesBaseClasses/Skills/PlayerSkill";
//import { ISkillFactory } from "../src/javascript/InterfacesBaseClasses/Skills/ISkillFactory";
//import { HeroActiveSkill } from "../src/javascript/InterfacesBaseClasses/Skills/HeroSkillsBaseClass";
//import { IActiveSkill } from "../src/javascript/InterfacesBaseClasses/Skills/IActiveSkill";
//import { IPassiveSkill } from "../src/javascript/InterfacesBaseClasses/Skills/IPassiveSkill";
//import { setTimeout } from "timers";

//should();

//describe("HeroSkills", () => {

//    function SetupStorage(): Storage {
//        var thePlayer: Player = new Player(1, 0);
//        let StageOne: StageLevel = new StageLevel(1, "Kroigren");
//        let StageTwo: StageLevel = new StageLevel(2, "Brostika");
//        let StageThree: StageLevel = new StageLevel(3, "Erithven");
//        let StageFour: StageLevel = new StageLevel(4, "Boriolsis");
//        let StageFive: StageLevel = new StageLevel(5, "Malidret");
//        let StageArray: StageLevel[] = [StageOne, StageTwo, StageThree, StageFour, StageFive];

//        //Resources
//        var Man: Resource = new Resource(0, "abc", "Man");
//        var Wood: Resource = new Resource(1, "abc", "Wood");
//        var Iron: Resource = new Resource(2, "abc", "Iron");
//        var Thread: Resource = new Resource(3, "abc", "Thread");
//        var Steel: Resource = new Resource(4, "abc", "Steel");
//        var Gunpowder: Resource = new Resource(5, "abc", "Gunpowder");
//        var ManaShard: Resource = new Resource(6, "abc", "Mana Shard");
//        var Coin: Resource = new Resource(7, "abc", "Coin");
//        var Plank: Resource = new Resource(8, "abc", "Plank");
//        var IronBar: Resource = new Resource(9, "abc", "Iron Bar");
//        var Nylon: Resource = new Resource(10, "abc", "Nylon");
//        var IronBlade: Resource = new Resource(11, "abc", "Iron Blade");
//        var Manacyte: Resource = new Resource(12, "abc", "Manacyte");
//        var Bullet: Resource = new Resource(13, "abc", "Bullet");
//        var SteelBar: Resource = new Resource(14, "abc", "Steel Bar");
//        var Arrow: Resource = new Resource(15, "abc", "Arrow");
//        var SteelPlate: Resource = new Resource(16, "abc", "Steel Plate");
//        var Spear: Resource = new Resource(17, "abc", "Spear");
//        var Sword: Resource = new Resource(18, "abc", "Sword");
//        var Bow: Resource = new Resource(19, "abc", "Bow");
//        var WoodenShield: Resource = new Resource(20, "abc", "Wooden Shield");
//        var Rifle: Resource = new Resource(21, "abc", "Rifle");
//        var IronShield: Resource = new Resource(22, "abc", "Iron Shield");
//        var SteelArmor: Resource = new Resource(23, "abc", "Steel Armor");
//        var Wand: Resource = new Resource(24, "abc", "Wand");
//        var Crossbow: Resource = new Resource(25, "abc", "Crossbow");
//        var Staff: Resource = new Resource(26, "abc", "Staff");
//        var EnchantedBlade: Resource = new Resource(27, "abc", "Enchanted Blade");
//        var MysticBow: Resource = new Resource(28, "abc", "Mystic Bow");
//        var ArcaneRifle: Resource = new Resource(29, "abc", "Arcane Rifle");
//        var HolyLance: Resource = new Resource(30, "abc", "Holy Lance");
//        var ResourceArr: Resource[] = [Man, Wood, Iron, Thread, Steel, Gunpowder, ManaShard, Coin, Plank,
//            IronBar, Nylon, IronBlade, Manacyte, Bullet, SteelBar, Arrow, SteelPlate, Spear, Sword,
//            Bow, WoodenShield, Rifle, IronShield, SteelArmor, Wand, Crossbow, Staff, EnchantedBlade,
//            MysticBow, ArcaneRifle, HolyLance];

//        //Units
//        var Spearman: Unit = new Unit(0, "abc", "Spearman", 6, 1, 2, 1, thePlayer, 20);
//        var Swordsman: Unit = new Unit(1, "abc", "Swordsman", 6, 10, 1, 1, thePlayer, 40);
//        var Archer: Unit = new Unit(2, "abc", "Archer", 5, 100, 4, 1, thePlayer, 160);
//        var Pikeman: Unit = new Unit(3, "abc", "Pikeman", 7, 14, 2, 0, thePlayer, 20);
//        var Warrior: Unit = new Unit(4, "abc", "Warrior", 7.5, 60, 1, 0, thePlayer, 40);
//        var Rifleman: Unit = new Unit(5, "abc", "Rifleman", 5, 250, 3, 0, thePlayer, 80);
//        var Knight: Unit = new Unit(6, "abc", "Knight", 10, 200, 1, 0, thePlayer, 40);
//        var CrossArcher: Unit = new Unit(7, "abc", "Cross Archer", 6, 1500, 5, 0, thePlayer, 160);
//        var Chanter: Unit = new Unit(8, "abc", "Chanter", 5, 6000, 5, 0, thePlayer, 400);
//        var Paladin: Unit = new Unit(9, "abc", "Paladin", 10, 800, 2, 0, thePlayer, 20);
//        //var Gladiator: Unit = new Unit(10, "abc", "Gladiator", 12.5, 4000, 1, 0, thePlayer, 40);
//        var Magus: Unit = new Unit(11, "abc", "Magus", 12.5, 100000, 6, 0, thePlayer, 400);
//        var ArcaneGunslinger: Unit = new Unit(12, "abc", "Arcane Gunslinger", 6, 55000, 6, 0, thePlayer, 80);
//        var MysticRanger: Unit = new Unit(13, "abc", "MysticRanger", 7.5, 320000, 5, 0, thePlayer, 160);

//        //RefinerTrainer
//        var Recruiter: RefinerTrainer = new RefinerTrainer(0, "abc", "Recruiter", [Coin], [1], [Man], [1], 1200);
//        var Woodworker: RefinerTrainer = new RefinerTrainer(1, "abc", "Woodworker", [Wood], [1], [Plank], [2], 100);
//        var Ironsmith: RefinerTrainer = new RefinerTrainer(2, "abc", "Ironsmith", [Iron], [5], [IronBar], [1], 60);
//        var Couturier: RefinerTrainer = new RefinerTrainer(3, "abc", "Couturier", [Thread], [8], [Nylon], [1], 50);
//        var BladeSmith: RefinerTrainer = new RefinerTrainer(4, "abc", "Blade Smith", [IronBar], [2], [IronBlade], [1], 100);
//        var ManaRefiner: RefinerTrainer = new RefinerTrainer(5, "abc", "Mana Refiner", [Manacyte], [1], [ManaShard], [1], 80);
//        var PyrotechnicExpert: RefinerTrainer = new RefinerTrainer(6, "abc", "Pyrotechnic Expert", [IronBlade], [1], [Bullet], [10], 30);
//        var SteelWorker: RefinerTrainer = new RefinerTrainer(7, "abc", "Steel Worker", [Steel], [5], [SteelBar], [1], 60);
//        var Fletcher: RefinerTrainer = new RefinerTrainer(8, "abc", "Fletcher", [Plank, Iron], [5, 1], [Arrow], [20], 80);
//        var Metallurgist: RefinerTrainer = new RefinerTrainer(9, "abc", "Metallurgist", [SteelBar], [2], [SteelPlate], [1], 200);
//        var SpearCrafter: RefinerTrainer = new RefinerTrainer(10, "abc", "Spear Crafter", [IronBar, Plank], [1, 2], [Spear], [2], 120);
//        var Blacksmith: RefinerTrainer = new RefinerTrainer(11, "abc", "Blacksmith", [IronBlade, Plank], [1, 1], [Sword], [1], 100);
//        var Bowyer: RefinerTrainer = new RefinerTrainer(12, "abc", "Bowyer", [Nylon, Plank], [3, 1], [Bow], [1], 160);
//        var WoodenShieldSmith: RefinerTrainer = new RefinerTrainer(13, "abc", "Wooden Shield Smith", [Plank], [3], [WoodenShield], [1], 160);
//        var IronShieldSmith: RefinerTrainer = new RefinerTrainer(14, "abc", "Iron Shield Smith", [WoodenShield, IronBar], [1, 1], [IronShield], [1], 160);
//        var Armorer: RefinerTrainer = new RefinerTrainer(15, "abc", "Armorer", [SteelPlate], [2], [SteelArmor], [1], 300);
//        var Gunsmith: RefinerTrainer = new RefinerTrainer(16, "abc", "Gunsmith", [SteelBar], [2], [Rifle], [1], 300);
//        var Crossbowyer: RefinerTrainer = new RefinerTrainer(17, "abc", "Crossbowyer", [Bow, Steel], [1, 1], [Crossbow], [1], 200);
//        var Wandmaker: RefinerTrainer = new RefinerTrainer(18, "abc", "Wandmaker", [Manacyte, Plank], [1, 1], [Wand], [1], 200);
//        var StaffCrafter: RefinerTrainer = new RefinerTrainer(19, "abc", "Staff Crafter", [Wand, Steel], [1, 1], [Staff], [1], 200);
//        var EnchantedBladeSmith: RefinerTrainer = new RefinerTrainer(20, "abc", "Enchanted Blade Smith", [Manacyte, Sword], [5, 1], [EnchantedBlade], [1], 1200);
//        var MysticBowyer: RefinerTrainer = new RefinerTrainer(21, "abc", "Mystic Bowyer", [Manacyte, Bow], [5, 1], [MysticBow], [1], 1200);
//        var ArcaneGunsmith: RefinerTrainer = new RefinerTrainer(22, "abc", "Arcane Gunsmith", [Manacyte, Rifle], [5, 1], [ArcaneRifle], [1], 1200);
//        var LanceSmith: RefinerTrainer = new RefinerTrainer(23, "abc", "Lance Smith", [Manacyte, Spear], [5, 1], [HolyLance], [1], 1200);
//        var SpearmanInstructor: RefinerTrainer = new RefinerTrainer(24, "abc", "Spearman Instructor", [Man, Coin, Spear], [1, 3, 1], [Spearman], [1], 40);
//        var SwordsmanInstructor: RefinerTrainer = new RefinerTrainer(25, "abc", "Swordsman Instructor", [Man, Coin, Sword], [1, 3, 1], [Swordsman], [1], 70);
//        var BowmanInstructor: RefinerTrainer = new RefinerTrainer(26, "abc", "Bowman Instructor", [Bow, Man, Coin, Arrow], [1, 1, 5, 10], [Archer], [1], 70);
//        var PikemanTrainer: RefinerTrainer = new RefinerTrainer(27, "abc", "Pikeman Trainer", [Spearman, Coin, WoodenShield], [1, 10, 1], [Pikeman], [1], 160);
//        var WarriorTrainer: RefinerTrainer = new RefinerTrainer(28, "abc", "Warrior Trainer", [Swordsman, Coin, WoodenShield], [1, 10, 1], [Warrior], [1], 240);
//        var RiflemanInstructor: RefinerTrainer = new RefinerTrainer(29, "abc", "Rifleman Instructor", [Rifle, Coin, Bullet, Man], [1, 30, 10, 1], [Rifleman], [1], 160);
//        var KnightMentor: RefinerTrainer = new RefinerTrainer(30, "abc", "Knight Mentor", [Warrior, SteelArmor, IronShield, Coin], [1, 1, 1, 75], [Knight], [1], 400);
//        var CrossArcherTrainer: RefinerTrainer = new RefinerTrainer(31, "abc", "Cross Archer Trainer", [Archer, Crossbow, Coin], [1, 1, 120], [CrossArcher], [1], 240);
//        var ChanterInstructor: RefinerTrainer = new RefinerTrainer(32, "abc", "Chanter Instructor", [Wand, Man, Coin], [1, 1, 200], [Chanter], [1], 400);
//        var MagusMaster: RefinerTrainer = new RefinerTrainer(33, "abc", "Magus Master", [Chanter, Staff, Coin], [1, 1, 2500], [Magus], [1], 900);
//        var PaladinMaster: RefinerTrainer = new RefinerTrainer(34, "abc", "Paladin Master", [Pikeman, HolyLance, SteelArmor, Coin], [1, 1, 1, 500], [Paladin], [1], 900);
//        var ArcaneGunslingerMaster: RefinerTrainer = new RefinerTrainer(35, "abc", "Arcane Gunslinger Master", [Rifleman, ArcaneRifle, Coin], [1, 1, 5500], [ArcaneGunslinger], [1], 900);
//        var MysticRangerMaster: RefinerTrainer = new RefinerTrainer(36, "abc", "Mystic Ranger Master", [CrossArcher, MysticBow, Coin], [1, 1, 15000], [MysticRanger], [1], 900);
//        var RefinerTrainerArr: RefinerTrainer[] = [Recruiter, Woodworker, Ironsmith, Couturier, BladeSmith, ManaRefiner, PyrotechnicExpert,
//            SteelWorker, Fletcher, Metallurgist, SpearCrafter, Blacksmith, Bowyer, WoodenShieldSmith, IronShieldSmith, Armorer, Gunsmith, Crossbowyer,
//            Wandmaker, StaffCrafter, EnchantedBladeSmith, MysticBowyer, ArcaneGunsmith, LanceSmith, SpearmanInstructor, SwordsmanInstructor,
//            BowmanInstructor, PikemanTrainer, WarriorTrainer, RiflemanInstructor, KnightMentor, CrossArcherTrainer, ChanterInstructor,
//            MagusMaster, PaladinMaster, ArcaneGunslingerMaster, MysticRangerMaster];

//        //Heroes
//        var Charles: Hero = new Hero(0, "abc", "Charles the Mage Doctor", 1000, 0, 15, 1, [19, 20, 21, 22, 23], thePlayer);
//        var Yusie: Hero = new Hero(1, "abc", "Yusie the Gunslinger", 1500, 50, 15, 1, [24, 25, 26, 27, 28], thePlayer);
//        var Halley: Hero = new Hero(2, "abc", "Halley the Ranger", 3500, 30, 15, 1, [29, 30, 31, 32, 33], thePlayer);
//        var Helmuth: Hero = new Hero(3, "abc", "Helmuth the Lancer", 10000, 10, 15, 1, [34, 35, 36, 37, 38], thePlayer);
//        var HeroArr: Hero[] = [Charles, Yusie, Halley, Helmuth];


//        function HeroKillMechanics(damage: number, count: number): void {
//            let index: number = Math.round(Math.random() * (HeroArr.length - 1));
//            let counter: number = 0;
//            while (counter < count) {
//                HeroArr[index].ReceiveDamage(damage);
//                counter += 1;
//                do {
//                    index = Math.round(Math.random() * (HeroArr.length - 1));
//                }
//                while (HeroArr[index].CurrentHP < damage);
//            }
//        }

//        function RefinerTrainerKillMechanics(isCount: boolean, countOrPercentage: number): void {
//            if (isCount) {
//                let counter: number = 0;
//                while (counter < countOrPercentage) {
//                    let killArray: RefinerTrainer[] = [];
//                    for (var i = 0; i < RefinerTrainerArr.length; i++) {
//                        if (RefinerTrainerArr[i].Count > 0) {
//                            killArray.push(RefinerTrainerArr[i]);
//                        }
//                    }
//                    let countShare: number = Math.min(1, Math.floor((countOrPercentage - counter) / killArray.length));
//                    for (var i = 0; i < killArray.length && counter < countOrPercentage; i++) {
//                        let toBeDeducted = Math.min(countShare, RefinerTrainerArr[i].Count);
//                        counter += toBeDeducted;
//                        RefinerTrainerArr[i].Decrease(toBeDeducted);
//                    }
//                }
//            } else {
//                for (var i = 0; i < RefinerTrainerArr.length; i++) {
//                    RefinerTrainerArr[i].Decrease(RefinerTrainerArr[i].Count * countOrPercentage);
//                }
//            }
//        }

//        //Enemy (Base Exp and Resource not confirmed)
//        let Slime: Enemy = new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1, 6], 40, 0, 20, function (currentDamage: number, stage: StageLevel): number { return 1; }, 100000, StageOne, false);
//        let Boar: Enemy = new Enemy(0, 1, "abc", "Boar", 15, 4, 5, [1, 1, 1, 1, 6, 6], 40, 1, 100, function (currentDamage: number, stage: StageLevel): number { HeroKillMechanics(2 * currentDamage, 1); return 1; }, 200, StageOne, false);
//        let Ashwinder1: Enemy = new Enemy(0, 2, "abc", "Ashwinder", 8, 2, 5, [1, 1, 3, 3, 6, 6], 40, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 1); return 1; }, 200, StageOne, false);
//        let Arachne: Enemy = new Enemy(0, 3, "abc", "Arachne", 10, 4, 5, [3, 3, 3, 3, 6, 6], 20, 0, 100, function (currentDamage: number, stage: StageLevel): number { return 1; }, 100000, StageOne, false);
//        // let Drunkard: Enemy = new Enemy(0, 4, "abc", "Drunkard", 5, 2, 5, [2, 2, 2, 2, 4, 4, 7, 7, 6], 10, 0, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 1); return 1;}, 100, theStage);
//        // let Bandit: Enemy = new Enemy(0, 5, "abc", "Bandit", 7, 3, 5, [4, 2, 5, 5, 7, 7, 7, 7, 7, 6, 6, 6], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { return 3; }, 200, theStage);
//        // let RevoltBrawler: Enemy = new Enemy(0, 6, "abc", "Revolt Brawler", 8, 4, 5, [4, 4, 4, 4, 2, 2, 2, 2, 7, 7, 7, 7], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { HeroKillMechanics(5 * currentDamage, 1); return 1; }, 300, theStage);
//        // let RevoltFootman: Enemy = new Enemy(0, 7, "abc", "Revolt Footman", 10, 5, 5, [4, 4, 4, 4, 2, 2, 2, 2, 5, 5, 5, 7, 7, 7, 7], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 2); return 1; }, 160, theStage);
//        // let Ashwinder2: Enemy = new Enemy(1, 8, "abc", "Ashwinder", 8, 2, 5, [1, 1, 3, 3, 6, 6, 10], 40, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 1); return 1; }, 200, theStage);
//        // let RevoltFootman2: Enemy = new Enemy(1, 9, "abc", "Revolt Footman", 10, 5, 5, [4, 4, 4, 4, 2, 2, 2, 2, 5, 5, 5, 7, 7, 7, 7, 9, 14], 20, 1, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 2); return 1; }, 160, theStage);
//        // let Harpy1: Enemy = new Enemy(1, 10, "abc", "Harpy", 100, 55, 5, [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 10], 40, 5, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerKillMechanics(true, 2); HeroKillMechanics(2 * currentDamage, 2); return 4; }, 300, theStage);
//        // let Knarl: Enemy = new Enemy(1, 11, "abc", "Knarl", 140, 50, 5, [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 10], 60, 5, 100, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, 5); return 2;}, 300, theStage);
//        // let RevoltSpearman: Enemy = new Enemy(1, 12, "abc", "Revolt Spearman", 85, 45, 5, [1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 9, 14, 17], 30, 1, 100, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, stage.CurrentZone * stage.CurrentZone); return 2; }, 100, theStage);
//        // let RevoltArcher: Enemy = new Enemy(1, 13, "abc", "Revolt Archer", 75, 90, 5, [1, 1, 2, 2, 3, 3, 3, 3, 3, 6, 6, 7, 7, 7, 7, 7, 15, 19], 40, 0, 100, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, stage.CurrentZone * stage.CurrentZone); return 2; }, 100, theStage);
//        // let RevoltWarrior: Enemy = new Enemy(1, 14, "abc", "Revolt Warrior", 110, 40, 5, [1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 9, 14, 18], 20, 20, 160, function (currentDamage: number, stage: StageLevel) { RefinerTrainerKillMechanics(true, stage.CurrentZone); return 1; }, 60, theStage);
//        // let RevoltFencer1: Enemy = new Enemy(1, 15, "abc", "Revolt Fencer", 70, 23, 5, [1, 1, 2, 2, 2, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 13, 9, 14, 23], 10, 0, 160, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < stage.CurrentZone; i++) { RefinerTrainerRandomizer().Decrease(1); } return 1; }, 60, theStage);
//        // let Harpy2: Enemy = new Enemy(2, 16, "abc", "Harpy", 100, 55, 5, [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 10, 6, 6, 6, 15, 15, 19, 19], 40, 5, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerRandomizer().Decrease(1); RefinerTrainerRandomizer().Decrease(1); HeroRandomizer().ReceiveDamage(2 * currentDamage); HeroRandomizer().ReceiveDamage(2 * currentDamage); return 4; }, 300, theStage);
//        // let RevoltFencer2: Enemy = new Enemy(2, 17, "abc", "Revolt Fencer", 70, 23, 5, [1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 13, 13, 9, 9, 14, 14, 23, 23, 11], 10, 0, 160, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < stage.CurrentZone; i++) { RefinerTrainerRandomizer().Decrease(1); } return 1; }, 60, theStage);
//        // let Siren: Enemy = new Enemy(2, 18, "abc", "Siren", 1000, 255, 5, [6, 6, 6, 6, 6, 6, 6, 6, 13, 13, 13, 13, 13, 13, 13, 5, 5, 5, 5, 5, 15, 15, 15, 15, 15, 15, 15, 15, 15], 30, 200, 60, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < 5; i++) { RefinerTrainerRandomizer().Decrease(1); } return 2; }, 100, theStage);
//        // let RevoltRanger: Enemy = new Enemy(2, 19, "abc", "Revolt Ranger", 33500, 33000, 5, [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 711, 11, 11, 11, 13, 13, 13, 13, 12, 12, 12, 15, 15, 15, 15, 15, 21, 21], 40, 3000, 100, function (currentDamage: number, stage: StageLevel) { HeroRandomizer().ReceiveDamage(3 * currentDamage); return 1; }, 140, theStage);
//        // let RevoltMusketeer1: Enemy = new Enemy(2, 20, "abc", "Revolt Musketeer", 1500, 2500, 5, [1, 1], 80, 50, 100, function (currentDamage: number): number { return 1; }, 100000, theStage);
//        // let RevoltHexblade: Enemy = new Enemy(2, 21, "abc", "Revolt Hexblade", 2300, 1200, 5, [1, 1], 80, 500, 100, function (currentDamage: number, stage: StageLevel): number { RefinerTrainerRandomizer().Decrease(1); RefinerTrainerRandomizer().Decrease(1); HeroRandomizer().ReceiveDamage(5 * currentDamage); HeroRandomizer().ReceiveDamage(5 * currentDamage); HeroRandomizer().ReceiveDamage(5 * currentDamage); return 4; }, 300, theStage);
//        //let RevoltWarlord: Enemy = new Enemy(2, 22, "abc", "Revolt Warlord", 1900, 500, 5, [1, 1], 20, 100, 100, theStage);
//        //let RevoltWarlock: Enemy = new Enemy(2, 23, "abc", "Revolt Warlock", 1250, 780, 5, [1, 1], 20, 100, 100, theStage);
//        // let Siren2: Enemy = new Enemy(3, 24, "abc", "Siren", 1000, 255, 5, [1, 1], 30, 200, 60, function (currentDamage: number, stage: StageLevel) { for (var i = 0; i < 5; i++) { RefinerTrainerRandomizer().Decrease(1); } return 2; }, 100, theStage);
//        //let Yeti1: Enemy = new Enemy(3, 25, "abc", "Yeti", 40000, 30000, 5, [1, 1], 60, 5000, 100, theStage);
//        // let RevoltMusketeer2: Enemy = new Enemy(3, 26, "abc", "Revolt Musketeer", 1500, 2500, 5, [1, 1], 80, 50, 100, function (currentDamage: number): number { return 1; }, 100000, theStage);
//        //let RevoltAssasin: Enemy = new Enemy(3, 27, "abc", "Revolt Assasin", 28000, 12000, 5, [1, 1], 15, 0, 10, theStage);
//        //let RevoltTheurgist: Enemy = new Enemy(3, 28, "abc", "Revolt Theurgist", 1500, 3000, 5, [1, 1], 100, 150, 100, theStage);
//        //let RevoltCavalier: Enemy = new Enemy(3, 29, "abc", "Revolt Cavalier", 48500, 7500, 5, [1, 1], 30, 5000, 80, theStage);
//        //let RevoltGladiator1: Enemy = new Enemy(3, 30, "abc", "Revolt Gladiator", 300000, 240000, 5, [1, 1], 40, 20000, 100, theStage);
//        //let RevoltNecromancer1: Enemy = new Enemy(3, 31, "abc", "Revolt Necromancer", 35000, 9000, 5, [1, 1], 60, 1000, 120, theStage);
//        //let Dragon: Enemy = new Enemy(4, 32, "abc", "Dragon", 1000000, 375000, 5, [1, 1], 30, 50000, 100, theStage);
//        //let Yeti2: Enemy = new Enemy(4, 33, "abc", "Yeti", 40000, 30000, 5, [1, 1], 60, 5000, 100, theStage);
//        //let RevoltGladiator2: Enemy = new Enemy(4, 34, "abc", "Revolt Gladiator", 300000, 240000, 5, [1, 1], 40, 20000, 100, theStage);
//        //let RevoltNecromancer2: Enemy = new Enemy(4, 35, "abc", "Revolt Necromancer", 35000, 9000, 5, [1, 1], 60, 1000, 120, theStage);
//        //let RevoltArcaneRanger: Enemy = new Enemy(4, 36, "abc", "Revolt Arcane Ranger", 850000, 275000, 5, [1, 1], 20, 10000, 80, theStage);
//        //let RevoltMarksman: Enemy = new Enemy(4, 37, "abc", "Revolt Marksman", 700000, 750000, 5, [1, 1], 40, 20000, 100, theStage);
//        //let RevoltLancer: Enemy = new Enemy(4, 38, "abc", "Revolt Lancer", 1050000, 275000, 5, [1, 1], 50, 20000, 60, theStage);
//        //let RevoltSummoner: Enemy = new Enemy(4, 39, "abc", "Revolt Lancer", 750000, 400000, 5, [1, 1], 80, 0, 100, theStage);
//        // let Manticore: Enemy = new Enemy(5, 40, "abc", "Manticore", 1200000, 900000, 5, [1, 1], 60, 100000, 160, theStage);

//        var StageOneEnemyArr: Enemy[] = [Boar];
//        var StageTwoEnemyArr: Enemy[] = [Boar];
//        var StageThreeEnemyArr: Enemy[] = [Boar];
//        var StageFourEnemyArr: Enemy[] = [Boar];
//        var StageFiveEnemyArr: Enemy[] = [Boar];
//        var RangeOneUnitArr: Unit[] = [Swordsman, Warrior, Knight];
//        var RangeTwoUnitArr: Unit[] = [Spearman, Pikeman, Paladin];
//        var RangeThreeUnitArr: Unit[] = [Rifleman];
//        var RangeFourUnitArr: Unit[] = [Archer];
//        var RangeFiveUnitArr: Unit[] = [CrossArcher, Chanter, MysticRanger];
//        var RangeSixUnitArr: Unit[] = [Magus, ArcaneGunslinger];
//        var FullUnitArr: Unit[] = [Spearman, Swordsman, Archer, Pikeman, Warrior, Rifleman, Knight, CrossArcher, Chanter, Paladin, Magus, ArcaneGunslinger, MysticRanger];

//        //var heroSkillFactory:ISkillFactory = new HeroSkillFactory(thePlayer, StageOne, ResourceArr, HeroArr, FullUnitArr, StageOneEnemyArr, [StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr, StageFiveEnemyArr], []);
//        //var Heal = heroSkillFactory.CreateActive("Heal");
//        //var Purify = heroSkillFactory.CreateActive("Purify");
//        //var ArcaneShelter = heroSkillFactory.CreateActive("ArcaneShelter");
//        //var StrafingRun = heroSkillFactory.CreateActive("StrafingRun");
//        //var Hurricane = heroSkillFactory.CreateActive("Hurricane");
//        //var CrossCut = heroSkillFactory.CreateActive("CrossCut");
//        //var LanceDance = heroSkillFactory.CreateActive("LanceDance");
//        //var UnlimitedLanceWork = heroSkillFactory.CreateActive("UnlimitedLanceWork");
//        //var VitalContract = heroSkillFactory.CreatePassive("VitalContract");
//        //var RecoveryMantra = heroSkillFactory.CreatePassive("RecoveryMantra");
//        //var Bang = heroSkillFactory.CreatePassive("Bang");
//        //var DoubleTap = heroSkillFactory.CreatePassive("DoubleTap");
//        //var Marksman = heroSkillFactory.CreatePassive("Marksman");
//        //var Matrix = heroSkillFactory.CreatePassive("Matrix");
//        //var FocusShot = heroSkillFactory.CreatePassive("FocusShot");
//        //var TriangleFire = heroSkillFactory.CreatePassive("TriangleFire");
//        //var AuraOfAccuracy = heroSkillFactory.CreatePassive("AuraOfAccuracy");
//        //var SuperiorPerception = heroSkillFactory.CreatePassive("SuperiorPerception");
//        //var Lance = heroSkillFactory.CreatePassive("Lance");
//        //var IndraBlessing = heroSkillFactory.CreatePassive("IndraBlessing");

//        //var heroActiveSkill:IActiveSkill[] = [Heal, Purify, ArcaneShelter, StrafingRun, Hurricane, CrossCut, LanceDance, UnlimitedLanceWork];
//        //var heroPassiveSkill: IPassiveSkill[] = [VitalContract, RecoveryMantra, Bang, StrafingRun, DoubleTap, Marksman, Matrix, FocusShot, TriangleFire, AuraOfAccuracy, SuperiorPerception, Lance, IndraBlessing];
//        //var heroSkill: any[] = [];
//        //heroActiveSkill.forEach(x => heroSkill.push(x));
//        //heroPassiveSkill.forEach(x => heroSkill.push(x));

//        //var playerSkillFactory = new PlayerSkillFactory(thePlayer, StageOne, ResourceArr, HeroArr, FullUnitArr, StageOneEnemyArr, [StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr, StageFiveEnemyArr], heroSkill);
//        //var Steal = playerSkillFactory.CreateActive("Steal");
//        //var Heist = playerSkillFactory.CreateActive("Heist");
//        //var MoneyIsPower = playerSkillFactory.CreateActive("MoneyIsPower");
//        //var Ballad = playerSkillFactory.CreateActive("Ballad");
//        //var Solo = playerSkillFactory.CreateActive("Solo");
//        //var SongOfCourage = playerSkillFactory.CreateActive("SongOfCourage");
//        //var ChorusOfDeath = playerSkillFactory.CreateActive("ChorusOfDeath");
//        //var ImpactStab = playerSkillFactory.CreateActive("ImpactStab");
//        //var Whirlwind = playerSkillFactory.CreateActive("Whirlwind");
//        //var FinalBlow = playerSkillFactory.CreateActive("FinalBlow");
//        //var DarkRitual = playerSkillFactory.CreateActive("DarkRitual");
//        //var Biohack = playerSkillFactory.CreateActive("Biohack");
//        //var CursedContract = playerSkillFactory.CreateActive("CursedContract");
//        //var Pickpocket = playerSkillFactory.CreatePassive("Pickpocket");
//        //var CoinAffinity = playerSkillFactory.CreatePassive("CoinAffinity");
//        //var MelodicAura = playerSkillFactory.CreatePassive("MelodicAura");
//        //var Valor = playerSkillFactory.CreatePassive("Valor");
//        //var WarCry = playerSkillFactory.CreatePassive("WarCry");
//        //var playerActiveSkill: IActiveSkill[] = [Steal, Heist, MoneyIsPower, Ballad, Solo, SongOfCourage, ChorusOfDeath, ImpactStab, Whirlwind, FinalBlow, DarkRitual, Biohack, CursedContract];
//        //var playerPassiveSkill: IPassiveSkill[] = [Pickpocket, CoinAffinity, MelodicAura, Valor, WarCry];
//        //var playerSkill: any[] = [];
//        //playerActiveSkill.forEach(x => playerSkill.push(x));
//        //playerPassiveSkill.forEach(x => playerSkill.push(x));

//        var theStorage = new Storage(thePlayer, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
//            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, FullUnitArr, HeroArr, ResourceArr, RefinerTrainerArr, StageArray);
//        return theStorage;
//    }

//    function SetupHeroSkillFactory(storage: IStorage): SkillFactory {
//        return new SkillFactory(storage, []);
//    }

//    function SetupPlayerSkillFactory(storage: IStorage): SkillFactory {
//        var heroSkillFactory: ISkillFactory = SetupHeroSkillFactory(storage);
//        var Heal = heroSkillFactory.CreateHeroActive("Heal");
//        var Purify = heroSkillFactory.CreateHeroActive("Purify");
//        var ArcaneShelter = heroSkillFactory.CreateHeroActive("ArcaneShelter");
//        var StrafingRun = heroSkillFactory.CreateHeroActive("StrafingRun");
//        var Hurricane = heroSkillFactory.CreateHeroActive("Hurricane");
//        var CrossCut = heroSkillFactory.CreateHeroActive("CrossCut");
//        var LanceDance = heroSkillFactory.CreateHeroActive("LanceDance");
//        var UnlimitedLanceWork = heroSkillFactory.CreateHeroActive("UnlimitedLanceWork");
//        var VitalContract = heroSkillFactory.CreateHeroPassive("VitalContract");
//        var RecoveryMantra = heroSkillFactory.CreateHeroPassive("RecoveryMantra");
//        var Bang = heroSkillFactory.CreateHeroPassive("Bang");
//        var DoubleTap = heroSkillFactory.CreateHeroPassive("DoubleTap");
//        var Marksman = heroSkillFactory.CreateHeroPassive("Marksman");
//        var Matrix = heroSkillFactory.CreateHeroPassive("Matrix");
//        var FocusShot = heroSkillFactory.CreateHeroPassive("FocusShot");
//        var TriangleFire = heroSkillFactory.CreateHeroPassive("TriangleFire");
//        var AuraOfAccuracy = heroSkillFactory.CreateHeroPassive("AuraOfAccuracy");
//        var SuperiorPerception = heroSkillFactory.CreateHeroPassive("SuperiorPerception");
//        var Lance = heroSkillFactory.CreateHeroPassive("Lance");
//        var IndraBlessing = heroSkillFactory.CreateHeroPassive("IndraBlessing");

//        var heroActiveSkill: IActiveSkill[] = [Heal, Purify, ArcaneShelter, StrafingRun, Hurricane, CrossCut, LanceDance, UnlimitedLanceWork];

//        return new SkillFactory(SetupStorage(), heroActiveSkill);
//    }

//    //Hero Active Skill

//    it("should test functions of Heal", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let Heal: IActiveSkill = HeroSkillFactory.CreateHeroActive("Heal");
//        Heal.id.should.equal(19);
//        Heal.name.should.equal("Heal");
//        //Heal.Cooldown.should.equal(120000);
//        HeroSkillFactory.Storage.HeroArr.forEach(x => x.ReceiveDamage(100));
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(900);
//        HeroSkillFactory.Storage.HeroArr[1].CurrentHP.should.equal(1400);
//        Heal.Action(0);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(900);
//        HeroSkillFactory.Storage.HeroArr[1].CurrentHP.should.equal(1400);
//        Heal.Unlock();
//        Heal.Action(0);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(925);
//        HeroSkillFactory.Storage.HeroArr[1].CurrentHP.should.equal(1425);
//        Heal.inCooldown.should.equal(true);
//        Heal.Action(0);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(925);
//        HeroSkillFactory.Storage.HeroArr[1].CurrentHP.should.equal(1425);
//        setTimeout(function () {
//            Heal.inCooldown.should.equal(false);
//            Heal.Action(0);
//            HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(950);
//            HeroSkillFactory.Storage.HeroArr[1].CurrentHP.should.equal(1450);
//            console.log(Heal.name, Heal.id);
//        }, 1100)
//    });

//    it("should test functions of Purify", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let Purify: IActiveSkill = HeroSkillFactory.CreateHeroActive("Purify");
//        Purify.id.should.equal(20);
//        Purify.name.should.equal("Purify");
//        //Purify.Cooldown.should.equal(240000);
//        HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(4));
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(2);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(2);
//        Purify.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(2);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(2);
//        Purify.Unlock();
//        Purify.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(6);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(6);
//        Purify.inCooldown.should.equal(true);
//        HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(4));
//        Purify.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(2);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(2);
//        setTimeout(function () {
//            Purify.inCooldown.should.equal(false);
//            Purify.Action(0);
//            HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(6);
//            HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(6);
//            console.log(Purify.name, Purify.id);
//        }, 1100)
//    });

//    it("should test functions of ArcaneShelter", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let ArcaneShelter: IActiveSkill = HeroSkillFactory.CreateHeroActive("ArcaneShelter");
//        ArcaneShelter.id.should.equal(22);
//        ArcaneShelter.name.should.equal("Arcane Shelter");
//        //ArcaneShelter.Cooldown.should.equal(1000);
//        HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(1));
//        HeroSkillFactory.Storage.HeroArr.forEach(x => x.ReceiveDamage(1));
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(5);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(5);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(999);
//        ArcaneShelter.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(1));
//        HeroSkillFactory.Storage.HeroArr.forEach(x => x.ReceiveDamage(1));
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(4);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(4);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(998);
//        ArcaneShelter.Unlock();
//        ArcaneShelter.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(1));
//        HeroSkillFactory.Storage.HeroArr.forEach(x => x.ReceiveDamage(1));
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(4);
//        HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(4);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(998);
//        ArcaneShelter.inCooldown.should.equal(true);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.PureUnitArr[0].IsImmune.should.equal(false);
//        }, 600);
//        setTimeout(function () {
//            ArcaneShelter.inCooldown.should.equal(false);
//            HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(1));
//            HeroSkillFactory.Storage.HeroArr.forEach(x => x.ReceiveDamage(1));
//            HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(3);
//            HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(3);
//            HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(997);
//            ArcaneShelter.Action(0);
//            HeroSkillFactory.Storage.PureUnitArr.forEach(x => x.ReceiveDamage(1));
//            HeroSkillFactory.Storage.HeroArr.forEach(x => x.ReceiveDamage(1));
//            HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(3);
//            HeroSkillFactory.Storage.PureUnitArr[1].CurrentHP.should.equal(3);
//            HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(997);
//            console.log(ArcaneShelter.name, ArcaneShelter.id);
//        }, 1100)
//    });

//    it("should test functions of StrafingRun", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let StrafingRun: IActiveSkill = HeroSkillFactory.CreateHeroActive("StrafingRun");
//        StrafingRun.id.should.equal(25);
//        StrafingRun.name.should.equal("Strafing Run");
//        //StrafingRun.Cooldown.should.equal(240000);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        StrafingRun.Action(0);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        StrafingRun.Unlock();
//        StrafingRun.Action(0);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.lessThan(15);
//        }, 10);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//            StrafingRun.inCooldown.should.equal(true);
//            StrafingRun.Action(0);
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//        }, 600);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].RegenerateMax();
//            StrafingRun.inCooldown.should.equal(false);
//            StrafingRun.Action(0);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.lessThan(11);
//            }, 10);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//                console.log(StrafingRun.name, StrafingRun.id);
//            }, 600);
//        }, 1000)
//    });

//    it("should test functions of Hurricane", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let Hurricane: IActiveSkill = HeroSkillFactory.CreateHeroActive("Hurricane");
//        Hurricane.id.should.equal(32);
//        Hurricane.name.should.equal("Hurricane");
//        //Hurricane.Cooldown.should.equal(72000000);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        Hurricane.Action(0);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        Hurricane.Unlock();
//        Hurricane.Action(0);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.lessThan(15);
//        }, 100);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//            Hurricane.inCooldown.should.equal(true);
//            Hurricane.Action(0);
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//        }, 700);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].RegenerateMax();
//            Hurricane.inCooldown.should.equal(false);
//            Hurricane.Action(0);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.lessThan(11);
//            }, 100);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//                console.log(Hurricane.name, Hurricane.id);
//            }, 700);
//        }, 1000)
//    });

//    it("should test functions of CrossCut", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let CrossCut: IActiveSkill = HeroSkillFactory.CreateHeroActive("CrossCut");
//        CrossCut.id.should.equal(34);
//        CrossCut.name.should.equal("Cross Cut");
//        //CrossCut.Cooldown.should.equal(10000);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        CrossCut.Action(0);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        CrossCut.Unlock();
//        CrossCut.Action(0);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(7);
//        }, 200);
//        setTimeout(function () {
//            CrossCut.inCooldown.should.equal(true);
//            CrossCut.Action(0);
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(7);
//        }, 500);
//        setTimeout(function () {
//            CrossCut.inCooldown.should.equal(false);
//            CrossCut.Action(0);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//                console.log(CrossCut.name, CrossCut.id);
//            }, 200);
//        }, 1100)
//    });

//    it("should test functions of LanceDance", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let LanceDance: IActiveSkill = HeroSkillFactory.CreateHeroActive("LanceDance");
//        LanceDance.id.should.equal(35);
//        LanceDance.name.should.equal("Lance Dance");
//        //LanceDance.Cooldown.should.equal(500000);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentDamage.should.equal(1);
//        LanceDance.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentDamage.should.equal(1);
//        LanceDance.Unlock();
//        LanceDance.Action(0);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentDamage.should.equal(6);
//        setTimeout(function () {
//            LanceDance.inCooldown.should.equal(true);
//            LanceDance.Action(0);
//            HeroSkillFactory.Storage.PureUnitArr[0].CurrentDamage.should.equal(1);
//        }, 600);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.PureUnitArr[0].CurrentDamage.should.equal(1);
//            LanceDance.inCooldown.should.equal(false);
//            LanceDance.Action(0);
//            HeroSkillFactory.Storage.PureUnitArr[0].CurrentDamage.should.equal(6);
//            console.log(LanceDance.name, LanceDance.id);
//        }, 1100)
//    });

//    it("should test functions of UnlimitedLanceWork", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let UnlimitedLanceWork: IActiveSkill = HeroSkillFactory.CreateHeroActive("UnlimitedLanceWork");
//        UnlimitedLanceWork.id.should.equal(37);
//        UnlimitedLanceWork.name.should.equal("Unlimited Lance Work");
//        //UnlimitedLanceWork.Cooldown.should.equal(72000000);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        UnlimitedLanceWork.Action(0);
//        HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(15);
//        UnlimitedLanceWork.Unlock();
//        UnlimitedLanceWork.Action(0);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//        }, 700);
//        setTimeout(function () {
//            UnlimitedLanceWork.inCooldown.should.equal(true);
//            UnlimitedLanceWork.Action(0);
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//        }, 800);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].RegenerateMax();
//            UnlimitedLanceWork.inCooldown.should.equal(false);
//            UnlimitedLanceWork.Action(0);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(0);
//                console.log(UnlimitedLanceWork.name, UnlimitedLanceWork.id);
//           }, 600);
//        }, 1100)
//    });

//    it("should test functions of VitalContract", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let VitalContract: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("VitalContract");
//        VitalContract.id.should.equal(18);
//        VitalContract.name.should.equal("Vital Contract");
//        HeroSkillFactory.Storage.HeroArr[0].ReceiveDamage(100);
//        HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(900);
//        VitalContract.Action();
//        setTimeout(function () {
//            HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(900);
//        }, 500);
//        setTimeout(function () {
//            VitalContract.Unlock();
//            HeroSkillFactory.Storage.HeroArr[0].ReceiveDamage(100);
//            HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(800);
//        }, 600);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.HeroArr[0].CurrentHP.should.equal(1000);
//            console.log(VitalContract.name, VitalContract.id);
//        }, 1100)
//    });

//    it("should test functions of RecoveryMantra", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let RecoveryMantra: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("RecoveryMantra");
//        RecoveryMantra.id.should.equal(21);
//        RecoveryMantra.name.should.equal("Recovery Mantra");
//        HeroSkillFactory.Storage.HeroArr[3].ReceiveDamage(1000);
//        HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(9000);
//        RecoveryMantra.Action();
//        setTimeout(function () {
//            HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(9000);
//        }, 500);
//        setTimeout(function () {
//            RecoveryMantra.Unlock();
//            HeroSkillFactory.Storage.HeroArr[3].ReceiveDamage(1000);
//            HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(8000);
//        }, 600);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(8500);
//        }, 1700)
//        setTimeout(function () {
//            HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(9000);
//            console.log(RecoveryMantra.name, RecoveryMantra.id);
//        }, 2700)
//    });

//    it("should test functions of Bang", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let Bang: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("Bang");
//        Bang.id.should.equal(23);
//        Bang.name.should.equal("Bang");
//        HeroSkillFactory.Storage.CurrentEnemyArr.push(new Enemy(0, 0, "", "", 3000, 0, 0, [], 0, 0, 0, function () { }, 0, new StageLevel(1, "Kroigren"), false));
//        HeroSkillFactory.Storage.CurrentEnemyArr.splice(0, 1);
//        Bang.Action();
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//        }, 1000);
//        setTimeout(function () {
//            Bang.Unlock();
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//        }, 1100);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2950);
//        }, 2200)
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2900);
//            console.log(Bang.name, Bang.id);
//        }, 3200)
//    });

//    it("should test functions of DoubleTap", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let DoubleTap: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("DoubleTap");
//        DoubleTap.id.should.equal(24);
//        DoubleTap.name.should.equal("Double Tap");
//        HeroSkillFactory.Storage.CurrentEnemyArr.push(new Enemy(0, 0, "", "", 3000, 0, 0, [], 0, 0, 0, function () { }, 0, new StageLevel(1, "Kroigren"), false));
//        HeroSkillFactory.Storage.CurrentEnemyArr.splice(0, 1);
//        DoubleTap.Action();
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//        }, 1000);
//        setTimeout(function () {
//            DoubleTap.Unlock();
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//        }, 1100);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2950);
//        }, 2200)
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2900);
//            console.log(DoubleTap.name, DoubleTap.id);
//        }, 3200)
//    });

//    it("should test functions of Matrix", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let Matrix: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("Matrix");
//        Matrix.id.should.equal(27);
//        Matrix.name.should.equal("Matrix");
//        Matrix.Action();
//        HeroSkillFactory.Storage.PureUnitArr[5].Exist(1);
//        HeroSkillFactory.Storage.PureUnitArr[5].ReceiveDamage(1);
//        HeroSkillFactory.Storage.PureUnitArr[5].CurrentHP.should.equal(4);
//        HeroSkillFactory.Storage.PureUnitArr[11].Exist(1);
//        HeroSkillFactory.Storage.PureUnitArr[11].ReceiveDamage(1);
//        HeroSkillFactory.Storage.PureUnitArr[11].CurrentHP.should.equal(5);
//        Matrix.Unlock();
//        HeroSkillFactory.Storage.PureUnitArr[5].ReceiveDamage(1);
//        HeroSkillFactory.Storage.PureUnitArr[5].CanEvade.should.equal(true);
//        HeroSkillFactory.Storage.PureUnitArr[11].ReceiveDamage(1);
//        HeroSkillFactory.Storage.PureUnitArr[5].CanEvade.should.equal(true);
//        console.log(Matrix.name, Matrix.id);
//   });

//    it("should test functions of FocusShot", () => {
//            let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//            let FocusShot: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("FocusShot");
//            FocusShot.id.should.equal(28);
//            FocusShot.name.should.equal("Focus Shot");
//            HeroSkillFactory.Storage.CurrentEnemyArr.push(new Enemy(0, 0, "", "", 3000, 0, 0, [], 0, 0, 0, function () { }, 0, new StageLevel(1, "Kroigren"), false));
//            HeroSkillFactory.Storage.CurrentEnemyArr.splice(0, 1);
//            FocusShot.Action();
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//            }, 1000);
//            setTimeout(function () {
//                FocusShot.Unlock();
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//            }, 1100);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2970);
//            }, 2200)
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2940);
//                console.log(FocusShot.name, FocusShot.id);
//            }, 3200)
//        });

//    it("should test functions of TriangleFire", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let TriangleFire: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("TriangleFire");
//        TriangleFire.id.should.equal(29);
//        TriangleFire.name.should.equal("Triangle Fire");
//        HeroSkillFactory.Storage.CurrentEnemyArr.push(new Enemy(0, 0, "", "", 3000, 0, 0, [], 0, 0, 0, function () { }, 0, new StageLevel(1, "Kroigren"), false));
//        HeroSkillFactory.Storage.CurrentEnemyArr.splice(0, 1);
//        TriangleFire.Action();
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//        }, 1000);
//        setTimeout(function () {
//            TriangleFire.Unlock();
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//        }, 1100);
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2910);
//        }, 2200)
//        setTimeout(function () {
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2820);
//            console.log(TriangleFire.name, TriangleFire.id);
//        }, 3200)
//    });

//    it("should test functions of AuraOfAccuracy", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let AuraOfAccuracy: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("AuraOfAccuracy");
//        AuraOfAccuracy.id.should.equal(30);
//        AuraOfAccuracy.name.should.equal("Aura of Accuracy");
//        HeroSkillFactory.Storage.PureUnitArr[7].Exist(1);
//        HeroSkillFactory.Storage.PureUnitArr[12].Exist(1);
//        HeroSkillFactory.Storage.PureUnitArr[2].CurrentDamage.should.equal(100);
//        HeroSkillFactory.Storage.PureUnitArr[7].CurrentDamage.should.equal(1500);
//        HeroSkillFactory.Storage.PureUnitArr[12].CurrentDamage.should.equal(320000);
//        AuraOfAccuracy.Action();
//        HeroSkillFactory.Storage.PureUnitArr[2].CurrentDamage.should.equal(100);
//        HeroSkillFactory.Storage.PureUnitArr[7].CurrentDamage.should.equal(1500);
//        HeroSkillFactory.Storage.PureUnitArr[12].CurrentDamage.should.equal(320000);
//        AuraOfAccuracy.Unlock();
//        HeroSkillFactory.Storage.PureUnitArr[2].CurrentDamage.should.equal(200);
//        HeroSkillFactory.Storage.PureUnitArr[7].CurrentDamage.should.equal(3000);
//        HeroSkillFactory.Storage.PureUnitArr[12].CurrentDamage.should.equal(640000);
//        HeroSkillFactory.Storage.CurrentPlayer.CurrentArmyVitality = 2;
//        HeroSkillFactory.Storage.PureUnitArr[2].CurrentDamage.should.equal(400);
//        HeroSkillFactory.Storage.PureUnitArr[7].CurrentDamage.should.equal(6000);
//        HeroSkillFactory.Storage.PureUnitArr[12].CurrentDamage.should.equal(1280000);
//        console.log(AuraOfAccuracy.name, AuraOfAccuracy.id);
//    });

//    it("should test functions of SuperiorPerception", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let SuperiorPerception: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("SuperiorPerception");
//        SuperiorPerception.id.should.equal(31);
//        SuperiorPerception.name.should.equal("Superior Perception");
//        HeroSkillFactory.Storage.HeroArr[2].CurrentDamage.should.equal(30);
//        SuperiorPerception.Action();
//        HeroSkillFactory.Storage.HeroArr[2].CurrentDamage.should.equal(30);
//        SuperiorPerception.Unlock();
//        HeroSkillFactory.Storage.HeroArr[2].CurrentDamage.should.equal(30030);
//        HeroSkillFactory.Storage.CurrentPlayer.CurrentArmyVitality = 2;
//        HeroSkillFactory.Storage.HeroArr[2].CurrentDamage.should.equal(60060);
//        console.log(SuperiorPerception.name, SuperiorPerception.id);
//   });

//        it("should test functions of Lance", () => {
//            let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//            let Lance: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("Lance");
//            Lance.id.should.equal(33);
//            Lance.name.should.equal("Lance");
//            HeroSkillFactory.Storage.CurrentEnemyArr.push(new Enemy(0, 0, "", "", 3000, 0, 0, [], 0, 0, 0, function () { }, 0, new StageLevel(1, "Kroigren"), false));
//            HeroSkillFactory.Storage.CurrentEnemyArr.splice(0, 1);
//            Lance.Action();
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//            Lance.Unlock();
//            HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(3000);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2990);
//            }, 1000);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentPlayer.CurrentArmyVitality = 2;
//            }, 1200);
//            setTimeout(function () {
//                HeroSkillFactory.Storage.CurrentEnemyArr[0].CurrentHP.should.equal(2970);
//                console.log(Lance.name, Lance.id);
//            }, 2100);
//        });

//    it("should test functions of IndraBlessing", () => {
//        let HeroSkillFactory: SkillFactory = SetupHeroSkillFactory(SetupStorage());
//        let IndraBlessing: IPassiveSkill = HeroSkillFactory.CreateHeroPassive("IndraBlessing");
//        HeroSkillFactory.Storage.HeroArr.forEach(x => HeroSkillFactory.Storage.CurrentPlayer.AddValueUpdateEvent(x.UpdateSource));
//        HeroSkillFactory.Storage.PureUnitArr.forEach(x => HeroSkillFactory.Storage.CurrentPlayer.AddValueUpdateEvent(x.UpdateSource));
//        IndraBlessing.id.should.equal(36);
//        IndraBlessing.name.should.equal("Indra's Blessing");
//        HeroSkillFactory.Storage.PureUnitArr[9].Exist(1);
//        HeroSkillFactory.Storage.PureUnitArr[3].Exist(1);
//        HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(10000);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(6);
//        HeroSkillFactory.Storage.PureUnitArr[9].CurrentHP.should.equal(10);
//        HeroSkillFactory.Storage.PureUnitArr[3].CurrentHP.should.equal(7);
//        IndraBlessing.Action();
//        HeroSkillFactory.Storage.HeroArr[3].ReceiveDamage(2);
//        HeroSkillFactory.Storage.PureUnitArr[0].ReceiveDamage(2);
//        HeroSkillFactory.Storage.PureUnitArr[9].ReceiveDamage(2);
//        HeroSkillFactory.Storage.PureUnitArr[3].ReceiveDamage(2);
//        HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(9998);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(4);
//        HeroSkillFactory.Storage.PureUnitArr[9].CurrentHP.should.equal(8);
//        HeroSkillFactory.Storage.PureUnitArr[3].CurrentHP.should.equal(5);
//        IndraBlessing.Unlock();
//        HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(19996);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(8);
//        HeroSkillFactory.Storage.PureUnitArr[9].CurrentHP.should.equal(16);
//        HeroSkillFactory.Storage.PureUnitArr[3].CurrentHP.should.equal(10);
//        HeroSkillFactory.Storage.HeroArr[3].MaxHP.should.equal(20000);
//        HeroSkillFactory.Storage.PureUnitArr[0].MaxHP.should.equal(12);
//        HeroSkillFactory.Storage.PureUnitArr[9].MaxHP.should.equal(20);
//        HeroSkillFactory.Storage.PureUnitArr[3].MaxHP.should.equal(14);
//        HeroSkillFactory.Storage.CurrentPlayer.IncreaseArmyVitality();
//        HeroSkillFactory.Storage.HeroArr[3].CurrentHP.should.equal(39996);
//        HeroSkillFactory.Storage.PureUnitArr[0].CurrentHP.should.equal(20);
//        HeroSkillFactory.Storage.PureUnitArr[9].CurrentHP.should.equal(36);
//        HeroSkillFactory.Storage.PureUnitArr[3].CurrentHP.should.equal(24);
//        HeroSkillFactory.Storage.HeroArr[3].MaxHP.should.equal(40000);
//        HeroSkillFactory.Storage.PureUnitArr[0].MaxHP.should.equal(24);
//        HeroSkillFactory.Storage.PureUnitArr[9].MaxHP.should.equal(40);
//        HeroSkillFactory.Storage.PureUnitArr[3].MaxHP.should.equal(28);
//        console.log(IndraBlessing.name, IndraBlessing.id);
//    });

//        //var Charles: Hero = new Hero(0, "abc", "Charles the Mage Doctor", 1000, 0, 15, 1, thePlayer);
//        //var Yusie: Hero = new Hero(1, "abc", "Yusie the Gunslinger", 1500, 50, 15, 1, thePlayer);
//        //var Halley: Hero = new Hero(2, "abc", "Halley the Ranger", 3500, 30, 15, 1, thePlayer);
//        //var Helmuth: Hero = new Hero(3, "abc", "Helmuth the Lancer", 10000, 10, 15, 1, thePlayer);
//        //var HeroArr: Hero[] = [Charles, Yusie, Halley, Helmuth];
//    });
