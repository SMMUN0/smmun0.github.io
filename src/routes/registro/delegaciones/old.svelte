<!-- Registro cerrado, no está en uso -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import TituloRegistro from "$lib/components/TituloRegistro.svelte";
    import SmmunMarquee from "$lib/components/SmmunMarquee.svelte";
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
            nombre: "Comisión de Ciencia y Tecnología para el Desarrollo (CSTD)",
            siglas: "CSTD"
        },
        {
            nombre: "United Nations Committee on the Rights of the Child (CRC) [inglés] [solo delegación individual]",
            siglas: "CRC"
        },
        {
            nombre: "Organización Internacional del Trabajo (OIT)",
            siglas: "OIT"
        },
        {
            nombre: "Comité Noruego del Nobel",
            siglas: "NOBEL"
        },
        {
            nombre: "Conferencia Regional sobre la Mujer de América Latina y el Caribe (CRM)",
            siglas: "CRM"
        },
        {
            nombre: "Fondo de Población de las Naciones Unidas (UNFPA)",
            siglas: "UNFPA"
        },
        {
            nombre: "United Nations Office of the Secretary-General's Envoy on Youth (OSGEY) [inglés]",
            siglas: "OSGEY"
        },
        {
            nombre: "Comisión Interamericana de Derechos Humanos (CIDH)",
            siglas: "CIDH"
        },
        {
            nombre: "Corte Internacional de Justicia (CIJ) [solo delegación individual]",
            siglas: "CIJ"
        },
        {
            nombre: "Comité Olímpico Internacional (COI)",
            siglas: "COI"
        }
    ];

    // Interfaces para leer JSON de delegaciones
    interface Delegacion {
        nombre: string;
        abreviacion: string;
        emoji: string;
        descripcion?: string;
    }

    interface SeccionOIT {
        sindicatos: Delegacion[];
        empresas: Delegacion[];
        países: Delegacion[];
    }

    interface Delegaciones {
        cstd: Delegacion[];
        crc: Delegacion[];
        oit: SeccionOIT;
        nobel: Delegacion[];
        crm: Delegacion[];
        unfpa: Delegacion[];
        osgey: Delegacion[];
        cidh: Delegacion[];
        cij: Delegacion[];
        coi: Delegacion[];
    }

    // JSON de delegaciones
    const delegaciones = delegacionesUntyped as Delegaciones;

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

    // Event handlers
    function onChangeModalidad(ev: Event) {
        for (let i = 0; i < 3; i++) {
            if (["CRC", "CIJ"].includes(comiteValues[i])) {
                comiteValues[i] = "";
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
        modalidadValue?.length;
        delegacionOficialValue?.length;
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
            font-family: "Twemoji Country Flags", "Glacial Indifference Regular";
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
    </style>
</svelte:head>

<style>
    .titulo {
        background-color: #6f75d5cf;
        padding: 2vh 0 2vh 0;
        color: #fffdfd;
        font-family: "Glacial Indifference Regular";
        margin-bottom: 2vh;
    }

    .titulo h2 {
        margin: 0;
        font-weight: normal;
        padding: 0.5vh 3vw;
        font-size: 2.3rem;
    }

    .oval {
        max-width: fit-content;
        border: solid #fffdfd;
        border-radius: 120px / 70px;
        text-align: center;
        margin: auto;
    }

    form {
        display: flex;
        flex-direction: column;
        font-family: "Glacial Indifference Regular";
    }

    form a {
        color: #063372;
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
</style>

<!-- Sentinel para cambiar el navbar -->
<div id="nav-sentinel" bind:this={sentinel}></div>

<!-- Título -->
<TituloRegistro text="Registro de delegaciones"></TituloRegistro>

<!-- Marquee -->
<SmmunMarquee></SmmunMarquee>

<!-- Forms -->
<form bind:this={formDelegaciones} method="POST" action="https://jellyfish-app-iyb7k.ondigitalocean.app/api/registro/delegaciones" name="registro-delegaciones" enctype="multipart/form-data" class="col g-3" novalidate onsubmit={onSubmitForm}>
    <!-- Selección de modalidad -->
    <article class="titulo">
        <div class="oval">
            <h2>
                Modalidad
            </h2>
        </div>
    </article>

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
        <div class="oval">
            <h2>
                Delegación oficial
            </h2>
        </div>
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
                <input oninput={onChangeSaveCookie} class="form-control" autocomplete="off" name="nombre_delegacion_oficial" placeholder="Nombre completo de la agrupación (sin siglas o abreviaturas)" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>

            <div>
                <input oninput={onChangeSaveCookie} class="form-control" autocomplete="off" name="responsable_delegacion_oficial" placeholder="Nombre completo de la persona responsable de la delegación oficial" type="text" maxlength="150">
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
            <div class="oval">
                <h2>
                    {#if i == 0}
                        Primera opción de comité
                    {:else if i == 1}
                        Segunda opción de comité
                    {:else}
                        Tercera opción de comité
                    {/if}
                </h2>
            </div>
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
                        {#if (modalidadValue == "pareja" && ["CRC", "CIJ"].includes(siglas)) || (i >= 1 && comiteValues[0] == siglas) || (i == 2 && comiteValues[1] == siglas)} <!-- Deshabilitar si es CRC/CIJ en modalidad de codelegación, o si ya se seleccióno la opción antes -->
                            <option value={siglas} disabled>{nombre}</option>
                        {:else}
                            <option value={siglas}>{nombre}</option>
                        {/if}
                    {/each}
                </select>
                <div class="invalid-feedback">Debes seleccionar una opción.</div>

                {#if comiteValues[i]}
                    <div class="comite-topico-div">
                        <ComiteCarousel comite={comiteValues[i].toLowerCase()} index={i}></ComiteCarousel>
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

                    {#if !(comiteValues[i] == "CIJ" && j == 2) || !loadedCookies} <!-- No mostrar tercera opción en caso de CIJ -->
                        <select onchange={(ev) => onChangePais(ev, i, j)} bind:value={comitePaisValues[i][j]} autocomplete="off" data-width="86vw" class="selectpicker select-comite-{i}-pais" required name="comite_{i}_pais_{j}" data-live-search="true">
                            <option selected disabled value="">Selecciona una opción</option>

                            {#if ["CRC", "NOBEL"].includes(comiteValues[i])}

                                 <!-- En CRC y Nobel se añade la descripción -->
                                {#each (delegaciones[comiteValues[i].toLowerCase() as keyof Delegaciones] as Delegacion[]) as { nombre, abreviacion, emoji, descripcion }}
                                    <option disabled={(j >= 1 && comitePaisValues[i][0] == nombre) || (j == 2 && comitePaisValues[i][1] == nombre)} data-tokens={abreviacion} value="{comiteValues[i]}:{nombre}" data-content="<strong>{emoji}&emsp;{nombre}:</strong> {descripcion}">{emoji}&emsp;{nombre}: {descripcion}</option>
                                {/each}

                            {:else if comiteValues[i] == "OIT"}

                                 <!-- En OIT se agrupan por tipo -->
                                {#each ["Sindicatos", "Empresas", "Países"] as tipo}
                                    <optgroup label={tipo}>
                                        {#each delegaciones.oit[tipo.toLowerCase() as keyof SeccionOIT] as { nombre, abreviacion, emoji }}
                                            <option disabled={(j >= 1 && comitePaisValues[i][0] == nombre) || (j == 2 && comitePaisValues[i][1] == nombre)} data-tokens={abreviacion} value="{comiteValues[i]}:{nombre}">{emoji}&emsp;{nombre}</option>
                                        {/each}
                                    </optgroup>
                                {/each}

                            {:else if comiteValues[i]}

                                <!-- Delegaciones normales -->
                                {#each (delegaciones[comiteValues[i].toLowerCase() as keyof Delegaciones] as Delegacion[]) as { nombre, abreviacion, emoji }}
                                    <option disabled={(j >= 1 && comitePaisValues[i][0] == nombre) || (j == 2 && comitePaisValues[i][1] == nombre)} data-tokens={abreviacion} value="{comiteValues[i]}:{nombre}">{emoji}&emsp;{nombre}</option>
                                {/each}

                            {:else}

                                    <!-- Mostrar todas para cargar correctamente las cookies -->
                                    {#each comites as { nombre, siglas }}
                                        {#if siglas == "OIT"}
                                            {#each ["Sindicatos", "Empresas", "Países"] as tipo}
                                                <optgroup label={tipo}>
                                                    {#each delegaciones.oit[tipo.toLowerCase() as keyof SeccionOIT] as { nombre }}
                                                        <option value="OIT:{nombre}"></option>
                                                    {/each}
                                                </optgroup>
                                            {/each}
                                        {:else}
                                            {#each (delegaciones[siglas.toLowerCase() as keyof Delegaciones] as Delegacion[]) as { nombre }}
                                                <option value="{siglas}:{nombre}"></option>
                                            {/each}
                                        {/if}
                                    {/each}

                            {/if}
                        </select>
                    {/if}
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
        <div class="oval">
            <h2>
                Pago
            </h2>
        </div>
    </article>

    <div class="mb-3">
        {#if delegacionOficialValue != "si"}
            <enhanced:img id="img-pago" src="/static/assets/img/images/bbva.webp" alt="Datos bancarios. Tarjeta: 4152 3139 9013 9227; Banco: BBVA" />
        {/if}

        <p>
            {#if delegacionOficialValue == "si"}
                <strong>Delegación oficial:</strong> como comprobante de pago, solamente se aceptará la imagen que se compartió a su Faculty después de su inscripción. Si no la tiene aún, por favor <a href="https://wa.me/529991975309?text=Hola%20%F0%9F%98%81,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20%F0%9F%92%BC%20Modalidad%20de%20participaci%C3%B3n%0A%5B%5D%20%F0%9F%A4%9D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20%F0%9F%91%A4%20Datos%20personales%0A%5B%5D%20%F0%9F%8C%8E%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20%F0%9F%92%B3%20Proceso%20de%20pago%0A" target="_blank" rel="noopener noreferrer">contáctanos</a>.
            {:else if modalidadValue == "pareja"}
                <strong>Costo de inscripción:</strong> $560 MXN ($280 MXN por persona)
            {:else}
                <strong>Costo de inscripción:</strong> $300 MXN
            {/if}
        </p>

        <p>
            <i>
                Una vez realizado el pago, no se emite reembolso alguno.
                <br>
                En caso de que exista algún error con el pago, nos pondremos en contacto contigo.
            </i>
        </p>

        <div>
            <label for="comprobante" class="form-label">Sube tu comprobante de pago (máx 5 MB)<span style="color: red;">*</span></label>
            <input oninput={onChangeComprobante} class="form-control" required autocomplete="off" name="comprobante" type="file" id="input-comprobante" accept="image/*,.pdf">
            <div class="invalid-feedback">Debes subir un archivo.</div>
        </div>
    </div>

    <article class="titulo">
        <div class="oval">
            <h2>
                Reglamento
            </h2>
        </div>
    </article>

    <div class="mb-3">
        <div class="form-check">
            <input required class="form-check-input" autocomplete="off" name="aceptar_reglamento" type="checkbox">
            <label for="aceptar-reglamento" class="form-check-label">Al dar click en la casilla, se comparte el compromiso por respeto y mostrar conformidad con el reglamento y protocolo del SMMUN 2025: Legado de Líderes.</label>
            <div class="invalid-feedback">Debes aceptar el reglamento.</div>
        </div>
    </div>

    <div class="mb-3">
        <!-- Enviar -->
        <input class="form-control" type="submit" value="Enviar">
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

    <a target="_blank" rel="noopener noreferrer" href="https://wa.me/529991975309?text=Hola%20%F0%9F%98%81,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20%F0%9F%92%BC%20Modalidad%20de%20participaci%C3%B3n%0A%5B%5D%20%F0%9F%A4%9D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20%F0%9F%91%A4%20Datos%20personales%0A%5B%5D%20%F0%9F%8C%8E%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20%F0%9F%92%B3%20Proceso%20de%20pago%0A" style="text-decoration: none;">
        <div class="toast align-items-center text-bg-primary border-0 bg-success bg-gradient position-relative bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" style="position: relative; z-index: 1; width: auto; margin: 1vh 0; cursor: pointer;" bind:this={whatsappToastDiv}>
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
