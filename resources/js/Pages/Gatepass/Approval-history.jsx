//return values passed in gatepass.myApprovalHistory route method 

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link } from "@inertiajs/react";
import { Space, Button, Tag } from "antd";
//import auth
//import { auth } from "@/Layouts/AuthenticatedLayout";

export default function ApprovalHistory({ auth, approvals,gatepass}) {
    console.log('gatepass',gatepass);
    //console.log('gatepass',approvals.gatepass);

    return (
      <>
        <Head title="my approval history" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Gatepass approval history",
                        onBack: () => window.history.back(),
                    }}
                >
                   
                   <ProTable
                        headerTitle="Gatepass"
                        dataSource={gatepass}
                        columns={[
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
                                
                                ]
                                
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

                                // if status is 0 show pending
                                render: (text) => {
                                    if (text === 0) {
                                        return (
                                            <Tag color="red">Rejected</Tag>
                                        );
                                    } else if (text === 1) {
                                        return (
                                            <Tag color="green">Approved</Tag>
                                        );
                                    } else if (text === 2) {
                                        return <Tag color="green">Pending</Tag>;
                                    }
                                    else {
                                        return <Tag color="blue">Draft</Tag>;
                                    }
                                },
                            },
                    
                        ]}
                        rowKey={"mgr_gtpgatepass_id"}
                    />

        </PageContainer>
        </Authenticated>
      </>
    );

}

