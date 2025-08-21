import { it, expect, describe } from "vitest"
import Commander from "../../../src/controllers/Commander";
import MoveForwardCommand from "../../../src/controllers/commands/MoveForwardCommand";
import Rover from "../../../src/models/Rover";

describe("move forward test", () => {
    it("will move one step in N", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        let rover = new Rover(0, 0);

        //Act
        moveForward.execute(rover, commander);

        //Assert
        expect(rover.y).toBe(1);
    });
    it("will move one step in E", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        let rover = new Rover(0, 0);
        rover.direction = "E";

        //Act
        moveForward.execute(rover, commander);

        //Assert
        expect(rover.x).toBe(1);
    });
    it("will move one step in S", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        let rover = new Rover(0, 1);
        rover.direction = "S";

        //Act
        moveForward.execute(rover, commander);

        //Assert
        expect(rover.y).toBe(0);
    });
    it("will move one step in W", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        let rover = new Rover(1, 0);
        rover.direction = "W";

        //Act
        moveForward.execute(rover, commander);

        //Assert
        expect(rover.x).toBe(0);
    });
    it("will not move one step in N", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadPlain(1, 1);
        let rover = new Rover(1, 1);

        //Act
        //Assert
        expect(() => moveForward.execute(rover, commander)).toThrowError(/^Nova posição/g);
    });
    it("will not move one step in S", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        let rover = new Rover(0, 0);
        rover.direction = "S";

        //Act
        //Assert
        expect(() => moveForward.execute(rover, commander)).toThrowError(/^Nova posição/g);
    });
    it("will not move one step in W", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        let rover = new Rover(0, 0);
        rover.direction = "W";

        //Act
        //Assert
        expect(() => moveForward.execute(rover, commander)).toThrowError(/^Nova posição/g);
    });
    it("will not move one step in E", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadPlain(1, 1);
        let rover = new Rover(1, 1);
        rover.direction = "E";

        //Act
        //Assert
        expect(() => moveForward.execute(rover, commander)).toThrowError(/^Nova posição/g);
    });
});

describe("check bounds test", () => {
    it("will not throw error", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadPlain(0, 0);

        //Act
        //Assert
        expect(() => moveForward.checkBounds({ x: 0, y: 0 }, commander)).not.toThrowError();
    });
    it("X will throw error", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadPlain(1, 1);

        //Act
        //Assert
        expect(() => moveForward.checkBounds({ x: 2, y: 0 }, commander)).toThrowError();
    });
    it("Y will throw error", () => {
        //Arrange
        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadPlain(1, 1);

        //Act
        //Assert
        expect(() => moveForward.checkBounds({ x: 0, y: 2 }, commander)).toThrowError();
    });
});

describe("check other rovers test", () => {
    it("will not throw error", () => {
        //Arrange
        let rover1 = new Rover(0, 0);
        let rover2 = new Rover(0, 1);

        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadRovers([rover1, rover2]);

        expect(() => moveForward.checkOtherRovers({ x: 1, y: 0 }, commander)).not.toThrowError();
    });
    it("will throw error", () => {
        //Arrange
        let rover1 = new Rover(0, 0);
        let rover2 = new Rover(0, 1);

        let commander = new Commander();
        let moveForward = new MoveForwardCommand();
        commander.loadRovers([rover1, rover2]);

        expect(() => moveForward.checkOtherRovers({ x: 0, y: 1 }, commander)).toThrowError();
    });
});