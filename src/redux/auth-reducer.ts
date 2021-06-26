import {ActionsTypes, ThunkType} from "./redux-store";
import {authApi, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA"
const SET_LOGIN_DATA = "social-network/auth/SET_LOGIN_DATA"
const SET_CAPTCHA_URL = "social-network/auth/SET_CAPTCHA_URL"

export type SetAuthUserDataType = ReturnType<typeof setAuthUserData>
export type SetLoginDataType = ReturnType<typeof updateLoginData>
export type SetCaptchaType = ReturnType<typeof setCaptchaURL>

export type AuthType = {
    id: number | null
    email: string
    login: string
    password: string
    rememberMe: boolean
    isAuth: boolean
    captchaURL: string | null
}

let initialState: AuthType = {
    id : null,
    email : "",
    login : "",
    password : "",
    rememberMe : false,
    isAuth : false,
    captchaURL: null
}

const authReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth : true};
        case SET_LOGIN_DATA:
            return {...state, ...action.payload}
        case SET_CAPTCHA_URL: return {...state, ...action.payload}
        default:
            return state;

    }
}

export const setAuthUserData = (id: number, email: string, login: string) => ({
    type : SET_USER_DATA,
    data : {id, email, login}
} as const)

export const updateLoginData = (email: string, password: string, rememberMe: boolean, captchaURL: string | null, isAuth: boolean) => ({
    type : SET_LOGIN_DATA,
    payload : {
        email,
        password,
        rememberMe,
        captchaURL,
        isAuth
    }
} as const)

export const setCaptchaURL = (url: string | null) => ({
    type : SET_CAPTCHA_URL,
    payload: {url}
} as const)

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authApi.authorizationSuccess()
        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captchaURL: string): ThunkType => {
    return async (dispatch) => {
        let data = await authApi.login(email, password, rememberMe, captchaURL)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(updateLoginData(email, password, rememberMe, captchaURL, false))
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodesEnum.Captcha) {
                dispatch(getCaptcha())
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error : message}))
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        const data = await authApi.getCaptchaURL()
        const captchaURL = data.url
        dispatch(setCaptchaURL(captchaURL))
    }
}

export const logOut = (): ThunkType => async (dispatch) => {
    let res = await authApi.logout()
    if (res.data.resultCode === ResultCodesEnum.Success) {
        dispatch(updateLoginData("", "", false, null, false))
    }
}

export default authReducer;
