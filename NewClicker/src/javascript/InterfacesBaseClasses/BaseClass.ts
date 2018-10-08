import { IMortality } from "./IMortality";
import { ICombative } from "./ICombative";
import { IFeedbackLoop } from "./IFeedbackLoop";
import { IExistence } from "./IExistence";
import { IRegeneration } from "./IRegeneration";
import { IRepository } from "../InterfacesBaseClasses/IRepository";
import $ from "jquery";

export class Enemy implements IMortality, ICombative, IFeedbackLoop, IRegeneration {

    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;
    protected repository: IRepository; 

    constructor(baseHP: number, baseDamage: number, repository:IRepository) {
        this.baseHP = baseHP;
        this.maxHP = this.baseHP * repository.database.theStage.Level;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.currentDamage = this.baseDamage * repository.database.theStage.Level;
        this.repository = repository;
    }

    UpdateFeedback(counter: number) {
        if (counter % 20) {
            this.Hurt();
            this.Regenerate(10 * this.repository.database.theStage.Level); //Placeholder value for regeneration algorithm. Might want to consider designating a regen per sec field for each unit
        }
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * this.repository.database.theStage.Level; //Placeholder algorithm for maxhp value
        return this.maxHP;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        this.currentDamage = this.baseDamage * this.repository.database.theStage.Level
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
        adjustBarAnimation("monster-hp", this.MaxHP);
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        this.repository.RemoveByDeath("Enemy");
    }

    Hurt(): void {
        this.repository.GetCurrentUnit().ReceiveDamage(this.CurrentDamage);
    }

    Regenerate(health: number) {
        this.currentHP += health;
        this.currentHP = Math.min(this.CurrentHP, this.MaxHP);
        adjustBarAnimation("monster-hp", (this.CurrentHP / this.MaxHP));
    }
}

export class Unit implements IMortality, ICombative, IFeedbackLoop, IExistence, IRegeneration {

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
    protected repository: IRepository;


    constructor(id: number, image: string, name: string, baseHP: number, baseDamage: number, range: number, repository:IRepository) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.baseHP = baseHP;
        this.repository = repository;
        this.maxHP = this.baseHP * this.repository.database.thePlayer.ArmyVitality;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.currentDamage = this.baseDamage * this.repository.database.thePlayer.ArmyVitality;
        this.range = range;
        this.count = 0;
        this.isUnlocked = false;
        this.repository = repository;
    }

    UpdateFeedback(counter: number) {
        if (counter % 20) {
            this.Hurt();
            this.Regenerate(10 * this.repository.database.thePlayer.ArmyVitality); //Placeholder value for regeneration algorithm. Might want to consider designating a regen per sec field for each unit
        }
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * this.repository.database.thePlayer.ArmyVitality //Placeholder algorithm for maxhp value
        return this.maxHP;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        this.currentDamage = this.baseDamage * this.repository.database.thePlayer.ArmyVitality * this.Count; //Placeholder algorithm for damage value
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
        alert("You have unlocked " + this.name);
        this.isUnlocked = true;
    }

    Exist(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
    }

    Unexist(count: number): void {
        this.count -= count;
        this.repository.RemoveByDeath("Unit");
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        adjustBarAnimation("fighter-hp", this.MaxHP);
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
    }

    Hurt(): void {
        this.repository.GetCurrentEnemy().ReceiveDamage(this.CurrentDamage);
    }

    Regenerate(health: number) {
        this.currentHP += health;
        this.currentHP = Math.min(this.MaxHP, this.CurrentHP);
        adjustBarAnimation("fighter-hp", (this.CurrentHP / this.MaxHP));
    }
}


function adjustBarAnimation(type: string, percentage: number): void {
    $("#" + type + "-bar").animate({ "width": ("" + percentage.toString() + "%") }, 200);
    if (percentage == 100) {
        $("#" + type + "-bar").animate({ "width": ("0%") }, 100);
    }
    //Add in refreshing of exp to 0/300
}