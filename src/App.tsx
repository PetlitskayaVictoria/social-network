import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import {Route} from 'react-router-dom';
import Profile from "./components/Profile/Profile";
import {
    ActionsTypes,
    StateType
} from './redux/store'
import DialogsContainer from "./components/Dialogs/DialogsContainer";

type AppType = {
    state: StateType
    dispatch: (action: ActionsTypes) => void
}


function App(props: AppType) {

    return (
        <div className="App">
            <Header/>
            <Sidebar friends={props.state.sidebar.friends}/>
            <div className="app-wrapper-content">
                <Route path='/profile' render={() => <Profile store={props.state} dispatch={props.dispatch}/>}/>
                <Route path='/dialogs' render={() => <DialogsContainer store={props.state} dispatch={props.dispatch}/>}/>

            </div>
        </div>
    )
}

export default App;
