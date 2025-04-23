<script lang="ts">
    let { nombre, siglas } = $props();
</script>

<style>
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #3e4176;
    }

    figure {
        margin: 0;
    }

    img {
        height: 8rem;
        width: auto;
    }

    span {
        font-family: "Glacial Indifference Bold";
        font-size: 1.2rem;
        color: #3e4176;
        margin: 0 2vw;
    }
</style>

<a target="_blank" href="/manuales/MANUAL%20{siglas}.pdf">
    <figure>
        <img src="/assets/img/logos/{siglas.toLowerCase()}.png" width="1024" height="1024" alt="Logo de {siglas}.">
    </figure>

    <span>
        {nombre}
    </span>
</a>
