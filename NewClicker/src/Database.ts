import { NormalUnit } from './Classes/Dog'
import { IMortality } from './Interfaces/IMortality'


let armyVitality: number = 15;

let dogArr: NormalUnit[] = [new NormalUnit(5)];

setInterval(function () {
    let dog = new NormalUnit(5);
    dogArr.push(dog);
    console.log(getMaxHPUnit(dog));
}, 2000);

setInterval(function(){
    dogArr[0].receiveDamage(receiveBaseDamageUnit(1000));
    console.log(getCurrentHPUnit(dogArr[0]));
}, 500)

function getMaxHPUnit(object: IMortality):number {
    return object.maxHealth * armyVitality * 1000;
}

function getCurrentHPUnit(object: IMortality): number {
    return object.currentHealth * armyVitality * 1000;
}

function receiveBaseDamageUnit(originalDamage: number):number {
    return originalDamage / armyVitality / 1000;
}
