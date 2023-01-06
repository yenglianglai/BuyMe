import React from 'react'
import BuyMe from './BuyMe'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { Navigate } from 'react-router-dom'
import { useApp } from '../UseApp'

const { Header, Content } = Layout

function MainPage({ collapsed, setCollapsed, login, me, id }) {
    const { LOCALSTORAGE_STATUS } = useApp()

    return localStorage.getItem(LOCALSTORAGE_STATUS) === 'login' ? (
        <Layout className="site-layout">
            <BuyMe me={me} id={id} />
        </Layout>
    ) : (
        <Navigate to="/login" replace={true} />
    )
}

export default MainPage
