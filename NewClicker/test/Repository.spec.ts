import { Enemy, Unit } from "../src/javascript/InterfacesBaseClasses/BaseClass";
import { IDatabase } from "../src/javascript/InterfacesBaseClasses/IDatabase";
import { should, expect } from "chai";
import { Player } from "../src/javascript/InterfacesBaseClasses/Player";
import { StageLevel } from "../src/javascript/InterfacesBaseClasses/StageLevel";
import { Repository } from "../src/javascript/InterfacesBaseClasses/Repository";
import { Mock, It, Times, ExpectedGetPropertyExpression } from 'moq.ts';

should();

describe("Repository", () => {

    var mock = new Mock<IDatabase>()
        .setup(m => m.CurrentEnemyArr)
        .returns([new Enemy(1, 1, new StageLevel(1))])

        .setup(m => m.CurrentPlayer)
        .returns(new Player(1))

        .setup(m => m.CurrentUnit)
        .returns(new Unit(1, "abc", "Warrior", 1, 1, 1, 1, new Player(1)))

        .setup(m => m.UnitArr)
        .returns([[new Unit(1, "abc", "Warrior", 1, 1, 1, 0, new Player(1)), new Unit(1, "abc", "Warrior", 1, 1, 1, 0, new Player(1))], [new Unit(1, "abc", "Mage", 1, 1, 1, 1, new Player(1)), new Unit(1, "abc", "Warrior", 1, 1, 1, 1, new Player(1))], [new Unit(1, "abc", "Warrior", 1, 1, 1, 5, new Player(1))], [], [], [], []])

        .setup(m => m.EnemyArr)
        .returns([[new Enemy(1, 1, new StageLevel(1))], [new Enemy(2, 2, new StageLevel(1)), new Enemy(2, 2, new StageLevel(1))], [new Enemy(3, 3, new StageLevel(1))], [], []])

        .setup(m => m.EnemyArrCounter)
        .returns(1)
    var repo = new Repository(mock.object());


    it("should get correct Enemy on the screen", () => {
        let expected = new Enemy(1, 1, new StageLevel(1));
        let actual = repo.GetCurrentEntity("Enemy");
        expect(expected).to.equal(actual);
    });
});
