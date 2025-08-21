import { it, expect, describe, vi } from "vitest"
import Commander from "../../src/controllers/Commander";
import TurnLeftCommand from "../../src/controllers/commands/TurnLeftCommand";
import Rover from "../../src/models/Rover";

describe("add command test", () => {
    it("will add turn left command in commands list", () => {
        //Arrange
        let commander = new Commander();
        commander.addCommand("L", new TurnLeftCommand());

        //Act
        //Assert
        expect("L" in commander.availableCommands).toBe(true);
    });
});

describe("load plain test", () => {
    it("width will be 5", () => {
        //Arrange
        let commander = new Commander();

        //Act
        commander.loadPlain(5, 0);

        //Assert
        expect(commander.w).toBe(5);
    });
    it("height will be 5", () => {
        //Arrange
        let commander = new Commander();

        //Act
        commander.loadPlain(0, 5);

        //Assert
        expect(commander.h).toBe(5);
    });
});

describe("load rover test", () => {
    it("will have 10 rovers", () => {
        //Arrange
        let commander = new Commander();
        let rovers = Array(10);

        //Act
        commander.loadRovers(rovers);

        //Assert
        expect(commander.rovers.length).toBe(10);
    });
});

describe("start function test", () => {
    it("will reset the rover index", () => {
        //Arrange
        let commander = new Commander();
        commander.addCommand("L", new TurnLeftCommand());
        let rover = new Rover(0, 0);
        rover.commands = ["L"];

        //Act
        commander.loadRovers([rover]);
        commander.currentRover = 5;
        commander.start();

        //Assert
        expect(commander.currentRover).toBe(1);
    });
    it("will reset the command index", () => {
        //Arrange
        let commander = new Commander();
        commander.addCommand("L", new TurnLeftCommand());
        let rover = new Rover(0, 0);
        rover.commands = ["L"];

        //Act
        commander.loadRovers([rover]);
        commander.currentCommand = 10;
        commander.start();

        //Assert
        expect(commander.currentCommand).toBe(0);
    });
});

describe("next command test", () => {
    it("will throw invalid command error", () => {
        //Arrange
        let commander = new Commander();
        let rover = new Rover(0, 0);
        rover.commands = ["L"];

        //Act
        commander.loadRovers([rover]);

        //Assert
        expect(() => commander.nextCommand()).toThrowError();
    });
});