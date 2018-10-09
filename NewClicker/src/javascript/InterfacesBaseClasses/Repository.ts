import { Unit, Enemy } from "./Unit";
//import { Enemy } from "./InterfacesBaseClasses/Enemy";
import { IExistence } from "./IExistence";
import { IDatabase } from "./IDatabase";
import { IRepository } from "./IRepository";

export class Repository implements IRepository {

    readonly database: IDatabase;   

    constructor(database:IDatabase) {
        this.database = database;
    }

    GetCurrentEntity(type: string):any {
        if (type == "Enemy") {
            return this.database.CurrentEnemyArr[0];
        } else if (type == "Unit") {
            return this.database.CurrentUnit;
        }
    }

    RemoveByDeath(type: string): void {
        if (type == "Unit") {
            let isEmpty: boolean = true;
            for (let i = 0; i < this.database.UnitArr.length && isEmpty; i++) {
                for (let j = 0; j < this.database.UnitArr[i].length && isEmpty; j++) {
                    if (this.database.UnitArr[i][j].Count > 0) {
                        isEmpty = false;
                        this.database.UnitArr[i][j].Birth();
                        this.database.CurrentUnit = this.database.UnitArr[i][j];
                    }
                }
            }
            if (isEmpty) {
                this.database.CurrentPlayer.Birth();
                //include player as unit for enemy to face off
            }
        } else if (type == "Enemy") {
            this.database.CurrentEnemyArr.slice(1);
            if (!this.database.CurrentEnemyArr.length) {
                this.database.CurrentEnemyArr = this.database.EnemyArr[this.database.EnemyArrCounter % 5];
                this.database.EnemyArrCounter++;
            }
            this.database.CurrentEnemyArr[0].Birth();
        }
    }

    AddToArray(object: any, type: string, category: number): void {
        if (type == "Unit") {
            this.database.UnitArr[category].push(object);
        }
    }

}