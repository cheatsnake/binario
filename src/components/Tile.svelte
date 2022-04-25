<script lang="ts">
	import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';
    import { TileValues } from '../types';

    export let value: string;
    export let id: string;
    export let changeTile: (r: number, c: number, v: TileValues) => void;
    let tile: HTMLDivElement;
    const tileStyle = "tile";
    const blockedTile = "tile_block";

    function swapTile(primary: TileValues, secondary: TileValues) {
        const row = +tile.id.split('-')[0];
        const column = +tile.id.split('-')[1];

        if (tile.classList.contains(`tile_${primary}`)) {
            tile.classList.remove(`tile_${primary}`);
            tile.classList.add(`tile_${secondary}`);
            changeTile(row, column, secondary);
        } else if (tile.classList.contains(`tile_${secondary}`)) {
            tile.classList.remove(`tile_${secondary}`);
            changeTile(row, column, TileValues.EMPTY);
        } else {
            tile.classList.add(`tile_${primary}`);
            changeTile(row, column, primary);
        }
    }

    onMount(() => {
        tile.addEventListener('click', () => {
            if (!tile.classList.contains(blockedTile)) 
                swapTile(TileValues.ONE, TileValues.ZERO);
        })
        tile.addEventListener('contextmenu', () => {
            if (!tile.classList.contains(blockedTile)) 
                swapTile(TileValues.ZERO, TileValues.ONE);
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
    @keyframes error {
        0%    { border: 0.3rem solid rgba(255, 255, 255, 1) }
        50%   { border: 0.3rem solid rgba(255, 255, 255, 0.5) }
        100%  { border: 0.3rem solid rgba(255, 255, 255, 1) }
    }
    .tile {
        user-select: none;
        border-radius: 0.4rem;
        background-color: #161b22;
        width: 100%;
        height: 100%;
        transition: 0.15s all;
        &_1 {   
            background-color: #ffb33b;
        }
        &_0 {
            background-color: #2ddaff;
        }
        &_1, &_0 {
            box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, 
            rgba(0, 0, 0, 0.3) 0px 7px 3px -3px, 
            rgba(0, 0, 0, 0.25) 0px -0.5rem 0px inset;
            &:hover {
                transform: scale(1.05);
            }
        }
        &_block {
            font-size: 2rem;
            text-align: center;
            color: rgba(23, 26, 32, 0.4);
        }
        &_error {
            animation-name: error;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
        }
    }
</style>
