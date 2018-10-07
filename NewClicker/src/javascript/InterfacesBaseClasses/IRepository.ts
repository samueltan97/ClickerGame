import { IDatabase } from "./IDatabase";

export interface IRepository {
    database: IDatabase;
    MainGameCycle(currentTime: number): void;

}