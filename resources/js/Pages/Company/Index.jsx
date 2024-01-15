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

export default function Index({ auth, companies }) {
    return (
        <>
            <Head title="Companies" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Companies",
                        onBack: () => window.history.back(),
                    }}
                    extra={
                        <Space>
                            <Button
                                type="primary"
                                onClick={() =>
                                    router.get(route("company.create"))
                                }
                            >
                                Create
                            </Button>
                        </Space>
                    }
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
                                    <Link href={route("company.edit", { company: record.mgr_gtpcompanies_id })}>
                                        Edit
                                    </Link>
                                ),
                            },
                        ]}
                        rowKey="mgr_gtpcompanies_id"
                    />

                </PageContainer>
            </Authenticated>
        </>
    );
}
