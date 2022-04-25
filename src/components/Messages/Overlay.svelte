<script>
    import { fade } from 'svelte/transition';
</script>

<div transition:fade={{delay: 200}} class="overlay">
    <slot></slot>
</div>

<style lang="scss">
    .overlay {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 2;
        padding-bottom: 3rem;
    }
</style>