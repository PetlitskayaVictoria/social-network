import React from 'react';
import Posts from "./Posts";
import {PostsType} from "../../../redux/profile-reducer";

export type PostsContainerType = {
    posts: PostsType[]
    addPost: (inputValue: string) => void
}

const PostsContainer: React.FC<PostsContainerType> = (props) => {
    const state = props.posts

    return (
            <Posts addPost={props.addPost} posts={state}/>
    );
}

export default PostsContainer;
