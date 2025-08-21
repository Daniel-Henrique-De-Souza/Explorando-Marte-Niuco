<script lang="ts">
    import { onMount } from "svelte";
    import InputParser from "../controllers/InputParser";
    import Commander from "../controllers/Commander";
    import Board from "../views/organisms/Board.svelte";
    import ReportPanel from "../views/molecules/ReportPanel.svelte";
    import ControlPanel from "../views/molecules/ControlPanel.svelte";

    let messages: string[] = $state([]);

    let w = $state(5);
    let h = $state(5);

    let rovers: any[] = $state([]);

    let commands = $state("");
    let commander = new Commander();

    commander.setMessageListener((message: any) => {
        sendMessage(message);
    });

    function sendMission() {
        try {
            let parser = new InputParser();
            parser.parse(commands);

            w = parser.width;
            h = parser.height;
            rovers = parser.rovers;

            commander.loadPlain(w, h);
            commander.loadRovers(rovers);
            commander.start();
        } catch (error) {
            if (error instanceof Error) sendMessage(error.message);
            console.error(error);
        }
    }

    function sendMessage(message: string) {
        messages = [message, ...messages];
    }
</script>

<div class="main">
    <div class="plain">
        <Board {w} {h} {rovers} />
    </div>
    <div class="left-panel">
        <ControlPanel bind:commands={commands} onSend={() => sendMission()} />
        <ReportPanel bind:messages={messages} />
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
</style>
