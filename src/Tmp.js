import React from 'react';
import { Layout, theme } from 'antd';
const { Content } = Layout;
const Tmp = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                padding: '24px',
            }}
        >
            <Content
                style={{
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >Content
            </Content>
        </Layout>
    );
};
export default Tmp;