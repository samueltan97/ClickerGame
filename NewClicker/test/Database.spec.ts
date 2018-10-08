import { Enemy } from "../src/javascript/InterfacesBaseClasses/BaseClass";
import { IDatabase } from "../src/javascript/InterfacesBaseClasses/IDatabase";
import { should } from "chai";

export function Database_Test() {
    describe("Database", () => {

        let EnemyArrCounter: number = 1;
        let StageOneEnemyArr: Enemy[] = [new Enemy(10, 10)];
        let StageTwoEnemyArr: Enemy[] = [];
        let StageThreeEnemyArr: Enemy[] = [];
        let StageFourEnemyArr: Enemy[] = [];
        let StageFiveEnemyArr: Enemy[] = [];
        let EnemyArr: Enemy[][] = [StageOneEnemyArr, StageTwoEnemyArr, StageThreeEnemyArr, StageFourEnemyArr, StageFiveEnemyArr];
        let CurrentEnemyArr: Enemy[] = StageOneEnemyArr;

        it("should return Enemy on the screen when run", () => {
            GetCurrentEnemy().should.equal(new Enemy(10, 10));
        });
    });
}