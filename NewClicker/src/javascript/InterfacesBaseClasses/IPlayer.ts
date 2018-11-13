import { PlayerValueUpdateEvent } from "./ValueUpdateEvent";

export interface IPlayer {
    CurrentArmyVitality: number;
    CurrentDamage: number;
    CurrentLevel: number;
    ClickCount: number;
    SkillPoint: number;
    IncreaseArmyVitality(): void;
    AddHurtUpdateEvents(f: Function): void;
    AddValueUpdateEvent(e: (e: PlayerValueUpdateEvent) => void);
    LevelUp(): void;
    Hurt(): number;
    IncreaseSkillPoint(): void;
    DecreaseSkillPoint(): void;
}