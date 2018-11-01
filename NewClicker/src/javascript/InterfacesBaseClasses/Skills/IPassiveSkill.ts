import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";

export interface IPassiveSkill {
    readonly name: string;
    readonly id: number;
    readonly Level: number;
    readonly isUnlocked: boolean;
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    AllEnemy: Enemy[][];
    LevelUp(): void;
    Unlock(): void;
}