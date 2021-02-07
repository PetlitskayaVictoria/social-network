import React from 'react';
import Post from './Post/Post';
import classes from './Posts.module.css'
import {ProfilePageType} from "../../../redux/state";

const Posts: React.FC<ProfilePageType> = (props) => {

    const newPosts = props.posts.map( p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })

    return (
        <div className={classes.postsContainer}>
            { newPosts }
        </div>

    );
}

export default Posts;
