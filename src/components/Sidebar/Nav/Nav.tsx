import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Nav.module.css'
import {MenuItem, MenuList} from "@material-ui/core";

function Nav() {
    return (
        <MenuList>
            <MenuItem className={classes.item}>
                <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
            </MenuItem>
            <MenuItem className={classes.item}>
                <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
            </MenuItem>
            <MenuItem className={classes.item}>
                <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
            </MenuItem>
            <MenuItem className={classes.item}>
                <NavLink to="/news" activeClassName={classes.active}>News</NavLink>
            </MenuItem>
            <MenuItem className={classes.item}>
                <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
            </MenuItem>
            <MenuItem className={classes.item}>
                <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
            </MenuItem>
        </MenuList>
    );
}

export default Nav;
