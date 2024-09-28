import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import Spinner from "@/Components/Shared/Spinner";
import { Suspense } from "react";

const pages = import.meta.glob("./Pages/**/*.jsx");

createInertiaApp({
    resolve: (name) => {
        const page = pages[`./Pages/${name}.jsx`];
        if (page) {
            return page();
        }
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Suspense fallback={<Spinner />}>
                <App {...props} />
            </Suspense>
        );
    },
});

