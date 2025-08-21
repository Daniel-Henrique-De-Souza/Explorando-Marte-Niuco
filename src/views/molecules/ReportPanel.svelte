<script lang="ts">
    import Button from "../atoms/Button.svelte";
    import NiucoLogo from "../atoms/NiucoLogo.svelte";
    import NasaLogo from "../atoms/NasaLogo.svelte";

    let { messages = $bindable() } = $props();
</script>

<div class="mission-report">
    <div class="title">Relatório da Missão</div>
    <div class="buttons">
        <Button
            onClick={() => {
                messages = [];
            }}
        >
            Limpar
        </Button>
    </div>
    <div class="log">
        {#each messages as message}
            <div class="log-item">{message}</div>
        {/each}
    </div>
    <div class="nasa-logo">
        <NasaLogo />
    </div>
</div>

<style>
    .mission-report {
        width: 100%;
        height: 40%;
        background: #858894;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .log {
        height: 100%;
        background: black;
        border-radius: 10px;
        border: 1px solid lime;
        padding: 10px;
        gap: 5px;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .log-item {
        border-radius: 10px;
        border: 1px solid lime;
        padding: 10px;
        color: lime;
    }

    .buttons {
        display: flex;
        gap: 5px;
    }

    .nasa-logo {
        position: absolute;
        width: 60px;
        height: 60px;
        right: 10px;
    }
</style>
