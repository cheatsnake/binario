<script>
    import { fly } from 'svelte/transition';
    import { getRandomNumber } from "../../core/helpers";

    const congratsWords = ["That's great!", "Perfectly!", "Wonderfully!", "Beautifully!", "You are awesome!", "GOD LIKE!", "Wow, that is cool!", "You beast!", "This is absolutely epic!", "This is epic!", "You're so smart!", "Unbelievable!", "Amazing!", "Awesome!"]
    const index = getRandomNumber(congratsWords.length - 1);
</script>

<div transition:fly class="win-modal">
    <div class="congrats">{congratsWords[index]}</div>
</div>

<style lang="scss">
    .congrats {
        user-select: none;
        font-size: 4rem;
        color: #fff;
        font-weight: 700;
    }
</style>