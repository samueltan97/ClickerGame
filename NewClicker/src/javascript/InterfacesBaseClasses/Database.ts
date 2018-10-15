import { Unit, Enemy } from "./BaseClass";
//import { Enemy } from "./InterfacesBaseClasses/Enemy";
import { Player } from "./Player";
import { StageLevel } from "./StageLevel";
import { IExistence } from "./IExistence";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {

    private thePlayer: Player;
    private theStage: StageLevel;

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

    RangeOneUnitArr: Unit[];
    RangeTwoUnitArr: Unit[];
    RangeThreeUnitArr: Unit[];
    RangeFourUnitArr: Unit[];
    RangeFiveUnitArr: Unit[];
    RangeSixUnitArr: Unit[];
    HeroArr: Unit[];
    UnitArr: Unit[][]; //will have arrays inside organised according to increasing range before Heroes
    CurrentUnit: Unit;;
    counter: number;

    constructor(player: Player,
        stage: StageLevel,
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
        heroArr: Unit[]
    )
    {
        this.thePlayer = player;
        this.theStage = stage;
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
    }

    get CurrentPlayer() {
        return this.thePlayer;
    }

    get CurrentStage() {
        return this.theStage;
    }

    RemoveByDeath(type: string): void {
        if (type == "Unit") {
            let isEmpty: boolean = true;
            for (let i = 0; i < this.UnitArr.length && isEmpty; i++) {
                for (let j = 0; j < this.UnitArr[i].length && isEmpty; j++) {
                    if (this.UnitArr[i][j].Count > 0) {
                        isEmpty = false;
                        this.UnitArr[i][j].Birth();
                        this.CurrentUnit = this.UnitArr[i][j];
                    }
                }
            }
            if (isEmpty) {
                this.CurrentPlayer.Birth();
                //include player as unit for enemy to face off
            }
        } else if (type == "Enemy") {
            this.CurrentEnemyArr.splice(0);
            if (!this.CurrentEnemyArr.length) {
                this.PopulateEnemyArr((this.EnemyArrCounter - 1) % 5);
                this.CurrentEnemyArr = this.EnemyArr[this.EnemyArrCounter % 5];
                this.EnemyArrCounter++;
            }
            this.CurrentEnemyArr[0].Birth();
        }
    }

    MainGameCycle(currentTime: number): void {
        //Interactions for Units and Enemies       
        if (this.CurrentUnit.isDead) {
            this.CurrentUnit.isDead = false;
            this.RemoveByDeath("Unit");
        }
        if (this.CurrentEnemyArr[0].isDead) {
            this.CurrentEnemyArr[0].isDead = false;
            this.RemoveByDeath("Enemy");
        }
        this.UnitArr.forEach(s => s.forEach(x => x.Regenerate(currentTime)));
        this.CurrentEnemyArr.forEach(s => s.Regenerate(currentTime));
        this.UnitArr.forEach(s => s.forEach(u => this.CurrentEnemyArr[0].ReceiveDamage(u.UpdateFeedback(currentTime))));
        this.CurrentUnit.ReceiveDamage(this.CurrentEnemyArr[0].UpdateFeedback(currentTime));
    }

    PopulateEnemyArr(index: number) {
        switch (index % 5) {
            case 0:
                this.PopulateStageOneEnemyArray();
                break;
            case 1:
                this.PopulateStageTwoEnemyArray();
                break;
            case 2:
                this.PopulateStageThreeEnemyArray();
                break;
            case 3:
                this.PopulateStageFourEnemyArray();
                break;
            case 4:
                this.PopulateStageFiveEnemyArray();
                break;
        }
    }

    PopulateStageOneEnemyArray() {
        this.CopyStageOneEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.CopyStageOneEnemyArr.forEach(x => x.isDead = false);
        this.CopyStageOneEnemyArr.forEach(x => this.StageOneEnemyArr.push(x));
    }

    PopulateStageTwoEnemyArray() {
        this.CopyStageTwoEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.CopyStageTwoEnemyArr.forEach(x => x.isDead = false);
        this.CopyStageTwoEnemyArr.forEach(x => this.StageTwoEnemyArr.push(x));
    }

    PopulateStageThreeEnemyArray() {
        this.CopyStageThreeEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.CopyStageThreeEnemyArr.forEach(x => x.isDead = false);
        this.CopyStageThreeEnemyArr.forEach(x => this.StageThreeEnemyArr.push(x));
    }

    PopulateStageFourEnemyArray() {
        this.CopyStageFourEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.CopyStageFourEnemyArr.forEach(x => x.isDead = false);
        this.CopyStageFourEnemyArr.forEach(x => this.StageFourEnemyArr.push(x));
    }

    PopulateStageFiveEnemyArray() {
        this.CopyStageFiveEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.CopyStageFiveEnemyArr.forEach(x => x.isDead = false);
        this.CopyStageFiveEnemyArr.forEach(x => this.StageFiveEnemyArr.push(x));
    }
}
