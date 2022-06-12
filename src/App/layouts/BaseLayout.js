import React from 'react';
import { Layout } from 'antd';
import NavigationBar from './NavigationBar';
import Logo from './Logo';
import Routes from './Routes';
import SideMenu from './SideMenu';

import './styles.css';


const { Header, Content, Sider } = Layout;


const BaseLayout = (props) => {
  const {
    match: { url: baseUrl, params },
  } = props;

  return (
    <Layout className='base-layout' style={{ height: '100%' }}>
      <Sider width={220} className="base-layout-sider">
        <Header className='base-layout-sider__header'>
          <Logo />
        </Header>
        <Header className='base-layout-sider__menu-header'>
          <div>Temeke</div>
        </Header>
        <SideMenu baseUrl={baseUrl} />
      </Sider>
      <Layout>
        <Header className="base-layout-header">
          <NavigationBar />
        </Header>
        <Layout className='base-layout__content-layout'>
          <Content className="base-layout__content">
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );

}



export default BaseLayout;