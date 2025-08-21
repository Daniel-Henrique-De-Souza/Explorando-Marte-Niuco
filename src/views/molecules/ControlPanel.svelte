<script lang="ts">
    import Button from "../atoms/Button.svelte";

    let { commands = $bindable(), onSend } = $props();

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
</script>

<div class="mission-control">
    <div class="title">Controle da Missão</div>
    <textarea class="input-text" bind:value={commands}></textarea>
    <div class="keyboard">
        <Button onClick={() => sendKey("L")}>L</Button>
        <Button onClick={() => sendKey("R")}>R</Button>
        <Button onClick={() => sendKey("M")}>M</Button>
        <div></div>
        <Button onClick={() => sendKey("Clear")}>Limpar</Button>
        <Button onClick={() => sendKey("1")}>1</Button>
        <Button onClick={() => sendKey("2")}>2</Button>
        <Button onClick={() => sendKey("3")}>3</Button>
        <Button onClick={() => sendKey("4")}>N</Button>
        <Button onClick={() => sendKey("\n")}>Return</Button>
        <Button onClick={() => sendKey("4")}>4</Button>
        <Button onClick={() => sendKey("5")}>5</Button>
        <Button onClick={() => sendKey("6")}>6</Button>
        <Button onClick={() => sendKey("S")}>S</Button>
        <Button onClick={() => sendKey(" ")}>Space</Button>
        <Button onClick={() => sendKey("7")}>7</Button>
        <Button onClick={() => sendKey("8")}>8</Button>
        <Button onClick={() => sendKey("9")}>9</Button>
        <Button onClick={() => sendKey("W")}>W</Button>
        <Button onClick={() => sendKey("Backspace")}>
            {"<="}
        </Button>
        <div></div>
        <Button onClick={() => sendKey("0")}>0</Button>
        <div></div>
        <Button onClick={() => sendKey("E")}>E</Button>
        <Button onClick={() => onSend()}>Send</Button>
    </div>
</div>

<style>
    .mission-control {
        width: 100%;
        height: 60%;
        background: #393244;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .mission-control > textarea {
        border: 1px solid cyan;
        color: cyan;
        background: black;
        border-radius: 10px;
        padding: 10px;
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
        gap: 5px;
    }
</style>
