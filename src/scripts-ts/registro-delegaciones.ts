{
// Mostrar input de delegación oficial
let delegacionOficialInput = document.getElementById("input-nombre-delegacion-oficial") as HTMLInputElement;
let responsableDelegacionOficialInput = document.getElementById("input-responsable-delegacion-oficial") as HTMLInputElement;
let delegacionOficialSelect = document.getElementById("select-delegacion-oficial") as HTMLSelectElement;
let imgPago = document.getElementById("img-pago") as HTMLImageElement;
let costoInscripcion = document.getElementById("costo-inscripcion") as HTMLParagraphElement;
let modalidadSelect = document.getElementById("select-modalidad") as HTMLSelectElement;

delegacionOficialSelect.addEventListener("change", function() {
    if (this.value == "si") {
        delegacionOficialInput.required = true;
        delegacionOficialInput.style.display = "initial";
        responsableDelegacionOficialInput.required = true;
        responsableDelegacionOficialInput.style.display = "initial";

        // Quitar imagen de pago
        imgPago.style.display = "none";

        // Poner mensaje en vez de costo
        costoInscripcion.innerHTML = `<strong>Delegación oficial:</strong> como comprobante de pago, solamente se aceptará la imagen que se compartió a su Faculty después de su inscripción. Si no la tiene aún, por favor <a href="https://wa.me/529991975309?text=Hola%20%F0%9F%98%81,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20%F0%9F%92%BC%20Modalidad%20de%20participaci%C3%B3n%0A%5B%5D%20%F0%9F%A4%9D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20%F0%9F%91%A4%20Datos%20personales%0A%5B%5D%20%F0%9F%8C%8E%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20%F0%9F%92%B3%20Proceso%20de%20pago%0A" target="_blank" rel="noopener noreferrer">contáctanos</a>.`
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
});

// Validacion de inputs
validarCorreos(document.getElementsByClassName("input-correo") as HTMLCollectionOf<HTMLInputElement>);
validarCelulares(document.getElementsByClassName("input-celular") as HTMLCollectionOf<HTMLInputElement>);
validarEdades(document.getElementsByClassName("input-edad") as HTMLCollectionOf<HTMLInputElement>);

let comiteSelects = $("select.select-comite") as JQuery<HTMLSelectElement>;
let datosPersonalesCodelegacion = document.getElementById("datos-personales-1") as HTMLDivElement;
let tituloCodelegacion1 = document.getElementById("titulo-datos-1") as HTMLElement;
let tituloCodelegacionInner0 = document.getElementById("titulo-datos-inner-0") as HTMLHeadingElement;
let datosPersonalesCodelegacionInputs = datosPersonalesCodelegacion.getElementsByTagName("input");
let datosPersonalesCodelegacionSelects = datosPersonalesCodelegacion.getElementsByTagName("select");
let notaCodelegacion = document.getElementById("codelegacion-nota") as HTMLParagraphElement;

// Opciones por modalidad
modalidadSelect.addEventListener("change", function() {
    // Codelegación
    if (this.value == "pareja") {
        // Mostrar nota de codelegación
        notaCodelegacion.style.display = "initial";

        // Mostrar campos para datos personales de codelegación
        datosPersonalesCodelegacion.style.display = "initial";
        tituloCodelegacion1.style.display = "initial";

        // Cambiar título delegación 1
        tituloCodelegacionInner0.innerHTML = "Datos personales (codelegación #1)";

        // Requerir todos los campos de codelegación
        for (let i = 0; i < datosPersonalesCodelegacionInputs.length; i++) {
            if (datosPersonalesCodelegacionInputs.item(i)!.name != "info_extra_1" && !datosPersonalesCodelegacionInputs.item(i)!.classList.contains("iti__search-input")) {
                datosPersonalesCodelegacionInputs.item(i)!.required = true;
            }
        }

        for (let i = 0; i < datosPersonalesCodelegacionSelects.length; i++) {
            datosPersonalesCodelegacionSelects.item(i)!.required = true;
        }

        // Deshabilitar CRC, NOBEL, CIJ (solo permiten delegación individual)
        $(comiteSelects).find("option[value='CRC'], option[value='NOBEL'], option[value='CIJ']").prop("disabled", true);

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
        tituloCodelegacion1.style.display = "none";

        // Cambiar título delegación 1
        tituloCodelegacionInner0.innerHTML = "Datos personales";

        // Dejar de requerir campos de codelegación
        for (let i = 0; i < datosPersonalesCodelegacionInputs.length; i++) {
            datosPersonalesCodelegacionInputs[i].required = false;
        }

        for (let i = 0; i < datosPersonalesCodelegacionSelects.length; i++) {
            datosPersonalesCodelegacionSelects[i].required = false;
        }

        // Re-habilitar CRC, NOBEL, CIJ
        $(comiteSelects).find("option[value='CRC'], option[value='NOBEL'], option[value='CIJ']").prop("disabled", false);

        // Poner el costo de inscripción para delegación
        if (delegacionOficialSelect.value != "si") {
            costoInscripcion.innerHTML = "<strong>Costo de inscripción:</strong> $300 MXN";
        }
    }

    // Refrescar los pickers
    comiteSelects.selectpicker("refresh");
});

// Manejar escolaridad
for (let i = 0; i < 2; i++) {
    let escuelaInput = document.getElementById(`input-escuela-${i}`) as HTMLInputElement;
    let escuelaLabel = document.getElementById(`label-escuela-${i}`) as HTMLLabelElement;
    (document.getElementById(`select-escolaridad-${i}`) as HTMLSelectElement).addEventListener("change", function() {
        if (this.value == "No estudio") {
            escuelaInput.required = false;
            escuelaInput.style.display = "none";
            escuelaInput.value = "";
            escuelaLabel.style.display = "none";
        }
        else {
            escuelaInput.required = true;
            escuelaInput.style.display = "initial";
            escuelaLabel.style.display = "initial";
        }
    });
}

let previousComite0 = 0;
let comite0Topicos = document.getElementById("comite-0-topicos") as HTMLDivElement;
let comite0PaisSelects = $("select.select-comite-0-pais") as JQuery<HTMLSelectElement>;
let comite0Pais2Select = document.getElementById("select-comite-0-pais-2") as HTMLSelectElement;
let comite0Pais2Label = document.getElementById("label-comite-0-pais-2") as HTMLLabelElement;

// Handler para cambios de selección del primer comité
comiteSelects[0].addEventListener("change", function() {
    // Re-habilitar el comité seleccionado antes en los otros selects
    if (previousComite0 != 0) {
        comiteSelects[1].options[previousComite0].disabled = false;
        comiteSelects[2].options[previousComite0].disabled = false;

        // Esconder el carousel anterior
        (document.getElementById(`carousel-comite-0-${this.options[previousComite0].value}`) as HTMLDivElement).style.display = "none";
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

        let carouselElement = document.getElementById(`carousel-comite-0-${this.value}`) as HTMLDivElement;
        carouselElement.style.display = "initial";
        bootstrap.Carousel.getOrCreateInstance(carouselElement).to(0);

    }
    else {
        comite0Topicos.style.display = "none";
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

    (comite0PaisSelects.find("optgroup, option") as JQuery<HTMLOptGroupElement | HTMLOptionElement>).each(function() {
        if ($(this).attr("class") == thisValue) {
            this.hidden = false;
            this.disabled = false;
        }
        else if ($(this).is("optgroup") || (this as HTMLOptionElement).value) {
            this.hidden = true;
            this.disabled = true;
        }

        // Resetear la selección
        if ($(this).is("option") && $(this).is("optgroup") || (this as HTMLOptionElement).value == "") {
            (this as HTMLOptionElement).selected = true;
        }
    });

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    comite0PaisSelects.selectpicker("refresh");
});

let previousComite1 = 0;
let comite1Topicos = document.getElementById("comite-1-topicos") as HTMLDivElement;
let comite1PaisSelects = $("select.select-comite-1-pais") as JQuery<HTMLSelectElement>;
let comite1Pais2Select = document.getElementById("select-comite-1-pais-2") as HTMLSelectElement;
let comite1Pais2Label = document.getElementById("label-comite-1-pais-2") as HTMLLabelElement;

// Handler para cambios de selección del segundo comité
comiteSelects[1].addEventListener("change", function() {
    // Re-habilitar el comité seleccionado antes en los otros selects
    if (previousComite1 != 0) {
        comiteSelects[2].options[previousComite1].disabled = false;

        // Esconder el carousel anterior
        (document.getElementById(`carousel-comite-1-${this.options[previousComite1].value}`) as HTMLDivElement).style.display = "none";
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

        let carouselElement = document.getElementById(`carousel-comite-1-${this.value}`) as HTMLDivElement;
        carouselElement.style.display = "initial";
        bootstrap.Carousel.getOrCreateInstance(carouselElement).to(0);
    }
    else {
        comite1Topicos.style.display = "none";
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

    (comite1PaisSelects.find("optgroup, option") as JQuery<HTMLOptGroupElement | HTMLOptionElement>).each(function() {
        if ($(this).attr("class") == thisValue) {
            this.hidden = false;
            this.disabled = false;
        }
        else if ($(this).is("optgroup") || (this as HTMLOptionElement).value) {
            this.hidden = true;
            this.disabled = true;
        }

        // Resetear la selección
        if ($(this).is("option") && $(this).is("optgroup") || (this as HTMLOptionElement).value == "") {
            (this as HTMLOptionElement).selected = true;
        }
    });

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    comite1PaisSelects.selectpicker("refresh");

});

let previousComite2 = 0;
let comite2Topicos = document.getElementById("comite-2-topicos") as HTMLDivElement;
let comite2PaisSelects = $("select.select-comite-2-pais") as JQuery<HTMLSelectElement>;
let comite2Pais2Select = document.getElementById("select-comite-2-pais-2") as HTMLSelectElement;
let comite2Pais2Label = document.getElementById("label-comite-2-pais-2") as HTMLLabelElement;

// Handler para cambios de selección del tercer comité
comiteSelects[2].addEventListener("change", function() {
    if (previousComite2 != 0) {
        // Esconder el carousel anterior
        (document.getElementById(`carousel-comite-2-${this.options[previousComite2].value}`) as HTMLDivElement).style.display = "none";
    }

    previousComite2 = this.selectedIndex;

    // Poner el carousel dependiendo del comité
    if (this.selectedIndex != 0) {
        comite2Topicos.style.display = "flex";

        let carouselElement = document.getElementById(`carousel-comite-2-${this.value}`) as HTMLDivElement;
        carouselElement.style.display = "initial";
        bootstrap.Carousel.getOrCreateInstance(carouselElement).to(0);
    }
    else {
        comite2Topicos.style.display = "none";
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

    (comite2PaisSelects.find("optgroup, option") as JQuery<HTMLOptGroupElement | HTMLOptionElement>).each(function() {
        if ($(this).attr("class") == thisValue) {
            this.hidden = false;
            this.disabled = false;
        }
        else if ($(this).is("optgroup") || (this as HTMLOptionElement).value) {
            this.hidden = true;
            this.disabled = true;
        }

        // Resetear la selección
        if ($(this).is("option") && $(this).is("optgroup") || (this as HTMLOptionElement).value == "") {
            (this as HTMLOptionElement).selected = true;
        }
    });

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    comite2PaisSelects.selectpicker("refresh");
});

// Inicializar carousels
($(".carousel")  as JQuery<HTMLDivElement>).each(function() {
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
    let paisSelects = $(`select.select-comite-${i}-pais`) as JQuery<HTMLSelectElement>;

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
let comprobanteToast = bootstrap.Toast.getOrCreateInstance(document.getElementById("toast-comprobante") as HTMLDivElement);
(document.getElementById("input-comprobante") as HTMLInputElement).addEventListener("change", function() {
    // Mostrar error si el archivo excede los 5 MB
    if (this.files![0].size > 5242880) {
        comprobanteToast.show();
        this.value = "";
    }
});

// Validar forms con boostrap
let form = document.forms[0] as HTMLFormElement;
let enviarToast = document.getElementById("toast-enviar") as HTMLButtonElement;
form.addEventListener("submit", function(e) {
    if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();

        // Mostrar error
        bootstrap.Toast.getOrCreateInstance(enviarToast).show();
    }

    this.classList.add("was-validated");
});

// Toast de contacto en WhatsApp
bootstrap.Toast.getOrCreateInstance(document.getElementById("toast-whatsapp") as HTMLDivElement).show();

// Guardar y reestablecer los valores de los inputs en las cookies
let registroInputs = form.getElementsByTagName("input");
let registroSelects = form.getElementsByTagName("select");
guardarCookiesInputs(registroInputs);
guardarCookiesSelects(registroSelects);
reestablecerCookiesInputs(registroInputs);
reestablecerCookiesSelects(registroSelects);

// Refrescar los selects
$(registroSelects).selectpicker("refresh");

// Cambiar navbar por el titulo
let navNormal = $(".nav-normal");
let navRegistro = $(".nav-registro");
let navNormalHeight = (document.getElementById("navbar") as HTMLElement).getBoundingClientRect().height;

let observador = new IntersectionObserver(function(entries: IntersectionObserverEntry[]) {
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
}, {
    root: null,
    threshold: 0,
    rootMargin: `-${navNormalHeight}px`
});

observador.observe(document.getElementById("titulo-registro") as HTMLElement);
}