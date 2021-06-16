import React from 'react';
import Friend from './Friend/Friend'
import { SidebarType } from '../../../redux/sidebar-reducer';
import {Grid, Typography} from "@material-ui/core";

function Friends(props: SidebarType) {

    const listOfFriends = props.friends.map( f => {
        return <Friend key={f.id} id={f.id} name={f.name} img={f.img} />
    })

    return (
        <>
            <Typography variant={"h3"}>
                Friends
            </Typography>
            <Grid container style={{marginTop: "30px"}} spacing={5}>
                {listOfFriends}
            </Grid>
        </>
    );
}

export default Friends;
