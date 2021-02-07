import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import {
    ActionsTypes,
    DialogsType,
    MessagesType
} from "../../redux/state";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {addMessageActionCreator, changeInputValueActionCreator} from "../../redux/dialogs-reducer";

type LocalDialogsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    textMessage: string | undefined
    dispatch: (action: ActionsTypes) => void
}



const Dialogs: React.FC<LocalDialogsType> = (props) => {

    const changeInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(changeInputValueActionCreator(e.currentTarget.value))
    }
    let addMessage = () => {
        props.dispatch(addMessageActionCreator());
    }

    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} img={d.img}/>)
    let messagesElements = props.messages
        .map(m => <Message key={m.id}
                           message={m.message}
                           id={m.id}
                           userId={m.userId}
                           avatar={m.avatar}

        />)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
            <div>
                <textarea value={props.textMessage}
                          onChange={changeInputValue}
                ></textarea>
                <button onClick={addMessage}>Add message</button>
            </div>
        </div>
    );
}

export default Dialogs;
