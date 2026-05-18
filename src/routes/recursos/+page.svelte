<script lang="ts">
    import { comites, getNombreModalComite, getNombreTarjetaComite, type Comite } from "$lib/data/comites";

    let manualSeleccionado: Comite | null = $state(null);

    function abrirManual(manual: Comite) {
        manualSeleccionado = manual;
    }

    function cerrarManual() {
        manualSeleccionado = null;
    }

    function cerrarConEscape(ev: KeyboardEvent) {
        if (ev.key === "Escape") {
            cerrarManual();
        }
    }

    function cerrarDesdeFondo(ev: MouseEvent) {
        if (ev.target === ev.currentTarget) {
            cerrarManual();
        }
    }

    function esComiteEnIngles(manual: Comite) {
        return manual.idiomaModal === "English";
    }
</script>

<svelte:window onkeydown={cerrarConEscape} />

<style>
    :global(body:has(main.recursos)) {
        background: #fff7f8;
    }

    .recursos-section {
        width: 100%;
        min-height: calc(100vh - 8vh - 2rem);
        padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 2vw, 2rem);
        box-sizing: border-box;
        background: #fff7f8;
    }

    .recursos-header {
        max-width: 980px;
        margin: 0 auto clamp(2rem, 4vw, 3.5rem);
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .recursos-header h1 {
        width: fit-content;
        margin: 0 auto;
        font-family: "Catchy Mager";
        font-size: clamp(2.4rem, 6vw, 5.2rem);
        line-height: 1;
        text-align: center;
        color: #ea6880;
        white-space: nowrap;
    }

    .manuales-grid {
        width: min(96vw, 1840px);
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr));
        gap: clamp(1.25rem, 2.3vw, 2rem);
    }

    .manual-card {
        position: relative;
        overflow: hidden;
        min-height: 22rem;
        border: 0;
        border-radius: 8px;
        padding: 0;
        background: #3e3638;
        color: #ffffff;
        cursor: pointer;
        text-align: left;
        box-shadow: 0 1rem 2.2rem rgba(62, 54, 56, 0.18);
    }

    .manual-card img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 240ms ease, opacity 240ms ease;
    }

    .manual-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.72));
    }

    .manual-card-content {
        position: relative;
        z-index: 1;
        height: 100%;
        min-height: 22rem;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding: 1.4rem;
        box-sizing: border-box;
    }

    .manual-card h2 {
        margin: 0;
        font-family: "Catchy Mager";
        font-size: clamp(2rem, 3.5vw, 3.2rem);
        line-height: 0.95;
        color: #ffffff;
    }

    .manual-card p {
        margin: 0.65rem 0 0;
        font-family: "The Seasons";
        font-size: 1rem;
        line-height: 1.3;
        color: #fff0f3;
    }

    .manual-card span {
        position: absolute;
        top: 1.2rem;
        left: 1.2rem;
        z-index: 1;
        width: fit-content;
        padding: 0.35rem 0.7rem;
        border: 1px solid rgba(255, 255, 255, 0.65);
        border-radius: 999px;
        font-family: "The Seasons";
        font-size: 0.82rem;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.26);
    }

    @media (prefers-reduced-motion: no-preference) {
        .manual-card:hover img,
        .manual-card:focus-visible img {
            transform: scale(1.05);
            opacity: 0.9;
        }
    }

    .manual-card:focus-visible {
        outline: 3px solid #000000;
        outline-offset: 4px;
    }

    .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        background: rgba(32, 28, 30, 0.66);
    }

    .manual-modal {
        width: min(980px, 100%);
        max-height: min(92vh, 860px);
        box-sizing: border-box;
        overflow: auto;
        border-radius: 8px;
        background: #ffffff;
        color: #3e3638;
        box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.3);
    }

    .modal-header {
        display: flex;
        gap: 1rem;
        align-items: start;
        justify-content: space-between;
        padding: 1.25rem 1.5rem 0;
        box-sizing: border-box;
    }

    .modal-header > div {
        min-width: 0;
    }

    .modal-header h2 {
        margin: 0;
        font-family: "Catchy Mager";
        font-size: clamp(2.1rem, 4vw, 3.6rem);
        line-height: 1;
        color: #ea6880;
    }

    .modal-header p {
        margin: 0.35rem 0 0;
        font-family: "The Seasons";
        font-size: 1.05rem;
        line-height: 1.35;
        color: #3e3638;
        overflow-wrap: anywhere;
    }

    .close-button {
        width: 2.4rem;
        height: 2.4rem;
        flex: 0 0 auto;
        border: 1px solid #ead6dc;
        border-radius: 50%;
        background: #fff7f8;
        color: #3e3638;
        cursor: pointer;
        font-size: 1.45rem;
        line-height: 1;
    }

    .modal-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.8rem;
        padding: 1.25rem 1.5rem 1.5rem;
        box-sizing: border-box;
    }

    .modal-info {
        min-width: 0;
        box-sizing: border-box;
        border: 1px solid #f0cbd4;
        border-radius: 8px;
        padding: 1rem;
        background: #fffafb;
    }

    .modal-info h3 {
        margin: 0 0 0.8rem;
        font-family: "The Seasons";
        font-size: 1.2rem;
        color: #ea6880;
    }

    .modal-info p {
        margin: 0;
        font-family: "The Seasons";
        font-size: 1rem;
        line-height: 1.45;
        overflow-wrap: anywhere;
    }

    .modal-info p + p {
        margin-top: 0.9rem;
    }

    .download-link {
        display: flex;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        min-height: 4rem;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: #ea6880;
        color: #ffffff;
        font-family: "The Seasons";
        font-size: 1.05rem;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        overflow-wrap: anywhere;
    }

    .download-link:hover,
    .download-link:focus-visible {
        background: #3e3638;
    }

    @media (max-width: 640px) {
        .recursos-section {
            padding: 2rem 5vw;
        }

        .recursos-header h1 {
            font-size: 2rem;
        }

        .manuales-grid,
        .modal-grid {
            width: 100%;
            grid-template-columns: 1fr;
        }

        .manual-card,
        .manual-card-content {
            min-height: 18rem;
        }

        .modal-backdrop {
            align-items: center;
            padding: 1rem;
        }

        .manual-modal {
            width: min(100%, 34rem);
            max-height: 88vh;
            border-radius: 8px;
        }

        .modal-header {
            padding: 1rem 1rem 0;
        }

        .modal-grid {
            padding: 1rem;
        }
    }
