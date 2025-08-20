import Rover from "../models/Rover";

export default class Commander {

    private w: number = 1;
    private h: number = 1;
    loadPlain(width: number, height: number) {
        this.w = width;
        this.h = height;
    }

    private rovers: Rover[] = [];
    loadRovers(rovers: Rover[]) {
        this.rovers = rovers;
    }

    private messageCallback?: any;
    setMessageListener(callback: any) {
        this.messageCallback = callback;
    }

    private directions = ["N", "E", "S", "W"];
    private currentRover = 0;
    private currentCommand = 0;
    start() {
        this.currentRover = this.currentCommand = 0;
        this.nextCommand();
    }

    nextCommand() {
        setTimeout(() => {
            let rover = this.rovers[this.currentRover];
            let command = rover.commands[this.currentCommand];

            switch (command) {
                case "L":
                    this.turnLeft(rover);
                    break;
                case "R":
                    this.turnRight(rover);
                    break;
                case "M":
                    try {
                        this.moveForward(rover);
                    } catch (error) {
                        if (error instanceof Error)
                            this.messageCallback?.(error.message);
                        return;
                    }
                    break;
            }

            this.currentCommand++;
            if (this.currentCommand >= rover.commands.length) {
                this.messageCallback?.(
                    `Saída R${this.currentRover + 1}: ${rover.x} ${rover.y} ${rover.direction}`,
                );
                this.currentCommand = 0;
                this.currentRover++;
            }

            if (this.currentRover < this.rovers.length) this.nextCommand();
        }, 1000);
    }

    turnLeft(rover: Rover) {
        let newDir = this.directions.indexOf(rover.direction) - 1;
        if (newDir < 0) newDir = 3;
        rover.direction = this.directions[newDir];
    }

    turnRight(rover: Rover) {
        let newDir = this.directions.indexOf(rover.direction) + 1;
        if (newDir > 3) newDir = 0;
        rover.direction = this.directions[newDir];
    }

    moveForward(rover: Rover) {
        let position = { x: rover.x, y: rover.y };

        switch (rover.direction) {
            case "N":
                position.y++;
                break;
            case "S":
                position.y--;
                break;
            case "W":
                position.x--;
                break;
            case "E":
                position.x++;
                break;
        }

        if (this.checkBounds(position) && this.checkOtherRovers(position)) {
            rover.x = position.x;
            rover.y = position.y;
        }
    }

    checkBounds(newPosition: any): boolean {
        if (
            newPosition.x < 0 ||
            newPosition.x > this.w ||
            newPosition.y < 0 ||
            newPosition.y > this.h
        )
            throw new Error(
                `Nova posição do R${this.currentRover + 1} inválida: X: ${newPosition.x} Y: ${newPosition.y}`,
            );

        return true;
    }

    checkOtherRovers(newPosition: any): boolean {
        if (this.rovers.some((r: Rover) => r.x === newPosition.x && r.y === newPosition.y))
            throw new Error(
                `Já existe um rover na posição: X: ${newPosition.x} Y: ${newPosition.y}`,
            );

        return true;
    }

}