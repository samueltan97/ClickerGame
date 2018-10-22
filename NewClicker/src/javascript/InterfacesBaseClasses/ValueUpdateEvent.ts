import { StageLevel } from "./StageLevel";
import { Player } from "./Player";

export class ValueUpdateEvent {

}

export class EnemyValueUpdateEvent extends ValueUpdateEvent{
    arrayId: number;
    id: number;
    newHP: number;
    newIsDead: boolean;
    constructor(arrayId: number, id: number, hp: number) {
        super();
        this.arrayId = arrayId;
        this.id = id;
        this.newHP = hp;
        this.newIsDead = (this.newHP == 0) ? true : false;
    }
}

export class UnitValueUpdateEvent extends ValueUpdateEvent {
    id: number;
    newHP: number;
    count:number
    newIsDead: boolean;
    isUnlocked: boolean;
    constructor(id: number, hp: number, count:number, isUnlocked:boolean) {
        super();
        this.id = id;
        this.newHP = hp;
        this.count = count;
        this.newIsDead = (this.newHP == 0) ? true : false;
        this.isUnlocked = isUnlocked;
    }
}

export class ResourceValueUpdateEvent extends ValueUpdateEvent {
    id: number;
    count: number;
    isUnlocked: boolean;
    constructor(id: number, count: number, isUnlocked: boolean) {
        super();
        this.id = id;
        this.count = count;
        this.isUnlocked = isUnlocked;
    }
}

export class RefinerTrainerValueUpdateEvent extends ValueUpdateEvent{
    id: number;
    count: number;
    isUnlocked: boolean;
    constructor(id: number, count: number, isUnlocked: boolean) {
        super();
        this.id = id;
        this.count = count;
        this.isUnlocked = isUnlocked;
    }
}

export class HeroValueUpdateEvent extends ValueUpdateEvent {
    id: number;
    newHP: number;
    newIsDead: boolean;
    isUnlocked: boolean;
    newExperience: number;
    newLevel: number;
    constructor(id: number, hp: number, isUnlocked: boolean, experience: number, level:number) {
        super();
        this.id = id;
        this.newHP = hp;
        this.newIsDead = (this.newHP == 0) ? true : false;
        this.isUnlocked = isUnlocked;
        this.newExperience = experience;
        this.newLevel = level;
    }
}

export class PlayerValueUpdateEvent extends ValueUpdateEvent {
    newExperience: number;
    newLevel: number;
    newArmyVitality: number;
    constructor(experience: number, level: number, armyVitality:number) {
        super();
        this.newArmyVitality = armyVitality;
        this.newExperience = experience;
        this.newLevel = level;
    }
}

export class StageLevelValueUpdateEvent extends ValueUpdateEvent  {
    newLevel: number;
    constructor(level: number) {
        super();
        this.newLevel = level;
    }
}