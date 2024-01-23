import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormList,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProList,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Create({ auth, departments, roles, user }) {
    
    return (
        <>
            <Head title="Edit User" />

            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Edit User",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProCard>
                        <ProForm
                            onFinish={async (values) => {
                                router.put(
                                    route("user.update", user.mgr_gtpusers_id),
                                    {
                                        ...values,
                                    },
                                    // {
                                    //     onSuccess: () => {
                                    //         router.get(route("user.index"));
                                    //         //return success message
                                    //         message.success(
                                    //             "User updated successfully"
                                    //         );
                                            
                                    //     },
                                    //     onError: () => {
                                    //         //return error message
                                    //         message.error(
                                    //             "Error updating user"
                                    //         );
                                    //     }
                                    // }
                                );
                            }
                        }
                            initialValues={user}
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
                                    name="mgr_gtpusers_email"
                                    label="Email"
                                    placeholder="Email"
                                    rules={[{ required: true }]}
                                />
                                
                                <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpusers_department"
                                    label="Department"
                                    placeholder="Department"
                                    rules={[{ required: true }]}
                                    options={departments.map((department) => ({
                                       
                                            label: department.mgr_gtpdepartments_name,
                                            value: department.mgr_gtpdepartments_id,
                                        
                                    }))}
                                />
                                <ProFormSelect
                                    width="sm"
                                    fieldProps={{
                                        mode: "multiple",
                                        options: roles.map((role) => ({
                                           
                                                label: role.mgr_gtproles_name,
                                                value: role.mgr_gtproles_id,
                                           
                                        })),
                                    }}
                                    name="mgr_gtpuserroles_role"
                                    label="Role"
                                    placeholder="Role"
                                    rules={[{ required: true }]}
                                    initialValue={user.roles.map((role) => {
                                        return {
                                            value: role.mgr_gtproles_id,
                                        };
                                    })
                                    }
                                />

                                <ProFormText.Password
                                    width="sm"
                                    name="mgr_gtpusers_password"
                                    label="Password"
                                    placeholder="Password"
                                    //rules={[{ required: true }]}
                                />
                               
                             

                                <ProFormSwitch
                                    width="sm"
                                    name="mgr_gtpusers_status"
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
