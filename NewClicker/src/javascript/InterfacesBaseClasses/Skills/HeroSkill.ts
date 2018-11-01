//import { ISkillFactory } from "./ISkillFactory";
//import { IActiveSkill } from "./IActiveSkill";
//import { IPassiveSkill } from "./IPassiveSkill";
//import { HeroActiveSkill, HeroPassiveSkill } from "./HeroSkillsBaseClass";

//export class HeroSkill implements ISkillFactory {
//    CreateActive(type: string): IActiveSkill {
//        switch (type) {
//            case "": return new HeroActiveSkill();
//            default: throw new DOMException("No such Hero Active Skill");
//        }
//    };
//    CreatePassive(type: string): IPassiveSkill {
//        switch (type) {
//            case "": return new HeroPassiveSkill();
//            default: throw new DOMException("No such Hero Passive Skill");
//        }
//    };
//}