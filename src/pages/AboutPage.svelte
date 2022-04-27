<script lang="ts">
    import BackBtn from "../components/Buttons/BackBtn.svelte";
    import { fade } from 'svelte/transition';
</script>

<div transition:fade={{duration: 500}} class="container">
    <div class="back"><BackBtn /></div>
    <div class="title">
        About binario
    </div>
    <p>Binario is a logic puzzle game that also known as <a href="https://en.wikipedia.org/wiki/Takuzu">takuzu (or binairo)</a>. The goal of the game is to fill the playing field with tiles of two colors. To pass it successfully, you only need to follow three simple rules:</p>
    <br>
    <br>
    <ol>
    <li>More than two tiles of the same color can&#39;t be adjacent. Therefore, if two adjacent cells contain the same color, the cells next must contain the other color (xxx00x → xx1001)</li>
    <li>Each row and each column must contain an equal number of tiles of each color. (For example, if you playing an 8x8 field, each column and row must contain 4 tiles of each color.)</li>
    <li>Each row and column must be unique.</li>
    </ol>
</div>

<style lang="scss">
    .container {
        max-width: 700px;
        margin: 0 auto;
        color: #fff;
        font-size: 1.4rem;
        text-align: left;
        a {
            color: #2ddaff;
        }
    }

    .title {
        font-weight: 700;
        text-align: center;
        color: #ffb33b;
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }
    .back {
        position: absolute;
        top: 2rem;
        left: 2rem;
    }

</style>