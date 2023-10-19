import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    useEffect(() => {
        if (data.email) {
            submit();
        }
    }, [data]);

    const submit = (e) => {
        // e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <LoginForm
                title="Create your account"
                subTitle="Please enter your credentials to proceed"
                onFinish={async (values) => {
                    setData(values);
                }}
            >
                <ProFormText
                    name="name"
                    label="Name"
                    fieldProps={{
                        size: "large",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your name!",
                        },
                    ]}
                    validateStatus={errors.name && "error"}
                    help={errors.name}
                />
                <ProFormText
                    name="email"
                    label="Email"
                    fieldProps={{
                        size: "large",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email!",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email!",
                        },
                    ]}
                    validateStatus={errors.email && "error"}
                    help={errors.email}
                />
                <ProFormText.Password
                    name="password"
                    label="Password"
                    fieldProps={{
                        size: "large",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password!",
                        },
                    ]}
                    validateStatus={errors.password && "error"}
                    help={errors.password}
                />
                <ProFormText.Password
                    name="password_confirmation"
                    label="Confirm Password"
                    fieldProps={{
                        size: "large",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                    validateStatus={errors.password_confirmation && "error"}
                    help={errors.password_confirmation}
                />
            </LoginForm>
        </GuestLayout>
    );
}
