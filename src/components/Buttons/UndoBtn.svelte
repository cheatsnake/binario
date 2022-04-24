<script lang="ts">
    import UndoIcon from '../Icons/UndoIcon.svelte';
    
    export let undo: Function;
</script>

<button class="undo" on:click="{() => undo()}"><UndoIcon /></button>

<style lang="scss">
    .undo {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
        background: none;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 400;
        color: #2ddaff;
        transition: 0.3s all;
        &:hover {
            transform: scale(1.2);
        }
        &:active {
            background: none;
            opacity: 0.3;
        } 
    }
</style>