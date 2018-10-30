import { Player } from "../Player";
import { Resource, Hero, Unit } from "../BaseClass";
import { StageLevel } from "../StageLevel";

export interface IActiveSkill {
    readonly name: string;
    readonly id: number;
    readonly Level: number;
    readonly IsUnlocked: boolean;
    readonly InCooldown: boolean;
    readonly cooldown: number;
    player: Player;
    stage: StageLevel;
    resource: Resource[];
    hero: Hero[];
    unit: Unit[];
    CooldownCounter(): void;
    Action(): void;
    LevelUp(): void;
    Unlock(): void;
}