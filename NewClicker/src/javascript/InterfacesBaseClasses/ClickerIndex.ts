import { IStorage } from "./IStorage";
import { setInterval } from "timers";
import { EnemyValueUpdateEvent, UnitValueUpdateEvent, HeroValueUpdateEvent, PlayerValueUpdateEvent } from "./ValueUpdateEvent";
import { SkillFactory } from "./Skills/PlayerSkill";
import { ISkillFactory } from "./Skills/ISkillFactory";
import { IMortality } from "./IMortality";
import { slotMachineEffect, adjustValueToExponential } from "../CSSAnimation/CSSAnimation";

export class ClickerIndex {

    private counter: number;
    private enemyTimerCounter: number;
    private skillFactory: ISkillFactory;
    private skillUnlockFunction: Function[];
    private skillUpdateTimeFunction: Function[];

    constructor(skillfactory: ISkillFactory) {
        this.skillFactory = skillfactory;
        this.counter = 1;
        this.enemyTimerCounter = 30;
        this.skillUnlockFunction = [];
        this.skillUpdateTimeFunction = [];
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

    UpdateTimeCounter = (): void => {
        this.skillUpdateTimeFunction.forEach(x => x(this.counter));
    }

    AddTimeCounterFunction = (f:Function): void => {
        this.skillUpdateTimeFunction.push(f);
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
            this.enemyTimerCounter = 30;
            this.UpdateEnemyTimeCounter();
        }
        let currentUnit = this.CurrentStorage.CurrentUnit;
        let currentUnitName: string = currentUnit.name.split(" ")[0];
        if (["Charles", "Yusie", "Halley", "Helmuth"].indexOf(currentUnitName) >= 0) {
            this.CheckPureUnitArrForAlive();
        }
    }

    CheckPureUnitArrForAlive = ():boolean => {
            for (let j = 0; j < this.CurrentStorage.PureUnitArr.length; j++) {
                if (this.CurrentStorage.PureUnitArr[j].Count > 0 && !this.CurrentStorage.PureUnitArr[j].isDead) {
                    this.CurrentStorage.CurrentUnit = this.CurrentStorage.PureUnitArr[j];
                    this.CurrentStorage.HeroArr.forEach(x=>x.Die());
                    this.CurrentStorage.CurrentUnit.Birth();
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

    ChangeZone = (isIncrease: boolean): void => {
        let currentZone: number = this.CurrentStorage.CurrentStage.CurrentZone;
        if (isIncrease && currentZone < this.CurrentStorage.CurrentStage.MaxZone) {
            this.CurrentStorage.CurrentEnemyArr[0].Fadeout();
            this.CurrentStorage.CurrentStage.IncreaseZone(false);
            this.CurrentStorage.CurrentEnemyArr.splice(0, this.CurrentStorage.CurrentEnemyArr.length);
            this.PopulateEnemyArr(this.CurrentStorage.CurrentStage.CurrentStage - 1);
            this.CurrentStorage.CurrentEnemyArr[0].Birth();
        } else if (!isIncrease && currentZone > 1) {
            this.CurrentStorage.CurrentEnemyArr[0].Fadeout();
            this.CurrentStorage.CurrentStage.DecreaseZone();
            this.CurrentStorage.CurrentEnemyArr.splice(0, this.CurrentStorage.CurrentEnemyArr.length);
            this.PopulateEnemyArr(this.CurrentStorage.CurrentStage.CurrentStage - 1);
            this.CurrentStorage.CurrentEnemyArr[0].Birth();
        } else if (!isIncrease && currentZone == 1) {
            this.CurrentStorage.CurrentEnemyArr[0].Fadeout();
            this.CurrentStorage.CurrentEnemyArr.splice(0, this.CurrentStorage.CurrentEnemyArr.length);
            this.PopulateEnemyArr(this.CurrentStorage.CurrentStage.CurrentStage - 1);
            this.CurrentStorage.CurrentEnemyArr[0].Birth();
        }
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

    UpdateEnemyTimeCounter = () => {
        let currentTimeString: string = this.enemyTimerCounter.toString();
        let currentTime: string = (currentTimeString.length > 1) ? currentTimeString : "0".concat(currentTimeString);
        let timeFormat: string = $("#combat-text-right").text().split("0:")[0];
        $("#combat-text-right").text(timeFormat + "0:" + currentTime);
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
           if (index.counter % 20 == 0) {
               index.enemyTimerCounter -= 1;
               index.UpdateEnemyTimeCounter();
               if ($("#player-avg-dps").text() != "Average DPS: " + adjustValueToExponential(Math.floor(index.CurrentDPS))) slotMachineEffect("player-avg-dps", adjustValueToExponential(Math.floor(index.CurrentDPS)), "Average DPS: ");
           }
           if (index.enemyTimerCounter == 0) {
               index.ChangeZone(false);
               index.ChangeZone(true);
               index.enemyTimerCounter = 30;
               index.UpdateEnemyTimeCounter();
           }
            index.counter+=1;
            index.skillUpdateTimeFunction.forEach(x => x(index.counter));
            index.CurrentStorage.MainGameCycle(index.counter)
       }, 50);
   }
}