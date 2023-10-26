import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProCard, ProTable } from "@ant-design/pro-components";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, gatepasses }) {
    console.log(gatepasses);
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
                                title: "Department",
                                dataIndex: [
                                    "department",
                                    "mgr_gtpdepartments_name",
                                ],
                                hideInSearch: true,
                            },
                            {
                                title: "Source Location",
                                dataIndex: "mgr_gtpgatepass_sourcelocation",
                                hideInSearch: true,
                            },
                            {
                                title: "Destination Location",
                                dataIndex:
                                    "mgr_gtpgatepass_destinationlocation",
                                hideInSearch: true,
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
                            {
                                title: "Actions",
                                render: (_, record) => (
                                    <Link
                                        href={route(
                                            "gatepass.show",
                                            record.mgr_gtpgatepass_id
                                        )}
                                    >
                                        View Details
                                    </Link>
                                ),
                            },
                        ]}
                        rowKey="mgr_gtpgatepass_id"
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
}
