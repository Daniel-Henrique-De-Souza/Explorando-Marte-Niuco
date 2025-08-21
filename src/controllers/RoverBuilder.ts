import Rover from "../models/Rover";
import type IBuilder from "./IBuilder";

export default class RoverBuilder implements IBuilder {

    private newRover: Rover = new Rover(0, 0);
    new() {
        this.newRover = new Rover(0, 0);
        return this;
    }

    setPosition(x: number, y: number) {
        if (this.newRover !== undefined) {
            this.newRover.x = x;
            this.newRover.y = y;
        }
        return this;
    }

    setDirection(direction: string) {
        if (this.newRover !== undefined)
            this.newRover.direction = direction;

        return this;
    }

    setCommands(commands: string[]) {
        if (this.newRover !== undefined)
            this.newRover.commands = commands;

        return this;
    }

    build(): Rover {
        return this.newRover;
    }

}