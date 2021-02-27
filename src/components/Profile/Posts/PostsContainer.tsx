import React from 'react';
import Posts from "./Posts";
import {ProfilePageType} from "../../../redux/profile-reducer";

export type PostsContainerType = {
    profilePage: ProfilePageType
    addPost: (inputValue: string) => void
}

const PostsContainer: React.FC<PostsContainerType> = (props) => {
    const state = props.profilePage

    const addPost = (inputValue: string) => {
        props.addPost(inputValue)
    }


    return (
            <Posts addPost={addPost} posts={state.posts}/>
    );
}

export default PostsContainer;
