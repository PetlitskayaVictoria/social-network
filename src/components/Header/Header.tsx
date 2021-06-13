import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Typography from '@material-ui/core/Typography';
import {Button, makeStyles} from "@material-ui/core";

type HeaderType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
}

const useStyles = makeStyles((theme) => ({
    root : {
        flexGrow : 1,
    },
    appBar: {
        height: theme.spacing(10),
        flexDirection : "row",
        alignItems: "center"
    },
    logo: {
        width: "30px",
        height: "30px",
        paddingLeft : theme.spacing(4),
    },
    title : {
        flexGrow : 1,
        paddingLeft : theme.spacing(4)
    },
    loginBlock: {
        paddingRight : theme.spacing(4)
    },
    logout: {
        marginLeft: theme.spacing(4)
    },
    login: {
        textDecoration: "none",
        color: "inherit"
    }
}));

function Header(props: HeaderType) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fandom_heart-logo.svg/1200px-Fandom_heart-logo.svg.png" className={classes.logo}/>
                <Typography variant="h6" className={classes.title}>
                    Social Network
                </Typography>
                <div className={classes.loginBlock}>
                {props.isAuth ?
                    <div>
                        <span>{props.login}</span>
                        <Button variant="outlined" color={"secondary"} onClick={props.logOut} className={classes.logout}>Logout</Button>
                    </div> :
                    <Button variant="outlined" color={"secondary"} ><NavLink to={'/login'} className={classes.login}>Login</NavLink></Button>}
                </div>
            </AppBar>
        </div>
    );
}

export default Header;
