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
import { isDate } from "util";
import { ICountable } from "./ICountable";
import { IConverter } from "./IConverter";

export class Enemy implements IMortality, ICombative, IFeedbackLoop, IRegeneration {

    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;
    private readonly stage;
    public isDead: boolean;
    private readonly resourceArray: number[];

    constructor(baseHP: number, baseDamage: number, resourceArray: number[], stage: IStageLevel) {
        this.baseHP = baseHP;
        this.stage = stage;
        this.maxHP = this.baseHP * stage.CurrentLevel;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.isDead = false;
        this.currentDamage = this.baseDamage * stage.CurrentLevel;
        this.resourceArray = resourceArray;
    }

    UpdateFeedback(counter: number):number {
        if (counter % 20 == 0 && this.isDead == false) {
            return this.CurrentDamage;
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

    get ResourceArray(): number[] {
        return this.resourceArray;
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

    Regenerate(counter: number) {
        if (counter % 10 == 0) {
        this.currentHP += 5 * this.stage.CurrentLevel; //placeholder for regeernation value
        this.currentHP = Math.min(this.CurrentHP, this.MaxHP);
        adjustBarAnimation("monster-hp", (this.CurrentHP / this.MaxHP));
        }
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

    UpdateFeedback(counter: number): number {
        if ((counter - 10) % 20 == 0 && this.isDead == false) {
            return this.CurrentDamage;
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
        this.isDead = false;
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        this.isDead = true;
    }

    Regenerate(counter: number) {
        if (counter % 10 == 0) {
        this.currentHP += 5 * this.player.ArmyVitality;
        this.currentHP = Math.min(this.MaxHP, this.CurrentHP);
        adjustBarAnimation("fighter-hp", (this.CurrentHP / this.MaxHP));
        }
    }
}

export class Resource implements ICountable {

    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private count: number;
    private isUnlocked: boolean;
    private readonly player;


    constructor(id: number, image: string, name: string) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.count = 0;
        this.isUnlocked = false;
        this.count = 0;
    }

    get Count(): number {
        return this.count;
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
    }

    Increase(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
        //CSS animation for appearance on screen, including refreshing of health and name bars;
    }

    Decrease(count: number): void {
        this.count -= count;
        this.count = Math.max(this.count, 0);
        //CSS animation for removing unit off the screen and reducing count of unit
    }
}

export class Refiner implements ICountable, IConverter, IFeedbackLoop {

    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private count: number;
    private isUnlocked: boolean;
    private toBeRefined: ICountable[];
    private toBeRefinedQuantity: number[];
    private refinedProduct: ICountable[];
    private refinedProductQuantity: number[];


    constructor(id: number, image: string, name: string, toBeRefined:ICountable[], toBeRefinedQuantity:number[], refinedProduct:ICountable[], refinedProductQuantity:number[]) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.count = 0;
        this.isUnlocked = false;
        this.toBeRefined = toBeRefined;
        this.refinedProduct = refinedProduct;
        this.toBeRefinedQuantity = toBeRefinedQuantity;
        this.refinedProductQuantity = refinedProductQuantity;
    }

    get Count(): number {
        return this.count;
    }

    UpdateFeedback(currentTime: number): void {
        if (currentTime % 20 == 0) {
            this.Convert();
        }
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
    }

    Increase(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
        //CSS animation for appearance on screen, including refreshing of health and name bars;
    }

    Decrease(count: number): void {
        this.count -= count;
        this.count = Math.max(this.count, 0);
        //CSS animation for removing unit off the screen and reducing count of unit
    }

    Convert(): void {
        let maxQuotient: number[] = [0];
        for (let i = 0; i < this.toBeRefined.length; i++) {
            let currentQuotient: number = Math.floor(this.toBeRefined[i].Count / this.toBeRefinedQuantity[i]);
            maxQuotient[0] = (i == 0) ? currentQuotient : Math.min(maxQuotient[0], currentQuotient);
        }
        let maxConvert: number = Math.min(maxQuotient[0], this.Count);
        for (let i = 0; i < this.toBeRefined.length; i++) {
            this.toBeRefined[i].Decrease(this.toBeRefinedQuantity[i] * maxConvert);
        }
        for (let i = 0; i < this.refinedProduct.length; i++) {
            this.refinedProduct[i].Increase(this.refinedProductQuantity[i] * maxConvert);
        }
    }
}

export class Trainer implements ICountable, IConverter, IFeedbackLoop {

    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private count: number;
    private isUnlocked: boolean;
    private toBeUsed: ICountable[];
    private toBeUsedQuantity: number[];
    private producedUnit: ICountable[];
    private producedUnitQuantity: number[];


    constructor(id: number, image: string, name: string, toBeUsed: ICountable[], toBeUsedQuantity: number[], producedUnit: ICountable[], producedUnitQuantity: number[]) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.count = 0;
        this.isUnlocked = false;
        this.toBeUsed = toBeUsed;
        this.toBeUsedQuantity = toBeUsedQuantity;
        this.producedUnit = producedUnit;
        this.producedUnitQuantity = producedUnitQuantity;
    }

    get Count(): number {
        return this.count;
    }

    UpdateFeedback(currentTime: number): void {
        if (currentTime % 20 == 0) {
            this.Convert();
        }
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
    }

    Increase(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
        //CSS animation for appearance on screen, including refreshing of health and name bars;
    }

    Decrease(count: number): void {
        this.count -= count;
        this.count = Math.max(this.count, 0);
        //CSS animation for removing unit off the screen and reducing count of unit
    }

    Convert(): void {
        let maxQuotient: number[] = [0];
        for (let i = 0; i < this.toBeUsed.length; i++) {
            let currentQuotient: number = Math.floor(this.toBeUsed[i].Count / this.toBeUsedQuantity[i]);
            maxQuotient[0] = (i == 0) ? currentQuotient : Math.min(maxQuotient[0], currentQuotient);
        }
        let maxConvert: number = Math.min(maxQuotient[0], this.Count);
        for (let i = 0; i < this.toBeUsed.length; i++) {
            this.toBeUsed[i].Decrease(this.toBeUsedQuantity[i] * maxConvert);
        }
        for (let i = 0; i < this.producedUnit.length; i++) {
            this.producedUnit[i].Increase(this.producedUnitQuantity[i] * maxConvert);
        }
    }
}