<script lang="ts">
    let { children, onClick = undefined } = $props();
</script>

<div class="btn" onpointerup={() => onClick()}>{@render children?.()}</div>

<style>
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
</style>
