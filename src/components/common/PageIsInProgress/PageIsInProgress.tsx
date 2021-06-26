import React from 'react';
import {Paper, Typography} from "@material-ui/core";

export const PageIsInProgress = () => {
    return (
        <Paper style={{width: "100%", backgroundColor : "#ccc9ff", height: "100px", padding: "50px", textAlign: "center"}}>
            <Typography variant={"h4"}>This page is in progress.</Typography>
            <Typography variant={"h4"}>Please wait a little bit :)</Typography>
        </Paper>
    )
}
