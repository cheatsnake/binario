<script lang="ts">

    import { onMount } from 'svelte';
    import Tile from './Tile.svelte'

    let area: HTMLDivElement;
    const SIZE = 8;

    const tiles: {id: number}[] = [];
        for (let i = 0; i < SIZE ** 2; i++) {
            tiles.push({id: i})
    }

    let cmps = [];

    onMount(() => {
        area.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`
        area.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`
	});
    
</script>

<div class="area" bind:this={area}>
	{#each tiles as tile, index (tile.id)}
			<Tile bind:this={cmps[index]} />
	{/each}
</div>

<style lang="scss">
    .area {
        width: 800px;
        height: 800px;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0.7rem;
    }
</style>