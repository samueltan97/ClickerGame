import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { EnemyValueUpdateEvent, HeroValueUpdateEvent } from "../ValueUpdateEvent";
import { setTimeout, setInterval } from "timers";

export class HeroActiveSkill implements IActiveSkill {
    public readonly name: string;
    public readonly id: number;
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    HeroActiveSkill: HeroActiveSkill[];
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;

    constructor(id: number, name: string, cooldown: number, player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], enemy: Enemy[], heroActiveSkill: HeroActiveSkill[]) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
        this.level = 1;
        this.isUnlocked = false;
        this.Player = player;
        this.Stage = stage;
        this.Resource = resource;
        this.Hero = hero;
        this.Enemy = enemy;
        this.Unit = unit;
        this.HeroActiveSkill = heroActiveSkill;
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
    };

    set Cooldown(multiplier: number) {
        this.cooldown = this.cooldown * multiplier;
    };

    Unlock(): void {
        this.isUnlocked = true;
    }

    CooldownCounter(): void {
        let InCooldown = this.inCooldown;
        InCooldown = true;
        setTimeout(function () { InCooldown = false; }, this.cooldown);
    };

    Action(input: number): void {
        this.CooldownCounter();
    };

    LevelUp(): void {
        this.level+=1;
    };
}

export class Heal extends HeroActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(19, "Heal", 120000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Hero.forEach(x=>x.Regenerate(15));
            this.Hero.forEach(x=>x.Regenerate(15));
            this.Hero.forEach(x=>x.Regenerate(15));
            this.Hero.forEach(x=>x.Regenerate(15));
            this.Hero.forEach(x=>x.Regenerate(15));
        }
    }
}

export class Purify extends HeroActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(20, "Purify", 240000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Unit.forEach(x => x.RegenerateMax());
        }
    }
}

export class ArcaneShelter extends HeroActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(22, "Arcane Shelter", 72000000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Unit.forEach(x => x.IsImmune = true);
            this.Hero.forEach(x => x.IsImmune = true);
            let skill = this;
            setTimeout(function () {
                skill.Unit.forEach(x => x.IsImmune = false);
                skill.Hero.forEach(x => x.IsImmune = false);
            }, 20000);
        }
    }
}

export class StrafingRun extends HeroActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(25, "Strafing Run", 240000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    doTimeOut(count: number) {
        let skill = this;
        setTimeout(function () {
            skill.Enemy[0].ReceiveDamage(this.Hero[1].CurrentDamage);
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

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(32, "Hurricane", 72000000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    doTimeOut(count: number) {
        let skill = this;
        setTimeout(function () {
            skill.Enemy[0].ReceiveDamage(this.Hero[1].CurrentDamage);
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

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(34, "Cross Cut", 10000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            this.Enemy[0].ReceiveDamage(this.Hero[3].CurrentDamage * 2);
            let skill = this;
            setTimeout(function () {
                skill.Enemy[0].ReceiveDamage(this.Hero[3].CurrentDamage * 2);
            }, 100);
        }
    }
}

export class LanceDance extends HeroActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(35, "Lance Dance", 500000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);           
            [this.Unit[0], this.Unit[3], this.Unit[9]].forEach(x => x.CurrentDamage = 6);
            let skill = this;
           setTimeout(function () {
               [skill.Unit[0], skill.Unit[3], skill.Unit[9]].forEach(x => x.CurrentDamage = 1/6);
            }, 10000);
        }
    }
}

export class UnlimitedLanceWork extends HeroActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(37, "Unlimited Lance Work", 72000000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);     
            let count: number = this.Unit[0].Count + this.Unit[3].Count + this.Unit[9].Count + 1;
            this.Enemy[0].ReceiveDamage(this.Hero[3].CurrentDamage * 10 * count);
            let skill = this;
            setTimeout(function () {
                skill.Enemy[0].ReceiveDamage(skill.Hero[3].CurrentDamage * 10 * count);
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
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    AllEnemy: Enemy[][];

    constructor(id: number, name: string, player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], enemy: Enemy[], allEnemy: Enemy[][]) {
        this.name = name;
        this.id = id;
        this.level = 1;
        this.isUnlocked = false;
        this.Player = player;
        this.Stage = stage;
        this.Resource = resource;
        this.Hero = hero;
        this.Enemy = enemy;
        this.Unit = unit;
        this.AllEnemy = allEnemy;
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

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(18, "Vital Contract", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            this.Hero[0].AddValueUpdateEvent(this.UpdateCharles);
        }
    }

    UpdateCharles(e: HeroValueUpdateEvent): void {
        if (e.newHP < e.newMaxHP) {
            let skill = this;
           setTimeout(function () {
               skill.Hero[0].RegenerateMax();
            }, 400); 
        }
    }
}

export class RecoveryMantra extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(21, "Recovery Mantra", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.Hero.forEach(x=>x.RegeneratePercentage(5));
            }, 60000);
        }
    }
}

export class Bang extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(23, "Bang", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.Enemy[0].ReceiveDamage(skill.Hero[1].CurrentDamage);
            }, 1000);
        }
    }
}

export class DoubleTap extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(24, "Double Tap", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.Enemy[0].ReceiveDamage(skill.Hero[1].CurrentDamage);
            }, 1000);
        }
    }
}

export class Marksman extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(26, "Marksman", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            this.Hero[1].AddValueUpdateEvent(this.UpdateUnit);
        }
    }

    UpdateUnit(e: HeroValueUpdateEvent): void {
        this.Unit[5].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Hero[1].CurrentDamage)));
        this.Unit[12].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Hero[1].CurrentDamage)));
    }
}

export class Matrix extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(27, "Matrix", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            this.Unit[5].CanEvade = true;
            this.Unit[12].CanEvade = true;
        }
    }
}

export class FocusShot extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(28, "Focus Shot", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.Enemy[0].ReceiveDamage(skill.Hero[2].CurrentDamage);
            }, 1000);
        }
    }
}

export class TriangleFire extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(29, "Triangle Fire", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.Enemy[0].ReceiveDamage(skill.Hero[2].CurrentDamage * 3);
            }, 10000);
        }
    }
}

export class AuraOfAccuracy extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(30, "Aura of Accuracy", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            this.Unit[2].CurrentDamage = 2;
            this.Unit[7].CurrentDamage = 2;
            this.Unit[13].CurrentDamage = 2;
        }
    }
}

export class SuperiorPerception extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(31, "Superior Perception", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            this.Hero[2].CurrentDamage = 1001;
        }
    }
}

export class Lance extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(33, "Lance", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            let skill = this;
            setInterval(function () {
                skill.Enemy[0].ReceiveDamage(skill.Hero[3].CurrentDamage);
            }, 1000);
        }
    }
}

export class IndraBlessing extends HeroPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(36, "Indra's Blessing", player, stage, resource, hero, unit, enemy, allEnemy);
    }

    Action() {
        if (this.isUnlocked) {
            this.Unit[0].MaxHP = 2;
            this.Unit[9].MaxHP = 2;
            this.Unit[3].MaxHP = 2;
            this.Hero[3].MaxHP = 2;
            this.Unit[0].CurrentHP = 2;
            this.Unit[9].CurrentHP = 2;
            this.Unit[3].CurrentHP = 2;
            this.Hero[3].CurrentHP = 2;
        }
    }
}