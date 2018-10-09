import { IStageLevel } from "./IStageLevel";

export class StageLevel implements IStageLevel {
    private Level: number;
    hasEnemy: boolean;
    hasUnit: boolean;

    constructor(level: number) {
        this.Level = level;
        this.hasEnemy = false;
        this.hasUnit = false;
    }

    get CurrentLevel() {
        return this.Level;
    }
}