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
import logo from 'C:/laragon/www/gatepass/logo/bulkstream-logo-small.png';
export default function Authenticated({
    user,
    header,
    children,
    gatepass,
    roles,
}) {
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
            title=" Gatepass Portal"
            //add logo here and  resize it
            logo={
                <img
                    src={logo}
                    alt="logo"

                />}
           
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
                            name: "My Gatepasses",
                        },
                        {
                            path: route("gatepass.create"),
                            name: "Create Gatepass",
                        },
                        {
                            path: route("gatepass.myApprovalHistory"),
                            name: "My Approval History",
                        }
                    
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
                        // {
                        //     path: route("gatepass.myApprovalHistory"),
                        //     name: "My Approval History",
                        // }
                    ],
                    hideInMenu: user.roles.some(
                        (role) => role.mgr_gtproles_id == 3
                    ),
                },
                {
                    path: "/companies",
                    name: "Companies",
                    children: [
                        {
                            path: route("company.index"),
                            name: "All Companies",
                        },
                        // {
                        //     path: route("company.create"),
                        //     name: "Create Company",
                        // }
                    ],
                    hideInMenu: !user.roles.some(
                        (role) => role.mgr_gtproles_id == 4
                    ),
                },
                {
                    path: "/departments",
                    name: "Departments",
                    children: [
                        {
                            path: route("department.index"),
                            name: "All Departments",
                        },
                    ],
                    hideInMenu: !user.roles.some(
                        (role) => role.mgr_gtproles_id == 4
                    ),
                },
                {
                    path: "/users",
                    name: "Users",
                    children: [
                        {
                            path: route("user.index"),
                            name: "All Users",
                        },
                        {
                            path: route("user.create"),
                            name: "Create User",
                        },
                    ],
                    hideInMenu: !user.roles.some(
                        (role) => role.mgr_gtproles_id == 4
                    ),
                },
                {
                    path: "/roles",
                    name: "Roles",
                    children: [
                        {
                            path: route("role.index"),
                            name: "All Roles",
                        },

                        {
                            path: route("role.create"),
                            name: "Create Role",
                        },
                    ],
                    //show only for users with role id 4
                    hideInMenu: !user.roles.some(
                        (role) => role.mgr_gtproles_id == 4
                    ),
                },
            ]}
            menuItemRender={(item, dom) => <Link href={item.path}>{dom}</Link>}
        >
            {children}
        </ProLayout>
    );
}
