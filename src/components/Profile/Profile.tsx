import React from 'react';
import classes from './Profile.module.css';
import PostsContainer from "./Posts/PostsContainer";
import {PostsType, ProfileType} from '../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStatus from './ProfileStatus/ProfileStatus';


type ProfilePageType = {
    posts: PostsType[]
    status: string
    profile: ProfileType | null
    addPost: (inputValue: string) => void
    updateStatus: (status: string) => void
}

const Profile: React.FC<ProfilePageType> = (props) => {
    return (
        <div className={classes.profilePageContainer}>
                <ProfileInfo profile={props.profile}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            <div className={classes.myPosts}>
                <PostsContainer posts={props.posts} addPost={props.addPost}/>
            </div>
        </div>

    );
}

export default Profile;
