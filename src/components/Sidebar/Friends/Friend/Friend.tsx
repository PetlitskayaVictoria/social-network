import React from 'react';
import { FriendsType } from '../../../../redux/sidebar-reducer';
import classes from './Friend.module.css'


const Friend: React.FC<FriendsType> = (props) => {
    return (
        <div className={classes.friendContainer}>
            <img src={props.img}/>
            <div>{props.name}</div>
        </div>
        )
}

export default Friend;
