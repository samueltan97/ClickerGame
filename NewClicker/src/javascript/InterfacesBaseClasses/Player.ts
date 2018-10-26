import { IPlayer } from "./IPlayer";
import { IMortality } from "./IMortality";
import { adjustBarAnimation } from "../CSSAnimation/CSSAnimation";
import { ILevelProgression } from "./ILevelProgression";
import { IRegeneration } from "./IRegeneration";
import { PlayerValueUpdateEvent } from "./ValueUpdateEvent";

//Take note that player extends Unit for now to set it as a posssible current Unit for battle with the enemy
export class Player implements IPlayer, ILevelProgression{

    private armyVitality: number;
    private readonly baseExperience: number;
    private readonly baseDamage: number;
    private currentLevel: number;
    private currentExperience: number;
    private valueUpdateEvents: ((e: PlayerValueUpdateEvent) => void)[] = [];

    constructor(baseDamage:number) {
        this.armyVitality = 1;
        this.baseExperience = 5; //temporary formula
        this.baseDamage = baseDamage;
        this.currentLevel = 1;
        this.currentExperience = 0;
    }

    AddValueUpdateEvent(e: (e: PlayerValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new PlayerValueUpdateEvent(this.CurrentExperience, this.CurrentLevel, this.CurrentArmyVitality)));
    }

    get CurrentArmyVitality():number {
        return this.armyVitality;
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

    get CurrentDamage(): number {
        return this.baseDamage * this.CurrentLevel; //temporary formula
    }

    UpdateFeedback(currentTime: number): number {
        return this.CurrentDamage;
    }

    IncreaseArmyVitality():void {
        this.armyVitality += 1;
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
        this.Update();
    }

    LevelUp(): void {
        this.currentLevel += 1;
        this.currentExperience = 0;
        this.Update();
    }
}