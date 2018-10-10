import { IPlayer } from "./IPlayer";

//Take note that player extends Unit for now to set it as a posssible current Unit for battle with the enemy
export class Player implements IPlayer{

    private ArmyVitality: number;

    constructor(armyVitality: number) {
        this.ArmyVitality = armyVitality;
    }

    Birth() {

    }

    get CurrentArmyVitality() {
        return this.ArmyVitality;
    }
}