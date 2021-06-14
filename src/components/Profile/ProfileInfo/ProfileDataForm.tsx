import {ProfileType} from "../../../redux/profile-reducer";
import React from "react";
import {reduxForm} from 'redux-form';
import {createField, Input, TextArea} from "../../common/FormsControl/FormsControls";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import styles from "../../common/FormsControl/FormsControls.module.css";
import {Button, Checkbox} from "@material-ui/core";

export type ProfileFormDataType = {
    fullName: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType>> = ({handleSubmit, error}) => {
    const profile = useSelector<AppRootStateType, ProfileType>(state => state.profilePage.profile)
    return (
        <form style={{marginTop : "10px"}} onSubmit={handleSubmit}>
            <div><Button type={"submit"}>Save</Button></div>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div><b>Name:</b>{createField("Full name", "fullName", [], Input)}</div>
            <div><b>About me:</b> {createField("About me", "aboutMe", [], TextArea)}</div>
            <div><b>Looking for a job:</b>  <Checkbox name={"lookingForAJob"}/></div>
            <div><b>My professional skills:</b>{createField("My professional skills", "lookingForAJobDescription", [], TextArea)}</div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <div key={key}>
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm
