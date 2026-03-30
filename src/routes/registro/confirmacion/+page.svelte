<script lang="ts">
    import { onMount } from "svelte";
    const IDEMPOTENCY_TAB_NAME_PREFIX = "smmun-registro-tab:";

    function getStorageKeyFromForm(form: string | null) {
        if (form === "delegaciones") {
            return "registro-delegaciones-idempotency-key";
        }

        if (form === "faculty") {
            return "registro-faculty-idempotency-key";
        }

        return null;
    }

    function getTabScopedStorageKey(storageKey: string) {
        if (!window.name || !window.name.startsWith(IDEMPOTENCY_TAB_NAME_PREFIX)) {
            return null;
        }

        return `${storageKey}:${window.name.slice(IDEMPOTENCY_TAB_NAME_PREFIX.length)}`;
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);

        // Eliminar cookies
        document.cookie.split(";").forEach(cookie_untrimmed => {
            let cookie = cookie_untrimmed.trim();
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        });

        const storageKey = getStorageKeyFromForm(params.get("form"));
        if (storageKey) {
            const tabScopedStorageKey = getTabScopedStorageKey(storageKey);
            sessionStorage.removeItem(storageKey);

            if (tabScopedStorageKey) {
                sessionStorage.removeItem(tabScopedStorageKey);
            }
        }
    })
</script>

<style>
    #section-muchas-gracias {
        height: calc(100vh - 8vh - 2rem);
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #muchas-gracias {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 4vw;
    }

    #checkmark {
        margin-bottom: 5vh;
        font-size: 9rem;
        border-radius: 50%;
    }

    #muchas-gracias h1 {
        font-family: "Catchy Mager";
        font-weight: bold;
        font-size: 2.5rem;
        color: #ea6880;
        margin: 0;
    }

    #muchas-gracias p {
        font-family: "Catchy Mager";
        font-size: 1rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        color: #44372b;
    }

    #muchas-gracias span {
        margin: 1vh 0;
    }

    #muchas-gracias a {
        color: #44372b;
    }

    #contacto {
        color: #44372b;
    }
</style>

<section id="section-muchas-gracias">
    <article id="muchas-gracias">
        <span id="checkmark" class="fa-stack fa-2x">
            <i class="fa-solid fa-circle fa-stack-2x" style="color: #ea6880;"></i>
            <i class="fa-solid fa-check fa-stack-1x" style="color: #ffffff;"></i>
        </span>

        <h1>¡Muchas gracias!</h1>

        <p>
            <span>Te invitamos a estar pendiente de tu correo, en máximo una semana recibirás tu confirmación.</span>
            <span>En caso de tener alguna duda, puedes contactarnos a través de:</span>
            <span id="contacto">
                <i class="fa-brands fa-whatsapp"></i>&ensp;<strong>Correo:</strong> <a href="mailto:secretariadefinanzas@smmun.com">secretariadefinanzas@smmun.com</a>
                <br>
                <i class="fa-regular fa-envelope"></i>&ensp;<strong>WhatsApp:</strong> <a target="_blank" rel="noopener noreferrer" href="https://wa.me/529999033025?text=Hola,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20Datos%20personales%0A%5B%5D%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20Proceso%20de%20pago%0A">+52 999 903 3025</a>
            </span>
        </p>
    </article>
</section>
