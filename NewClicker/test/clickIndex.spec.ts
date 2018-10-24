import { Enemy, Unit, Resource, RefinerTrainer, Hero } from "../src/javascript/InterfacesBaseClasses/BaseClass";
import { Storage } from "../src/javascript/InterfacesBaseClasses/Storage";
import { should, expect } from "chai";
import { Player } from "../src/javascript/InterfacesBaseClasses/Player";
import { StageLevel } from "../src/javascript/InterfacesBaseClasses/StageLevel";
import { ClickerIndex } from "../src/javascript/InterfacesBaseClasses/ClickerIndex";
import { EnemyValueUpdateEvent } from "../src/javascript/InterfacesBaseClasses/ValueUpdateEvent";

should();

describe("ClickIndex", () => {

    function SetupStorage(): Storage {
        var thePlayer: Player = new Player(1);
        var theStage: StageLevel = new StageLevel(1);

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
        var Spearman: Unit = new Unit(0, "abc", "Spearman", 6, 1, 2, 1, thePlayer, 20);
        var Swordsman: Unit = new Unit(1, "abc", "Swordsman", 6, 10, 1, 1, thePlayer, 40);
        var Archer: Unit = new Unit(2, "abc", "Archer", 5, 100, 4, 1, thePlayer, 160);
        var Pikeman: Unit = new Unit(3, "abc", "Pikeman", 7, 14, 2, 0, thePlayer, 20);
        var Warrior: Unit = new Unit(4, "abc", "Warrior", 7.5, 60, 1, 0, thePlayer, 40);
        var Rifleman: Unit = new Unit(5, "abc", "Rifleman", 5, 250, 3, 0, thePlayer, 80);
        var Knight: Unit = new Unit(6, "abc", "Knight", 10, 200, 1, 0, thePlayer, 40);
        var CrossArcher: Unit = new Unit(7, "abc", "Cross Archer", 6, 1500, 5, 0, thePlayer, 160);
        var Chanter: Unit = new Unit(8, "abc", "Chanter", 5, 6000, 5, 0, thePlayer, 400);
        var Paladin: Unit = new Unit(9, "abc", "Paladin", 10, 800, 2, 0, thePlayer, 20);
        //var Gladiator: Unit = new Unit(10, "abc", "Gladiator", 12.5, 4000, 1, 0, thePlayer, 40);
        var Magus: Unit = new Unit(11, "abc", "Magus", 12.5, 100000, 6, 0, thePlayer, 400);
        var ArcaneGunslinger: Unit = new Unit(12, "abc", "Arcane Gunslinger", 6, 55000, 6, 0, thePlayer, 80);
        var MysticRanger: Unit = new Unit(13, "abc", "MysticRanger", 7.5, 320000, 5, 0, thePlayer, 160);

        //RefinerTrainer
        var Recruiter: RefinerTrainer = new RefinerTrainer(0, "abc", "Recruiter", [Coin], [1], [Man], [1], 1200);
        var Woodworker: RefinerTrainer = new RefinerTrainer(1, "abc", "Woodworker", [Wood], [1], [Plank], [2], 100);
        var Ironsmith: RefinerTrainer = new RefinerTrainer(2, "abc", "Ironsmith", [Iron], [5], [IronBar], [1], 60);
        var Couturier: RefinerTrainer = new RefinerTrainer(3, "abc", "Couturier", [Thread], [8], [Nylon], [1], 53);
        var BladeSmith: RefinerTrainer = new RefinerTrainer(4, "abc", "Blade Smith", [IronBar], [2], [IronBlade], [1], 100);
        var ManaRefiner: RefinerTrainer = new RefinerTrainer(5, "abc", "Mana Refiner", [Manacyte], [1], [ManaShard], [1], 80);
        var PyrotechnicExpert: RefinerTrainer = new RefinerTrainer(6, "abc", "Pyrotechnic Expert", [IronBlade], [1], [Bullet], [10], 30);
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
        var EnchantedBladeSmith: RefinerTrainer = new RefinerTrainer(20, "abc", "Enchanted Blade Smith", [Manacyte, Sword], [5, 1], [EnchantedBlade], [1], 1200);
        var MysticBowyer: RefinerTrainer = new RefinerTrainer(21, "abc", "Mystic Bowyer", [Manacyte, Bow], [5, 1], [MysticBow], [1], 1200);
        var ArcaneGunsmith: RefinerTrainer = new RefinerTrainer(22, "abc", "Arcane Gunsmith", [Manacyte, Rifle], [5, 1], [ArcaneRifle], [1], 1200);
        var LanceSmith: RefinerTrainer = new RefinerTrainer(23, "abc", "Lance Smith", [Manacyte, Spear], [5, 1], [HolyLance], [1], 1200);
        var SpearmanInstructor: RefinerTrainer = new RefinerTrainer(24, "abc", "Spearman Instructor", [Man, Coin, Spear], [1, 3, 1], [Spearman], [1], 40);
        var SwordsmanInstructor: RefinerTrainer = new RefinerTrainer(25, "abc", "Swordsman Instructor", [Man, Coin, Sword], [1, 3, 1], [Swordsman], [1], 66);
        var BowmanInstructor: RefinerTrainer = new RefinerTrainer(26, "abc", "Bowman Instructor", [Bow, Man, Coin, Arrow], [1, 1, 5, 10], [Archer], [1], 66);
        var PikemanTrainer: RefinerTrainer = new RefinerTrainer(27, "abc", "Pikeman Trainer", [Spearman, Coin, WoodenShield], [1, 10, 1], [Pikeman], [1], 160);
        var WarriorTrainer: RefinerTrainer = new RefinerTrainer(28, "abc", "Warrior Trainer", [Swordsman, Coin, WoodenShield], [1, 10, 1], [Warrior], [1], 240);
        var RiflemanInstructor: RefinerTrainer = new RefinerTrainer(29, "abc", "Rifleman Instructor", [Rifle, Coin, Bullet, Man], [1, 30, 10, 1], [Rifleman], [1], 160);
        var KnightMentor: RefinerTrainer = new RefinerTrainer(30, "abc", "Knight Mentor", [Warrior, SteelArmor, IronShield, Coin], [1, 1, 1, 75], [Knight], [1], 400);
        var CrossArcherTrainer: RefinerTrainer = new RefinerTrainer(31, "abc", "Cross Archer Trainer", [Archer, Crossbow, Coin], [1, 1, 120], [CrossArcher], [1], 240);
        var ChanterInstructor: RefinerTrainer = new RefinerTrainer(32, "abc", "Chanter Instructor", [Wand, Man, Coin], [1, 1, 200], [Chanter], [1], 400);
        var MagusMaster: RefinerTrainer = new RefinerTrainer(33, "abc", "Magus Master", [Chanter, Staff, Coin], [1, 1, 2500], [Magus], [1], 900);
        var PaladinMaster: RefinerTrainer = new RefinerTrainer(34, "abc", "Paladin Master", [Pikeman, HolyLance, SteelArmor, Coin], [1, 1, 1, 500], [Paladin], [1], 900);
        var ArcaneGunslingerMaster: RefinerTrainer = new RefinerTrainer(35, "abc", "Arcane Gunslinger Master", [Rifleman, ArcaneRifle, Coin], [1, 1, 5500], [ArcaneGunslinger], [1], 900);
        var MysticRangerMaster: RefinerTrainer = new RefinerTrainer(36, "abc", "Mystic Ranger Master", [CrossArcher, MysticBow, Coin], [1, 1, 15000], [MysticRanger], [1], 900);
        var RefinerTrainerArr: RefinerTrainer[] = [Recruiter, Woodworker, Ironsmith, Couturier, BladeSmith, ManaRefiner, PyrotechnicExpert,
            SteelWorker, Fletcher, Metallurgist, SpearCrafter, Blacksmith, Bowyer, WoodenShieldSmith, IronShieldSmith, Armorer, Gunsmith, Crossbowyer,
            Wandmaker, StaffCrafter, EnchantedBladeSmith, MysticBowyer, ArcaneGunsmith, LanceSmith, SpearmanInstructor, SwordsmanInstructor,
            BowmanInstructor, PikemanTrainer, WarriorTrainer, RiflemanInstructor, KnightMentor, CrossArcherTrainer, ChanterInstructor,
            MagusMaster, PaladinMaster, ArcaneGunslingerMaster, MysticRangerMaster];

        //Heroes

        var StageOneEnemyArr: Enemy[] = [new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1], 40, 0, 20, theStage)];
        var StageTwoEnemyArr: Enemy[] = [new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1], 40, 0, 20, theStage)];
        var StageThreeEnemyArr: Enemy[] = [new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1], 40, 0, 20, theStage)];
        var StageFourEnemyArr: Enemy[] = [new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1], 40, 0, 20, theStage)];
        var StageFiveEnemyArr: Enemy[] = [new Enemy(0, 0, "abc", "Slime", 10, 1, 5, [1, 1], 40, 0, 20, theStage)];
        var RangeOneUnitArr: Unit[] = [Swordsman, Warrior, Knight];
        var RangeTwoUnitArr: Unit[] = [Spearman, Pikeman, Paladin];
        var RangeThreeUnitArr: Unit[] = [Rifleman];
        var RangeFourUnitArr: Unit[] = [Archer];
        var RangeFiveUnitArr: Unit[] = [CrossArcher, Chanter, MysticRanger];
        var RangeSixUnitArr: Unit[] = [Magus, ArcaneGunslinger];
        var HeroArr: Hero[] = [];
        var theStorage = new Storage(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr, ResourceArr, RefinerTrainerArr);
        return theStorage;
    }

    it("should get correct Unit on the screen", () => {
        let theIndex: ClickerIndex = new ClickerIndex(SetupStorage());
        theIndex.CurrentStorage.EnemyArr.forEach(x => x.forEach(x => x.AddValueUpdateEvent(theIndex.DeathLogic)));
        theIndex.CurrentStorage.CopyEnemyArr.forEach(x => x.forEach(x => x.AddValueUpdateEvent(theIndex.DeathLogic)));
        theIndex.CurrentStorage.UnitArr.forEach(x => x.forEach(x => x.AddValueUpdateEvent(theIndex.DeathLogic)));
        //theIndex.DeathLogic(new EnemyValueUpdateEvent(0, 9, 9));
        console.log(theIndex.CurrentStorage.CurrentUnit);
        theIndex.CurrentStorage.CurrentUnit.ReceiveDamage(1000);
        //theIndex.RemoveByDeath("Unit");
        let expected = theIndex.CurrentStorage.RangeOneUnitArr[0];
        let actual = theIndex.CurrentStorage.CurrentUnit;
        expected.should.deep.equal(actual);
        theIndex.CurrentStorage.CurrentUnit.ReceiveDamage(1000);
        //theIndex.RemoveByDeath("Unit");
        let expected1 = theIndex.CurrentStorage.RangeOneUnitArr[1];
        let actual1 = theIndex.CurrentStorage.CurrentUnit;
        theIndex.CurrentStorage.RangeTwoUnitArr[0].Exist(1);
        expected1.should.deep.equal(actual1);
        theIndex.CurrentStorage.CurrentUnit.ReceiveDamage(1000);
        //theIndex.RemoveByDeath("Unit");
        let expected2 = theIndex.CurrentStorage.RangeTwoUnitArr[0];
        let actual2 = theIndex.CurrentStorage.CurrentUnit;
        expected2.should.deep.equal(actual2);
        theIndex.CurrentStorage.RangeOneUnitArr[0].Exist(1);
        //theIndex.RemoveByDeath("Unit");
        let expected3 = theIndex.CurrentStorage.RangeOneUnitArr[0];
        let actual3 = theIndex.CurrentStorage.CurrentUnit;
        expected3.should.deep.equal(actual3);
    });

    //it("should get correct Enemy on the screen", () => {
    //    let thePlayer: Player = new Player(1);
    //    let theStage: StageLevel = new StageLevel(1);

    //    let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1000, theStage), new Enemy(1, 1000, theStage)];
    //    let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
    //    let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
    //    let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
    //    let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    //    let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
    //    let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
    //        StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
    //    theDatabase.CurrentEnemyArr[0].ReceiveDamage(1000);
    //    theDatabase.RemoveByDeath("Enemy");
    //    let expected = theDatabase.CopyStageOneEnemyArr[1];
    //    let actual = theDatabase.CurrentEnemyArr[0];
    //    expected.should.deep.equal(actual);
    //    theDatabase.CurrentEnemyArr[0].ReceiveDamage(1000);
    //    theDatabase.RemoveByDeath("Enemy");
    //    let expected1 = theDatabase.CopyStageTwoEnemyArr[0];
    //    let actual1 = theDatabase.CurrentEnemyArr[0];
    //    expected1.should.deep.equal(actual1);
    //});

    //it("should repopulate enemy arrays", () => {
    //    let thePlayer: Player = new Player(1);
    //    let theStage: StageLevel = new StageLevel(1);

    //    let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    //    let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
    //    let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
    //    let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
    //    let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    //    let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
    //    let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    //    let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
    //        StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
    //    theDatabase.CurrentEnemyArr.splice(0);
    //    theDatabase.CurrentEnemyArr.length.should.equal(0);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageTwoEnemyArr;
    //    theDatabase.CurrentEnemyArr.splice(0);
    //    theDatabase.CurrentEnemyArr.length.should.equal(0);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageThreeEnemyArr;
    //    theDatabase.CurrentEnemyArr.splice(0);
    //    theDatabase.CurrentEnemyArr.length.should.equal(0);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageFourEnemyArr;
    //    theDatabase.CurrentEnemyArr.splice(0);
    //    theDatabase.CurrentEnemyArr.length.should.equal(0);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageFiveEnemyArr;
    //    theDatabase.CurrentEnemyArr.splice(0);
    //    theDatabase.CurrentEnemyArr.length.should.equal(0);
    //    for (let i = 0; i < 5; i++) {
    //        theDatabase.PopulateEnemyArr(i);
    //    }
    //    theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
    //    theDatabase.CurrentEnemyArr.length.should.equal(1);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageTwoEnemyArr;
    //    theDatabase.CurrentEnemyArr.length.should.equal(1);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageThreeEnemyArr;
    //    theDatabase.CurrentEnemyArr.length.should.equal(1);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageFourEnemyArr;
    //    theDatabase.CurrentEnemyArr.length.should.equal(1);
    //    theDatabase.CurrentEnemyArr = theDatabase.StageFiveEnemyArr;
    //    theDatabase.CurrentEnemyArr.length.should.equal(1);
    //});
});
