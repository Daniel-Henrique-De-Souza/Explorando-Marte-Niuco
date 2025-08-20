<script lang="ts">
    let x = 5;
    let y = 5;
    let items = Array((x + 1) * (y + 1));
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
            </div>
        </div>
    </div>
    <div class="left-panel">
        <div class="mission-control">Controle da Missão</div>
        <div class="mission-report">Relatório da Missão</div>
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

    .mission-control {
        width: 100%;
        height: 50%;
        background: #444;
    }

    .mission-report {
        width: 100%;
        height: 50%;
        background: #555;
    }
</style>