</style>

<section class="recursos-section">
    <header class="recursos-header">
        <h1>Manuales para delegaciones</h1>
    </header>

    <div class="manuales-grid" aria-label="Lista de manuales por comité">
        {#each comites as manual}
            <button
                class="manual-card"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={manualSeleccionado?.slug === manual.slug}
                onclick={() => abrirManual(manual)}
            >
                <img src={manual.imagen} alt="Foto del comité {manual.siglas}." loading="lazy">
                <span>{manual.idiomaTarjeta}</span>
                <div class="manual-card-content">
                    <h2>{manual.siglas}</h2>
                    <p>{getNombreTarjetaComite(manual)}</p>
                </div>
            </button>
        {/each}
    </div>
</section>

{#if manualSeleccionado}
    <div
        class="modal-backdrop"
        role="presentation"
        onclick={cerrarDesdeFondo}
    >
        <div
            class="manual-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="manual-title"
            tabindex="-1"
        >
            <div class="modal-header">
                <div>
                    <h2 id="manual-title">{manualSeleccionado.siglas}</h2>
                    <p>{getNombreModalComite(manualSeleccionado)}</p>
                </div>
                <button class="close-button" type="button" aria-label="Cerrar" onclick={cerrarManual}>
                    ×
                </button>
            </div>

            <div class="modal-grid">
                <div class="modal-info">
                    <h3>
                        {#if esComiteEnIngles(manualSeleccionado)}
                            {manualSeleccionado.topicos.length > 1 ? "Topics" : "Topic"}
                        {:else}
                            {manualSeleccionado.topicos.length > 1 ? "Tópicos" : "Tópico"}
                        {/if}
                    </h3>
                    {#each manualSeleccionado.topicos as topico, i}
                        <p>
                            {#if manualSeleccionado.topicos.length > 1}
                                <strong>
                                    {esComiteEnIngles(manualSeleccionado) ? "Topic" : "Tópico"} {i === 0 ? "A" : "B"}:
                                </strong>
                            {/if}
                            {topico}
                        </p>
                    {/each}
                </div>

                <div class="modal-info">
                    <h3>{esComiteEnIngles(manualSeleccionado) ? "Language" : "Idioma"}</h3>
                    <p>{manualSeleccionado.idiomaModal}</p>
                </div>

                <a class="download-link" href={manualSeleccionado.manual} target="_blank" rel="noopener noreferrer">
                    {esComiteEnIngles(manualSeleccionado) ? "Download handbook" : "Descargar manual"}
                </a>
            </div>
        </div>
    </div>
{/if}
