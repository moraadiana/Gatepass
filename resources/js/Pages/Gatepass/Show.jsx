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
import { Button, Popconfirm, Space, message } from "antd";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ auth, gatepass, user, approval }) {
    const [loading, setLoading] = useState(false);
    const [approveVisible, setApproveVisible] = useState(false);
    const [rejectVisible, setRejectVisible] = useState(false);

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
                                    //console.log(gatepass.mgr_gtpgatepass_id);
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

                            {
                                <Space>
                                    <ModalForm
                                        title="Approve Gatepass"
                                        width={400}
                                        trigger={
                                            <Button type="primary">
                                                Approve
                                            </Button>
                                        }
                                        loading={loading}
                                        open={approveVisible}
                                        onOpenChange={setApproveVisible}
                                        //on clicking approve button store the data and comment in approval
                                        onFinish={async (values) => {
                                            setLoading(true);
                                            router.post(
                                                route(
                                                    "gatepass.gatepassApproval",
                                                    gatepass.mgr_gtpgatepass_id
                                                ),
                                                {
                                                    ...values,
                                                    status: 1,
                                                },
                                                {
                                                    onSuccess: () => {
                                                        setLoading(false);
                                                        setApproveVisible(
                                                            false
                                                        );
                                                        message.success(
                                                            "Gatepass approved successfully"
                                                        );
                                                    },
                                                    onError: (errors) => {
                                                        setLoading(false);
                                                        setApproveVisible(
                                                            false
                                                        );
                                                        message.error(
                                                            "Error approving gatepass"
                                                        );
                                                    },
                                                }
                                            );
                                            // close modal form
                                        }}
                                    >
                                        <ProFormTextArea
                                            name="comment"
                                            label="Comment"
                                        />
                                    </ModalForm>
                                    <ModalForm
                                        title="Reject Gatepass"
                                        width={400}
                                        loading={loading}
                                        open={rejectVisible}
                                        onOpenChange={setRejectVisible}
                                        trigger={
                                            <Button type="primary" danger>
                                                Reject
                                            </Button>
                                        }
                                        onFinish={async (values) => {
                                            setLoading(true);
                                            router.post(
                                                route(
                                                    "gatepass.gatepassApproval",
                                                    gatepass.mgr_gtpgatepass_id
                                                ),
                                                {
                                                    ...values,
                                                    status: 0,
                                                },
                                                {
                                                    onSuccess: () => {
                                                        setLoading(false);
                                                        setRejectVisible(false);
                                                        message.success(
                                                            "Gatepass rejected successfully"
                                                        );
                                                    },
                                                    onError: () => {
                                                        setLoading(false);
                                                        setRejectVisible(false);
                                                        message.error(
                                                            "Error rejecting gatepass"
                                                        );
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        <ProFormTextArea
                                            name="comment"
                                            label="Comment"
                                        />
                                    </ModalForm>
                                </Space>
                            }
                        </Space>
                    }
                >
                    <ProCard>
                        <ProDescriptions
                            size="small"
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
                                // {
                                //     title: "Company",
                                //     dataIndex: ["company", "mgr_gtpcompanies_name"],
                                //     key: "mgr_gtpgatepass_company",
                                // },

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

                        <ProTable
                            headerTitle="Item Details"
                            dataSource={gatepass.items}
                            columns={[
                                {
                                    title: "Name",
                                    dataIndex: "mgr_gtpitems_description",
                                    key: "mgr_gtpitems_description",
                                },
                                {
                                    title: "Code",
                                    dataIndex: "mgr_gtpitems_code",
                                    key: "mgr_gtpitems_code",
                                },
                                {
                                    title: "Quantity",
                                    dataIndex: "mgr_gtpitems_quantity",
                                    key: "mgr_gtpitems_quantity",
                                },
                                {
                                    title: "UOM",
                                    dataIndex: "mgr_gtpitems_uom",
                                    key: "mgr_gtpitems_uom",
                                },
                            ]}
                            search={false}
                            pagination={false}
                            options={false}
                            ghost
                            size="small"
                            rowKey="mgr_gtpitems_id"
                        />
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
