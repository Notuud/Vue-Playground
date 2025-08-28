import { fileURLToPath, URL } from 'node:url'
import { defineConfig, PluginOption, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    // Production flag used to toggle dev-only plugins and build options.
    const isProd = mode === "production";

    // Plugins that should only run in development (e.g. devtools).
    const devOnlyPlugins: Array<PluginOption> = []
    if (!isProd) {
        devOnlyPlugins.push(vueDevTools())
    }

    return {
        plugins: [
            vue(),
            tailwindcss(),
            ...devOnlyPlugins
        ],
        resolve: {
            // Alias '@' to the src directory for convenient imports.
            alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
        },
        server: {
            port: 5173,
            open: true,
            // https: false, // set to true if you want to test with https
            // cors: true, // enable CORS for API requests during development
            // hmr: { host: 'localhost' } // enable if needed for remote/WSL
        },
        // optimizeDeps: {
        //     // only add includes here if you hit HMR/pre-bundle issues
        //     // include: ["primevue", "@fortawesome/vue-fontawesome"],
        // },
        build: {
            // Target modern browsers. Use 'es2019' for wider compatibility.
            target: "es2019",
            // Emit sourcemaps in non-production for easier debugging.
            sourcemap: !isProd,
            // Use esbuild for fast minification. Switch to 'terser' if you need
            // fine-grained control (like dropping console.* in production).
            minify: "esbuild",
            // Inline assets smaller than this threshold (in bytes).
            assetsInlineLimit: 4096,
            rollupOptions: {
                output: {
                    // Manual chunking improves long-term caching by creating
                    // separate bundles for large vendor libraries.
                    manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("vue")) return "vue";
                        if (id.includes("primevue")) return "primevue";
                        if (id.includes("@fortawesome")) return "vendor";
                        return "vendor";
                    }
                    },
                },
            },
        },
    };
});