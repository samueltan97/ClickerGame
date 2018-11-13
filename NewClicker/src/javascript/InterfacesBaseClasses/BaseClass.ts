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
import { isDate, isBoolean } from "util";
import { ICountable } from "./ICountable";
import { IConverter } from "./IConverter";
import { ILevelProgression } from "./ILevelProgression";
import { EnemyValueUpdateEvent, UnitValueUpdateEvent, ResourceValueUpdateEvent, RefinerTrainerValueUpdateEvent, HeroValueUpdateEvent, StageLevelValueUpdateEvent, PlayerValueUpdateEvent } from "./ValueUpdateEvent";
import { Player } from "./Player";

export class Enemy implements IMortality, ICombative, IFeedbackLoop, IRegeneration {
    readonly arrayId: number;
    readonly id: number;
    readonly image: string;
    readonly name: string;
    private readonly baseHP: number;
    private currentHP: number;
    private readonly baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
     stage: IStageLevel;
    public isDead: boolean;
    public readonly isBoss: boolean;
    private resourceArray: number[];
    private readonly baseExperience: number;
    private damageFrequency: number;
    private regen: number;
    private regenFrequency: number;
    private ability: Function;
    private abilityFrequency: number;
    private valueUpdateEvents: ((e: EnemyValueUpdateEvent) => void)[] = [];

    constructor(arrayId: number, id: number, image: string, name: string, baseHP: number, baseDamage: number, baseExperience: number, resourceArray: number[], damageFrequency: number, regen: number, regenFrequency: number, ability: Function, abilityFrequency: number, stage: IStageLevel, isBoss:boolean) {
        this.arrayId = arrayId;
        this.id = id;
        this.image = image;
        this.name = name;
        this.baseHP = baseHP;
        this.stage = stage;
        this.currentHP = this.baseHP;
        this.baseDamage = baseDamage;
        this.baseExperience = baseExperience;
        this.isDead = false;
        this.damageFrequency = damageFrequency;
        this.resourceArray = resourceArray;
        this.regen = regen;
        this.regenFrequency = regenFrequency;
        this.ability = ability;
        this.abilityFrequency = abilityFrequency;
        this.isBoss = isBoss;
    }

    AddValueUpdateEvent(event: (e: EnemyValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(event);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new EnemyValueUpdateEvent(this.arrayId, this.id, this.CurrentHP, this.MaxHP, this.ResourceArray)));
    }

    UpdateFeedback(counter: number): number {
         if (counter % this.damageFrequency == 0 && this.isDead == false) {
            if (counter % this.abilityFrequency == 0) {
                if (this.id == 18) {this.currentHP = Math.min((this.currentHP + this.MaxHP * 0.2), this.MaxHP)} // hack for Siren regen
                return this.ability(this.CurrentDamage, this.stage) * this.CurrentDamage;
            }
            return this.CurrentDamage;
        }       
        return 0;
    }

    get MaxHP(): number {         
        return this.baseHP * this.stage.CurrentStage * this.stage.CurrentStage * this.stage.CurrentZone * this.stage.CurrentZone * this.stage.CurrentZone; //Placeholder algorithm for maxhp value
    }

    get Count(): number {
        return 1;
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    get CurrentDamage(): number {
        return this.baseDamage * this.stage.CurrentStage * this.stage.CurrentStage * this.stage.CurrentZone * this.stage.CurrentZone * this.stage.CurrentZone; //Placeholder algorithm for maxhp value
    }

    set ResourceArray(array: number[]) {
        this.resourceArray = array;
    }

    get ResourceArray(): number[] {
        return this.resourceArray;
    }

    get CurrentExp(): number {
        return this.baseExperience * this.stage.CurrentStage * this.stage.CurrentZone;
    }

    UpdateSource = (e: StageLevelValueUpdateEvent): void =>  {
        this.stage.CurrentZone = e.newZone;
        this.stage.EnemyDefeated = e.newEnemyDefeated;
    }

    ReceiveDamage(damage: number): void {
        if (damage > 0) {
        let enemy = this;
        $("#" + enemy.name + "-hurt").fadeIn(100, "linear").fadeOut(100, "linear");
        this.currentHP -= damage;
        this.currentHP = Math.max(this.currentHP, 0);
        adjustBarAnimation("monster-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#monster-hp-text-right").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
       if (this.currentHP == 0) {
            this.Die();
        }
            this.Update();
        }
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        this.isDead = false;
        this.RegenerateMax();
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id + "-normal").fadeIn(100);
        $("#monster-hp-text-left").text(this.name);
        this.Update();
    }

    Die(): void {
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id + "-normal").fadeOut(100);
        $("#" + id + "-hurt").fadeOut(100);
        $("#monster-hp-text-left").text("");
        $("#monster-hp-text-right").text("");
        this.isDead = true;
        this.Update();
    }

    Fadeout(): void {
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id + "-normal").fadeOut(100);
        $("#" + id + "-hurt").fadeOut(100);
    }

    Regenerate(counter: number) {
        if (counter % this.regenFrequency == 0 && !this.isDead && this.CurrentHP < this.MaxHP) {
            this.currentHP += this.regen *  this.stage.CurrentStage * this.stage.CurrentStage * this.stage.CurrentZone * this.stage.CurrentZone; //Placeholder algorithm for maxhp value //placeholder for regeernation value
        this.currentHP = Math.min(this.CurrentHP, this.MaxHP);
        adjustBarAnimation("monster-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#monster-hp-text-right").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
        this.Update();
        }
        
    }

    RegenerateMax():void {
        this.currentHP = this.MaxHP;
        adjustBarAnimation("monster-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#monster-hp-text-right").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
        this.Update();
    }
}

