import React from 'react';
import {connect} from "react-redux";
import Profile from "../Profile";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {ActionsTypes, StoreType} from "../../../redux/redux-store";


type DispatchType = (action: ActionsTypes) => void

const mapStateToProps = (state: StoreType) => {
    return {
        profilePage : state.profilePage
    }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        addPost : (inputValue: string) => {
            dispatch(addPostActionCreator(inputValue))
        }
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer;
