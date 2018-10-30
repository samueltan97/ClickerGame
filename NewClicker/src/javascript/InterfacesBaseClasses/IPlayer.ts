export interface IPlayer {
    readonly CurrentArmyVitality: number;
    ChangeArmyVitality(count: number): void;
    ChangeLevel(count: number): void;
}