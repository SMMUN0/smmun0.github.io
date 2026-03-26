<!-- Registro cerrado, no está en uso -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import TituloRegistro from "$lib/components/TituloRegistro.svelte";
    import ComiteCarousel from "$lib/components/ComiteCarousel.svelte";
    import { intlPhone } from "$lib/actions/intlPhone";
    import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
    import { onChangeSaveCookie, resetValuesFromCookies, validateNumInput } from "$lib/util";
    import { registroTitleNav } from "$lib/stores/registro-title-nav";
    import delegacionesUntyped from "$lib/data/delegaciones.json";
    import { paises } from "$lib/data/paises.json";
    import "intl-tel-input/build/css/intlTelInput.css";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap-select/dist/css/bootstrap-select.min.css";

    // Workaround para emojis de banderas en algunos navegadores
    polyfillCountryFlagEmojis();

    // Lista de comités
    let comites = [
        {
            nombre: "Tercera Comisión de la Asamblea General referente a lo Social, Cultural, Humanitario y de Derechos Humanos (SOCHUM) [bilingüe: español/inglés]",
            siglas: "SOCHUM"
        },
        {
            nombre: "Programa Conjunto de las Naciones Unidas para el VIH-SIDA (ONU SIDA)",
            siglas: "ONU SIDA"
        },
        {
            nombre: "Programa de las Naciones Unidas para los Asentamientos Humanos (ONU-Hábitat)",
            siglas: "ONU-Hábitat"
        },
        {
            nombre: "Comisión de prevención del delito y Justicia Penal de las Naciones Unidas (CCPCJ)",
            siglas: "CCPCJ"
        },
        
        {
            nombre: "Agencia de las Naciones Unidas para los Refugiados de Palestina en Oriente Próximo (UNRWA)",
            siglas: "UNRWA"
        },
        {
            nombre: "Cumbre del Futuro [solo delegación individual]",
            siglas: "Cumbre"
        },
        {
            nombre: "Administración Nacional de Aeronáutica y del Espacio (NASA)",
            siglas: "NASA"
        },
        {
            nombre: "World Wildlife Fund for Nature (WWF) [inglés]",
            siglas: "WWF"
        },
        {
            nombre: "Crisis Futura [solo delegación individual]",
            siglas: "Crisis"
        },
        {
            nombre: "Federación Internacional del Automóvil (FIA)",
            siglas: "FIA"
        },
        {
            nombre: "Federación de Alta Costura y Moda (FHCM)",
            siglas: "FHCM"
        }
    ];

    type Topico = string | [string, string];

    let topicos: Record<string, Topico> = {
        "SOCHUM": [
            "Medidas para reducir los casos de apatridia, un seguimiento al Plan de Acción Mundial 2014-2024 adoptado por ACNUR.",
            "Estrategias para promover el derecho a la privacidad en la era digital, un seguimiento a la Resolución 68/167 adoptada por la Asamblea General."
        ],
        "ONU SIDA": [
            "Estrategias para brindar un acceso justo a los servicios de salud a las personas trabajadoras sexuales seropositivas.",
            "Estrategias para garantizar a mujeres seropositivas la terapia antirretroviral durante y después del embarazo."
        ],
        "ONU-Hábitat": [
            "Estrategias de prevención para la urbanización acelerada con el fin de mejorar la calidad de vida en los asentamientos humanos.",
            "Acciones para combatir la falta de accesibilidad, seguridad y adaptación en la infraestructura urbana para la autonomía de las personas con discapacidad."
        ],
        "CCPCJ": [
            "Medidas para garantizar la reinserción social integral a través de programas penitenciarios y seguimiento postpenitenciario.",
            "Medidas para salvaguardar los derechos humanos de las personas en situación de pobreza ante el tráfico ilícito de órganos y tejidos humanos."
        ],
        "UNRWA": "Medidas para la protección de las garantías humanitarias y civiles en los Territorios Palestinos Ocupados derivada de la privación de recursos esenciales.",
        "Cumbre": "Consolidación de un nuevo Pacto para el Futuro para responder a los desafíos globales del siglo XX.",
        "NASA": [
            "Acciones para garantizar el enfoque ético en las recientes expediciones a Marte.",
            "Medidas para garantizar la garantizar la inclusión de las mujeres en las ciencias con el fin de desarrollar las carreras especiales."
        ],
        "WWF": [
            "Measures to strengthen the regulation and traceability of wildlife trade and its biological derivatives.",
            "Actions to safeguard genetic diversity and ensure equitable access to genetic resources, addressing the accelerating loss of ecological variety."
        ],
        "Crisis": "Año 2076: evitar un conflicto armado en una sociedad que empieza a renacer.",
        "FIA": "Medidas para garantizar la participación de las mujeres en deportes automovilísticos para la promoción de la igualdad y eliminación de la brecha de género.",
        "FHCM": "Estrategias para mitigar los efectos sociales y económicos derivados de las condiciones laborales en la industria de la moda."
    };

    const horariosComites: Record<string, string> = {
        "SOCHUM": "Matutino (9 am a 2 pm)",
        "ONU-Hábitat": "Matutino (9 am a 2 pm)",
        "CCPCJ": "Matutino (9 am a 2 pm)",
        "FHCM": "Matutino (9 am a 2 pm)",
        "NASA": "Matutino (9 am a 2 pm)",
        "Cumbre": "Vespertino (3 pm a 8 pm)",
        "UNRWA": "Vespertino (3 pm a 8 pm)",
        "ONU SIDA": "Vespertino (3 pm a 8 pm)",
        "Crisis": "Vespertino (3 pm a 8 pm)",
        "FIA": "Vespertino (3 pm a 8 pm)",
        "WWF": "Vespertino (3 pm a 8 pm)"
    };

    // Interfaces para leer JSON de delegaciones
    interface Delegacion {
        nombre: string;
        abreviacion: string;
        emoji: string;
        descripcion?: string;
    }

    interface DelegacionGrupo {
        [tipo: string]: Delegacion[];
    }

    interface Delegaciones {
        sochum: Delegacion[];
        onu_sida: Delegacion[];
        ccpcj: Delegacion[];
        onu_habitat: Delegacion[];
        unrwa: Delegacion[];
        fhcm: DelegacionGrupo;
        crisis: Delegacion[];
        nasa: DelegacionGrupo;
        fia: DelegacionGrupo;
        wwf: Delegacion[];
        cumbre_futuro: DelegacionGrupo;
    }

    // JSON de delegaciones
    const delegaciones = delegacionesUntyped as Delegaciones;

    const delegacionTiposLabels: Record<string, string> = {
        sponsors: "Sponsors",
        escuderias: "Escuderías",
        pilotos: "Pilotos",
        casas: "Casas de Alta Costura",
        sindicatos: "Sindicatos",
        disenadores_emergentes: "Diseñadoras y empresas emergentes",
        agencias_espaciales: "Agencias espaciales",
        astronautas: "Astronautas",
        representantes_nasa: "Representantes de la NASA",
        activistas: "Activistas",
        ongs: "Organizaciones No Gubernamentales",
        agencias_onu: "Agencias de las Naciones Unidas",
        jefes_estado: "Jefes de Estado"
    };

    const delegacionTiposSoloIndividual = new Set([
        "pilotos",
        "disenadores_emergentes",
        "astronautas",
        "representantes_nasa"
    ]);

    const comitesConTipos = new Set<keyof Delegaciones>(["fia", "fhcm", "nasa", "cumbre_futuro"]);

    function getDelegacionTipoLabel(tipo: string, modalidad?: string) {
        const baseLabel = delegacionTiposLabels[tipo] ?? tipo;

        if (modalidad === "pareja" && delegacionTiposSoloIndividual.has(tipo)) {
            return `${baseLabel} (solo disponible en individual)`;
        }

        return baseLabel;
    }

    function isDelegacionTipoDisponibleEnModalidad(tipo: string, modalidad?: string) {
        if (modalidad === "pareja" && delegacionTiposSoloIndividual.has(tipo)) {
            return false;
        }

        return true;
    }

    function comiteSiglasToKey(siglas: string): keyof Delegaciones {
        const normalizado = siglas.toLowerCase().replace(" ", "_").replace("-", "_").replace("á", "a");

        if (normalizado === "cumbre") {
            return "cumbre_futuro";
        }

        return normalizado as keyof Delegaciones;
    }

    function obtenerTipoDelegacion(
        comiteKey: keyof Delegaciones,
        nombreDelegacion: string
    ): string | undefined {
        if (!comitesConTipos.has(comiteKey)) {
            return undefined;
        }

        const grupos = delegaciones[comiteKey] as DelegacionGrupo;

        for (const [tipo, lista] of Object.entries(grupos)) {
            if (lista.some((delegacion) => delegacion.nombre === nombreDelegacion)) {
                return tipo;
            }
        }

        return undefined;
    }

    function getHorarioComite(siglas: string) {
        return horariosComites[siglas] ?? "";
    }

    // Observador para cambiar el nav
    let navObserver: IntersectionObserver;

    // Elementos del DOM
    let formDelegaciones: HTMLFormElement;
    let correoValidity = $state([true, true]);
    let comprobanteToastDiv: HTMLDivElement;
    let enviarToastDiv: HTMLDivElement;
    let whatsappToastDiv: HTMLDivElement;
    let sentinel: HTMLDivElement;

    // Variables reactivas
    let modalidadValue: string | undefined = $state();
    let delegacionOficialValue: string | undefined = $state();
    let edadValues: string[] = $state(Array(2));
    let escolaridadValues: string[] = $state(Array(2));
    let comiteValues: string[] = $state(Array(3));
    let comitePaisValues: string[][] = $state(Array(3).fill(Array(3)));
    let loadedCookies = $state(false);
    let idempotencyKey = $state("");
    let isSubmitting = $state(false);
    const IDEMPOTENCY_STORAGE_KEY = "registro-delegaciones-idempotency-key";
    const SUBMIT_FALLBACK_TIMEOUT_MS = 10000;
    let pageShowHandler: ((event: Event) => void) | undefined;
    let submitFallbackTimeout: ReturnType<typeof setTimeout> | undefined;

    function createIdempotencyKey() {
        if (crypto.randomUUID) {
            return crypto.randomUUID().replace(/-/g, "");
        }

        const randomBytes = new Uint8Array(16);
        crypto.getRandomValues(randomBytes);
        return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    }

    function ensureIdempotencyKey() {
        const storedKey = sessionStorage.getItem(IDEMPOTENCY_STORAGE_KEY);
        if (storedKey) {
            idempotencyKey = storedKey;
            return idempotencyKey;
        }

        idempotencyKey = createIdempotencyKey();
        sessionStorage.setItem(IDEMPOTENCY_STORAGE_KEY, idempotencyKey);
        return idempotencyKey;
    }

    // Event handlers
    function onChangeModalidad(ev: Event) {
        const select = ev.target as HTMLSelectElement;
        const nuevaModalidad = select.value;

        for (let i = 0; i < 3; i++) {
            if (nuevaModalidad === "pareja" && ["Cumbre", "Crisis"].includes(comiteValues[i])) {
                comiteValues[i] = "";

                for (let j = 0; j < 3; j++) {
                    comitePaisValues[i][j] = "";
                }
            }
        }

        for (let i = 0; i < 3; i++) {
            const comiteSiglas = comiteValues[i];

            if (!comiteSiglas) continue;

            const comiteKey = comiteSiglasToKey(comiteSiglas);

            if (!comitesConTipos.has(comiteKey)) continue;

            for (let j = 0; j < 3; j++) {
                const valor = comitePaisValues[i][j];

                if (!valor) continue;

                const indiceDosPuntos = valor.indexOf(":");
                const nombreDelegacion =
                    indiceDosPuntos === -1 ? valor : valor.slice(indiceDosPuntos + 1);

                const tipoDelegacion = obtenerTipoDelegacion(comiteKey, nombreDelegacion);

                if (tipoDelegacion && !isDelegacionTipoDisponibleEnModalidad(tipoDelegacion, nuevaModalidad)) {
                    comitePaisValues[i][j] = "";
                }
            }
        }

        onChangeSaveCookie(ev);
    }

    function onChangeEdad(ev: Event, index: number) {
        let input = ev.target as HTMLInputElement;
        edadValues[index] = input.value.replace(/[^\d]/gi, "");

        if (!validateNumInput(input.value, 11, 26)) {
            input.setCustomValidity("Edad inválida.");
        }
        else {
            input.setCustomValidity("");
        }

        onChangeSaveCookie(ev);
    }

    function onChangeCorreo(ev: Event, index: number) {
        let input = ev.target as HTMLInputElement;
        correoValidity[index] = input.checkValidity();
        onChangeSaveCookie(ev);
    }

    function onChangeComite(ev: Event, index: number) {
        if (index <= 1 && comiteValues[2] == comiteValues[index]) {
            comiteValues[2] = "";
        }

        if (index == 0 && comiteValues[1] == comiteValues[index]) {
            comiteValues[1] = "";
        }

        for (let i = 0; i < 3; i++) {
            comitePaisValues[index][i] = "";
        }

        onChangeSaveCookie(ev);
    }

    function onChangePais(ev: Event, comite_index: number, pais_index: number) {
        if (pais_index <= 1 && comitePaisValues[comite_index][2] == comitePaisValues[comite_index][pais_index]) {
            comitePaisValues[comite_index][2] = ""; 
        }

        if (pais_index == 0 && comitePaisValues[comite_index][1] == comitePaisValues[comite_index][pais_index]) {
            comitePaisValues[comite_index][1] = "";
        }

        onChangeSaveCookie(ev);
    }

    function onChangeComprobante(ev: Event) {
        let input = ev.target as HTMLInputElement;
        let comprobanteToast = window.bootstrap.Toast.getOrCreateInstance(comprobanteToastDiv);

        // Mostrar error si el archivo excede los 5 MB
        if (input.files![0].size > 5242880) {
            comprobanteToast.show();
            input.value = "";
        }
    }

    function onSubmitForm(ev: Event) {
        let form = ev.target as HTMLFormElement;

        if (submitFallbackTimeout) {
            clearTimeout(submitFallbackTimeout);
            submitFallbackTimeout = undefined;
        }

        if (!form.checkValidity()) {
            ev.preventDefault();
            ev.stopPropagation();
            isSubmitting = false;

            // Mostrar error
            window.bootstrap.Toast.getOrCreateInstance(enviarToastDiv).show();
        }
        else if (isSubmitting) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        else {
            ensureIdempotencyKey();
            isSubmitting = true;
            submitFallbackTimeout = setTimeout(() => {
                isSubmitting = false;
                submitFallbackTimeout = undefined;
            }, SUBMIT_FALLBACK_TIMEOUT_MS);
        }

        form.classList.add("was-validated");
    }

    // Actualizar selects cuando se cambien datos
    $effect(() => {
        // Dependencias
        modalidadValue?.length;
        for (const escolaridad of escolaridadValues) escolaridad?.length;
        for (const comite of comiteValues) comite?.length;
        for (const comite of comitePaisValues) for (const pais of comite) pais?.length;

        if (window.$) {
            window.$(".selectpicker").selectpicker("refresh");
        }
    });

    onMount(async () => {
        // Importar librerías dinámicamente
        window.$ = (await import("jquery")).default;
        await import("@popperjs/core");
        window.bootstrap = await import("bootstrap");
        await import("bootstrap-select");

        // Inicializar selects
        window.$(".selectpicker").selectpicker();

        // Inicializar toast de contacto en WhatsApp
        window.bootstrap.Toast.getOrCreateInstance(whatsappToastDiv).show();

        ensureIdempotencyKey();
        pageShowHandler = () => {
            isSubmitting = false;
            ensureIdempotencyKey();
        };
        window.addEventListener("pageshow", pageShowHandler);
        resetValuesFromCookies(formDelegaciones.elements);
        loadedCookies = true;

        // Actualizar navbar al hacer scroll
        navObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                registroTitleNav.set(false);
            } else {
                registroTitleNav.set(true);
            }
        }, {
            root: null,
            threshold: 0
        });

        navObserver.observe(sentinel);
    });

    onDestroy(() => {
        if (pageShowHandler) {
            window.removeEventListener("pageshow", pageShowHandler);
        }
        if (submitFallbackTimeout) {
            clearTimeout(submitFallbackTimeout);
        }
        if (navObserver) {
            navObserver.disconnect();
        }
    });
