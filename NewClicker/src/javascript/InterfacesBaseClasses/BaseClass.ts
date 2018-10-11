import { IMortality } from "./IMortality";
import { ICombative } from "./ICombative";
import { IFeedbackLoop } from "./IFeedbackLoop";
import { IExistence } from "./IExistence";
import { IRegeneration } from "./IRegeneration";
import $ from "jquery";
import { IRepository } from "./IRepository";
import { IStageLevel } from "./IStageLevel";
import { IPlayer } from "./IPlayer";
import { adjustBarAnimation } from "../CSSAnimation/CSSAnimation";
import { ICountable } from "./ICountable";

export class Enemy implements IMortality, ICombative, IFeedbackLoop, IRegeneration {

    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;
    private readonly stage;
    public isDead: boolean;

    constructor(baseHP: number, baseDamage: number, stage: IStageLevel) {
        this.baseHP = baseHP;
        this.stage = stage;
        this.maxHP = this.baseHP * stage.CurrentLevel;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.isDead = false;
        this.currentDamage = this.baseDamage * stage.CurrentLevel;
    }

    UpdateFeedback(counter: number):number {
        if (counter % 20) {
            this.Regenerate(10 * this.stage.CurrentLevel); //Placeholder value for regeneration algorithm. Might want to consider designating a regen per sec field for each unit
            return this.Hurt();
        }
        return 0;
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * this.stage.CurrentLevel; //Placeholder algorithm for maxhp value
        return this.maxHP;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        this.currentDamage = this.baseDamage * this.stage.CurrentLevel
        return this.currentDamage; //Placeholder algorithm for damage value
    }

    ReceiveDamage(damage: number): void {
        this.currentHP -= damage;
        this.currentHP = Math.max(this.currentHP, 0);
        adjustBarAnimation("monster-hp", (this.CurrentHP / this.MaxHP));
        if (this.currentHP == 0) {
            this.Die();
        }
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        this.Regenerate(this.MaxHP);
    }

    Die(): void {
        this.isDead = true;
    }

    Hurt(): number {
        return this.CurrentDamage;
    }

    Regenerate(health: number) {
        this.currentHP += health;
        this.currentHP = Math.min(this.CurrentHP, this.MaxHP);
        adjustBarAnimation("monster-hp", (this.CurrentHP / this.MaxHP));
    }
}

export class Unit implements IMortality, ICombative, IFeedbackLoop, IExistence, IRegeneration, ICountable {

    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;
    private readonly range: number;
    private count: number;
    private isUnlocked: boolean;
    public isDead: boolean;
    private readonly player;


    constructor(id: number, image: string, name: string, baseHP: number, baseDamage: number, range: number, count:number, player:IPlayer) {
        this.id = id;
        this.player = player;
        this.image = image;
        this.name = name;
        this.baseHP = baseHP;
        this.maxHP = this.baseHP * player.CurrentArmyVitality;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.currentDamage = this.baseDamage * player.CurrentArmyVitality;
        this.range = range;
        this.count = 0;
        this.isUnlocked = false;
        this.isDead = false;
        this.count = count;
    }

    UpdateFeedback(counter: number):number {
        if (counter % 20) {
            this.Regenerate(10 * this.player.ArmyVitality); //Placeholder value for regeneration algorithm. Might want to consider designating a regen per sec field for each unit
            return this.Hurt();
        }
        return 0;
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * this.player.ArmyVitality //Placeholder algorithm for maxhp value
        return this.maxHP;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        this.currentDamage = this.baseDamage * this.player.ArmyVitality * this.Count; //Placeholder algorithm for damage value
        return this.currentDamage;
    }

    get Count(): number {
        return this.count;
    }

    ReceiveDamage(damage: number): void {
        this.currentHP -= damage;
        this.currentHP = Math.max(this.currentHP, 0);
        adjustBarAnimation("fighter-hp", (this.CurrentHP / this.MaxHP));
        if (this.currentHP == 0) {
            this.Die();
            this.Unexist(1);
        }
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
    }

    Exist(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
    }

    Unexist(count: number): void {
        this.count -= count;
        this.count = Math.max(this.count, 0);
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        this.Regenerate(this.MaxHP);
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        this.isDead = true;
    }

    Hurt(): number {
        return this.CurrentDamage;
    }

    Regenerate(health: number) {
        this.currentHP += health;
        this.currentHP = Math.min(this.MaxHP, this.CurrentHP);
        adjustBarAnimation("fighter-hp", (this.CurrentHP / this.MaxHP));
    }
}