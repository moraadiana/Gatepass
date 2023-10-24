import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";

export default function Index({ auth, approvals }) {
    return (
        <>
            <Head title="Approvals" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Gatepass Approvals",
                        onBack: () => window.history.back(),
                    }}
                >
                
                </PageContainer>
            </Authenticated>
        </>
    );
}
