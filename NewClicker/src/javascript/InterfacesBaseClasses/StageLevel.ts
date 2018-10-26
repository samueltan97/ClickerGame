import { IStageLevel } from "./IStageLevel";
import { StageLevelValueUpdateEvent } from "./ValueUpdateEvent";

export class StageLevel implements IStageLevel {
    private Zone: number;
    private Stage: number;
    private enemyDefeated: number;
    private valueUpdateEvents: ((e: StageLevelValueUpdateEvent) => void)[] = [];

    constructor(stage:number) {
        this.Zone = 1;
        this.Stage = stage;
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

    get CurrentStage() {
        return this.Stage;
    }

    get EnemyDefeated() {
        return this.enemyDefeated;
    }

    ChangeZone(count: number): void {
        this.Zone = count;
    }
    ChangeEnemyDefeated(count: number): void {
        this.enemyDefeated = count;
    }

}