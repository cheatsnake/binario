<script lang="ts">
	import GamePage from './pages/GamePage.svelte';
</script>

<div class="app">
	<GamePage />
</div>

<style lang="scss">
	.app {
		width: 100%;
		height: 100vh;
		text-align: center;
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
		align-items: center;
		background-color: #0d1117;
		color: #2ddaff;
	}
</style>