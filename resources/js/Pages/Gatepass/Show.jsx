import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
//import gatepass from /Gatepass/Index;
import {
    PageContainer,
    ProCard,
    ProTable,
    ProForm,
    ProDescriptions,
    ModalForm,
    ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Popconfirm, Space } from "antd";
import { router } from "@inertiajs/react";

export default function Show({ auth, gatepass, user, approval }) {
    console.log(approval);
    //route(gatepass.mgr_gtpgatepass_id)
    return (
        <>
            <Head title="View Gatepass" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "View Gatepass",
                        onBack: () => window.history.back(),
                    }}
                    extra={
                        <Space>
                            <Popconfirm
                                title="Are you sure you want to submit this Gatepass?"
                                onConfirm={async () => {
                                    console.log(gatepass.mgr_gtpgatepass_id);
                                    router.post(
                                        await route(
                                            "gatepass.submitForApproval",
                                            gatepass.mgr_gtpgatepass_id
                                        )
                                    );
                                }}
                            >
                                <Button type="primary">
                                    Submit for Approval
                                </Button>
                            </Popconfirm>
                            {/* <Popconfirm
                                title="Are you sure you want to approve this Gatepass?"
                                onConfirm={async () => {
                                    console.log(gatepass.mgr_gtpgatepass_id);
                                    router.post(route("approval.store"),
                                        {
                                            gatepass_id: gatepass.mgr_gtpgatepass_id,
                                            
                                        }

                                    );
                                }}
                            >
                               
                            </Popconfirm> */}
                            {user.role.mgr_gtpuserroles_name == "User" && (
                                <Space>
                                    <ModalForm
                                        title="Approve Gatepass"
                                        width={400}
                                        trigger={
                                            <Button type="primary">
                                                Approve
                                            </Button>
                                        }
                                        onFinish={async (values) => {
                                            router.post(
                                                route("approval.store"),
                                                {
                                                    ...values,

                                                    approval_id:
                                                        approval.mgr_gtpapprovals_id,

                                                    // gatepass_id:
                                                    //     gatepass.mgr_gtpgatepass_id,
                                                }
                                            );
                                            console.log(approval);
                                        }}
                                    >
                                        <ProFormTextArea
                                            name="comment"
                                            label="Comment"
                                        />
                                    </ModalForm>
                                    <ModalForm
                                        title="Approve Gatepass"
                                        width={400}
                                        trigger={
                                            <Button type="primary" danger>
                                                Reject
                                            </Button>
                                        }
                                        onFinish={async (values) => {}}
                                    >
                                        <ProFormTextArea
                                            name="comment"
                                            label="Comment"
                                        />
                                    </ModalForm>
                                </Space>
                            )}
                        </Space>
                    }
                >
                    <ProDescriptions
                        bordered
                        dataSource={gatepass}
                        column={2}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "mgr_gtpgatepass_name",
                                key: "mgr_gtpgatepass_name",
                            },
                            {
                                title: "Vehicle Reg",
                                dataIndex: "mgr_gtpgatepass_vehiclereg",
                                key: "mgr_gtpgatepass_vehiclereg",
                            },
                            {
                                title: "Company",
                                dataIndex: ["company", "mgr_gtpcompanies_name"],
                                key: "mgr_gtpgatepass_company",
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
                                title: "Item(s) Description",
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
                                title: "Auxilary Doc",
                                dataIndex: "mgr_gtpgatepass_auxilarydoc",
                                key: "mgr_gtpgatepass_auxilarydoc",
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
                                title: "Purpose",
                                dataIndex: "mgr_gtpgatepass_purpose",
                                key: "mgr_gtpgatepass_purpose",
                            },

                            // {
                            //     title: "Created By",
                            //     dataIndex: ["user", "mgr_gtpusers_fname"],
                            //     key: "mgr_gtpgatepass_createdby",
                            // },
                            {
                                title: "Destination",
                                dataIndex: "mgr_gtpgatepass_destination",
                                key: "mgr_gtpgatepass_destination",
                            },
                        ]}
                    />
                </PageContainer>
            </Authenticated>
        </>
    );
}
