import { IStorage } from "./IStorage";
import { setInterval } from "timers";
import { EnemyValueUpdateEvent, UnitValueUpdateEvent, HeroValueUpdateEvent } from "./ValueUpdateEvent";

export class ClickerIndex {

    private counter: number;
    private theStorage: IStorage;

    constructor(storage: IStorage) {
        this.theStorage = storage;
        this.counter = 1;
    }

    get CurrentStorage() {
        return this.theStorage;
    }

    RemoveByDeath = (type: string): void => {
        if (type == "Unit") {
            let isEmpty: boolean = true;
            for (let i = 0; i < this.CurrentStorage.UnitArr.length && isEmpty; i++) {
                for (let j = 0; j < this.CurrentStorage.UnitArr[i].length && isEmpty; j++) {
                    if (this.CurrentStorage.UnitArr[i][j].Count > 0 && !this.CurrentStorage.UnitArr[i][j].isDead) {
                        isEmpty = false;
                        this.CurrentStorage.UnitArr[i][j].Birth();
                        this.CurrentStorage.CurrentUnit = this.CurrentStorage.UnitArr[i][j];
                    }
                }
            }
            if (isEmpty) {
                console.log("GG");
            }

        } else if (type == "Enemy") {
            this.CurrentStorage.CurrentEnemyArr.splice(0, 1);
            if (this.CurrentStorage.CurrentEnemyArr.length == 0) {
                this.PopulateEnemyArr((this.CurrentStorage.CurrentStage.CurrentStage - 1) % 5);
                this.CurrentStorage.CurrentEnemyArr = this.CurrentStorage.EnemyArr[(this.CurrentStorage.CurrentStage.CurrentStage -1) % 5];
            }
            this.theStorage.CurrentEnemyArr[0].Birth();
        }
    }

    DeathLogic = (e: HeroValueUpdateEvent | EnemyValueUpdateEvent | UnitValueUpdateEvent): void => {
        if (this.CurrentStorage.CurrentUnit.isDead) {
            this.CurrentStorage.CurrentUnit.isDead = false;
            this.RemoveByDeath("Unit");
        }
        if (this.CurrentStorage.CurrentEnemyArr[0].isDead) {
            this.CurrentStorage.CurrentEnemyArr[0].isDead = false;
            this.CurrentStorage.CurrentEnemyArr[0].ResourceArray.forEach(x => this.CurrentStorage.ResourceArr[x].Increase(this.CurrentStorage.CurrentStage.CurrentStage));
            this.CurrentStorage.HeroArr.forEach(x => x.GainExperience(this.CurrentStorage.CurrentEnemyArr[0].CurrentExp));
            this.CurrentStorage.CurrentPlayer.GainExperience(this.CurrentStorage.CurrentEnemyArr[0].CurrentExp);
            this.CurrentStorage.CurrentStage.IncreaseEnemyDefeated();
            this.RemoveByDeath("Enemy");
        }    
    }

    ChangeStage = (isIncrease: boolean): void => {
        let counter: number = this.CurrentStorage.CurrentStage.CurrentStage;
        this.CurrentStorage.CurrentEnemyArr[0].Fadeout();
        if (isIncrease) {
            this.CurrentStorage.CurrentStage = this.CurrentStorage.StageArray[counter];
            this.CurrentStorage.CurrentEnemyArr = this.CurrentStorage.EnemyArr[counter];
        } else {
            this.CurrentStorage.CurrentStage = this.CurrentStorage.StageArray[counter - 2];
            this.CurrentStorage.CurrentEnemyArr = this.CurrentStorage.EnemyArr[counter - 2];
        }
        this.CurrentStorage.CurrentEnemyArr[0].Birth();
    }

    PopulateEnemyArr = (index: number) => {
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

    PopulateStageOneEnemyArray = () => {
        this.theStorage.CopyStageOneEnemyArr.forEach(x => this.theStorage.StageOneEnemyArr.push(x));
        this.theStorage.CopyStageOneEnemyArr.forEach(x => x.RegenerateMax());
        this.theStorage.CopyStageOneEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageTwoEnemyArray=()=> {
        this.theStorage.CopyStageTwoEnemyArr.forEach(x => this.theStorage.StageTwoEnemyArr.push(x));
        this.theStorage.CopyStageTwoEnemyArr.forEach(x => x.RegenerateMax());
        this.theStorage.CopyStageTwoEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageThreeEnemyArray=()=> {
        this.theStorage.CopyStageThreeEnemyArr.forEach(x => this.theStorage.StageThreeEnemyArr.push(x));
        this.theStorage.CopyStageThreeEnemyArr.forEach(x => x.RegenerateMax());
        this.theStorage.CopyStageThreeEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageFourEnemyArray=()=> {
        this.theStorage.CopyStageFourEnemyArr.forEach(x => this.theStorage.StageFourEnemyArr.push(x));
        this.theStorage.CopyStageFourEnemyArr.forEach(x => x.RegenerateMax());
        this.theStorage.CopyStageFourEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageFiveEnemyArray=()=> {
        this.theStorage.CopyStageFiveEnemyArr.forEach(x => this.theStorage.StageFiveEnemyArr.push(x));
        this.theStorage.CopyStageFiveEnemyArr.forEach(x => x.RegenerateMax());
        this.theStorage.CopyStageFiveEnemyArr.forEach(x => x.isDead = false);
    }

   SetUpClicker=(): void=> {
        //Add listener
        this.theStorage.UnitArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
        this.theStorage.UnitArr.forEach(x => x.forEach(y => this.theStorage.CurrentPlayer.AddValueUpdateEvent(y.UpdateSource)));
        this.theStorage.EnemyArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
        this.theStorage.CopyEnemyArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
        this.theStorage.EnemyArr.forEach(x => x.forEach(x => this.theStorage.CurrentStage.AddValueUpdateEvent(x.UpdateSource)));
        this.theStorage.UnitArr.forEach(x => x.forEach(x=>this.theStorage.CurrentPlayer.AddValueUpdateEvent(x.UpdateSource)));
        this.theStorage.CopyEnemyArr.forEach(x => x.forEach(x => this.theStorage.CurrentStage.AddValueUpdateEvent(x.UpdateSource)));
        for (var i = 0; i < this.theStorage.StageArray.length; i++) {
            this.theStorage.EnemyArr.forEach(x => x.forEach(x => this.theStorage.StageArray[i].AddValueUpdateEvent(x.UpdateSource)));
            this.theStorage.CopyEnemyArr.forEach(x => x.forEach(x => this.theStorage.StageArray[i].AddValueUpdateEvent(x.UpdateSource)));
        }
        let index = this;
        setInterval(function () {
            index.theStorage.MainGameCycle(this.counter)
        }, 50);    }
}