</script>

<!-- Workaround para aplicar estilos a los elementos de bootstrap-select e intl -->
<svelte:head>
    <style>
        .dropdown-menu input {
            margin: 0;
        }

        .dropdown-item.active, .dropdown-item:active {
            background-color: #ea6880 !important;
        }

        .filter-option-inner-inner hr {
            display: none;
        }

        .bs-searchbox {
            padding: 1vh 2vw;
        }

        .bs-searchbox input {
            font-size: 0.8rem;
            line-height: 1rem;
        }

        @media screen and (max-width: 820px) {
            .bs-searchbox input {
                font-size: 1rem;
                line-height: 1.2rem;
            }
        }

        .bootstrap-select button {
            margin-bottom: 1.5vh;
            background-color: #ffffff;
            border: var(--bs-border-width) solid #ea6880;
            border-radius: var(--bs-border-radius);
        }

        .bootstrap-select .dropdown-menu li a span {
            font-family: "Twemoji Country Flags", "Catchy Mager";
            font-size: 0.8rem;
            line-height: 1rem;
            text-wrap: wrap;
        }

        @media screen and (max-width: 820px) {
            .bootstrap-select .dropdown-menu li a span {
                font-size: 1rem;
                line-height: 1.2rem;
            }
        }

        .bootstrap-select .dropdown-menu li a span hr {
            margin-bottom: var(--bs-dropdown-item-padding-y);
        }

        .iti {
            width: 100%;
            margin-bottom: 1.5vh;
        }

        .iti__search-input {
            height: 2rem;
        }

        .iti__country-container {
            height: 2.4rem;
        }

        .iti__country {
            margin: 1rem 0;
        }

        .iti__selected-country-primary {
            margin: 0 0.5vw;
        }

        .iti__dropdown-content {
            border-radius: var(--bs-border-radius);
            padding: 2vh 1.5vw !important;
        }

        .bootstrap-select .dropdown-toggle .filter-option-inner-inner {
            color: #44372b;
        }
    </style>
