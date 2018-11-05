import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { EnemyValueUpdateEvent, HeroValueUpdateEvent } from "../ValueUpdateEvent";
import { setTimeout, setInterval } from "timers";
import { ISkillFactory } from "./ISkillFactory";

export class HeroActiveSkill implements IActiveSkill {
    public readonly name: string;
    public readonly id: number;
    SkillFactory: ISkillFactory;
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;

    constructor(id: number, name: string, cooldown: number, heroSkillFactory: ISkillFactory) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
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

    get InCooldown(): boolean {
        return this.inCooldown;
    }

    get Cooldown(): number {
        return this.cooldown;
    }

    set Cooldown(multiplier: number) {
        this.cooldown = this.cooldown * multiplier;
    }

    Unlock(): void {
        this.isUnlocked = true;
    }

    CooldownCounter(): void {
        let skill = this;
        this.inCooldown = true;
        console.log(this.inCooldown);
        setTimeout(function () { skill.inCooldown = false; console.log("DUH", skill.inCooldown); }
            , this.cooldown);
    }

    Action(input: number): void {
        this.CooldownCounter();
    }

    LevelUp(): void {
        this.level += 1;
    }
}

export class Heal extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(19, "Heal", 120000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Hero.forEach(x=>x.Regenerate(15));
            this.SkillFactory.Hero.forEach(x=>x.Regenerate(15));
            this.SkillFactory.Hero.forEach(x=>x.Regenerate(15));
            this.SkillFactory.Hero.forEach(x=>x.Regenerate(15));
            this.SkillFactory.Hero.forEach(x=>x.Regenerate(15));
        }
    }
}

export class Purify extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(20, "Purify", 240000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Unit.forEach(x => x.RegenerateMax());
        }
    }
}

export class ArcaneShelter extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(22, "Arcane Shelter", 72000000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Unit.forEach(x => x.IsImmune = true);
            this.SkillFactory.Hero.forEach(x => x.IsImmune = true);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Unit.forEach(x => x.IsImmune = false);
                skill.SkillFactory.Hero.forEach(x => x.IsImmune = false);
            }, 20000);
        }
    }
}

export class StrafingRun extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(25, "Strafing Run", 240000, playerSkillFactory);
    }

    doTimeOut(count: number) {
        let skill = this;
        setTimeout(function () {
            skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[1].CurrentDamage);
        }, 100 * count);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            //Reference current enemy array to Enemy
            for (var i = 1; i < 51; i++) {
                this.doTimeOut(i);
            }          
        }
    }
}

export class Hurricane extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(32, "Hurricane", 72000000, playerSkillFactory);
    }

    doTimeOut(count: number) {
        let skill = this;
        setTimeout(function () {
            skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[2].CurrentDamage);
        }, 100 * count);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            //Reference current enemy array to Enemy
            for (var i = 1; i < 601; i++) {
                this.doTimeOut(i);
            }          
        }
    }
}

export class CrossCut extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(34, "Cross Cut", 10000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            this.SkillFactory.Enemy[0].ReceiveDamage(this.SkillFactory.Hero[3].CurrentDamage * 2/5);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[3].CurrentDamage * 2/5);
            }, 100);
        }
    }
}

export class LanceDance extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(35, "Lance Dance", 500000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            [this.SkillFactory.Unit[0], this.SkillFactory.Unit[3], this.SkillFactory.Unit[9]].forEach(x => x.CurrentDamage = 6);
            let skill = this;
           setTimeout(function () {
               [skill.SkillFactory.Unit[0], skill.SkillFactory.Unit[3], skill.SkillFactory.Unit[9]].forEach(x => x.CurrentDamage = 1/6);
            }, 10000);
        }
    }
}

