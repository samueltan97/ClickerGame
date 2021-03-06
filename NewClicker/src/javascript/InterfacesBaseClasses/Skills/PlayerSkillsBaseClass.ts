﻿import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { EnemyValueUpdateEvent, PlayerValueUpdateEvent, UnitValueUpdateEvent } from "../ValueUpdateEvent";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { HeroActiveSkill } from "./HeroSkillsBaseClass";
import { SkillFactory } from "./PlayerSkill";
import { ISkillFactory } from "./ISkillFactory";
import { adjustValueToExponential } from "../../CSSAnimation/CSSAnimation";

export class PlayerActiveSkill implements IActiveSkill {
    public readonly name: string;
    public readonly id: number;
    SkillFactory: ISkillFactory;
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;
    startCounter: number;
    currentCounter: number;

    constructor(id: number, name: string, cooldown: number, playerSkillFactory: ISkillFactory) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
        this.level = 1;
        this.isUnlocked = false;
        this.SkillFactory = playerSkillFactory;
        this.startCounter = 1;
        this.currentCounter = 1;
    }

    get Level(): number {
        return this.level;
    }

    get IsUnlocked(): boolean {
        return this.isUnlocked;
    }

    get InCooldown(): boolean {
        return this.inCooldown;
    }

    get Cooldown(): number {
        return this.cooldown;
    }

    set Cooldown(multiplier: number) {
        this.cooldown = this.cooldown * multiplier;
    }

    UpdateTimeCounter = (counter: number): void => {
        this.currentCounter = counter;
        if (this.isUnlocked && this.InCooldown) {
            let counterDifference: number = this.currentCounter + 2 - this.startCounter;
            let timeDifference: number = counterDifference * 100 / 2;
            if (timeDifference % 100 == 0) {
                let newTime: string = (Math.max(0, (this.cooldown - timeDifference)) / 100).toString();
                let partOneFinalTime: string = (newTime.length > 1) ? newTime.Take(newTime.length - 1) : "0";
                let partTwoFinalTime: string = newTime.TakeLast(1);
                $("#" + this.name.replace(/\s+/g, '') + "-cooldown-counter").text(partOneFinalTime + "." + partTwoFinalTime);
                //DarkRitual's timer is an issue
            }
        } else {
            $("#" + this.name.replace(/\s+/g, '') + "-cooldown-counter").text(adjustValueToExponential(this.cooldown / 1000) + ".0");
        }
    }

    Unlock(): void {
        if (!this.isUnlocked) {
            this.isUnlocked = true;
            $("#" + this.name.replace(/\s+/g, '') + "-skill-block").fadeIn(100);
            alert("You have unlocked a new skill: " + this.name);
        }
    }

    CooldownCounter(currentCounter:number): void {
        let skill = this;
        skill.inCooldown = true;
        $("#" + this.name.replace(/\s+/g, '') + "-cooldown").css({ "opacity": 1 });
        $("#" + this.name.replace(/\s+/g, '') + "-cooldown-half-rotator-right").css({
            "transform": "rotate(180deg)",
            "transition": "transform " + (skill.cooldown / 2000) + "s",
            "transition-timing-function": "linear"
        });
        setTimeout(function () {
            $("#" + skill.name.replace(/\s+/g, '') + "-cooldown-half-rotator-left").css({
                "transform": "rotate(180deg)",
                "transition": "transform " + (skill.cooldown / 2000) + "s",
                "transition-timing-function": "linear"
            });
            setTimeout(function () {
                $("#" + skill.name.replace(/\s+/g, '') + "-cooldown-half-rotator-right").css({ "transform": "rotate(0deg)", "transition": "transform 0s" });
                $("#" + skill.name.replace(/\s+/g, '') + "-cooldown-half-rotator-left").css({ "transform": "rotate(0deg)", "transition": "transform 0s" });
                $("#" + skill.name.replace(/\s+/g, '') + "-cooldown").css({ "opacity": 0 });
                skill.inCooldown = false; 
            }, skill.cooldown / 2);
        }, skill.cooldown / 2);
    }

    CooldownTimerCountdown(timer: number, number: string): void {
        let skill = this;
        setTimeout(function () {
            $("#" + skill.name.replace(/\s+/g, '') + "-cooldown-counter").text(number);
        }, timer);
        //DarkRitual's timer is an issue
    }

    Action(input?: number): void {
        this.startCounter = this.currentCounter;
        this.CooldownCounter(this.currentCounter);
        this.UpdateTimeCounter(this.currentCounter);
    }

    LevelUp(): void {
        this.level += 1;
        $("#" + this.name.replace(/\s+/g, '') + "-lvl").text("Level " + this.level);
    }
}

