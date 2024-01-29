import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    PageContainer,
    ProCard,
    ProForm,
    ProFormList,
    ProFormSelect,
    ProFormText,
} from "@ant-design/pro-components";
import { Head, router } from "@inertiajs/react";

export default function Edit({ auth, gatepass, departments, locations, uoms }) {
    return (
        <>
            <Head title="Edit Gatepass" />
            <Authenticated user={auth.user}>
                <ProCard>
                    <ProForm
                        onFinish={async (values) => {
                            router.put(
                                route(
                                    "gatepass.update",
                                    gatepass.mgr_gtpgatepass_id
                                ),
                              values,
                              
                            );
                        }}
                        initialValues={gatepass}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="sm"
                                name="mgr_gtpgatepass_name"
                                label="Title"
                                placeholder="Title"
                                rules={[{ required: true }]}
                                normalize={(value) => value.toUpperCase()}
                            />
                            <ProFormText
                                width="sm"
                                name="mgr_gtpgatepass_vehiclereg"
                                label="Vehicle Reg"
                                placeholder="Vehicle Reg"
                                rules={[{ required: true }]}
                                normalize={(value) => value.toUpperCase()}
                            />
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
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                width="sm"
                                name="mgr_gtpgatepass_auxilarydoc"
                                label="Auxilary Doc"
                                placeholder="Auxilary Doc"
                                rules={[{ required: true }]}
                                normalize={(value) => value.toUpperCase()}
                            />
                            <ProFormText
                                width="sm"
                                name="mgr_gtpgatepass_purpose"
                                label="Purpose"
                                placeholder="Purpose"
                                rules={[{ required: true }]}
                                normalize={(value) => value.toUpperCase()}
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
                                    rules={[{ required: true }]}
                                    normalize={(value) => value.toUpperCase()}
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
                                    rules={[{ required: true }]}
                                    
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
            </Authenticated>
        </>
    );
}
