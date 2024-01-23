import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head, Link ,router} from "@inertiajs/react";
import { Space, Button, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
//create a function to fetch all gatepasses

export default function Index({ auth, gatepasses, approvals }) {

    return (
        <Authenticated user={auth.user}>
            <Head title="Approvals" />
            <PageContainer
                header={{
                    title: "Approvals",
                    onBack: () => window.history.back(),
                }}
            >
                <ProTable
                    headerTitle="Submitted Gatepass"
                    dataSource={gatepasses}
                    columns={[
                        {
                            title: "ID",
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
                            title: "Department",
                            dataIndex: [
                                "department",
                                "mgr_gtpdepartments_name",
                            ],
                        },
                        {
                            title: "Auxilary Document",
                            dataIndex: 
                                "mgr_gtpgatepass_auxilarydoc",
                            
                        },
                        {
                            title: "Purpose",
                            dataIndex: [ "mgr_gtpgatepass_purpose"],
                        },
                        {
                            title: "Source Location",
                            dataIndex: [
                                "source_location",
                                "mgr_gtplocations_name",
                            ],
                        },
                        {
                            title: "Destination Location",
                            dataIndex: [
                            
                                "destination_location",
                                "mgr_gtplocations_name",
                            ],
                        },
                        {
                            title: "Destination",
                            dataIndex: [
                                "mgr_gtpgatepass_destination",
                            ],
                        },
                        // {
                        //     title: "Actions",
                        //     render: (_, record) => (
                        //         <Link
                        //             href={route(
                        //                 "gatepass.show",
                        //                 record.mgr_gtpgatepass_id
                        //             )}
                        //         >
                        //             View Details
                        //         </Link>
                        //     ),
                        // },
                        {
                            title: "Status",
                            dataIndex: "mgr_gtpgatepass_status",

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
                            render: (_, record) => (
                                <Space>
                                    <Button
                                        type="link"
                                        icon={<EyeOutlined/>}
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
                                   
                                        <Button
                                            type="link"
                                            icon={<EditOutlined/>}
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
                                  
                                </Space>
                            ),
                        },
                       
                        //create a link to view created gatepass
                    ]}
                    
                    rowKey="mgr_gtpgatepass_id"
                />
            </PageContainer>
        </Authenticated>
    );
}
