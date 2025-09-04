<!-- Registro cerrado, no está en uso -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import TituloRegistro from "$lib/components/TituloRegistro.svelte";
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
            nombre: "Organización Panamericana de la Salud (OPS)",
            siglas: "OPS"
        },
        {
            nombre: "Comisión Económica para América Latina y el Caribe (CEPAL)",
            siglas: "CEPAL"
        },
        {
            nombre: "Organización de los Estados Americanos (OEA)",
            siglas: "OEA"
        },
        {
            nombre: "Conferencia Regional sobre la Mujer de América Latina y el Caribe (CRM)",
            siglas: "CRM"
        },
        {
            nombre: "Comisión Nacional de los Derechos Humanos (CNDH)",
            siglas: "CNDH"
        },
        {
            nombre: "Comité contra la Desaparición Forzada (CED)",
            siglas: "CED"
        }
    ];

    let topicos = {
        OPS: "Vacunación en contextos de desinformación: estrategias para combatir el escepticismo en las Américas.",
        CEPAL: "Estrategias para erradicar el trabajo infantil consecuencia de la desigualdad económica en América Latina.",
        OEA: "Estrategias para preservar las tradiciones culturales amenazadas por el turismo masivo en comunidades indígenas.",
        CRM: "Reducción de la brecha salarial de género como herramienta para alcanzar la autonomía económica de las mujeres.",
        CNDH: "Desaparición y feminicidio de Debanhi Susana Escobar Bazaldúa, con presunta negligencia e irregularidades por parte de las autoridades de seguridad y justicia, en Escobedo, Nuevo León.",
        CED: "Medidas para prevenir y enfrentar la desaparición forzada de niñas y mujeres con fines de explotación sexual."
    }

    // Interfaces para leer JSON de delegaciones
    interface Delegacion {
        nombre: string;
        abreviacion: string;
        emoji: string;
        descripcion?: string;
    }

    interface Delegaciones {
        ops: Delegacion[];
        cepal: Delegacion[];
        oea: Delegacion[];
        crm: Delegacion[];
        cndh: Delegacion[];
        ced: Delegacion[];
    }

    // JSON de delegaciones
    const delegaciones = delegacionesUntyped as Delegaciones;

    // Observador para cambiar el nav
    let navObserver: IntersectionObserver;

    // Elementos del DOM
    let formDelegaciones: HTMLFormElement;
    let correoValidity = $state(true);
    let comprobanteToastDiv: HTMLDivElement;
    let enviarToastDiv: HTMLDivElement;
    let whatsappToastDiv: HTMLDivElement;
    let sentinel: HTMLDivElement;

    // Variables reactivas
    let delegacionOficialValue: string | undefined = $state();
    let edadValue: string | undefined = $state();
    let escolaridadValue: string | undefined = $state();
    let escuelaRlmValue: string | undefined = $state();
    let comiteValues: string[] = $state(Array(3));
    let comitePaisValues: string[][] = $state(Array(3).fill(Array(3)));
    let loadedCookies = $state(false);

    // Event handlers
    function onChangeEdad(ev: Event) {
        let input = ev.target as HTMLInputElement;
        edadValue = input.value.replace(/[^\d]/gi, "");

        if (!validateNumInput(input.value, 11, 26)) {
            input.setCustomValidity("Edad inválida.");
        }
        else {
            input.setCustomValidity("");
        }

        onChangeSaveCookie(ev);
    }

    function onChangeCorreo(ev: Event) {
        let input = ev.target as HTMLInputElement;
        correoValidity = input.checkValidity();
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

        if (!form.checkValidity()) {
            ev.preventDefault();
            ev.stopPropagation();

            // Mostrar error
            window.bootstrap.Toast.getOrCreateInstance(enviarToastDiv).show();
        }

        form.classList.add("was-validated");
    }

    // Actualizar selects cuando se cambien datos
    $effect(() => {
        // Dependencias
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
    }

    form input:focus {
        border: none;
    }

    label {
        color: #44372b;
    }
</style>

<!-- Sentinel para cambiar el navbar -->
<div id="nav-sentinel" bind:this={sentinel}></div>

<!-- Título -->
<TituloRegistro text="Registro de delegaciones"></TituloRegistro>

<!-- Forms -->
<form bind:this={formDelegaciones} method="POST" action="/api/registro/delegaciones" name="registro-delegaciones" enctype="multipart/form-data" class="col g-3" novalidate onsubmit={onSubmitForm}>
    <!-- Selección de delegación oficial -->
    <article class="titulo">
        <h2>Delegación oficial</h2>
    </article>

    <div class="mb-3">
        <p>Una delegación oficial es un grupo que representa a una agrupación y tiene a una persona que lo asesora.</p>

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
    <article class="titulo">
        <h2>Datos personales</h2>
    </article>

    <div class="mb-3">
        <label for="nombre" class="form-label">Nombre completo <span style="color: red;">*</span></label>
        <div class="row g-3">
            <div class="col">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="nombre" placeholder="Nombre(s)" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
            <div class="col">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="apellido" placeholder="Apellidos" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
        </div>

        <div>
            <label for="edad" class="form-label">Edad <span style="color: red;">*</span></label>
            <input oninput={onChangeEdad} bind:value={edadValue} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="edad" placeholder="11-26 años" type="text" maxlength="2" inputmode="numeric" class:is-invalid={!validateNumInput(edadValue, 11, 26)}>
            <div class="invalid-feedback">La edad no es válida.</div>
        </div>

        <div>
            <label for="celular" class="form-label">Número de celular <span style="color: red;">*</span></label>
            <input oninput={onChangeSaveCookie} use:intlPhone class="form-control focus-ring focus-ring-danger" name="celular" data-name="celular" required autocomplete="off" placeholder="999 123 4567" type="tel" maxlength="30">
        </div>

        <div>
            <label for="correo" class="form-label">Correo electrónico <span style="color: red;">*</span></label>
            <input oninput={onChangeCorreo} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="correo" placeholder="ejemplo@dominio.com" type="email" maxlength="150" class:is-invalid={!correoValidity}>
            <div class="invalid-feedback">El correo no es válido.</div>
        </div>

        <label for="pais" class="form-label">País, estado y ciudad de residencia <span style="color: red;">*</span></label>
        <div class="row g-3">
            <div class="col">
                <select onchange={onChangeSaveCookie} autocomplete="off" data-width="100%" class="selectpicker select-pais" required name="pais">
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
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="ciudad_estado" placeholder="Ciudad y estado" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
        </div>

        <div>
            <label for="escolaridad" class="form-label">Escolaridad <span style="color: red;">*</span></label>
            <select onchange={onChangeSaveCookie} bind:value={escolaridadValue} autocomplete="off" data-width="86vw" class="selectpicker" required name="escolaridad">
                <option selected disabled value="">Selecciona una opción</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Preparatoria">Preparatoria</option>
                <option value="Universidad">Universidad</option>
                <option value="Egresado">Egresado</option>
                <option value="No estudio">No estudio</option>
            </select>
            <div class="invalid-feedback">Debes seleccionar una opción.</div>
        </div>

        {#if escolaridadValue != "No estudio" || !loadedCookies} <!-- No mostrar si se eligió "no estudio" -->
            <label for="escolaridad" class="form-label">Escuela de procedencia <span style="color: red;">*</span></label>
            <select onchange={onChangeSaveCookie} bind:value={escuelaRlmValue} autocomplete="off" data-width="86vw" class="selectpicker" required name="escuela_rlm">
                <option selected disabled value="">Selecciona una opción</option>
                <option value="RLM">Secundaria Ricardo López Méndez</option>
                <option value="Otra">Otra</option>
            </select>
            <div class="invalid-feedback">Debes seleccionar una opción.</div>

            {#if escuelaRlmValue == "Otra" || !loadedCookies}
                <div>
                    <label for="escuela" class="form-label">Nombre completo de tu escuela de procedencia (en caso de ser egresado, de donde te graduaste) <span style="color: red;">*</span></label>
                    <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="escuela" placeholder="Ejemplo: Escuela Modelo" type="text" maxlength="150">
                    <div class="invalid-feedback">Debes llenar este campo.</div>
                </div>
            {/if}
        {/if}

        <label for="nombre_contacto" class="form-label">En caso de emergencia, ¿a quién podemos contactar? <span style="color: red;">*</span></label>
        <div class="row g-3">
            <div class="col">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="nombre_contacto" placeholder="Nombre completo" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
            <div class="col">
                <input oninput={onChangeSaveCookie} use:intlPhone class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="celular_contacto" data-name="celular_contacto" placeholder="Celular" type="tel" maxlength="30">
            </div>
            <div class="col">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="relacion_contacto" placeholder="Parentesco" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
        </div>

        <div>
            <label for="info_extra" class="form-label">¿Tienes alguna necesidad específica que debamos conocer?</label>
            <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" autocomplete="off" name="info_extra" placeholder="Ejemplo: padecimientos, alergias, tratamientos en curso u otros" type="text" maxlength="150">
            <div class="invalid-feedback">Debes llenar este campo.</div>
        </div>
    </div>

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
                        {#if (i >= 1 && comiteValues[0] == siglas) || (i == 2 && comiteValues[1] == siglas)} <!-- Deshabilitar si ya se seleccióno la opción antes -->
                            <option value={siglas} disabled>{nombre}</option>
                        {:else}
                            <option value={siglas}>{nombre}</option>
                        {/if}
                    {/each}
                </select>
                <div class="invalid-feedback">Debes seleccionar una opción.</div>

                {#if comiteValues[i]}
                    <div class="comite-topico-div">
                        <p>
                            <strong>Tópico:</strong> {topicos[comiteValues[i] as keyof (typeof topicos)]}
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

                            <!-- Delegaciones normales -->
                            {#each (delegaciones[comiteValues[i].toLowerCase() as keyof Delegaciones] as Delegacion[]) as { nombre, abreviacion, emoji }}
                                <option disabled={(j >= 1 && comitePaisValues[i][0] == `${comiteValues[i]}:${nombre}`) || (j == 2 && comitePaisValues[i][1] == `${comiteValues[i]}:${nombre}`)} data-tokens={abreviacion} value="{comiteValues[i]}:{nombre}">{emoji}&emsp;{nombre}</option>
                            {/each}

                        {:else}

                                <!-- Mostrar todas para cargar correctamente las cookies -->
                                {#each comites as { nombre, siglas }}
                                    {#each (delegaciones[siglas.toLowerCase() as keyof Delegaciones] as Delegacion[]) as { nombre }}
                                        <option value="{siglas}:{nombre}"></option>
                                    {/each}
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
        {#if delegacionOficialValue != "si" && escuelaRlmValue != "RLM"}
            <enhanced:img id="img-pago" src="/static/assets/img/images/mifel.webp" alt="Datos bancarios. Tarjeta: 042 180 01004083209 6; Banco: Mifel" />
        {/if}

        <p>
            {#if escuelaRlmValue == "RLM"}
                <strong>Estudiantes de la Secundaria Ricardo López Méndez:</strong> como comprobante de pago, deberán subir la imagen que les fue compartida previamente.
            {:else if delegacionOficialValue == "si"}
                <strong>Delegación oficial:</strong> como comprobante de pago, solamente se aceptará la imagen que se compartió a su Faculty después de su inscripción. Si no la tiene aún, por favor <a href="https://wa.me/529999033025?text=Hola%20%F0%9F%98%81,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20%F0%9F%A4%9D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20%F0%9F%91%A4%20Datos%20personales%0A%5B%5D%20%F0%9F%8C%8E%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20%F0%9F%92%B3%20Proceso%20de%20pago%0A" target="_blank" rel="noopener noreferrer">contáctenos</a>.
            {:else}
                <strong>Costo de inscripción:</strong> $80 MXN
            {/if}
        </p>

        {#if delegacionOficialValue != "si" && escuelaRlmValue != "RLM"}
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
            <label for="aceptar-reglamento" class="form-check-label">Al dar click en la casilla, se comparte el compromiso por respeto y mostrar conformidad con el reglamento y protocolo del RLM-MUN.</label>
            <div class="invalid-feedback">Debes aceptar el reglamento.</div>
        </div>
    </div>

    <div class="mb-3">
        <!-- Enviar -->
        <input class="form-control focus-ring focus-ring-danger" style="background-color: #ea6880; color: #f0f0f0; font-weight: bold;" type="submit" value="Enviar">
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

    <a target="_blank" rel="noopener noreferrer" href="https://wa.me/529999033025?text=Hola%20%F0%9F%98%81,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20%F0%9F%A4%9D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20%F0%9F%91%A4%20Datos%20personales%0A%5B%5D%20%F0%9F%8C%8E%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20%F0%9F%92%B3%20Proceso%20de%20pago%0A" style="text-decoration: none;">
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
