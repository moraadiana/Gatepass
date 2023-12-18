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

export default function Index({ auth, roles }) {
    return (
        <>
            <Head title="Roles" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Roles",
                        onBack: () => window.history.back(),
                    }}
                    extra={
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => router.get(route("role.create"))}
                            >
                                Add Role
                            </Button>
                        </Space>
                    }
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
                                            return <Tag color="green">Active</Tag>;
                                        } else {
                                            return <Tag color="red">Inactive</Tag>;
                                        }
                                        
                                    }
                                    
                                }
                            ]}
                        />
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