export class Steal extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(2, "Steal", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.CurrentEnemyArr[0].ResourceArray.forEach(x => this.SkillFactory.Storage.ResourceArr[x].Increase(this.SkillFactory.Storage.CurrentStage.CurrentStage * this.Level));
        }
    }
}

export class Heist extends PlayerActiveSkill {

    private enemyDamageCounter: number;

    constructor(playerSkillFactory: ISkillFactory) {
        super(4, "Heist", 1000, playerSkillFactory);
        this.enemyDamageCounter = 0;
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let totalDamage: number = 0;
            this.SkillFactory.Storage.PureUnitArr.forEach(x=>totalDamage += (x.CurrentDamage * 20 / x.damageFrequency * 5));
            this.SkillFactory.Storage.HeroArr.forEach(x => totalDamage += (x.CurrentDamage * 5));
            totalDamage = Math.floor(totalDamage);
            this.SkillFactory.Storage.ResourceArr.forEach(x => x.Increase(totalDamage * this.Level));
            this.SkillFactory.Storage.ResourceArr[7].Increase(totalDamage * this.Level);
        }
    }
}

export class MoneyisPower extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(5, "Money is Power", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
       if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
           let multiplier: number = 100 * this.SkillFactory.Storage.ResourceArr[7].Count;
           this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = multiplier * this.Level;
            let skill = this;
           setTimeout(function () { skill.SkillFactory.Storage.CurrentPlayer.CurrentDamage = (1 / multiplier) / skill.Level; }, 500);
        }
    }
}

export class Ballad extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(6, "Ballad", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.PureUnitArr.forEach(x => x.CurrentDamage = 2 * this.Level);
            this.SkillFactory.Storage.HeroArr.forEach(x => x.CurrentDamage = 2 * this.Level);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.PureUnitArr.forEach(x => x.CurrentDamage = 0.5 / skill.Level);
                skill.SkillFactory.Storage.HeroArr.forEach(x => x.CurrentDamage = 0.5 / skill.Level);
            }, 500);
        }
    }
}

export class Solo extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(7, "Solo", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let multiplier: number = 100 * this.SkillFactory.Storage.CurrentPlayer.CurrentDamage;
            this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = multiplier * this.Level;
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.CurrentPlayer.CurrentDamage = 1 / multiplier / skill.Level;
            }, 500);
        }
    }
}

export class SongofCourage extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(9, "Song of Courage", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.PureUnitArr.forEach(x => x.MaxHP = 2 * this.Level);
            this.SkillFactory.Storage.PureUnitArr.forEach(x => x.CurrentHP = 2 * this.Level);
            this.SkillFactory.Storage.HeroArr.forEach(x => x.MaxHP = 2 * this.Level);
           this.SkillFactory.Storage.HeroArr.forEach(x => x.CurrentHP = 2 * this.Level);
            this.SkillFactory.HeroActiveSkill.forEach(x => x.Cooldown = 0.5 / this.Level);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.PureUnitArr.forEach(x => x.CurrentHP = 0.5 / skill.Level);
                skill.SkillFactory.Storage.PureUnitArr.forEach(x => x.MaxHP = 0.5 / skill.Level);
                skill.SkillFactory.Storage.HeroArr.forEach(x => x.CurrentHP = 0.5 / skill.Level);
                skill.SkillFactory.Storage.HeroArr.forEach(x => x.MaxHP = 0.5 / skill.Level);
                skill.SkillFactory.HeroActiveSkill.forEach(x => x.Cooldown = 2 * skill.Level);
            }, 500);
        }
    }
}

