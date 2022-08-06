import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import NavigationBar from './NavigationBar';
import Logo from './Logo';
import Routes from './Routes';
import SideMenu from './SideMenu';

import './styles.css';


const { Header, Content, Sider } = Layout;


const BaseLayout = (props) => {
  const [procuringEntity, setProcuringEntity] = useState(null);
  const {
    match: { url: baseUrl },
  } = props;

  useEffect(() => {

    // get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    setProcuringEntity(user?.procuringEntity);

  }, []);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='base-layout' style={{ height: '100%' }}>
      <Sider width={collapsed ? 60 : 220} className="base-layout-sider">
        <Header className='base-layout-sider__header'>
          <Logo collapsed={collapsed}  setCollapsed={setCollapsed}/>
        </Header>
        <Header className='base-layout-sider__menu-header'>
          { !collapsed && <div>{procuringEntity?.agency?.name}</div> }
        </Header>
        <SideMenu baseUrl={baseUrl} collapsed={collapsed} />
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