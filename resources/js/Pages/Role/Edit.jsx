import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormText,
    ProFormTextArea,
    ProFormSwitch, 
} from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";


import { Space, Button } from 'antd';

export default function Create({ auth, companies }) {

    return (
        <>
 <Head title="Edit Role" />

<Authenticated user={auth.user}>
    <PageContainer
        header={{
            title: "Edit Role",
            onBack: () => window.history.back(),

        }}
    >
        <ProCard>
            <ProForm
            
                onFinish={async (values) => {
                    router.post(route("role.update", role.mgr_gtproles_id), {
                        ...values,

                    });

                }}
            >

                <ProForm.Group>
                    <ProFormText
                        width="sm"
                        name="mgr_gtproles_name"
                        label="Name"
                        placeholder="Name"
                        rules={[{ required: true }]}
                        normalize={(value) => value.toUpperCase()}
                    />  
                    <ProFormSwitch
                                    width="sm"
                                    name="mgr_gtproles_status"
                                    label="Active"
                                />

                                
                   
                    </ProForm.Group>
                    </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );

    
}