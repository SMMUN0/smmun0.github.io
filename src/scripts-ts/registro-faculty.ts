function createDelegacionHTML(i: number) {
    let delegacion =  document.createElement("div");
    delegacion.innerHTML = `<article class=titulo id="titulo-datos-${i}"><div class=oval><h2 id="titulo-datos-inner-${i}">Datos de la delegación #${i + 1}</h2></div></article><div class=mb-3 id="datos-personales-${i}"><label class=form-label for="nombre_${i}">Nombre completo <span style=color:red>*</span></label><div class="g-3 row"><div class=col><input autocomplete=off class=form-control maxlength=150 name="nombre_${i}"placeholder=Nombre(s) required><div class=invalid-feedback>Debes llenar este campo.</div></div><div class=col><input autocomplete=off class=form-control maxlength=150 name="apellido_${i}"placeholder=Apellidos required><div class=invalid-feedback>Debes llenar este campo.</div></div></div><div><label class=form-label for="edad_${i}">Edad <span style=color:red>*</span></label> <input autocomplete=off class="form-control input-edad"maxlength=2 name="edad_${i}"placeholder="11-26 años"required inputmode=numeric><div class=invalid-feedback>La edad no es válida.</div></div><div><label class=form-label for="celular_${i}">Número de celular <span style=color:red>*</span></label> <input autocomplete=off class="form-control input-celular"maxlength=30 name="celular_${i}"placeholder="999 123 4567"required type=tel><div class=invalid-feedback>Debes llenar este campo.</div></div><div><label class=form-label for="correo_${i}">Correo electrónico <span style=color:red>*</span></label> <input autocomplete=off class="form-control input-correo"maxlength=150 name="correo_${i}"placeholder=ejemplo@dominio.com required type=email><div class=invalid-feedback>El correo no es válido.</div></div><label class=form-label for="pais_${i}">País, estado y ciudad de residencia <span style=color:red>*</span></label><div class="g-3 row"><div class=col><select autocomplete=off class="selectpicker select-pais"data-width=100% name="pais_${i}"required><option value=""selected disabled>Selecciona una opción<option value=Afganistán>Afganistán<option value="Islas Åland">Islas Åland<option value=Albania>Albania<option value=Argelia>Argelia<option value="Samoa Americana">Samoa Americana<option value=Andorra>Andorra<option value=Angola>Angola<option value=Anguila>Anguila<option value=Antártida>Antártida<option value="Antigua y Barbuda">Antigua y Barbuda<option value=Argentina>Argentina<option value=Armenia>Armenia<option value=Aruba>Aruba<option value=Australia>Australia<option value=Austria>Austria<option value=Azerbaiyán>Azerbaiyán<option value=Bahamas>Bahamas<option value=Bahréin>Bahréin<option value=Bangladesh>Bangladesh<option value=Barbados>Barbados<option value=Bielorrusia>Bielorrusia<option value=Bélgica>Bélgica<option value=Belice>Belice<option value=Benín>Benín<option value=Bermudas>Bermudas<option value=Bután>Bután<option value=Bolivia>Bolivia<option value="Bosnia y Hercegovina">Bosnia y Hercegovina<option value=Botsuana>Botsuana<option value="Isla Bouvet">Isla Bouvet<option value=Brasil>Brasil<option value="Islas Vírgenes Británicas">Islas Vírgenes Británicas<option value="Brunei Darussalam">Brunei Darussalam<option value=Bulgaria>Bulgaria<option value="Burkina Faso">Burkina Faso<option value=Burundi>Burundi<option value=Camboya>Camboya<option value=Camerún>Camerún<option value=Yukón>Yukón<option value="Cabo Verde">Cabo Verde<option value="Caribe Países Bajos">Caribe Países Bajos<option value="Islas Caimán">Islas Caimán<option value="República Centroafricana">República Centroafricana<option value=Chad>Chad<option value="Archipiélago de Chagos">Archipiélago de Chagos<option value=Chile>Chile<option value=Zhejiang>Zhejiang<option value="Isla de Navidad">Isla de Navidad<option value="Islas Cocos (Keeling)">Islas Cocos (Keeling)<option value=Colombia>Colombia<option value=Comoras>Comoras<option value="Islas Cook">Islas Cook<option value="Costa Rica">Costa Rica<option value="Costa de Marfil">Costa de Marfil<option value=Croacia>Croacia<option value=Curaçao>Curaçao<option value=Chipre>Chipre<option value=Chequia>Chequia<option value="República Democrática del Congo">República Democrática del Congo<option value=Dinamarca>Dinamarca<option value=Yibuti>Yibuti<option value=Dominica>Dominica<option value="República Dominicana">República Dominicana<option value=Ecuador>Ecuador<option value=Egipto>Egipto<option value="El Salvador">El Salvador<option value="Guinea Ecuatorial">Guinea Ecuatorial<option value=Eritrea>Eritrea<option value=Estonia>Estonia<option value=Eswatini>Eswatini<option value=Etiopía>Etiopía<option value="Islas Malvinas">Islas Malvinas<option value=Fiyi>Fiyi<option value=Finlandia>Finlandia<option value=Francia>Francia<option value="Guayana Francesa">Guayana Francesa<option value="Polinesia Francesa">Polinesia Francesa<option value="Territorios Australes Franceses">Territorios Australes Franceses<option value=Gabón>Gabón<option value=Gambia>Gambia<option value=Georgia>Georgia<option value=Alemania>Alemania<option value=Ghana>Ghana<option value=Gibraltar>Gibraltar<option value=Grecia>Grecia<option value=Groenlandia>Groenlandia<option value=Granada>Granada<option value=Guadalupe>Guadalupe<option value=Guam>Guam<option value=Guatemala>Guatemala<option value=Guernesey>Guernesey<option value=Guinea>Guinea<option value=Guinea-Bissau>Guinea-Bissau<option value=Guyana>Guyana<option value=Haití>Haití<option value="Islas Heard y Mc Donald">Islas Heard y Mc Donald<option value=Honduras>Honduras<option value="Hong Kong">Hong Kong<option value=Hungría>Hungría<option value=Islandia>Islandia<option value=India>India<option value=Indonesia>Indonesia<option value=Iraq>Iraq<option value=Irlanda>Irlanda<option value="Isla de Man">Isla de Man<option value=Israel>Israel<option value=Italia>Italia<option value=Jamaica>Jamaica<option value=Okinawa>Okinawa<option value=Jersey>Jersey<option value=Jordania>Jordania<option value=Kazajstán>Kazajstán<option value=Kenia>Kenia<option value=Kiribati>Kiribati<option value=Kosovo>Kosovo<option value=Kuwait>Kuwait<option value=Kirguistán>Kirguistán<option value=Laos>Laos<option value=Letonia>Letonia<option value=Líbano>Líbano<option value=Lesotho>Lesotho<option value=Liberia>Liberia<option value=Libia>Libia<option value=Liechtenstein>Liechtenstein<option value=Lituania>Lituania<option value=Luxemburgo>Luxemburgo<option value=Macao>Macao<option value=Madagascar>Madagascar<option value=Malaui>Malaui<option value=Malasia>Malasia<option value=Maldivas>Maldivas<option value=Malí>Malí<option value=Malta>Malta<option value="Islas Marshall">Islas Marshall<option value=Martinica>Martinica<option value=Mauritania>Mauritania<option value=Mauricio>Mauricio<option value=Mayotte>Mayotte<option value=México selected>México<option value=Micronesia>Micronesia<option value=Moldavia>Moldavia<option value=Mónaco>Mónaco<option value=Mongolia>Mongolia<option value=Montenegro>Montenegro<option value=Montserrat>Montserrat<option value=Marruecos>Marruecos<option value=Mozambique>Mozambique<option value=Myanmar>Myanmar<option value=Namibia>Namibia<option value=Nauru>Nauru<option value=Nepal>Nepal<option value="Países Bajos">Países Bajos<option value="Nueva Caledonia">Nueva Caledonia<option value="Nueva Caledonia">Nueva Caledonia<option value=Nicaragua>Nicaragua<option value=Níger>Níger<option value=Nigeria>Nigeria<option value=Niue>Niue<option value="Islas Marianas del Norte">Islas Marianas del Norte<option value="Macedonia del Norte">Macedonia del Norte<option value=Noruega>Noruega<option value=Omán>Omán<option value=Pakistán>Pakistán<option value=Palau>Palau<option value=Palestina>Palestina<option value=Panamá>Panamá<option value="Papúa Nueva Guinea">Papúa Nueva Guinea<option value=Paraguay>Paraguay<option value=Perú>Perú<option value=Filipinas>Filipinas<option value=Pitcairn>Pitcairn<option value=Polonia>Polonia<option value=Portugal>Portugal<option value="Puerto Rico">Puerto Rico<option value=Qatar>Qatar<option value="República del Congo">República del Congo<option value=Reunión>Reunión<option value=Rumanía>Rumanía<option value=Rusia>Rusia<option value=Ruanda>Ruanda<option value="San Bartolomé">San Bartolomé<option value="Santa Helena">Santa Helena<option value="San Cristóbal y Nieves">San Cristóbal y Nieves<option value="Santa Lucía">Santa Lucía<option value="San Martín">San Martín<option value="San Vicente y las Granadinas">San Vicente y las Granadinas<option value=Samoa>Samoa<option value="San Marino">San Marino<option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe<option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe<option value=Senegal>Senegal<option value=Serbia>Serbia<option value=Seychelles>Seychelles<option value="Sierra Leona">Sierra Leona<option value=Singapur>Singapur<option value="San Martín">San Martín<option value=Eslovaquia>Eslovaquia<option value=Eslovenia>Eslovenia<option value="Islas Salomón">Islas Salomón<option value=Somalia>Somalia<option value=Suráfrica>Suráfrica<option value="Sudán del Sur">Sudán del Sur<option value="Sudán del Sur">Sudán del Sur<option value=España>España<option value="Sri Lanka">Sri Lanka<option value="San Pedro y Miquelón">San Pedro y Miquelón<option value=Sudán>Sudán<option value=Surinam>Surinam<option value="Svalbard y Jan Mayen">Svalbard y Jan Mayen<option value=Suecia>Suecia<option value=Suiza>Suiza<option value=Taiwán>Taiwán<option value=Tayikistán>Tayikistán<option value=Tanzania>Tanzania<option value=Tailandia>Tailandia<option value="Timor Oriental">Timor Oriental<option value=Togo>Togo<option value=Tokelau>Tokelau<option value=Tonga>Tonga<option value="Trinidad y Tobago">Trinidad y Tobago<option value=Túnez>Túnez<option value=Türkiye/Europa>Türkiye/Europa<option value=Turkmenistán>Turkmenistán<option value="Islas Turcas y Caicos">Islas Turcas y Caicos<option value=Tuvalu>Tuvalu<option value=Uganda>Uganda<option value=Ucrania>Ucrania<option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos<option value=Uganda>Uganda<option value=Wyoming>Wyoming<option value=Uruguay>Uruguay<option value=Uzbekistán>Uzbekistán<option value=Vanuatu>Vanuatu<option value=Vaticano>Vaticano<option value=Venezuela>Venezuela<option value=Vietnam>Vietnam<option value="Islas Vírgenes (EE.UU.)">Islas Vírgenes (EE.UU.)<option value="Islas Wallis y Futuna">Islas Wallis y Futuna<option value="Sáhara Occidental">Sáhara Occidental<option value=Yemen>Yemen<option value=Zambia>Zambia<option value=Zimbabue>Zimbabue</select><div class=invalid-feedback>Debes seleccionar una opción.</div></div><div class=col><input autocomplete=off class=form-control maxlength=150 name="ciudad_estado_${i}"placeholder="Ciudad y estado"required><div class=invalid-feedback>Debes llenar este campo.</div></div></div><div><label class=form-label for="escolaridad_${i}">Escolaridad <span style=color:red>*</span></label> <select autocomplete=off class=selectpicker data-width=86vw name="escolaridad_${i}"required id="select-escolaridad-${i}"><option value=""selected disabled>Selecciona una opción<option value=Secundaria>Secundaria<option value=Preparatoria>Preparatoria<option value=Universidad>Universidad<option value=Egresado>Egresado</select><div class=invalid-feedback>Debes seleccionar una opción.</div></div><div><label class=form-label for="escuela_${i}">Nombre completo de su escuela de procedencia (en caso de ser egresado, de donde se graduó) <span style=color:red>*</span></label> <input autocomplete=off class=form-control maxlength=150 name="escuela_${i}"placeholder="Ejemplo: Facultad de Derecho UADY"required><div class=invalid-feedback>Debes llenar este campo.</div></div></div>`;
    return delegacion;
}

