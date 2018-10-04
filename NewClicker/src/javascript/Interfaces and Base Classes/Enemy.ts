import { IMortality } from "./IMortality";
import { ICombative } from "./ICombative";
import { theStage, GetCurrentUnit, RemoveFromArray } from "../Database";
import { IFeedbackLoop } from "./IFeedbackLoop";
import { adjustBarAnimation } from "../..";

export class Enemy implements IMortality, ICombative, IFeedbackLoop {

    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;

    constructor(baseHP: number, baseDamage: number) {
        this.baseHP = baseHP;
        this.maxHP = this.baseHP * theStage.Level;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.currentDamage = this.baseDamage * theStage.Level;
    }

    UpdateFeedback(counter: number) {
        if (counter % 20) {
            this.Hurt();
        }
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * theStage.Level;
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
        adjustBarAnimation("monster-hp", (this.CurrentHP / this.MaxHP));
        if (this.currentHP == 0) {
            this.Die();
        }
    }

    Birth(): void {

    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        RemoveFromArray("Enemy", 0);
    }

    Hurt(): void {
        GetCurrentUnit().ReceiveDamage(this.CurrentDamage);
    }
}