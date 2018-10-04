export interface IMortality {
    readonly BaseHP: number;
    readonly MaxHP: number;
    readonly CurrentHP: number;
    GetMaxHP(): number;
    GetCurrentHP(): number;
    ReceiveDamage(damage: number): void;
    Die(): void;
}