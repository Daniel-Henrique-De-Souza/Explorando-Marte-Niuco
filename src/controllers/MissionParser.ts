import { MAX_PLAIN_HEIGHT, MAX_PLAIN_WIDTH } from "../Statics";

export default class MissionParser {

    width: number = 1;
    height: number = 1;
    rovers: Rover[];
    constructor() {
        this.rovers = [];
    }

    parse(text: string) {
        if (text.trim().length == 0)
            return;

        let lines = text.split('\n');
        let params = lines.map(line => {
            return line.split(' ').filter(p => p.trim().length > 0);
        });

        if (params.length == 0)
            return;

        //Primeira linha define o tamanho do planalto
        if (params[0].length != 2)
            throw Error("Parâmetro para planalto inválido.");

        this.width = Number.parseInt(params[0][0]);
        this.height = Number.parseInt(params[0][1]);

        if (!Number.isInteger(this.width))
            throw Error(`Parâmetro para largura inválido: ${this.width}`);

        if (!Number.isInteger(this.height))
            throw Error(`Parâmetro para altura inválido: ${this.height}`);

        if (this.width > MAX_PLAIN_WIDTH || this.height > MAX_PLAIN_HEIGHT)
            throw Error("Valor para planalto excedeu o limite máximo permitido.");

        //Se a linha tiver 2 números e uma letra, é uma nova sonda
        let lineIndex = 1;
        while (lineIndex < params.length) {
            if (params[lineIndex].length == 3) {
                let initialParams = params[lineIndex];

                let initialX = Number.parseInt(initialParams[0]);
                let initialY = Number.parseInt(initialParams[1]);
                let initialDirection = initialParams[2].toUpperCase();

                if (!Number.isInteger(initialX))
                    throw Error(`Parâmetro para X inválido: ${initialParams[0]}`);

                if (!Number.isInteger(initialY))
                    throw Error(`Parâmetro para Y inválido: ${initialParams[1]}`);

                if (!["N", "S", "W", "E"].some(d => initialDirection === d))
                    throw Error(`Parâmetro para a direção inválido: ${initialParams[2]}`);

                if (this.rovers.some((r) => r.x == initialX && r.y == initialY) === true)
                    throw new Error(
                        `Há mais de um rover na posição: X: ${initialX} Y: ${initialY}`,
                    );

                let newRover = new Rover(initialX, initialY);
                newRover.direction = initialDirection;
                this.rovers.push(newRover);
                //Comandos para o rover
            } else if (params[lineIndex].length == 1) {
                if (this.rovers.length > 0) {
                    let commandString = params[lineIndex][0];
                    if (commandString.trim().length == 0) {
                        lineIndex++;
                        continue;
                    }

                    this.rovers[this.rovers.length - 1].commands = [...this.rovers[this.rovers.length - 1].commands, ...commandString.split('')];
                }
            }

            lineIndex++;
        }
    }

}