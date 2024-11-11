// Funciones para manejar cookies
let today = new Date();
let expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000);

function setCookie(name: string, value: string) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; SameSite=Strict; path=/; expires=" + expiry.toUTCString();
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()!.split(';').shift()!);
    }
}

// Guardar los valores de los inputs en las cookies
function guardarCookiesInputs(inputs: HTMLCollectionOf<HTMLInputElement>) {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs.item(i)!;
        if (input.type == "file" || input.type == "submit") {
            continue;
        }

        input.addEventListener("input", function() {
            if (this.name) {
                setCookie(this.name, this.value);
            }
            else if (this.dataset.name) {
                setCookie(this.dataset.name, this.value);
            }
        });
    }
}

// Guardar los valores de los selects en las cookies
function guardarCookiesSelects(selects: HTMLCollectionOf<HTMLSelectElement>) {
    for (let i = 0; i < selects.length; i++) {
        let select = selects.item(i)!;
        select.addEventListener("change", function() {
            setCookie(this.name, this.value);
        });
    }
}

// Reestablecer los valores de los inputs desde las cookies
function reestablecerCookiesInputs(inputs: HTMLCollectionOf<HTMLInputElement>) {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs.item(i)!;
        if (input.type == "file" || input.type == "submit") {
            continue;
        }

        let cookieValue = null;

        if (input.name) {
            cookieValue = getCookie(input.name);
        }
        else if (input.dataset.name) {
            cookieValue = getCookie(input.dataset.name);
        }

        if (cookieValue) {
            input.value = cookieValue;
            input.dispatchEvent(new Event("input", { bubbles: true }));
        }
    }
}

// Reestablecer los valores de los selects desde las cookies
function reestablecerCookiesSelects(selects: HTMLCollectionOf<HTMLSelectElement>) {
    for (let i = 0; i < selects.length; i++) {
        let select = selects.item(i)!;
        let cookieValue = getCookie(select.name);
        if (cookieValue) {
            select.value = cookieValue;
            if (select.selectedIndex == -1 || select.options[select.selectedIndex].disabled) {
                select.selectedIndex = 0;
            }
        }

        select.dispatchEvent(new Event("change", { bubbles: true }));
    }
}

// Validación de correo
function validarCorreos(correoInputs: HTMLCollectionOf<HTMLInputElement>) {
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
}

// Validación de celular
function validarCelulares(celInputs: HTMLCollectionOf<HTMLInputElement>) {
    for (let i = 0; i < celInputs.length; i++) {
        celInputs.item(i)!.addEventListener("input", function() {
            this.value = this.value.replace(/[^\d\(\)\s\+\-]/gi, "");
        });
    }
}

// Validación de edad
function validarEdades(edadInputs: HTMLCollectionOf<HTMLInputElement>) {
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
}
