import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";

export default function Index({ auth, gatepasses }) {
    return (
        <>
            <Head title="All gatepasses" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Gatepass",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProTable
                        headerTitle="Gatepass"
                        dataSource={gatepasses}
                        columns={[
                            {
                                title: "Title",
                                dataIndex: "mgr_gtpgatepass_name",
                            },
                            {
                                title: "Purpose",
                                dataIndex: "mgr_gtpgatepass_purpose",
                                hideInSearch: true,
                            },
                            {
                                title: "Destination",
                                dataIndex: "mgr_gtpgatepass_destination",
                                hideInSearch: true,
                            },
                        ]}
                        rowKey="mgr_gtpgatepass_id"
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
}
