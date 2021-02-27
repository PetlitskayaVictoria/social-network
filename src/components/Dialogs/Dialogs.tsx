import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";

type LocalDialogsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    textMessage: string | undefined
    changeInputValue: (value: string ) => void
    addMessage: () => void
}


const Dialogs = (props: LocalDialogsType) => {

    const changeInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeInputValue(e.currentTarget.value)
    }
    let addMessage = () => {
        props.addMessage()
    }

    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id}
                                                                         name={d.name}
                                                                         id={d.id}
                                                                         img={d.img}/>)
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
