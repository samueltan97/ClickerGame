import { PlayerValueUpdateEvent } from "./ValueUpdateEvent";

export interface IPlayer {
    CurrentArmyVitality: number;
    CurrentDamage: number;
    CurrentDPS: number;
    CurrentLevel: number;
    ClickCount: number;
    AddHurtUpdateEvents(f: Function): void;
    AddValueUpdateEvent(e: (e: PlayerValueUpdateEvent) => void);
}