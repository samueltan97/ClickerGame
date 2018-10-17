export interface IResource {
    readonly Count: number;
    Increase(count: number): void;
    Decrease(count: number): void;
}