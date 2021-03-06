﻿import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { EnemyValueUpdateEvent, HeroValueUpdateEvent } from "../ValueUpdateEvent";
import { setTimeout, setInterval } from "timers";
import { ISkillFactory } from "./ISkillFactory";
import { adjustValueToExponential } from "../../CSSAnimation/CSSAnimation";

export class HeroActiveSkill implements IActiveSkill {
    public readonly name: string;
    public readonly id: number;
    SkillFactory: ISkillFactory;
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;
    startCounter: number;
    currentCounter: number;

    constructor(id: number, name: string, cooldown: number, heroSkillFactory: ISkillFactory) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
        this.level = 1;
        this.isUnlocked = false;
        this.SkillFactory = heroSkillFactory;
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
        $("#" + this.name.replace(/\s+/g, '') + "-normal").fadeIn(100);
            alert("Unlocked a new skill: " + this.name);
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

    Action(input?: number): void {
        this.startCounter = this.currentCounter;
        this.CooldownCounter(this.currentCounter);
        this.UpdateTimeCounter(this.currentCounter);
    }

    LevelUp(): void {
        this.level += 1;
    }
}

export class Heal extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(20, "Heal", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.HeroArr.forEach(x => x.Regenerate(15 * this.SkillFactory.Storage.HeroArr[0].CurrentLevel));
            this.SkillFactory.Storage.HeroArr.forEach(x => x.Regenerate(15 * this.SkillFactory.Storage.HeroArr[0].CurrentLevel));
            this.SkillFactory.Storage.HeroArr.forEach(x => x.Regenerate(15 * this.SkillFactory.Storage.HeroArr[0].CurrentLevel));
            this.SkillFactory.Storage.HeroArr.forEach(x => x.Regenerate(15 * this.SkillFactory.Storage.HeroArr[0].CurrentLevel));
            this.SkillFactory.Storage.HeroArr.forEach(x => x.Regenerate(15 * this.SkillFactory.Storage.HeroArr[0].CurrentLevel));
        }
    }
}

export class Purify extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(21, "Purify", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.PureUnitArr.forEach(x => x.RegenerateMax());
        }
    }
}

export class ArcaneShelter extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(23, "Arcane Shelter", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Storage.PureUnitArr.forEach(x => x.IsImmune = true);
            this.SkillFactory.Storage.HeroArr.forEach(x => x.IsImmune = true);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.PureUnitArr.forEach(x => x.IsImmune = false);
                skill.SkillFactory.Storage.HeroArr.forEach(x => x.IsImmune = false);
            }, 500 * Math.max(1, this.SkillFactory.Storage.HeroArr[0].CurrentLevel / 1000));
        }
    }
}

export class StrafingRun extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(26, "Strafing Run", 10000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            //Reference current enemy array to Enemy
            let skill = this;
            skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage * skill.SkillFactory.Storage.HeroArr[1].CurrentLevel * 10);
            skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage * skill.SkillFactory.Storage.HeroArr[1].CurrentLevel * 10);
            skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage * skill.SkillFactory.Storage.HeroArr[1].CurrentLevel * 10);
            skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage * skill.SkillFactory.Storage.HeroArr[1].CurrentLevel * 10);
            skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage * skill.SkillFactory.Storage.HeroArr[1].CurrentLevel * 10);
        }
    }
}

export class Hurricane extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(33, "Hurricane", 10000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            //Reference current enemy array to Enemy
            for (var i = 0; i < 10; i++) {
                this.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(60*this.SkillFactory.Storage.HeroArr[2].CurrentDamage * this.SkillFactory.Storage.HeroArr[2].CurrentLevel);
            }
        }
    }
}

export class CrossCut extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(35, "Cross Cut", 10000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            this.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(this.SkillFactory.Storage.HeroArr[3].CurrentDamage * 2 / 5 * this.SkillFactory.Storage.HeroArr[3].CurrentLevel);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[3].CurrentDamage * 2 / 5 * skill.SkillFactory.Storage.HeroArr[3].CurrentLevel);
            }, 100);
        }
    }
}

export class LanceDance extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(36, "Lance Dance", 1000, playerSkillFactory);
    }

    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            [this.SkillFactory.Storage.PureUnitArr[0], this.SkillFactory.Storage.PureUnitArr[3], this.SkillFactory.Storage.PureUnitArr[9]].forEach(x => x.CurrentDamage = 6 * this.SkillFactory.Storage.HeroArr[3].CurrentLevel);
            let skill = this;
           setTimeout(function () {
               [skill.SkillFactory.Storage.PureUnitArr[0], skill.SkillFactory.Storage.PureUnitArr[3], skill.SkillFactory.Storage.PureUnitArr[9]].forEach(x => x.CurrentDamage = 1 / 6 / skill.SkillFactory.Storage.HeroArr[3].CurrentLevel);
            }, 500);
        }
    }
}

export class UnlimitedLanceWork extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(38, "Unlimited Lance Work", 1000, playerSkillFactory);
    }
    public Action(input?: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);     
            let count: number = this.SkillFactory.Storage.PureUnitArr[0].Count + this.SkillFactory.Storage.PureUnitArr[3].Count + this.SkillFactory.Storage.PureUnitArr[9].Count + 1;
            this.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(this.SkillFactory.Storage.HeroArr[3].CurrentDamage * 10 * count * this.SkillFactory.Storage.HeroArr[3].CurrentLevel);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[3].CurrentDamage * 10 * count * skill.SkillFactory.Storage.HeroArr[3].CurrentLevel);
            }, 500);
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

