<script lang="ts">
    import { onMount } from "svelte";
    import MissionParser from "../controllers/MissionParser";

    let messages: string[] = $state([]);

    let w = $state(5);
    let h = $state(5);

    let rovers: any[] = $state([]);

    let commands = $state("");

    function sendMission() {
        try {
            let parser = new MissionParser();
            parser.parse(commands);

            w = parser.width;
            h = parser.height;
            rovers = parser.rovers;

            currentRover = currentCommand = 0;

            nextCommand();
        } catch (error) {
            if (error instanceof Error) sendMessage(error.message);
            console.error(error);
        }
    }

    let currentRover = 0;
    let currentCommand = 0;
    function nextCommand() {
        setTimeout(() => {
            let rover = rovers[currentRover];
            let command = rover.commands[currentCommand];

            switch (command) {
                case "L":
                    turnLeft(rover);
                    break;
                case "R":
                    turnRight(rover);
                    break;
                case "M":
                    try {
                        moveForward(rover);
                    } catch (error) {
                        if (error instanceof Error)
                            sendMessage(error.message);
                        return;
                    }
                    break;
            }

            currentCommand++;
            if (currentCommand >= rover.commands.length) {
                sendMessage(
                    `Saída R${currentRover + 1}: ${rover.x} ${rover.y} ${rover.direction}`,
                );
                currentCommand = 0;
                currentRover++;
            }

            if (currentRover < rovers.length) nextCommand();
        }, 1000);
    }

    let directions = ["N", "E", "S", "W"];

    function turnLeft(rover: any) {
        let newDir = directions.indexOf(rover.direction) - 1;
        if (newDir < 0) newDir = 3;
        rover.direction = directions[newDir];
    }

    function turnRight(rover: any) {
        let newDir = directions.indexOf(rover.direction) + 1;
        if (newDir > 3) newDir = 0;
        rover.direction = directions[newDir];
    }

    function moveForward(rover: any) {
        let position = { x: rover.x, y: rover.y };

        switch (rover.direction) {
            case "N":
                position.y++;
                break;
            case "S":
                position.y--;
                break;
            case "W":
                position.x--;
                break;
            case "E":
                position.x++;
                break;
        }

        if (checkBounds(position) && checkOtherRovers(position)) {
            rover.x = position.x;
            rover.y = position.y;
        }
    }

    function checkBounds(newPosition: any): boolean {
        if (
            newPosition.x < 0 ||
            newPosition.x > w ||
            newPosition.y < 0 ||
            newPosition.y > h
        )
            throw new Error(
                `Nova posição do R${currentRover + 1} inválida: X: ${newPosition.x} Y: ${newPosition.y}`,
            );

        return true;
    }

    function checkOtherRovers(newPosition: any): boolean {
        if (rovers.some((r) => r.x === newPosition.x && r.y === newPosition.y))
            throw new Error(
                `Já existe um rover na posição: X: ${newPosition.x} Y: ${newPosition.y}`,
            );

        return true;
    }

    function sendKey(key: string) {
        if (key === "Clear") {
            commands = "";
            return;
        }

        if (key === "Backspace") {
            commands = commands.substring(0, commands.length - 1);
            return;
        }

        commands += key;
    }

    function sendMessage(message: string) {
        messages = [message, ...messages];
    }

    function getRotationDegree(rover: any) {
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
</script>

<div class="main">
    <div class="plain">
        <div class="container" style="--w: {w + 1}; --h: {h + 1};">
            <div class="v-rule">
                {#each Array(w + 1) as _, index}
                    <div class="cell">{w - index}</div>
                {/each}
            </div>
            <div class="h-rule">
                {#each Array(h + 1) as _, index}
                    <div class="cell">{index}</div>
                {/each}
            </div>
            <div class="board">
                {#each Array((w + 1) * (h + 1)) as item}
                    <div class="cell">{item}</div>
                {/each}
                <div class="rovers">
                    {#each rovers as rover, index}
                        <div
                            class="cell rover"
                            style="transform: translate(calc({rover.x} * (var(--cell-size) - 1px)), calc({rover.y +
                                1} * (var(--cell-size) - 1px) * -1)); --r: {getRotationDegree(
                                rover,
                            )}deg;"
                        >
                            R{index + 1}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div class="left-panel">
        <div class="mission-control">
            <div class="title">Controle da Missão</div>
            <div class="buttons">
                <div class="btn">Abrir</div>
                <div class="btn">Salvar</div>
            </div>
            <textarea class="input-text" bind:value={commands}></textarea>
            <div class="keyboard">
                <div class="btn" onclick={() => sendKey("L")}>L</div>
                <div class="btn" onclick={() => sendKey("R")}>R</div>
                <div class="btn" onclick={() => sendKey("M")}>M</div>
                <div class="btn">-</div>
                <div class="btn" onclick={() => sendKey("Clear")}>Limpar</div>
                <div class="btn" onclick={() => sendKey("1")}>1</div>
                <div class="btn" onclick={() => sendKey("2")}>2</div>
                <div class="btn" onclick={() => sendKey("3")}>3</div>
                <div class="btn" onclick={() => sendKey("4")}>N</div>
                <div class="btn" onclick={() => sendKey("\n")}>Return</div>
                <div class="btn" onclick={() => sendKey("4")}>4</div>
                <div class="btn" onclick={() => sendKey("5")}>5</div>
                <div class="btn" onclick={() => sendKey("6")}>6</div>
                <div class="btn" onclick={() => sendKey("S")}>S</div>
                <div class="btn" onclick={() => sendKey(" ")}>Space</div>
                <div class="btn" onclick={() => sendKey("7")}>7</div>
                <div class="btn" onclick={() => sendKey("8")}>8</div>
                <div class="btn" onclick={() => sendKey("9")}>9</div>
                <div class="btn" onclick={() => sendKey("W")}>W</div>
                <div class="btn" onclick={() => sendKey("Backspace")}>
                    {"<="}
                </div>
                <div class="btn">-</div>
                <div class="btn" onclick={() => sendKey("0")}>0</div>
                <div class="btn">-</div>
                <div class="btn" onclick={() => sendKey("E")}>E</div>
                <div class="btn" onclick={() => sendMission()}>Send</div>
            </div>
        </div>
        <div class="mission-report">
            <div class="title">Relatório da Missão</div>
            <div class="buttons">
                <div
                    class="btn"
                    onclick={() => {
                        messages = [];
                    }}
                >
                    Limpar
                </div>
                <div class="btn">Salvar</div>
            </div>
            <div class="log">
                {#each messages as message}
                    <div class="log-item">{message}</div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    :root {
        --cell-size: 40px;
    }

    .main {
        width: 100vw;
        height: 100vh;
        background: gray;
        display: flex;
    }

    .left-panel {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .plain {
        width: 50%;
        height: 100%;
        background: #222;
        display: flex;
        justify-content: center;
        overflow: auto;
    }

    .container {
        position: relative;
        margin-top: 100px;
        width: calc(((var(--cell-size) - 1px) * (var(--h) + 1)) + 2px);
    }

    .v-rule {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        width: var(--cell-size);
        height: calc(((var(--cell-size) - 1px) * var(--h)) + 2px);
        border: 1px solid white;
        background: blue;
    }

    .h-rule {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        width: calc(((var(--cell-size) - 1px) * var(--h)) + 2px);
        height: var(--cell-size);
        border: 1px solid white;
        top: calc(((var(--cell-size) - 1px) * var(--h)) + 2px);
        left: var(--cell-size);
        background: red;
    }

    .board {
        position: absolute;
        width: calc(((var(--cell-size) - 1px) * var(--w)) + 2px);
        height: calc(((var(--cell-size) - 1px) * var(--h)) + 2px);
        border: 1px solid white;
        display: flex;
        flex-wrap: wrap;
        left: var(--cell-size);
    }

    .cell {
        width: calc(var(--cell-size) - 1px);
        height: calc(var(--cell-size) - 1px);
        border: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .rovers {
        position: relative;
        width: 100%;
    }

    .rover {
        position: absolute;
        border-radius: 50%;
    }

    .rover::after {
        content: "|";
        position: absolute;
        transform: translateY(calc(var(--cell-size) / 2 * -1));
        rotate: var(--r);
        font-weight: 900;
        font-size: larger;
    }

    .mission-control {
        width: 100%;
        height: 50%;
        background: #444;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .buttons {
        display: flex;
        gap: 5px;
    }

    .btn {
        padding: 5px 10px;
        border-radius: 10px;
        border: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn:hover {
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        color: black;
    }

    .input-text {
        width: 100%;
        height: 100px;
        resize: none;
    }

    .keyboard {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(5, 1fr);
    }

    .mission-report {
        width: 100%;
        height: 50%;
        background: #555;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .log {
        height: 100%;
        background: black;
        border-radius: 10px;
        border: 1px solid white;
        padding: 10px;
        gap: 5px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .log-item {
        border-radius: 10px;
        border: 1px solid white;
        padding: 10px;
    }
</style>
