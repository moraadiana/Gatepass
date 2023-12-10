import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea, 
} from "@ant-design/pro-components";
import { Head, Link } from "@inertiajs/react";

import { Space, Button } from 'antd';

 

export default function Index({ auth, companies }) {
    
    return (
        <>
            <Head title="Companies" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Companies",
                        onBack: () => window.history.back(),
                    }}

                    extra={
                        <Space>
                          
                          <Link href={route("company.create")}>
                             <a>Create</a>
                        </Link>

                          </Space>  
                    }
                >
                    <ProTable
                        headerTitle="Companies"
                        dataSource={companies}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "mgr_gtpcompanies_name",
                            },
                            {
                                title: "Status",
                                dataIndex: "mgr_gtpcompanies_status",
                            }
                        ]}
                        rowKey="mgr_gtpcompanies_id"
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
}