export class HeroPassiveSkill implements IPassiveSkill {
    name: string;
    id: number;
    level: number;
    isUnlocked: boolean;
    SkillFactory:ISkillFactory

    constructor(id: number, name: string, heroSkillFactory: ISkillFactory) {
        this.name = name;
        this.id = id;
        this.level = 1;
        this.isUnlocked = false;
        this.SkillFactory = heroSkillFactory;
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
            let id: string = (this.id != 37) ? this.name.replace(/\s+/g, '') : "IndraBlessing";
            $("#" + id + "-normal").fadeIn(100);
            alert("Unlocked a new skill: " + this.name);
            this.Action();
        }
    }

    Action(): void {
    };

    LevelUp(): void {
        this.level += 1;
    };
}

export class VitalContract extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(19, "Vital Contract", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.HeroArr[0].AddValueUpdateEvent(this.UpdateCharles);
            this.isUsed = true;
        }
    }

    UpdateCharles = (e: HeroValueUpdateEvent): void => {
        if (e.newHP < e.newMaxHP) {
            let skill = this;
           setTimeout(function () {
               skill.SkillFactory.Storage.HeroArr[0].RegenerateMax();
            }, 200); 
        }
    }
}

export class RecoveryMantra extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(22, "Recovery Mantra", playerSkillFactory);
        this.isUsed = false;
   }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Storage.HeroArr.forEach(x=>x.RegeneratePercentage(5 * skill.SkillFactory.Storage.HeroArr[0].CurrentLevel));
            }, 1000);
            this.isUsed = true;
       }
    }
}

export class Bang extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(24, "Bang", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage);
            }, 1000);
            this.isUsed = true;
        }
    }
}

export class DoubleTap extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(25, "Double Tap", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[1].CurrentDamage);
            }, 1000);
            this.isUsed = true;
        }
    }
}

export class Marksman extends HeroPassiveSkill {
    isUsed: boolean;

    prevMultiplier: number = 1;

    constructor(playerSkillFactory: ISkillFactory) {
        super(27, "Marksman", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.HeroArr[1].AddValueUpdateEvent(this.UpdateUnit);
            this.UpdateUnit();
            this.isUsed = true;
        }
    }

    UpdateUnit = (): void => {
        this.SkillFactory.Storage.PureUnitArr[5].CurrentDamage = 1/this.prevMultiplier;
        this.SkillFactory.Storage.PureUnitArr[11].CurrentDamage = 1 / this.prevMultiplier;
        this.prevMultiplier = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Storage.HeroArr[1].CurrentDamage)));
        this.SkillFactory.Storage.PureUnitArr[5].CurrentDamage = this.prevMultiplier;
        this.SkillFactory.Storage.PureUnitArr[11].CurrentDamage = this.prevMultiplier;
    }
}

export class Matrix extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(28, "Matrix", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.PureUnitArr[5].CanEvade = true;
            this.SkillFactory.Storage.PureUnitArr[11].CanEvade = true;
            this.isUsed = true;
        }
    }
}

export class FocusShot extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(29, "Focus Shot", playerSkillFactory);
        this.isUsed = false;
   }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[2].CurrentDamage);
            }, 1500);
            this.isUsed = true;
        }
    }
}

export class TriangleFire extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(30, "Triangle Fire", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[2].CurrentDamage * 3);
            }, 1500);
            this.isUsed = true;
       }
    }
}

export class AuraofAccuracy extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(31, "Aura Of Accuracy", playerSkillFactory);
        this.isUsed = false;
    }

    Action () {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.PureUnitArr[2].CurrentDamage = 2;
            this.SkillFactory.Storage.PureUnitArr[7].CurrentDamage = 2;
            this.SkillFactory.Storage.PureUnitArr[12].CurrentDamage = 2;
            this.isUsed = true;
        }
    }
}

export class SuperiorPerception extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(32, "Superior Perception", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.HeroArr[2].CurrentDamage = 1001;
            this.isUsed = true;
       }
    }
}

export class Lance extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(34, "Lance", playerSkillFactory);
        this.isUsed = false;
   }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Storage.CurrentEnemyArr[0].ReceiveDamage(skill.SkillFactory.Storage.HeroArr[3].CurrentDamage);
            }, 2000);
            this.isUsed = true;
        }
    }
}

export class IndraBlessing extends HeroPassiveSkill {
    isUsed: boolean;

    constructor(playerSkillFactory: ISkillFactory) {
        super(37, "Indra's Blessing", playerSkillFactory);
        this.isUsed = false;
    }

    Action() {
        if (this.isUnlocked && !this.isUsed) {
            this.SkillFactory.Storage.PureUnitArr[0].MaxHP = 2;
            this.SkillFactory.Storage.PureUnitArr[9].MaxHP = 2;
            this.SkillFactory.Storage.PureUnitArr[3].MaxHP = 2;
            this.SkillFactory.Storage.HeroArr[3].MaxHP = 2;
            this.SkillFactory.Storage.PureUnitArr[0].CurrentHP = 2;
            this.SkillFactory.Storage.PureUnitArr[9].CurrentHP = 2;
            this.SkillFactory.Storage.PureUnitArr[3].CurrentHP = 2;
            this.SkillFactory.Storage.HeroArr[3].CurrentHP = 2;
            this.isUsed = true;
        }
    }
}