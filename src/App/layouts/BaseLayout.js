import React from 'react';
import { Layout } from 'antd';
import NavigationBar from './NavigationBar';
import Routes from './Routes';
import SideMenu from './SideMenu';

import './styles.css'


const { Header, Content, Sider } = Layout;


const BaseLayout = () => (
  <Layout className='base-layout' style={{height: '100%'}}>
    <Header className="base-layout-header">
     <NavigationBar />
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <SideMenu />
      </Sider>
      <Layout>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
         <Routes />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default BaseLayout;