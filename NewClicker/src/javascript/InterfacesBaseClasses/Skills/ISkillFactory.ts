import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";

export interface ISkillFactory {
    CreateActive(type:string): IActiveSkill;
    CreatePassive(type: string): IPassiveSkill;
}