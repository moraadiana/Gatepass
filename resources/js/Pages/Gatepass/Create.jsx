import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormList,
    ProFormSelect,
    ProFormText,
    ProList,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Create({ auth, departments, locations, uoms }) {
    //console.log(gatepass);
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
                                    label="Name"
                                    placeholder="Name"
                                    rules={[{ required: true }]}
                                    // auto toUppercase
                                    normalize={(value) => value.toUpperCase()}
                                />
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_vehiclereg"
                                    label="Vehicle Reg"
                                    placeholder="Vehicle Reg"
                                    normalize={(value) => value.toUpperCase()}
                                    rules={[{ required: true }]}
                                />
                                {/* <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_company"
                                    label="Company"
                                    placeholder="Company"
                                    rules={[{ required: true }]}
                                /> */}
                                {/* <ProFormSelect
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
                                /> */}
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
                                    label="Specific Destination"
                                    placeholder="Specific Destination"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_purpose"
                                    label="Purpose"
                                    placeholder="Purpose"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />

                                <ProFormText
                                    width="sm"
                                    name="mgr_gtpgatepass_auxilarydoc"
                                    label="Auxilary Doc"
                                    placeholder="Auxilary Doc"
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
                                />
                            </ProForm.Group>

                            <ProFormList
                                name="items"
                                label="Items"
                                rules={[{ required: true }]}
                                min={1}
                                initialValue={[{}]}
                            >
                                <ProForm.Group>
                                    <ProFormText
                                        width="sm"
                                        name="mgr_gtpitems_description"
                                        label="Item Description"
                                        placeholder="Item Description"
                                        normalize={(value) => value.toUpperCase()}
                                        rules={[{ required: true }]}
                                    />
                                    <ProFormText
                                        width="sm"
                                        name="mgr_gtpitems_code"
                                        label="Item Code"
                                        placeholder="Item Code"
                                        rules={[{ required: true }]}
                                        normalize={(value) => value.toUpperCase()}
                                    />
                                    <ProFormText
                                        width="sm"
                                        name="mgr_gtpitems_quantity"
                                        label="Quantity"
                                        placeholder="Quantity"
                                        rules={[
                                            { required: true },
                                            {
                                                pattern: /^[0-9]+$/,
                                                message:
                                                    "Quantity must be a number",
                                            },
                                        ]}
                                        fieldProps={{
                                            type: "number",
                                        }}
                                        //should be number
                                        type="number"
                                    />
                                    <ProFormSelect
                                        width="xs"
                                        name="mgr_gtpitems_uom"
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
                                </ProForm.Group>
                            </ProFormList>
                        </ProForm>
                    </ProCard>
                </PageContainer>
            </Authenticated>
        </>
    );
}
