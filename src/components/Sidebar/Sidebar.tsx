import React from 'react';
import classes from './Sidebar.module.css'
import Nav from './Nav/Nav';
import Friends from "./Friends/Friends";
import {SidebarType} from "../../redux/store";

type LocalSideBarType = {
    sideBar: SidebarType
}

const Sidebar: React.FC<LocalSideBarType> = (props) => {

  return (
    <div className={classes.sidebarContainer}>
        <Nav />
        <Friends friends={props.sideBar.friends}/>
    </div>
  );
}

export default Sidebar;
