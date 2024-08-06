import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],

    build: {
        rollupOptions: {
            /* input: {
                admin: "resources/js/Admin/admin.jsx",
            }, */
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString();
                    }
                },
                /* format: "es",
                strict: true,
                entryFileNames: "admin.jsx",
                dir: "public/js/admin", */
            },
        },
    },

    resolve: {
        alias: {
            $: "jQuery",
        },
    },
    define: {
        global: "globalThis",
    },
});
