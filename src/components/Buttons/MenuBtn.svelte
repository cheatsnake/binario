<script lang="ts">
    export let accent = false;
    export let url: string;
</script>

{#if !accent}
    <a href="{url}" class="menu-btn" >
        <slot></slot>
    </a>
{:else}
    <a href="{url}" class="menu-btn accent" >
        <slot></slot>
    </a>
{/if}

<style lang="scss">
    .menu-btn {
        user-select: none;
        cursor: pointer;
        border: none;
        border-radius: 0.4rem;
        background-color: #161b22;
        padding: 2rem 1rem;
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        color: #2ddaff;
        transition: 0.3s all;
        &:hover {
            transform: scale(1.05);
        }
        &:active {
            background: none;
            opacity: 0.3;
        } 
    }
    .accent {
        color: #ffb33b;
    }
</style>