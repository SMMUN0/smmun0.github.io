<script lang="ts">
    let { text } = $props();
</script>

<style>
    #titulo-registro {
        background-color: #7872a1;
        background-image: url("/assets/img/backgrounds/blue_bg_darker.webp");
        background-repeat: repeat;
        background-size: cover;
        padding: 2vh 0;
        color: #fffdfd;
        font-family: "The Seasons Bold";
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #titulo-registro {
        z-index: 0;
    }

    #titulo-registro figure {
        margin: 0;
    }

    #titulo-registro img {
        width: auto;
        height: 9vh;
        margin-left: 3vw;
    }

    #titulo-registro h1 {
        margin: 1vh 0 0 0;
        font-weight: normal;
        padding: 0.5vh 1vw;
        font-size: 2.8rem;
    }
</style>

<!-- Título -->
<article id="titulo-registro">
    <div class="navbar-logo logo-registro">
        <figure>
            <enhanced:img src="/static/assets/img/logos/smmun_dorado.webp" alt="Logo del SMMUN." />
        </figure>
    </div>

    <h1>{text}</h1>
</article>
