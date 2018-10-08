import { Unit, Enemy } from "./InterfacesBaseClasses/BaseClass";
import { Player } from "./InterfacesBaseClasses/Player";
import { StageLevel } from "./InterfacesBaseClasses/StageLevel";
import { IExistence } from "./InterfacesBaseClasses/IExistence";
import { IDatabase } from "./InterfacesBaseClasses/IDatabase";
import { GameRepo } from "..";

export class Database implements IDatabase {

    thePlayer: Player = new Player(1);
    theStage: StageLevel = new StageLevel(1);

    EnemyArrCounter: number = 1;
    StageOneEnemyArr: Enemy[] = [new Enemy(5, 5, GameRepo)];
    StageTwoEnemyArr: Enemy[] = [new Enemy(5, 5, GameRepo)];
    StageThreeEnemyArr: Enemy[] = [new Enemy(5, 5, GameRepo)];
    StageFourEnemyArr: Enemy[] = [new Enemy(5, 5, GameRepo)];
    StageFiveEnemyArr: Enemy[] = [new Enemy(5, 5, GameRepo)];
    EnemyArr: Enemy[][] = [this.StageOneEnemyArr, this.StageTwoEnemyArr, this.StageThreeEnemyArr, this.StageFourEnemyArr, this.StageFiveEnemyArr];
    CurrentEnemyArr: Enemy[] = this.StageOneEnemyArr; //Will point to 5 different arrays with 

    RangeOneUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    RangeTwoUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    RangeThreeUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    RangeFourUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    RangeFiveUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    RangeSixUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    HeroArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123, GameRepo)];
    UnitArr: Unit[][] = [this.RangeOneUnitArr, this.RangeTwoUnitArr, this.RangeThreeUnitArr, this.RangeFourUnitArr, this.RangeFiveUnitArr, this.RangeSixUnitArr, this.HeroArr]; //will have arrays inside organised according to increasing range before Heroes
    CurrentUnit: Unit = this.UnitArr[0][0];
    counter: number = 0;

    constructor(player: Player, stage: StageLevel, stageOneEnemyArr: Enemy[], stageTwoEnemyArr: Enemy[], stageOneEnemyArr: Enemy[], stageOneEnemyArr: Enemy[], stageOneEnemyArr: Enemy[],) {

    }

}
