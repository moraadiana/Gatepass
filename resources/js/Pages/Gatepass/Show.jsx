import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
//import gatepass from /Gatepass/Index;
import {
    PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
} from "@ant-design/pro-components";

export default function Show({ auth, gatepass }) {
    console.log(gatepass);
    //route(gatepass.mgr_gtpgatepass_id)
    return (
        <>
            <Head title="View Gatepass" />
            <Authenticated user={auth.user}>
                <ProDescriptions
                    bordered
                    dataSource={gatepass}
                    column={2}
                    columns={[
                        {
                            title: "Created By",
                            dataIndex: ["user", "mgr_gtpusers_fname"],
                            key: "mgr_gtpgatepass_createdby",
                        },
                        {
                            title: "title",
                            dataIndex: "mgr_gtpgatepass_name",
                            key: "mgr_gtpgatepass_name",
                        },
                        {
                            title: "Department",
                            dataIndex: [
                                "department",
                                "mgr_gtpdepartments_name",
                            ],
                            key: "mgr_gtpgatepass_department",
                        },
                        {
                            title: "Auxilary Doc",
                            dataIndex: "mgr_gtpgatepass_auxilarydoc",
                            key: "mgr_gtpgatepass_auxilarydoc",
                        },
                        {
                            title: "Description",
                            dataIndex: "mgr_gtpgatepass_description",
                            key: "mgr_gtpgatepass_description",
                        },

                        {
                            title: "Quantity",
                            dataIndex: "mgr_gtpgatepass_quantity",
                            key: "mgr_gtpgatepass_quantity",
                        },
                        {
                            title: "UOM",
                            dataIndex: ["uom", "mgr_gtpuoms_name"],
                            key: "mgr_gtpgatepass_uom",
                        },
                        {
                            title: "Purpose",
                            dataIndex: "mgr_gtpgatepass_purpose",
                            key: "mgr_gtpgatepass_purpose",
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
                    ]}
                />
            </Authenticated>
        </>
    );
}
