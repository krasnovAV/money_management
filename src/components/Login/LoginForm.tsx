import React, {FC} from 'react';
import {Button, Form, Input} from 'antd';

type LoginFormData = {
    email: string,
    password: string,
}
type PropsType = {
    title: string,
    submit: (email: string, password: string) => void,
}

export const LoginForm: FC<PropsType> = ({title,submit} ) => {

    const onFinish = (values: LoginFormData) => {
        submit(values.email, values.password);
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input your email!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="default" htmlType="submit">
                    {title}
                </Button>
            </Form.Item>
        </Form>
    );
};

