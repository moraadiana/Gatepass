import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea,
} from "@ant-design/pro-components";
import { Head, Link, router } from "@inertiajs/react";

import { Space, Button, Tag } from "antd";

export default function Index({ auth, users }) {
    //console.log(users);
    return (
        <>
            <Head title="Users" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Users",
                        onBack: () => window.history.back(),
                    }}
                    extra={
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => router.get(route("user.create"))}
                            >
                                Add User
                            </Button>
                        </Space>
                    }
                >
                    <ProCard>
                        <ProTable
                            headerTitle="Users"
                            dataSource={users?.data}
                            request={async (params) => {
                                params.page = params.current;
                                delete params?.current;
                                router.reload({
                                    only: ["users"],
                                    data: params,
                                });
                                return {
                                    data: users?.data,
                                    success: true,
                                    total: users?.total,
                                };
                            }}
                            columns={[
                                {
                                    title: "Emp No",
                                    dataIndex: "mgr_gtpusers_empno",
                                },
                                {
                                    title: "First Name",
                                    dataIndex: "mgr_gtpusers_fname",
                                },
                                {
                                    title: "LName",
                                    dataIndex: "mgr_gtpusers_lname",
                                },

                                {
                                    title: "Email",
                                    dataIndex: "mgr_gtpusers_email",
                                },

                                {
                                    title: "Department",
                                    dataIndex: [
                                        "department",
                                        "mgr_gtpdepartments_name",
                                    ],
                                },
                                {
                                    title: "Status",
                                    dataIndex: "mgr_gtpusers_status",

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
                                //link to edit user
                                {
                                    title: "Action",
                                    dataIndex: "mgr_gtpusers_id",
                                    render: (_, record) => (
                                        <Link
                                            href={route(
                                                "user.edit",
                                                record?.mgr_gtpusers_id
                                            )}
                                        >
                                            Edit
                                        </Link>
                                    ),
                                },
                            ]}
                            pagination={{
                                pageSize: 10,
                                total: users?.total,
                            }}
                            //search={true}

                            //return what is being searched in the search bar

                            rowKey="mgr_gtpusers_id"
                        />
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
