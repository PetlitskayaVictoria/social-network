import React from 'react';
import classes from './Friends.module.css'
import Friend from './Friend/Friend'
import { SidebarType } from '../../../redux/sidebar-reducer';


function Friends(props: SidebarType) {

    const listOfFriends = props.friends.map( f => {
        return <Friend key={f.id} id={f.id} name={f.name} img={f.img} />
    })

    return (
        <div className={classes.friendsContainer}>
            <h2>Friends</h2>
            <div className={classes.listOfFriends}>
                {listOfFriends}
            </div>
        </div>
    );
}

export default Friends;
