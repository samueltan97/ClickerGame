export interface ICombative {
    readonly BaseDamage: number; //Use counter to adjust DPS cos different units different damage in different seconds
    readonly CurrentDamage: number;
    Hurt(damage:number):void
}