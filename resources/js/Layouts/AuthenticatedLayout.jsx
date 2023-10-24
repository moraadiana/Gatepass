import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import {
    LogoutOutlined,
    DashboardFilled,
    FileDoneOutlined,
} from "@ant-design/icons";

export default function Authenticated({ user, header, children }) {
    return (
        <ProLayout
            layout="mix"
            title="GBHL Gatepass Portal"
            avatarProps={{
                src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
                size: "small",
                title: user.mgr_gtpusers_fname,
                render: (props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        icon: <LogoutOutlined />,
                                        label: (
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                            >
                                                Logout
                                            </Link>
                                        ),
                                    },
                                ],
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}
            menuDataRender={() => [
                {
                    path: route("dashboard"),
                    name: "Dashboard",
                    icon: <DashboardFilled />,
                },
                {
                    path: "/gatepasses",
                    name: "Gatepass",
                    icon: <FileDoneOutlined />,
                    children: [
                        {
                            path: route("gatepass.index"),
                            name: "All Gatepass",
                        },
                        {
                            path: route("gatepass.create"),
                            name: "Create Gatepass",
                        },
                    ],
                },
                {
                    path:"/approvals",
                    name: "Approval",
                    children:[
                        {
                            path: route("approval.index"),
                            name: "Approvals"
                        }
                    ]
                },
            ]}
            menuItemRender={(item, dom) => <Link href={item.path}>{dom}</Link>}
        >
            {children}
        </ProLayout>
    );
}