export class Unit implements IMortality, ICombative, IFeedbackLoop, IExistence, IRegeneration, ICountable {

    
    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private baseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    private readonly range: number;
    private count: number;
    private isUnlocked: boolean;
    public isDead: boolean;
    public readonly damageFrequency: number;
    private player: IPlayer;
    private valueUpdateEvents: ((e: UnitValueUpdateEvent) => void)[] = [];
    private isImmune: boolean;
    private canEvade: boolean;

    constructor(id: number, image: string, name: string, baseHP: number, baseDamage: number, range: number, count:number, player:IPlayer, damageFrequency:number) {
        this.id = id;
        this.player = player;
        this.image = image;
        this.name = name;
        this.baseHP = baseHP;
        this.maxHP = baseHP;
        this.currentHP = this.MaxHP;
        this.baseDamage = baseDamage;
        this.range = range;
        this.count = 0;
        this.isUnlocked = false;
        this.isDead = false;
        this.count = count;
        this.damageFrequency = damageFrequency;
        this.isImmune = false;
        this.canEvade = false;
    }

    UpdateFeedback(counter: number): number {
        if ((counter + 5) % this.damageFrequency == 0 && this.isDead == false) {
            return this.CurrentDamage;
        }
        return 0;
    }

    get IsImmune(): boolean {
        return this.isImmune;
    }

    set IsImmune(bool: boolean) {
        this.isImmune = bool;
        this.Update();
    }

    get CanEvade():boolean {
        return this.canEvade;
    }

    set CanEvade(bool: boolean) {
        this.canEvade = bool;
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * this.player.CurrentArmyVitality;
        return this.maxHP; //Placeholder algorithm for maxhp value
    }

