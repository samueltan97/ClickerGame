import { ISkillFactory } from "./ISkillFactory";
import { IActiveSkill } from "./IActiveSkill";
import { IPassiveSkill } from "./IPassiveSkill";
import { PlayerActiveSkill, PlayerPassiveSkill } from "./PlayerSkillsBaseClass";

export class PlayerSkill implements ISkillFactory {
    CreateActive(type: string): IActiveSkill {
        switch (type) {
            case "": return new PlayerActiveSkill();
            default: throw new DOMException("No such Player Active Skill");
        }
    };
    CreatePassive(type: string): IPassiveSkill {
        switch (type) {
            case "": return new PlayerPassiveSkill();
            default: throw new DOMException("No such Player Passive Skill");
        }
    };
}