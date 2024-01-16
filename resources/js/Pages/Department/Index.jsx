import Authenticated from "@/Layouts/AuthenticatedLayout";
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
import { Head, Link ,router} from "@inertiajs/react";

import { Space, Button } from 'antd';
import { useRef, useState } from "react";

 

export default function Index({ auth, departments,company,roles }) {

    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    console.log (departments);
    
    return (
        <>
            <Head title="Departments" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Departments",
                        onBack: () => window.history.back(),
                    }}

                    // extra={
                    //     <Space>

                    //     <Button type="primary" onClick={() => router.get(route("department.create"))}>
                    //           Create
                    //     </Button>

                    //       </Space>  
                    // }
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
                            },
                            {
                                title: "Edit",
                                render: (text, record) => (
                                    <Button
                                        type="link"
                                       //icon={<EditOutlined />}
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
                        pagination={{ defaultPageSize: 5, 
                            total: departments?.total,}}
                            toolBarRender={() => [
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setVisible(true);
                                    }}
                                >
                                    Add Department
                                </Button>,
                            ]}
                        rowKey="mgr_gtpdepartments_id"
                        search={false}
                    />
                      <ModalForm 
                    title= {data ? "Edit Department" : "Create Depatment"}
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
                                options={company?.map((company) => ({
                                        value: company.mgr_gtpcompanies_id,
                                        label: company.mgr_gtpcompanies_name,

                                    }))}
                                rules={[{ required: true }]}
                            /> 

                         
                        </ProForm.Group>
                    </ModalForm>
                </PageContainer>
            </Authenticated>
        </>
    );
}
