import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StoreType} from "../../redux/redux-store";
import {logOut} from "../../redux/auth-reducer";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToPropsType = {
    logOut: () => void
}

type HeaderContainerType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderContainerType>{

    render() {
        return (
            <Header {...this.props}/>
        )
    }

}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }

}

export default connect(mapStateToProps, {logOut})(HeaderContainer);
