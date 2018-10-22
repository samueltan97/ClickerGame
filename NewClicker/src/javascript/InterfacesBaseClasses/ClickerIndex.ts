import { IStorage } from "./IStorage";
import { setInterval } from "timers";
import { EnemyValueUpdateEvent, UnitValueUpdateEvent } from "./ValueUpdateEvent";

export class ClickerIndex {

    private counter: number;
    private theStorage: IStorage;

    constructor(storage: IStorage) {
        this.theStorage = storage;
        this.counter = 1;
    }

    RemoveByDeath(type: string): void {
        if (type == "Unit") {
            let isEmpty: boolean = true;
            for (let i = 0; i < this.theStorage.UnitArr.length && isEmpty; i++) {
                for (let j = 0; j < this.theStorage.UnitArr[i].length && isEmpty; j++) {
                    if (this.theStorage.UnitArr[i][j].Count > 0 && !this.theStorage.UnitArr[i][j].isDead) {
                        isEmpty = false;
                        this.theStorage.UnitArr[i][j].Birth();
                        this.theStorage.CurrentUnit = this.theStorage.UnitArr[i][j];
                    }
                }
            }

        } else if (type == "Enemy") {
            this.theStorage.CurrentEnemyArr.splice(0, 1);
            if (this.theStorage.CurrentEnemyArr.length == 0) {
                this.PopulateEnemyArr((this.theStorage.EnemyArrCounter - 1) % 5);
                this.theStorage.CurrentEnemyArr = this.theStorage.EnemyArr[this.theStorage.EnemyArrCounter % 5];
                this.theStorage.EnemyArrCounter++;
            }
            this.theStorage.CurrentEnemyArr[0].Birth();

        }
    }

    DeathLogic(e: EnemyValueUpdateEvent | UnitValueUpdateEvent): void {
        if (this.theStorage.CurrentUnit.isDead) {
            this.theStorage.CurrentUnit.isDead = false;
            this.RemoveByDeath("Unit");
        }
        if (this.theStorage.CurrentEnemyArr[0].isDead) {
            this.theStorage.CurrentEnemyArr[0].isDead = false;
            this.theStorage.CurrentEnemyArr[0].ResourceArray.forEach(x => this.theStorage.ResourceArr[x].Increase(1));
            this.theStorage.HeroArr.forEach(x => x.GainExperience(this.theStorage.CurrentEnemyArr[0].CurrentExp));
            this.theStorage.CurrentPlayer.GainExperience(this.theStorage.CurrentEnemyArr[0].CurrentExp);
            this.RemoveByDeath("Enemy");
        }    
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
        this.theStorage.CopyStageOneEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.theStorage.CopyStageOneEnemyArr.forEach(x => x.isDead = false);
        this.theStorage.CopyStageOneEnemyArr.forEach(x => this.theStorage.StageOneEnemyArr.push(x));
    }

    PopulateStageTwoEnemyArray() {
        this.theStorage.CopyStageTwoEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.theStorage.CopyStageTwoEnemyArr.forEach(x => x.isDead = false);
        this.theStorage.CopyStageTwoEnemyArr.forEach(x => this.theStorage.StageTwoEnemyArr.push(x));
    }

    PopulateStageThreeEnemyArray() {
        this.theStorage.CopyStageThreeEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.theStorage.CopyStageThreeEnemyArr.forEach(x => x.isDead = false);
        this.theStorage.CopyStageThreeEnemyArr.forEach(x => this.theStorage.StageThreeEnemyArr.push(x));
    }

    PopulateStageFourEnemyArray() {
        this.theStorage.CopyStageFourEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.theStorage.CopyStageFourEnemyArr.forEach(x => x.isDead = false);
        this.theStorage.CopyStageFourEnemyArr.forEach(x => this.theStorage.StageFourEnemyArr.push(x));
    }

    PopulateStageFiveEnemyArray() {
        this.theStorage.CopyStageFiveEnemyArr.forEach(x => x.Regenerate(x.MaxHP));
        this.theStorage.CopyStageFiveEnemyArr.forEach(x => x.isDead = false);
        this.theStorage.CopyStageFiveEnemyArr.forEach(x => this.theStorage.StageFiveEnemyArr.push(x));
    }

    SetUpClicker(): void {
        //Add listener
        this.theStorage.UnitArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
        this.theStorage.EnemyArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
        setInterval(function () {
            this.theStorage.MainGameCycle(this.counter)
        }, 50);
    }
}