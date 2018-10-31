﻿import { StageLevel } from "./StageLevel";
import { Player } from "./Player";

export class ValueUpdateEvent {

}

export class EnemyValueUpdateEvent extends ValueUpdateEvent{
    arrayId: number;
    id: number;
    newHP: number;
    newMaxHP: number;
    newIsDead: boolean;
    newResourceArray: number[];
    constructor(arrayId: number, id: number, hp: number, maxHP:number, resourceArray:number[]) {
        super();
        this.arrayId = arrayId;
        this.id = id;
        this.newHP = hp;
        this.newMaxHP = maxHP;
        this.newResourceArray = resourceArray;
        this.newIsDead = (this.newHP == 0) ? true : false;
    }
}

export class UnitValueUpdateEvent extends ValueUpdateEvent {
    id: number;
    newHP: number;
    newMaxHP: number;
    count:number
    newIsDead: boolean;
    isUnlocked: boolean;
    constructor(id: number, hp: number, maxHP:number, count:number, isUnlocked:boolean) {
        super();
        this.id = id;
        this.newHP = hp;
        this.newMaxHP = maxHP;
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
    newMaxHP: number;
    newIsDead: boolean;
    isUnlocked: boolean;
    newExperience: number;
    newMaxExperience: number;
    newLevel: number;
    constructor(id: number, hp: number, maxHP:number, isUnlocked: boolean, experience: number, maxExperience:number, level:number) {
        super();
        this.id = id;
        this.newHP = hp;
        this.newMaxHP = maxHP;
        this.newIsDead = (this.newHP == 0) ? true : false;
        this.isUnlocked = isUnlocked;
        this.newExperience = experience;
        this.newMaxExperience = maxExperience;
        this.newLevel = level;
    }
}

export class PlayerValueUpdateEvent extends ValueUpdateEvent {
    newExperience: number;
    newLevel: number;
    newArmyVitality: number;
    newDamage: number;
    newMaxExperience: number;
    newDPS: number;
    newClickCount: number;
    constructor(experience: number, level: number, armyVitality: number, damage: number, maxExperience:number, dps:number, clickCount:number) {
        super();
        this.newArmyVitality = armyVitality;
        this.newExperience = experience;
        this.newLevel = level;
        this.newDamage = damage;
        this.newMaxExperience = maxExperience;
        this.newDPS = dps;
        this.newClickCount = clickCount;
    }
}

export class StageLevelValueUpdateEvent extends ValueUpdateEvent  {
    newZone: number;
    newEnemyDefeated: number;
    constructor(zone: number, enemyDefeated:number) {
        super();
        this.newZone = zone;
        this.newEnemyDefeated = enemyDefeated;
    }
}