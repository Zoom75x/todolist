import { CSSProperties, ReactNode } from 'react'
import { Layout } from 'antd'

const { Header, Footer, Sider, Content } = Layout

const headerStyle: CSSProperties = {
  padding: '24px',
  height: '80px',
  backgroundColor: '#4096ff',
}

const contentStyle: CSSProperties = {
  backgroundColor: '#0958d9',
  overflow: 'auto',
}

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
}

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
}

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  height: '100vh',
}

interface Props {
  outlet: ReactNode
  header: ReactNode
  sideBar: ReactNode
}

export const BaseLayout = ({ outlet, header, sideBar }: Props) => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>{header}</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          {sideBar}
        </Sider>
        <Content style={contentStyle}>{outlet}</Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  )
}
