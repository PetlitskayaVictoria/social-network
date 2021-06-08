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
    isOwner: boolean
    savePhoto: (file: File) => void
}

const Profile: React.FC<ProfilePageType> = ({profile, status, updateStatus, posts, addPost, isOwner, savePhoto}) => {
    return (
        <div className={classes.profilePageContainer}>
            <ProfileInfo profile={profile} isOwner={isOwner} savePhoto={savePhoto}/>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
            <div className={classes.myPosts}>
                <PostsContainer posts={posts} addPost={addPost}/>
            </div>
        </div>

    );
}

export default Profile;
