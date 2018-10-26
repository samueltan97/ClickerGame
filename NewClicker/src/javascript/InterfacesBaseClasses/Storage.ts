import { Unit, Enemy, Resource, RefinerTrainer, Hero } from "./BaseClass";
import { Player } from "./Player";
import { StageLevel } from "./StageLevel";
import { IExistence } from "./IExistence";
import { IStorage } from "./IStorage";
import { IMortality } from "./IMortality";

export class Storage implements IStorage {

    private thePlayer: Player;
    private StageOne: StageLevel = new StageLevel(1);
    private StageTwo: StageLevel = new StageLevel(2);
    private StageThree: StageLevel = new StageLevel(3);
    private StageFour: StageLevel = new StageLevel(4);
    private StageFive: StageLevel = new StageLevel(5);
    CurrentStage: StageLevel;
    StageArray: StageLevel[];

    EnemyArrCounter: number;
    StageOneEnemyArr: Enemy[];
    StageTwoEnemyArr: Enemy[];
    StageThreeEnemyArr: Enemy[];
    StageFourEnemyArr: Enemy[];
    StageFiveEnemyArr: Enemy[];
    EnemyArr: Enemy[][];
    CurrentEnemyArr: Enemy[]; //Will point to 5 different arrays with 

    CopyStageOneEnemyArr: Enemy[];
    CopyStageTwoEnemyArr: Enemy[];
    CopyStageThreeEnemyArr: Enemy[];
    CopyStageFourEnemyArr: Enemy[];
    CopyStageFiveEnemyArr: Enemy[];
    CopyEnemyArr: Enemy[][];

    RangeOneUnitArr: Unit[];
    RangeTwoUnitArr: Unit[];
    RangeThreeUnitArr: Unit[];
    RangeFourUnitArr: Unit[];
    RangeFiveUnitArr: Unit[];
    RangeSixUnitArr: Unit[];
    HeroArr: Hero[];
    UnitArr: IMortality[][]; //will have arrays inside organised according to increasing range before Heroes
    CurrentUnit: IMortality;
    counter: number;

    ResourceArr: Resource[];
    RefinerTrainerArr: RefinerTrainer[];

    constructor(player: Player,
        stageOneEnemyArr: Enemy[],
        stageTwoEnemyArr: Enemy[],
        stageThreeEnemyArr: Enemy[],
        stageFourEnemyArr: Enemy[],
        stageFiveEnemyArr: Enemy[],
        rangeOneUnitArr: Unit[],
        rangeTwoUnitArr: Unit[],
        rangeThreeUnitArr: Unit[],
        rangeFourUnitArr: Unit[],
        rangeFiveUnitArr: Unit[],
        rangeSixUnitArr: Unit[],
        heroArr: Hero[],
        resourceArr: Resource[],
        refinerTrainerArr: RefinerTrainer[]
    ) {
        this.thePlayer = player;
        this.CurrentStage = this.StageOne;
        this.StageOneEnemyArr = stageOneEnemyArr;
        this.StageTwoEnemyArr = stageTwoEnemyArr;
        this.StageThreeEnemyArr = stageThreeEnemyArr;
        this.StageFourEnemyArr = stageFourEnemyArr;
        this.StageFiveEnemyArr = stageFiveEnemyArr;
        this.CopyStageOneEnemyArr = stageOneEnemyArr.slice(0);
        this.CopyStageTwoEnemyArr = stageTwoEnemyArr.slice(0);
        this.CopyStageThreeEnemyArr = stageThreeEnemyArr.slice(0);
        this.CopyStageFourEnemyArr = stageFourEnemyArr.slice(0);
        this.CopyStageFiveEnemyArr = stageFiveEnemyArr.slice(0);
        this.EnemyArr = [this.StageOneEnemyArr, this.StageTwoEnemyArr, this.StageThreeEnemyArr, this.StageFourEnemyArr, this.StageFiveEnemyArr];
        this.CopyEnemyArr = [this.CopyStageOneEnemyArr, this.CopyStageTwoEnemyArr, this.CopyStageThreeEnemyArr, this.CopyStageFourEnemyArr, this.CopyStageFiveEnemyArr];
        this.EnemyArrCounter = 1;
        this.CurrentEnemyArr = this.StageOneEnemyArr;
        this.RangeOneUnitArr = rangeOneUnitArr;
        this.RangeTwoUnitArr = rangeTwoUnitArr;
        this.RangeThreeUnitArr = rangeThreeUnitArr;
        this.RangeFourUnitArr = rangeFourUnitArr;
        this.RangeFiveUnitArr = rangeFiveUnitArr;
        this.RangeSixUnitArr = rangeSixUnitArr;
        this.HeroArr = heroArr;
        this.UnitArr = [this.RangeOneUnitArr, this.RangeTwoUnitArr, this.RangeThreeUnitArr, this.RangeFourUnitArr, this.RangeFiveUnitArr, this.RangeSixUnitArr, this.HeroArr]; //will have arrays inside organised according to increasing range before Heroes
        this.CurrentUnit = this.UnitArr[0][0];
        this.counter = 0;
        this.ResourceArr = resourceArr;
        this.RefinerTrainerArr = refinerTrainerArr;
        this.StageArray = [this.StageOne, this.StageTwo, this.StageThree, this.StageFour, this.StageFive];
    }

    get CurrentPlayer() {
        return this.thePlayer;
    }

    MainGameCycle(currentTime: number): Storage {
        if ((currentTime - 5) % 10 == 0) {
            this.UnitArr.forEach(s => s.forEach(u => this.CurrentEnemyArr[0].ReceiveDamage(u.UpdateFeedback(currentTime))));
            this.UnitArr.forEach(s => s.forEach(x => x.Regenerate(currentTime)));
            this.CurrentEnemyArr[0].ReceiveDamage(this.thePlayer.UpdateFeedback(currentTime));
        } else if (currentTime % 10 == 0) {
            this.CurrentUnit.ReceiveDamage(this.CurrentEnemyArr[0].UpdateFeedback(currentTime));
            this.RefinerTrainerArr.forEach(x => x.UpdateFeedback(currentTime));
            this.CurrentEnemyArr.forEach(s => s.Regenerate(currentTime));
        }

        return this;
    }
}
