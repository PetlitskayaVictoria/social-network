import React from 'react';
import classes from './Profile.module.css';
import {
    ActionsTypes,
    StateType
} from "../../redux/store";
import PostsContainer from "./Posts/PostsContainer";

type ProfileType = {
    store: StateType
    dispatch: (action: ActionsTypes) => void
}


const Profile: React.FC<ProfileType> = (props) => {

    return (
        <div className={classes.profilePageContainer}>
            <img className={classes.profilePicture}
                 src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fjoshuabecker%2Ffiles%2F2018%2F02%2Fthe-case-for-minimalism-1200x680.jpg"/>
            <div className={classes.myPosts}>
                <PostsContainer store={props.store} dispatch={props.dispatch}/>
            </div>
        </div>

    );
}

export default Profile;
