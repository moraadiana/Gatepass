import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea, 
} from "@ant-design/pro-components";
import { Head, Link ,router} from "@inertiajs/react";

import { Space, Button } from 'antd';

 

export default function Index({ auth, departments }) {
    
    return (
        <>
            <Head title="Departments" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Departments",
                        onBack: () => window.history.back(),
                    }}

                    extra={
                        <Space>

                        <Button type="primary" onClick={() => router.get(route("department.create"))}>
                              Create
                        </Button>

                          </Space>  
                    }
                >
                    <ProTable
                        headerTitle="Departments"
                        dataSource={departments}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "mgr_gtpdepartments_name",
                            },
                            {
                                title: "Status",
                                dataIndex: "mgr_gtpdepartments_status",
                            },
                            {
                                title: "Company",
                                dataIndex:["company","mgr_gtpcompanies_name"],
                            }
                        ]}
                        rowKey="mgr_gtpdepartments_id"
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
}
