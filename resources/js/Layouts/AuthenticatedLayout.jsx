import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import {
    LogoutOutlined,
    DashboardFilled,
    FileDoneOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
export default function Authenticated({ user, header, children }) {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            notification.success({
                message: "Success",
                description: flash.success,
                duration: 5,
                placement: "top",
            });
        }
        if (flash.error) {
            notification.error({
                message: "Error",
                description: flash.error,
                duration: 5,
            });
        }
    }, [flash]);
    return (
        <ProLayout
            layout="mix"
            title="GBHL Gatepass Portal"
            avatarProps={{
                src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
                size: "small",
                title: user?.mgr_gtpusers_fname,
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
                    path: "/approvals",
                    name: "Approval",
                    children: [
                        {
                            path: route("approval.index"),
                            name: "Gatepass Approval",
                        },
                        
                    ],
                },
            ]}
            menuItemRender={(item, dom) => <Link href={item.path}>{dom}</Link>}
        >
            {children}
        </ProLayout>
    );
}
