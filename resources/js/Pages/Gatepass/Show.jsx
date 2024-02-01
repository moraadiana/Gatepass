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
import { Button, Popconfirm, Space, message, Tag, Timeline } from "antd";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
    CloseCircleOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

export default function Show({ auth, gatepass, currUser, approvals, uom }) {
    const [loading, setLoading] = useState(false);
    const [approveVisible, setApproveVisible] = useState(false);
    const [rejectVisible, setRejectVisible] = useState(false);
    //get role of current user
    const userRole = currUser;
 
    return (
        <>
            <Head title="View Gatepass" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "View Gatepass",
                        onBack: () => window.history.back(),
                        tags: (
                            <Tag
                                color={
                                    gatepass.mgr_gtpgatepass_status === 1
                                        ? "green"
                                        : gatepass.mgr_gtpgatepass_status === 0
                                        ? "red"
                                        : "blue"
                                }
                            >
                                {gatepass.mgr_gtpgatepass_status === 1
                                    ? "Approved"
                                    : gatepass.mgr_gtpgatepass_status === 0
                                    ? "Rejected"
                                    : gatepass.mgr_gtpgatepass_status === 3
                                    ? "Draft"
                                    : "Pending"}
                            </Tag>
                        ),
                    }}
                    extra={
                        //if user is requester show submit for approval button

                        <Space>
                            {
                                // button for editting the gatepass
                                gatepass.mgr_gtpgatepass_status === 3 && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            router.get(
                                                route(
                                                    "gatepass.edit",
                                                    gatepass.mgr_gtpgatepass_id
                                                )
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </Button>
                                )
                            }
                            {gatepass.mgr_gtpgatepass_status === 3 && (
                                <Popconfirm
                                    title="Are you sure you want to submit this Gatepass?"
                                    onConfirm={async () => {
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
                            )}
                            {gatepass.mgr_gtpgatepass_status === 2 &&
                                gatepass.mgr_gtpgatepass_createdby !==
                                    auth.user.mgr_gtpusers_id &&
                                !gatepass.approvals.some(
                                    (approval) =>
                                        approval.mgr_gtpapprovals_approvedby ==
                                        auth.user.mgr_gtpusers_id
                                ) &&
                                //The current user cannot approve twice. Hide the buttons if an approval record exists that is not pending

                                userRole.roles.some((role) => {
                                    return (
                                        role.mgr_gtproles_id ===
                                        gatepass.approvals.filter(
                                            (approval) =>
                                                approval.mgr_gtpapprovals_status ===
                                                2
                                        )[0]?.approval_level?.role
                                            ?.mgr_gtproles_id
                                    );
                                }) && (
                                    //if user is not equal to mgr_gtpapprovals_approvedby show approve button and reject button for approver level
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
                                                            window.history.back();
                                                        },
                                                        onError: () => {
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
                                                            setRejectVisible(
                                                                false
                                                            );
                                                            message.success(
                                                                "Gatepass rejected successfully"
                                                            );
                                                        },
                                                        onError: () => {
                                                            setLoading(false);
                                                            setRejectVisible(
                                                                false
                                                            );
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
                                )}
                            <Space>
                                {gatepass.mgr_gtpgatepass_status === 1 && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            //open gatepass.print as a pdf file in new tab
                                            window.open(
                                                route(
                                                    "gatepass.print",
                                                    gatepass.mgr_gtpgatepass_id
                                                ),
                                                "_blank"
                                            );

                                            //window.open(route("gatepass.print", gatepass.mgr_gtpgatepass_id), "_blank");
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPrint} />
                                    </Button>
                                )}
                            </Space>
                        </Space>
                    }
                >
                    <ProCard
                        tabs={{
                            type: "card",
                        }}
                    >
                        <ProCard.TabPane key="1" tab="Details">
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
                                        dataIndex:
                                            "mgr_gtpgatepass_auxilarydoc",
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
                                        dataIndex:
                                            "mgr_gtpgatepass_destination",
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
                                        //return uom name
                                        dataIndex: ["uom", "mgr_gtpuoms_name"],
                                    },
                                ]}
                                search={false}
                                pagination={false}
                                options={false}
                                ghost
                                size="small"
                                rowKey="mgr_gtpitems_id"
                            />
                        </ProCard.TabPane>
                        <ProCard.TabPane key="2" tab="Approvals">
                            <Timeline
                                mode="left"
                                items={gatepass.approvals.map((approval) => ({
                                    children: (
                                        <>
                                            <Tag
                                                color={
                                                    approval.mgr_gtpapprovals_status ===
                                                    1
                                                        ? "green"
                                                        : approval.mgr_gtpapprovals_status ===
                                                          0
                                                        ? "red"
                                                        : "blue"
                                                }
                                            >
                                                {approval.mgr_gtpapprovals_status ===
                                                1
                                                    ? "Approved"
                                                    : approval.mgr_gtpapprovals_status ===
                                                      0
                                                    ? "Rejected"
                                                    : "Pending"}
                                            </Tag>
                                            <Space
                                                style={{
                                                    fontWeight: "bold",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                {
                                                    approval.approval_level.role
                                                        .mgr_gtproles_name
                                                }
                                            </Space>
                                            <Space>
                                                {approval.mgr_gtpapprovals_status !==
                                                    2 &&
                                                    `(${approval?.user?.mgr_gtpusers_fname} ${approval?.user?.mgr_gtpusers_lname})`}
                                            </Space>
                                            <div>
                                                <Space>
                                                    Remarks:
                                                    {
                                                        approval.mgr_gtpapprovals_comment
                                                    }
                                                </Space>
                                            </div>
                                        </>
                                    ),
                                    dot:
                                        approval.mgr_gtpapprovals_status ===
                                        1 ? (
                                            <CheckCircleOutlined />
                                        ) : approval.mgr_gtpapprovals_status ===
                                          0 ? (
                                            <CloseCircleOutlined />
                                        ) : (
                                            <ClockCircleOutlined />
                                        ),
                                    label: approval.updated_at,
                                }))}
                            />
                        </ProCard.TabPane>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
