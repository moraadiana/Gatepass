import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";
//create a function to fetch all gatepasses

export default function Index({ auth, approvals }) {
    console.log(approvals);
    
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
                    headerTitle="Approvals"
                    dataSource={approvals}
                    columns={[
                        {
                            title: "Status",
                            dataIndex: "mgr_gtpapprovals_status",
                            
                        },
                        {
                            title: "Approval level",
                            dataIndex: ["approvallevel", "mgr_gtpapprovals_approvallevel"],
                          
                        },
                        {
                            title: "gatepass",
                            dataIndex: "mgr_gtpapprovals_gatepass",
                        },
                        //create a link to view created gatepass
                        
                    ]}




                    
                        
                    rowKey="mgr_gtpapprovals_id"
                />
            </PageContainer>
        </Authenticated>
    );
}
