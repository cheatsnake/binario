<script lang="ts">
	import GameArea from './components/GameArea.svelte';
</script>

<div class="app">
	<p>00:17</p>
	<GameArea/>
	<p>UNDO</p>
</div>

<style lang="scss">
	.app {
		width: 100%;
		height: 100vh;
		text-align: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #0d1117;
		color: #2ddaff;
	}
</style>