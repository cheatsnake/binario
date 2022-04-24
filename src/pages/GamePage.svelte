<script lang="ts">
    import UndoBtn from "../components/Buttons/UndoBtn.svelte";
    import Field from "../components/Field.svelte";
    import Timer from "../components/Timer.svelte";
    import BinarioCore from "../core";
    import type { TileValues } from "../types";
    
    const size = 8;
    const binario = new BinarioCore(size);

    binario.generate()
    binario.prepare()

    function changeTile(row: number, column: number, value: TileValues) {
        binario.change(row, column, value)
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
    }

</script>

<Timer />
<Field binario="{binario}" changeTile="{changeTile}" />
<UndoBtn undo="{undo}"/>