import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import store, {AppStateType} from "./redux/redux-store";

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
            <div className='app-wrapper'>
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
                               render={() => <UsersContainer/>}/>
                        <Route path='/login'
                               render={() => <LoginPage/>}/>
                        <Route path='*'
                               render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
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