    set MaxHP(multiplier: number) {
        this.baseHP = this.baseHP * multiplier;
        adjustBarAnimation("fighter-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#fighter-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
        this.Update();
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    set CurrentHP(multiplier: number) {
        this.currentHP = this.currentHP * multiplier; 
        adjustBarAnimation("fighter-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#fighter-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
       this.Update();
    }

    get CurrentDamage(): number {
        return this.baseDamage * this.player.CurrentArmyVitality * this.Count; //Placeholder algorithm for damage value
    }

    set CurrentDamage(multiplier: number) {
        this.baseDamage = this.baseDamage * multiplier; //Placeholder algorithm for damage value
        this.Update();
    }

    get Count(): number {
        return this.count;
    }

    set Count(count: number) {
        this.count = count;
    }

    AddValueUpdateEvent(e: (e: UnitValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new UnitValueUpdateEvent(this.id, this.CurrentHP, this.MaxHP, this.Count, this.isUnlocked, this.IsImmune)));
    }

    UpdateSource = (e: PlayerValueUpdateEvent): void => {
        let difference: number = this.maxHP - this.CurrentHP;
        this.currentHP = this.MaxHP - difference;
        adjustBarAnimation("fighter-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#fighter-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
    }

    ReceiveDamage(damage: number): void {
        if (!this.IsImmune && damage > 0) {
            if (this.CanEvade) {
                damage = Math.round(Math.random()) * damage;
            }
            this.currentHP -= damage;
            this.currentHP = Math.max(this.currentHP, 0);
            adjustBarAnimation("fighter-hp", this.name, this.CurrentHP, this.MaxHP);
            $("#fighter-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
            if (this.currentHP == 0) {
                this.Unexist(1);
                this.Die();
            }
            this.Update();
        }
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
        this.Update();
    }

    Exist(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
        $("#" + this.name + "-count").html(this.name + "<br />X " + this.Count);
        this.Update();
    }

    Unexist(count: number): void {
        this.count -= count;
        this.count = Math.max(this.count, 0);
        $("#" + this.name + "-count").html(this.name + "<br />X " + this.Count);
        this.Update();
    }

    Increase(count: number): void {
        this.Exist(count);
    }
    Decrease(count: number): void {
        this.Unexist(count);
    }

    Birth(): void {
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id).fadeIn(100);
        $("#fighter-description-text").text("Current Unit: " + this.name);
        //CSS animation for appearance on screen, including refreshing of health and name bars
        this.isDead = false;
        this.RegenerateMax();
        this.Update();
    }

    Die(): void {
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id + "-normal").fadeOut(100);
        //CSS animation for removing unit off the screen and reducing count of unit
        this.isDead = true;
        this.Update();
    }

    Regenerate(counter: number) {
        if ((counter + 5) % 20 == 0 && !this.isDead && this.CurrentHP < this.MaxHP) {
            this.currentHP += 1 * this.player.CurrentArmyVitality;
        this.currentHP = Math.min(this.MaxHP, this.CurrentHP);
        adjustBarAnimation("fighter-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#fighter-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
        this.Update();
        }

    }

    RegenerateMax(): void {
        this.currentHP = this.MaxHP;
        adjustBarAnimation("fighter-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#fighter-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP);
        this.Update();
    }
}

export class Resource implements ICountable {

    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private count: number;
    private isUnlocked: boolean;
    private valueUpdateEvents: ((e: ResourceValueUpdateEvent) => void)[] = [];

    constructor(id: number, image: string, name: string) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.count = 0;
        this.isUnlocked = false;
        this.count = 0;
    }

    AddValueUpdateEvent(e: (e: ResourceValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new ResourceValueUpdateEvent(this.id, this.Count, this.isUnlocked)));
    }

    get Count(): number {
        return this.count;
    }

    set Count(multiplier:number) {
        this.count = this.count * multiplier;
    }

    Unlocked(): void {
        alert("You have unlocked " + this.name);
        this.isUnlocked = true;
        this.Update();
    }

    Increase = (count?: number): void => {
        let id: string = this.name.replace(/\s+/g, '');
        if (!this.isUnlocked && count != 0) { this.Unlocked() };
        this.count = (typeof count === "undefined") ? (this.count + 1) : (this.count +count);
        $("#" + id + "-quantity").text("X " + this.Count);
        if (this.id == 0) { $("#manpower-count-repo").text("Manpower: " + this.Count);}
        this.Update();
        //CSS animation for appearance on screen, including refreshing of health and name bars;
    }

    Decrease(count: number): void {
        let id: string = this.name.replace(/\s+/g, '');
        if (this.Count >= count) {
            this.count -= count;
            this.count = Math.max(this.count, 0);
            $("#" + id + "-quantity").text("X " + this.Count);
            if (this.id == 0) { $("#manpower-count-repo").text("Manpower: " + this.Count); }
                this.Update();
        }
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
    private productionFrequency: number;
    private valueUpdateEvents: ((e: RefinerTrainerValueUpdateEvent) => void)[] = [];

    constructor(id: number, image: string, name: string, toBeRefined: ICountable[], toBeRefinedQuantity: number[], refinedProduct: ICountable[], refinedProductQuantity: number[], productionFrequency: number) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.count = 0;
        this.isUnlocked = false;
        this.toBeRefined = toBeRefined;
        this.refinedProduct = refinedProduct;
        this.toBeRefinedQuantity = toBeRefinedQuantity;
        this.refinedProductQuantity = refinedProductQuantity;
        this.productionFrequency = productionFrequency;
    }

    AddValueUpdateEvent(e: (e: RefinerTrainerValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new RefinerTrainerValueUpdateEvent(this.id, this.Count, this.isUnlocked)));
    }

    get Count(): number {
        return this.count;
    }

    set Count(multiplier: number) {
        this.count = this.count * multiplier;
    }

    UpdateFeedback(currentTime: number): number {
        if (currentTime % this.productionFrequency == 0) {
            this.Convert();
        }
        return 0;
    }

    Unlocked(): void {
        alert("You have unlocked " + this.name);
        this.isUnlocked = true;
        this.Update();
    }

    Increase(count: number): void {
        if (!this.isUnlocked) { this.Unlocked() };
        this.count += count;
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id + "-quantity").text("X " + this.Count);
        this.Update();
        //CSS animation for appearance on screen, including refreshing of health and name bars;
    }

