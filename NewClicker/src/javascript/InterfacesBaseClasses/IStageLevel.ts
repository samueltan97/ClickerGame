export interface IStageLevel {
    readonly CurrentZone: number;
    readonly CurrentStage: number;
    readonly EnemyDefeated: number;
    IncreaseZone(): void;
    IncreaseEnemyDefeated(): void;
    ChangeZone(count: number): void;
    ChangeEnemyDefeated(count: number): void;
}