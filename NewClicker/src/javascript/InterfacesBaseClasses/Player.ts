
//Take note that player extends Unit for now to set it as a posssible current Unit for battle with the enemy
export class Player {
    ArmyVitality: number;

    constructor(armyVitality: number) {
        this.ArmyVitality = armyVitality;
    }

    Birth(): void {

    }
}