import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";
//create a function to fetch all gatepasses

export default function Index({ auth, approvals }) {
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
                    headerTitle="Approvals"
                    dataSource={approvals}
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
                                "mgr_gtpgatepass_department",
                            ],
                            key: "mgr_gtpgatepass_department",
                        }

                    ]}
                    


                />
            </PageContainer>
        </Authenticated>
    );
                }