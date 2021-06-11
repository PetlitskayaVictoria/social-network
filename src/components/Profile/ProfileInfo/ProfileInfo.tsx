import React, {ChangeEvent, useState} from 'react';
import classes from "../Profile.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "./../../../assets/images/user-avatar.jpeg"
import ProfileDataReduxForm, {ProfileFormDataType} from "./ProfileDataForm";

type ProfileInfoType = {
    profile: ProfileType
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileFormDataType) => Promise<void>
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    let profilePhoto = profile.photos.large ? profile.photos.large : userPhoto
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileFormDataType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <img className={classes.profilePicture}
                 src={profilePhoto} alt="avatar"/>
            <div>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            </div>
            {editMode ? <ProfileDataReduxForm initialValues={{
                    fullName : profile.fullName,
                    aboutMe : profile.aboutMe,
                    lookingForAJob : profile.lookingForAJob,
                    lookingForAJobDescription : profile.lookingForAJobDescription
                }} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}

        </div>

    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div style={{marginTop : "10px"}}>{isOwner && <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
            <div><b>Name:</b>{profile.fullName}</div>
            <div><b>About me:</b> {profile.aboutMe}</div>
            <div><b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}</div>
            {profile.lookingForAJob && <div><b>My professional skills:</b>{profile.lookingForAJobDescription}</div>}
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                //@ts-ignore
                return <Contact key={key} contactType={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactType: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactType, contactValue}) => {
    return (
        <div>
            <span><b>{contactType}: </b></span>
            <span>{contactValue}</span>
        </div>
    )
}
export default ProfileInfo;
