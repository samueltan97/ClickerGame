import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { EnemyValueUpdateEvent, PlayerValueUpdateEvent, UnitValueUpdateEvent } from "../ValueUpdateEvent";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { HeroActiveSkill } from "./HeroSkillsBaseClass";
import { PlayerSkillFactory } from "./PlayerSkill";
import { ISkillFactory } from "./ISkillFactory";

export class PlayerActiveSkill implements IActiveSkill {
    public readonly name: string;
    public readonly id: number;
    SkillFactory: ISkillFactory;
    level: number;
    isUnlocked: boolean;
    inCooldown: boolean;
    cooldown: number;

    constructor(id: number, name: string, cooldown: number, playerSkillFactory: ISkillFactory) {
        this.name = name;
        this.id = id;
        this.cooldown = cooldown;
        this.inCooldown = false;
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
        let InCooldown = this.inCooldown;
        InCooldown = true;
        setTimeout(function () { InCooldown = false; }, this.cooldown);
    }

    Action(input:number): void {
        this.CooldownCounter();
    }

    LevelUp(): void {
        this.level += 1;
    }
}

export class Steal extends PlayerActiveSkill {

    private currentEnemyResource: number[];

    constructor(playerSkillFactory: ISkillFactory) {
        super(1, "Steal", 120000, playerSkillFactory);
        this.currentEnemyResource = [];
    }

    UpdateSource = (e: EnemyValueUpdateEvent): void => {
        this.currentEnemyResource = e.newResourceArray;
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.currentEnemyResource.forEach(x => this.SkillFactory.Resource[x].Increase(this.SkillFactory.Stage.CurrentStage));
        }
    }
}

export class Heist extends PlayerActiveSkill {

    private enemyDamageCounter: number;

    constructor(playerSkillFactory: ISkillFactory) {
        super(3, "Heist", 400000, playerSkillFactory);
        this.enemyDamageCounter = 0;
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let totalDamage: number = 0;
            this.SkillFactory.Unit.forEach(x => totalDamage += (x.CurrentDamage * 20 / x.damageFrequency * 5));
            this.SkillFactory.Hero.forEach(x => totalDamage += (x.CurrentDamage * 5));
            this.SkillFactory.Resource.forEach(x => x.Increase(totalDamage));
            this.SkillFactory.Resource[7].Increase(totalDamage);
        }
    }
}

export class MoneyIsPower extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(4, "Money Is Power", 7200000, playerSkillFactory);
    }

    public Action(input: number) {
       if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
           let multiplier: number = 100 * this.SkillFactory.Resource[7].Count;
           this.SkillFactory.Player.CurrentDamage = multiplier;
            let skill = this;
           setTimeout(function () { skill.SkillFactory.Player.CurrentDamage = 1/multiplier; }, 5000);
        }
    }
}

export class Ballad extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(5, "Ballad", 120000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Unit.forEach(x => x.CurrentDamage = 2);
            this.SkillFactory.Hero.forEach(x => x.CurrentDamage = 2);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Unit.forEach(x => x.CurrentDamage = 0.5);
                skill.SkillFactory.Hero.forEach(x => x.CurrentDamage = 0.5);
            }, 30000);
        }
    }
}

export class Solo extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(6, "Solo", 120000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            let multiplier: number = 100 * this.SkillFactory.Player.CurrentDamage;
            this.SkillFactory.Player.CurrentDamage = multiplier;
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Player.CurrentDamage = 1/multiplier;
            }, 10000);
        }
    }
}

export class SongOfCourage extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(8, "Song of Courage", 600000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Unit.forEach(x => x.CurrentHP = 2);
            this.SkillFactory.Unit.forEach(x => x.MaxHP = 2);
            this.SkillFactory.Hero.forEach(x => x.CurrentHP = 2);
            this.SkillFactory.Hero.forEach(x => x.MaxHP = 2);
            this.SkillFactory.HeroActiveSkill.forEach(x => x.Cooldown = 0.5);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Unit.forEach(x => x.CurrentHP = 0.5);
                skill.SkillFactory.Unit.forEach(x => x.MaxHP = 0.5);
                skill.SkillFactory.Hero.forEach(x => x.CurrentHP = 0.5);
                skill.SkillFactory.Hero.forEach(x => x.MaxHP = 0.5);
                skill.SkillFactory.HeroActiveSkill.forEach(x => x.Cooldown = 2);
            }, 30000);
        }
    }
}

export class ChorusOfDeath extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(9, "Chorus of Death", 50000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown && !this.SkillFactory.Enemy[0].isBoss) {
            super.Action(input);
            this.SkillFactory.Enemy[0].ReceiveDamage(this.SkillFactory.Enemy[0].MaxHP);
        }
    }
}

export class ImpactStab extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(10, "Impact Stab", 20000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Enemy[0].ReceiveDamage(this.SkillFactory.Player.CurrentDamage * 10);
        }
    }
}

export class Whirlwind extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(12, "Whirlwind", 5000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Enemy[0].ReceiveDamage(this.SkillFactory.Player.CurrentDamage * 100);
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
                setTimeout(function () {
                    skill.SkillFactory.Enemy[0].ReceiveDamage(this.Player.CurrentDamage * 100);
                }, 1000);
            }, 1000);
        }
    }
}

