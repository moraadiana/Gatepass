import { useEffect, useRef, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { LoginForm } from "@ant-design/pro-components";
import { UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-form";

const Login = ({}) => {
    const { errors } = usePage().props;
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Head title="Login" />
            <LoginForm
                logo="../../assets/bulkstream-logo-small.png"
                subTitle="Sign in to your account"
                onFinish={async (values) => {
                    router.post(route("login"), values, {
                        onStart: () => {
                            setLoading(true);
                        },
                        onSuccess: () => {
                            setLoading(false);
                        },
                        onError: () => {
                            setLoading(false);
                        },
                    });
                }}
                loading={loading}
            >
                <ProFormText
                    name="mgr_gtpusers_email"
                    label="Email"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined />,
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
                    hasFeedback
                    validateStatus={errors.mgr_gtpusers_email && "error"}
                    help={errors.mgr_gtpusers_email}
                />
                <ProFormText.Password
                    name="password"
                    label="Password"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined />,
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password!",
                        },
                    ]}
                />
            </LoginForm>
        </>
    );
};

Login.layout = (page) => <GuestLayout children={page} />;
export default Login;
