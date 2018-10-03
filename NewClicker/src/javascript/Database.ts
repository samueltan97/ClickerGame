import { Enemy } from "./Interfaces and Base Classes/Enemy";
import { Unit } from "./Interfaces and Base Classes/Unit";
import { Player } from "./Interfaces and Base Classes/Player";
import { StageLevel } from "./Interfaces and Base Classes/StageLevel";

export var thePlayer = new Player(1);
export var theStage = new StageLevel(1);
let EnemyArr: Enemy[] = [];
let UnitArr: Unit[] = [];
let counter: number = 0;

setInterval(function () {
        counter++;
        MainGameCycle(counter);
    },50);

function MainGameCycle(currentTime: number) {
    UnitArr.forEach(s => s.UpdateFeedback(currentTime));
    EnemyArr[0].UpdateFeedback(currentTime);
}

export function CurrentEnemy(): Enemy {
    return EnemyArr[0];
}

export function CurrentUnit(): Unit {
    return UnitArr[0];
}