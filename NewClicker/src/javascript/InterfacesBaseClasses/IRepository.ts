import { IDatabase } from "./IDatabase";
import { Unit, Enemy } from "./BaseClass";

export interface IRepository {
    database: IDatabase;
    MainGameCycle(currentTime: number): void;
    RemoveByDeath(type: string): void;
    GetCurrentUnit(): Unit;
    GetCurrentEnemy(): Enemy;
}