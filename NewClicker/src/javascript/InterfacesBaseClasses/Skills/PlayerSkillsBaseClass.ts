import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { EnemyValueUpdateEvent } from "../ValueUpdateEvent";
import { Player } from "../Player";
import { Resource, Hero, Unit } from "../BaseClass";
import { StageLevel } from "../StageLevel";

export class PlayerActiveSkill implements IActiveSkill {
    public readonly name: string;
    public readonly id: number;
    player: Player;
    stage: StageLevel;
    resource: Resource[];
    hero: Hero[];
    unit: Unit[];
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;

    constructor(id: number, name: string, cooldown: number, player: Player, stage:StageLevel, resource: Resource[], hero: Hero[], unit: Unit[]) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
        this.level = 1;
        this.isUnlocked = false;
        this.player = player;
        this.stage = stage;
        this.resource = resource;
        this.hero = hero;
        this.unit = unit;
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

    Unlock(): void {
        this.isUnlocked = true;
    }

    CooldownCounter(): void {
        let InCooldown = this.inCooldown;
        InCooldown = true;
        setTimeout(function () { InCooldown = false; }, this.cooldown);
    };

    Action(): void {
        this.CooldownCounter();
    };

    LevelUp(): void {
        this.level++;
    };
}

export class Steal extends PlayerActiveSkill {

    private currentEnemyResource: number[];

    constructor(player: Player, stage:StageLevel, resource: Resource[], hero: Hero[], unit: Unit[]) {
        super(1, "Steal", 120000, player, stage, resource, hero, unit);
        this.currentEnemyResource = [];
    }

    UpdateSource = (e: EnemyValueUpdateEvent): void => {
        this.currentEnemyResource = e.newResourceArray;
    }

    public Action() {
        if (this.isUnlocked) {
            super.Action();
            this.currentEnemyResource.forEach(x => this.resource[x].Increase(this.stage.CurrentStage));
        }
    }
}

export class Heist extends PlayerActiveSkill {

    private enemyDamageCounter: number;

    constructor(player: Player, stage: StageLevel, resource: Resource[], hero: Hero[], unit: Unit[]) {
        super(3, "Heist", 400000, player, stage, resource, hero, unit);
        this.enemyDamageCounter = 0;
    }

    public Action() {
        if (this.isUnlocked) {
            super.Action();
            let totalDamage: number = 0;
            this.unit.forEach(x => totalDamage += (x.CurrentDamage * 20 / x.damageFrequency * 5));
            this.hero.forEach(x => totalDamage += (x.CurrentDamage * 5));
            totalDamage += (this.player.CurrentDPS * 5);
            this.resource.forEach(x => x.Increase(totalDamage));
            this.resource[7].Increase(totalDamage);
        }
    }
}

export class MoneyIsPower extends PlayerActiveSkill {

    constructor(player: Player, stage: StageLevel, resource: Resource[], hero: Hero[], unit: Unit[]) {
        super(4, "Money Is Power", 7200000, player, stage, resource, hero, unit);
    }

   public Action() {
        if (this.isUnlocked) {
            super.Action();
            this.player.CurrentDamage = 100 * this.resource[7].Count;
            setTimeout(function () { this.player.CurrentDamage = 1; }, 5000);
        }
    }
}

export class Ballad extends PlayerActiveSkill {

    constructor(player: Player, stage: StageLevel, resource: Resource[], hero: Hero[], unit: Unit[]) {
        super(5, "Ballad", 120000, player, stage, resource, hero, unit);
    }

    public Action() {
        if (this.isUnlocked) {
            super.Action();
            this.player.CurrentDamage = 100 * this.resource[7].Count;
            setTimeout(function () { this.player.CurrentDamage = 1; }, 5000);
        }
    }
}

export class PlayerPassiveSkill implements IPassiveSkill{

}