export interface IMortality {
    readonly MaxHP: number;
    readonly CurrentHP: number;
    ReceiveDamage(damage: number): void;
    Die(): void;
    Birth(): void;
}