<script lang="ts">
    let { text } = $props();
</script>

<style>
    #titulo-registro {
        background-color: #ea6880;
        background-repeat: repeat;
        background-size: cover;
        padding: 2vh 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5vh;
    }

    #titulo-registro {
        z-index: 0;
    }

    #titulo-registro figure {
        margin: 0;
    }

    #rlm-logo {
        margin: 0 1vw 0 3vw;
    }

    #rlm-logo img {
        width: auto;
        height: 9vh;
    }

    #titulo-registro h1 {
        flex: 1;
        text-align: center;
        color: #f0f0f0;
        font-family: "Catchy Mager";
        font-weight: bold;
        margin: 1vh 0 0 0;
        padding: 0.5vh 1vw;
        font-size: 2.8rem;
    }

    #smmun-logo {
        display: flex;
        flex-direction: row;
        justify-content: end;
        margin-right: 3vw;
    }

    #smmun-logo img {
        width: auto;
        height: 10vh;
    }
</style>

<!-- Título -->
<article id="titulo-registro">
    <div id="rlm-logo" class="navbar-logo">
        <figure>
            <img src="/assets/img/logos/rlm.svg" alt="Logo del RLM-MUN.">
        </figure>
    </div>

    <h1>{text.toUpperCase()}</h1>

    <div id="smmun-logo" class="navbar-logo">
        <figure>
            <img src="/assets/img/logos/smmun_blanco.svg" alt="Logo del SMMUN.">
        </figure>
    </div>
</article>