</svelte:head>

<style>
    :global(body:has(main.registro-delegaciones)) {
        background-color: #fafafa;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E"),
        linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 1px,
            transparent 1px
        );
        background-size: 200px 200px, 100% 28px;
        background-position: 0 0, 0 5px;
    }

    /*:global(body:has(main.registro-delegaciones))::before {
        content: "";
        position: fixed;
        top: 0;
        left: 64px;
        width: 2px;
        height: 100vh;
        background-color: rgba(200, 0, 0, 0.35);
        pointer-events: none;
        z-index: -1;
    }*/

    .titulo {
        background-color: #ea6880;
        padding: 2vh 0 2vh 0;
        color: #f0f0f0;
        font-family: "Catchy Mager";
        margin-bottom: 2vh;
    }

    .titulo h2 {
        margin: 0;
        padding: 0.5vh 3vw;
        font-size: 2.3rem;
        text-align: center;
        font-weight: bold;
    }

    form {
        display: flex;
        flex-direction: column;
        font-family: "Catchy Mager";
    }

    form a {
        color: #44372b;
    }

    div:has(#img-modalidad) {
        width: 86%;
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-self: center;
    }

    #img-modalidad {
        width: 100%;
        height: auto;
        margin: 1vh 0;
        border-radius: 12px;
    }

    div:has(#img-pago) {
        display: flex;
        flex-direction: column;
    }

    #img-pago {
        width: 30rem;
        height: auto;
        align-self: center;
        justify-self: center;
        margin: 1vh 0;
        border-radius: 12px;
    }

    .mb-3 {
        margin: 0 7vw;
    }

    form > div {
        margin-bottom: 3vh;
    }

    form input {
        margin-bottom: 1.5vh;
        border: var(--bs-border-width) solid #ea6880;
        border-radius: var(--bs-border-radius);
    }

    form input:focus {
        border: none;
    }

    label {
        color: #44372b;
        font-weight: bold;
    }

    .comite-topico-div {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .comite-horario {
        margin: 0;
        color: #44372b;
        font-family: "Catchy Mager";
        font-size: 1rem;
        line-height: 1.4;
    }
</style>

<!-- Sentinel para cambiar el navbar -->
<div id="nav-sentinel" bind:this={sentinel}></div>

<!-- Título -->
<TituloRegistro text="Registro de delegaciones"></TituloRegistro>

<!-- Forms -->
<form bind:this={formDelegaciones} method="POST" action="https://api.smmun.com/registro/delegaciones" name="registro-delegaciones" enctype="multipart/form-data" class="col g-3" novalidate onsubmit={onSubmitForm}>
    <input type="hidden" name="idempotency_key" bind:value={idempotencyKey}>
    <!-- Selección de modalidad -->
    <article class="titulo">
        <div class="oval">
            <h2>
                Modalidad
            </h2>
        </div>
    </article>

    <div>
        <enhanced:img id="img-modalidad" src="/static/assets/img/registro/modalidad.png" alt="Modalidades permitidas para cada comité." />
    </div>

    <div class="mb-3">
        <div>
            <label for="modalidad" class="form-label">Selecciona tu modalidad de participación <span style="color: red;">*</span></label>
            <select onchange={onChangeModalidad} bind:value={modalidadValue} autocomplete="off" data-width="86vw" class="selectpicker" required name="modalidad">
                <option selected disabled value="">Selecciona una opción</option>
                <option value="individual">Delegación (individual)</option>
                <option value="pareja">Codelegación (bina)</option>
            </select>
            <div class="invalid-feedback">Debes seleccionar una opción.</div>
        </div>

        {#if modalidadValue == "pareja"}
            <p>
                <strong>Nota:</strong> El registro de una codelegación solo deberá llenarse una vez con la información de las dos participantes.
            </p>
        {/if}
    </div>

    <!-- Selección de delegación oficial -->
    <article class="titulo">
        <h2>Delegación oficial</h2>
    </article>

    <div class="mb-3">
        <p>Una delegación oficial es un grupo que representa a una agrupación y tiene a una persona que lo asesora, el cual recibeel nombre de Faculty Advisor.</p>

        <div>
            <label for="delegacion_oficial" class="form-label">¿Perteneces a una delegación oficial? <span style="color: red;">*</span></label>
            <select onchange={onChangeSaveCookie} bind:value={delegacionOficialValue} autocomplete="off" data-width="86vw" class="selectpicker" required name="delegacion_oficial">
                <option selected disabled value="">Selecciona una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
            </select>
            <div class="invalid-feedback">Debes seleccionar una opción.</div>
        </div>

        {#if delegacionOficialValue == "si" || !loadedCookies}
            <p>
                <strong>Nota:</strong> Para inscribirte como parte de una Delegación Oficial, primero se debe <a href="/registro/faculty">registrar el Faculty Advisor</a> y pagar la cuota de recuperación. Una vez confirmado el pago, ya se podrán registrar las personas integrantes de la Delegación Oficial.
            </p>

            <div style="margin-top: 1.5vh;">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" autocomplete="off" name="nombre_delegacion_oficial" placeholder="Nombre completo de la agrupación (sin siglas o abreviaturas)" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>

            <div>
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" autocomplete="off" name="responsable_delegacion_oficial" placeholder="Nombre completo de la persona responsable de la delegación oficial" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
        {/if}
    </div>

    <!-- Sección de datos personales de la delegación y codelegación -->
    {#each { length: 2 }, i}
        {#if i == 0 || modalidadValue == "pareja" || !loadedCookies} <!-- No mostrar la segunda sección si no se eligió codelegación -->
            <article class="titulo">
                <div class="oval">
                    <h2>
                        {#if i == 0}
                            {#if modalidadValue == "pareja"}
                                Datos personales (codelegación #1)
                            {:else}
                                Datos personales
                            {/if}
                        {:else}
                            Datos personales (codelegación #2)
                        {/if}
                    </h2>
                </div>
            </article>

            <div class="mb-3">
                <label for="nombre_{i}" class="form-label">Nombre completo <span style="color: red;">*</span></label>
                <div class="row g-3">
                    <div class="col">
                        <input oninput={onChangeSaveCookie} class="form-control" required autocomplete="off" name="nombre_{i}" placeholder="Nombre(s)" type="text" maxlength="150">
                        <div class="invalid-feedback">Debes llenar este campo.</div>
                    </div>
                    <div class="col">
                        <input oninput={onChangeSaveCookie} class="form-control" required autocomplete="off" name="apellido_{i}" placeholder="Apellidos" type="text" maxlength="150">
                        <div class="invalid-feedback">Debes llenar este campo.</div>
                    </div>
                </div>

                <div>
                    <label for="edad_{i}" class="form-label">Edad <span style="color: red;">*</span></label>
                    <input oninput={(ev) => onChangeEdad(ev, i)} bind:value={edadValues[i]} class="form-control" required autocomplete="off" name="edad_{i}" placeholder="11-26 años" type="text" maxlength="2" inputmode="numeric" class:is-invalid={!validateNumInput(edadValues[i], 11, 26)}>
                    <div class="invalid-feedback">La edad no es válida.</div>
                </div>

                <div>
                    <label for="celular_{i}" class="form-label">Número de celular <span style="color: red;">*</span></label>
                    <input oninput={onChangeSaveCookie} use:intlPhone class="form-control" name="celular_{i}" data-name="celular_{i}" required autocomplete="off" placeholder="999 123 4567" type="tel" maxlength="30">
                </div>

                <div>
                    <label for="correo_{i}" class="form-label">Correo electrónico <span style="color: red;">*</span></label>
                    <input oninput={(ev) => onChangeCorreo(ev, i)} class="form-control" required autocomplete="off" name="correo_{i}" placeholder="ejemplo@dominio.com" type="email" maxlength="150" class:is-invalid={!correoValidity[i]}>
                    <div class="invalid-feedback">El correo no es válido.</div>
                </div>

                <label for="pais_{i}" class="form-label">País, estado y ciudad de residencia <span style="color: red;">*</span></label>
                <div class="row g-3">
                    <div class="col">
                        <select onchange={onChangeSaveCookie} autocomplete="off" data-width="100%" class="selectpicker select-pais" required name="pais_{i}">
                            <option disabled value="">Selecciona una opción</option>

                            {#each paises as pais}
                                {#if pais == "México"}
                                    <option selected value={pais}>{pais}</option>
                                {:else}
                                    <option value={pais}>{pais}</option>
                                {/if}
                            {/each}
                        </select>
                        <div class="invalid-feedback">Debes seleccionar una opción.</div>
                    </div>
                    <div class="col">
                        <input oninput={onChangeSaveCookie} class="form-control" required autocomplete="off" name="ciudad_estado_{i}" placeholder="Ciudad y estado" type="text" maxlength="150">
                        <div class="invalid-feedback">Debes llenar este campo.</div>
                    </div>
                </div>

                <div>
                    <label for="escolaridad_{i}" class="form-label">Escolaridad <span style="color: red;">*</span></label>
                    <select onchange={onChangeSaveCookie} bind:value={escolaridadValues[i]} autocomplete="off" data-width="86vw" class="selectpicker" required name="escolaridad_{i}">
                        <option selected disabled value="">Selecciona una opción</option>
                        <option value="Secundaria">Secundaria</option>
                        <option value="Preparatoria">Preparatoria</option>
                        <option value="Universidad">Universidad</option>
                        <option value="Egresado">Egresado</option>
                        <option value="No estudio">No estudio</option>
                    </select>
                    <div class="invalid-feedback">Debes seleccionar una opción.</div>
                </div>

                {#if escolaridadValues[i] != "No estudio" || !loadedCookies} <!-- No mostrar si se eligió "no estudio" -->
                    <div>
                        <label for="escuela_{i}" class="form-label">Nombre completo de tu escuela de procedencia (en caso de ser egresado, de donde te graduaste) <span style="color: red;">*</span></label>
                        <input oninput={onChangeSaveCookie} class="form-control" required autocomplete="off" name="escuela_{i}" placeholder="Ejemplo: Facultad de Derecho UADY" type="text" maxlength="150">
                        <div class="invalid-feedback">Debes llenar este campo.</div>
                    </div>
                {/if}

                <label for="nombre_contacto_{i}" class="form-label">En caso de emergencia, ¿a quién podemos contactar? <span style="color: red;">*</span></label>
                <div class="row g-3">
                    <div class="col">
                        <input oninput={onChangeSaveCookie} class="form-control" required autocomplete="off" name="nombre_contacto_{i}" placeholder="Nombre completo" type="text" maxlength="150">
                        <div class="invalid-feedback">Debes llenar este campo.</div>
                    </div>
                    <div class="col">
                        <input oninput={onChangeSaveCookie} use:intlPhone class="form-control" required autocomplete="off" name="celular_contacto_{i}" data-name="celular_contacto_{i}" placeholder="Celular" type="tel" maxlength="30">
                    </div>
                    <div class="col">
                        <input oninput={onChangeSaveCookie} class="form-control" required autocomplete="off" name="relacion_contacto_{i}" placeholder="Parentesco" type="text" maxlength="150">
                        <div class="invalid-feedback">Debes llenar este campo.</div>
                    </div>
                </div>

                <div>
                    <label for="info_extra_{i}" class="form-label">¿Tienes alguna necesidad específica que debamos conocer?</label>
                    <input oninput={onChangeSaveCookie} class="form-control" autocomplete="off" name="info_extra_{i}" placeholder="Ejemplo: padecimientos, alergias, tratamientos en curso u otros" type="text" maxlength="150">
                    <div class="invalid-feedback">Debes llenar este campo.</div>
                </div>
            </div>
        {/if}
    {/each}

    <!-- Selección de comités y países -->
    {#each { length: 3 }, i}
        <article class="titulo">
            <h2>
                {#if i == 0}
                    Primera opción de comité
                {:else if i == 1}
                    Segunda opción de comité
                {:else}
                    Tercera opción de comité
                {/if}
            </h2>
        </article>

        <div class="mb-3">
            <!-- Comité -->
            <div>
                {#if i == 0}
                    <label for="comite_{i}" class="form-label">Selecciona tu primera opción de comité <span style="color: red;">*</span></label>
                {:else if i == 1}
                    <label for="comite_{i}" class="form-label">Selecciona tu segunda opción de comité <span style="color: red;">*</span></label>
                {:else}
                    <label for="comite_{i}" class="form-label">Selecciona tu tercera opción de comité <span style="color: red;">*</span></label>
                {/if}

                <select onchange={(ev) => onChangeComite(ev, i)} bind:value={comiteValues[i]} autocomplete="off" data-width="86vw" class="selectpicker select-comite" required name="comite_{i}">
                    <option selected disabled value="">Selecciona una opción</option>
                    {#each comites as { nombre, siglas }}
                        {#if (modalidadValue == "pareja" && ["Cumbre", "Crisis"].includes(siglas)) || (i >= 1 && comiteValues[0] == siglas) || (i == 2 && comiteValues[1] == siglas)} <!-- Deshabilitar los que no se pueden por modalidad o si ya se seleccióno la opción antes -->
                            <option value={siglas} disabled>{nombre}</option>
                        {:else}
                            <option value={siglas}>{nombre}</option>
                        {/if}
                    {/each}
                </select>
                <div class="invalid-feedback">Debes seleccionar una opción.</div>

                {#if comiteValues[i]}
                    <div class="comite-topico-div">
                        <ComiteCarousel comite={comiteSiglasToKey(comiteValues[i])} index={i}></ComiteCarousel>
                        <p class="comite-horario">
                            <strong>Horario:</strong> {getHorarioComite(comiteValues[i])}
                            <br>
                            <br>
                        </p>
                    </div>
                {/if}
            </div>

            <!-- Países -->
            {#each { length: 3 }, j}
                <div>
                    {#if j == 0}
                        <label for="comite_{i}_pais_{j}" class="form-label">Primera opción de delegación <span style="color: red;">*</span></label>
                    {:else if j == 1}
                        <label for="comite_{i}_pais_{j}" class="form-label">Segunda opción de delegación <span style="color: red;">*</span></label>
                    {:else}
                        <label for="comite_{i}_pais_{j}" class="form-label">Tercera opción de delegación <span style="color: red;">*</span></label>
                    {/if}


                    <select onchange={(ev) => onChangePais(ev, i, j)} bind:value={comitePaisValues[i][j]} autocomplete="off" data-width="86vw" class="selectpicker select-comite-{i}-pais" required name="comite_{i}_pais_{j}" data-live-search="true">
                        <option selected disabled value="">Selecciona una opción</option>

                        {#if comiteValues[i]}
                            {#if ["FIA", "FHCM", "NASA", "Cumbre"].includes(comiteValues[i])}
                                {#each Object.entries(delegaciones[comiteSiglasToKey(comiteValues[i])]) as [tipo, lista]}
                                    {#if isDelegacionTipoDisponibleEnModalidad(tipo, modalidadValue)}
                                        <optgroup label={getDelegacionTipoLabel(tipo, modalidadValue)}>
                                            {#each lista as { nombre, abreviacion, emoji }}
                                                <option
                                                    disabled={(j >= 1 && comitePaisValues[i][0] == `${comiteValues[i]}:${nombre}`) || (j == 2 && comitePaisValues[i][1] == `${comiteValues[i]}:${nombre}`)}
                                                    data-tokens={abreviacion}
                                                    value="{comiteValues[i]}:{nombre}"
                                                >
                                                    {emoji}&emsp;{nombre}
                                                </option>
                                            {/each}
                                        </optgroup>
                                    {/if}
                                {/each}
                            {:else}
                                <!-- Delegaciones normales -->
                                {#each (delegaciones[comiteSiglasToKey(comiteValues[i]) as keyof Delegaciones] as Delegacion[]) as { nombre, abreviacion, emoji }}
                                    <option
                                        disabled={(j >= 1 && comitePaisValues[i][0] == `${comiteValues[i]}:${nombre}`) || (j == 2 && comitePaisValues[i][1] == `${comiteValues[i]}:${nombre}`)}
                                        data-tokens={abreviacion}
                                        value="{comiteValues[i]}:{nombre}"
                                    >
                                        {emoji}&emsp;{nombre}
                                    </option>
                                {/each}
                            {/if}
                        {:else}
                            <!-- Mostrar todas para cargar correctamente las cookies -->
                            {#each comites as { nombre: nombreComite, siglas }}
                                {#if ["FIA", "FHCM", "NASA", "Cumbre"].includes(siglas)}
                                    {#each Object.entries(delegaciones[comiteSiglasToKey(siglas)]) as [tipo, lista]}
                                        {#each lista as { nombre }}
                                            <option value="{siglas}:{nombre}"></option>
                                        {/each}
                                    {/each}
                                {:else}
                                    {#each (delegaciones[comiteSiglasToKey(siglas) as keyof Delegaciones] as Delegacion[]) as { nombre }}
                                        <option value="{siglas}:{nombre}"></option>
                                    {/each}
                                {/if}
                            {/each}
                        {/if}
                    </select>

                    <div class="invalid-feedback">Debes seleccionar una opción.</div>
                </div>
            {/each}

            {#if i == 2}
                <p>
                    <strong>NOTA:</strong> Si ninguna de las opciones seleccionadas está disponible, queda a consideración del Modelo la asignación, alineada a las opciones que escogió.
                </p>
            {/if}
        </div>
    {/each}

    <!-- Subir pago -->
    <article class="titulo">
        <h2>Pago</h2>
    </article>

    <div class="mb-3">
        {#if delegacionOficialValue != "si"}
            <enhanced:img id="img-pago" src="/static/assets/img/registro/mifel.png" alt="Datos bancarios. CLABE: 042 180 01004083209 6; Banco: Mifel" />
        {/if}

        <p>
            {#if delegacionOficialValue == "si"}
                <strong>Delegación oficial:</strong> como comprobante de pago, solamente se aceptará la imagen que se compartió a su Faculty después de su inscripción. Si no la tiene aún, por favor <a href="https://wa.me/529999033025?text=Hola,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20Datos%20personales%0A%5B%5D%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20Proceso%20de%20pago%0A" target="_blank" rel="noopener noreferrer">contáctenos</a>.
            {:else if modalidadValue == "pareja"}
                <strong>Costo de inscripción:</strong> $600 MXN ($300 MXN por persona)
            {:else}
                <strong>Costo de inscripción:</strong> $320 MXN
            {/if}
        </p>

        {#if delegacionOficialValue != "si"}
            <p>
                <strong>Concepto:</strong> Nombre y apellido
            </p>

            <p>
                <i>
                    Una vez realizado el pago, no se emite reembolso alguno.
                    <br>
                    En caso de que exista algún error con el pago, nos pondremos en contacto contigo.
                </i>
            </p>
        {/if}

        <div>
            <label for="comprobante" class="form-label">Sube tu comprobante de pago (máx 5 MB)<span style="color: red;">*</span></label>
            <input oninput={onChangeComprobante} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="comprobante" type="file" id="input-comprobante" accept="image/*,.pdf">
            <div class="invalid-feedback">Debes subir un archivo.</div>
        </div>
    </div>

    <article class="titulo">
        <h2>Reglamento</h2>
    </article>

    <div class="mb-3">
        <div class="form-check">
            <input required class="form-check-input" autocomplete="off" name="aceptar_reglamento" type="checkbox">
            <label for="aceptar-reglamento" class="form-check-label">Al dar click en la casilla, se comparte el compromiso por respeto y mostrar conformidad con el reglamento y protocolo del SMMUN.</label>
            <div class="invalid-feedback">Debes aceptar el reglamento.</div>
        </div>
    </div>

    <div class="mb-3">
        <!-- Enviar -->
        <button class="form-control focus-ring focus-ring-danger" style="background-color: #ea6880; color: #f0f0f0; font-weight: bold;" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
    </div>
</form>

<!-- Toasts para errores y contacto -->
<div style="position: fixed; bottom: 1%; right: 2%;">
    <div class="toast align-items-center text-bg-primary border-0 bg-danger bg-gradient position-relative bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true" style="position: relative; z-index: 1; width: auto; margin: 1vh 0;" bind:this={comprobanteToastDiv}>
        <div class="d-flex">
          <div class="toast-body">
            El archivo es demasiado grande.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>

    <div class="toast align-items-center text-bg-primary border-0 bg-danger bg-gradient position-relative bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true" style="position: relative; z-index: 1; width: auto; margin: 1vh 0;" bind:this={enviarToastDiv}>
        <div class="d-flex">
          <div class="toast-body">
            Existen errores en el formulario.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>

    <a target="_blank" rel="noopener noreferrer" href="https://wa.me/529999033025?text=Hola,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20Datos%20personales%0A%5B%5D%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20Proceso%20de%20pago%0A" style="text-decoration: none;">
        <div class="toast align-items-center text-bg-primary border-0 position-relative bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" style="position: relative; z-index: 1; width: auto; margin: 1vh 0; cursor: pointer; border-radius: 16px;" bind:this={whatsappToastDiv}>
            <div class="d-flex" style="background-color: #ea6880; border-radius: 12px;">
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
