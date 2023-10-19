import { useEffect, useRef } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoginForm } from "@ant-design/pro-components";
import { UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-form";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        mgr_gtpusers_email: null,
        mgr_gtpusers_password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);
    useEffect(() => {
        if (data.mgr_gtpusers_email) {
            submit();
        }
    }, [data]);

    const submit = (e) => {
        // e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <LoginForm
                title="Sign in to your account"
                subTitle="Please enter your credentials to proceed"
                onFinish={async (values) => {
                    setData(values);
                }}
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
        </GuestLayout>
    );
}
