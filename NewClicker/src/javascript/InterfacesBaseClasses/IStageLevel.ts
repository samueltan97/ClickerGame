export interface IStageLevel {
    readonly CurrentZone: number;
    readonly CurrentStage: number;
    readonly EnemyDefeated: number;
    IncreaseZone(count: number): void;
    IncreaseEnemyDefeated(count: number): void;
}