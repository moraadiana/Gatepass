import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageContainer } from "@ant-design/pro-components";
import { Head } from "@inertiajs/react";

export default function Index({ auth, approvallevels }) {
    return (
        <>
            <Head title="Companies" />
            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Companies",
                        onBack: () => window.history.back(),
                    }}
                >
                
                </PageContainer>
            </Authenticated>
        </>
    );
}
