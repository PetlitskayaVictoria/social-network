import React from 'react';

import {ActionsTypes, StateType} from "../../../redux/store";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import Posts from "./Posts";

export type PostsContainer = {
    store: StateType
    dispatch: (action: ActionsTypes) => void
}

const PostsContainer: React.FC<PostsContainer> = (props) => {
    const state = props.store.profilePage

    const addPost = (inputValue: string) => {
        props.dispatch(addPostActionCreator(inputValue))
    }


    return (
            <Posts addPost={addPost} posts={state.posts}/>
    );
}

export default PostsContainer;
