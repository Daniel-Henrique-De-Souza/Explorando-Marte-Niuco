export default class MissionParser {

    width: number = 1;
    height: number = 1;
    rovers: any[];
    constructor() {
        this.rovers = [];
    }

    parse(text: string) {
        let lines = text.split('\n');
        let params = lines.map(line => {
            return line.split(' ');
        });

        //Primeira linha define o tamanho do planalto
        try {
            this.width = Number.parseInt(params[0][0]);
            this.height = Number.parseInt(params[0][1]);
        } catch (error: any) {
            throw Error("Tamanho do planalto inválido");
        }

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

                //TODO: Verificar se a direção também é válida

                this.rovers.push({ x: initialX, y: initialY, direction: initialDirection, commands: [] });
                //Comandos para o rover
            } else if (params[lineIndex].length == 1) {
                if (this.rovers.length > 0) {
                    let commandString = params[lineIndex][0];
                    if (commandString.trim().length == 0) {
                        lineIndex++;
                        continue;
                    }

                    this.rovers[this.rovers.length - 1].commands.push(commandString.split(''));
                }
            }

            lineIndex++;
        }
    }

}