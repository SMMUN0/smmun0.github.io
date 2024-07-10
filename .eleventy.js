const sizeOf = require("image-size");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./CNAME");
    eleventyConfig.addPassthroughCopy("./robots.txt");
    eleventyConfig.addPassthroughCopy({ favicon: "/" });

    eleventyConfig.addPassthroughCopy("./style/", {filter: path => (path.endsWith('alianzas.css') == false)});
    eleventyConfig.addWatchTarget("./style/");

    eleventyConfig.addPassthroughCopy("./assets/", {filter: path => (path.indexOf('/partners') == -1)});

    eleventyConfig.addPassthroughCopy("./scripts/");
    eleventyConfig.addWatchTarget("./scripts/");

    eleventyConfig.ignores.add("./content/alianzas.njk");

    eleventyConfig.addShortcode("smmun_edition", function(year, edition, bgColor, text) {
        let color = "#fffdfd";
        if (year == 2016) {
            color = "#042654";
        }

        let img1 = `assets/img/ediciones/${year}/img1.webp`;
        let img2 = `assets/img/ediciones/${year}/img2.webp`;
        let img3 = `assets/img/ediciones/${year}/img3.webp`;

        let img1Dimensions = sizeOf(img1);
        let img2Dimensions = sizeOf(img2);
        let img3Dimensions = sizeOf(img3);

        return `<article class="info-div" style="background-color: ${bgColor}; background-image: url('/assets/img/ediciones/${year}/bg.webp'); color:${color};">
            <h3 class="info-title">
                SMMUN ${year}; ${edition}
            </h3>
            <p class="info-text">
                ${text}
            </p>
            <div class="info-images">
                <figure>
                    <img src="/${img1}" width="${img1Dimensions.width}" height="${img1Dimensions.height}" alt="Foto  de la edición ${year} del SMMUN.">
                </figure>
                <figure>
                    <img src="/${img2}" width="${img2Dimensions.width}" height="${img2Dimensions.height}" alt="Foto  de la edición ${year} del SMMUN.">
                </figure>
                <figure>
                    <img src="/${img3}" width="${img3Dimensions.width}" height="${img3Dimensions.height}" alt="Foto  de la edición ${year} del SMMUN.">
                </figure>
            </div>
        </article>`;
    });

    return {
        dir: {
            input: "content",
            includes: "../_includes",
            data: "../_data",
            output: "_site"
        }
    };
};
