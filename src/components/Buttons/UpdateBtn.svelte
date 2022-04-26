<script lang="ts">
    import UpdateIcon from "../Icons/UpdateIcon.svelte";
    import { Route, path, router } from "svelte-micro";

    function update() {
        location.replace(location.href.split('#')[0]);
    }

</script>

<button on:click="{update}" class="update"><UpdateIcon /></button>

<style lang="scss">
    .update {
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
            text-decoration: none;
            transform: scale(1.2);
        }
    }
</style>