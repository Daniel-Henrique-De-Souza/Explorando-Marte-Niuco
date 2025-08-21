import { it, expect, describe } from "vitest"
import Commander from "../../src/controllers/Commander";
import TurnLeftCommand from "../../src/controllers/commands/TurnLeftCommand";

describe("add command test", () => {
    it("will add turn left command in commands list", () => {
        let commander = new Commander();
        commander.addCommand("L", new TurnLeftCommand());

        expect("L" in commander.availableCommands).toBe(true);
    });
});
//TODO: Load plain
//TODO: load rovers
//TODO: start
//TODO: next command