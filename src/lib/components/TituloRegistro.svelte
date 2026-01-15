<script lang="ts">
    let { text } = $props();
</script>

<style>
    #titulo-registro {
        background-color: #ea6880;
        background-repeat: repeat;
        background-size: cover;
        padding: 2vh 3vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        margin-bottom: 5vh;
    }

    #titulo-registro {
        z-index: 0;
    }

    #titulo-registro figure {
        margin: 0;
    }

    #titulo-registro h1 {
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
    <div id="smmun-logo" class="navbar-logo">
        <figure>
            <img src="/assets/img/logos/smmun_blanco.svg" alt="Logo del SMMUN.">
        </figure>
    </div>

    <h1>{text.toUpperCase()}</h1>
</article>
