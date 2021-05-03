import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css'

type HeaderType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
}

function Header(props: HeaderType) {
    return (
        <div className={classes.headerContainer}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fandom_heart-logo.svg/1200px-Fandom_heart-logo.svg.png"/>

            <div className={classes.loginBlock}>
                {props.isAuth ? <div>
                    {props.login} - <button onClick={props.logOut}>Logout</button>
                </div>:
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>

        </div>
    );
}

export default Header;
