import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { Resource, Hero, Unit, Enemy } from "../BaseClass";
import { IPlayer } from "../IPlayer";
import { IStageLevel } from "../IStageLevel";
import { PlayerActiveSkill, PlayerPassiveSkill, Steal } from "./PlayerSkillsBaseClass";
import { HeroActiveSkill } from "./HeroSkillsBaseClass";
import { IStorage } from "../IStorage";

export interface ISkillFactory {

    Storage: IStorage;
    Player: IPlayer;
    Stage: IStageLevel;
    Resource: Resource[];
    Hero: Hero[];
    Unit: Unit[];
    Enemy: Enemy[];
    AllEnemy: Enemy[][];
    HeroActiveSkill: IActiveSkill[];

    CreateActive(type:string): IActiveSkill;
    CreatePassive(type: string): IPassiveSkill;
}