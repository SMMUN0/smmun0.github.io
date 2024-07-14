const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier-terser");
const { minify_sync } = require("terser");
const path = require("path");
const sizeOf = require("image-size");

module.exports = function (eleventyConfig) {
    // Copy files into the output directory
    eleventyConfig.addPassthroughCopy({"src/_passthrough": "/"});
    eleventyConfig.addPassthroughCopy({"src/_assets": "/assets"}, {filter: path => (path.indexOf('/partners') == -1)});

    // Ignore files corresponding to unpublished "alianzas"
    eleventyConfig.ignores.add("src/content/alianzas.njk");
    eleventyConfig.ignores.add("src/content/style/alianzas.css");

    // Move files in 'src/content' to root of site
    eleventyConfig.addFilter("dropContentFolder", function (path) {
        if (path.endsWith("/index")) {
            path = path.slice(0, -6);
        }

        const pathToDrop = "/content"
        if (path.indexOf(pathToDrop) !== 0) {
            return path;
        }

        return path.slice(pathToDrop.length);
    });

    // Change fileSlug value on index files
    eleventyConfig.addFilter("fixFileSlug", function(slug) {
        if (slug == "content") {
            return "index";
        }

        return slug;
    });

    // Process CSS files
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async function (input) {
            return async () => {
                return input;
            };
        },
    });

    // Process JS files
    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", {
        outputFileExtension: "js",
        compile: async function (input) {
            return async () => {
                return input;
            };
        },
    });

    // Minify output files
    eleventyConfig.addTransform("minify", function (content, outputPath) {
        const extname = path.extname(outputPath);
        switch (extname) {
            case ".html":
                return htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true
                });
            case ".css":
                return new CleanCSS({level: 2}).minify(content).styles;
            case ".js":
                return minify_sync(content).code;
            default:
                return content;
        }
    });

    // SMMUN editions shortcode for quienes-somos
    eleventyConfig.addShortcode("smmun_edition", function(year, edition, bgColor, text) {
        let color = "#fffdfd";
        if (year == 2016) {
            color = "#042654";
        }

        let img1 = `assets/img/ediciones/${year}/img1.webp`;
        let img2 = `assets/img/ediciones/${year}/img2.webp`;
        let img3 = `assets/img/ediciones/${year}/img3.webp`;

        let img1Dimensions = sizeOf(`src/_${img1}`);
        let img2Dimensions = sizeOf(`src/_${img2}`);
        let img3Dimensions = sizeOf(`src/_${img3}`);

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
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
