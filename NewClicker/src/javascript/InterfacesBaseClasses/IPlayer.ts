import { PlayerValueUpdateEvent } from "./ValueUpdateEvent";

export interface IPlayer {
    CurrentArmyVitality: number;
    CurrentDamage: number;
    CurrentLevel: number;
    ClickCount: number;
    IncreaseArmyVitality(): void;
    AddHurtUpdateEvents(f: Function): void;
    AddValueUpdateEvent(e: (e: PlayerValueUpdateEvent) => void);
    LevelUp(): void;
    Hurt(): number;
}