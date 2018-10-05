export interface IExistence {
    readonly Count: number;
    Exist(count:number): void;
    Unexist(count:number): void;
    Unlocked(): void;
}