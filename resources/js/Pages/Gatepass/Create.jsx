import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Create({ auth, departments, locations, uoms }) {
    console.log(departments);
    return (
        <>
            <Head title="Create Gatepass" />

            <Authenticated user={auth.user}>
                <PageContainer
                    header={{
                        title: "Create Gatepass",
                        onBack: () => window.history.back(),
                    }}
                >
                    <ProCard>
                        <ProForm
                            onFinish={async (values) => {
                                router.post(route("gatepass.store"), {
                                    ...values,
                                    mgr_gtpgatepass_createdby:
                                        auth.user.mgr_gtpusers_id,
                                });
                            }}
                        >
                            <ProForm.Group>
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_name"
                                    label="Title"
                                    placeholder="Title"
                                    rules={[{ required: true }]}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_vehiclereg"
                                    label="Vehicle Reg"
                                    placeholder="Vehicle Reg"
                                    rules={[{ required: true }]}
                                />
                                 <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpgatepass_department"
                                    label="Department"
                                    placeholder="Department"
                                    rules={[{ required: true }]}
                                    options={departments.map((department) => {
                                        return {
                                            label: department.mgr_gtpdepartments_name,
                                            value: department.mgr_gtpdepartments_id,
                                        };
                                    })}
                                />
                               
                                
                            </ProForm.Group>
                            <ProForm.Group>
                            <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_auxilarydoc"
                                    label="Auxilary Doc"
                                    placeholder="Auxilary Doc"
                                    rules={[{ required: true }]}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_description"
                                    label="Description"
                                    placeholder="Description"
                                    rules={[{ required: true }]}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_quantity"
                                    label="Quantity"
                                    placeholder="Quantity"
                                    rules={[{ required: true }]}
                                />
                                 <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpgatepass_uom"
                                    label="UOM"
                                    placeholder="UOM"
                                    rules={[{ required: true }]}
                                    options={uoms.map((uom) => {
                                        return {
                                            label: uom.mgr_gtpuoms_name,
                                            value: uom.mgr_gtpuoms_id,
                                        };
                                    })}
                                />
                               
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_purpose"
                                    label="Purpose"
                                    placeholder="Purpose"
                                    rules={[{ required: true }]}
                                />
                               
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpgatepass_sourcelocation"
                                    label="Source Location"
                                    placeholder="Source Location"
                                    rules={[{ required: true }]}
                                    options={locations.map((location) => {
                                        return {
                                            label: location.mgr_gtplocations_name,
                                            value: location.mgr_gtplocations_id,
                                        };
                                    })}
                                />
                                <ProFormSelect
                                    width="sm"
                                    name="mgr_gtpgatepass_destinationlocation"
                                    label="Destination Location"
                                    placeholder="Destination Location"
                                    rules={[{ required: true }]}
                                    options={locations.map((location) => {
                                        return {
                                            label: location.mgr_gtplocations_name,
                                            value: location.mgr_gtplocations_id,
                                        };
                                    })}
                                />
                                 <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_destination"
                                    label="Destination"
                                    placeholder="Specific Destination"
                                    rules={[{ required: true }]}
                                />
                               
                            </ProForm.Group>
                        </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
