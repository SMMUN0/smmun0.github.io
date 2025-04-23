<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import DesktopNavbar from "$lib/components/DesktopNavbar.svelte";
    import MobileNavbar from "$lib/components/MobileNavbar.svelte";
    import TituloRegistro from "$lib/components/TituloRegistro.svelte";
    import ProgressDots from "$lib/components/ProgressDots.svelte";
    import Footer from "$lib/components/Footer.svelte";
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
    <link rel="canonical" href="https://smmun.com{page.url.pathname == "/" ? "" : page.url.pathname}">
    <meta name="description" content={page.data.description}>

    <meta property="og:title" content={page.data.title}>
    <meta property="og:description" content={page.data.description}>
</svelte:head>

<style>
    main {
        overflow-x: hidden;
    }

    @media (min-width: 820px) {
        #mobile-nav {
            display: none;
        }
    }

    @media (max-width: 820px) {
        #desktop-nav {
            display: none;
        }
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
</style>

{#if !page.url.pathname.includes("/registro/") || !$registroTitleNav}

    <header id="desktop-nav">
        <DesktopNavbar></DesktopNavbar>
    </header>

    <header id="mobile-nav">
        <MobileNavbar color={page.data.mobileNavColor}></MobileNavbar>
    </header>
{:else}
    <header>
        <TituloRegistro text={page.url.pathname == "/registro/delegaciones" ? "Registro de delegaciones" : "Registro de faculty"}></TituloRegistro>
    </header>
{/if}

{#if displayDots}
    <ProgressDots></ProgressDots>
{/if}

<main class:set-index-style={page.url.pathname == "/"}>
    {@render children()}
</main>

<Footer full={page.url.pathname == "/"}></Footer>
