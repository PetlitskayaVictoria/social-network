import React from 'react';
import classes from './Profile.module.css';
import PostsContainer from "./Posts/PostsContainer";
import {PostsType, ProfileType} from '../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";

type ProfilePageType = {
    posts: PostsType[]
    status: string
    profile: ProfileType
    addPost: (inputValue: string) => void
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileFormDataType) => Promise<void>
}

const Profile: React.FC<ProfilePageType> = ({profile, status, updateStatus, posts, addPost, isOwner, savePhoto, saveProfile}) => {
    return (
        <div className={classes.profilePageContainer}>
            <ProfileInfo profile={profile} isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile}/>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
            <div className={classes.myPosts}>
                <PostsContainer posts={posts} addPost={addPost}/>
            </div>
        </div>

    );
}

export default Profile;
