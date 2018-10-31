import { IStageLevel } from "./IStageLevel";
import { StageLevelValueUpdateEvent } from "./ValueUpdateEvent";

export class StageLevel implements IStageLevel {
    private Zone: number;
    public readonly CurrentStage: number;
    private enemyDefeated: number;
    private valueUpdateEvents: ((e: StageLevelValueUpdateEvent) => void)[] = [];

    constructor(stage:number) {
        this.Zone = 1;
        this.CurrentStage = stage;
        this.enemyDefeated = 0;
    }

    AddValueUpdateEvent(event: (e: StageLevelValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(event);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new StageLevelValueUpdateEvent(this.CurrentZone, this.EnemyDefeated)));
    }

    IncreaseZone(): void {
        this.Zone++;
    }  

    IncreaseEnemyDefeated(): void {
        this.enemyDefeated++;
        if (this.EnemyDefeated % 10 == 0) {
            this.IncreaseZone();
        }
        this.Update();
    }

    get CurrentZone() {
        return this.Zone;
    }

    set CurrentZone(count: number) {
        this.Zone = count;
        this.Update();
    }

    get EnemyDefeated() {
        return this.enemyDefeated;
    }

    set EnemyDefeated(count: number) {
        this.enemyDefeated = count;
        this.Update();
    }
}