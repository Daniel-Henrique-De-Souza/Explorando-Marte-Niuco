import { it, expect, describe } from "vitest"
import Commander from "../../../src/controllers/Commander";
import TurnRightCommand from "../../../src/controllers/commands/TurnRightCommand";
import Rover from "../../../src/models/Rover";

describe("turn rover right test", () => {
    it("will change from N to E", () => {
        //Arrange
        let commander = new Commander();
        let turnRight = new TurnRightCommand();
        let rover = new Rover(0, 0).toDict();

        //Act
        turnRight.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("E");
    });
    it("will change from E to S", () => {
        //Arrange
        let commander = new Commander();
        let turnRight = new TurnRightCommand();
        let rover = new Rover(0, 0).toDict();
        rover.direction = "E";

        //Act
        turnRight.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("S");
    });
    it("will change from S to W", () => {
        //Arrange
        let commander = new Commander();
        let turnRight = new TurnRightCommand();
        let rover = new Rover(0, 0).toDict();
        rover.direction = "S";

        //Act
        turnRight.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("W");
    });
    it("will change from W to N", () => {
        //Arrange
        let commander = new Commander();
        let turnRight = new TurnRightCommand();
        let rover = new Rover(0, 0).toDict();
        rover.direction = "W";

        //Act
        turnRight.execute(rover, commander);

        //Assert
        expect(rover.direction).toBe("N");
    });
});