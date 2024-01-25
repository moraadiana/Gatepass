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
    ProFormSelect,
} from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";

import { Space, Button, Tag } from "antd";
import { useRef, useState } from "react";

export default function Index({ auth, roles }) {
    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    return (
        <>
            <Head title="Roles" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Roles",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProCard>
                        <ProTable
                            headerTitle="Roles"
                            dataSource={roles}
                            columns={[
                                {
                                    title: "Name",
                                    dataIndex: "mgr_gtproles_name",
                                },
                                {
                                    title: "status",
                                    dataIndex: "mgr_gtproles_status",
                                    render: (text) => {
                                        if (text == 1) {
                                            return (
                                                <Tag color="green">Active</Tag>
                                            );
                                        } else {
                                            return (
                                                <Tag color="red">Inactive</Tag>
                                            );
                                        }
                                    },
                                },
                                //linkn to edit role
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
                                pageSize: roles?.per_page,
                                defaultPageSize: 5,
                                total: roles?.total,
                            }}
                            toolBarRender={() => [
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setVisible(true);
                                    }}
                                >
                                    Add Role
                                </Button>,
                            ]}
                            rowKey={"mgr_gtproles_id"}
                            search={false}
                        />

                        <ModalForm
                            title={data ? "Edit Role" : "Create Role"}
                            open={visible}
                            onOpenChange={setVisible}
                            formRef={formRef}
                            onFinish={async (values) => {
                                !data
                                    ? router.post(route("role.store"), values, {
                                          onSuccess: () => {
                                              formRef.current?.resetFields();
                                              setVisible(false);
                                              actionRef.current?.reload();
                                              message.success(
                                                  "Role created successfully"
                                              );
                                          },
                                          onError: () => {
                                              message.error(
                                                  "Failed to create Role"
                                              );
                                          },
                                      })
                                    : router.put(
                                          route(
                                              "role.update",
                                              data?.mgr_gtproles_id
                                          ),
                                          values,
                                          {
                                              onSuccess: () => {
                                                  formRef.current?.resetFields();
                                                  setVisible(false);
                                                  actionRef.current?.reload();
                                                  message.success(
                                                      "Role updated successfully"
                                                  );
                                              },
                                              onError: () => {
                                                  message.error(
                                                      "Failed to update Role"
                                                  );
                                              },
                                          }
                                      );
                            }}
                            modalProps={{
                                onCancel: () => [
                                    setVisible(false),
                                    setData(null),
                                ],
                                destroyOnClose: true,
                            }}
                            initialValues={data}
                            width={600}
                        >
                            <ProForm.Group>
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtproles_name"
                                    label="Name"
                                    placeholder="Name"
                                    rules={[{ required: true }]}
                                />

                                <ProFormSelect
                                    width="sm"
                                    name="mgr_gtproles_status"
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
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
