<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import TituloRegistro from "$lib/components/TituloRegistro.svelte";
    import { registroTitleNav } from "$lib/stores/registro-title-nav";

    let { children } = $props();
    let displayDots = $state(false);

    onMount(() => {
        // Calcular altura de la página
        const height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

        // Solo mostrar progreso si la longitud de la página es mayor a 100% y la pantalla es "pequeña"
        displayDots = height > window.innerHeight && window.matchMedia("(max-width: 820px)").matches;
    });
</script>

<svelte:head>
    <!-- Metadatos -->
    <title>{page.data.title}</title>
    <link rel="canonical" href="https://rlmmun.smmun.com{page.url.pathname == "/" ? "" : page.url.pathname}">
    <meta name="description" content={page.data.description}>

    <meta property="og:title" content={page.data.title}>
    <meta property="og:description" content={page.data.description}>
</svelte:head>

<style>
    main {
        overflow-x: hidden;
    }

    header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 4;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #normal-footer {
        font-family: "Catchy Mager";
        font-weight: bold;
        font-size: 0.6rem;
        color: #44372b;
        text-align: center;
        margin: 2vh 0 1vh 0;
    }
</style>

{#if page.url.pathname.includes("/registro/") && $registroTitleNav}
    <header>
        <TituloRegistro text={page.url.pathname == "/registro/delegaciones/" ? "Registro de delegaciones" : "Registro de faculty"}></TituloRegistro>
    </header>
{/if}

<main class:set-index-style={page.url.pathname == "/"}>
    {@render children()}
</main>

<footer id="normal-footer">
    &copy; 2016 - {new Date().getFullYear()} SMMUN
</footer>
