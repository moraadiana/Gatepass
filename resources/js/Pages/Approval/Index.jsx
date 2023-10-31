import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";

export default function Index({ auth, approvals }) {
    console.log(approvals);
    return (
        <>
            <Head title="Approvals" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Gatepass Approvals",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProTable
                    // all created gatepasses from gatepass.index page
                        headerTitle="Gatepass"
                        rowKey="mgr_gtpgatepass_id"
                        


                        dataSource={approvals}
                        columns={[  
                            {
                                queryField: "mgr_gtpgatepass_name", 
                                dataIndex: "mgr_gtpgatepass_name",
                                title: "Title",
                                
                            },
                            {
                                queryField: "mgr_gtpgatepass_department", 
                                dataIndex: "mgr_gtpgatepass_department",
                                title: "Department",
                            },
                            {
                                queryField: "mgr_gtpgatepass_destination", 
                                dataIndex: "mgr_gtpgatepass_destination",
                                title: "Destination",
                            },
                            {
                                queryField: "mgr_gtpgatepass_purpose", 
                                dataIndex: "mgr_gtpgatepass_purpose",
                                title: "Purpose",
                            },
                            {
                                queryField: "mgr_gtpgatepass_description", 
                                dataIndex: "mgr_gtpgatepass_description",
                                title: "Description",
                            },
                            {
                                queryField: "mgr_gtpgatepass_quantity", 
                                dataIndex: "mgr_gtpgatepass_quantity",
                                title: "Quantity",
                            },
                            {
                                queryField: "mgr_gtpgatepass_auxilarydoc", 
                                dataIndex: "mgr_gtpgatepass_auxilarydoc",
                                title: "Auxilary Doc",
                            },
                            {
                                queryField: "mgr_gtpgatepass_createdby", 
                                dataIndex: "mgr_gtpgatepass_createdby",
                                title: "Created By",
                            },
                            


                        ]}
                
                        
                        />
                
                </PageContainer>
            </Authenticated>
        </>
    );
}
