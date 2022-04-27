<script>
import MenuBtn from "../components/Buttons/MenuBtn.svelte";

</script>
<div class="menu">
    <h1 class="title">Binario</h1>
    <div class="modes">
        <MenuBtn url="/4">4x4</MenuBtn>
        <MenuBtn url="/6">6x6</MenuBtn>
        <MenuBtn url="/8">8x8</MenuBtn>
        <MenuBtn url="/10">10x10</MenuBtn>
        <MenuBtn url="/12">12x12</MenuBtn>
        <MenuBtn url="/about" accent="{true}">About</MenuBtn>
    </div>
    <a href="https://twitter.com/yurace_" class="label">Made by <b>Yury</b></a>
</div>
<div class="area" >
    <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
    </ul>
</div >

<style lang="scss">
    .menu {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .title {
        user-select: none;
        color: #fff;
        font-size: 4rem;
        margin-bottom: 2rem;
    }
    .modes {
        width: 100%;
        max-width: 500px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        z-index: 2;
        margin-bottom: 4rem;
    }
    .label {
        user-select: none;
        position: absolute;
        bottom: 1rem;
        font-size: 0.9rem;
        color: #fff;
        opacity: 0.5;
        font-weight: 400;
        transition: 0.3s all;
        z-index: 2;
        &:hover {
            opacity: 1;
            text-decoration: none;
        }
    }
    .area {
        position: absolute;
        background: transparent;
        top: 0;  
        width: 100%;
        height: 100vh;
        z-index: 0;
    }

    .circles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .circles li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #2dd8ff3a;
        animation: animate 25s linear infinite;
        bottom: -150px;
        
    }

    .circles li:nth-child(1){
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
    }


    .circles li:nth-child(2){
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
    }

    .circles li:nth-child(3){
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
    }

    .circles li:nth-child(4){
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
    }

    .circles li:nth-child(5){
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
    }

    .circles li:nth-child(6){
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
    }

    .circles li:nth-child(7){
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
    }

    .circles li:nth-child(8){
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
    }

    .circles li:nth-child(9){
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
    }

    .circles li:nth-child(10){
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
    }



    @keyframes animate {

        0%{
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
        }

        100%{
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
        }

    }
</style>