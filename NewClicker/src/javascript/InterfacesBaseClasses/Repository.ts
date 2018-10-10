import { Unit, Enemy } from "./BaseClass";
//import { Enemy } from "./InterfacesBaseClasses/Enemy";
import { IExistence } from "./IExistence";
import { IDatabase } from "./IDatabase";
import { IRepository } from "./IRepository";

export class Repository implements IRepository {

    readonly database: IDatabase;   

    constructor(database:IDatabase) {
        this.database = database;
    }

    

}