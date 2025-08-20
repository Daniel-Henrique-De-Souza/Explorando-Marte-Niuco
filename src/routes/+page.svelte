<script lang="ts">
    let x = 5;
    let y = 5;
    let items = Array((x + 1) * (y + 1));

    let rovers = [
        { x: 0, y: 0, direction: "E" },
        { x: 1, y: 1, direction: "W" },
    ];

    let commands = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`;

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
        <div class="container" style="--w: {x + 1}; --h: {y + 1};">
            <div class="v-rule">
                {#each Array(x + 1) as _, index}
                    <div class="cell">{x - index}</div>
                {/each}
            </div>
            <div class="h-rule">
                {#each Array(y + 1) as _, index}
                    <div class="cell">{index}</div>
                {/each}
            </div>
            <div class="board">
                {#each items as item}
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
            <textarea class="input-text">{commands}</textarea>
            <div class="keyboard">
                <div class="btn">1</div>
                <div class="btn">2</div>
                <div class="btn">3</div>
                <div class="btn">N</div>
                <div class="btn">Return</div>
                <div class="btn">4</div>
                <div class="btn">5</div>
                <div class="btn">6</div>
                <div class="btn">S</div>
                <div class="btn">Space</div>
                <div class="btn">7</div>
                <div class="btn">8</div>
                <div class="btn">9</div>
                <div class="btn">W</div>
                <div class="btn">-</div>
                <div class="btn">-</div>
                <div class="btn">0</div>
                <div class="btn">-</div>
                <div class="btn">E</div>
                <div class="btn">Send</div>
            </div>
        </div>
        <div class="mission-report">
            <div class="title">Relatório da Missão</div>
            <div class="buttons">
                <div class="btn">Limpar</div>
                <div class="btn">Salvar</div>
            </div>
            <div class="log">
                <div class="log-item">Mensagem 1</div>
                <div class="log-item">Mensagem 2</div>
                <div class="log-item">Mensagem 3</div>
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
    }

    .log-item {
        border-radius: 10px;
        border: 1px solid white;
        padding: 10px;
    }
</style>
