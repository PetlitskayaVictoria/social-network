import React from 'react';
import classes from './Sidebar.module.css'
import Nav from './Nav/Nav';
import Friends from "./Friends/Friends";
import {SidebarType} from "../../redux/store";

const Sidebar: React.FC<SidebarType> = (props) => {

  return (
    <div className={classes.sidebarContainer}>
        <Nav />
        <Friends friends={props.friends}/>
    </div>
  );
}

export default Sidebar;
