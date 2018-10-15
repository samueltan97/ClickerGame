import { Enemy, Unit } from "../src/javascript/InterfacesBaseClasses/BaseClass";
import { Database } from "../src/javascript/InterfacesBaseClasses/Database";
import { should, expect } from "chai";
import { Player } from "../src/javascript/InterfacesBaseClasses/Player";
import { StageLevel } from "../src/javascript/InterfacesBaseClasses/StageLevel";

should();

describe("Database", () => {

   it("should get correct database", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1000, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        let expected = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        let actual = theDatabase;
        expected.should.deep.equal(actual);
    });

    it("should get correct Player on the screen", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1000, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        let expected = new Player(1);
        let actual = theDatabase.CurrentPlayer;
        expected.should.deep.equal(actual);
    });

    it("should get correct Stage on the screen", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1000, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        let expected = new StageLevel(1);
        let actual = theDatabase.CurrentStage;
        expected.should.deep.equal(actual);
    });

    it("should get correct Unit on the screen", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1000, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        theDatabase.CurrentUnit = theDatabase.RangeTwoUnitArr[0];
        theDatabase.CurrentUnit.ReceiveDamage(1000);
        theDatabase.RemoveByDeath("Unit");
        let expected = theDatabase.RangeOneUnitArr[0];
        let actual = theDatabase.CurrentUnit;
        expected.should.deep.equal(actual);
        theDatabase.CurrentUnit.ReceiveDamage(1000);
        theDatabase.RemoveByDeath("Unit");
        let expected1 = theDatabase.RangeOneUnitArr[1];
        let actual1 = theDatabase.CurrentUnit;
        expected1.should.deep.equal(actual1);
        expected1.Unexist(1);
    });

    it("should get correct Enemy on the screen", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1000, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
        theDatabase.CurrentEnemyArr[0].ReceiveDamage(1000);
        theDatabase.RemoveByDeath("Enemy");
        let expected = theDatabase.StageTwoEnemyArr[0];
        let actual = theDatabase.CurrentEnemyArr[0];
        expected.should.deep.equal(actual);
    });

    it("should handle methods in the correct sequence when MainGameCycle is run", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
        theDatabase.CurrentUnit = theDatabase.UnitArr[0][0];
        theDatabase.EnemyArrCounter = 1;
        theDatabase.MainGameCycle(10);
        (theDatabase.CurrentEnemyArr[0].CurrentHP).should.equal(0);
        (theDatabase.CurrentUnit.CurrentHP).should.equal(theDatabase.CurrentUnit.MaxHP);
        theDatabase.MainGameCycle(20);
        (theDatabase.CurrentEnemyArr[0]).should.deep.equal(theDatabase.StageTwoEnemyArr[0]);
        (theDatabase.CurrentUnit.CurrentHP).should.equal(0);
        theDatabase.MainGameCycle(30);
        (theDatabase.CurrentUnit).should.deep.equal(theDatabase.RangeOneUnitArr[1]);
        (theDatabase.CurrentEnemyArr[0].CurrentHP).should.equal(994);
    });

    it("should repopulate enemy arrays", () => {
        let thePlayer: Player = new Player(1);
        let theStage: StageLevel = new StageLevel(1);

        let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let StageTwoEnemyArr: Enemy[] = [new Enemy(2000, 2000, theStage)];
        let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 1, theStage)];
        let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
        let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
        let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 1, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1000, 1, 1, thePlayer)];
        let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
        let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
        theDatabase.CurrentEnemyArr.splice(0);
        theDatabase.CurrentEnemyArr.length.should.equal(0);
        theDatabase.CurrentEnemyArr = theDatabase.StageTwoEnemyArr;
        theDatabase.CurrentEnemyArr.splice(0);
        theDatabase.CurrentEnemyArr.length.should.equal(0);
        theDatabase.CurrentEnemyArr = theDatabase.StageThreeEnemyArr;
        theDatabase.CurrentEnemyArr.splice(0);
        theDatabase.CurrentEnemyArr.length.should.equal(0);
        theDatabase.CurrentEnemyArr = theDatabase.StageFourEnemyArr;
        theDatabase.CurrentEnemyArr.splice(0);
        theDatabase.CurrentEnemyArr.length.should.equal(0);
        theDatabase.CurrentEnemyArr = theDatabase.StageFiveEnemyArr;
        theDatabase.CurrentEnemyArr.splice(0);
        theDatabase.CurrentEnemyArr.length.should.equal(0);
        for (let i = 0; i < 5; i++) {
            theDatabase.PopulateEnemyArr(i);
        }
        theDatabase.CurrentEnemyArr = theDatabase.StageOneEnemyArr;
        theDatabase.CurrentEnemyArr.length.should.equal(1);
        theDatabase.CurrentEnemyArr = theDatabase.StageTwoEnemyArr;
        theDatabase.CurrentEnemyArr.length.should.equal(1);
        theDatabase.CurrentEnemyArr = theDatabase.StageThreeEnemyArr;
        theDatabase.CurrentEnemyArr.length.should.equal(1);
        theDatabase.CurrentEnemyArr = theDatabase.StageFourEnemyArr;
        theDatabase.CurrentEnemyArr.length.should.equal(1);
        theDatabase.CurrentEnemyArr = theDatabase.StageFiveEnemyArr;
        theDatabase.CurrentEnemyArr.length.should.equal(1);
    });
});
