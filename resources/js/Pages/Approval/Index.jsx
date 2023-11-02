import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head, Link } from "@inertiajs/react";
//create a function to fetch all gatepasses

export default function Index({ auth, approvals }) {
    console.log(approvals);

    return (
        <Authenticated user={auth.user}>
            <Head title="Approvals" />
            <PageContainer
                header={{
                    title: "Approvals",
                    onBack: () => window.history.back(),
                }}
            >
                <ProTable
                    headerTitle="Submitted Gatepass"
                    dataSource={approvals}
                    columns={[
                        {
                            title: "Gatepass",
                            dataIndex: ["gatepass", "mgr_gtpgatepass_name"],
                        },
                        {
                            title: "Vehicle Reg",
                            dataIndex: [
                                "gatepass",
                                "mgr_gtpgatepass_vehiclereg",
                            ],
                        },
                        {
                            title: "Department",
                            dataIndex: [
                                "gatepass",
                                "department",
                                "mgr_gtpdepartments_name",
                            ],
                        },
                        {
                            title: "Item(s) Description",
                            dataIndex: [
                                "gatepass",
                                "mgr_gtpgatepass_description",
                            ],
                        },
                        {
                            title: "Quantity",
                            dataIndex: ["gatepass", "mgr_gtpgatepass_quantity"],
                        },
                        {
                            title: "UOM",
                            dataIndex: ["gatepass", "uom", "mgr_gtpuoms_name"],
                        },
                        {
                            title: "Auxilary Document",
                            dataIndex: [
                                "gatepass",
                                "mgr_gtpgatepass_auxilarydoc",
                            ],
                        },
                        {
                            title: "Purpose",
                            dataIndex: ["gatepass", "mgr_gtpgatepass_purpose"],
                        },
                        {
                            title: "Source Location",
                            dataIndex: [
                                "gatepass",
                                "source_location",
                                "mgr_gtplocations_name",
                            ],
                        },
                        {
                            title: "Destination Location",
                            dataIndex: [
                                "gatepass",
                                "destination_location",
                                "mgr_gtplocations_name",
                            ],
                        },
                        {
                            title: "Destination",
                            dataIndex: [
                                "gatepass",
                                "mgr_gtpgatepass_destination",
                            ],
                        },
                        {
                            title: "Actions",
                            // create a link to go to gatepass.show
                            render: (_, record) => (
                                <Link
                                    href={route(
                                        "gatepass.show",
                                        record.gatepass.mgr_gtpgatepass_id
                                    )}
                                >
                                    View
                                </Link>
                            ),
                        },

                        //create a link to view created gatepass
                    ]}
                    rowKey="mgr_gtpapprovals_id"
                />
            </PageContainer>
        </Authenticated>
    );
}
