import { IMortality } from "./IMortality";
import { ICombative } from "./ICombative";
import { IFeedbackLoop } from "./IFeedbackLoop";
import { thePlayer, GetCurrentEnemy, RemoveFromArray, AddToArray } from "../Database";
import { adjustBarAnimation } from "../..";

export class Unit implements IMortality, ICombative, IFeedbackLoop, IExistence {

    private readonly name: string;
    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;
    private readonly range: number;


    constructor(name: string, baseHP: number, baseDamage: number, range: number) {
        this.name = name;
        this.baseHP = baseHP;
        this.maxHP = this.baseHP * thePlayer.ArmyVitality;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.currentDamage = this.baseDamage * thePlayer.ArmyVitality;
        this.range = range;
    }

    UpdateFeedback(counter: number) {
        if (counter % 20) {
            this.Hurt();
        }
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * thePlayer.ArmyVitality
        return this.maxHP;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        return this.currentDamage;
    }

    ReceiveDamage(damage: number): void {
        this.currentHP -= damage;
        this.currentHP = Math.max(this.currentHP, 0);
        adjustBarAnimation("fighter-hp", (this.CurrentHP / this.MaxHP));
        if (this.currentHP == 0) {
            this.Die();
            this.Unexist();
        }
    }

    Unlocked(): void {
        alert("You have unlocked " + this.name);
    }

    Exist(): void {
        //Adding to Repository of Units
        AddToArray(this, "Unit", this.range);
    }

    Unexist(): void {
        //Removing from Repository of Units
        RemoveFromArray("Unit", this.range);
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        adjustBarAnimation("fighter-hp", this.MaxHP);
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
    }

    Hurt(): void {
        GetCurrentEnemy().ReceiveDamage(this.CurrentDamage);
    }
}