export class ChorusofDeath extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(10, "Chorus of Death", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown && !this.SkillFactory.Storage.CurrentEnemyArr[0].isBoss) {
            super.Action(input);
            this.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(this.SkillFactory.Storage.CurrentEnemyArr[0].MaxHP);
        }
    }
}

export class ImpactStab extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(11, "Impact Stab", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(this.SkillFactory.Storage.CurrentPlayer.CurrentDamage * 10 * this.Level);
        }
    }
}

export class Whirlwind extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(13, "Whirlwind", 3000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(this.SkillFactory.Storage.CurrentPlayer.CurrentDamage * 100 * this.Level);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.CurrentPlayer.CurrentDamage * 100 * skill.Level);
                setTimeout(function () {
                    skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.CurrentPlayer.CurrentDamage * 100 * skill.Level);
                }, 1000);
            }, 1000);
        }
    }
}

export class FinalBlow extends PlayerActiveSkill {

    private ClickCount: number;
    private MaxCount: number;

    constructor(playerSkillFactory: ISkillFactory) {
        super(15, "Final Blow", 1000, playerSkillFactory);
        this.ClickCount = this.SkillFactory.Storage.CurrentPlayer.ClickCount;
        this.MaxCount = 0;
    }

    UpdateSource = (e: PlayerValueUpdateEvent): void => {
        this.ClickCount = e.newClickCount;
        if (this.ClickCount == this.MaxCount) {
            this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = 1 / 1000 / this.Level;
        }
    }

    public Action(input?:number) {
        if (this.isUnlocked && !this.InCooldown && this.ClickCount >= this.MaxCount) {
            super.Action(input);
            this.MaxCount = this.ClickCount + 5;
            this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = 1000 * this.Level;
        }
    }
}

export class DarkRitual extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(16, "Dark Ritual", 315360000000, playerSkillFactory);
    }

    public Action() {
        //Needs to be filled in
        if (this.isUnlocked && !this.InCooldown) {
            super.Action();
        }
    }
}

export class Biohack extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(17, "Biohack", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.PureUnitArr.forEach(x => x.RegenerateMax());
        }
    }
}

export class CursedContract extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(18, "Cursed Contract", 1000, playerSkillFactory);
    }

    public Action(heroId:number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(heroId);
            this.SkillFactory.Storage.HeroArr[heroId].isRogue = true;
            this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = 6;
            this.SkillFactory.Storage.HeroArr[heroId].ReceiveDamage(this.SkillFactory.Storage.HeroArr[heroId].CurrentHP - 20);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.CurrentPlayer.CurrentDamage = 1/6;
            }, 500);
        }
    }
}

export class Recruit extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(0, "Recruit", 10000, playerSkillFactory);
    }

    public Action(heroId:number) {
        if (!this.InCooldown) {
            super.Action(heroId);
            this.SkillFactory.Storage.ResourceArr[0].Increase(1);
        }
    }
}

//
//
//
//
//
//
//
//
//
//

export class PlayerPassiveSkill implements IPassiveSkill {
    name: string;
    id: number;
    level: number;
    isUnlocked: boolean;
    SkillFactory: ISkillFactory

    constructor(id: number, name: string, playerSkillFactory: ISkillFactory) {
        this.name = name;
        this.id = id;
        this.level = 1;
        this.isUnlocked = false;
        this.SkillFactory = playerSkillFactory;
    }

    get Level(): number {
        return this.level;
    }

    get IsUnlocked(): boolean {
        return this.isUnlocked;
    }

    Unlock(): void {
        if (!this.isUnlocked) {
            this.isUnlocked = true;
            this.Action();
            $("#" + this.name.replace(/\s+/g, '') + "-skill-block").fadeIn(100);
            alert("You have unlocked a new skill: " + this.name);
        }
    }

    Action(): void {
    };

    LevelUp(): void {
        this.level += 1;
        $("#" + this.name.replace(/\s+/g, '') + "-lvl").text("Level " + this.level);
    };
}

export class Pickpocket extends PlayerPassiveSkill {

