import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormText,
    ProFormTextArea, 
} from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";


import { Space, Button } from 'antd';

export default function Create({ auth, companies }) {

    return (
        <>
 <Head title="Create Company" />

<Authenticated user={auth.user}>
    <PageContainer
        header={{
            title: "Create Company",
            onBack: () => window.history.back(),

        }}
    >
        <ProCard>
            <ProForm
            
                onFinish={async (values) => {
                    router.post(route("company.store"), {
                        ...values,

                    });

                }}
            >

                <ProForm.Group>
                    <ProFormText
                        width="sm"
                        name="mgr_gtpcompanies_name"
                        label="Name"
                        placeholder="Name"
                        rules={[{ required: true }]}
                    />  
                    {/* <ProFormText
                        width="sm"
                        name="mgr_gtpcompanies_a"
                        label="Address"
                        placeholder="Address"
                        rules={[{ required: true }]}
                    /> */}
                    </ProForm.Group>
                    </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );

    
}