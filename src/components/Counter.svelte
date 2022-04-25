<script lang="ts">
    export let tileStats: string
</script>

<div class="counter">
    <slot>{tileStats}</slot>
</div>

<style>
    .counter {
        user-select: none;
		font-size: 2.2rem;
		font-weight: 700;
    }
</style>