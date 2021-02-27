import React from 'react';
import {addMessageActionCreator, changeInputValueActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {DispatchType, StoreType} from "../../redux/redux-store";

const mapStateToProps = (state: StoreType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        textMessage: state.dialogsPage.textMessage
    }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        changeInputValue: (value: string ) => {
            let action = changeInputValueActionCreator(value)
            dispatch(action)
        },
        addMessage: () => {
            dispatch(addMessageActionCreator())
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;
