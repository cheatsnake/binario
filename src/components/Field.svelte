<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
        const canvasSize = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
        canvas.width = canvas.height = canvasSize;

        const SIZE = 8;

        function createTiles() {
            const tileSize = (canvasSize - canvasSize / 10) / SIZE; 
            const padding = (canvasSize / 10) / (SIZE - 1);

            ctx.fillStyle = ctx.strokeStyle = "#171a20";
            ctx.lineWidth = 1;
            ctx.lineJoin = 'round';
            for (let i = 0; i < SIZE; i++) {
                    for (let j = 0; j < SIZE; j++ ) {
                    ctx.beginPath();
                    ctx.rect(j * (tileSize + padding), i * (tileSize + padding), tileSize, tileSize);
                    ctx.stroke();
                    ctx.fill();
                }
            }

        }
        createTiles()


        // ctx.moveTo(0, 0)
        // ctx.lineTo(canvasSize / 2, canvasSize / 2)
        // ctx.strokeStyle = "#171a20"
        // ctx.stroke()
	})


</script>


<canvas id="canvas" bind:this={canvas}></canvas>


<style lang="scss">

</style>