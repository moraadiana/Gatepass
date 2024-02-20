import { Layout } from "antd";

export default function Guest({ children }) {
    return (
        <Layout
            style={{
                backgroundImage:
                    "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
                backgroundSize: "100% 100%",
                margin: 0,
                minHeight: "100vh",
                display: "grid",
                placeContent: "center",
            }}
        >
            <Layout.Content>
                <div style={{ width: "500px" }}>{children}</div>
            </Layout.Content>
        </Layout>
    );
}
