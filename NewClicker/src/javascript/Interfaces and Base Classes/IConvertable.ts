export interface IConvertable {
    readonly CurrentDamage: number;
    Convert(damage: number): void
}