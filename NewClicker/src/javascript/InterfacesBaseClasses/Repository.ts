import { Unit, Enemy } from "./BaseClass";
//import { Enemy } from "./InterfacesBaseClasses/Enemy";
import { IStorage } from "./IStorage";
import { IRepository } from "./IRepository";

export class Repository implements IRepository {

    storage: IStorage;

    constructor(database: IStorage) {
        this.storage = database;
    }

    

}