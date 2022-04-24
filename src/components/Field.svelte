<script lang="ts">

    import { onMount } from 'svelte';
    import type BinarioCore from '../core';
    import type { TileValues } from '../types';
    import Tile from './Tile.svelte'

    let area: HTMLDivElement;
    export let binario: BinarioCore
    export let changeTile: (r: number, c: number, v: TileValues) => void;

    onMount(() => {
        window.oncontextmenu = () => false;

        const gapSize = (1 - (binario.size - 4) * 0.1)

        area.style.width = area.style.height = `${(window.innerHeight*0.66).toFixed(0)}px`;
        area.style.gridTemplateColumns = `repeat(${binario.size}, 1fr)`
        area.style.gridTemplateRows = `repeat(${binario.size}, 1fr)`
        area.style.gap = `${gapSize < 0.4 ? 0.4 : gapSize }rem`
	});
</script>

<div class="area" bind:this={area}>
	{#each binario.task as row, i}
        {#each row as value, j}
            <Tile value="{value}" id="{`${i}-${j}`}" changeTile={changeTile}/>
        {/each}
	{/each}
</div>

<style lang="scss">
    .area {
        width: 43.75rem;
        height: 43.75rem;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0.6rem;
    }
</style>