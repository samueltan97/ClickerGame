export interface ICountable {
    readonly Count: number;
    Increase(count: number): void;
    Decrease(count: number): void;
    readonly ProducedHistory: number;
}