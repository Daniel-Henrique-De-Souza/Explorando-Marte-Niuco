import type Rover from "./models/Rover";

export function getRotationDegree(rover: Rover) {
    switch (rover.direction) {
        case "E":
            return 90;
        case "S":
            return 180;
        case "W":
            return 270;
    }

    return 0;
}