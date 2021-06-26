import React from 'react';
import preloader from './../../../assets/images/preloader.gif'
import {CircularProgress, LinearProgress} from "@material-ui/core";

const Preloader = () => {
    return (
        <div style={{width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CircularProgress style={{width: "60px", height: "60px"}}/>
        </div>
    )
}

export default Preloader
