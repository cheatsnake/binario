<script lang="ts">
    import { onDestroy } from 'svelte';

    let elapsed = 0;
    let elapsedSeconds = 0;
    let last_time = window.performance.now();
    let frame: number;
    let formatedTime: string;
    export let isPlay: boolean;

    (function update() {
        if (isPlay) {
            frame = requestAnimationFrame(update);

            const time = window.performance.now();
            elapsed += time - last_time;
            elapsedSeconds = +(elapsed / 1000).toFixed(0)

            last_time = time;

            formatTime();
        }
    }());

    function formatLength(num: number): string {
        return num > 9 ? `${num}` : `0${num}`;
    }

    function formatTime() {
        if (elapsedSeconds < 60) {
            formatedTime = `00:${formatLength(elapsedSeconds)}`;
        } else {
            const minutes = Math.floor(elapsedSeconds / 60);
            const seconds = elapsedSeconds - (minutes * 60);
            formatedTime = `${formatLength(minutes)}:${formatLength(seconds)}`
        }
    }

    onDestroy(() => {
        cancelAnimationFrame(frame);
    });
</script>

<div class="timer">{formatedTime}</div>

<style lang="scss">
	.timer {
        cursor: pointer;
        user-select: none;
		font-size: 2.2rem;
		font-weight: 700;
		color: #ffb33b;
        transition: 0.3s all;
        &:hover {
            transform: scale(1.1);
        }
	}
</style>