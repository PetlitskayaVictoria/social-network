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

const Profile: React.FC<ProfilePageType> = ({profile, status, updateStatus, posts, addPost}) => {
    return (
        <div className={classes.profilePageContainer}>
            <ProfileInfo profile={profile}/>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
            <div className={classes.myPosts}>
                <PostsContainer posts={posts} addPost={addPost}/>
            </div>
        </div>

    );
}

export default Profile;
