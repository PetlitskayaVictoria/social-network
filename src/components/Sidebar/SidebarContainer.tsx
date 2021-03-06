import React from 'react';
import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import {AppRootStateType, DispatchType} from "../../redux/redux-store";

const mapStateToProps = (state: AppRootStateType) => {
    return {
        sideBar: state.sidebar
    }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
    return {

    }
}

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default SidebarContainer;
