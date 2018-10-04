export class StageLevel {
    Level: number;
    hasEnemy: boolean;
    hasUnit: boolean;

    constructor(level: number) {
        this.Level = level;
        this.hasEnemy = false;
        this.hasUnit = false;
    }
}