import "./bootstrap";
import "../css/app.css";
import "../sass/app.scss";
import "./custom";
//import "./Admin/admin";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { StrictMode } from "react";

import "laravel-vapor";
import _ from "lodash";
window._ = _;
import Vapor from "laravel-vapor";
Vapor.withBaseAssetUrl(import.meta.env.VITE_VAPOR_ASSET_URL);
window.Vapor = Vapor;

const appName = import.meta.env.VITE_APP_NAME || "LinkPro";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});
