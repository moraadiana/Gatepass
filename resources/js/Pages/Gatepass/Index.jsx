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
                                title: "Name",
                                dataIndex: "mgr_gtpgatepass_name",
                            },
                            {
                                title: "Vehicle Reg",
                                dataIndex: "mgr_gtpgatepass_vehiclereg",
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
                                title: "Item(s) Descripton",
                                dataIndex: "mgr_gtpgatepass_description",
                                hideInSearch: true,
                            },
                            {
                                title: " Quantity",
                                dataIndex: "mgr_gtpgatepass_quantity",
                                hideInSearch: true,
                            },
                            {
                                title: "UOM",
                                dataIndex: "mgr_gtpgatepass_uom",
                            },
                            {
                                title: "Auxilary Document",
                                dataIndex: "mgr_gtpgatepass_auxilarydoc",
                            },
                            {
                                title: "Purpose",
                                dataIndex: "mgr_gtpgatepass_purpose",
                                hideInSearch: true,
                            },
                            {
                                title: "Source Location",
                                dataIndex: [
                                    "source_location",
                                    "mgr_gtplocations_name",
                                ],
                                hideInSearch: true,
                            },
                            {
                                title: "Destination Location",
                                dataIndex: [
                                    "destination_location",
                                    "mgr_gtplocations_name",
                                ],
                                hideInSearch: true,
                            },

                            {
                                title: "Specific Destination",
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
                            {
                                title: "Actions",
                                render: (_, record) => (
                                    <Link
                                        href={route(
                                            "gatepass.edit",
                                            record.mgr_gtpgatepass_id
                                        )}
                                    >
                                        Edit
                                    </Link>
                                ),
                            },
                            //create button to submit a gatepass request
                            




                            
                        ]}
                        rowKey="mgr_gtpgatepass_id"
                      
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
}
