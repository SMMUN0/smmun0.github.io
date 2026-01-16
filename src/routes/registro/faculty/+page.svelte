<!-- Registro cerrado, no está en uso -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import TituloRegistro from "$lib/components/TituloRegistro.svelte";
    import DelegacionFaculty from "$lib/components/DelegacionFaculty.svelte";
    import { intlPhone } from "$lib/actions/intlPhone";
    import { onChangeSaveCookie, resetValuesFromCookies, validateNumInput } from "$lib/util";
    import { registroTitleNav } from "$lib/stores/registro-title-nav";
    import { paises } from "$lib/data/paises.json";
    import "intl-tel-input/build/css/intlTelInput.css";
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap-select/dist/css/bootstrap-select.min.css";

    // Observador para cambiar el nav
    let navObserver: IntersectionObserver;

    // Elementos del DOM
    let formFaculty: HTMLFormElement;
    let correoValidity = $state(true);
    let comprobanteToastDiv: HTMLDivElement;
    let enviarToastDiv: HTMLDivElement;
    let whatsappToastDiv: HTMLDivElement;
    let sentinel: HTMLDivElement;

    // Variables reactivas
    let numeroDelegacionesValue: string | undefined = $state();
    let numeroDelegacionesValidity = $state(false);

    // Event handlers
    function onChangeNumeroDelegaciones(ev: Event) {
        let input = ev.target as HTMLInputElement;
        input.value = input.value.replace(/[^\d]/gi, "");

        if (!validateNumInput(input.value, 4, Number.MAX_VALUE)) {
            input.setCustomValidity("Número inválido.");
            numeroDelegacionesValidity = false;
        }
        else {
            input.setCustomValidity("");
            numeroDelegacionesValidity = true;;
        }

        onChangeSaveCookie(ev);
    }

    function onChangeCorreo(ev: Event) {
        let input = ev.target as HTMLInputElement;
        correoValidity = input.checkValidity();
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

        // Reestablecer los valores de los inputs en las cookies
        resetValuesFromCookies(formFaculty.elements);

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
    :global(body:has(main.registro-faculty)) {
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
</style>

<!-- Sentinel para cambiar el navbar -->
<div id="nav-sentinel" bind:this={sentinel}></div>

<!-- Título -->
<TituloRegistro text="Registro de faculty"></TituloRegistro>

<!-- Forms -->
<form bind:this={formFaculty} method="POST" action="https://smmun-inscripcion-endpoint-production.up.railway.app/api/registro/faculty" name="registro-faculty" enctype="multipart/form-data" class="col g-3" novalidate onsubmit={onSubmitForm}>
    <!-- Información de contacto -->
    <article class="titulo">
        <h2>Información de contacto</h2>
    </article>

    <div class="mb-3">
        <label for="nombre_faculty" class="form-label">Nombre completo <span style="color: red;">*</span></label>
        <div class="row g-3">
            <div class="col">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="nombre_faculty" placeholder="Nombre(s)" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
            <div class="col">
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="apellido_faculty" placeholder="Apellidos" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
        </div>

        <div>
            <label for="celular_faculty" class="form-label">Número de celular <span style="color: red;">*</span></label>
            <input oninput={onChangeSaveCookie} use:intlPhone class="form-control focus-ring focus-ring-danger" name="celular_faculty" data-name="celular_faculty" required autocomplete="off" placeholder="999 123 4567" type="tel" maxlength="30">
        </div>

        <div>
            <label for="correo_faculty" class="form-label">Correo electrónico <span style="color: red;">*</span></label>
            <input oninput={(ev) => onChangeCorreo(ev)} class="form-control focus-ring focus-ring-danger input-correo" required autocomplete="off" name="correo_faculty" placeholder="ejemplo@dominio.com" type="email" maxlength="150" class:is-invalid={!correoValidity}>
            <div class="invalid-feedback">El correo no es válido.</div>
        </div>

        <label for="pais_faculty" class="form-label">País, estado y ciudad de residencia <span style="color: red;">*</span></label>
        <div class="row g-3">
            <div class="col">
                <select onchange={onChangeSaveCookie} autocomplete="off" data-width="100%" class="selectpicker" required name="pais_faculty">
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
                <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="ciudad_estado_faculty" placeholder="Ciudad y estado" type="text" maxlength="150">
                <div class="invalid-feedback">Debes llenar este campo.</div>
            </div>
        </div>
    </div>

    <!-- Información de delegaciones -->
    <article class="titulo">
        <h2>Delegación oficial</h2>
    </article>

    <div class="mb-3">
        <div>
            <label for="institucion_delegacion_oficial" class="form-label">Nombre completo de la institución o agrupación <span style="color: red;">*</span></label>
            <input oninput={onChangeSaveCookie} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="institucion_delegacion_oficial" placeholder="Ejemplo: Escuela Modelo" type="text" maxlength="88">
            <div class="invalid-feedback">Debes llenar este campo.</div>
        </div>

        <div>
            <label for="numero_delegaciones" class="form-label">¿Cuántas personas conformarán la delegación oficial? <span style="color: red;">*</span></label>
            <input oninput={onChangeNumeroDelegaciones} class="form-control focus-ring focus-ring-danger" required autocomplete="off" name="numero_delegaciones" placeholder="Mínimo 4 personas" type="text" maxlength="2" inputmode="numeric" bind:value={numeroDelegacionesValue} class:is-invalid={!numeroDelegacionesValidity}>
            <div class="invalid-feedback">El número no es válido.</div>
        </div>
    </div>

    {#if numeroDelegacionesValidity}
        <article>
            {#each { length: parseInt(numeroDelegacionesValue ?? "1") }, i}
                <DelegacionFaculty index={i}></DelegacionFaculty>
            {/each}
        </article>
    {/if}

    <!-- Subir pago -->
    <article class="titulo">
        <h2>Pago</h2>
    </article>

    <div class="mb-3">
        <enhanced:img id="img-pago" src="/static/assets/img/registro/mifel.webp" alt="Datos bancarios. CLABE: 042 180 01004083209 6; Banco: Mifel" />

        <p style="text-align: justify;">
            <i>
                ¡Hola! Agradecemos mucho la confianza de parte de su equipo para ser parte de la experiencia del SMMUN 2026: Una Nueva Historia. Ser Faculty involucra una responsabilidad y esperamos que las instrucciones sean lo más claras posibles, buscando solicitar su apoyo para seguirlas como se especifican. Sin embargo, si existen dudas, por favor no dude en contactarnos.
            </i>
        </p>

        <p style="text-align: justify;">
            Una vez realizada la transferencia por el total de las personas de la Delegación Oficial, los pasos a seguir son los siguientes:
        </p>

        <ol style="text-align: justify; line-height: 1.6rem;">
            <li>Subir el comprobante de la transferencia.</li>
            <li>Enviar el formulario.</li>
            <li>Una vez recibido su formulario, la secretaría de Finanzas le hará llegar un comprobante de inscripción de la Delegación Oficial.
            Adjunto a este comprobante existira una imagen con el logo de su institución y un formato específico del SMMUN 2026 que nos asegura que nosotros hemos compartido dicha imagen.</li>
            <li>Esa imagen deberá ser compartida con todas las personas de su delegación, ya que, para su asignación efectiva, deberán de inscribirse en el <a href="/registro/delegaciones">formulario de delegaciones</a> (En este formulario, se realiza la elección de primera, segunda y tercera opción de comité) y en el espacio donde se pide subir un comprobante de pago, se deberá subir la imagen que exclusivamente la Secretaría de Finanzas le compartió a usted como persona Faculty.</li>
        </ol>

        {#if numeroDelegacionesValidity}
            <p>
                <strong>Costo total de inscripción:</strong> {(260 * parseInt(numeroDelegacionesValue!)).toLocaleString()} MXN ($260 MXN por {numeroDelegacionesValue} personas)
            </p>
        {/if}

        <div>
            <label for="comprobante" class="form-label">Suba el comprobante de pago (máx 5 MB)<span style="color: red;">*</span></label>
            <input oninput={onChangeComprobante} class="form-control" required autocomplete="off" name="comprobante" type="file" accept="image/*,.pdf">
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

    <div class="mb-3" style="line-height: 1.6rem; text-align: justify;">
        Se recuerda que cada Faculty Advisor es responsable de los términos estipulados en el presente documento, el cual debe ser de conocimiento por todas aquellas personas responsables del cargo que se encuentren registradas en el Modelo de Naciones Unidas del Sureste Mexicano (SMMUN).
        <br><br>
        Nuestro objetivo es trabajar de la mano para hacer cumplir las reglas y regulaciones del evento, y en caso de su violación por parte de las delegaciones, el SMMUN se encargará de estipular las sanciones e informárselas a los responsables académicos correspondientes. Por lo tanto, las personas Faculty son responsables de supervisar a sus delegaciones en todo momento y de asegurarse de que sigan las reglas del MUN, incluidas, entre otras, las descritas en los puntos anteriores.
        <br><br>
        A continuación, se anexa una lista de responsabilidades que cada persona asesora debe tener en cuenta para garantizar el correcto decoro y la seguridad durante el Modelo:
        <br><br>
        - Todas las personas Faculty Advisor deben tener un número de celular en funcionamiento registrado en el SMMUN durante el Modelo.
        <br><br>
        - Las Faculty deben asegurarse de estar accesibles por teléfono en todo momento durante la conferencia, para casos como el informe por mal comportamiento de las delegaciones o para ayudar al personal del SMMUN a localizarles en casos de emergencia.
        <br><br>
        - También alentamos a observar el trabajo dentro de los comités y explorar la sede principal. Nuestra capacidad para manejar el mal comportamiento y garantizar el correcto decoro durante el evento depende de nuestra capacidad para comunicarnos y trabajar asertivamente con ustedes como faculty advisors.
        <br><br>

        <div class="accordion">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        1. TARIFAS DE INSCRIPCIÓN
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <br>
                        El costo del evento cuenta con diferentes cuotas de recuperación dependiendo de la modalidad de participación. Tales como:
                        <br>
                        <ul style="margin: 1rem 0;">
                            <li>Delegación (Individual): $300.00 MX (TRESCIENTOS PESOS MEXICANOS)</li>
                            <li>Codelegación (En binas): $280.00 MX por persona (DOSCIENTOS OCHENTA PESOS MEXICANOS)</li>
                            <li>Formar parte de una Delegación Oficial (Mínimo 4 personas): $260.00 MX por persona (DOSCIENTOS SESENTA PESOS MEXICANOS)</li>
                        </ul>
                        Esto incluye diferentes beneficios como: seguimiento por parte de Secretaría de Vinculación correspondiente, previo y durante el Modelo, acceso a la inauguración y clausura del evento, coffee break, kit de participación (libreta, pluma, vaso, etc.) y más sorpresas.
                        <br><br>
                        <strong>Nota importante:</strong> TODAS las delegaciones deben realizar su inscripción individual POSTERIOR al envío de este formulario. La razón de esto es para que el SMMUN pueda cotejar los pagos con la información otorgada tanto por la persona Faculty Advisor como por la delegación, en caso de existir una contradicción, el equipo SMMUN se encargará de contactarse con usted. Por otro lado, las delegaciones deberán adjuntar como comprobante de pago la IMAGEN que será enviada por la Secretaría de Finanzas al correo que usted registró.
                        <br><br>
                        El Modelo de Naciones Unidas del Sureste Mexicano se exime de cualquier responsabilidad relacionada con el uso indebido de la cuota de recuperación fuera de los fines a este modelo. Solo haciéndose responsable una vez que el monto total haya sido exitosamente depositado y confirmado por las autoridades pertinentes.
                        <br><br>
                        Una vez que se haya completado el formulario de inscripción de la delegación, se le enviará un correo electrónico de confirmación tanto a la misma como a la persona faculty.
                        <br><br>
                        Cualquier duda, comunicarse con <a href="mailto:secretariadefinanzas@smmun.com">secretariadefinanzas@smmun.com</a>.
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        2. POLÍTICA DE EQUIDAD
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        La organización SMMUN 2026 "Una Nueva Historia" está comprometida con la promoción de la equidad y la inclusión en el MUN. Nuestro objetivo es alentar a personas de diversos orígenes y experiencias variadas a reunirse y participar en debates claves sobre temas críticos. SMMUN prohíbe estrictamente cualquier forma de discriminación o prejuicio basado en sexo, género, identidad de género, orientación sexual, discapacidad, edad, religión, etnia, raza, estatus socioeconómico o cualquier otro factor que pueda obstaculizar nuestro compromiso con la equidad.
                        <br><br>
                        En consecuencia, cualquier incidente que involucre violencia sexual, acoso, intimidación o discriminación relacionada con cualquiera de los factores antes mencionados será objeto de las medidas disciplinarias correspondientes. Estas medidas pueden incluir la descalificación automática, la posible expulsión del evento o el externar la situación a las autoridades internas y externas pertinentes, según la gravedad de la infracción.
                        <br><br>
                        Al registrar su delegación para SMMUN, usted reconoce y acepta cumplir con los procedimientos de equidad establecidos y el Protocolo de las Delegaciones del comité asignado. Si tiene alguna pregunta o inquietud con respecto a la declaración anterior, no dude en comunicarse con <a href="mailto:vinculacion@smmun.com">vinculacion@smmun.com</a>.
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        3. CONSENTIMIENTO DE USO DE IMAGEN Y DERECHOS DE PUBLICACIÓN
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        Al inscribirse en el SMMUN 2026, usted y/o su delegación oficial (en adelante, "la Delegación Participante") otorgan su consentimiento expreso para que el equipo de comunicación del SMMUN capture y utilice imágenes y videos del evento, incluyendo pero sin limitarse a fotografías y grabaciones de video que puedan incluir al Participante.
                        <br><br>
                        La Delegación Participante reconoce y acepta que dichas imágenes y videos pueden ser utilizados por el SMMUN en sus sitios web, materiales promocionales y otros medios de comunicación, con fines de divulgación y promoción del evento.
                        <br><br>
                        Al aceptar este consentimiento, la Delegación Participante:
                        <ol style="margin: 1rem 0;">
                            <li>Reconoce haber leído y entendido la política de uso de imagen y derechos de publicación del SMMUN.</li>
                            <li>Otorga su consentimiento expreso para el uso de su imagen y voz en los términos descritos anteriormente.</li>
                            <li>Renuncia a cualquier reclamación o derecho que pueda tener respecto al uso de su imagen y voz por parte del SMMUN.</li>
                        </ol>
                        Si tiene alguna pregunta o inquietud, por favor comuníquese con <a href="mailto:secretariadedifusion.smmun@gmail.com">secretariadedifusion.smmun@gmail.com</a>.
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        4. FACULTADES Y CONDICIONES ACADÉMICAS
                    </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>SOBRE SUS FACULTADES ACADÉMICAS:</strong>
                        <ol style="margin: 1rem 0;" type="I">
                            <li><strong>Asesoría académica.</strong> Guiar a sus delegaciones en la comprensión de los temas a discutir, profundizar en el contexto internacional y reforzar la metodología de resolución de conflictos, investigación y argumentación.</li>
                            <br>
                            <li><strong>Comunicación de necesidades y peticiones.</strong> Para cualquier petición, requerimiento o necesidad de sus delegaciones, el Faculty Advisor deberá comunicarlo siempre con la Secretaría Académica, Secretaría General, Secretaría de Finanzas, alguna Secretaría de Vinculación o alguna otra persona del Comité Organizador, dependiendo de la situación o el asunto.</li>
                            <br>
                            <li><strong>Desarrollo de habilidades de debate.</strong> Pueden aconsejar a sus delegaciones en técnicas de debate, negociación, manejo del tiempo y oratoria para ayudarles a expresarse con claridad y precisión, siempre y cuando se haga fuera de los salones de capacitaciones o salas de las sesiones.</li>
                            <br>
                            <li><strong>Soporte en preparación de documentos.</strong> Antes del evento, pueden revisar papeles de posición, discursos y propuestas de solución a mencionar dentro del debate, sugiriendo mejoras o correcciones en la redacción y contenido a sus delegaciones.
                            <br><br>
                            Sin embargo, queda estrictamente prohibido revisar, redactar, sugerir mejoras, suprimir contenido o hacer comentarios de las Hojas de Trabajo o Resoluciones, Informes, Observancias Generales, Convenios o Sentencias que se realizan dentro de cada comité por todas las delegaciones participantes. Las únicas autoridades facultadas para realizar dichas acciones son las personas de la Mesa Directiva y la Secretaría Académica y Secretaría General del SMMUN.</li>
                            <br>
                            <li><strong>Motivación y apoyo emocional.</strong> Pueden proporcionar motivación, recordando a sus delegaciones la importancia de su participación y alentándoles a dar lo mejor de sí, siempre y cuando se haga fuera de los salones de capacitaciones o salas de las sesiones.</li>
                            <br>
                            <li><strong>Apoyo técnico fuera del debate.</strong> Pueden resolver dudas y brindar retroalimentación a sus delegaciones fuera de las capacitaciones y/o sesiones, fortaleciendo sus habilidades sin intervenir directamente en el desarrollo del debate.
                            <br><br>
                            El tiempo de coffee break cuenta como un receso de las sesiones para  poder realizar retroalimentaciones a sus delegaciones, sin embargo, el Faculty Advisor deberá mantener discreción y mucho respeto al momento de comunicarse con sus delegaciones.</li>
                            <br>
                            <li><strong>Asesoría en protocolos.</strong> Ayudan a sus delegaciones a comprender y prepararse para las reglas de procedimiento, mociones y el flujo general del debate en el Modelo. De igual forma, cualquier Faculty Advisor podrá acercarse a la Secretaría Académica del SMMUN para resolver dudas o comentarios respecto al protocolo y/o funcionamiento interno de cada comité.</li>
                            <br>
                            <li><strong>Mantener el respeto.</strong> Independiente de cualquier situación, el Faculty Advisor deberá mantener respeto hacia cualquier persona integrante del SMMUN, incluyendo delegaciones que no integran su Delegación Oficial; todas las Mesas Directivas, sin importar si estas son o no Mesas de sus delegaciones; todas las personas del Comité Organizador; todas las personas que se desempeñan como Faculty Advisors y el personal académico, administrativo y manual de las instalaciones donde se llevará a cabo el SMMUN.</li>
                            <br>
                            <li><strong>Apertura al diálogo.</strong> La Secretaría General y Secretaría Académica siempre estarán dispuestas a escuchar recomendaciones, sugerencias y comentarios sobre cualquier situación, por lo que se le exhorta al Faculty Advisor de tener la confianza de acercarse siempre que lo desee a externar sus dudas y comentarios.</li>
                        </ol>

                        <strong>SOBRE SUS LIMITACIONES ACADÉMICAS DENTRO DEL SMMUN:</strong>
                        <br>
                        <i>(Estas limitaciones solo son requeridas dentro de los horarios e instalaciones donde se llevará a cabo el SMMUN, considerando que cada Faculty Advisor tiene libertad académica de acuerdo a los propios lineamientos de su escuela u organización del cual forma parte)</i>
                        <ol style="margin: 1rem 0;" type="I">
                            <li><strong>Intervenir directamente en el Debate.</strong> No pueden participar en las capacitaciones y/o sesiones de debate, ya sea haciendo preguntas, brindando argumentos o representando a sus delegaciones durante las capacitaciones y/o sesiones.</li>
                            <br>
                            <li><strong>Hablar con las Mesas Directivas.</strong> Para asuntos académicos, protocolarios o logísticos, queda estrictamente prohibido realizar cualquier petición, requerimiento o necesidad de sus delegaciones de forma oral o escrita en cualquier medio con alguna persona integrante de las Mesas Directivas, ya sea fuera o dentro de la inauguración, capacitaciones y/o sesiones de debate. En caso de ser necesario, el Faculty Advisor deberá de comunicarse primero con la Secretaría Académica o Secretaría General y estas serán las encargadas de transmitir el mensaje con la Mesa Directiva.
                            <br><br>
                            Cualquier corrección o sugerencia sobre el protocolo debe ser canalizada únicamente a la Secretaría Académica, evitando interacciones directas con la Mesa Directiva.</li>
                            <br>
                            <li><strong>Influenciar las decisiones de la Mesa Directiva.</strong> No tienen autoridad para intervenir en las decisiones de ninguna de las personas integrantes de la Mesa Directiva ni para opinar sobre el desempeño o decisiones tomadas en el comité.</li>
                            <br>
                            <li><strong>Incentivar a realizar acciones de nepotismo a alguna persona que conoce y que integra alguna Mesa Directiva.</strong> Queda estrictamente prohibido hablar de forma oral, escrita o por cualquier otro medio de comunicación sobre asuntos de darle preferencia o ventaja a alguna delegación, dar la palabra de forma más recurrente, tomar en cuenta para premiaciones o realizar algún otro apoyo más personalizado a alguna delegación para crear ventaja con alguna persona integrante de una Mesa Directiva que conozca el Faculty Advisor por medio de alguna relación personal, profesional o académica.
                            <br><br>
                            Se pide de forma exhaustiva que el Faculty Advisor se abstenga de realizar estas acciones en todo momento, ya sea fuera o dentro de las instalaciones y horarios del Modelo, incluyendo los eventos previos, inauguración, capacitaciones o sesiones de debate.</li>
                            <br>
                            <li><strong>Redactar Documentos, Papeles de Posición, Discursos, Hojas de Trabajo o Resoluciones, Informes, Observancias Generales, Convenios o Sentencias.</strong> No deben escribir ni proponer en nombre de sus delegaciones ideas para la redacción de los documentos antes mencionados. Cada documento debe ser elaborado y creado por todas las delegaciones del comité.
                            <br><br>
                            Se pide de forma exhaustiva que el Faculty Advisor se abstenga de realizar estas acciones en todo momento, ya sea fuera o dentro de las instalaciones y horarios del Modelo.</li>
                            <br>
                            <li><strong>Sancionar o regañar públicamente a sus delegaciones.</strong> La persona Faculty Advisor debe limitarse a la asesoría, evitando reprimendas públicas durante capacitaciones, sesiones y coffee breaks, especialmente en presencia de otras delegaciones o Mesas Directivas.</li>
                            <br>
                            <li><strong>Acceso a reuniones internas de la Mesa Directiva o Comité.</strong> No tienen permitido estar en reuniones cerradas de la Mesa Directiva, ni participar en discusiones internas sobre la evaluación de delegaciones.</li>
                            <br>
                            <li><strong>Nuevas posibles limitaciones.</strong> Cualquier limitación nueva que se establezca, el Faculty Advisor será previamente notificado.</li>
                        </ol>

                        <strong>SOBRE LOS ACCESOS Y SALIDAS A LAS SALAS DURANTE LAS CAPACITACIONES Y SIMULACIONES:</strong>
                        <ol style="margin: 1rem 0;" type="I">
                            <li><strong>Acceso a los salones.</strong> Los Faculty Advisors podrán ingresar de forma respetuosa y silenciosa a los salones donde se estén realizando capacitaciones y/o simulaciones, con el fin de poder observar a sus delegaciones y darles una retroalimentación al finalizar. Sin embargo, no se encuentra en orden acercarse o comunicarse de forma oral o escrita con sus delegaciones durante la capacitación o simulación.</li>
                            <br>
                            <li><strong>Acceso a simulaciones de las capacitaciones.</strong> Durante las simulaciones de capacitaciones de todos los comités, los Faculty Advisor podrán ingresar y permanecer dentro del salón en todo momento y en cualquier procedimiento protocolario, manteniendo silencio y respeto; sin importar si se están llevando a cabo caucus moderados, caucus inmoderados, procesos de votación o espera de aprobación del documento resolutivo. Esto con el fin de que puedan observar el desempeño de sus delegaciones y brindarles una retroalimentación posteriormente.</li>
                            <br>
                            <li><strong>Nuevos posibles lineamientos.</strong> Cualquier lineamiento nuevo que se establezca para los días de capacitaciones, el Faculty Advisor será previamente notificado.</li>
                        </ol>

                        <strong>SOBRE LOS ACCESOS Y SALIDAS A LAS SALAS DURANTE LAS SESIONES DE DEBATE:</strong>
                        <ol style="margin: 1rem 0;" type="I">
                            <li><strong>Entrada en caucus moderado.</strong> Durante los caucus moderados, los Faculty Advisors tienen la facultad de entrar y salir de la sala, siempre que lo hagan en silencio, para evitar interrumpir la dinámica del debate.</li>
                            <br>
                            <li><strong>Reconocimiento de la entrada.</strong> Todos los Faculty Advisors, sin distinción alguna, no tendrán que ser reconocidos públicamente a foro abierto por la Mesa Directiva para poder ingresar a la sala durante los caucus moderados.</li>
                            <br>
                            <li><strong>Prohibición de ingreso a sesiones de caucus inmoderados.</strong> Los Faculty Advisors no pueden ingresar a los caucus inmoderados a menos que sea una emergencia o la Secretaría Académica o Secretaría General les haya otorgado permiso de entrada mediante una solicitud previa.
                            <br><br>
                            Sin embargo, si el Faculty Advisor se encuentra dentro de la sesión cuando inicie el caucus inmoderado, podrá permanecer dentro y salir hasta que el caucus inmoderado termine.</li>
                            <br>
                            <li><strong>Prohibición de ingreso a sesiones durante la votación de Resoluciones, Informes, Observancias Generales o Convenios.</strong> Los Faculty Advisors no pueden ingresar a la sala o mantenerse dentro durante el proceso de votación de los documentos antes mencionados. Para esta situación, no se encuentra en orden realizar una solicitud previa para poder ingresar.</li>
                            <br>
                            <li><strong>Proceso de espera del comité donde la Presidencia se retira de la sala para llevar a la aprobación del documento resolutivo a la Secretaría General y Secretaría Académica.</strong> Durante esta etapa queda estrictamente prohibido entrar o mantenerse durante la sala, por cualquier motivo o circunstancia.
                            <br><br>
                            Al regresar la Presidencia y habiendo entrado primero a la sala para anunciar el resultado de la aprobación, el Faculty Advisor tendrá la oportunidad de ingresar a la sala en silencio.
                            <br>
                            En dado caso de que no se apruebe el documento resolutivo y se tengan que hacer adecuaciones, el Faculty Advisor podrá mantenerse dentro de la sala mientras se realizan las correcciones, pero deberá retirarse cuando salga la presidencia para la segunda revisión y podrá reingresar hasta que la presidencia regrese y entre para dar el segundo veredicto.</li>
                            <br>
                            <li><strong>Supervisión del estatus en caucus inmoderados, procesos de votación y espera de aprobación del documento resolutivo.</strong> En las sesiones de caucus inmoderados, procesos de votaciones y espera de aprobación del documento resolutivo, la Mesa Directiva colocará un letrero en la puerta de la sala indicando el estatus del debate. Este letrero permite a los Faculty Advisors identificar cuándo se encuentra la sesión en caucus inmoderado, en votaciones o en espera de aprobación, para respetar los momentos en los que no se permite su ingreso.</li>
                            <br>
                            <li><strong>Nuevos posibles lineamientos.</strong> Cualquier lineamiento nuevo que se establezca para los días de sesiones de debate, el Faculty Advisor será previamente notificado.</li>
                            <br>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-3" id="aceptar-reglamento">
        <div class="form-check">
            <input required class="form-check-input" autocomplete="off" name="aceptar_reglamento" type="checkbox">
            <label for="aceptar-reglamento" class="form-check-label">He leído, comprendido y aceptado las condiciones del Modelo de Naciones Unidas del Sureste Mexicano (SMMUN) 2026: Una Nueva Historia.</label>
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
