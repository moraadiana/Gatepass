import { Link, usePage } from "@inertiajs/react";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown } from "antd";
import {
    LogoutOutlined,
    DashboardFilled,
    FileDoneOutlined,
    CheckSquareOutlined,
    DatabaseOutlined,
} from "@ant-design/icons";
import { message } from "antd";

import bulkstreamlogo from "../assets/bulkstream-logo-small.png";
export default function Authenticated({ children }) {
    const { flash, auth } = usePage().props;
    {
        flash.success
            ? message.success(flash.success)
            : flash.error
            ? message.error(flash.error)
            : null;
    }
    const user = auth.user;
    return (
        <ProLayout
            layout="mix"
            title=" Gatepass Portal"
            logo={bulkstreamlogo}
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
                            path: route("gatepass.create"),
                            name: "Create Gatepass",
                        },
                        {
                            path: route("gatepass.index"),
                            name: "My Gatepasses",
                        },
                        {
                            path: route("gatepass.departmentGatepass"),
                            name: "Departmental Gatepass",
                        },
                    ],
                },

                {
                    path: "/approvals",
                    name: " My Approvals",
                    icon: <CheckSquareOutlined />,
                    children: [
                        {
                            path: route("approval.index"),
                            name: "Pending ",
                        },
                        {
                            path: route("gatepass.myApprovalHistory"),
                            name: "Approval History",
                        },
                    ],
                    hideInMenu: user.roles.some(
                        (role) => role.mgr_gtproles_id == 3
                    ),
                },
                {
                    path: "/admin",
                    name: "Administration",
                    icon: <DatabaseOutlined />,
                    hideInMenu: !user.roles.some(
                        (role) => role.mgr_gtproles_id == 4
                    ),
                    children: [
                        {
                            path: route("company.index"),
                            name: "Companies",
                        },
                        {
                            path: route("department.index"),
                            name: "Departments",
                        },
                        {
                            path: route("role.index"),
                            name: "Roles",
                        },
                        {
                            path: route("user.index"),
                            name: "Users",
                        },
                        {
                            path: route("approvallevels.index"),
                            name: "Approval Levels",
                        },
                        {
                            path: route("location.index"),
                            name: "Locations",
                        },
                        {
                            path: route("uom.index"),
                            name: "Uoms",
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
