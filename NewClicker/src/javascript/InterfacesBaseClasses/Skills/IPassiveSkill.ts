export interface IPassiveSkill {
    name: string;
    id: number;
    level: number;
    isUnlocked: boolean;
    IntervalAction(count: number): void;
    LevelUp(): void;
    Unlock();
}