export interface IStageLevel {
    CurrentZone: number;
    readonly CurrentStage: number;
    EnemyDefeated: number;
    IncreaseZone(): void;
    IncreaseEnemyDefeated(): void;
}