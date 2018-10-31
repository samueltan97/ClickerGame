import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";

export interface IActiveSkill {
    readonly name: string;
    readonly id: number;
    readonly Level: number;
    readonly isUnlocked: boolean;
    readonly inCooldown: boolean;
    Cooldown: number;
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    CooldownCounter(): void;
    Action(input: number): void;
    LevelUp(): void;
    Unlock(): void;
}