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
console.log(companies);
    return (
        <>
 <Head title="Edit Company" />

<Authenticated user={auth.user}>
    <PageContainer
        header={{
            title: "Edit Company  ",
            onBack: () => window.history.back(),

        }}
    >
        <ProCard>
            <ProForm
            
                onFinish={async (values) => {
                    router.post(route("company.update"), {
                        ...values,

                    });
                    initialValues={companies}

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
                   
                    </ProForm.Group>
                    </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );

    
}