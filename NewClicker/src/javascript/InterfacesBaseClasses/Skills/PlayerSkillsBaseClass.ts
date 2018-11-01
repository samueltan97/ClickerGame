import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { EnemyValueUpdateEvent, PlayerValueUpdateEvent, UnitValueUpdateEvent } from "../ValueUpdateEvent";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
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
        this.level += 1;
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
            let skill = this;
            setTimeout(function () {
                skill.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
                setTimeout(function () {
                    skill.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
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
            let skill = this;
            setTimeout(function () {
                skill.Player.CurrentDamage = 1/6;
            }, 60000);
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
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    AllEnemy: Enemy[][];
    HeroActiveSkill: HeroActiveSkill[];

    constructor(id: number, name: string, player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], enemy: Enemy[], allEnemy: Enemy[][], heroActiveSkill: HeroActiveSkill[]) {
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
        this.HeroActiveSkill = heroActiveSkill;
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
        this.level+=1;
    };
}

export class Pickpocket extends PlayerPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy:Enemy[][]) {
        super(0, "Pickpocket", player, stage, resource, hero, unit, enemy, allEnemy, heroActiveSkill);
    }

    Action() {
        if (this.isUnlocked) {
            this.AllEnemy.forEach(x => x.forEach(x => x.ResourceArray.concat(x.ResourceArray)));
        }
    }
}

export class CoinAffinity extends PlayerPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy:Enemy[][]) {
        super(2, "Coin Affinity", player, stage, resource, hero, unit, enemy, allEnemy, heroActiveSkill);
    }

    Action() {
        if (this.isUnlocked) {
            this.Player.AddHurtUpdateEvents(this.Resource[7].Increase);
        }
    }
}

export class MelodicAura extends PlayerPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy:Enemy[][]) {
        super(7, "Melodic Aura", player, stage, resource, hero, unit, enemy, allEnemy, heroActiveSkill);
    }

    Action() {
        if (this.isUnlocked) {
            this.Unit.forEach(x=>x.MaxHP = 2);
            this.Unit.forEach(x=>x.CurrentHP = 2);
            this.Hero.forEach(x=>x.CurrentHP = 2);
            this.Hero.forEach(x=>x.CurrentHP = 2);
        }
    }
}

export class Valor extends PlayerPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(11, "Valor", player, stage, resource, hero, unit, enemy, allEnemy, heroActiveSkill);
    }

    Action() {
        if (this.isUnlocked) {
            this.Player.AddValueUpdateEvent(this.UpdatePlayer);
            this.Unit[1].AddValueUpdateEvent(this.UpdateUnit);
            this.Unit[4].AddValueUpdateEvent(this.UpdateUnit);
            this.Unit[6].AddValueUpdateEvent(this.UpdateUnit);
            let newUnitCount: number = this.Unit[1].Count + this.Unit[4].Count + this.Unit[6].Count;
            this.Player.CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentLevel * newUnitCount)));
        }
    }

    UpdatePlayer = (e: PlayerValueUpdateEvent): void => {
        this.Player.CurrentLevel = e.newLevel;
        let newUnitCount: number = this.Unit[1].Count + this.Unit[4].Count + this.Unit[6].Count;
        this.Player.CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentLevel * newUnitCount)));
    }

    UpdateUnit = (e: UnitValueUpdateEvent): void => {
        switch (e.id) {
            case 1:
                this.Unit[1].Count = e.count;
                break;
            case 4:
                this.Unit[4].Count = e.count;
                break;
            case 6:
                this.Unit[6].Count = e.count;
                break;
        }
        let newUnitCount: number = this.Unit[1].Count + this.Unit[4].Count + this.Unit[6].Count;
        this.Player.CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentLevel * newUnitCount)));
    }
}

export class WarCry extends PlayerPassiveSkill {

    constructor(player: IPlayer, stage: IStageLevel, resource: Resource[], hero: Hero[], unit: Unit[], heroActiveSkill: HeroActiveSkill[], enemy: Enemy[], allEnemy: Enemy[][]) {
        super(13, "War Cry", player, stage, resource, hero, unit, enemy, allEnemy, heroActiveSkill);
    }

    Action() {
        if (this.isUnlocked) {
            this.Unit[1].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentDamage)));
            this.Unit[4].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentDamage)));
            this.Unit[6].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentDamage)));
            this.Player.AddValueUpdateEvent(this.UpdateUnit);
        }
    }

    UpdateUnit = (e: PlayerValueUpdateEvent): void => {
        this.Unit[1].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentDamage)));
        this.Unit[4].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentDamage)));
        this.Unit[6].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.Player.CurrentDamage)));
    }
}