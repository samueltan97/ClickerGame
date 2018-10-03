interface ICombative extends IExistence {
    Exist(): void;
    Unexist(): void;
    Unlocked(): void;
    Hurt(Alive: object, Damage: number): void;
    GetHurt?(Damage: number): void;
    }