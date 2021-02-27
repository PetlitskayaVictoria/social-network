import React from 'react';
import classes from './Profile.module.css';
import PostsContainer from "./Posts/PostsContainer";
import {ProfilePageType} from "../../redux/profile-reducer";

type ProfileType = {
    profilePage: ProfilePageType
    addPost: (inputValue: string) => void
}

const Profile: React.FC<ProfileType> = (props) => {

    return (
        <div className={classes.profilePageContainer}>
            <img className={classes.profilePicture}
                 src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fjoshuabecker%2Ffiles%2F2018%2F02%2Fthe-case-for-minimalism-1200x680.jpg" alt="avatar"/>
            <div className={classes.myPosts}>
                <PostsContainer profilePage={props.profilePage} addPost={props.addPost}/>
            </div>
        </div>

    );
}

export default Profile;
