"use strict";

let mobile = isMobile();

// Esconder opciones de select
function hideOption(option, hide) {
    option.hidden = hide;
    option.disabled = hide;

    // Workaround para iOS - https://stackoverflow.com/questions/36066953/css-hide-options-from-select-menu-on-iphone-safari
    let parentIsSpan = $(option).parent().is("span");
    if (hide && !parentIsSpan) {
        $(option).wrap("span");
    }
    else if (parentIsSpan) {
        $(option).unwrap();
    }
}

// Mostrar input de delegación oficial
let delegacionOficialInput = document.getElementById("input-nombre-delegacion-oficial");
let responsableDelegacionOficialInput = document.getElementById("input-responsable-delegacion-oficial");
let delegacionOficialSelect = document.getElementById("select-delegacion-oficial");
let imgPago = document.getElementById("img-pago");
let costoInscripcion = document.getElementById("costo-inscripcion");
let modalidadSelect = document.getElementById("select-modalidad");

delegacionOficialSelect.addEventListener("change", function() {
    if (this.value == "si") {
        delegacionOficialInput.required = true;
        delegacionOficialInput.style.display = "initial";
        responsableDelegacionOficialInput.required = true;
        responsableDelegacionOficialInput.style.display = "initial";

        // Quitar imagen de pago
        imgPago.style.display = "none";

        // Poner mensaje en vez de costo
        costoInscripcion.innerHTML = `<strong>Delegación oficial:</strong> como comprobante de pago, solamente se aceptará la imagen que se compartió a su Faculty tras su inscripción. Si no la tiene aún, por favor <a href="https://wa.me/529991975309?text=Hola,%20tengo%20una%20duda%20sobre%20mi%20inscripci%C3%B3n%20al%20SMMUN.%0A%0A*Mis%20datos%20son:*%0ANombre:%0AComit%C3%A9%20elegido:%0APa%C3%ADs%20elegido:%0A" target="_blank" rel="noopener noreferrer">contáctanos</a>.`
    }
    else {
        responsableDelegacionOficialInput.style.display = "none";
        responsableDelegacionOficialInput.required = false;
        responsableDelegacionOficialInput.value = "";
        delegacionOficialInput.style.display = "none";
        delegacionOficialInput.required = false;
        delegacionOficialInput.value = "";

        // Mostrar imagen de pago
        imgPago.style.display = "initial";

        // Costo de pago
        if (modalidadSelect.value == "pareja") {
            costoInscripcion.innerHTML = "<strong>Costo de inscripción:</strong> $560 MXN ($280 MXN por persona)";
        }
        else {
            costoInscripcion.innerHTML = "<strong>Costo de inscripción:</strong> $300 MXN";
        }
    }

    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

// Validación de edad
let edadInputs = document.getElementsByClassName("input-edad");
for (let i = 0; i < edadInputs.length; i++) {
    edadInputs.item(i).addEventListener("input", function() {
        this.value = this.value.replace(/[^\d]/gi, "");
    
        if (this.value.length != 0) {
            try {
                let num = parseInt(this.value);
                if (num >= 11 && num <= 26) {
                    this.setCustomValidity("");
                    this.classList.remove("is-invalid");
                }
                else {
                    throw new Error("");
                }
            }
            catch {
                this.setCustomValidity("Edad inválida.");
                this.classList.add("is-invalid");
            }
        }
    });
}

// Validacion de correo
let correoInputs = document.getElementsByClassName("input-correo");
for (let i = 0; i < correoInputs.length; i++) {
    correoInputs.item(i).addEventListener("input", function() {
        if (!this.checkValidity()) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
}

// Validación de celular
let celInputs = document.getElementsByClassName("input-celular");
for (let i = 0; i < celInputs.length; i++) {
    celInputs.item(i).addEventListener("input", function() {
        this.value = this.value.replace(/[^\d\(\)\s\+\-]/gi, "");
    });
}

let comiteSelects = $("select.select-comite");
let datosPersonalesCodelegacion = document.getElementById("datos_personales_1");
let tituloCodelegacion = document.getElementById("titulo-datos-1");
let datosPersonalesCodelegacionInputs = datosPersonalesCodelegacion.getElementsByTagName("input");
let datosPersonalesCodelegacionSelects = datosPersonalesCodelegacion.getElementsByTagName("select");
let notaCodelegacion = document.getElementById("codelegacion-nota");

// Opciones por modalidad
modalidadSelect.addEventListener("change", function() {
    // Codelegación
    if (this.value == "pareja") {
        // Mostrar nota de codelegación
        notaCodelegacion.style.display = "initial";

        // Mostrar campos para datos personales de codelegación
        datosPersonalesCodelegacion.style.display = "initial";
        tituloCodelegacion.style.display = "initial";

        // Requerir todos los campos de codelegación
        for (let i = 0; i < datosPersonalesCodelegacionInputs.length; i++) {
            datosPersonalesCodelegacionInputs.item(i).required = true;
        }

        for (let i = 0; i < datosPersonalesCodelegacionSelects.length; i++) {
            datosPersonalesCodelegacionSelects.item(i).required = true;
        }

        // Deshabilitar CRC, NOBEL, CIJ (solo permiten delegación individual)
        $(comiteSelects).find("option[value='CRC'], option[value='NOBEL'], option[value='CIJ']").attr("disabled", true);

        // Deseleccionar comité si está entre los deshabilitados
        comiteSelects.each(function() {
            if (["CRC", "NOBEL", "CIJ"].includes(this.value)) {
                this.selectedIndex = 0;
                this.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });

        // Poner el costo de inscripción para codelegación
        if (delegacionOficialSelect.value != "si") {
            costoInscripcion.innerHTML = "<strong>Costo de inscripción:</strong> $560 MXN ($280 MXN por persona)";
        }
    }
    else {
        // Mostrar nota de codelegación
        notaCodelegacion.style.display = "none";

        // Ocultar campos de datos personales de codelegación
        datosPersonalesCodelegacion.style.display = "none";
        tituloCodelegacion.style.display = "none";

        // Dejar de requerir campos de codelegación
        for (let i = 0; i < datosPersonalesCodelegacionInputs.length; i++) {
            datosPersonalesCodelegacionInputs[i].required = false;
        }

        for (let i = 0; i < datosPersonalesCodelegacionSelects.length; i++) {
            datosPersonalesCodelegacionSelects[i].required = false;
        }

        // Re-habilitar CRC, NOBEL, CIJ
        $(comiteSelects).find("option[value='CRC'], option[value='NOBEL'], option[value='CIJ']").attr("disabled", false);

        // Poner el costo de inscripción para delegación
        if (delegacionOficialSelect.value != "si") {
            costoInscripcion.innerHTML = "<strong>Costo de inscripción:</strong> $300 MXN";
        }
    }

    // Refrescar los pickers
    comiteSelects.selectpicker("refresh");

    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

// Manejar cambios de escolaridad
let escolaridadSelect0 = document.getElementById("select-escolaridad-0");
escolaridadSelect0.addEventListener("change", function() {
    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

let escolaridadSelect1 = document.getElementById("select-escolaridad-1");
escolaridadSelect1.addEventListener("change", function() {
    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

// Manejar cambios de país de residencia
let paisResidenciaSelects = $("select.select-pais");
paisResidenciaSelects.each(function() {
    this.addEventListener("change", function() {
        // Cambiar cuenta de pago
        let internacional = true;

        paisResidenciaSelects.each(function() {
            if (this.required && this.value == "México") {
                internacional = false;
            }
        });

        if (internacional) {
            imgPago.src = "/assets/img/images/bbva.webp";
            imgPago.alt = "Datos bancarios. Tarjeta: 4152 3139 9013 9227; Banco: BBVA";
        }
        else {
            imgPago.src = "/assets/img/images/mercadopago.webp";
            imgPago.alt = "Datos bancarios. CLABE: 6460 1020 6386 6808 42; Banco: STP";
        }

        // Actualizar select cuando se usa menú nativo
        if (mobile) {
            $(this).selectpicker("refresh");
        }
    });
});

let previousComite0 = 0;
let comite0Topico0 = document.getElementById("comite-0-topico-0");
let comite0Topico1 = document.getElementById("comite-0-topico-1");
let comite0Topicos = document.getElementById("comite-0-topicos");
let comite0PaisSelects = $("select.select-comite-0-pais");
let comite0Pais2Select = document.getElementById("select-comite-0-pais-2");
let comite0Pais2Label = document.getElementById("label-comite-0-pais-2");

// Handler para cambios de selección del primer comité
comiteSelects[0].addEventListener("change", function() {
    // Re-habilitar el comité seleccionado antes en los otros selects
    if (previousComite0 != 0) {
        comiteSelects[1].options[previousComite0].disabled = false;
        comiteSelects[2].options[previousComite0].disabled = false;

        // Esconder el carousel anterior
        document.getElementById(`carousel-comite-0-${this.options[previousComite0].value}`).style.display = "none";
    }

    // Resetear la selección de los otros selects si es la que vamos a deshabilitar
    if (comiteSelects[1].selectedIndex == this.selectedIndex) {
        comiteSelects[1].selectedIndex = 0;
        comiteSelects[1].dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (comiteSelects[2].selectedIndex == this.selectedIndex) {
        comiteSelects[2].selectedIndex = 0;
        comiteSelects[2].dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Deshabilitar la opción escogida en los otros selects
    comiteSelects[1].options[this.selectedIndex].disabled = true;
    comiteSelects[2].options[this.selectedIndex].disabled = true;
    previousComite0 = this.selectedIndex;

    // Poner el carousel dependiendo del comité
    if (this.selectedIndex != 0) {
        comite0Topicos.style.display = "flex";

        let carouselElement = document.getElementById(`carousel-comite-0-${this.value}`);
        carouselElement.style.display = "initial";
        bootstrap.Carousel.getOrCreateInstance(carouselElement).to(0);

    }
    else {
        comite0Topicos.style.display = "none";
    }

    // Poner los tópicos dependiendo del comité
    if (this.selectedIndex != 0) {


        switch (this.value) {
            case "CSTD":
                //comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Estrategias para promover la educación hídrica como eje transversal en la gestión de infraestructuras hídricas inteligentes";

                //comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos a implementar en el uso de tecnologías emergentes en los sistemas educativos para impulsar la construcción de ciudades inteligentes";
                //comite0Topico1.style.display = "initial";
                break;
            case "CRC":
                //comite0Topico0.innerHTML = "<strong>Topic:</strong> Strategies for preventing and responding to deprivation of liberty, torture and violation of sexual integrity against children";

                //comite0Topico1.style.display = "none";
                break;
            case "OIT":
                //comite0Topico0.innerHTML = "<strong>Tópico:</strong> Medidas para mitigar el desempleo y la falta de oportunidades laborales en la industria manufacturera como resultado de la alfabetización digital e implementación de la Inteligencia Artificial";

                //comite0Topico1.style.display = "none";
                break;
            case "NOBEL":
                //comite0Topico0.innerHTML = "<strong>Tópico:</strong> Elección del Premio Nobel de la Paz 2025";

                //comite0Topico1.style.display = "none";
                break;
            case "CRM":
                //comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Políticas para garantizar la justicia transicional como herramienta de reparación desde la perspectiva de género en las mujeres de América Latina y el Caribe";

                //comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para combatir la demanda de contenido sexual en medios digitales con fines lucrativos en América Latina y el Caribe";
                //comite0Topico1.style.display = "initial";
                break;
            case "UNFPA":
                //comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para proteger la salud de las personas trabajadoras sexuales frente a las infecciones de transmisión sexual, superando la discriminación y los prejuicios sociales";

                //comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos para prevenir el embarazo adolescente a causa de la violencia cultural y desinformación en la salud sexual y reproductiva";
                //comite0Topico1.style.display = "initial";
                break;
            case "OSGEY":
                //comite0Topico0.innerHTML = "<strong>Topic A:</strong> Strategies to Protect Young People’s Wellbeing from Burnout Syndrome";

                //comite0Topico1.innerHTML = "<strong>Topic B:</strong> Strategies to empower youth from vulnerable communities and prevent their engagement in crime";
                //comite0Topico1.style.display = "initial";
                break;
            case "CIDH":
                //comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Acciones para combatir abusos y negligencia a personas en tratamiento dentro de hospitales psiquiátricos para garantizar el cumplimiento de sus derechos humanos";

                //comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para proteger a personas en situación de movilidad ante violaciones de derechos humanos en el Tapón de Darién";
                //comite0Topico1.style.display = "initial";
                break;
            case "CIJ":
                //comite0Topico0.innerHTML = "<strong>Caso:</strong> Sudáfrica contra Israel: justicia por el genocidio en el conflicto armado en la Franja de Gaza y Cisjordania";

                //comite0Topico1.style.display = "none";
                break;
            case "COI":
                //comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para garantizar espacios seguros dentro de los Juegos Olímpicos para las personas atletas de la diversidad sexogenérica";

                //comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Políticas para reducir el impacto económico y ambiental de los Juegos Olímpicos en Los Ángeles 2028";
                //comite0Topico1.style.display = "initial";
                break;                
        }
    }
    else {

    }

    // Para CIJ, deshabilitar y esconder el tercer select
    if (this.value == "CIJ") {
        comite0Pais2Select.required = false;
        $(comite0Pais2Select).selectpicker("hide");
        comite0Pais2Label.style.display = "none";

    }
    else {
        $(comite0Pais2Select).selectpicker("show");
        comite0Pais2Select.required = true;
        comite0Pais2Label.style.display = "initial";
    }

    // Mostrar solo las opciones de delegación del comité seleccionado
    let thisValue = this.value;

    comite0PaisSelects.find("optgroup, option").each(function() {
        if ($(this).attr("class") == thisValue) {
            hideOption(this, false);
        }
        else if (this.value || $(this).is("optgroup")) {
            hideOption(this, true);
        }

        // Resetear la selección
        if ($(this).is("option") && this.value == "") {
            this.selected = true;
        }
    });

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    comite0PaisSelects.selectpicker("refresh");
});

let previousComite1 = 0;
let comite1Topico0 = document.getElementById("comite-1-topico-0");
let comite1Topico1 = document.getElementById("comite-1-topico-1");
let comite1Topicos = document.getElementById("comite-1-topicos");
let comite1PaisSelects = $("select.select-comite-1-pais");
let comite1Pais2Select = document.getElementById("select-comite-1-pais-2");
let comite1Pais2Label = document.getElementById("label-comite-1-pais-2");

// Handler para cambios de selección del segundo comité
comiteSelects[1].addEventListener("change", function() {
    // Re-habilitar el comité seleccionado antes en los otros selects
    if (previousComite1 != 0) {
        comiteSelects[2].options[previousComite1].disabled = false;

        // Esconder el carousel anterior
        document.getElementById(`carousel-comite-1-${this.options[previousComite1].value}`).style.display = "none";
    }

    // Resetear la selección de los otros selects si es la que vamos a deshabilitar
    if (comiteSelects[2].selectedIndex == this.selectedIndex) {
        comiteSelects[2].selectedIndex = 0;
        comiteSelects[2].dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Deshabilitar la opción escogida en los otros selects
    comiteSelects[2].options[this.selectedIndex].disabled = true;
    previousComite1 = this.selectedIndex;

    // Poner el carousel dependiendo del comité
    if (this.selectedIndex != 0) {
        comite1Topicos.style.display = "flex";

        let carouselElement = document.getElementById(`carousel-comite-1-${this.value}`);
        carouselElement.style.display = "initial";
        bootstrap.Carousel.getOrCreateInstance(carouselElement).to(0);
    }
    else {
        comite1Topicos.style.display = "none";
    }

    if (this.selectedIndex != 0) {

        switch (this.value) {
            case "CSTD":
                //document.getElementById("carousel-comite-1-CSTD").style.display = "initial";
                //comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Estrategias para promover la educación hídrica como eje transversal en la gestión de infraestructuras hídricas inteligentes";
                
                //comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos a implementar en el uso de tecnologías emergentes en los sistemas educativos para impulsar la construcción de ciudades inteligentes";
                //comite1Topico1.style.display = "initial";
                break;
            case "CRC":
                //comite1Topico0.innerHTML = "<strong>Topic:</strong> Strategies for preventing and responding to deprivation of liberty, torture and violation of sexual integrity against children";
                
                //comite1Topico1.style.display = "none";
                break;
            case "OIT":
                //comite1Topico0.innerHTML = "<strong>Tópico:</strong> Medidas para mitigar el desempleo y la falta de oportunidades laborales en la industria manufacturera como resultado de la alfabetización digital e implementación de la Inteligencia Artificial";
                
                //comite1Topico1.style.display = "none";
                break;
            case "NOBEL":
                //comite1Topico0.innerHTML = "<strong>Tópico:</strong> Elección del Premio Nobel de la Paz 2025";
                
                //comite1Topico1.style.display = "none";
                break;
            case "CRM":
                //comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Políticas para garantizar la justicia transicional como herramienta de reparación desde la perspectiva de género en las mujeres de América Latina y el Caribe";
                
                //comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para combatir la demanda de contenido sexual en medios digitales con fines lucrativos en América Latina y el Caribe";
                //comite1Topico1.style.display = "initial";
                break;
            case "UNFPA":
                //comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para proteger la salud de las personas trabajadoras sexuales frente a las infecciones de transmisión sexual, superando la discriminación y los prejuicios sociales";
                
                //comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos para prevenir el embarazo adolescente a causa de la violencia cultural y desinformación en la salud sexual y reproductiva";
                //comite1Topico1.style.display = "initial";
                break;
            case "OSGEY":
                //comite1Topico0.innerHTML = "<strong>Topic A:</strong> Strategies to Protect Young People’s Wellbeing from Burnout Syndrome";
                
                //comite1Topico1.innerHTML = "<strong>Topic B:</strong> Strategies to empower youth from vulnerable communities and prevent their engagement in crime";
                //comite1Topico1.style.display = "initial";
                break;
            case "CIDH":
                //comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Acciones para combatir abusos y negligencia a personas en tratamiento dentro de hospitales psiquiátricos para garantizar el cumplimiento de sus derechos humanos";
                
                //comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para proteger a personas en situación de movilidad ante violaciones de derechos humanos en el Tapón de Darién";
                //comite1Topico1.style.display = "initial";
                break;
            case "CIJ":
                //comite1Topico0.innerHTML = "<strong>Caso:</strong> Sudáfrica contra Israel: justicia por el genocidio en el conflicto armado en la Franja de Gaza y Cisjordania";
                
                //comite1Topico1.style.display = "none";
                break;
            case "COI":
                //comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para garantizar espacios seguros dentro de los Juegos Olímpicos para las personas atletas de la diversidad sexogenérica";
                
                //comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Políticas para reducir el impacto económico y ambiental de los Juegos Olímpicos en Los Ángeles 2028";
                //comite1Topico1.style.display = "initial";
                break;                
        }
    }
    else {

    }

    // Para CIJ, deshabilitar y esconder el tercer select
    if (this.value == "CIJ") {
        comite1Pais2Select.required = false;
        $(comite1Pais2Select).selectpicker("hide");
        comite1Pais2Label.style.display = "none";

    }
    else {
        $(comite1Pais2Select).selectpicker("show");
        comite1Pais2Select.required = true;
        comite1Pais2Label.style.display = "initial";
    }

    // Mostrar solo las opciones de delegación del comité seleccionado
    let thisValue = this.value;

    comite1PaisSelects.find("optgroup, option").each(function() {
        if ($(this).attr("class") == thisValue) {
            hideOption(this, false);
        }
        else if (this.value || $(this).is("optgroup")) {
            hideOption(this, true);
        }

        // Resetear la selección
        if ($(this).is("option") && this.value == "") {
            this.selected = true;
        }
    });

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    comite1PaisSelects.selectpicker("refresh");

});

let previousComite2 = 0;
let comite2Topico0 = document.getElementById("comite-2-topico-0");
let comite2Topico1 = document.getElementById("comite-2-topico-1");
let comite2Topicos = document.getElementById("comite-2-topicos");
let comite2PaisSelects = $("select.select-comite-2-pais");
let comite2Pais2Select = document.getElementById("select-comite-2-pais-2");
let comite2Pais2Label = document.getElementById("label-comite-2-pais-2");

// Handler para cambios de selección del tercer comité
comiteSelects[2].addEventListener("change", function() {
    if (previousComite2 != 0) {
        // Esconder el carousel anterior
        document.getElementById(`carousel-comite-2-${this.options[previousComite2].value}`).style.display = "none";
    }

    previousComite2 = this.selectedIndex;

    // Poner el carousel dependiendo del comité
    if (this.selectedIndex != 0) {
        comite2Topicos.style.display = "flex";

        let carouselElement = document.getElementById(`carousel-comite-2-${this.value}`);
        carouselElement.style.display = "initial";
        bootstrap.Carousel.getOrCreateInstance(carouselElement).to(0);
    }
    else {
        comite2Topicos.style.display = "none";
    }

    // Poner los tópicos dependiendo del comité
    if (this.selectedIndex != 0) {

        switch (this.value) {
            case "CSTD":
                //comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Estrategias para promover la educación hídrica como eje transversal en la gestión de infraestructuras hídricas inteligentes";
                
                //comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos a implementar en el uso de tecnologías emergentes en los sistemas educativos para impulsar la construcción de ciudades inteligentes";
                //comite2Topico1.style.display = "initial";
                break;
            case "CRC":
                //comite2Topico0.innerHTML = "<strong>Topic:</strong> Strategies for preventing and responding to deprivation of liberty, torture and violation of sexual integrity against children";
                
                //comite2Topico1.style.display = "none";
                break;
            case "OIT":
                //comite2Topico0.innerHTML = "<strong>Tópico:</strong> Medidas para mitigar el desempleo y la falta de oportunidades laborales en la industria manufacturera como resultado de la alfabetización digital e implementación de la Inteligencia Artificial";
                
                //comite2Topico1.style.display = "none";
                break;
            case "NOBEL":
                //comite2Topico0.innerHTML = "<strong>Tópico:</strong> Elección del Premio Nobel de la Paz 2025";
                
                //comite2Topico1.style.display = "none";
                break;
            case "CRM":
                //comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Políticas para garantizar la justicia transicional como herramienta de reparación desde la perspectiva de género en las mujeres de América Latina y el Caribe";
                
                //comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para combatir la demanda de contenido sexual en medios digitales con fines lucrativos en América Latina y el Caribe";
                //comite2Topico1.style.display = "initial";
                break;
            case "UNFPA":
                //comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para proteger la salud de las personas trabajadoras sexuales frente a las infecciones de transmisión sexual, superando la discriminación y los prejuicios sociales";
                
                //comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos para prevenir el embarazo adolescente a causa de la violencia cultural y desinformación en la salud sexual y reproductiva";
                //comite2Topico1.style.display = "initial";
                break;
            case "OSGEY":
                //comite2Topico0.innerHTML = "<strong>Topic A:</strong> Strategies to Protect Young People’s Wellbeing from Burnout Syndrome";
                
                //comite2Topico1.innerHTML = "<strong>Topic B:</strong> Strategies to empower youth from vulnerable communities and prevent their engagement in crime";
                //comite2Topico1.style.display = "initial";
                break;
            case "CIDH":
                //comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Acciones para combatir abusos y negligencia a personas en tratamiento dentro de hospitales psiquiátricos para garantizar el cumplimiento de sus derechos humanos";
                
                //comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para proteger a personas en situación de movilidad ante violaciones de derechos humanos en el Tapón de Darién";
                //comite2Topico1.style.display = "initial";
                break;
            case "CIJ":
                //comite2Topico0.innerHTML = "<strong>Caso:</strong> Sudáfrica contra Israel: justicia por el genocidio en el conflicto armado en la Franja de Gaza y Cisjordania";
                
                //comite2Topico1.style.display = "none";
                break;
            case "COI":
                //comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para garantizar espacios seguros dentro de los Juegos Olímpicos para las personas atletas de la diversidad sexogenérica";
                
                //comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Políticas para reducir el impacto económico y ambiental de los Juegos Olímpicos en Los Ángeles 2028";
                //comite2Topico1.style.display = "initial";
                break;                
        }
    }
    else {

    }

    // Para CIJ, deshabilitar y esconder el tercer select
    if (this.value == "CIJ") {
        comite2Pais2Select.required = false;
        $(comite2Pais2Select).selectpicker("hide");
        comite2Pais2Label.style.display = "none";
    }
    else {
        $(comite2Pais2Select).selectpicker("show");
        comite2Pais2Select.required = true;
        comite2Pais2Label.style.display = "initial";
    }

    // Mostrar solo las opciones de delegación del comité seleccionado
    let thisValue = this.value;

    comite2PaisSelects.find("optgroup, option").each(function() {
        if ($(this).attr("class") == thisValue) {
            hideOption(this, false);
        }
        else if (this.value || $(this).is("optgroup")) {
            hideOption(this, true);
        }

        // Resetear la selección
        if ($(this).is("option") && this.value == "") {
            this.selected = true;
        }
    });

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    comite2PaisSelects.selectpicker("refresh");
});

// Inicializar carousels
$(".carousel").each(function() {
    /*let carousel = new bootstrap.Carousel(this, {
        interval: 2000,
        //ride: "carousel"
    });*/

    let carouselElement = this;
    let paused = false;

    $(this).find("img").each(function() {
        this.addEventListener("click", function() {
            let carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement);

            if (paused) {
                carousel.cycle();
            }
            else {
                carousel.pause();
            }

            paused = !paused;
        });
    })
});

// Evitar doble selección en opciones de país
for (let i = 0; i < 3; i++) {
    let paisSelects = $(`select.select-comite-${i}-pais`);

    let previousPais0 = 0;

    // Primer selector de países
    paisSelects[0].addEventListener("change", function() {
        // Re-habilitar el país seleccionado antes en los otros selects
        if (previousPais0 != 0) {
            paisSelects[1].options[previousPais0].disabled = false;
            paisSelects[2].options[previousPais0].disabled = false;
        }

        // Resetear la selección de los otros selects si es la que vamos a deshabilitar
        if (paisSelects[1].selectedIndex == this.selectedIndex) {
            paisSelects[1].selectedIndex = 0;
        }

        if (paisSelects[2].selectedIndex == this.selectedIndex) {
            paisSelects[2].selectedIndex = 0;
        }

        // Deshabilitar la opción escogida en los otros selects
        paisSelects[1].options[this.selectedIndex].disabled = true;
        paisSelects[2].options[this.selectedIndex].disabled = true;
        previousPais0 = this.selectedIndex;

        // Refrescar los selects
        paisSelects.selectpicker("refresh");
    });

    let previousPais1 = 0;

    paisSelects[1].addEventListener("change", function() {
        // Re-habilitar el país seleccionado antes en los otros selects
        if (previousPais1 != 0) {
            paisSelects[2].options[previousPais1].disabled = false;
        }

        // Resetear la selección de los otros selects si es la que vamos a deshabilitar
        if (paisSelects[2].selectedIndex == this.selectedIndex) {
            paisSelects[2].selectedIndex = 0;
        }

        // Deshabilitar la opción escogida en los otros selects
        paisSelects[2].options[this.selectedIndex].disabled = true;
        previousPais1 = this.selectedIndex;

        // Refrescar los selects
        paisSelects.selectpicker("refresh");
    });

    paisSelects[2].addEventListener("change", function() {
        // Refrescar los selects
        paisSelects.selectpicker("refresh");
    })
}

// Limitar tamaño de archivos
let comprobanteToast = bootstrap.Toast.getOrCreateInstance(document.getElementById("toast-comprobante"));
document.getElementById("input-comprobante").addEventListener("change", function() {
    // Mostrar error si el archivo excede los 5 MB
    if (this.files[0].size > 5242880) {
        comprobanteToast.show();
        this.value = "";
    }
});

// Validar forms con boostrap
let form = document.getElementById("registro-delegaciones");
form.addEventListener("submit", function(e) {
    if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();

        // Mostrar error
        bootstrap.Toast.getOrCreateInstance(document.getElementById("toast-enviar")).show();
    }

    this.classList.add("was-validated");
});

// Toast de contacto en WhatsApp
bootstrap.Toast.getOrCreateInstance(document.getElementById("toast-whatsapp")).show();

let today = new Date();
let expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000);

// Funciones para manejar cookies
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; SameSite=Strict; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}

// Guardar los valores de los inputs en las cookies
let registroInputs = document.forms["registro-delegaciones"].getElementsByTagName("input");
for (let i = 0; i < registroInputs.length; i++) {
    let input = registroInputs.item(i);
    if (input.type == "file" || input.type == "submit") {
        continue;
    }

    input.addEventListener("input", function() {
        setCookie(this.name, this.value);
    });
}

// Guardar los valores de los selects en las cookies
let registroSelects = document.forms["registro-delegaciones"].getElementsByTagName("select");
for (let i = 0; i < registroSelects.length; i++) {
    let select = registroSelects.item(i);
    select.addEventListener("change", function() {
        setCookie(this.name, this.value);
    });
}

// Reestablecer los valores de los inputs desde las cookies
for (let i = 0; i < registroInputs.length; i++) {
    let input = registroInputs.item(i);
    if (input.type == "file" || input.type == "submit") {
        continue;
    }

    let cookieValue = getCookie(input.name);
    if (cookieValue) {
        input.value = cookieValue;
        input.dispatchEvent(new Event("input", { bubbles: true }));
    }
}

// Reestablecer los valores de los selects desde las cookies
for (let i = 0; i < registroSelects.length; i++) {
    let select = registroSelects.item(i);
    let cookieValue = getCookie(select.name);
    if (cookieValue) {
        select.value = cookieValue;
        if (select.selectedIndex == -1 || select.options[select.selectedIndex].disabled) {
            select.selectedIndex = 0;
        }
    }

    select.dispatchEvent(new Event("change", { bubbles: true }));
}

// Refrescar los selects
$(registroSelects).selectpicker("refresh");

// Usar menú nativo en plataformas móviles
if (mobile) {
    $(registroSelects).selectpicker("mobile");
}

// Cambiar navbar por el titulo
let nav = document.getElementById("navbar");
let navNormal = $(".nav-normal");
let navRegistro = $(".nav-registro");
const header = document.getElementById("titulo-registro");
const navHeight = nav.getBoundingClientRect().height;

function updateNavColor(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        navNormal.each(function() {
            this.style.display  = "none";
        });

        navRegistro.each(function() {
            this.style.display  = "";
        });
    }
    else {
        navNormal.each(function() {
            this.style.display  = "";
        });

        navRegistro.each(function() {
            this.style.display  = "none";
        });
    }
}

const headerObserver = new IntersectionObserver(updateNavColor, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);
