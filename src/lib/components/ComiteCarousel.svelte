<script lang="ts">
    import type { Carousel } from "bootstrap";
    import { onMount } from "svelte";

    let { comite, index } = $props();

    // Interfaz para almacenar el número de imágenes por comité
    interface NumeroImagenes {
        cstd: number,
        crc: number,
        oit: number,
        nobel: number,
        crm: number,
        unfpa: number,
        osgey: number,
        cidh: number,
        cij: number,
        coi: number
    }

    // Número de imágenes por comité
    let numeroImagenes: NumeroImagenes = {
        cstd: 5,
        crc: 4,
        oit: 4,
        nobel: 4,
        crm: 5,
        unfpa: 5,
        osgey: 5,
        cidh: 5,
        cij: 4,
        coi: 5
    };

    let carouselDiv = $state();
    let carousel: Carousel;

    // Inicializar carrusel
    onMount(() => {
        carousel = window.bootstrap.Carousel.getOrCreateInstance(carouselDiv);
    });

    // Regresar a imagen 0 antes de cambiar de comité
    $effect.pre(() => {
        comite.length;
        if (carousel) carousel.to(0);
    });
</script>

<style>
    #comite-topico-div {
        border: solid #7872a1;
        border-width: thin;
        border-radius: 12px;
        flex-direction: column;
        margin-bottom: 1.5vh;
    }

    .carousel-item img {
        border-radius: 12px;
        width: 28rem;
        height: auto;
        cursor: pointer;
        margin: 2vh 0;
    }

    .carousel-item img:hover {
        opacity: 0.85;
    }

    .carousel .carousel-control-prev-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%238d7abb'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
    }

    .carousel .carousel-control-next-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%238d7abb'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }

    @media screen and (max-width: 820px) {
        .carousel .carousel-control-prev-icon, .carousel .carousel-control-next-icon {
            display: none;
        }

        #comite-topico-div {
            border: none;
        }
    }
</style>

<div id="comite-topico-div">
    <div id="carousel-comite-{index}-{comite}" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true" bind:this={carouselDiv}>
        <div class="carousel-inner">
            {#each { length: numeroImagenes[comite as keyof NumeroImagenes]}, i}
                <div class="carousel-item" class:active={i == 0} data-bs-interval="8000">
                    <div class="d-flex justify-content-center">
                        <img src="/assets/img/comites/{comite}/{i + 1}.webp" class="d-block" width="1080" height="1080" alt="Foto del comité {comite.toUpperCase()} del SMMUN.">
                    </div>
                </div>
            {/each}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-comite-{index}-{comite}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-comite-{index}-{comite}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>
