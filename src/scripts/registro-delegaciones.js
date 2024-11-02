let mobile = isMobile();

// Esconder opciones de select
function hideOption(option, hide) {
    option.hidden = hide;
    option.disabled = hide;

    // Workaround para iOS - https://stackoverflow.com/questions/36066953/css-hide-options-from-select-menu-on-iphone-safari
    if (hide) {
        if (!$(option).parent().is("span")) {
            $(option).wrap("span");
        }
    }
    else if ($(option).parent().is("span")) {
        $(option).unwrap();
    }
}

// Mostrar input de delegación oficial
let delegacionOficialInput = document.getElementById("input-nombre-delegacion-oficial");
let delegacionOficialSelect = document.getElementById("select-delegacion-oficial");
delegacionOficialSelect.addEventListener("change", function() {
    if (this.value == "si") {
        delegacionOficialInput.required = true;
        delegacionOficialInput.style.display = "initial";
    }
    else {
        delegacionOficialInput.style.display = "none";
        delegacionOficialInput.required = false;
        delegacionOficialInput.value = "";
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
                if (num >= 12 && num <= 26) {
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
let modalidadSelect = document.getElementById("select-modalidad");
let datosPersonalesCodelegacion = document.getElementById("datos_personales_1");
let datosPersonalesCodelegacionInputs = datosPersonalesCodelegacion.getElementsByTagName("input");
let datosPersonalesCodelegacionSelects = datosPersonalesCodelegacion.getElementsByTagName("select");

// Opciones por modalidad
modalidadSelect.addEventListener("change", function() {
    // Codelegación
    if (this.value == "pareja") {
        // Mostrar campos para datos personales de codelegación
        datosPersonalesCodelegacion.style.display = "initial";

        // Requerir todos los campos de codelegación
        for (let i = 0; i < datosPersonalesCodelegacionInputs.length; i++) {
            datosPersonalesCodelegacionInputs.item(i).required = true;
        }

        for (let i = 0; i < datosPersonalesCodelegacionSelects.length; i++) {
            datosPersonalesCodelegacionSelects.item(i).required = true;
        }

        // Deshabilitar CRC, NOBEL, CIJ (solo permiten delegación individual)
        $("select.select-comite option[value='CRC']").attr("disabled", true);
        $("select.select-comite option[value='NOBEL']").attr("disabled", true);
        $("select.select-comite option[value='CIJ']").attr("disabled", true);

        // Deseleccionar comité si está entre los deshabilitados
        $("select.select-comite").each(function() {
            if (["CRC", "NOBEL", "CIJ"].includes($(this).find(":selected").val())) {
                this.selectedIndex = 0;
                this.dispatchEvent(new Event("change", { bubbles: true }));
            }
        });

        // Poner el costo de inscripción para codelegación
        document.getElementById("costo-inscripcion").innerHTML = "$ COSTO CODELEGACIÓN";
    }
    else {
        // Ocultar campos de datos personales de codelegación
        datosPersonalesCodelegacion.style.display = "none";

        // Dejar de requerir campos de codelegación
        for (let i = 0; i < datosPersonalesCodelegacionInputs.length; i++) {
            datosPersonalesCodelegacionInputs[i].required = false;
        }

        for (let i = 0; i < datosPersonalesCodelegacionSelects.length; i++) {
            datosPersonalesCodelegacionSelects[i].required = false;
        }

        // Re-habilitar CRC, NOBEL, CIJ
        $("select.select-comite option[value='CRC']").attr("disabled", false);
        $("select.select-comite option[value='NOBEL']").attr("disabled", false);
        $("select.select-comite option[value='CIJ']").attr("disabled", false);

        // Poner el costo de inscripción para delegación
        document.getElementById("costo-inscripcion").innerHTML = "$ COSTO DELEGACIÓN";
    }

    // Refrescar los pickers
    comiteSelects.selectpicker("refresh");

    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

// Mostrar opcion de otra escolaridad (delegación)
let otraEscolaridadInput0 = document.getElementById("input_escolaridad_otra_0");
let escolaridadSelect0 = document.getElementById("select_escolaridad_0");
escolaridadSelect0.addEventListener("change", function() {
    if (this.value == "otra") {
        otraEscolaridadInput0.required = true;
        otraEscolaridadInput0.style.display = "initial";
    }
    else {
        otraEscolaridadInput0.style.display = "none";
        otraEscolaridadInput0.required = false;
        otraEscolaridadInput0.value = "";
    }

    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

// Mostrar opcion de otra escolaridad (codelegación)
let otraEscolaridadInput1 = document.getElementById("input_escolaridad_otra_1");
let escolaridadSelect1 = document.getElementById("select_escolaridad_1");
escolaridadSelect1.addEventListener("change", function() {
    if (this.value == "otra") {
        otraEscolaridadInput1.required = true;
        otraEscolaridadInput1.style.display = "initial";
    }
    else {
        otraEscolaridadInput1.style.display = "none";
        otraEscolaridadInput1.required = false;
        otraEscolaridadInput1.value = "";
    }

    // Actualizar select cuando se usa menú nativo
    if (mobile) {
        $(this).selectpicker("refresh");
    }
});

// Manejar cambios de país de residencia
$("select.select-pais").each(function() {
    this.addEventListener("change", function() {
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

// Handler para cambios de selección del primer comité
comiteSelects[0].addEventListener("change", function() {
    // Re-habilitar el comité seleccionado antes en los otros selects
    if (previousComite0 != 0) {
        comiteSelects[1].options[previousComite0].disabled = false;
        comiteSelects[2].options[previousComite0].disabled = false;
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

    // Poner los tópicos dependiendo del comité
    if (this.selectedIndex != 0) {
        comite0Topicos.style.display = "flex";

        switch (this.value) {
            case "CSTD":
                comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Estrategias para promover la educación hídrica como eje transversal en la gestión de infraestructuras hídricas inteligentes";

                comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos a implementar en el uso de tecnologías emergentes en los sistemas educativos para impulsar la construcción de ciudades inteligentes";
                comite0Topico1.style.display = "initial";
                break;
            case "CRC":
                comite0Topico0.innerHTML = "<strong>Topic:</strong> Strategies for preventing and responding to deprivation of liberty, torture and violation of sexual integrity against children";

                comite0Topico1.style.display = "none";
                break;
            case "OIT":
                comite0Topico0.innerHTML = "<strong>Tópico:</strong> Medidas para mitigar el desempleo y la falta de oportunidades laborales en la industria manufacturera como resultado de la alfabetización digital e implementación de la Inteligencia Artificial";

                comite0Topico1.style.display = "none";
                break;
            case "NOBEL":
                comite0Topico0.innerHTML = "<strong>Tópico:</strong> Elección del Premio Nobel de la Paz 2025";

                comite0Topico1.style.display = "none";
                break;
            case "CRM":
                comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Políticas para garantizar la justicia transicional como herramienta de reparación desde la perspectiva de género en las mujeres de América Latina y el Caribe";

                comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para combatir la demanda de contenido sexual en medios digitales con fines lucrativos en América Latina y el Caribe";
                comite0Topico1.style.display = "initial";
                break;
            case "UNFPA":
                comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para proteger la salud de las personas trabajadoras sexuales frente a las infecciones de transmisión sexual, superando la discriminación y los prejuicios sociales";

                comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos para prevenir el embarazo adolescente a causa de la violencia cultural y desinformación en la salud sexual y reproductiva";
                comite0Topico1.style.display = "initial";
                break;
            case "OSGEY":
                comite0Topico0.innerHTML = "<strong>Topic A:</strong> Strategies to Protect Young People’s Wellbeing from Burnout Syndrome";

                comite0Topico1.innerHTML = "<strong>Topic B:</strong> Strategies to empower youth from vulnerable communities and prevent their engagement in crime";
                comite0Topico1.style.display = "initial";
                break;
            case "CIDH":
                comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Acciones para combatir abusos y negligencia a personas en tratamiento dentro de hospitales psiquiátricos para garantizar el cumplimiento de sus derechos humanos";

                comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para proteger a personas en situación de movilidad ante violaciones de derechos humanos en el Tapón de Darién";
                comite0Topico1.style.display = "initial";
                break;
            case "CIJ":
                comite0Topico0.innerHTML = "<strong>Caso:</strong> Sudáfrica contra Israel: justicia por el genocidio en el conflicto armado en la Franja de Gaza y Cisjordania";

                comite0Topico1.style.display = "none";
                break;
            case "COI":
                comite0Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para garantizar espacios seguros dentro de los Juegos Olímpicos para las personas atletas de la diversidad sexogenérica";

                comite0Topico1.innerHTML = "<strong>Tópico B:</strong> Políticas para reducir el impacto económico y ambiental de los Juegos Olímpicos en Los Ángeles 2028";
                comite0Topico1.style.display = "initial";
                break;                
        }
    }
    else {
        comite0Topicos.style.display = "none";
    }

    // Para CIJ, deshabilitar y esconder el tercer select
    if (this.value == "CIJ") {
        $("#select-comite-0-pais-2").prop("required", false);
        $("#select-comite-0-pais-2").selectpicker("hide");
        $("#label-comite-0-pais-2").hide();

    }
    else {
        $("#select-comite-0-pais-2").selectpicker("show");
        $("#select-comite-0-pais-2").prop("required", true);
        $("#label-comite-0-pais-2").show();
    }

    // Mostrar solo las opciones de delegación del comité seleccionado
    let thisValue = this.value;

    $("optgroup, option", "select.select-comite-0-pais").each(function() {
        if ($(this).attr("class") == thisValue) {
            hideOption(this, false);
            //this.hidden = false;
            //this.disabled = false;
        }
        else if (this.value || $(this).is("optgroup")) {
            hideOption(this, true);
            //this.hidden = true;
            //this.disabled = true;
        }
    });

    // Resetear la selección de delegación
    $("select.select-comite-0-pais option:eq(0)").prop("selected", true);

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    $("select.select-comite-0-pais").selectpicker("refresh");
});

let previousComite1 = 0;
let comite1Topico0 = document.getElementById("comite-1-topico-0");
let comite1Topico1 = document.getElementById("comite-1-topico-1");
let comite1Topicos = document.getElementById("comite-1-topicos");

// Handler para cambios de selección del segundo comité
comiteSelects[1].addEventListener("change", function() {
    // Re-habilitar el comité seleccionado antes en los otros selects
    if (previousComite1 != 0) {
        comiteSelects[2].options[previousComite1].disabled = false;
    }

    // Resetear la selección de los otros selects si es la que vamos a deshabilitar
    if (comiteSelects[2].selectedIndex == this.selectedIndex) {
        comiteSelects[2].selectedIndex = 0;
        comiteSelects[2].dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Deshabilitar la opción escogida en los otros selects
    comiteSelects[2].options[this.selectedIndex].disabled = true;
    previousComite1 = this.selectedIndex;

    // Poner los tópicos dependiendo del comité
    if (this.selectedIndex != 0) {
        comite1Topicos.style.display = "flex";

        switch (this.value) {
            case "CSTD":
                comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Estrategias para promover la educación hídrica como eje transversal en la gestión de infraestructuras hídricas inteligentes";
                
                comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos a implementar en el uso de tecnologías emergentes en los sistemas educativos para impulsar la construcción de ciudades inteligentes";
                comite1Topico1.style.display = "initial";
                break;
            case "CRC":
                comite1Topico0.innerHTML = "<strong>Topic:</strong> Strategies for preventing and responding to deprivation of liberty, torture and violation of sexual integrity against children";
                
                comite1Topico1.style.display = "none";
                break;
            case "OIT":
                comite1Topico0.innerHTML = "<strong>Tópico:</strong> Medidas para mitigar el desempleo y la falta de oportunidades laborales en la industria manufacturera como resultado de la alfabetización digital e implementación de la Inteligencia Artificial";
                
                comite1Topico1.style.display = "none";
                break;
            case "NOBEL":
                comite1Topico0.innerHTML = "<strong>Tópico:</strong> Elección del Premio Nobel de la Paz 2025";
                
                comite1Topico1.style.display = "none";
                break;
            case "CRM":
                comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Políticas para garantizar la justicia transicional como herramienta de reparación desde la perspectiva de género en las mujeres de América Latina y el Caribe";
                
                comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para combatir la demanda de contenido sexual en medios digitales con fines lucrativos en América Latina y el Caribe";
                comite1Topico1.style.display = "initial";
                break;
            case "UNFPA":
                comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para proteger la salud de las personas trabajadoras sexuales frente a las infecciones de transmisión sexual, superando la discriminación y los prejuicios sociales";
                
                comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos para prevenir el embarazo adolescente a causa de la violencia cultural y desinformación en la salud sexual y reproductiva";
                comite1Topico1.style.display = "initial";
                break;
            case "OSGEY":
                comite1Topico0.innerHTML = "<strong>Topic A:</strong> Strategies to Protect Young People’s Wellbeing from Burnout Syndrome";
                
                comite1Topico1.innerHTML = "<strong>Topic B:</strong> Strategies to empower youth from vulnerable communities and prevent their engagement in crime";
                comite1Topico1.style.display = "initial";
                break;
            case "CIDH":
                comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Acciones para combatir abusos y negligencia a personas en tratamiento dentro de hospitales psiquiátricos para garantizar el cumplimiento de sus derechos humanos";
                
                comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para proteger a personas en situación de movilidad ante violaciones de derechos humanos en el Tapón de Darién";
                comite1Topico1.style.display = "initial";
                break;
            case "CIJ":
                comite1Topico0.innerHTML = "<strong>Caso:</strong> Sudáfrica contra Israel: justicia por el genocidio en el conflicto armado en la Franja de Gaza y Cisjordania";
                
                comite1Topico1.style.display = "none";
                break;
            case "COI":
                comite1Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para garantizar espacios seguros dentro de los Juegos Olímpicos para las personas atletas de la diversidad sexogenérica";
                
                comite1Topico1.innerHTML = "<strong>Tópico B:</strong> Políticas para reducir el impacto económico y ambiental de los Juegos Olímpicos en Los Ángeles 2028";
                comite1Topico1.style.display = "initial";
                break;                
        }
    }
    else {
        comite1Topicos.style.display = "none";
    }

    // Para CIJ, deshabilitar y esconder el tercer select
    if (this.value == "CIJ") {
        $("#select-comite-1-pais-2").prop("required", false);
        $("#select-comite-1-pais-2").selectpicker("hide");
        $("#label-comite-1-pais-2").hide();

    }
    else {
        $("#select-comite-1-pais-2").selectpicker("show");
        $("#select-comite-1-pais-2").prop("required", true);
        $("#label-comite-1-pais-2").show();
    }

    // Mostrar solo las opciones de delegación del comité seleccionado
    let thisValue = this.value;

    $("optgroup, option", "select.select-comite-1-pais").each(function() {
        if ($(this).attr("class") == thisValue) {
            hideOption(this, false);
            //this.hidden = false;
            //this.disabled = false;
        }
        else if (this.value || $(this).is("optgroup")) {
            hideOption(this, true);
            //this.hidden = true;
            //this.disabled = true;
        }
    });

    // Resetear la selección de delegación
    $("select.select-comite-1-pais option:eq(0)").prop("selected", true);

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    $("select.select-comite-1-pais").selectpicker("refresh");

});

let comite2Topico0 = document.getElementById("comite-2-topico-0");
let comite2Topico1 = document.getElementById("comite-2-topico-1");
let comite2Topicos = document.getElementById("comite-2-topicos");

// Handler para cambios de selección del tercer comité
comiteSelects[2].addEventListener("change", function() {
    // Poner los tópicos dependiendo del comité
    if (this.selectedIndex != 0) {
        comite2Topicos.style.display = "flex";

        switch (this.value) {
            case "CSTD":
                comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Estrategias para promover la educación hídrica como eje transversal en la gestión de infraestructuras hídricas inteligentes";
                
                comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos a implementar en el uso de tecnologías emergentes en los sistemas educativos para impulsar la construcción de ciudades inteligentes";
                comite2Topico1.style.display = "initial";
                break;
            case "CRC":
                comite2Topico0.innerHTML = "<strong>Topic:</strong> Strategies for preventing and responding to deprivation of liberty, torture and violation of sexual integrity against children";
                
                comite2Topico1.style.display = "none";
                break;
            case "OIT":
                comite2Topico0.innerHTML = "<strong>Tópico:</strong> Medidas para mitigar el desempleo y la falta de oportunidades laborales en la industria manufacturera como resultado de la alfabetización digital e implementación de la Inteligencia Artificial";
                
                comite2Topico1.style.display = "none";
                break;
            case "NOBEL":
                comite2Topico0.innerHTML = "<strong>Tópico:</strong> Elección del Premio Nobel de la Paz 2025";
                
                comite2Topico1.style.display = "none";
                break;
            case "CRM":
                comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Políticas para garantizar la justicia transicional como herramienta de reparación desde la perspectiva de género en las mujeres de América Latina y el Caribe";
                
                comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para combatir la demanda de contenido sexual en medios digitales con fines lucrativos en América Latina y el Caribe";
                comite2Topico1.style.display = "initial";
                break;
            case "UNFPA":
                comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para proteger la salud de las personas trabajadoras sexuales frente a las infecciones de transmisión sexual, superando la discriminación y los prejuicios sociales";
                
                comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Mecanismos para prevenir el embarazo adolescente a causa de la violencia cultural y desinformación en la salud sexual y reproductiva";
                comite2Topico1.style.display = "initial";
                break;
            case "OSGEY":
                comite2Topico0.innerHTML = "<strong>Topic A:</strong> Strategies to Protect Young People’s Wellbeing from Burnout Syndrome";
                
                comite2Topico1.innerHTML = "<strong>Topic B:</strong> Strategies to empower youth from vulnerable communities and prevent their engagement in crime";
                comite2Topico1.style.display = "initial";
                break;
            case "CIDH":
                comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Acciones para combatir abusos y negligencia a personas en tratamiento dentro de hospitales psiquiátricos para garantizar el cumplimiento de sus derechos humanos";
                
                comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Medidas para proteger a personas en situación de movilidad ante violaciones de derechos humanos en el Tapón de Darién";
                comite2Topico1.style.display = "initial";
                break;
            case "CIJ":
                comite2Topico0.innerHTML = "<strong>Caso:</strong> Sudáfrica contra Israel: justicia por el genocidio en el conflicto armado en la Franja de Gaza y Cisjordania";
                
                comite2Topico1.style.display = "none";
                break;
            case "COI":
                comite2Topico0.innerHTML = "<strong>Tópico A:</strong> Medidas para garantizar espacios seguros dentro de los Juegos Olímpicos para las personas atletas de la diversidad sexogenérica";
                
                comite2Topico1.innerHTML = "<strong>Tópico B:</strong> Políticas para reducir el impacto económico y ambiental de los Juegos Olímpicos en Los Ángeles 2028";
                comite2Topico1.style.display = "initial";
                break;                
        }
    }
    else {
        comite2Topicos.style.display = "none";
    }

    // Para CIJ, deshabilitar y esconder el tercer select
    if (this.value == "CIJ") {
        $("#select-comite-2-pais-2").prop("required", false);
        $("#select-comite-2-pais-2").selectpicker("hide");
        $("#label-comite-2-pais-2").hide();

    }
    else {
        $("#select-comite-2-pais-2").selectpicker("show");
        $("#select-comite-2-pais-2").prop("required", true);
        $("#label-comite-2-pais-2").show();
    }

    // Mostrar solo las opciones de delegación del comité seleccionado
    let thisValue = this.value;

    $("optgroup, option", "select.select-comite-2-pais").each(function() {
        if ($(this).attr("class") == thisValue) {
            hideOption(this, false);
            //this.hidden = false;
            //this.disabled = false;
        }
        else if (this.value || $(this).is("optgroup")) {
            hideOption(this, true);
            //this.hidden = true;
            //this.disabled = true;
        }
    });

    // Resetear la selección de delegación
    $("select.select-comite-2-pais option:eq(0)").prop("selected", true);

    // Refrescar los selects
    comiteSelects.selectpicker("refresh");
    $("select.select-comite-2-pais").selectpicker("refresh");
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
        if (select.options[select.selectedIndex].disabled) {
            select.selectedIndex = 0;
        }
    }
    
    select.dispatchEvent(new Event("change", { bubbles: true }));
}

// Refrescar los selects
$(registroSelects).selectpicker("refresh");

// Usar menú nativo en plataformas móviles
if (mobile) {
    $('.selectpicker').selectpicker("mobile");
}
