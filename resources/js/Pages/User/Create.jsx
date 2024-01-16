import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormList,
    ProFormSelect,
    ProFormText,
    ProList,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Create({ auth, departments,roles }) {
    return (
        <>
            <Head title="Create User" />

            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Create User",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProCard>
                        <ProForm
                            onFinish={async (values) => {
                                router.post(route("user.store"), {
                                    ...values,
                                });
                            }}
                        >
                            <ProForm.Group>
                            <ProFormText
                                    width="sm"
                                    name="mgr_gtpusers_empno"
                                    label="Employement Number"
                                    placeholder="Employement Number"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpusers_fname"
                                    label="First Name"
                                    placeholder="First Name"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpusers_lname"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpusers_sname"
                                    label="Surname"
                                    placeholder="Surname"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />
                                
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpusers_email"
                                    label="Email"
                                    placeholder="Email"
                                    rules={[{ required: true }]}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpusers_password"
                                    label="Password"
                                    placeholder="Password"
                                    rules={[{ required: true }]}
                                    type="password"
                                    
                                />
                                <ProFormSelect
                                    width="sm"
                                    fieldProps={{
                                        mode: "multiple",
                                        //labelInValue: true,
                                        options: roles.map((role) => {
                                            return {
                                                label: role.mgr_gtproles_name,
                                                value: role.mgr_gtproles_id,
                                            };
                                        })
                                    }}

                                    name="mgr_gtpuserroles_role"
                                    label="Role"
                                    placeholder="Role"
                                    rules={[{ required: true }]}
                                />
                              
                                <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpusers_department"
                                    label="Department"
                                    placeholder="Department"
                                    rules={[{ required: true }]}
                                    options={departments.map((department) => {
                                        return {
                                            label: department.mgr_gtpdepartments_name,
                                            value: department.mgr_gtpdepartments_id,
                                    };
                                })}
                                />

                            </ProForm.Group>
                            </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>



    );
}