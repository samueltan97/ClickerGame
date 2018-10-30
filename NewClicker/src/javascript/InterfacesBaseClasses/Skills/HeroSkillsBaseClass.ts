import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";

export class HeroActiveSkill implements IActiveSkill {
    name: string;
    id: number;
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;

    constructor(id:number, name:string, cooldown:number) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
        this.level = 1;
        this.isUnlocked = false;
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

    LevelUp(): void { };
}

export class HeroPassiveSkill implements IPassiveSkill {

}