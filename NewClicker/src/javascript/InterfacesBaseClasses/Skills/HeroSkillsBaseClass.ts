import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";

export class HeroActiveSkill implements IActiveSkill {
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    name: string;
    id: number;
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;

    constructor(id:number, name:string, cooldown:number, player:IPlayer, stage:IStageLevel, resource: Resource[], hero:Hero[], unit:Unit[], enemy: Enemy[]) {
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
        this.Unit = unit;
        this.Enemy = enemy;

    }

    get Level(): number {
        return this.level;
    }

    get Cooldown(): number {
        return this.cooldown;
    };

    set Cooldown(multiplier:number) {
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
        this.level++;
    };
}

export class HeroPassiveSkill implements IPassiveSkill {

}