{
// Validación de número de delegaciones
let bloqueDelegaciones = document.getElementById("bloque-delegaciones")!;
let costoInscripcion = document.getElementById("costo-inscripcion")!;
(document.getElementById("input-numero-delegaciones") as HTMLInputElement).addEventListener("input", function() {
    this.value = this.value.replace(/[^\d]/gi, "");

    if (this.value.length != 0) {
        try {
            let num = parseInt(this.value);
            if (num >= 4) {
                this.setCustomValidity("");
                this.classList.remove("is-invalid");
            }
            else {
                throw new Error("");
            }

            // Actualizar costo total
            costoInscripcion.innerHTML = `$${(250 * num).toLocaleString()} MXN ($250 MXN por ${num} personas)`;

            // Añadir o remover número de bloques de datos
            let delegacionesEnDom = bloqueDelegaciones.children.length;

            if (delegacionesEnDom > num) {
                for (let i = delegacionesEnDom - 1; i >= num; i--) {
                    bloqueDelegaciones.removeChild(bloqueDelegaciones.children[i]);
                }
            }
            else if (delegacionesEnDom < num) {
                let documentFragment = document.createDocumentFragment();

                for (let i = delegacionesEnDom; i < num; i++) {
                    let delegacion = createDelegacionHTML(i);

                    // Añadir manejo de cookies
                    let delegacionInputs = delegacion.getElementsByTagName("input");
                    let delegacionSelects = delegacion.getElementsByTagName("select");
                    guardarCookiesInputs(delegacionInputs);
                    guardarCookiesSelects(delegacionSelects);
                    reestablecerCookiesInputs(delegacionInputs);
                    reestablecerCookiesSelects(delegacionSelects);

                    documentFragment.appendChild(delegacion);
                }

                bloqueDelegaciones.appendChild(documentFragment);
                $(bloqueDelegaciones).find("select").selectpicker("refresh");
            }
        }
        catch(e) {
            console.log(e);
            this.setCustomValidity("Número de delegaciones inválido.");
            this.classList.add("is-invalid");
        }
    }
});

// Validación de edad
let edadInputs = document.getElementsByClassName("input-edad") as HTMLCollectionOf<HTMLInputElement>;
for (let i = 0; i < edadInputs.length; i++) {
    edadInputs.item(i)!.addEventListener("input", function() {
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
let correoInputs = document.getElementsByClassName("input-correo") as HTMLCollectionOf<HTMLInputElement>;
for (let i = 0; i < correoInputs.length; i++) {
    correoInputs.item(i)!.addEventListener("input", function() {
        if (!this.checkValidity()) {
            this.classList.add("is-invalid");
        }
        else {
            this.classList.remove("is-invalid");
        }
    });
}

// Validación de celular
let celInputs = document.getElementsByClassName("input-celular") as HTMLCollectionOf<HTMLInputElement>;
for (let i = 0; i < celInputs.length; i++) {
    celInputs.item(i)!.addEventListener("input", function() {
        this.value = this.value.replace(/[^\d\(\)\s\+\-]/gi, "");
    });
}

// Manejar cambios de país de residencia
let imgPago = document.getElementById("img-pago") as HTMLImageElement;
(document.getElementById("pais-faculty") as HTMLSelectElement).addEventListener("change", function() {
    // Cambiar cuenta de pago
    if (this.value == "México") {
        imgPago.src = "/assets/img/images/mercadopago.webp";
        imgPago.alt = "Datos bancarios. CLABE: 6460 1020 6386 6808 42; Banco: STP";
    }
    else {
        imgPago.src = "/assets/img/images/bbva.webp";
        imgPago.alt = "Datos bancarios. Tarjeta: 4152 3139 9013 9227; Banco: BBVA";
    }
});

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
