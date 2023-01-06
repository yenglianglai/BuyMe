import { Modal, Form, Input, Space, Button, Select } from 'antd'
import { useState } from 'react'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
}

const EditAccModal = ({ user, item, open, onCreate, onCancel }) => {
    const [form] = Form.useForm()
    return (
        <Modal
            open={open}
            title="Edit Account Details"
            okText="Save Changes"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()

                    .then((values) => {
                        form.resetFields()
                        onCreate(values)
                    })
                    .catch((e) => {
                        window.alert(e)
                    })
            }}
        >
            <Form {...layout} name="nest-messages" form={form}>
                {item === 'name' ? (
                    <Form.Item name={['user', item]} label="Name">
                        <Input placeholder={user.item} />
                    </Form.Item>
                ) : (
                    <>
                        <b>Bank Account</b>
                        <Form.Item name={['user', 'bank_id']} label="Bank id">
                            <Select
                                style={{
                                    width: 155,
                                }}
                                options={[
                                    {
                                        value: '812',
                                        label: '812 台新銀行',
                                    },
                                    {
                                        value: '822',
                                        label: '822 中國信託',
                                    },
                                    {
                                        value: '007',
                                        label: '007 第一銀行',
                                    },
                                    {
                                        value: '012',
                                        label: '012 台北富邦',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'bankaccount_id']}
                            label="Bank Account id"
                        >
                            <Input placeholder={user.item} />
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    )
}

export default EditAccModal
