import React from 'react';
import { FriendsType } from '../../../../redux/sidebar-reducer';
import classes from './Friend.module.css'
import {Grid} from "@material-ui/core";


const Friend: React.FC<FriendsType> = (props) => {
    return (
        <Grid item xs={3} className={classes.friendCard}>
            <img src={props.img} alt={"avatar"} className={classes.friendAvatar}/>
            <div>{props.name}</div>
        </Grid>
        )
}

export default Friend;
