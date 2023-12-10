import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head, Link } from "@inertiajs/react";

export default function show({ auth, gatepass, approvals }) {
    
    return (
        <>
            <Head title="Approvals" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Approvals",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProTable
                        headerTitle="Submitted Gatepass"
                        dataSource={gatepass}
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
                                        "mgr_gtpdepartments_name",],
                                hideInSearch: true,
                            },
                            {
                                title: "Item(s) Description",
                                dataIndex: "mgr_gtpgatepass_description",
                                hideInSearch: true,
                            },
                            {
                                title: "Quantity",
                                dataIndex: [ "mgr_gtpgatepass_quantity"],
                            },
                            {
                                title: "UOM",
                                dataIndex: ["mgr_gtpgatepass_uom"],
                            },
                            {
                                title: "Auxilary Document",
                                dataIndex: [
                                    "mgr_gtpgatepass_auxilarydoc",
                                ],
                            },
                            {
                                title: "Purpose",
                                dataIndex: [ "mgr_gtpgatepass_purpose"],
                            },
                            {
                                title: "Source Location",
                                dataIndex: [
                                    "source_location",
                                    "mgr_gtplocations_name",
                                ],
                            },
                            {
                                title: "Destination Location",
                                dataIndex: [
                                
                                    "destination_location",
                                    "mgr_gtplocations_name",
                                ],
                            },
                            {
                                title: "Destination",
                                dataIndex: [
                                    "mgr_gtpgatepass_destination",
                                ],
                            }]}
                        rowKey="mgr_gtpgatepass_id"
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
                        

                    }
                        