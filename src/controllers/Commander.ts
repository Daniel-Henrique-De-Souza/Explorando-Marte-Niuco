import type Command from "./commands/Command";

export default class Commander {

    availableCommands: Record<string, Command> = {};

    addCommand(letter: string, command: Command) {
        this.availableCommands[letter] = command;
    }

    w: number = 1;
    h: number = 1;
    loadPlain(width: number, height: number) {
        this.w = width;
        this.h = height;
    }

    rovers: any[] = [];
    loadRovers(rovers: any[]) {
        this.rovers = rovers;
    }

    private messageCallback?: any;
    setMessageListener(callback: any) {
        this.messageCallback = callback;
    }

    private nextCommandCallback?: any;
    setNextCommandListener(callback: any) {
        this.nextCommandCallback = callback;
    }

    currentRover = 0;
    currentCommand = 0;
    start() {
        this.currentRover = this.currentCommand = 0;
        //this.nextCommand();
        this.nextCommandCallback?.();
    }

    nextCommand() {
        let rover = this.rovers[this.currentRover];
        let command = rover.commands[this.currentCommand];

        if (!(command in this.availableCommands))
            throw new Error(`Comando inválido: ${command}. Comandos disponíveis: ${Object.keys(this.availableCommands).join(", ")}`);
        else {
            let success = this.availableCommands[command].execute(rover, this);
            if (success === false)
                throw new Error(`O comando '${command}' não foi bem sucedido.`);
        }

        this.currentCommand++;
        if (this.currentCommand >= rover.commands.length) {
            this.messageCallback?.(
                `Saída R${this.currentRover + 1}: ${rover.x} ${rover.y} ${rover.direction}`,
            );
            this.currentCommand = 0;
            this.currentRover++;
        }

        if (this.currentRover < this.rovers.length) this.nextCommandCallback?.();
    }

}