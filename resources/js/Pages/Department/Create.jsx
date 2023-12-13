import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormText,
    ProFormTextArea,
    ProFormSelect, 
} from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";


import { Space, Button } from 'antd';

export default function Create({ auth, departments, companies}) {

    return (
        <>
 <Head title="Create Department" />

<Authenticated user={auth.user}>
    <PageContainer
        header={{
            title: "Create Department",
            onBack: () => window.history.back(),

        }}
    >
        <ProCard>
            <ProForm
            
                onFinish={async (values) => {
                    router.post(route("department.store"), {
                        ...values,


                    });

                }}
            >

                <ProForm.Group>
                    <ProFormText
                        width="sm"
                        name="mgr_gtpdepartments_name"
                        label="Name"
                        placeholder="Name"
                        rules={[{ required: true }]}
                    />  
                   
                   
                    <ProFormSelect
                        width="sm"
                        name="mgr_gtpdepartments_company"
                        label="Company"
                        placeholder="Company"
                        rules={[{ required: true }]}
                        options = {
                            companies.map((company) => {
                                return {
                                    label: company.mgr_gtpcompanies_name,
                                    value: company.mgr_gtpcompanies_id
                                }
                            })
                        }
                        />
                   
                    
                    </ProForm.Group>
                    </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );

    
}