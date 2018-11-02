import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { ISkillFactory } from "./ISkillFactory";

export interface IActiveSkill {
    readonly name: string;
    readonly id: number;
    readonly Level: number;
    readonly isUnlocked: boolean;
    readonly inCooldown: boolean;
    Cooldown: number;
    SkillFactory: ISkillFactory;
    CooldownCounter(): void;
    Action(input: number): void;
    LevelUp(): void;
    Unlock(): void;
}