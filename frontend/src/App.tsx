import React, {FC, useState} from 'react';
import {Layout, Menu} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import 'antd/es/locale/ru_RU';
import {ItemType} from "antd/es/menu/hooks/useItems";
import {PatientView} from "./components/PatientView";
import {EntryEdit} from "./components/EntryEdit";

const { Header, Content, Footer, Sider } = Layout;

const App: FC = () => {

  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate()

 const menu: ItemType[] = [
    {
      key: 'patient',
      icon: <UserOutlined />,
      label: 'Пациент',
    },
  ]

  return (
    <Layout id="main-view" className="site-layout">
      <Header className="site-layout-background inline-flex" style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "calc(100vh-64px)",
            position: "fixed",
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Menu
            onClick={(e) => navigate(`/${e.key}`)}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['patient']}
            items={menu}
          />
        </Sider>
        <Layout className="site-layout" style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}>

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="*" element={<PatientView/>}/>
                <Route path="/entry/:id" element={<EntryEdit/>}/>

              {/*<Route path={applicationListPath()} element={<RequireAdminAuth><ApplicationList /></RequireAdminAuth> } />*/}
              {/*<Route path={adminApplicationListPath()} element={<RequireAdminAuth><AdminApplicationList /></RequireAdminAuth>} />*/}
              {/*<Route path={userApplicationListPath()} element={<UserApplicationList />} />*/}
              {/*<Route path={managerListPath()} element={<ManagerList />} />*/}
              {/*<Route path={logCharacteristicFilterListPath()} element={<LogCharacteristicFilerList />} />*/}
              {/*<Route path={verificationRuleListPath()} element={<VerificationRuleList />} />*/}
              {/*<Route path={userListPath()} element={<RequireAdminAuth><UserList /></RequireAdminAuth>} />*/}
              {/*<Route path={registrationPath()} element={<RegistrationEdit />} />*/}
              {/*<Route path={usefulPath()} element={<UsefulView />} />*/}
              {/*<Route path={catalogPath()} element={<CatalogView />} />*/}
              {/*<Route path={createApplicationPath()} element={<RequestEdit />} />*/}
              {/*<Route path={createManagerPath()} element={<ManagerEdit />} />*/}
              {/*<Route path={createLogCharacteristicFilterValuePath()} element={<RequireAdminAuth><LogCharacteristicFilterEdit/></RequireAdminAuth>} />*/}
              {/*<Route path={createVerificationRulePath()} element={<RequireAdminAuth><VerificationRuleEdit/></RequireAdminAuth>} />*/}
              {/*<Route path={createUserPath()} element={<RequireAdminAuth><UserEdit /></RequireAdminAuth>} />*/}
              {/*<Route path={`${getContextPath()}/application/view/:id`} element={<ApplicationView />} />*/}
              {/*<Route path={`${getContextPath()}/application/edit/:id`} element={<RequestEdit />} />*/}
              {/*<Route path={`${getContextPath()}/manager/edit/:id`} element={<ManagerEdit />} />*/}
              {/*<Route path={`${getContextPath()}/filterValue/edit/:id`} element={<RequireAdminAuth><LogCharacteristicFilterEdit/></RequireAdminAuth> }/>*/}
              {/*<Route path={`${getContextPath()}/verificationRule/edit/:id`} element={<RequireAdminAuth><VerificationRuleEdit/></RequireAdminAuth>} />*/}
              {/*<Route path={`${getContextPath()}/user/edit/:id`} element={<UserEdit />} />*/}
              {/*<Route path={`${getContextPath()}/error/:err`} element={<ErrorView />} />*/}
            </Routes>
          </Content>
          <Footer>Release version 0.0.1</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
