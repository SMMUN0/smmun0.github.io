const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier-terser");
const { minify_sync } = require("terser");
const path = require("path");
const sizeOf = require("image-size");
const fs = require("fs")

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

    // Committee carousel shortcode
    eleventyConfig.addShortcode("comite_carousel", function(name, index) {
        const length = fs.readdirSync(`src/_assets/img/comites/${name.toLowerCase()}`).length;
        let carouselInner = "";

        for (let i = 1; i <= length; i++) {
            let imgPath = `assets/img/comites/${name.toLowerCase()}/${i}.webp`;
            let imgDimensions = sizeOf(`src/_${imgPath}`);
            let active = "";

            if (i == 1) {
                active = " active"
            }

            carouselInner += `<div class="carousel-item${active}" data-bs-interval="8000">
                <div class="d-flex justify-content-center">
                    <img src="/${imgPath}" class="d-block" width="${imgDimensions.width}" height="${imgDimensions.height}" alt="Foto del comité ${name} del SMMUN.">
                </div>
            </div>`;
        }

        return `<div id="carousel-comite-${index}-${name}" class="carousel slide" data-bs-ride="carousel" data-bs-pause="false" data-bs-touch="true">
            <div class="carousel-inner">
                ${carouselInner}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-comite-${index}-${name}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-comite-${index}-${name}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>`;
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
