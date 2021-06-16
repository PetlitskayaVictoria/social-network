import React from 'react';
import preloader from './../../../assets/images/preloader.gif'
import {LinearProgress} from "@material-ui/core";

const Preloader = () => {
    return (
        // <div>
        //     <img src={preloader} alt="Loader"/>
        // </div>
        <LinearProgress />
    )
}

export default Preloader
