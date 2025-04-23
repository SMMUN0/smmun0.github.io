<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let dotOpacityArray = Array(5).fill(0.5);

    // Actualiza los valores alpha basado en la posición de la página
    function setDotsAlpha(_?: Event) {
        // Calcular porcentaje de scroll
        const scrollPercentage = (document.documentElement.scrollTop || document.body.scrollTop)
            / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight);

        for (let i = 0; i < 5; i++) {
            // Calcular distancia entre el porcentaje de scroll y el percentil del círculo
            const distance = (1 - Math.abs(0.25 * i - scrollPercentage));

            // Actualizar opacidad del círculo (mínimo 0.5)
            dotOpacityArray[i] = Math.max(distance, 0.5);
        }
    }

    onMount(() => {
        setDotsAlpha();
        window.addEventListener("scroll", setDotsAlpha, true);
    });

    onDestroy(() => {
        window.removeEventListener("scroll", setDotsAlpha, true);
    });
</script>

<style>
    aside {
        position: fixed;
        top: 56%;
        transform: translateY(-56%);
        right: 2.5vw;
        display: flex;
        flex-direction: column;
        z-index: 9;
    }

    span {
        height: 1.5vh;
        width: 1.5vh;
        margin: 1vh 0;
        background-color: #053a80;
        border-radius: 50%;
        display: inline-block;
    }
</style>

<aside>
    {#each dotOpacityArray as dotOpacity}
        <span style="opacity: {dotOpacity};"></span>
    {/each}
</aside>
