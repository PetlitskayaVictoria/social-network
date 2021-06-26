import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm} from 'redux-form';
import {TextArea} from "../common/FormsControl/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Button, Grid, MenuList, Paper, Typography} from "@material-ui/core";

type LocalDialogsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    textMessage: string | undefined
    isAuth: boolean
    changeInputValue: (value: string) => void
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
        <Paper style={{width : "100%", paddingBottom : "20px", height : "650px"}}>
            <Grid container style={{padding : "15px", height : "100%"}} spacing={2}>
                <Grid item xs={4}>
                    <Paper style={{height : "100%", padding : "15px", overflow : "auto", marginBottom : "20px"}}>
                        <MenuList>
                            {dialogsElements}
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.dialogsContainer}>
                        <div>
                            <Typography variant={"h4"} className={classes.dialogName}>Igor</Typography>
                            <div>
                                {messagesElements}
                            </div>
                        </div>
                        <Paper>
                            <AddNewMessageReduxForm onSubmit={addMessage}/>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
}

type FormDataType = {}

const maxLength50 = maxLengthCreator(50)

const AddNewMessageForm = (props: InjectedFormProps<FormDataType>) => {
    return (
        <form onSubmit={props.handleSubmit} style={{padding : "15px"}}>
            <div>
                <Field name={"addNewMessage"}
                       component={TextArea}
                       placeholder="Type your message here..."
                       validate={[required, maxLength50]}
                       style={{
                           width : "calc(100% - 20px)",
                           maxWidth : "calc(100% - 20px)",
                           padding : "10px",
                           maxHeight : "70px",
                           marginBottom : "10px"
                       }}
                />
            </div>
            <div style={{textAlign : "right"}}>
                <Button type={"submit"} variant={"outlined"} color={"primary"}>Send your message</Button>
            </div>
        </form>
    )
}

export const AddNewMessageReduxForm = reduxForm<FormDataType>({
    form : "addNewMessage"
})(AddNewMessageForm)

export default Dialogs;
