import React from 'react';
import classes from './Friend.module.css'
import {FriendsType} from "../../../../redux/store";

const Friend: React.FC<FriendsType> = (props) => {
    return (
        <div className={classes.friendContainer}>
            <img src={props.img}/>
            <div>{props.name}</div>
        </div>
        )
}

export default Friend;
