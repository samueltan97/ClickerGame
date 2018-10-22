import { IStageLevel } from "./IStageLevel";
import { StageLevelValueUpdateEvent } from "./ValueUpdateEvent";

export class StageLevel implements IStageLevel {
    private Level: number;
    hasEnemy: boolean;
    hasUnit: boolean;
    private valueUpdateEvents: ((e: StageLevelValueUpdateEvent) => void)[] = [];

    constructor(level: number) {
        this.Level = level;
        this.hasEnemy = false;
        this.hasUnit = false;
    }

    AddValueUpdateEvent(e: (e: StageLevelValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(e);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new StageLevelValueUpdateEvent(this.CurrentLevel)));
    }

    get CurrentLevel() {
        return this.Level;
    }
}