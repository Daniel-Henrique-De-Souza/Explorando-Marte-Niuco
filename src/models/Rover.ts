export default class Rover {

    x: number;
    y: number;
    direction: string = "N";
    commands: [] = [];
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}