import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";

export default function Index({ auth, approvallevels }) {
    return (
        <>
            <Head title="Approval levels" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Gatepass Approval levels",
                        onBack: () => window.history.back(),
                    }}
                >
                
                </PageContainer>
            </Authenticated>
        </>
    );
}
