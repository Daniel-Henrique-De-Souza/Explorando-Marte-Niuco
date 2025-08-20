<script lang="ts">
    import { getRotationDegree } from "../../Utils";
    let { w = $bindable(), h = $bindable(), rovers = $bindable() } = $props();
</script>

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

<style>
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
</style>