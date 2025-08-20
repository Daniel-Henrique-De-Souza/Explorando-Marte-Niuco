import { it, expect, describe } from "vitest"
import Rover from "../../src/models/Rover";
import Commander from "../../src/controllers/Commander";

describe("turn rover left test", () => {
    it("will change from N to W", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);

        //Act
        commander.turnLeft(rover);

        //Assert
        expect(rover.direction).toBe("W");
    });
    it("will change from W to S", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "W";

        //Act
        commander.turnLeft(rover);

        //Assert
        expect(rover.direction).toBe("S");
    });
    it("will change from S to E", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "S";

        //Act
        commander.turnLeft(rover);

        //Assert
        expect(rover.direction).toBe("E");
    });
    it("will change from E to N", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "E";

        //Act
        commander.turnLeft(rover);

        //Assert
        expect(rover.direction).toBe("N");
    });
});

describe("turn rover right test", () => {
    it("will change from N to E", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);

        //Act
        commander.turnRight(rover);

        //Assert
        expect(rover.direction).toBe("E");
    });
    it("will change from E to S", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "E";

        //Act
        commander.turnRight(rover);

        //Assert
        expect(rover.direction).toBe("S");
    });
    it("will change from S to W", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "S";

        //Act
        commander.turnRight(rover);

        //Assert
        expect(rover.direction).toBe("W");
    });
    it("will change from W to N", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "W";

        //Act
        commander.turnRight(rover);

        //Assert
        expect(rover.direction).toBe("N");
    });
});

describe("move forward test", () => {
    it("will move one step in N", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);

        //Act
        commander.moveForward(rover);

        //Assert
        expect(rover.y).toBe(1);
    });
    it("will move one step in E", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "E";

        //Act
        commander.moveForward(rover);

        //Assert
        expect(rover.x).toBe(1);
    });
    it("will move one step in S", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 1);
        rover.direction = "S";

        //Act
        commander.moveForward(rover);

        //Assert
        expect(rover.y).toBe(0);
    });
    it("will move one step in W", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(1, 0);
        rover.direction = "W";

        //Act
        commander.moveForward(rover);

        //Assert
        expect(rover.x).toBe(0);
    });
    it("will not move one step in N", () => {
        //Arrange
        let commander = new Commander();
        commander.loadPlain(1, 1);
        let rover = new Rover(1, 1);

        //Act
        //Assert
        expect(() => commander.moveForward(rover)).toThrowError(/^Nova posição/g);
    });
    it("will not move one step in S", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "S";

        //Act
        //Assert
        expect(() => commander.moveForward(rover)).toThrowError(/^Nova posição/g);
    });
    it("will not move one step in W", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.direction = "W";

        //Act
        //Assert
        expect(() => commander.moveForward(rover)).toThrowError(/^Nova posição/g);
    });
    it("will not move one step in E", () => {
        //Arrange
        let commander = new Commander();
        commander.loadPlain(1, 1);
        let rover = new Rover(1, 1);
        rover.direction = "E";

        //Act
        //Assert
        expect(() => commander.moveForward(rover)).toThrowError(/^Nova posição/g);
    });
});

describe("check bounds test", () => {
    it("will not throw error", () => {
        //Arrange
        let commander = new Commander();
        commander.loadPlain(0, 0);

        //Act
        //Assert
        expect(() => commander.checkBounds({ x: 0, y: 0 })).not.toThrowError();
    });
    it("X will throw error", () => {
        //Arrange
        let commander = new Commander();
        commander.loadPlain(1, 1);

        //Act
        //Assert
        expect(() => commander.checkBounds({ x: 2, y: 0 })).toThrowError();
    });
    it("Y will throw error", () => {
        //Arrange
        let commander = new Commander();
        commander.loadPlain(1, 1);

        //Act
        //Assert
        expect(() => commander.checkBounds({ x: 0, y: 2 })).toThrowError();
    });
});

describe("check other rovers test", () => {
    it("will not throw error", () => {
        //Arrange
        let rover1 = new Rover(0, 0);
        let rover2 = new Rover(0, 1);

        let commander = new Commander();
        commander.loadRovers([rover1, rover2]);

        expect(() => commander.checkOtherRovers({ x: 1, y: 0 })).not.toThrowError();
    });
    it("will throw error", () => {
        //Arrange
        let rover1 = new Rover(0, 0);
        let rover2 = new Rover(0, 1);

        let commander = new Commander();
        commander.loadRovers([rover1, rover2]);

        expect(() => commander.checkOtherRovers({ x: 0, y: 1 })).toThrowError();
    });
});