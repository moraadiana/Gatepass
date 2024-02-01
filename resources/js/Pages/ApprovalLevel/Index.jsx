import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import {
    ModalForm,
    PageContainer,
    ProForm,
    ProFormCascader,
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
    companies,
    roles,
    departments,
}) {
    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);

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
                    request={async (params = {}) => {
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
                                dataSource={record?.departments}
                                columns={[
                                    {
                                        title: "Department",
                                        dataIndex: "mgr_gtpdepartments_name",
                                    },
                                ]}
                                
                                expandable={{
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
                                                        "role",
                                                        "mgr_gtproles_name",
                                                    ],
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
                                                            icon={
                                                                <EditOutlined />
                                                            }
                                                            onClick={() => {
                                                                setData(record);
                                                                setVisible(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    ),
                                                },
                                            ]}
                                            dataSource={record.approval_levels}
                                            expandable={{
                                                expandedRowRender: (record) => (
                                                    <ProTable
                                                        columns={[
                                                            {
                                                                title: "Emp No",
                                                                dataIndex:
                                                                    "mgr_gtpusers_empno",
                                                            },
                                                            {
                                                                title: "First Name",
                                                                dataIndex:
                                                                    "mgr_gtpusers_fname",
                                                            },
                                                            {
                                                                title: "Last Name",
                                                                dataIndex:
                                                                    "mgr_gtpusers_lname",
                                                            },

                                                            {
                                                                title: "Email",
                                                                dataIndex:
                                                                    "mgr_gtpusers_email",
                                                            },
                                                        ]}
                                                        dataSource={
                                                            users
                                                        }
                                                        rowKey="mgr_gtproles_id"
                                                        search={false}
                                                        pagination={false}
                                                        options={false}
                                                        bordered
                                                    />
                                                ),
                                            }}
                                            rowKey="mgr_gtpapprovallevels_id"
                                            search={false}
                                            pagination={false}
                                            options={false}
                                            bordered
                                        />
                                    ),
                                }}

                                rowKey="mgr_gtpdepartments_id"
                                search={false}
                                pagination={false}
                                options={false}
                                bordered
                            />
                        ),
                    }}

                    pagination={{
                        pageSize: approvalLevels?.per_page,
                        total: approvalLevels?.total,
                        defaultPageSize: 5,
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
                        values.mgr_gtpapprovallevels_company =
                            values.company_dept[0];
                        values.mgr_gtpapprovallevels_department =
                            values.company_dept[1];
                        delete values.company_dept;

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
                    // initialValues={data}
                    width={600}
                >
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            name="mgr_gtpapprovallevels_label"
                            label="Level Name"
                            placeholder="Level Name"
                            initialValue={data?.mgr_gtpapprovallevels_label}
                            rules={[{ required: true }]}
                        />

                        <ProFormCascader
                            width="sm"
                            name="company_dept"
                            label="Company"
                            placeholder="Company"
                            rules={[{ required: true }]}
                            fieldProps={{
                                options: companies?.map((company) => ({
                                    value: company.mgr_gtpcompanies_id,
                                    label: company.mgr_gtpcompanies_name,
                                    children: company.departments.map(
                                        (department) => ({
                                            value: department.mgr_gtpdepartments_id,
                                            label: department.mgr_gtpdepartments_name,
                                        })
                                    ),
                                })),
                            }}
                            initialValue={
                                data && [
                                    data.mgr_gtpapprovallevels_company,
                                    data.mgr_gtpapprovallevels_department,
                                ]
                            }
                        />
                        {/* <ProFormSelect
                            width="sm"
                            name="mgr_gtpapprovallevels_department"
                            label="Department"
                            placeholder="Department"
                            rules={[{ required: true }]}
                            options={departments?.map((department) => ({
                                value: department.mgr_gtpdepartments_id,
                                label: department.mgr_gtpdepartments_name,
                            }))}
                        /> */}
                    </ProForm.Group>
                    <ProForm.Group>
                        <ProFormText
                            width="sm"
                            name="mgr_gtpapprovallevels_sequence"
                            label="Sequence"
                            placeholder="Sequence"
                            initialValue={data?.mgr_gtpapprovallevels_sequence}
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
                            initialValue={data?.mgr_gtpapprovallevels_approver}
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
                            initialValue={data?.mgr_gtpapprovallevels_status}
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
