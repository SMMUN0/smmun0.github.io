import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        enhancedImages(),
        sveltekit()
    ],
    server: {
        allowedHosts: [
            "abcf50ea61cb.ngrok-free.app"
        ]
    }
});
