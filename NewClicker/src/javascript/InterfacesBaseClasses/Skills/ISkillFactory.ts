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
    HeroActiveSkill: IActiveSkill[];
    CreatePlayerActive(type:string): IActiveSkill;
    CreatePlayerPassive(type: string): IPassiveSkill;
    CreateHeroActive(type:string): IActiveSkill;
    CreateHeroPassive(type: string): IPassiveSkill;
}