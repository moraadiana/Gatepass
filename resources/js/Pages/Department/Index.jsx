import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea,
    ProFormText,
    ProFormSelect, 
} from "@ant-design/pro-components";
import {
    PlusCircleOutlined,
    EditOutlined,
} from "@ant-design/icons";

import { Head, Link ,router} from "@inertiajs/react";

import { Space, Button, Tag } from 'antd';
import { useRef, useState } from "react";

 

export default function Index({ auth, departments,companies,roles }) {

    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
     console.log ("companies",companies);
    // console.log("departments",departments)
    
    return (
        <AuthenticatedLayout user={auth.user}>
        <Head title="Departments" />
        <PageContainer
            header={{
                title: "Departments",
                onBack: () => window.history.back(),
            }}
        >
            <ProTable
                actionRef={actionRef}
                dataSource={departments?.data}
                request={async (params = {}, sort, filter) => {
                    params.page = params.current;
                    delete params.current;
                    router.reload({
                        only: ["departments"],
                        data: params,
                    });
                    return {
                        data: departments?.data,
                        total: departments?.total,
                        success: true,
                    };
                }}
                columns={[
                    {
                        title: "Company",
                        dataIndex: "mgr_gtpcompanies_name",
                    },
                ]}
                    expandable={{
                        //childrenColumnName: "departments",
                        expandedRowRender: (record) => (
                            <ProTable
                                columns={[
                                    {
                                        title: "Department Name",
                                        dataIndex:
                                            "mgr_gtpdepartments_name",
                                    },
                                    {
                                        title: "Status",
                                        dataIndex:
                                            "mgr_gtpdepartments_status", 
                                            render: (text) => {
                                                if (text === 0) {
                                                    return <Tag color="red">Inactive</Tag>;
                                                }  else {
                                                    return <Tag color="green">Active</Tag>;
                                                }
                                            },                                      
                                    },
                                  
                                    {
                                        title: "Actions",
                                        render: (text, record) => (
                                            <Button
                                                type="link"
                                                icon={<EditOutlined />}
                                                onClick={() => {
                                                    setData(record);
                                                    setVisible(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        ),
                                    },
                                ]}
                                dataSource={record.departments}
                                rowKey="mgr_gtpdepartments_id"
                                search={false}
                                pagination={false}
                                options={false}
                                bordered
                            />
                        ),
                    }}
                    pagination={{
                        pageSize: 5,
                        total: departments?.total,
                    }}
                    toolBarRender={() => [
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            Add New
                        </Button>,
                    ]}
                    rowKey="mgr_gtpcompanies_id"
                    search={false}
                />
        
                      <ModalForm 
                    title= {data ? "Edit Department" : "Create Department"}
                    open={visible}
                    onOpenChange={setVisible}
                    formRef={formRef}
                    onFinish={async (values) => {
                        ! data
                        ? router.post(route("department.store"), 
                            values,
                            {
                                onSuccess: () => {
                                    formRef.current?.resetFields();
                                    setVisible(false);
                                    actionRef.current?.reload();
                                    message.success("Department created successfully");
                                },
                                onError: () => {
                                    message.error("Failed to create Department");
                                },

                                
                            }
                        )
                        : router.put(
                            route(
                                "department.update",
                                data ?.mgr_gtpdepartments_id
                            ),
                            values,
                            {
                                onSuccess: () => {
                                    formRef.current?.resetFields();
                                    setVisible(false);
                                    actionRef.current?.reload();
                                    message.success("Department updated successfully");
                                },
                                onError: () => {
                                    message.error("Failed to update Department");
                                },
                            }
                        );
                    }}
                    modalProps={{
                        onCancel: () => [setVisible(false), setData(null)],
                        destroyOnClose: true,
                    }}
                    initialValues={data}
                    width={600}

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
                                name="mgr_gtpdepartments_status"
                                label="Status"
                                options={[
                                    {
                                        value: 1,
                                        label: "Active",
                                    },
                                    {
                                        value: 0,
                                        label: "Inactive",
                                    },
                                ]}
                                rules={[{ required: true }]}
                            />
                            
                            <ProFormSelect
                                width="sm"
                                name="mgr_gtpdepartments_company"
                                label="Company"
                                options={companies?.map((company) => ({
                                    value: company.mgr_gtpcompanies_id,
                                    label: company.mgr_gtpcompanies_name,
                                    }))}
                                rules={[{ required: true }]}
                            /> 

                         
                        </ProForm.Group>
                    </ModalForm>
                </PageContainer>
                </AuthenticatedLayout>
    );
}
