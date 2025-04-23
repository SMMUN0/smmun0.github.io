<!-- Versión de la página con registro cerrado -->
<script lang="ts">
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";

    let whatsappToastDiv: HTMLDivElement;

    onMount(async () => {
        // Importar librerías dinámicamente
        window.$ = (await import("jquery")).default;
        await import("@popperjs/core");
        window.bootstrap = await import("bootstrap");

        // Inicializar toast de contacto en WhatsApp
        window.bootstrap.Toast.getOrCreateInstance(whatsappToastDiv).show();
    });
</script>

<style>
    #registro-cerrado {
        width: 100%;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #063372;
        font-family: "The Seasons Bold";
        margin: 1vh 0 0 0;
        font-weight: normal;
        padding: 0.5vh 1vw;
        font-size: 2.8rem;
    }

    h1 {
        margin-bottom: 10vh;
    }
</style>

<div id="registro-cerrado">
    <h1>
        ¡Registro cerrado!
    </h1>
</div>

<!-- Toast para contacto -->
<div style="position: fixed; bottom: 1%; right: 2%;">
    <a target="_blank" rel="noopener noreferrer" href="https://wa.me/529991975309?text=Hola%20%F0%9F%98%81,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20%F0%9F%92%BC%20Modalidad%20de%20participaci%C3%B3n%0A%5B%5D%20%F0%9F%A4%9D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20%F0%9F%91%A4%20Datos%20personales%0A%5B%5D%20%F0%9F%8C%8E%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20%F0%9F%92%B3%20Proceso%20de%20pago%0A" style="text-decoration: none;">
        <div class="toast align-items-center text-bg-primary border-0 bg-success bg-gradient position-relative bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true" id="toast-whatsapp" data-bs-autohide="false" style="position: relative; z-index: 1; width: auto; margin: 1vh 0; cursor: pointer;" bind:this={whatsappToastDiv}>
            <div class="d-flex">
              <div class="toast-body">
                <i class="fa-brands fa-whatsapp fa-xl" style="font-size: 1.5rem;"></i>
                &ensp;
                ¿Dudas? ¡Contáctanos!
              </div>

              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </a>
</div>
