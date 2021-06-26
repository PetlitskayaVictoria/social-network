import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './DialogItem.module.css'
import {DialogsType} from "../../../redux/dialogs-reducer";
import {MenuItem} from "@material-ui/core";

const DialogItem: React.FC<DialogsType> =(props) => {

    let path = `/dialogs/${props.id}`;
    return (
        <MenuItem className={classes.dialogItem}>
            <img src={props.img} className={classes.avatar} alt="avatar"/>
            <NavLink to={path} className={classes.userName}>{props.name}</NavLink>
        </MenuItem>
    );
}

export default DialogItem;
