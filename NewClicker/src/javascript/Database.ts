//import { Unit, Enemy } from "./InterfacesBaseClasses/Unit";
import { Unit, Enemy } from "./InterfacesBaseClasses/Enemy";
import { Player } from "./InterfacesBaseClasses/Player";
import { StageLevel } from "./InterfacesBaseClasses/StageLevel";
import { IExistence } from "./InterfacesBaseClasses/IExistence";

export var thePlayer = new Player(1);
export var theStage = new StageLevel(1);

console.log(Enemy);
console.log(Unit);
console.log(Player);

let EnemyArrCounter: number = 1;
let StageOneEnemyArr: Enemy[] = [new Enemy(5, 5)];
let StageTwoEnemyArr: Enemy[] = [new Enemy(5, 5)];
let StageThreeEnemyArr: Enemy[] = [new Enemy(5, 5)];
let StageFourEnemyArr: Enemy[] = [new Enemy(5, 5)];
let StageFiveEnemyArr: Enemy[] = [new Enemy(5, 5)];
let EnemyArr: Enemy[][] = [StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr, StageFiveEnemyArr];
let CurrentEnemyArr: Enemy[] = StageOneEnemyArr; //Will point to 5 different arrays with 

let RangeOneUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let RangeTwoUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let RangeThreeUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let RangeFourUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let RangeFiveUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let RangeSixUnitArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let HeroArr: Unit[] = [new Unit(0, "abc", "abc", 123, 123, 123)];
let UnitArr: Unit[][] = [RangeOneUnitArr, RangeTwoUnitArr, RangeThreeUnitArr, RangeFourUnitArr, RangeFiveUnitArr, RangeSixUnitArr, HeroArr]; //will have arrays inside organised according to increasing range before Heroes
let CurrentUnit: Unit;
let counter: number = 0;

setInterval(function () {
    counter++;
    MainGameCycle(counter);
}, 50);

function MainGameCycle(currentTime: number): void {
    //Interactions for Units and Enemies
    UnitArr.forEach(s => s.forEach(u => u.UpdateFeedback(currentTime)));
    CurrentEnemyArr[0].UpdateFeedback(currentTime);
}

export function GetCurrentEnemy(): Enemy {
    return CurrentEnemyArr[0];
}

export function GetCurrentUnit(): Unit {
    return CurrentUnit;
}

export function RemoveByDeath(type: string): void {
    if (type == "Unit") {
        let isEmpty: boolean = true;
        for (let i = 0; i < UnitArr.length && isEmpty; i++) {
            for (let j = 0; j < UnitArr[i].length && isEmpty; j++) {
                if (UnitArr[i][j].Count > 0) {
                    isEmpty = false;
                    UnitArr[i][j].Birth();
                    CurrentUnit = UnitArr[i][j];
                }
            }
        }
        if (isEmpty) {
            thePlayer.Birth();
            //include player as unit for enemy to face off
        }
    } else if (type == "Enemy") {
        CurrentEnemyArr.slice(1);
        if (!CurrentEnemyArr.length) {
            CurrentEnemyArr = EnemyArr[EnemyArrCounter % 5];
            EnemyArrCounter++;
        }
        CurrentEnemyArr[0].Birth();
    }
}

export function AddToArray(object: any, type: string, category: number): void {
    if (type == "Unit") {
        UnitArr[category].push(object);
    }
}
