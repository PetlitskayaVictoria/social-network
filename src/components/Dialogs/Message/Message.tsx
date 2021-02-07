import React from 'react';
import classes from "./Message.module.css"
import { MessagesType} from "../../../redux/state";

const Message: React.FC<MessagesType> = (props) => {
    return (

        <div className={classes.message + ' ' + ((props.userId === 1) ? classes.leftaling : classes.rightaling)}>
            <img src={props.avatar} className={classes.messageAv}/>
            <div className={classes.userName}> {props.message} </div>
        </div>
    )
}

export default Message;
