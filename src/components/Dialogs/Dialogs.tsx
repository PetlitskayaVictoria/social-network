import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm } from 'redux-form';
import {TextArea} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";


type LocalDialogsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    textMessage: string | undefined
    isAuth: boolean
    changeInputValue: (value: string ) => void
    addMessage: (value: any) => void
}


const Dialogs = (props: LocalDialogsType) => {

    let addMessage = (value: any) => {
        props.addMessage(value.addNewMessage)
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

    // if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
            <div>
                <AddNewMessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    );
}

type FormDataType = {

}

const maxLength50 = maxLengthCreator(50)

const AddNewMessageForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"addNewMessage"}
                       component={TextArea}
                       placeholder="Type your message here"
                       validate={[required, maxLength50]}
                />
            </div>
            <div>
                <button>Send your message</button>
            </div>
        </form>
    )
}

export const AddNewMessageReduxForm = reduxForm<FormDataType>({
    form: "addNewMessage"
})(AddNewMessageForm)

export default Dialogs;
