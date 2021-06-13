import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from './components/Login/Login';
import {StoreType} from "./redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from './components/common/Preloader/Preloader';
import {withSuspense} from "./hoc/withSuspense";
import {Grid, Paper} from "@material-ui/core";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapDispatchToPropsType = {
    initializeApp: () => void
}
type MapStateToPropsType = {
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
                <Grid container spacing={5} style={{marginTop: "20px", padding: "0 40px"}}>
                    <Grid item xs={4}>
                        <Paper>
                            <SidebarContainer/>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper>
                            <div>
                                <Switch>
                                    <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
                                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                                    <Route path='/users' render={() => <UsersContainer/>}/>
                                    <Route path='/login' render={() => <LoginContainer/>}/>
                                    <Route path={"*"} render={() => <div>NOT FOUND</div>}/>
                                </Switch>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreType): MapStateToPropsType => {
    return {
        initialized : state.app.initialized
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
