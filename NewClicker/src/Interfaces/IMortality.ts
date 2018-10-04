export interface IMortality {
    readonly maxHealth: number;
    readonly currentHealth: number;
    receiveDamage(damage: number): void;
}