export class FinalBlow extends PlayerActiveSkill {

    private ClickCount: number;
    private MaxCount: number;

    constructor(playerSkillFactory: ISkillFactory) {
        super(14, "Final Blow", 100000, playerSkillFactory);
        this.ClickCount = this.SkillFactory.Player.ClickCount;
        this.MaxCount = this.SkillFactory.Player.ClickCount + 5;
    }

    UpdateSource = (e: PlayerValueUpdateEvent): void => {
        this.ClickCount = e.newClickCount;
        if (this.ClickCount == this.MaxCount) {
            this.SkillFactory.Player.CurrentDamage = 1 / 1000;
            this.inCooldown = false;
        }
    }

    public Action() {
        if (this.isUnlocked && !this.InCooldown) {
            this.inCooldown = true;
            this.MaxCount = this.ClickCount + 5;
            this.SkillFactory.Player.CurrentDamage = 1000;
        }
    }
}

export class DarkRitual extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(15, "Dark Ritual", 315360000000, playerSkillFactory);
    }

    public Action() {
        //Needs to be filled in
    }
}

export class Biohack extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(16, "Biohack", 600000, playerSkillFactory);
    }

    public Action(input: number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(input);
            this.SkillFactory.Unit.forEach(x => x.RegenerateMax());
        }
    }
}

export class CursedContract extends PlayerActiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(17, "Cursed Contract", 120000, playerSkillFactory);
    }

    public Action(heroId:number) {
        if (this.isUnlocked && !this.InCooldown) {
            super.Action(heroId);
            this.SkillFactory.Hero[heroId].ReceiveDamage(this.SkillFactory.Hero[heroId].CurrentHP - 20);
            this.SkillFactory.Player.CurrentDamage = 6;
            let skill = this;
            setTimeout(function () {
                skill.SkillFactory.Player.CurrentDamage = 1/6;
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

    constructor(playerSkillFactory:ISkillFactory) {
        super(0, "Pickpocket", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.AllEnemy.forEach(x => x.forEach(x => x.ResourceArray.concat(x.ResourceArray)));
        }
    }
}

export class CoinAffinity extends PlayerPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(2, "Coin Affinity", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Player.AddHurtUpdateEvents(this.SkillFactory.Resource[7].Increase);
        }
    }
}

export class MelodicAura extends PlayerPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(7, "Melodic Aura", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Unit.forEach(x=>x.MaxHP = 2);
            this.SkillFactory.Unit.forEach(x=>x.CurrentHP = 2);
            this.SkillFactory.Hero.forEach(x=>x.CurrentHP = 2);
            this.SkillFactory.Hero.forEach(x=>x.CurrentHP = 2);
        }
    }
}

export class Valor extends PlayerPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(11, "Valor", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Player.AddValueUpdateEvent(this.UpdatePlayer);
            this.SkillFactory.Unit[1].AddValueUpdateEvent(this.UpdateUnit);
            this.SkillFactory.Unit[4].AddValueUpdateEvent(this.UpdateUnit);
            this.SkillFactory.Unit[6].AddValueUpdateEvent(this.UpdateUnit);
            let newUnitCount: number = this.SkillFactory.Unit[1].Count + this.SkillFactory.Unit[4].Count + this.SkillFactory.Unit[6].Count;
            this.SkillFactory.Player.CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentLevel * newUnitCount)));
        }
    }

    UpdatePlayer = (e: PlayerValueUpdateEvent): void => {
        this.SkillFactory.Player.CurrentLevel = e.newLevel;
        let newUnitCount: number = this.SkillFactory.Unit[1].Count + this.SkillFactory.Unit[4].Count + this.SkillFactory.Unit[6].Count;
        this.SkillFactory.Player.CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentLevel * newUnitCount)));
    }

    UpdateUnit = (e: UnitValueUpdateEvent): void => {
        switch (e.id) {
            case 1:
                this.SkillFactory.Unit[1].Count = e.count;
                break;
            case 4:
                this.SkillFactory.Unit[4].Count = e.count;
                break;
            case 6:
                this.SkillFactory.Unit[6].Count = e.count;
                break;
        }
        let newUnitCount: number = this.SkillFactory.Unit[1].Count + this.SkillFactory.Unit[4].Count + this.SkillFactory.Unit[6].Count;
        this.SkillFactory.Player.CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentLevel * newUnitCount)));
    }
}

export class WarCry extends PlayerPassiveSkill {

    constructor(playerSkillFactory: ISkillFactory) {
        super(13, "War Cry", playerSkillFactory);
    }

    Action() {
        if (this.isUnlocked) {
            this.SkillFactory.Unit[1].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentDamage)));
            this.SkillFactory.Unit[4].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentDamage)));
            this.SkillFactory.Unit[6].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentDamage)));
            this.SkillFactory.Player.AddValueUpdateEvent(this.UpdateUnit);
        }
    }

    UpdateUnit = (e: PlayerValueUpdateEvent): void => {
        this.SkillFactory.Unit[1].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentDamage)));
        this.SkillFactory.Unit[4].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentDamage)));
        this.SkillFactory.Unit[6].CurrentDamage = Math.max(1, Math.floor(Math.sqrt(this.SkillFactory.Player.CurrentDamage)));
    }
}