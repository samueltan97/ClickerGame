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
import { ILevelProgression } from "./ILevelProgression";

export class Enemy implements IMortality, ICombative, IFeedbackLoop, IRegeneration {

    readonly id: number;
    private readonly baseHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private readonly stage;
    public isDead: boolean;
    private readonly resourceArray: number[];
    private readonly baseExperience: number;


    constructor(id:number, baseHP: number, baseDamage: number, baseExperience:number, resourceArray: number[], stage: IStageLevel) {
        this.id = id;
        this.baseHP = baseHP;
        this.stage = stage;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.baseExperience = baseExperience;
        this.isDead = false;
        this.resourceArray = resourceArray;
    }

    UpdateFeedback(counter: number):number {
        if (counter % 20 == 0 && this.isDead == false) {
            return this.CurrentDamage;
        }
        return 0;
    }

    get MaxHP(): number {         
        return this.baseHP * this.stage.CurrentLevel; //Placeholder algorithm for maxhp value
    }

    get Count(): number {
        return 1;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        return this.baseDamage * this.stage.CurrentLevel; //Placeholder algorithm for damage value
    }

    get ResourceArray(): number[] {
        return this.resourceArray;
    }

    get CurrentExp(): number {
        return this.baseExperience * this.stage.CurrentLevel;
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
        this.isDead = false;
        this.Regenerate(this.MaxHP);
    }

    Die(): void {
        this.isDead = true;
    }

    Regenerate(counter: number) {
        if (counter % 10 == 0 && !this.isDead) {
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
        this.isDead = false;
        this.Regenerate(this.MaxHP);
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        this.isDead = true;
    }

    Regenerate(counter: number) {
        if (counter % 10 == 0 && !this.isDead) {
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

export class RefinerTrainer implements ICountable, IConverter, IFeedbackLoop {

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

    UpdateFeedback(currentTime: number): number {
        if (currentTime % 20 == 0) {
            this.Convert();
        }
        return 0;
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

export class Hero implements IMortality, ICombative, IFeedbackLoop, IRegeneration, ILevelProgression {

    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private readonly baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private currentDamage: number;
    private readonly range: number;
    private readonly baseExperience: number;
    private currentExperience: number;
    private currentLevel: number;
    private isUnlocked: boolean;
    public isDead: boolean;
    private readonly player;


    constructor(id: number, image: string, name: string, baseHP: number, baseDamage: number, baseExperience:number, range: number, player: IPlayer) {
        this.id = id;
        this.player = player;
        this.image = image;
        this.name = name;
        this.baseHP = baseHP;
        this.maxHP = this.baseHP * player.CurrentArmyVitality;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.currentDamage = this.baseDamage * player.CurrentArmyVitality;
        this.baseExperience = baseExperience;
        this.currentExperience = 0;
        this.currentLevel = 1;
        this.range = range;
        this.isUnlocked = false;
        this.isDead = false;
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
        this.currentDamage = this.baseDamage * this.player.ArmyVitality; //Placeholder algorithm for damage value
        return this.currentDamage;
    }

    get CurrentExperience(): number {
        return this.currentExperience;
    }

    get MaxExperience(): number {
        return this.baseExperience * this.CurrentLevel; //Temporary formula
    }

    get CurrentLevel(): number {
        return this.currentLevel;
    }

    get Count(): number {
        return 1;
    }

    ReceiveDamage(damage: number): void {
        this.currentHP -= damage;
        this.currentHP = Math.max(this.currentHP, 0);
        adjustBarAnimation("fighter-hp", (this.CurrentHP / this.MaxHP));
        if (this.currentHP == 0) {
            this.Die();
        }
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        if (!this.isUnlocked) this.Unlocked();
        this.isDead = false;
        this.Regenerate(this.MaxHP);
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        this.isDead = true;
    }

    Regenerate(counter: number):void {
        if (counter % 10 == 0 && !this.isDead) {
            this.currentHP += 5 * this.player.ArmyVitality;
            this.currentHP = Math.min(this.MaxHP, this.CurrentHP);
            adjustBarAnimation("hero-hp", (this.CurrentHP / this.MaxHP));
        }
    }

    GainExperience(experience: number): void {
        let experienceOverflow = this.currentExperience + experience - this.MaxExperience;
        if (experienceOverflow > 0) {
            this.LevelUp();
            this.currentExperience += experienceOverflow;
        } else {
            this.currentExperience += experience;
        }
    }

    LevelUp(): void {
        this.currentLevel += 1;
        this.currentExperience = 0;
    }
}
