import {ActionsTypes, ThunkType} from "./redux-store";
import {profileApi, ResultCodesEnum} from "../api/api";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {stopSubmit} from "redux-form";

const ADD_POST = "social-network/profile/ADD-POST"
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE"
const SET_STATUS = "social-network/profile/SET_STATUS"
const SAVE_PHOTO_SUCCESS = "social-network/profile/SAVE_PHOTO_SUCCESS"

export type AddPostACType = ReturnType<typeof addPost>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type SetStatus = ReturnType<typeof setStatus>
export type SetPhoto = ReturnType<typeof savePhotoSuccess>

export type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}

export type ProfileType = {
    aboutMe: undefined | string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: undefined | string
    fullName: undefined | string
    userId: string
    photos: {
        small: undefined | string
        large: undefined | string
    }
}

export type ProfilePageType = {
    posts: Array<PostsType>
    profile: null | ProfileType
    status: string
}

let initialState: ProfilePageType = {
    posts : [
        {id : 1, message : "Hey, what's up?", likesCount : 15},
        {id : 2, message : "It's my first post", likesCount : 138},
        {id : 3, message : "Third post", likesCount : 1387},
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id : 5,
                message : action.postText,
                likesCount : 0
            };
            return {...state, posts: [...state.posts, newPost]};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS: return {...state, status: action.status}
        case SAVE_PHOTO_SUCCESS: return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

export const addPost = (inputValue: string) => ({
    type : ADD_POST,
    postText : inputValue
} as const)

export const setUserProfile = (profile: any) => ({
    type: SET_USER_PROFILE,
    profile
} as const)

export const setStatus = (status: string) => ({
    type: SET_STATUS,
    status
} as const)

export const savePhotoSuccess = (photos: {
    small: undefined | string
    large: undefined | string
}) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
} as const)

export const getUserProfile = (userId: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.getUserProfile(userId)
        dispatch(setUserProfile(data))
    }
}

export const getStatus = (userId: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.getStatus(userId)
        dispatch(setStatus(data))
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
            let data = await profileApi.setStatus(status)
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(setStatus(status))
            }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        let data = await profileApi.savePhoto(file)
        if (data.resultCode === ResultCodesEnum.Success) {
           dispatch(savePhotoSuccess(data.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileFormDataType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id
        let data = await profileApi.saveProfile(profile)
        if (data.resultCode === ResultCodesEnum.Success) {
            if(userId) {
                dispatch(getUserProfile(userId.toString()))
            }
        } else {
            dispatch(stopSubmit("edit-profile", {_error : data.messages[0]}))
            return Promise.reject(data.messages[0])
        }
    }
}

export default profileReducer;
