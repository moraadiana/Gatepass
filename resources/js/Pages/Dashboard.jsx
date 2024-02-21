import { ProCard, ProTable, StatisticCard } from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";
import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Statistic } = StatisticCard;
export default function Dashboard({
    auth,
    approvedGatepassesCount,
    rejectedGatepassesCount,
    pendingGatepassesCount,
    totalGatepassesCount,
    approvedGatepasses,
    rejectedGatepasses,
    pendingGatepasses,
    allGatepasses,
}) {
    return (
        <>
            <Head title="Dashboard" />
            <ProCard
                title={`Hello ${auth.user.mgr_gtpusers_fname}!👋 Here's your activity in numbers. (Your requests)`}
                headerBordered
                style={{
                    width: "100%",
                }}
                tabs={{
                    items: [
                        {
                            key: "0",
                            label: (
                                <Statistic
                                    layout="vertical"
                                    title="Total"
                                    value={totalGatepassesCount}
                                    total:true
                                    style={{
                                        width: 120,
                                        borderInlineEnd: "1px solid #f0f0f0",
                                    }}
                                />
                            ),
                            children: (
                                <ProTable
                                    size="small"
                                    dataSource={allGatepasses}
                                    columns={[
                                        {
                                            title: "Gatepass No.",
                                            dataIndex: "mgr_gtpgatepass_id",
                                        },
                                        {
                                            title: "Name",
                                            dataIndex: "mgr_gtpgatepass_name",
                                        },
                                        {
                                            title: "Vehicle Reg",
                                            dataIndex:
                                                "mgr_gtpgatepass_vehiclereg",
                                        },
                                        {
                                            title: "Auxilary Document",
                                            dataIndex:
                                                "mgr_gtpgatepass_auxilarydoc",
                                        },
                                        {
                                            title: "Purpose",
                                            dataIndex:
                                                "mgr_gtpgatepass_purpose",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Source Location",
                                            dataIndex: [
                                                "source_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Destination Location",
                                            dataIndex: [
                                                "destination_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },

                                        {
                                            title: "Specific Destination",
                                            dataIndex:
                                                "mgr_gtpgatepass_destination",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Status",
                                            dataIndex: "mgr_gtpgatepass_status",
                                            hideInSearch: true,
                                            // if status is 0 show pending
                                            render: (text) => {
                                                if (text === 0) {
                                                    return (
                                                        <Tag color="red">
                                                            Rejected
                                                        </Tag>
                                                    );
                                                } else if (text === 1) {
                                                    return (
                                                        <Tag color="green">
                                                            Approved
                                                        </Tag>
                                                    );
                                                } else if (text === 2) {
                                                    return (
                                                        <Tag color="green">
                                                            Pending
                                                        </Tag>
                                                    );
                                                } else {
                                                    return (
                                                        <Tag color="blue">
                                                            Draft
                                                        </Tag>
                                                    );
                                                }
                                            },
                                        },
                                        {
                                            title: "Actions",
                                            hideInSearch: true,
                                            render: (_, record) => (
                                                <Space>
                                                    <Button
                                                        type="link"
                                                        icon={<EyeOutlined />}
                                                        onClick={() => {
                                                            router.get(
                                                                route(
                                                                    "gatepass.show",
                                                                    record.mgr_gtpgatepass_id
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        View Details
                                                    </Button>
                                                </Space>
                                            ),
                                        },

                                        //create button to submit a gatepass request
                                    ]}
                                    //Add a view all on toolbar
                                    toolBarRender={() => [
                                        <Button
                                            key="viewall"
                                            type="primary"
                                            onClick={() => {
                                                router.get(
                                                    route("gatepass.index")
                                                );
                                            }}
                                            size="small"
                                        >
                                            View All
                                        </Button>,
                                    ]}
                                    scroll={{
                                        x:true
                                    }}
                                    ghost
                                    options={false}
                                    pagination={false}
                                    search={false}
                                />
                            ),
                        },
                        {
                            key: "1",
                            label: (
                                <Statistic
                                    layout="vertical"
                                    title="Pending"
                                    value={pendingGatepassesCount}
                                    status="processing"
                                />
                            ),
                            children: (
                                <ProTable
                                    size="small"
                                    dataSource={pendingGatepasses}
                                    columns={[
                                        {
                                            title: "Gatepass No.",
                                            dataIndex: "mgr_gtpgatepass_id",
                                        },
                                        {
                                            title: "Name",
                                            dataIndex: "mgr_gtpgatepass_name",
                                        },
                                        {
                                            title: "Vehicle Reg",
                                            dataIndex:
                                                "mgr_gtpgatepass_vehiclereg",
                                        },
                                        {
                                            title: "Auxilary Document",
                                            dataIndex:
                                                "mgr_gtpgatepass_auxilarydoc",
                                        },
                                        {
                                            title: "Purpose",
                                            dataIndex:
                                                "mgr_gtpgatepass_purpose",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Source Location",
                                            dataIndex: [
                                                "source_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Destination Location",
                                            dataIndex: [
                                                "destination_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },

                                        {
                                            title: "Specific Destination",
                                            dataIndex:
                                                "mgr_gtpgatepass_destination",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Actions",
                                            hideInSearch: true,
                                            render: (_, record) => (
                                                <Space>
                                                    <Button
                                                        type="link"
                                                        icon={<EyeOutlined />}
                                                        onClick={() => {
                                                            router.get(
                                                                route(
                                                                    "gatepass.show",
                                                                    record.mgr_gtpgatepass_id
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        View Details
                                                    </Button>
                                                </Space>
                                            ),
                                        },
                                    ]}
                                    toolBarRender={() => [
                                        <Button
                                            key="viewall"
                                            type="primary"
                                            onClick={() => {
                                                router.get(
                                                    route("gatepass.index"),
                                                    {
                                                        mgr_gtpgatepass_status: 2,
                                                    }
                                                );
                                            }}
                                            size="small"
                                        >
                                            View All
                                        </Button>,
                                    ]}
                                    scroll={{
                                        x:true
                                    
                                    }}
                                    ghost
                                    options={false}
                                    pagination={false}
                                    search={false}
                                />
                            ),
                            style: {
                                width: "100%",
                            },
                        },
                        {
                            key: "2",
                            label: (
                                <Statistic
                                    layout="vertical"
                                    title="Approved"
                                    value={approvedGatepassesCount}
                                    status="success"
                                />
                            ),
                            children: (
                                <ProTable
                                    size="small"
                                    dataSource={approvedGatepasses}
                                    columns={[
                                        {
                                            title: "Gatepass No.",
                                            dataIndex: "mgr_gtpgatepass_id",
                                        },
                                        {
                                            title: "Name",
                                            dataIndex: "mgr_gtpgatepass_name",
                                        },
                                        {
                                            title: "Vehicle Reg",
                                            dataIndex:
                                                "mgr_gtpgatepass_vehiclereg",
                                        },
                                        {
                                            title: "Auxilary Document",
                                            dataIndex:
                                                "mgr_gtpgatepass_auxilarydoc",
                                        },
                                        {
                                            title: "Purpose",
                                            dataIndex:
                                                "mgr_gtpgatepass_purpose",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Source Location",
                                            dataIndex: [
                                                "source_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Destination Location",
                                            dataIndex: [
                                                "destination_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },

                                        {
                                            title: "Specific Destination",
                                            dataIndex:
                                                "mgr_gtpgatepass_destination",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Actions",
                                            hideInSearch: true,
                                            render: (_, record) => (
                                                <Space>
                                                    <Button
                                                        type="link"
                                                        icon={<EyeOutlined />}
                                                        onClick={() => {
                                                            router.get(
                                                                route(
                                                                    "gatepass.show",
                                                                    record.mgr_gtpgatepass_id
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        View Details
                                                    </Button>
                                                </Space>
                                            ),
                                        },
                                    ]}
                                    toolBarRender={() => [
                                        <Button
                                            key="viewall"
                                            type="primary"
                                            onClick={() => {
                                                router.get(
                                                    route("gatepass.index"),
                                                    {
                                                        mgr_gtpgatepass_status: 1,
                                                    }
                                                );
                                            }}
                                            size="small"
                                        >
                                            View All
                                        </Button>,
                                    ]}
                                    scroll={{
                                        x:true
                                    }}
                                    ghost
                                    options={false}
                                    pagination={false}
                                    search={false}
                                />
                            ),
                        },
                        {
                            key: "3",
                            label: (
                                <Statistic
                                    layout="vertical"
                                    title="Rejected"
                                    value={rejectedGatepassesCount}
                                    status="error"
                                />
                            ),
                            children: (
                                <ProTable
                                    size="small"
                                    dataSource={rejectedGatepasses}
                                    columns={[
                                        {
                                            title: "Gatepass No.",
                                            dataIndex: "mgr_gtpgatepass_id",
                                        },
                                        {
                                            title: "Name",
                                            dataIndex: "mgr_gtpgatepass_name",
                                        },
                                        {
                                            title: "Vehicle Reg",
                                            dataIndex:
                                                "mgr_gtpgatepass_vehiclereg",
                                        },
                                        {
                                            title: "Auxilary Document",
                                            dataIndex:
                                                "mgr_gtpgatepass_auxilarydoc",
                                        },
                                        {
                                            title: "Purpose",
                                            dataIndex:
                                                "mgr_gtpgatepass_purpose",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Source Location",
                                            dataIndex: [
                                                "source_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Destination Location",
                                            dataIndex: [
                                                "destination_location",
                                                "mgr_gtplocations_name",
                                            ],
                                            hideInSearch: true,
                                        },

                                        {
                                            title: "Specific Destination",
                                            dataIndex:
                                                "mgr_gtpgatepass_destination",
                                            hideInSearch: true,
                                        },
                                        {
                                            title: "Actions",
                                            hideInSearch: true,
                                            render: (_, record) => (
                                                <Space>
                                                    <Button
                                                        type="link"
                                                        icon={<EyeOutlined />}
                                                        onClick={() => {
                                                            router.get(
                                                                route(
                                                                    "gatepass.show",
                                                                    record.mgr_gtpgatepass_id
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        View Details
                                                    </Button>
                                                </Space>
                                            ),
                                        },
                                    ]}
                                    toolBarRender={() => [
                                        <Button
                                            key="viewall"
                                            type="primary"
                                            onClick={() => {
                                                router.get(
                                                    route("gatepass.index"),
                                                    {
                                                        mgr_gtpgatepass_status: 0,
                                                    }
                                                );
                                            }}
                                            size="small"
                                        >
                                            View All
                                        </Button>,
                                    ]}
                                    scroll={{
                                        x:true
                                    }}
                                    ghost
                                    options={false}
                                    pagination={false}
                                    search={false}
                                />
                            ),
                        },
                    ],
                }}
            />
        </>
    );
}
