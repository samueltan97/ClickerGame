import { IMortality } from "./IMortality";
import { ICombative } from "./ICombative";
import { theStage, CurrentUnit } from "../Database";
import { IFeedbackLoop } from "./IFeedbackLoop";

export class Enemy implements IMortality, ICombative, IFeedbackLoop {

    BaseHP: number;
    MaxHP: number;
    CurrentHP: number;
    BaseDamage: number;
    CurrentDamage: number;

    constructor(baseHP: number, baseDamage: number) {
        this.BaseHP = baseHP;
        this.MaxHP = this.BaseHP * theStage.Level;
        this.CurrentHP = this.MaxHP;
        this.BaseDamage = baseDamage;
        this.CurrentDamage = this.BaseDamage * theStage.Level;
    }

    UpdateFeedback(counter: number) {
        if (counter % 20) {
            this.Hurt();
        }
    }

    GetMaxHP(): number {
        this.MaxHP = this.BaseHP * theStage.Level;
        return this.MaxHP;
    }

    GetCurrentHP(): number {
        return this.CurrentHP;
    }

    ReceiveDamage(damage: number): void {
        this.CurrentHP -= damage;
        this.CurrentHP = Math.max(this.CurrentHP, 0);
        if (this.CurrentHP == 0) {
            this.Die();
        }
    }

    Die(): void {

    }

    Hurt(): void {
        CurrentUnit().ReceiveDamage(this.CurrentDamage);
    }
}