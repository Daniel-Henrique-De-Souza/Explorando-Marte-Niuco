import { DIRECTIONS } from "../../Statics";
import Command from "./Command";
import type Commander from "../Commander";

export default class TurnLeftCommand extends Command {

    execute(rover: any, _: Commander): boolean {
        let newDir = DIRECTIONS.indexOf(rover.direction) - 1;
        if (newDir < 0) newDir = 3;
        rover.direction = DIRECTIONS[newDir];
        return true;
    }

}