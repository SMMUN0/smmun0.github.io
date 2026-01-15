<script lang="ts">
    import { page } from "$app/state";

    let {
        backgroundColor,
        textColor,
        highlightColor,
        highlightTextColor
    }: {
        backgroundColor: string;
        textColor: string;
        highlightColor: string;
        highlightTextColor: string;
    } = $props();

    let menuOpen = $state(false);

    // Tipo de nav: transparente, index o normal
    const navClass = $derived(page.url.pathname == "/" ? "index-variant" : "");

    const pages = {
        "/": "Inicio",
        "/quienes-somos": "¿Quiénes somos?",
        "/registro": "Registro",
        "/recursos": "Recursos"
    };
</script>

<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        padding: 1vh 0;
        background-color: var(--nav-background-color);
    }

    .navbar-logo {
        z-index: 5;
        padding-left: 5vw;
    }

    .navbar-logo img {
        width: auto;
        height: 6vh;
    }

    nav ul {
        z-index: 6;
        padding: 0;
    }

    .bar {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    #nav-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: -105%;
        top: 5rem;
        flex-direction: column;
        width: 100%;
        border-radius: 24px;
        text-align: center;
        transition: 0.3s;
        background-color: var(--nav-background-color);
        box-shadow: 0px 0px 5px 2px;
    }

    .nav-item {
        margin: 2.5rem 0;
        list-style: none;
        width: 80%;
        border-radius: 24px;
    }

    .nav-item a {
        font-family: "Glacial Indifference Bold";
        line-height: 3rem;
        font-size: 1.6rem;
        text-decoration: none;
        display: block;
        color: var(--nav-text-color);
    }

    #nav-menu.active {
        left: 0;
    }

    #hamburger {
        border: none;
        background-color: transparent;
        display: block;
        cursor: pointer;
        padding: 1vh 5vw 1vh 0;
    }

    #hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    #hamburger.active .bar:nth-child(1) {
        -webkit-transform: translateY(8px) rotate(45deg);
        transform: translateY(8px) rotate(45deg);
    }

    #hamburger.active .bar:nth-child(3) {
        -webkit-transform: translateY(-8px) rotate(-45deg);
        transform: translateY(-8px) rotate(-45deg);
    }

    .logo-registro img {
        height: 8vh;
        margin-left: 0.5vw;
        margin-right: 4vw;
    }

    .active-page {
        background-color: var(--nav-highlight-color);
    }

    .active-page a {
        color: var(--nav-highlight-text-color);
    }
</style>

<nav
    class={navClass}
    style="
        --nav-background-color: {backgroundColor};
        --nav-text-color: {textColor};
        --nav-highlight-color: {highlightColor};
        --nav-highlight-text-color: {highlightTextColor};
    "
>
    <ul id="nav-menu" class:active={menuOpen}>
        {#each Object.entries(pages) as [slug, name]}
            <li
                class="nav-item"
                class:active-page={slug == "/" ? page.url.pathname == "/" : page.url.pathname.includes(slug)}
            >
                <a href={slug} onclick={() => menuOpen = false}>{name}</a>
            </li>
        {/each}
    </ul>
    <button id="hamburger" class:active={menuOpen} onclick={() => menuOpen = !menuOpen} aria-label="Menú">
        <span class="bar" style="background-color: {textColor};"></span>
        <span class="bar" style="background-color: {textColor};"></span>
        <span class="bar" style="background-color: {textColor};"></span>
    </button>
</nav>
