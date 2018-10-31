import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { EnemyValueUpdateEvent, PlayerValueUpdateEvent } from "../ValueUpdateEvent";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { HeroSkill } from "./HeroSkill";
import { HeroActiveSkill } from "./HeroSkillsBaseClass";

export class PlayerActiveSkill implements IActiveSkill {
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

    constructor(id: number, name: string, cooldown: number, player: IPlayer, stage:IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], enemy:Enemy[], heroActiveSkill: HeroActiveSkill[]) {
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

    Action(input:number): void {
        this.CooldownCounter();
    };

    LevelUp(): void {
        this.level++;
    };
}

export class Steal extends PlayerActiveSkill {

    private currentEnemyResource: number[];

    constructor(player: IPlayer, stage:IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(1, "Steal", 120000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
        this.currentEnemyResource = [];
    }

    UpdateSource = (e: EnemyValueUpdateEvent): void => {
        this.currentEnemyResource = e.newResourceArray;
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.currentEnemyResource.forEach(x => this.Resource[x].Increase(this.Stage.CurrentStage));
        }
    }
}

export class Heist extends PlayerActiveSkill {

    private enemyDamageCounter: number;

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(3, "Heist", 400000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
        this.enemyDamageCounter = 0;
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let totalDamage: number = 0;
            this.Unit.forEach(x => totalDamage += (x.CurrentDamage * 20 / x.damageFrequency * 5));
            this.Hero.forEach(x => totalDamage += (x.CurrentDamage * 5));
            this.Resource.forEach(x => x.Increase(totalDamage));
            this.Resource[7].Increase(totalDamage);
        }
    }
}

export class MoneyIsPower extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(4, "Money Is Power", 7200000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
       if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let multiplier: number = 100 * this.Resource[7].Count;
            this.Player.CurrentDamage = multiplier;
            let skill = this;
            setTimeout(function () { skill.Player.CurrentDamage = 1/multiplier; }, 5000);
        }
    }
}

export class Ballad extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(5, "Ballad", 120000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Unit.forEach(x => x.CurrentDamage = 2);
            this.Hero.forEach(x => x.CurrentDamage = 2);
            let skill = this;
            setTimeout(function () {
                skill.Unit.forEach(x => x.CurrentDamage = 0.5);
                skill.Hero.forEach(x => x.CurrentDamage = 0.5);
            }, 30000);
        }
    }
}

export class Solo extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(6, "Solo", 120000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let multiplier: number = 100 * this.Player.CurrentDamage;
            this.Player.CurrentDamage = multiplier;
            let skill = this;
            setTimeout(function () {
                skill.Player.CurrentDamage = 1/multiplier;
            }, 10000);
        }
    }
}

export class SongOfCourage extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(8, "Song of Courage", 600000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Unit.forEach(x => x.CurrentHP = 2);
            this.Unit.forEach(x => x.MaxHP = 2);
            this.Hero.forEach(x => x.CurrentHP = 2);
            this.Hero.forEach(x => x.MaxHP = 2);
            this.HeroActiveSkill.forEach(x => x.Cooldown = 0.5);
            let skill = this;
            setTimeout(function () {
                skill.Unit.forEach(x => x.CurrentHP = 0.5);
                skill.Unit.forEach(x => x.MaxHP = 0.5);
                skill.Hero.forEach(x => x.CurrentHP = 0.5);
                skill.Hero.forEach(x => x.MaxHP = 0.5);
                skill.HeroActiveSkill.forEach(x => x.Cooldown = 2);
            }, 30000);
        }
    }
}

export class ChorusOfDeath extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(9, "Chorus of Death", 50000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown && !this.Enemy[0].isBoss) {
            super.Action(input);
            this.Enemy[0].ReceiveDamage(this.Enemy[0].MaxHP);
        }
    }
}

export class ImpactStab extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(10, "Impact Stab", 20000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 10);
        }
    }
}

export class Whirlwind extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(12, "Whirlwind", 5000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
            setTimeout(function () {
                this.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
                setTimeout(function () {
                    this.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
                }, 1000);
            }, 1000);
        }
    }
}

export class FinalBlow extends PlayerActiveSkill {

    private ClickCount: number;
    private MaxCount: number;

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(14, "Final Blow", 100000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
        this.ClickCount = this.Player.ClickCount;
        this.MaxCount = this.Player.ClickCount + 5;
    }

    UpdateSource = (e: PlayerValueUpdateEvent): void => {
        this.ClickCount = e.newClickCount;
        if (this.ClickCount == this.MaxCount) {
            this.Player.CurrentDamage = 1 / 1000;
            this.inCooldown = false;
        }
    }

    public Action() {
        if (this.isUnlocked && !this.InCooldown) {
            this.inCooldown = true;
            this.MaxCount = this.ClickCount + 5;
            this.Player.CurrentDamage = 1000;
        }
    }
}

export class DarkRitual extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(15, "Dark Ritual", 315360000000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action() {
        //Needs to be filled in
    }
}

export class Biohack extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(16, "Biohack", 600000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.Unit.forEach(x => x.RegenerateMax());
        }
    }
}

export class CursedContract extends PlayerActiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[]) {
        super(17, "Cursed Contract", 120000, player, stage, resource, hero, unit, enemy, heroActiveSkill);
    }

    public Action(heroId:number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(heroId);
            this.Hero[heroId].ReceiveDamage(this.Hero[heroId].CurrentHP - 20);
            this.Player.CurrentDamage = 6;
            setTimeout(function () {
                this.Player.CurrentDamage = 1/6;
            }, 60000);
        }
    }
}

export class PlayerPassiveSkill implements IPassiveSkill{

}