import React from 'react';
import classes from "../Profile.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "./../../../assets/images/user-avatar.jpg"

type ProfileInfoType = {
    profile: ProfileType | null
}

export const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    if (!props.profile) {return <Preloader />}
    let profilePhoto = props.profile.photos.large
        ? props.profile.photos.large
        : userPhoto
  return (
    <div >
        <img className={classes.profilePicture}
             src={profilePhoto} alt="avatar"/>
        <div>{props.profile.fullName}</div>
        <div>{props.profile.aboutMe}</div>
        <div>{props.profile.lookingForAJob}</div>
    </div>

  );
}

export default ProfileInfo;
