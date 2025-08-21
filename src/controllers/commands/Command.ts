import type Commander from "../Commander";

export default abstract class Command {
    abstract execute(rover: any, sender: Commander): boolean;
}