    Decrease(count: number): void {
        if (count <= this.Count) {
        this.count -= count;
        this.count = Math.max(this.count, 0);
        let id: string = this.name.replace(/\s+/g, '');
        $("#" + id + "-quantity").text("X " + this.Count);
            this.Update();
        }
        //CSS animation for removing unit off the screen and reducing count of unit
    }

    Convert(): void {
        if (this.Count > 0) {
        let maxQuotient: number[] = [0];
        for (let i = 0; i < this.toBeRefined.length; i++) {
            let currentQuotient: number = Math.floor(this.toBeRefined[i].Count / this.toBeRefinedQuantity[i]);
            maxQuotient[0] = (i == 0) ? currentQuotient : Math.min(maxQuotient[0], currentQuotient);
        }
        if (this.id != 0) {
            let maxConvert: number = Math.min(maxQuotient[0], this.Count);
            for (let i = 0; i < this.toBeRefined.length; i++) {
                this.toBeRefined[i].Decrease(this.toBeRefinedQuantity[i] * maxConvert);
            }
            for (let i = 0; i < this.refinedProduct.length; i++) {
                this.refinedProduct[i].Increase(this.refinedProductQuantity[i] * maxConvert);
            }
        } else {
            this.refinedProduct[0].Increase(this.Count);
            }
        }
    }
}

export class Hero implements IMortality, ICombative, IFeedbackLoop, IRegeneration, ILevelProgression {
    //Hero has no damageFrequency. Their damage is dps.
    readonly id: number;
    readonly image: string;
    private readonly name: string;
    private baseHP: number;
    private maxHP: number;
    private currentHP: number;
    private baseDamage: number; 
    private readonly range: number;
    private readonly baseExperience: number;
    private currentExperience: number;
    private currentLevel: number;
    private isUnlocked: boolean;
    public isDead: boolean;
    private player:IPlayer;
    private valueUpdateEvents: ((e: HeroValueUpdateEvent) => void)[] = [];
    public readonly skillArray: number[];
    private isImmune: boolean;

    constructor(id: number, image: string, name: string, baseHP: number, baseDamage: number, baseExperience:number, range: number, skillArray:number[], player: IPlayer) {
        this.id = id;
        this.player = player;
        this.image = image;
        this.name = name;
        this.baseHP = baseHP;
        this.maxHP = baseHP;
        this.currentHP = this.baseHP;
        this.baseDamage = baseDamage;
        this.baseExperience = baseExperience;
        this.currentExperience = 0;
        this.currentLevel = 1;
        this.range = range;
        this.isUnlocked = false;
        this.isDead = false;
        this.isImmune = false;
        this.skillArray = skillArray;
    }

    UpdateFeedback(counter: number): number {
        if ((counter +5) % 20 == 0 && this.isDead == false) {
            return this.CurrentDamage;
        }
        return 0;
    }

