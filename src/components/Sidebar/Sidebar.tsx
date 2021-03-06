import React from 'react';
import Nav from './Nav/Nav';
import Friends from "./Friends/Friends";
import {SidebarType} from '../../redux/sidebar-reducer';
import {Paper} from "@material-ui/core";


type LocalSideBarType = {
    sideBar: SidebarType
}

const Sidebar: React.FC<LocalSideBarType> = (props) => {

    return (
        <>
            <Paper style={{padding : "15px", backgroundColor : "#ccc9ff", height: "250px", marginBottom: "30px"}}>
                <Nav/>
            </Paper>
            <Paper style={{padding : "30px", backgroundColor : "#ccc9ff"}}>
                <Friends friends={props.sideBar.friends}/>
            </Paper>
        </>
    );
}

export default Sidebar;
