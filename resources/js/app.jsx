import "./bootstrap";
//  import '../css/app.css';

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";

const appName = import.meta.env.VITE_APP_NAME || "GBHL Gatepass Portal";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
                locale={enUS}
                theme={{
                    token: {
                        fontFamily: "Inter, sans-serif",
                    },
                }}
            >
                <App {...props} />
            </ConfigProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
