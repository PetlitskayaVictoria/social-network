import React, {ChangeEvent, useState} from 'react';
import classes from "../Profile.module.css";
import {ProfileType} from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "./../../../assets/images/user-avatar.png"
import ProfileDataReduxForm, {ProfileFormDataType} from "./ProfileDataForm";
import {Button, Grid, List, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

type ProfileInfoType = {
    profile: ProfileType
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileFormDataType) => Promise<void>
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoType> = ({profile, isOwner, savePhoto, saveProfile, status, updateStatus}) => {

    const [editMode, setEditMode] = useState(false)

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
        <Grid container>
            <Grid item xs={4} style={{marginRight: "70px"}}>
                <img className={classes.profilePicture}
                     src={profilePhoto} alt="avatar"/>
                <div>
                    {isOwner && <label className={classes.uploadFile}>
                        <input type={"file"} onChange={onMainPhotoSelected} className={classes.uploadFile}/>
                        Change Photo
                    </label>}
                </div>
            </Grid>
            <Grid item xs={7}>
                <Paper style={{padding : "20px", backgroundColor : "#ccc9ff"}}>
                    <ProfileStatus status={status} updateStatus={updateStatus} />
                    {editMode ? <ProfileDataReduxForm initialValues={{
                            fullName : profile.fullName,
                            aboutMe : profile.aboutMe,
                            lookingForAJob : profile.lookingForAJob,
                            lookingForAJobDescription : profile.lookingForAJobDescription
                        }} onSubmit={onSubmit}/>
                        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
                </Paper>
            </Grid>
        </Grid>

    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <>
            <Typography variant="h4">{profile.fullName}</Typography>
            <List className={classes.listContainer}>
                <div><b>About me:</b> {profile.aboutMe}</div>
                <div><b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}</div>
                {profile.lookingForAJob &&
                <div><b>My professional skills:</b> {profile.lookingForAJobDescription}</div>}
                <div>
                    <b>Contacts: </b>
                    <div className={classes.contactsContainer}>
                        {Object.keys(profile.contacts).map(key => {
                            //@ts-ignore
                            return <Contact key={key} contactType={key} contactValue={profile.contacts[key]}/>
                        })}
                    </div>
                </div>
            </List>
            {isOwner && <div>
                <Button variant="outlined" color="primary" onClick={goToEditMode}>Edit</Button>
            </div>}
        </>
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
