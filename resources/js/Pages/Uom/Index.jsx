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

export default function Index({ auth, uoms }) {
    const actionRef = useRef();
    const formRef = useRef();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    return (
        <>
            <Head title="Uoms" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Uoms",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProCard>
                        <ProTable
                            headerTitle="Uoms"
                            dataSource={uoms}
                            columns={[
                                {
                                    title: "Uoms Name",
                                    dataIndex: "mgr_gtpuoms_name",
                                },
                                {
                                    title: "status",
                                    dataIndex: "mgr_gtpuoms_status",
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
                                defaultPageSize: 5,
                                total: uoms?.total,
                            }}
                            toolBarRender={() => [
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setVisible(true);
                                    }}
                                >
                                    Add New
                                </Button>,
                            ]}
                            rowKey={"mgr_gtpuoms_id"}
                            search={false}
                        />

                        <ModalForm
                            title={data ? "Edit Uom" : "Create Uom"}
                            open={visible}
                            onOpenChange={setVisible}
                            formRef={formRef}
                            onFinish={async (values) => {
                                !data
                                    ? router.post(route("uom.store"),
                                     values, {
                                          onSuccess: () => {
                                              formRef.current?.resetFields();
                                              setVisible(false);
                                              actionRef.current?.reload();
                                              message.success(
                                                  "Uom created successfully"
                                              );
                                          },
                                          onError: () => {
                                            message.error("Something went wrong");
                                        },
                                    }
                                          )
                                    : router.put(
                                          route(
                                              "uom.update",
                                              data?.mgr_gtpuoms_id
                                          ),
                                          values,
                                          {
                                              onSuccess: () => {
                                                  formRef.current?.resetFields();
                                                  setVisible(false);
                                                  actionRef.current?.reload();
                                                  message.success(
                                                      "Uom updated successfully"
                                                  );
                                              },
                                              onError: () => {
                                                  message.error(
                                                      "Failed to update Uom"
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
                                    name="mgr_gtpuoms_name"
                                    label="Name"
                                    placeholder="Name"
                                    rules={[{ required: true }]}
                                />

                                <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpuoms_status"
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
