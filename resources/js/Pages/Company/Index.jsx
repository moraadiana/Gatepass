import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea,
    ProFormText,
    ProFormSwitch,
} from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";

import { Space, Button, Tag } from "antd";
import { useRef, useState } from "react";

export default function Index({ auth, companies }) {
    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    return (
        <>
            <Head title="Companies" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Companies",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProTable
                        headerTitle="Companies"
                        dataSource={companies}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "mgr_gtpcompanies_name",
                            },
                            {
                                title: "Status",
                                dataIndex: "mgr_gtpcompanies_status",
                                render: (text) => {
                                    if (text === 1) {
                                        return <Tag color="green">Active</Tag>;
                                    } else {
                                        return <Tag color="red">Inactive</Tag>;
                                    }
                                },
                            },
                            //link to edit company
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
                        pagination={{
                            pageSize: companies?.per_page,
                            total: companies?.total,
                            defaultPageSize: 10,
                        }}
                        toolBarRender={() => [
                            <Button
                                type="primary"
                                onClick={() => {
                                    setVisible(true);
                                }}
                            >
                                Add Company
                            </Button>,
                        ]}
                        rowKey="mgr_gtpcompanies_id"
                        search={false}
                    />

                    <ModalForm
                        title={data ? "Edit Company" : "Create Company"}
                        open={visible}
                        onOpenChange={setVisible}
                        formRef={formRef}
                        onFinish={async (values) => {
                            !data
                                ? router.post(route("company.store"), values, {
                                      onSuccess: () => {
                                          formRef.current?.resetFields();
                                          setVisible(false);
                                          actionRef.current?.reload();
                                          message.success(
                                              "Company created successfully"
                                          );
                                      },
                                      onError: () => {
                                          message.error(
                                              "Failed to create company"
                                          );
                                      },
                                  })
                                : router.put(
                                      route(
                                          "company.update",
                                          data?.mgr_gtpcompanies_id
                                      ),
                                      values,
                                      {
                                          onSuccess: () => {
                                              formRef.current?.resetFields();
                                              setVisible(false);
                                              actionRef.current?.reload();
                                              message.success(
                                                  "Company updated successfully"
                                              );
                                          },
                                          onError: () => {
                                              message.error(
                                                  "Failed to update company"
                                              );
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
                                name="mgr_gtpcompanies_name"
                                label="Name"
                                placeholder="Name"
                                rules={[{ required: true }]}
                            />
                            <ProFormSwitch
                                name="mgr_gtpcompanies_status"
                                label="Status"
                            />
                        </ProForm.Group>
                    </ModalForm>
                </PageContainer>
            </Authenticated>
        </>
    );
}