export class UnlimitedLanceWork extends HeroActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(37, "Unlimited Lance Work", 72000000, playerSkillFactory);
    }
    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);     
            let count: number = this.SkillFactory.Unit[0].Count + this.SkillFactory.Unit[3].Count + this.SkillFactory.Unit[9].Count + 1;
            this.SkillFactory.Enemy[0].ReceiveDamage(this.SkillFactory.Hero[3].CurrentDamage * 10 * count);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[3].CurrentDamage * 10 * count);
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
        this.isUnlocked = true;
        this.Action();
    }

    Action(): void {
    };

    LevelUp(): void {
        this.level += 1;
    };
}

export class VitalContract extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(18, "Vital Contract", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Hero[0].AddValueUpdateEvent(this.UpdateCharles);
        }
    }

    UpdateCharles = (e: HeroValueUpdateEvent): void => {
        if (e.newHP < e.newMaxHP) {
            let skill = this;
           setTimeout(function () {
               skill.SkillFactory.Hero[0].RegenerateMax();
            }, 400); 
        }
    }
}

export class RecoveryMantra extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(21, "Recovery Mantra", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Hero.forEach(x=>x.RegeneratePercentage(5));
            }, 60000);
        }
    }
}

export class Bang extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(23, "Bang", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[1].CurrentDamage);
            }, 1000);
        }
    }
}

export class DoubleTap extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(24, "Double Tap", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[1].CurrentDamage);
            }, 1000);
        }
    }
}

export class Marksman extends HeroPassiveSkill {

    prevMultiplier: number = 1;

    constructor(playerSkillFactory: ISkillFactory) {
        super(26, "Marksman", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Hero[1].AddValueUpdateEvent(this.UpdateUnit);
            this.prevMultiplier = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Hero[1].CurrentDamage)));
            this.SkillFactory.Unit[5].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Hero[1].CurrentDamage)));
            this.SkillFactory.Unit[11].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Hero[1].CurrentDamage)));
        }
    }

    UpdateUnit = (e: HeroValueUpdateEvent): void => {
        this.SkillFactory.Unit[5].CurrentDamage = 1/this.prevMultiplier;
        this.SkillFactory.Unit[11].CurrentDamage = 1 / this.prevMultiplier;
        this.prevMultiplier = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Hero[1].CurrentDamage)));
        this.SkillFactory.Unit[5].CurrentDamage = this.prevMultiplier;
        this.SkillFactory.Unit[11].CurrentDamage = this.prevMultiplier;
    }
}

export class Matrix extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(27, "Matrix", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Unit[5].CanEvade = true;
            this.SkillFactory.Unit[11].CanEvade = true;
        }
    }
}

export class FocusShot extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(28, "Focus Shot", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[2].CurrentDamage);
            }, 1000);
        }
    }
}

export class TriangleFire extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(29, "Triangle Fire", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[2].CurrentDamage * 3);
            }, 1000);
        }
    }
}

export class AuraOfAccuracy extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(30, "Aura of Accuracy", playerSkillFactory);
    }

    Action () {
        if (this.isUnlocked) {
            this.SkillFactory.Unit[2].CurrentDamage = 2;
            this.SkillFactory.Unit[7].CurrentDamage = 2;
            this.SkillFactory.Unit[12].CurrentDamage = 2;
        }
    }
}

export class SuperiorPerception extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(31, "Superior Perception", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Hero[2].CurrentDamage = 1001;
        }
    }
}

export class Lance extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(33, "Lance", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(skill.SkillFactory.Hero[3].CurrentDamage);
            }, 1000);
        }
    }
}

export class IndraBlessing extends HeroPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(36, "Indra's Blessing", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Unit[0].MaxHP = 2;
            this.SkillFactory.Unit[9].MaxHP = 2;
            this.SkillFactory.Unit[3].MaxHP = 2;
            this.SkillFactory.Hero[3].MaxHP = 2;
            this.SkillFactory.Unit[0].CurrentHP = 2;
            this.SkillFactory.Unit[9].CurrentHP = 2;
            this.SkillFactory.Unit[3].CurrentHP = 2;
            this.SkillFactory.Hero[3].CurrentHP = 2;
        }
    }
}