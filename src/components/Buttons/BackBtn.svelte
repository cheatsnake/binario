<script lang="ts">
    import BackIcon from "../Icons/BackIcon.svelte";
</script>

<a href="/" class="back"><BackIcon /></a>

<style lang="scss">
    .back {
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
        &:active {
            background: none;
            opacity: 0.3;
        } 
    }
</style>