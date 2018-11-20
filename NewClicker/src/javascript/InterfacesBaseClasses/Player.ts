import { IPlayer } from "./IPlayer";
import { IMortality } from "./IMortality";
import { adjustBarAnimation, adjustValueToExponential } from "../CSSAnimation/CSSAnimation";
import { ILevelProgression } from "./ILevelProgression";
import { IRegeneration } from "./IRegeneration";
import { PlayerValueUpdateEvent } from "./ValueUpdateEvent";

//Take note that player extends Unit for now to set it as a posssible current Unit for battle with the enemy
export class Player implements IPlayer, ILevelProgression{

    private armyVitality: number;
    private job: number; //0, 1, 2 for different jobs
    private skillPoint:number
    private readonly baseExperience: number;
    private baseDamage: number;
    public dps: number;
    private clickcount: number;
    private currentLevel: number;
    private currentExperience: number;
    private valueUpdateEvents: ((e: PlayerValueUpdateEvent) => void)[] = [];
    private hurtUpdateEvents: Function[] = [];

    constructor(baseDamage: number, job: number) {
        this.job = job;
        this.skillPoint = 0;
        this.armyVitality = 1;
        this.baseExperience = 5; //temporary formula
        this.baseDamage = baseDamage;
        this.currentLevel = 1;
        this.currentExperience = 0;
        this.dps = 0;
        this.clickcount = 0;
    }

    AddValueUpdateEvent(e: (e: PlayerValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    AddHurtUpdateEvents(f: Function){
        this.hurtUpdateEvents.push(f);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new PlayerValueUpdateEvent(this.CurrentExperience, this.CurrentLevel, this.CurrentArmyVitality, this.CurrentDamage, this.MaxExperience, this.ClickCount, this.job)));
    }

    get CurrentArmyVitality():number {
        return this.armyVitality;
    }

    set CurrentArmyVitality(count:number) {
        this.armyVitality = count;
        $("#player-army-vitality").text("Army Vitality: " + adjustValueToExponential(this.CurrentArmyVitality));
        this.Update();
    }

    get CurrentExperience():number {
        return this.currentExperience;
    }

    get MaxExperience(): number {
        return this.baseExperience * this.CurrentLevel; //Temporary formula
    }

    get CurrentLevel(): number {
        return this.currentLevel;
    }

    set CurrentLevel(count:number) {
        this.currentLevel = count;
        $("#stats-desc-lvl").text("LVL: " + this.CurrentLevel);
    }

    get CurrentDamage(): number {
        return this.baseDamage * this.CurrentLevel; //temporary formula
    }

    set CurrentDamage(multiplier: number) {
        this.baseDamage = this.baseDamage * multiplier;
        $("#player-click-damage").text("Click Damage: " + adjustValueToExponential(this.CurrentDamage));
    }

    get ClickCount(): number {
        return this.clickcount;
    }

    get SkillPoint(): number {
        return this.skillPoint;
    }

    UpdateFeedback(currentTime: number): number {
        return this.CurrentDamage;
    }

    Hurt(): number {
        this.clickcount += 1;
        this.hurtUpdateEvents.forEach(x => x());
        this.Update();
        return this.CurrentDamage;        
    }

    IncreaseArmyVitality():void {
        this.armyVitality += 1;
        $("#player-army-vitality").text("Army Vitality: " + adjustValueToExponential(this.CurrentArmyVitality));
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
        adjustBarAnimation("player-exp", "EXP", this.CurrentExperience, this.MaxExperience);
        $("#player-exp-text").text("EXP: " + adjustValueToExponential(this.CurrentExperience) + "/" + adjustValueToExponential(this.MaxExperience) + " (" + Math.floor(this.CurrentExperience / this.MaxExperience * 100) + "%)");
        this.Update();
    }

    LevelUp(): void {
        this.currentLevel += 1;
        this.currentExperience = 0;
        this.IncreaseArmyVitality();
        this.IncreaseSkillPoint();
        adjustBarAnimation("player-exp", "EXP", this.CurrentExperience, this.MaxExperience);
        $("#player-exp-text").text("EXP: " + adjustValueToExponential(this.CurrentExperience) + "/" + adjustValueToExponential(this.MaxExperience) + " (" + Math.floor(this.CurrentExperience / this.MaxExperience * 100) + "%)");
        $("#stats-desc-lvl").text("LVL: " + adjustValueToExponential(this.CurrentLevel));
        $("#player-click-damage").text("Click Damage: " + adjustValueToExponential(this.CurrentDamage));
        this.Update();
    }

    IncreaseSkillPoint(): void {
        this.skillPoint += 1;
        $("#skill-points-repo").text("Skill Points: " + adjustValueToExponential(this.skillPoint));
    }

    DecreaseSkillPoint(): void {
        this.skillPoint -= 1;
        $("#skill-points-repo").text("Skill Points: " + adjustValueToExponential(this.skillPoint));
    }
}