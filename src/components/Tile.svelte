<script lang="ts">
	import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { TileValues } from '../types';

    export let value: string;
    export let id: string;
    export let changeTile: (r: number, c: number, v: TileValues) => void;
    let tile: HTMLDivElement
    const tileStyle = "tile"
    const blockedTile = "tile_block"

    function swapTile() {
        const row = +tile.id.split('-')[0]
        const column = +tile.id.split('-')[1]

        if (tile.classList.contains("tile_1")) {
            tile.classList.remove("tile_1")
            tile.classList.add("tile_0")
            changeTile(row, column, TileValues.ZERO)
        } else if (tile.classList.contains("tile_0")) {
            tile.classList.remove("tile_0")
            changeTile(row, column, TileValues.EMPTY)
        } else {
            tile.classList.add("tile_1")
            changeTile(row, column, TileValues.ONE)
        }
    }

    onMount(() => {
        tile.addEventListener('click', () => {
            if (!tile.classList.contains(blockedTile)) swapTile()
        })
    })
    
</script>

{#if value === TileValues.ZERO || value === TileValues.ONE}
    <div 
        transition:fade 
        id="{id}" 
        class="{`${tileStyle} ${tileStyle}_${value} ${blockedTile}`}" 
        bind:this={tile}
    >∎</div>
{:else}
    <div transition:fade id="{id}" class="{tileStyle}" bind:this={tile}></div>
{/if}

<style lang="scss">
    .tile {
        user-select: none;
        border-radius: 0.5rem;
        background-color: #171a20;
        width: 100%;
        height: 100%;
        transition: 0.15s all;
        &_1 {   
            background-color: #ffb33b;
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, 
            rgba(0, 0, 0, 0.3) 0px 7px 3px -3px, 
            rgba(0, 0, 0, 0.25) 0px -0.5rem 0px inset;
        }
        &_0 {
            background-color: #2ddaff;
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, 
            rgba(0, 0, 0, 0.3) 0px 7px 3px -3px, 
            rgba(0, 0, 0, 0.25) 0px -0.5rem 0px inset;
        }
        &_block {
            font-size: 2rem;
            text-align: center;
            color: rgba(23, 26, 32, 0.4);
        }
        &:hover {
            transform: scale(1.05);
        }
    }
</style>
