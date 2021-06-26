import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from './components/common/Preloader/Preloader';
import {withSuspense} from "./hoc/withSuspense";
import {Grid, LinearProgress} from "@material-ui/core";
import {AppRootStateType} from "./redux/redux-store";
import {PageIsInProgress} from "./components/common/PageIsInProgress/PageIsInProgress";
import LoginContainer, {Login} from "./components/Login/Login";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapDispatchToPropsType = {
    initializeApp: () => void
}
type MapStateToPropsType = {
    status: string,
    initialized: boolean
}
type AppType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<AppType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="App">
                <HeaderContainer/>
                {this.props.status === 'loading' && <LinearProgress />}
                <Grid container spacing={5} style={{marginTop: "20px", padding: "0 40px 40px"}}>
                    <Grid item xs={4}>
                            <SidebarContainer/>
                    </Grid>
                    <Grid item xs={8} style={{padding: "0", display: "flex", justifyContent: "center", marginTop: "20px"}}>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                                    <Route path='/users' render={() => <UsersContainer/>}/>
                                    <Route path='/login' render={() => <LoginContainer/>}/>
                                    <Route path='/news' render={() => <PageIsInProgress/>}/>
                                    <Route path='/music' render={() => <PageIsInProgress/>}/>
                                    <Route path='/settings' render={() => <PageIsInProgress/>}/>
                                    <Route path={"*"} render={() => <div>NOT FOUND</div>}/>
                                </Switch>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        status: state.app.status,
        initialized : state.app.initialized
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
