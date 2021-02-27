import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './DialogItem.module.css'
import {DialogsType} from "../../../redux/dialogs-reducer";

const DialogItem: React.FC<DialogsType> =(props) => {

    let path = `/dialogs/${props.id}`;
    return (

        <div className={classes.dialog + ' ' + classes.active}>
            <img src={props.img} className={classes.avatar} alt="avatar"/>
            <NavLink to={path} className={classes.userName}>{props.name}</NavLink>
        </div>

    );
}

export default DialogItem;
