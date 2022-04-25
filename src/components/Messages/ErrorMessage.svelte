<script>
    import { fly } from 'svelte/transition';
</script>

<div transition:fly={{duration: 700}} class="error-msg">
    <slot></slot>
</div>

<style lang="scss">
    @keyframes pulse {
        0%    { color: rgba(255, 255, 255, 1) }
        50%   { color: rgba(255, 255, 255, 0.5) }
        100%  { color: rgba(255, 255, 255, 1) }
    }
    .error-msg {
        position: absolute;
        bottom: 0.7rem;
        left: 50%;
        transform: translateX(-50%);
        user-select: none;
        font-size: 1.5rem;
        color: #fff;
        font-weight: 400;
        animation-name: pulse;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
    }
</style>