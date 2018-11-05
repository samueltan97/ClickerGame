import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { ISkillFactory } from "./ISkillFactory";

export interface IPassiveSkill {
    readonly name: string;
    readonly id: number;
    readonly Level: number;
    readonly isUnlocked: boolean;
    SkillFactory: ISkillFactory;
    LevelUp(): void;
    Unlock(): void;
    Action(): void;
}