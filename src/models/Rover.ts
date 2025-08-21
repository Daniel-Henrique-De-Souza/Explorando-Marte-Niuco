export default class Rover {

    x: number;
    y: number;
    direction: string = "N";
    commands: string[] = [];
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toDict() {
        return { x: this.x, y: this.y, direction: this.direction, commands: this.commands };
    }

}