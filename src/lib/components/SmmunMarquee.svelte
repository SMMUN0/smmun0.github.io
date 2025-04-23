<style>
    article {
        flex-grow: 1;
        display: flex;
        align-items: center;
        overflow-x: hidden;
    }

    .sm-marquee-wrapper {
        display: flex;
        align-items: center;
        animation: scroll 30s linear infinite;
        white-space: nowrap;
        font-family: "The Seasons Bold";
        font-size: 1rem;
        color: #8d7abb;
    }

    @media (prefers-reduced-motion) {
        .sm-marquee-wrapper {
            animation: none;
        }
    }

    .sm-marquee-wrapper p {
        white-space: nowrap;
        margin-top: 1rem;
    }

    .sm-marquee-wrapper img {
        width: auto;
        height: 1.5rem;
        padding: 0 1rem;
        vertical-align: middle;
        display: inline-block;
    }

    @keyframes scroll {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }
</style>

<!-- Marquee con nombre y logo -->
<article aria-hidden="true">
    {#each { length: 5 }}
        <div class="sm-marquee-wrapper">
            <p>SMMUN 2025; De soñadores en acción, para líderes con pasión</p>
            <enhanced:img src="/static/assets/img/logos/smmun_morado.webp" alt="Logo del SMMUN." />
        </div>
    {/each}
</article>
