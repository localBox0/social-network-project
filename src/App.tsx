import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css'
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import ProfileContainer from "./components/Profile/ProfileContainer";
import {LoginPage} from "./components/Login/LoginPage";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import store, {AppStateType} from "./redux/redux-store";
import {UsersPage} from "./components/Users/UsersPage";
import {Header} from './components/Header/Header'


import {
    ContainerOutlined,
    CustomerServiceOutlined,
    LaptopOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons'
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';
import {ChatPage} from "./pages/Chat/ChatPage";



const {Content, Footer, Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}


const itemsSideMenu: MenuItem[] = [

    getItem('My Profile', 'MyProfile', <UserOutlined />, [
        getItem(
            <Link to='/profile'>
                Profile
            </Link>,
            'Profile'),
        getItem(
            <Link to='/dialogs'>
                Messages
            </Link>,
            'Messages')
    ]),

    getItem('Developers', 'Developers', <LaptopOutlined />, [
        getItem(
            <Link to='/users'>
                Developers list
            </Link>,
            'DevelopersList'),
        getItem(
            <Link to='/Chat'>
                Chat
            </Link>,
            'Chat')
    ]),

    getItem('Music', 'Music', <CustomerServiceOutlined />, [
        getItem(
            <Link to='/music'>
                All music
            </Link>,
            'AllMusic'),
        getItem(
            <Link to='/music'>
                My playlist
            </Link>,
            'MyMusic')
    ]),

    getItem('News', 'News', <ContainerOutlined />, [
        getItem(
            <Link to='/news'>
                My Newsfeed
            </Link>,
            'MyNews')
    ]),


    getItem('Settings', 'Settings', <SettingOutlined />, [
        getItem(
            <Link to='/settings'>
                My Settings
            </Link>,
            'My Settings')
    ])
]



const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e : PromiseRejectionEvent) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            /*<div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar />
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path={'/'}
                               render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs/'
                               render={() => {
                                   return <React.Suspense fallback={<Preloader/>}>
                                       <DialogsContainer/>
                                   </React.Suspense>
                               }}/>
                        <Route path='/news'
                               render={() => <News/>}/>
                        <Route path='/music'
                               render={() => <Music/>}/>
                        <Route path='/settings'
                               render={() => <Settings/>}/>
                        <Route path='/users'
                               render={() => <UsersPage/>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>*/

            <Layout>
                <Header/>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to='/'>My Profile</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/users">Developers</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Another Item</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                items={itemsSideMenu}
                            />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route exact path={'/'}
                                       render={() => <Redirect to={'/profile'}/>}/>
                                <Route path='/profile/:userId?'
                                       render={() => <ProfileContainer/>}/>
                                <Route path='/dialogs/'
                                       render={() => {
                                           return <React.Suspense fallback={<Preloader/>}>
                                               <DialogsContainer/>
                                           </React.Suspense>
                                       }}/>
                                <Route path='/news'
                                       render={() => <News/>}/>
                                <Route path='/music'
                                       render={() => <Music/>}/>
                                <Route path='/settings'
                                       render={() => <Settings/>}/>
                                <Route path='/users'
                                       render={() => <UsersPage/>}/>
                                <Route path='/login'
                                       render={() => <LoginPage/>}/>
                                <Route path='/chat'
                                       render={() => <ChatPage/>}/>
                                <Route path='*'
                                       render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>My Social Network. STUDY PROJECT</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SocialNetwork: React.FC = () => {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SocialNetwork;