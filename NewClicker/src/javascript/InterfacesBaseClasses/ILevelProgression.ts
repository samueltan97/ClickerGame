export interface ILevelProgression {
    readonly MaxExperience: number;
    readonly CurrentLevel: number;
    readonly CurrentExperience: number;
    GainExperience(experience: number): void;
    LevelUp(): void;
}