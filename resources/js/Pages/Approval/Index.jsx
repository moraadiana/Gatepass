import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head, Link } from "@inertiajs/react";
//create a function to fetch all gatepasses

export default function Index({ auth, gatepasses, approvals }) {
    console.log(gatepasses);

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
                       
                        //create a link to view created gatepass
                    ]}
                    rowKey="mgr_gtpapprovals_id"
                />
            </PageContainer>
        </Authenticated>
    );
}
