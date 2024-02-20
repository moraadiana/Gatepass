import "./bootstrap";
import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";

const appName = import.meta.env.VITE_APP_NAME || "GBHL Gatepass Portal";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            page.default.layout ||
            ((page) => <AuthenticatedLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
                locale={enUS}
                theme={{
                    token: {
                        fontFamily: "Lato, sans-serif",
                        colorPrimary: "#153037",
                    },
                }}
            >
                <App {...props} />
            </ConfigProvider>
        );
    },
    progress: {
        color: "#153037",
    },
});
