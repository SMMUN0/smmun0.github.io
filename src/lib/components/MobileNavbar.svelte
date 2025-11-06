<!--<script lang="ts">
    import { page } from "$app/state";

    let { color }: { color: string } = $props();
    let menuOpen = $state(false);

    // Tipo de nav: transparente, index o normal
    const navClass = $derived(page.url.pathname == "/" ? "index-variant" : "");
</script>

<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1vh 0;
        background-color: #fffdfd;
        background-image: url("/assets/img/backgrounds/white_bg.webp");
        background-repeat: repeat;
        background-size: cover;
        transition: background-color 200ms linear;
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
        background-color: #fffdfd;
        background-image: url("/assets/img/backgrounds/white_bg.webp");
        background-repeat: repeat;
        background-size: cover;
    }

    .nav-item {
        margin: 2.5rem 0;
        list-style: none;
        width: 100%;
    }

    .nav-item a {
        font-family: "Glacial Indifference Bold";
        font-size: 1.6rem;
        text-decoration: none;
        display: block;
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

    nav.index-variant {
        background-color: #8e98ac !important;
        background-image: url("/assets/img/backgrounds/blue_bg.webp") !important;
    }

    nav.index-variant .bar, nav.transparent-index-variant .bar {
        background-color: #fffdfd !important;
    }

    nav.index-variant #nav-menu, nav.transparent-index-variant #nav-menu {
        background-color: #8e98ac !important;
        background-image: url("/assets/img/backgrounds/blue_bg.webp") !important;
        box-shadow: 0px 0px 5px 1px #fffdfd !important;
    }

    nav.index-variant .nav-item a, nav.transparent-index-variant .nav-item a {
        color: #fffdfd !important;
    }

    nav.transparent-index-variant {
        background-color: transparent !important;
        background-image: none !important;
        transition: background-color 200ms linear;
    }

    nav.transparent-index-variant .navbar-logo {
        display: none;
    }
</style>

<nav class={navClass}>
    <a href="/" onclick={() => menuOpen = false}>
        <figure class="navbar-logo">
            {#if page.url.pathname == "/"}
                <enhanced:img src="/static/assets/img/logos/smmun_dorado.webp" alt="Logo del SMMUN." />
            {:else}
                <enhanced:img src="/static/assets/img/logos/smmun_deg.svg" alt="Logo del SMMUN." />
            {/if}
        </figure>
    </a>
    <ul id="nav-menu" class:active={menuOpen} style="box-shadow: 0px 0px 5px 2px {color};">
        <li class="nav-item">
            <a href="/" style="color: {color};" onclick={() => menuOpen = false}>Inicio</a>
        </li>
        <li class="nav-item">
            <a href="/quienes-somos" style="color: {color};" onclick={() => menuOpen = false}>¿Quiénes somos?</a>
        </li>
        <li class="nav-item">
            <a href="/registro" style="color: {color};" onclick={() => menuOpen = false}>Registro</a>
        </li>
        <li class="nav-item">
            <a href="/recursos" style="color: {color};" onclick={() => menuOpen = false}>Recursos</a>
        </li>
    </ul>
    <button id="hamburger" class:active={menuOpen} onclick={() => menuOpen = !menuOpen} aria-label="Menú">
        <span class="bar" style="background-color: {color};"></span>
        <span class="bar" style="background-color: {color};"></span>
        <span class="bar" style="background-color: {color};"></span>
    </button>
</nav>
-->
