<script lang="ts">
    let { year, edition, color, bgColor, imageDimensions, text }: { year: number, edition: string, color: string, bgColor: string, imageDimensions: number[][], text: string } = $props();
</script>

<style>
    article {
        margin: 2vh 0 0 0;
        padding: 3.5vh 0 2.5vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    h3 {
        font-family: "Glacial Indifference Bold";
        font-size: 1.5rem;
        margin-bottom: 2vh;
        margin-top: 0;
        font-weight: normal;
    }

    p {
        font-family: "Glacial Indifference Regular";
        font-size: 1rem;
        padding: 0 5vw;
        margin: 0;
    }

    div {
        margin: 2.5vh 10vw 0 10vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    figure {
        width: 100%;
        margin: 0;
    }

    img {
        width: 90%;
        height: auto;
    }
</style>

<article style="background-color: {bgColor}; background-image: url('/assets/img/ediciones/{year}/bg.webp'); color: {color};">
    <h3>
        SMMUN {year}; {edition}
    </h3>
    <p>
        {text}
    </p>
    <div>
        {#each { length: 3 }, i}
            <figure>
                <img src="/assets/img/ediciones/{year}/img{i + 1}.webp" width={imageDimensions[i][0]} height={imageDimensions[i][1]} alt="Foto  de la edición {year} del SMMUN.">
            </figure>
        {/each}
    </div>
</article>
