import React, {ChangeEvent} from 'react';
import classes from "../Profile.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "./../../../assets/images/user-avatar.jpeg"

type ProfileInfoType = {
    profile: ProfileType | null
    isOwner: boolean
    savePhoto: (file: File) => void
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    let profilePhoto = profile.photos.large ? profile.photos.large : userPhoto
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <img className={classes.profilePicture}
                 src={profilePhoto} alt="avatar"/>
                 <div>
                     {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                 </div>
            <div>{profile.fullName}</div>
            <div>{profile.aboutMe}</div>
            <div>{profile.lookingForAJob}</div>
        </div>

    );
}

export default ProfileInfo;
