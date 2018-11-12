export interface IStageLevel {
    CurrentZone: number;
    readonly CurrentStage: number;
    EnemyDefeated: number;
    IncreaseZone(isAuto:boolean): void;
    DecreaseZone(): void;
    IncreaseEnemyDefeated(): void;
    Birth(): void;
}