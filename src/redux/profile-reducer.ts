import {ActionsTypes, ThunkType} from "./redux-store";
import {profileApi, ResultCodesEnum} from "../api/api";

const ADD_POST = "social-network/profile/ADD-POST"
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE"
const SET_STATUS = "social-network/profile/SET_STATUS"

export type AddPostACType = ReturnType<typeof addPost>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type SetStatus = ReturnType<typeof setStatus>

export type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}

export type ProfileType = {
    aboutMe: null | string
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
    lookingForAJobDescription: null | string
    fullName: null | string
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

export default profileReducer;
