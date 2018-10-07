import { Unit, Enemy } from "./InterfacesBaseClasses/Unit";
//import { Enemy } from "./InterfacesBaseClasses/Enemy";
import { Player } from "./InterfacesBaseClasses/Player";
import { StageLevel } from "./InterfacesBaseClasses/StageLevel";
import { IExistence } from "./InterfacesBaseClasses/IExistence";
import { IDatabase } from "./InterfacesBaseClasses/IDatabase";

export class Database implements IDatabase {

    thePlayer: Player = new Player(1);
    theStage: StageLevel = new StageLevel(1);

    EnemyArrCounter: number = 1;
    StageOneEnemyArr: Enemy[] = [new Enemy(5, 5)];
    StageTwoEnemyArr: Enemy[] = [new Enemy(5, 5)];
    StageThreeEnemyArr: Enemy[] = [new Enemy(5, 5)];
    StageFourEnemyArr: Enemy[] = [new Enemy(5, 5)];
    StageFiveEnemyArr: Enemy[] = [new Enemy(5, 5)];
    EnemyArr: Enemy[][] = [this.StageOneEnemyArr, this.StageTwoEnemyArr, this.StageThreeEnemyArr, this.StageFourEnemyArr, this.StageFiveEnemyArr];
    CurrentEnemyArr: Enemy[] = this.StageOneEnemyArr; //Will point to 5 different arrays with 

    RangeOneUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    RangeTwoUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    RangeThreeUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    RangeFourUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    RangeFiveUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    RangeSixUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    HeroArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
    UnitArr: Unit[][] = [this.RangeOneUnitArr, this.RangeTwoUnitArr, this.RangeThreeUnitArr, this.RangeFourUnitArr, this.RangeFiveUnitArr, this.RangeSixUnitArr, this.HeroArr]; //will have arrays inside organised according to increasing range before Heroes
    CurrentUnit: Unit = this.UnitArr[0][0];
    counter: number = 0;

    constructor() {

    }

}
