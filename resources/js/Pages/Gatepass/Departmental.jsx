import {
    PageContainer,
    ProTable,
    ProFormSelect,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";
import { Space, Button, Tag, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useRef } from "react";

export default function Departmental({ gatepasses }) {
    const actionRef = useRef();
    return (
        <PageContainer
            header={{
                title: "Department Gatepasses",
                onBack: () => window.history.back(),
            }}
        >
            <Head title="Department gatepasses" />
            <ProTable
                size="small"
                scroll={{
                    x: true,
                }}
                dataSource={gatepasses?.data}
                options
                request={async (params = {}) => {
                    params.page = params.current;
                    delete params.current;
                    router.reload({
                        only: ["gatepasses"],
                        data: params,
                    });
                    return {
                        data: gatepasses?.data,
                        success: true,
                        total: gatepasses?.total,
                    };
                }}
                actionRef={actionRef}
                onReset={() => {
                    //Clear the search form and reload the table
                    router.visit(route("gatepass.departmentGatepass"), {
                        replace: true,
                    });
                }}
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
                        dataIndex: "mgr_gtpgatepass_vehiclereg",
                    },
                    {
                        title: "Auxilary Document",
                        dataIndex: "mgr_gtpgatepass_auxilarydoc",
                    },
                    {
                        title: "Purpose",
                        dataIndex: "mgr_gtpgatepass_purpose",
                        hideInSearch: true,
                    },
                    {
                        title: "Source Location",
                        dataIndex: ["source_location", "mgr_gtplocations_name"],
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
                        dataIndex: "mgr_gtpgatepass_destination",
                        hideInSearch: true,
                    },
                    {
                        title: "Status",
                        dataIndex: "mgr_gtpgatepass_status",
                        // if status is 0 show pending
                        render: (_, record) => {
                            if (record.mgr_gtpgatepass_status === 0) {
                                return <Tag color="red">Rejected</Tag>;
                            } else if (record.mgr_gtpgatepass_status === 1) {
                                return <Tag color="green">Approved</Tag>;
                            } else if (record.mgr_gtpgatepass_status === 2) {
                                return <Tag color="green">Pending</Tag>;
                            } else {
                                return <Tag color="blue">Draft</Tag>;
                            }
                        },
                        valueType: "select",
                        valueEnum: {
                            0: { text: "Rejected", status: "Rejected" },
                            1: { text: "Approved", status: "Approved" },
                            2: { text: "Pending", status: "Pending" },
                            3: { text: "Draft", status: "Draft" },
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
                search={{
                    collapsed: false,
                    collapseRender: () => false,
                    layout: "vertical",
                }}
                pagination={{
                    defaultPageSize: 20,
                    pageSize: gatepasses?.per_page,
                    total: gatepasses?.total,
                }}
                rowKey="mgr_gtpgatepass_id"
            />
        </PageContainer>
    );
}
