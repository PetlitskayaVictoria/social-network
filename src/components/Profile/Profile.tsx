import React from 'react';
import classes from './Profile.module.css';
import PostsContainer from "./Posts/PostsContainer";
import {PostsType, ProfileType} from '../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";
import {Paper} from "@material-ui/core";

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
        <Paper style={{width: "100%", marginTop: "20px", padding: "15px", backgroundColor: "#ccc9ff"}}>
            <ProfileInfo profile={profile} isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile}/>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
            <div className={classes.myPosts}>
                <PostsContainer posts={posts} addPost={addPost}/>
            </div>
        </Paper>

    );
}

export default Profile;
