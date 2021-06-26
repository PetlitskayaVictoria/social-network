import React from 'react';
import classes from './Post.module.css'
import {PostsType} from "../../../../redux/profile-reducer";
import {Paper} from "@material-ui/core";
import userPhoto from "./../../../../assets/images/user-avatar.png"

const Post: React.FC<PostsType> = (props) => {
    return (
        <Paper style={{marginTop : "20px", padding : "15px", backgroundColor : "#ccc9ff"}}>
            <img className={classes.avatar}
                 alt={"avatar"}
                 src={userPhoto}/>
            <p>{props.message}</p>
            <span>{`❤️ ${props.likesCount}`}</span>
        </Paper>
    );
}

export default Post;
