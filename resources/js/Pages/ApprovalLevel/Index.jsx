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
 
export default function ApprovalLevels({
    auth,
    approvalLevels,
    users,
    companies,
    roles,
}) {
    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);

    //console.log (approvalLevels);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Approval Levels" />
            <PageContainer
                header={{
                    title: "Approval Levels",
                    onBack: () => window.history.back(),
                }}
            >
                <ProTable
                    actionRef={actionRef}
                    dataSource={approvalLevels?.data}
                    request={async (params = {}, sort, filter) => {
                        params.page = params.current;
                        delete params.current;
                        router.reload({
                            only: ["approvalLevels"],
                            data: params,
                        });
                        return {
                            data: approvalLevels?.data,
                            total: approvalLevels?.total,
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
                        //childrenColumnName: "approvalLevels",
                        expandedRowRender: (record) => (
                            <ProTable
                                columns={[
                                    {
                                        title: "Level Name",
                                        dataIndex:
                                            "mgr_gtpapprovallevels_label",
                                    },
                                    {
                                        title: "Role",
                                        dataIndex: [
                                            "role","mgr_gtproles_name"
                                        ]

                                    },
                                    {
                                        title: "Sequence",
                                        dataIndex:
                                            "mgr_gtpapprovallevels_sequence",                                            
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
                                dataSource={record.approval_levels}
                                rowKey="mgr_gtpapprovallevels_id"
                                search={false}
                                pagination={false}
                                options={false}
                                bordered
                            />
                        ),
                    }}
                    pagination={{
                        pageSize: 5,
                        total: approvalLevels?.total,
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
                    title={data ? "Edit Approval Level" : "Add Approval Level"}
                    open={visible}
                    onOpenChange={setVisible}
                    formRef={formRef}
                    onFinish={async (values) => {
                        !data
                            ? router.post(
                                  route("approvallevels.store"),
                                  values,
                                  {
                                      onSuccess: () => {
                                          setVisible(false);
                                          actionRef.current.reload();
                                          message.success(
                                              "Approval Level Added Successfully"
                                          );
                                      },
                                      onError: () => {
                                          message.error("Something went wrong");
                                      },
                                  }
                              )
                            : router.put(
                                  route(
                                      "approvallevels.update",
                                      data?.mgr_gtpapprovallevels_id
                                  ),
                                  values,
                                  {
                                      onSuccess: () => {
                                          setVisible(false);
                                          actionRef.current.reload();
                                          message.success(
                                              "Approval Level Updated Successfully"
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
                            name="mgr_gtpapprovallevels_label"
                            label="Level Name"
                            placeholder="Level Name"
                            rules={[{ required: true }]}
                        />
 
                        <ProFormSelect
                            width="sm"
                            name="mgr_gtpapprovallevels_company"
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
                        <ProFormText
                            width="sm"
                            name="mgr_gtpapprovallevels_sequence"
                            label="Sequence"
                            placeholder="Sequence"
                            rules={[{ required: true }]}
                            fieldProps={{
                                type: "number",
                            }}
                            />
                
                        <ProFormSelect
                            width="sm"
                            name="mgr_gtpapprovallevels_approver"
                            label="Role"
                            placeholder="Role"
                            rules={[{ required: true }]}
                            options={roles?.map((role) => ({
                                value: role.mgr_gtproles_id,
                                label: role.mgr_gtproles_name,
                            }))}
                        />
                    </ProForm.Group>
                    <ProForm.Group>
                        
                        <ProFormSelect
                            width="sm"
                            name="mgr_gtpapprovallevels_status"
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