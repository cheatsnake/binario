<script lang="ts">
	import { Route } from "svelte-micro";
	import { fade } from 'svelte/transition';
	import AboutPage from "./pages/AboutPage.svelte";
	import GamePage from './pages/GamePage.svelte';
	import MenuPage from './pages/MenuPage.svelte';
</script>
  
<div transition:fade={{duration: 500}} class="app">
<Route>
		<Route path="/4"><GamePage size="{4}" /></Route>
		<Route path="/6"><GamePage size="{6}" /></Route>
		<Route path="/8"><GamePage size="{8}" /></Route>
		<Route path="/10"><GamePage size="{10}" /></Route>
		<Route path="/12"><GamePage size="{12}" /></Route>
		<Route path="/about"><AboutPage /></Route>
		<Route path="/"><MenuPage /></Route>
</Route>
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
		z-index: -2;
		overflow: hidden;
	}
</style>