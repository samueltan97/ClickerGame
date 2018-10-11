import { Enemy, Unit } from "../src/javascript/InterfacesBaseClasses/BaseClass";
import { Database } from "../src/javascript/InterfacesBaseClasses/Database";
import { should, expect } from "chai";
import { Player } from "../src/javascript/InterfacesBaseClasses/Player";
import { StageLevel } from "../src/javascript/InterfacesBaseClasses/StageLevel";

should();

describe("Database", () => {

    let thePlayer: Player = new Player(1);
    let theStage: StageLevel = new StageLevel(1);

    let StageOneEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    let StageTwoEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    let StageThreeEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    let StageFourEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];;
    let StageFiveEnemyArr: Enemy[] = [new Enemy(1, 1, theStage)];
    let RangeOneUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 10, 10, 1, 1, thePlayer), new Unit(2, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let RangeTwoUnitArr: Unit[] = [new Unit(3, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let RangeThreeUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let RangeFourUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let RangeFiveUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let RangeSixUnitArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let HeroArr: Unit[] = [new Unit(1, "abc.com", "Warrior", 1, 1, 1, 1, thePlayer)];
    let theDatabase = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
        StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);

    it("should get correct Player on the screen", () => {
        let expected = new Database(thePlayer, theStage, StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr,
            StageFiveEnemyArr, RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr);
        let actual = theDatabase;
        expected.should.deep.equal(actual);
    });

    it("should get correct Player on the screen", () => {
        let expected = new Player(1);
        let actual = theDatabase.CurrentPlayer;
        expected.should.deep.equal(actual);
    });

    it("should get correct Stage on the screen", () => {
        let expected = new StageLevel(1);
        let actual = theDatabase.CurrentStage;
        expected.should.deep.equal(actual);
    });

    it("should get correct Unit on the screen", () => {
        theDatabase.CurrentUnit = theDatabase.RangeTwoUnitArr[0];
        theDatabase.CurrentUnit.ReceiveDamage(1000);
        theDatabase.MainGameCycle(1);
        let expected = theDatabase.RangeOneUnitArr[0];
        let actual = theDatabase.CurrentUnit;
        expected.should.deep.equal(actual);
        theDatabase.CurrentUnit.ReceiveDamage(1000);
        theDatabase.MainGameCycle(1);
        let expected1 = theDatabase.RangeOneUnitArr[1];
        let actual1 = theDatabase.CurrentUnit;
        expected1.should.deep.equal(actual1);
        expected1.Unexist(1);
    });
});
