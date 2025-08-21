import type Command from "./commands/Command";

export default class Commander {

    private availableCommands: Record<string, Command> = {};

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

    currentRover = 0;
    currentCommand = 0;
    start() {
        this.currentRover = this.currentCommand = 0;
        this.nextCommand();
    }

    nextCommand() {
        setTimeout(() => {
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

            if (this.currentRover < this.rovers.length) this.nextCommand();
        }, 1000);
    }

}