import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
 
import {
    ModalForm,
    PageContainer,
    ProForm,
    ProFormSelect,
    ProFormText,
    ProTable,
} from "@ant-design/pro-components";
import { Button, message } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { Head, router } from "@inertiajs/react";
 
export default function Index({
    auth,
    locations,
    users,
    companies,
   
}) {
    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
   
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Locations" />
            <PageContainer
                header={{
                    title: "Locations",
                    onBack: () => window.history.back(),
                }}
            >
                <ProTable
                    actionRef={actionRef}
                    dataSource={locations?.data}
                    request={async (params = {}, sort, filter) => {
                        params.page = params.current;
                        delete params.current;
                        router.reload({
                            only: ["locations"],
                            data: params,
                        });
                        return {
                            data: locations?.data,
                            total: locations?.total,
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
                        //childrenColumnName: "locations",
                        expandedRowRender: (record) => (
                            <ProTable
                                columns={[
                                    {
                                        title: "Location Name",
                                        dataIndex:
                                            "mgr_gtplocations_name",
                                    },
                                    {
                                        title: "status",
                                        dataIndex: "mgr_gtplocations_status",
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
                                dataSource={record.locations}
                                rowKey="mgr_gtplocations_id"
                                search={false}
                                pagination={false}
                                options={false}
                                bordered
                            />
                        ),
                    }}
                    pagination={{
                        pageSize: locations?.per_page,
                        total: locations?.total,
                        defaultPageSize: 10,
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
                    title={data ? "Edit Location" : "Add Location"}
                    open={visible}
                    onOpenChange={setVisible}
                    formRef={formRef}
                    onFinish={async (values) => {
                       ! data
                        ? router.post(route("location.store"),
                        values,
                        {
                            onSuccess: () => {
                                formRef.current?.resetFields();
                                setVisible(false);
                                actionRef.current?.reload();
                                message.success("Location created successfully");
                            },
                                      onError: () => {
                                          message.error("Something went wrong");
                                      },
                                  }
                              )
                            : router.put(
                                  route(
                                      "location.update",
                                      data?.mgr_gtplocations_id
                                  ),
                                  values,
                                  {
                                      onSuccess: () => {
                                          setVisible(false);
                                          actionRef.current.reload();
                                          message.success(
                                              "Location Updated Successfully"
                                          );
                                      },
                                      onError: () => {
                                          message.error("Something went wrong");
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
                            name="mgr_gtplocations_name"
                            label="Location Name"
                            placeholder="Location Name"
                            rules={[{ required: true }]}
                        />
 
                        <ProFormSelect
                            width="sm"
                            name="mgr_gtplocations_company"
                            label="Company"
                            placeholder="Company"
                            rules={[{ required: true }]}
                            options={companies?.map((company) => ({
                                value: company.mgr_gtpcompanies_id,
                                label: company.mgr_gtpcompanies_name,
                            }))}
                        />
                    </ProForm.Group>
                   
                    <ProForm.Group>
                        
                        <ProFormSelect
                            width="sm"
                            name="mgr_gtplocations_status"
                            label="Status"
                            placeholder="Status"
                            rules={[{ required: true }]}
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
                        />
                    </ProForm.Group>
                </ModalForm>
            </PageContainer>
        </AuthenticatedLayout>
    );
}