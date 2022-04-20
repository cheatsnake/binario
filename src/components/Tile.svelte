<script lang="ts">
	import { fade } from 'svelte/transition'
    import { onMount } from 'svelte';

    let tile: HTMLDivElement
    let tileStyle = "tile"

    onMount(() => {
        tile.addEventListener('click', () => {
            switch(tileStyle) {
                case "tile": 
                    tileStyle += " active_one"
                    break;
                case "tile active_one": 
                    tileStyle = "tile active_zero"
                    break;
                case "tile active_zero": 
                    tileStyle = "tile" 
                    break;
            }
        })
    })
</script>

<div transition:fade class="{tileStyle}" bind:this={tile}></div>

<style lang="scss">
    .tile {
        border-radius: 0.5rem;
        background-color: #171a20;
        width: 100%;
        height: 100%;
    }
    .active {
        transition: 0.3s all;
        opacity: 0;
        &_one {
            background-color: #ffb33b;
            opacity: 1;
        }
        &_zero {
            background-color: #2ddaff;
        }
    }
</style>
