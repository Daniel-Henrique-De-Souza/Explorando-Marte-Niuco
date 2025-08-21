<script lang="ts">
    import { onMount } from "svelte";
    import InputParser from "../controllers/InputParser";
    import Commander from "../controllers/Commander";
    import Board from "../views/organisms/Board.svelte";
    import ReportPanel from "../views/molecules/ReportPanel.svelte";
    import ControlPanel from "../views/molecules/ControlPanel.svelte";
    import TurnLeftCommand from "../controllers/commands/TurnLeftCommand";
    import TurnRightCommand from "../controllers/commands/TurnRightCommand";
    import moveForwardCommand from "../controllers/commands/MoveForwardCommand";
    import { NEXT_COMMAND_TIMEOUT_MILLISECONDS } from "../Statics";
    import NiucoLogo from "../views/atoms/NiucoLogo.svelte";

    let messages: string[] = $state([]);

    let w = $state(5);
    let h = $state(5);

    let rovers: any = $state([]);

    let commands = $state("");
    let commander = new Commander();
    commander.addCommand("L", new TurnLeftCommand());
    commander.addCommand("R", new TurnRightCommand());
    commander.addCommand("M", new moveForwardCommand());
    commander.setNextCommandListener(() => {
        setTimeout(() => {
            commander.nextCommand();
        }, NEXT_COMMAND_TIMEOUT_MILLISECONDS);
    });

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
        <Board {w} {h} bind:rovers />
        <div class="niuco-logo">
            Desafio
            <NiucoLogo />
        </div>
    </div>
    <div class="left-panel">
        <ControlPanel bind:commands onSend={() => sendMission()} />
        <ReportPanel bind:messages />
    </div>
</div>

<style>
    .main {
        width: 100vw;
        height: 100vh;
        background: black;
        display: flex;
    }

    .left-panel {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: -5px -5px 0 rgba(0,0,0,.25);
    }

    .plain {
        width: 50%;
        height: 100%;
        background: #a97267;
        display: flex;
        justify-content: center;
        overflow: auto;
    }

    .niuco-logo {
        position: absolute;
        left: 10px;
        bottom: 20px;
        fill: white;
        width: 80px;
        transform: translateY(10px);
        opacity: .5;
    }
</style>
