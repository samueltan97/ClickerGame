import { IStorage } from "./IStorage";
import { setInterval } from "timers";
import { EnemyValueUpdateEvent, UnitValueUpdateEvent, HeroValueUpdateEvent } from "./ValueUpdateEvent";
import { SkillFactory } from "./Skills/PlayerSkill";
import { ISkillFactory } from "./Skills/ISkillFactory";

export class ClickerIndex {

    private counter: number;
    private skillFactory: ISkillFactory;

    constructor(skillfactory: ISkillFactory) {
        this.skillFactory = skillfactory;
        this.counter = 1;
    }

    get CurrentStorage() {
        return this.skillFactory.Storage;
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
            this.CurrentStorage.CurrentEnemyArr[0].Birth();
        }
    }

    DeathLogic = (e: HeroValueUpdateEvent | EnemyValueUpdateEvent | UnitValueUpdateEvent): void => {
        if (this.CurrentStorage.CurrentUnit.isDead) {
            this.CurrentStorage.CurrentUnit.isDead = false;
            this.RemoveByDeath("Unit");
        }
        if (this.CurrentStorage.CurrentEnemyArr[0].isDead) {
            console.log("YAY");
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
        this.CurrentStorage.CopyStageOneEnemyArr.forEach(x => this.CurrentStorage.StageOneEnemyArr.push(x));
        this.CurrentStorage.CopyStageOneEnemyArr.forEach(x => x.RegenerateMax());
        this.CurrentStorage.CopyStageOneEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageTwoEnemyArray=()=> {
        this.CurrentStorage.CopyStageTwoEnemyArr.forEach(x => this.CurrentStorage.StageTwoEnemyArr.push(x));
        this.CurrentStorage.CopyStageTwoEnemyArr.forEach(x => x.RegenerateMax());
        this.CurrentStorage.CopyStageTwoEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageThreeEnemyArray=()=> {
        this.CurrentStorage.CopyStageThreeEnemyArr.forEach(x => this.CurrentStorage.StageThreeEnemyArr.push(x));
        this.CurrentStorage.CopyStageThreeEnemyArr.forEach(x => x.RegenerateMax());
        this.CurrentStorage.CopyStageThreeEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageFourEnemyArray=()=> {
        this.CurrentStorage.CopyStageFourEnemyArr.forEach(x => this.CurrentStorage.StageFourEnemyArr.push(x));
        this.CurrentStorage.CopyStageFourEnemyArr.forEach(x => x.RegenerateMax());
        this.CurrentStorage.CopyStageFourEnemyArr.forEach(x => x.isDead = false);
    }

    PopulateStageFiveEnemyArray=()=> {
        this.CurrentStorage.CopyStageFiveEnemyArr.forEach(x => this.CurrentStorage.StageFiveEnemyArr.push(x));
        this.CurrentStorage.CopyStageFiveEnemyArr.forEach(x => x.RegenerateMax());
        this.CurrentStorage.CopyStageFiveEnemyArr.forEach(x => x.isDead = false);
    }

   SetUpClicker=(): void=> {
        //Add listener
       this.CurrentStorage.UnitArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
       this.CurrentStorage.UnitArr.forEach(x => x.forEach(y => this.CurrentStorage.CurrentPlayer.AddValueUpdateEvent(y.UpdateSource)));
       this.CurrentStorage.EnemyArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
       this.CurrentStorage.CopyEnemyArr.forEach(x => x.forEach(y => y.AddValueUpdateEvent(this.DeathLogic)));
       this.CurrentStorage.EnemyArr.forEach(x => x.forEach(x => this.CurrentStorage.CurrentStage.AddValueUpdateEvent(x.UpdateSource)));
       this.CurrentStorage.UnitArr.forEach(x => x.forEach(x => this.CurrentStorage.CurrentPlayer.AddValueUpdateEvent(x.UpdateSource)));
       this.CurrentStorage.CopyEnemyArr.forEach(x => x.forEach(x => this.CurrentStorage.CurrentStage.AddValueUpdateEvent(x.UpdateSource)));
       for (var i = 0; i < this.CurrentStorage.StageArray.length; i++) {
           this.CurrentStorage.EnemyArr.forEach(x => x.forEach(x => this.CurrentStorage.StageArray[i].AddValueUpdateEvent(x.UpdateSource)));
           this.CurrentStorage.CopyEnemyArr.forEach(x => x.forEach(x => this.CurrentStorage.StageArray[i].AddValueUpdateEvent(x.UpdateSource)));
        }
        let index = this;
        setInterval(function () {
            index.CurrentStorage.MainGameCycle(this.counter)
        }, 50);    }
}