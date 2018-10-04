import { Enemy } from "./Interfaces and Base Classes/Enemy";
import { Unit } from "./Interfaces and Base Classes/Unit";
import { Player } from "./Interfaces and Base Classes/Player";
import { StageLevel } from "./Interfaces and Base Classes/StageLevel";
import { IExistence } from "./Interfaces and Base Classes/IExistence";

export var thePlayer = new Player(1);
export var theStage = new StageLevel(1);
let EnemyArr: Enemy[] = []; //Will be a pointer that points to 5 different arrays with 
let UnitArr: Unit[][] = []; //will have arrays inside organised according to increasing range before Heroes and then finally the Player
let counter: number = 0;

setInterval(function () {
        counter++;
        MainGameCycle(counter);
    },50);

function MainGameCycle(currentTime: number): void {
    //Interactions for Units and Enemies
    UnitArr.forEach(s => s.forEach(u => u.UpdateFeedback(currentTime)));
    EnemyArr[0].UpdateFeedback(currentTime);
}

export function GetCurrentEnemy(): Enemy {
    return EnemyArr[0];
}

export function GetCurrentUnit(): Unit {
    return UnitArr[0][0];
}

export function RemoveFromArray(type:string, category:number): void {
    if (type == "Unit") {
        UnitArr[category].splice(0);
        if (!UnitArr[category].length) {
            UnitArr[category + 1][0].Birth()
        } else {
            UnitArr[0][0].Birth();
        }
        //Heroes and Player should be arrays in UnitArr?
    } else if (type == "Enemy") {
        EnemyArr.splice(0);
        EnemyArr[0].Birth();
        //if EnemyArr is empty, swap EnemyArr to next stage and increase level
    }
}

export function AddToArray(object: any, type: string, category: number): void {
    if (type == "Unit") {
        UnitArr[category].push(object);
    }
}
