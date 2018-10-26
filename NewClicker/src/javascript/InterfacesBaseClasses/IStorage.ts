import { Player } from "./Player";
import { StageLevel } from "./StageLevel";
import { Enemy, Unit, Hero, Resource } from "./BaseClass";
import { IMortality } from "./IMortality";

export interface IStorage {
    readonly CurrentPlayer:Player;
    CurrentStage: StageLevel;
    StageArray: StageLevel[];

    EnemyArrCounter: number;
    StageOneEnemyArr: Enemy[];
    StageTwoEnemyArr: Enemy[];
    StageThreeEnemyArr: Enemy[];
    StageFourEnemyArr: Enemy[];
    StageFiveEnemyArr: Enemy[];
    CopyStageOneEnemyArr: Enemy[];
    CopyStageTwoEnemyArr: Enemy[];
    CopyStageThreeEnemyArr: Enemy[];
    CopyStageFourEnemyArr: Enemy[];
    CopyStageFiveEnemyArr: Enemy[];
    EnemyArr: Enemy[][];
    CopyEnemyArr: Enemy[][];
    CurrentEnemyArr: Enemy[]; 

    RangeOneUnitArr: Unit[];
    RangeTwoUnitArr: Unit[];
    RangeThreeUnitArr: Unit[];
    RangeFourUnitArr: Unit[];
    RangeFiveUnitArr: Unit[];
    RangeSixUnitArr: Unit[];
    HeroArr: Hero[];
    UnitArr: IMortality[][]; 
    CurrentUnit: IMortality;
    counter: number;

    ResourceArr: Resource[];
    MainGameCycle(currentTime: number): void;
}