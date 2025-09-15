import adapter from "@sveltejs/adapter-static";
import htmlMinifierAdaptor from "sveltekit-html-minifier";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: htmlMinifierAdaptor(
			adapter({
				pages: "build",
				assets: "build",
				fallback: undefined,
				precompress: false,
				strict: true
			}),
			{
				pages: "build",
				minifierOptions: {
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
					useShortDocType: true,
					removeComments: true,
					minifyCSS: true,
					minifyJS: true
				}
			}
		)
	}
};

export default config;
