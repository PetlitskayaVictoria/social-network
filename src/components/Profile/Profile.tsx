import React from 'react';
import PostsContainer from "./Posts/PostsContainer";
import {PostsType, ProfileType} from '../../redux/profile-reducer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";
import {Paper} from "@material-ui/core";
import Preloader from "../common/Preloader/Preloader";

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
    if (!profile) {
        return <Preloader/>
    }

    return (
        <Paper style={{width : "100%", padding : "15px", backgroundColor : "#ccc9ff"}}>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
                         status={status}
                         updateStatus={updateStatus}
            />
            <PostsContainer posts={posts} addPost={addPost}/>
        </Paper>
    );
}

export default Profile;
