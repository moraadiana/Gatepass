import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

export default function Index({ auth, gatepasses }) {

    return (
        <>
            <Head title="All gatepasses" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Gatepass",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProTable
                        size="small"
                        dataSource={gatepasses?.data}
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
                        columns={[
                            {
                                title: "Gatepass No.",
                                dataIndex: "mgr_gtpgatepass_id",
                                //hideInSearch: true,
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
                                title: "Department",
                                dataIndex: [
                                    "department",
                                    "mgr_gtpdepartments_name",
                                ],
                                hideInSearch: true,
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
                                dataIndex: "mgr_gtpgatepass_destination",
                                hideInSearch: true,
                            },
                            {
                                title: "Status",
                                dataIndex: "mgr_gtpgatepass_status",
                                hideInSearch: true,
                                // if status is 0 show pending
                                render: (text) => {
                                    if (text === 0) {
                                        return <Tag color="red">Rejected</Tag>;
                                    } else if (text === 1) {
                                        return (
                                            <Tag color="green">Approved</Tag>
                                        );
                                    } else if (text === 2) {
                                        return <Tag color="green">Pending</Tag>;
                                    } else {
                                        return <Tag color="blue">Draft</Tag>;
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
                                        {/* {record.mgr_gtpgatepass_status == 3 && (
                                            <Button
                                                type="link"
                                                icon={<EditOutlined />}
                                                onClick={() => {
                                                    router.get(
                                                        route(
                                                            "gatepass.edit",
                                                            record.mgr_gtpgatepass_id
                                                        )
                                                    );
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        )} */}
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
            </Authenticated>
        </>
    );
}
