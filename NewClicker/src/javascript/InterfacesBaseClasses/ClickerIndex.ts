import { IStorage } from "./IStorage";
import { setInterval } from "timers";
import { EnemyValueUpdateEvent, UnitValueUpdateEvent, HeroValueUpdateEvent, PlayerValueUpdateEvent } from "./ValueUpdateEvent";
import { SkillFactory } from "./Skills/PlayerSkill";
import { ISkillFactory } from "./Skills/ISkillFactory";
import { IMortality } from "./IMortality";

export class ClickerIndex {

    private counter: number;
    private skillFactory: ISkillFactory;
    private skillUnlockFunction: Function[];

    constructor(skillfactory: ISkillFactory) {
        this.skillFactory = skillfactory;
        this.counter = 1;
        this.skillUnlockFunction = [];
    }

    get CurrentStorage() {
        return this.skillFactory.Storage;
    }

    get CurrentDPS(): number {
        let total: number = 0;
        this.skillFactory.Storage.PureUnitArr.forEach(x => total += (x.CurrentDamage / x.damageFrequency * 20));
        this.skillFactory.Storage.HeroArr.forEach(x => total += x.CurrentDamage);
        return total;
    }

    RemoveByDeath = (type: string): void => {
        if (type == "Unit") {
            let isEmpty: boolean = true;
            for (let i = 0; i < this.CurrentStorage.UnitArr.length && isEmpty; i++) {
                for (let j = 0; j < this.CurrentStorage.UnitArr[i].length && isEmpty; j++) {
                    if (this.CurrentStorage.UnitArr[i][j].Count > 0 && !this.CurrentStorage.UnitArr[i][j].isDead && this.CurrentStorage.UnitArr[i][j].isUnlocked) {
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
            this.CurrentStorage.CurrentEnemyArr[0].isDead = false;
            this.CurrentStorage.CurrentEnemyArr[0].ResourceArray.forEach(x => this.CurrentStorage.ResourceArr[x].Increase(this.CurrentStorage.CurrentStage.CurrentStage));
            this.CurrentStorage.HeroArr.forEach(x => x.GainExperience(this.CurrentStorage.CurrentEnemyArr[0].CurrentExp));
            this.CurrentStorage.CurrentPlayer.GainExperience(this.CurrentStorage.CurrentEnemyArr[0].CurrentExp);
            this.CurrentStorage.CurrentStage.IncreaseEnemyDefeated();
            this.RemoveByDeath("Enemy");
        }
        let currentUnit = this.CurrentStorage.CurrentUnit;
        let currentUnitName: string = currentUnit.name.split(" ")[0];
        if (currentUnitName == "Charles" || currentUnitName == ""){
            this.CheckPureUnitArrForAlive();
        }
    }

    CheckPureUnitArrForAlive = ():boolean => {
        let isEmpty: boolean = true;
            for (let j = 0; j < this.CurrentStorage.PureUnitArr.length && isEmpty; j++) {
                if (this.CurrentStorage.PureUnitArr[j].Count > 0 && !this.CurrentStorage.PureUnitArr[j].isDead) {
                    isEmpty = false;
                    this.CurrentStorage.CurrentUnit = this.CurrentStorage.PureUnitArr[j];
                    this.CurrentStorage.CurrentUnit.Birth();
                    this.CurrentStorage.HeroArr[0].Die();
                    return true;
                }
        }
        return false;
    }

    ChangeStage = (isIncrease: boolean): void => {
        let counter: number = this.CurrentStorage.CurrentStage.CurrentStage;
        if (isIncrease && counter < 4) {
            this.CurrentStorage.CurrentEnemyArr[0].Fadeout();
            this.CurrentStorage.CurrentStage = this.CurrentStorage.StageArray[counter];
            this.CurrentStorage.CurrentEnemyArr = this.CurrentStorage.EnemyArr[counter];            
            this.CurrentStorage.CurrentEnemyArr[0].Birth();
        } else if (!isIncrease && counter > 1) {
            this.CurrentStorage.CurrentEnemyArr[0].Fadeout();
            this.CurrentStorage.CurrentStage = this.CurrentStorage.StageArray[counter - 2];
            this.CurrentStorage.CurrentEnemyArr = this.CurrentStorage.EnemyArr[counter - 2];
            this.CurrentStorage.CurrentEnemyArr[0].Birth();
        }
        this.CurrentStorage.CurrentStage.Birth();
    }

    AddSkillUnlockFunction = (f:Function) => {
        this.skillUnlockFunction.push(f);
    }

    UnlockHeroSkill = (e: HeroValueUpdateEvent): void =>{
        switch (e.newLevel) {
            case 10: this.skillUnlockFunction.forEach(x=>x(20 + (e.id * 5)));
                break;
            case 100: this.skillUnlockFunction.forEach(x => x(21 + (e.id * 5)));
                break;
            case 1000: this.skillUnlockFunction.forEach(x => x(22 + (e.id * 5)));
                break;
            case 10000: this.skillUnlockFunction.forEach(x => x(23 + (e.id * 5)));
                break;
        }
    }

    UnlockPlayerSkill = (e: PlayerValueUpdateEvent): void =>{
        switch (e.newLevel) {
            case 10: this.skillUnlockFunction.forEach(x=>x(1 + (e.job * 5)));
                break;
            case 50: this.skillUnlockFunction.forEach(x => x(2 + (e.job * 5)));
                break;
            case 100: this.skillUnlockFunction.forEach(x => x(3 + (e.job * 5)));
                break;
            case 500: this.skillUnlockFunction.forEach(x => x(4 + (e.job * 5)));
                break;
            case 1000: this.skillUnlockFunction.forEach(x => x(5 + (e.job * 5)));
                break;
        }
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
       this.CurrentStorage.HeroArr.forEach(x => x.AddValueUpdateEvent(this.UnlockHeroSkill));
       this.CurrentStorage.CurrentPlayer.AddValueUpdateEvent(this.UnlockPlayerSkill);
       for (var i = 0; i < this.CurrentStorage.StageArray.length; i++) {
           this.CurrentStorage.EnemyArr.forEach(x => x.forEach(x => this.CurrentStorage.StageArray[i].AddValueUpdateEvent(x.UpdateSource)));
           this.CurrentStorage.CopyEnemyArr.forEach(x => x.forEach(x => this.CurrentStorage.StageArray[i].AddValueUpdateEvent(x.UpdateSource)));
        }
        let index = this;
        setInterval(function () {
            index.CurrentStorage.MainGameCycle(index.counter)
            index.counter++;
       }, 50);
   }
}