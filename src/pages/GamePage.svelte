<script lang="ts">
    import { onMount } from "svelte";
    import UndoBtn from "../components/Buttons/UndoBtn.svelte";
    import Counter from "../components/Counter.svelte";
    import Field from "../components/Field.svelte";
    import ErrorMessage from "../components/Messages/ErrorMessage.svelte";
    import Overlay from "../components/Messages/Overlay.svelte";
    import WinModal from "../components/Messages/WinMessage.svelte";
    import Timer from "../components/Timer.svelte";
    import BinarioCore from "../core";
    import { countSubstring } from "../core/helpers";
    import type { TileValues, VerificationResult } from "../types";
    
    const size = 8;
    const totalTiles = size ** 2;
    const binario = new BinarioCore(size);
    let verificationResult: VerificationResult;
    let errorLines: HTMLDivElement[] = [];

    $: tileStats = `0/${totalTiles}`;
    $: isPlay = true;
    $: verificationResult = { isError: false, message: null, position: [], type: null };

    binario.generate()
    binario.prepare()

    function changeTile(row: number, column: number, value: TileValues) {
        binario.change(row, column, value)
        countTiles();
    }

    function undo() {
        if (!binario.cache.length) return;
        let tile: HTMLDivElement;
        const prevStep = binario.cache[binario.cache.length - 1].split("-")

        tile = document.getElementById(`${prevStep[0]}-${prevStep[1]}`) as HTMLDivElement;
        tile.classList.remove("tile_1")
        tile.classList.remove("tile_0")

        if (prevStep[2] === "1" || prevStep[2] === "0") {
            tile.classList.add(`tile_${prevStep[2]}`)
        }  
        binario.undo()
        countTiles();
    }

    function countTiles() {
        let unsolved = 0;
        binario.task.forEach(row => {
            unsolved += countSubstring(row.join(''), "x")
        })
        tileStats = `${(totalTiles) - unsolved}/${totalTiles}`
        if (unsolved == 0) {
            verificationResult = binario.verify()
            verificationResult.isError ? showError() : isPlay = false;
        } else if (unsolved = 1 && errorLines.length)  {
            for (let i = 0; i < errorLines.length; i++) {
                errorLines[i].classList.remove("tile_error");
            }
            errorLines = [];
            verificationResult.isError = false;
        } else {
            verificationResult.isError = false;
        }
    }

    function showError() {
        console.log(verificationResult)
        let tile: HTMLDivElement
        const errorPos = verificationResult.position
        for (let i = 0; i < errorPos.length; i++) {
            const lineIndex = +errorPos[i].split("-")[1];
            if (errorPos[i].includes("row")) {
                for (let j = 0; j < size; j++) {
                    tile = document.getElementById(`${lineIndex}-${j}`) as HTMLDivElement
                    tile.classList.add("tile_error")
                    errorLines.push(tile);
                }
            } else {
                for (let j = 0; j < size; j++) {
                    tile = document.getElementById(`${j}-${lineIndex}`) as HTMLDivElement
                    tile.classList.add("tile_error")
                    errorLines.push(tile);
                }
            }
        }
    }

    onMount(() => {
        countTiles();
    })

</script>

{#if !isPlay}
    <Overlay><WinModal/></Overlay>
{/if}

<div class="stats">
    <Counter tileStats="{tileStats}"/>
    <Timer isPlay="{isPlay}" />
    <Counter tileStats="{tileStats}"/>
</div>

<Field binario="{binario}" changeTile="{changeTile}" />
<UndoBtn undo="{undo}"/>

{#if verificationResult.isError}
    <ErrorMessage>{verificationResult.message}</ErrorMessage>
{/if}

<style lang="scss">
    .stats {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 0.5rem 2rem;
    }
</style>