import Command from "./Command";
import type Commander from "../Commander";

export default class moveForwardCommand extends Command {

    execute(rover: any, sender: Commander): boolean {
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

        if (this.checkBounds(position, sender) && this.checkOtherRovers(position, sender)) {
            rover.x = position.x;
            rover.y = position.y;

            return true;
        }

        return false;
    }

    checkBounds(newPosition: any, commander: Commander): boolean {
        if (
            newPosition.x < 0 ||
            newPosition.x > commander.w ||
            newPosition.y < 0 ||
            newPosition.y > commander.h
        )
            throw new Error(
                `Nova posição do R${commander.currentRover + 1} inválida: X: ${newPosition.x} Y: ${newPosition.y}`,
            );

        return true;
    }

    checkOtherRovers(newPosition: any, commander: Commander): boolean {
        if (commander.rovers.some((r: any) => r.x === newPosition.x && r.y === newPosition.y))
            throw new Error(
                `Já existe um rover na posição: X: ${newPosition.x} Y: ${newPosition.y}`,
            );

        return true;
    }

}