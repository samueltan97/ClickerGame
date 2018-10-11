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
            this.CurrentEnemyArr.slice(1);
            if (!this.CurrentEnemyArr.length) {
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
        this.UnitArr.forEach(s => s.forEach(u => this.CurrentEnemyArr[0].ReceiveDamage(u.UpdateFeedback(currentTime))));
        this.CurrentUnit.ReceiveDamage(this.CurrentEnemyArr[0].UpdateFeedback(currentTime));
    }
}