    AddValueUpdateEvent(e: (e: HeroValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new HeroValueUpdateEvent(this.id, this.CurrentHP, this.MaxHP, this.isUnlocked, this.CurrentExperience, this.MaxExperience, this.CurrentLevel, this.IsImmune)));
    }

    UpdateSource = (e: PlayerValueUpdateEvent): void => {
        let difference: number = this.maxHP - this.CurrentHP;
        this.currentHP = this.MaxHP - difference;
        adjustBarAnimation(this.name.split(" ")[0] + "-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#" + this.name.split(" ")[0] + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
   }

    get IsImmune(): boolean {
        return this.isImmune;
    }

    set IsImmune(bool: boolean) {
        this.isImmune = bool;
    }

    get MaxHP(): number {
        this.maxHP = this.baseHP * this.player.CurrentArmyVitality * this.CurrentLevel;
        return this.maxHP; //Placeholder algorithm for maxhp value
    }

    set MaxHP(multiplier: number) {
        this.baseHP = this.baseHP * multiplier;
        adjustBarAnimation(this.name.split(" ")[0] + "-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#" + this.name.split(" ")[0] + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
    }

    get CurrentHP(): number {
        return this.currentHP;
    }

    set CurrentHP(multiplier: number) {
        this.currentHP = this.currentHP * multiplier;
        adjustBarAnimation(this.name.split(" ")[0] + "-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#" + this.name.split(" ")[0] + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
    }

    get CurrentDamage(): number {
        return this.baseDamage * this.CurrentLevel * this.player.CurrentArmyVitality; //Placeholder algorithm for damage value
    }

    set CurrentDamage(multiplier:number) {
        this.baseDamage = this.baseDamage * multiplier; //Placeholder algorithm for damage value
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
        if (!this.IsImmune && damage > 0) {
        this.currentHP -= damage;
        this.currentHP = Math.max(this.currentHP, 0);
        adjustBarAnimation(this.name.split(" ")[0] + "-hp", this.name, this.CurrentHP, this.MaxHP);
            $("#" + this.name.split(" ")[0] + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
       if (this.currentHP == 0) {
            this.Die();
        }
            this.Update();
        }
    }

    Unlocked(): void {
        //alert("You have unlocked " + this.name);
        this.isUnlocked = true;
        this.Update();
    }

    Birth(): void {
        //CSS animation for appearance on screen, including refreshing of health and name bars
        if (!this.isUnlocked) this.Unlocked();
        this.RegenerateMax();
        this.isDead = false;
        this.Update();
    }

    Die(): void {
        //CSS animation for removing unit off the screen and reducing count of unit
        this.isDead = true;
        this.Update();
    }

    Regenerate(counter: number):void {
        if ((counter + 5) % 10 == 0 && !this.isDead && this.CurrentHP < this.MaxHP) {
            this.currentHP += 5 * this.player.CurrentArmyVitality;
            this.currentHP = Math.min(this.MaxHP, this.CurrentHP);
            adjustBarAnimation(this.name.split(" ")[0] + "-hp", this.name, this.CurrentHP, this.MaxHP);
            $("#" + this.name.split(" ")[0] + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
            this.Update();
        }
    }

    RegeneratePercentage(percentage: number): void {
        this.currentHP += (this.MaxHP * percentage /100);
        adjustBarAnimation(this.name + "-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#" + this.name + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
        this.Update();
    }

    RegenerateMax(): void {
        this.currentHP = this.MaxHP;
        adjustBarAnimation(this.name.split(" ")[0] + "-hp", this.name, this.CurrentHP, this.MaxHP);
        $("#" + this.name.split(" ")[0] + "-hp-text").text("HP: " + this.CurrentHP + "/" + this.MaxHP + " (" + Math.floor(this.CurrentHP / this.MaxHP * 100) + "%)");
        this.Update();
    }

    GainExperience(experience: number): void {
        let experienceOverflow = this.currentExperience + experience - this.MaxExperience;
        if (experienceOverflow >= 0) {
            this.LevelUp();
            this.currentExperience += experienceOverflow;
        } else {
            this.currentExperience += experience;
        }
        adjustBarAnimation(this.name.split(" ")[0] + "-exp", this.name, this.CurrentExperience, this.MaxExperience);
        $("#" + this.name.split(" ")[0] + "-exp-text").text("EXP: " + this.CurrentExperience + "/" + this.MaxExperience + " (" + Math.floor(this.CurrentExperience / this.MaxExperience * 100) + "%)");
        this.Update();
    }

    LevelUp(): void {
        this.currentLevel += 1;
        this.currentExperience = 0;
        adjustBarAnimation(this.name.split(" ")[0] + "-exp", this.name, this.CurrentExperience, this.MaxExperience);
        $("#" + this.name.split(" ")[0] + "-exp-text").text("EXP: " + this.CurrentExperience + "/" + this.MaxExperience + " (" + Math.floor(this.CurrentExperience / this.MaxExperience * 100) + "%)");
        $("#" + this.name.split(" ")[0] + "-lvl").text("LVL: " + this.CurrentLevel);
        this.Update();
   }
}
