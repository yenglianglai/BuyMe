import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Input, Layout, Space, List, Card, Divider, Button } from 'antd'
import { useApp } from '../UseApp'
import { instance } from '../api'
import { useLocation } from 'react-router-dom'

const { Header, Content } = Layout
const { Search } = Input

function Transfer({ collapsed, setCollapsed }) {
    const { status, setStatus } = useApp()
    const [id, setId] = useState()
    const [idList, setIdList] = useState([])
    const [qrCode, setQrCode] = useState('')
    const location = useLocation()
    // const receiverID = location.state.receiverID;

    useEffect(() => {
        if (location.state) {
            const receiverObjID = location.state.receiverID
            getReceiverID(receiverObjID)
        }
    }, [location.state])

    const getReceiverID = async (objId) => {
        const {
            data: { message, content },
        } = await instance.get('/getReceiverId', {
            params: {
                userObjId: objId,
            },
        })
        searchId(content.id)
    }

    const searchId = async (id) => {
        const {
            data: { message, content },
        } = await instance.get('/transfer', {
            params: {
                userId: id,
            },
        })
        switch (message) {
            default:
                break
            case 'error':
                setStatus({
                    type: 'error',
                    msg: content,
                })
                // alert(content)
                break
            case 'success':
                setIdList([content])
        }
    }
    // useEffect(() => {
    //     console.log(idList)
    // }, [idList])

    const handleQRcode = async (account) => {
        const { data } = await instance.get('/qrcode', {
            params: {
                account,
            },
        })
        setQrCode(<img src={data.QR} alt="new" width="200" />)
    }

    return (
        <Layout className="site-layout">
            <Content
                className="site-layout-background"
                style={{
                    // margin: '24px 16px',
                    padding: 24,
                    paddingTop: 50,
                    minHeight: 280,
                    borderRadius: 50,
                    marginTop: 50,
                    marginBottom: 50,
                    marginRight: '16%',
                    filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2))',
                }}
            >
                <h1>Transfer</h1>
                <Search
                    placeholder="請輸入想要查找的學號"
                    enterButton
                    value={id}
                    onSearch={searchId}
                />
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={idList}
                    style={{ marginTop: 20 }}
                    renderItem={(item) => (
                        <Card>
                            <Space
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                }}
                            >
                                <Space>
                                    <b>學號: </b>
                                    {item.id}
                                </Space>
                                <Space>
                                    <b>姓名: </b>
                                    {item.name}
                                </Space>
                                <Space>
                                    <b>銀行代碼: </b>
                                    {item.bankaccount.bank_id}
                                </Space>
                                <Space>
                                    <b>戶頭帳號: </b>
                                    {item.bankaccount.bankaccount_id}
                                </Space>
                                <Space id="QRimage">{qrCode}</Space>
                                <Button
                                    onClick={() =>
                                        handleQRcode(item.bankaccount)
                                    }
                                >
                                    QR Code
                                </Button>
                            </Space>
                        </Card>
                    )}
                ></List>
            </Content>
        </Layout>
    )
}

export default Transfer
