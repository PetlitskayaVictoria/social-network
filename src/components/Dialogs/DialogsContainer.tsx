import React from 'react';
import {
    ActionsTypes,
    StateType
} from "../../redux/store";
import {addMessageActionCreator, changeInputValueActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

type DialogsContainerType = {
    store: StateType
    dispatch: (action: ActionsTypes) => void
}

const DialogsContainer: React.FC<DialogsContainerType> = (props) => {
    const state = props.store.dialogsPage

    const changeInputValue = (value: string) => {
        props.dispatch(changeInputValueActionCreator(value))
    }
    let addMessage = () => {
        props.dispatch(addMessageActionCreator());
    }

    return (
        <Dialogs dialogs={state.dialogs}
                 messages={state.messages}
                 changeInputValue={changeInputValue}
                 addMessage={addMessage}
                 textMessage={state.textMessage}
        />
    );
}

export default DialogsContainer;
