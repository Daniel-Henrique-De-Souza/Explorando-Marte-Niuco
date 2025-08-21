import { it, expect, describe } from "vitest"
import Commander from "../../../src/controllers/Commander";
import TurnLeftCommand from "../../../src/controllers/commands/TurnLeftCommand";
import Rover from "../../../src/models/Rover";

describe("turn rover left test", () => {
    it("will change from N to W", () => {
        //Arrange
        let commander = new Commander();
        let turnLeft = new TurnLeftCommand();
        let rover = new Rover(0, 0).toDict();

        //Act
        turnLeft.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("W");
    });
    it("will change from W to S", () => {
        //Arrange
        let commander = new Commander();
        let turnLeft = new TurnLeftCommand();
        let rover = new Rover(0, 0).toDict();
        rover.direction = "W";

        //Act
        turnLeft.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("S");
    });
    it("will change from S to E", () => {
        //Arrange
        let commander = new Commander();
        let turnLeft = new TurnLeftCommand();
        let rover = new Rover(0, 0).toDict();
        rover.direction = "S";

        //Act
        turnLeft.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("E");
    });
    it("will change from E to N", () => {
        //Arrange
        let commander = new Commander();
        let turnLeft = new TurnLeftCommand();
        let rover = new Rover(0, 0).toDict();
        rover.direction = "E";

        //Act
        turnLeft.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("N");
    });
});