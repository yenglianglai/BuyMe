import { Modal, Form, Input, Space, Button } from 'antd'
import { useState } from 'react'

const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 10,
    },
}

const ChangePwdModal = ({ user_id, open, onCreate, onCancel }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordCheck, setNewPasswordCheck] = useState('')

    const [form] = Form.useForm()

    return (
        <Modal
            open={open}
            title="Change Password"
            okText="Save Changes"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields()
                        // console.log(values)
                        onCreate(values)
                    })
                    .catch((e) => {
                        window.alert(e)
                    })
            }}
        >
            <Form {...layout} name="nest-messages" form={form}>
                <Form.Item
                    name={['user', 'currentpassword']}
                    label="Current Password"
                    rules={[
                        {
                            required: true,
                            message:
                                'Error: Please enter the current password!',
                        },
                    ]}
                >
                    <Input.Password
                        value={currentPassword}
                        placeholder="Current Password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name={['user', 'newpassword']}
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please enter the new password!',
                        },
                    ]}
                >
                    <Input.Password
                        value={newPassword}
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name={['user', 'newpasswordcheck']}
                    label="Retype New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Error: Please retype new password!',
                        },
                    ]}
                >
                    <Input.Password
                        value={newPasswordCheck}
                        placeholder="Retype New Password"
                        onChange={(e) => setNewPasswordCheck(e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChangePwdModal
