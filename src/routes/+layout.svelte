<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import "@fortawesome/fontawesome-free/css/all.min.css";
    import DesktopNavbar from "$lib/components/DesktopNavbar.svelte";
    import MobileNavbar from "$lib/components/MobileNavbar.svelte";
    import IndexNavbar from "$lib/components/IndexNavbar.svelte";
    import ProgressDots from "$lib/components/ProgressDots.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let { children } = $props();
    let displayDots = $state(false);
    let prefersReducedMotion = $state(false);

    let pageName = $derived(page.url.pathname == "/" ? "index" : page.url.pathname.slice(1, -1));

    onMount(() => {
        prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        min-height: 100%;
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

<header id="desktop-nav" style="position: {page.url.pathname == "/" ? "absolute" : "fixed"}">
    {#if page.url.pathname == "/"}
        <IndexNavbar mobile={false}></IndexNavbar>
    {:else}
        <DesktopNavbar
            backgroundColor={page.data.navBackgroundColor}
            textColor={page.data.navTextColor}
            highlightColor={page.data.navHighlightColor}
            highlightTextColor={page.data.navHighlightTextColor}
        ></DesktopNavbar>
    {/if}
</header>

<header id="mobile-nav" style="position: {page.url.pathname == "/" ? "absolute" : "fixed"}">
    {#if page.url.pathname == "/"}
        <IndexNavbar mobile={true}></IndexNavbar>
    {:else}
        <MobileNavbar
            backgroundColor={page.data.navBackgroundColor}
            textColor={page.data.navTextColor}
            highlightColor={page.data.navHighlightColor}
            highlightTextColor={page.data.navHighlightTextColor}
        ></MobileNavbar>
    {/if}
</header>

{#if displayDots}
    <ProgressDots color={page.url.pathname == "/" ? "#f4d185" : "#df1265"}></ProgressDots>
{/if}

<main class={pageName.replaceAll("/", "-")}>
    {#key page.url.pathname}
        <div
            class="page-transition"
            transition:fly={{
                y: prefersReducedMotion ? 0 : 12,
                duration: prefersReducedMotion ? 0 : 320,
                easing: cubicOut
            }}
        >
            {@render children()}
        </div>
    {/key}
</main>

<Footer full={page.url.pathname == "/"} color={page.data.navHighlightColor}></Footer>

<!--<Footer full={page.url.pathname == "/"}></Footer>-->