    isUsed: boolean;

    constructor(playerSkillFactory:ISkillFactory) {
        super(1, "Pickpocket", playerSkillFactory);
        this.isUsed = false;
    }

    DuplicateArray(array: number[]): number[]{
        return array.concat(array);
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            for (var i = 0; i < this.SkillFactory.Storage.EnemyArr.length; i++) {
                for (var j = 0; j < this.SkillFactory.Storage.EnemyArr[i].length; j++) {
                    this.SkillFactory.Storage.EnemyArr[i][j].ResourceArray = this.DuplicateArray(this.SkillFactory.Storage.EnemyArr[i][j].ResourceArray);
                }
            }
            this.isUsed = true;
        }
    }
}

export class CoinAffinity extends PlayerPassiveSkill {

    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(3, "Coin Affinity", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.CurrentPlayer.AddHurtUpdateEvents(this.SkillFactory.Storage.ResourceArr[7].Increase);
            this.isUsed = true;
        }
    }
}

export class MelodicAura extends PlayerPassiveSkill {

    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(8, "Melodic Aura", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.PureUnitArr.forEach(x=>x.MaxHP = 2);
            this.SkillFactory.Storage.PureUnitArr.forEach(x=>x.CurrentHP = 2);
            this.SkillFactory.Storage.HeroArr.forEach(x=>x.MaxHP = 2);
            this.SkillFactory.Storage.HeroArr.forEach(x=>x.CurrentHP = 2);
            this.isUsed = true;
        }
    }
}

export class Valor extends PlayerPassiveSkill {
    isUsed: boolean;
    currentMultiplier: number = 1;

    constructor(playerSkillFactory: ISkillFactory) {
        super(12, "Valor", playerSkillFactory);
        this.isUsed = false;
    }

    UpdateMultiplier = () => {
        let newUnitCount: number = this.SkillFactory.Storage.PureUnitArr[1].Count + this.SkillFactory.Storage.PureUnitArr[4].Count + this.SkillFactory.Storage.PureUnitArr[6].Count;
        this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = 1 / this.currentMultiplier;
        this.currentMultiplier = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Storage.CurrentPlayer.CurrentLevel * newUnitCount)));
        this.SkillFactory.Storage.CurrentPlayer.CurrentDamage = this.currentMultiplier;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.CurrentPlayer.AddValueUpdateEvent(this.UpdateMultiplier);
            this.SkillFactory.Storage.PureUnitArr[1].AddValueUpdateEvent(this.UpdateMultiplier);
            this.SkillFactory.Storage.PureUnitArr[4].AddValueUpdateEvent(this.UpdateMultiplier);
            this.SkillFactory.Storage.PureUnitArr[6].AddValueUpdateEvent(this.UpdateMultiplier);  
            this.UpdateMultiplier();
            this.isUsed = true;
        }        
    }
}

export class WarCry extends PlayerPassiveSkill {
    isUsed: boolean;
    currentMultiplier: number = 1;

    constructor(playerSkillFactory: ISkillFactory) {
        super(14, "War Cry", playerSkillFactory);
        this.isUsed = false;
   }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.CurrentPlayer.AddValueUpdateEvent(this.UpdateMultiplier);
            this.UpdateMultiplier();
            this.isUsed = true;
        }
    }

    UpdateMultiplier = () => {
        this.SkillFactory.Storage.PureUnitArr[1].CurrentDamage =  1/this.currentMultiplier;
        this.SkillFactory.Storage.PureUnitArr[4].CurrentDamage = 1 / this.currentMultiplier;
        this.SkillFactory.Storage.PureUnitArr[6].CurrentDamage = 1 / this.currentMultiplier;
        this.currentMultiplier = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Storage.CurrentPlayer.CurrentDamage)));
        this.SkillFactory.Storage.PureUnitArr[1].CurrentDamage = this.currentMultiplier;
        this.SkillFactory.Storage.PureUnitArr[4].CurrentDamage = this.currentMultiplier;
        this.SkillFactory.Storage.PureUnitArr[6].CurrentDamage = this.currentMultiplier;
    }
}