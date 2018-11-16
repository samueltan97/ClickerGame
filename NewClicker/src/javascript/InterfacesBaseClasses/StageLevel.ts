import { IStageLevel } from "./IStageLevel";
import { StageLevelValueUpdateEvent } from "./ValueUpdateEvent";

export class StageLevel implements IStageLevel {
    private maxZone: number;
    public readonly StageName: string;
    private Zone: number;
    public readonly CurrentStage: number;
    private enemyDefeated: number;
    private valueUpdateEvents: ((e: StageLevelValueUpdateEvent) => void)[] = [];

    constructor(stage: number, name: string) {
        this.StageName = name;
        this.Zone = 1;
        this.maxZone = 1;
        this.CurrentStage = stage;
        this.enemyDefeated = 0;
    }

    get MaxZone(): number {
        return this.maxZone;
    }

    AddValueUpdateEvent(event: (e: StageLevelValueUpdateEvent) => void) {
        this.valueUpdateEvents.push(event);
    }

    Update(): void {
        this.valueUpdateEvents.forEach(x => x(new StageLevelValueUpdateEvent(this.CurrentZone, this.EnemyDefeated)));
    }

    IncreaseZone(isAuto:boolean): void {
        if (isAuto && this.Zone == this.maxZone) {
            this.maxZone += 1;            
            this.Zone += 1;
            this.enemyDefeated = 0;
            $("#village-zone-text").text(this.StageName + " - Zone " + this.Zone);
            $("#combat-text-left").text("Zone Status: " + (this.EnemyDefeated + 1) + "/10")
            this.Update();
        } else if (isAuto || this.Zone != this.maxZone) {
            this.Zone += 1;
            this.enemyDefeated = 0;
            $("#village-zone-text").text(this.StageName + " - Zone " + this.Zone);
            $("#combat-text-left").text("Zone Status: " + (this.EnemyDefeated + 1) + "/10")
            this.Update();
        }
    } 

    DecreaseZone(): void {
        if (this.Zone > 1) {
            this.Zone -= 1;
            this.enemyDefeated = 0;
            $("#village-zone-text").text(this.StageName + " - Zone " + this.Zone);
            $("#combat-text-left").text("Zone Status: " + (this.EnemyDefeated + 1) + "/10")
            this.Update();
        }
    } 

    IncreaseEnemyDefeated(): void {
        this.enemyDefeated += 1;
        if (this.EnemyDefeated == 10) {
            this.IncreaseZone(true);
            this.enemyDefeated = 0;
        }
        $("#combat-text-left").text("Zone Status: " + (this.EnemyDefeated + 1) + "/10")

        this.Update();
    }

    Birth(): void {
        $("#village-zone-text").text(this.StageName + " - Zone " + this.Zone);
        $("#combat-text-left").text("Zone Status: " + (this.EnemyDefeated + 1) + "/10")
    }

    get CurrentZone() {
        return this.Zone;
    }

    set CurrentZone(count: number) {
        this.Zone = count;
    }

    get EnemyDefeated() {
        return this.enemyDefeated;
    }

    set EnemyDefeated(count: number) {
        this.enemyDefeated = count;
    }
}