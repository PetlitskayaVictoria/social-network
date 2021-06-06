import React from 'react';
import classes from "../Profile.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "./../../../assets/images/user-avatar.jpeg"

type ProfileInfoType = {
    profile: ProfileType | null
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile}) => {
    if (!profile) {return <Preloader />}
    let profilePhoto = profile.photos.large
        ? profile.photos.large
        : userPhoto
  return (
    <div >
        <img className={classes.profilePicture}
             src={profilePhoto} alt="avatar"/>
        <div>{profile.fullName}</div>
        <div>{profile.aboutMe}</div>
        <div>{profile.lookingForAJob}</div>
    </div>

  );
}

export default ProfileInfo;
