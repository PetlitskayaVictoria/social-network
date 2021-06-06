import {ActionsTypes, ThunkType} from "./redux-store";
import {authApi, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "social-network/auth/SET_USER_DATA"
const SET_LOGIN_DATA = "social-network/auth/SET_LOGIN_DATA"

export type SetAuthUserDataType = ReturnType<typeof setAuthUserData>
export type SetLoginDataType = ReturnType<typeof updateLoginData>

export type AuthType = {
    id: number | null
    email: string
    login: string
    password: string
    rememberMe: boolean
    captcha: boolean
    isAuth: boolean
}

let initialState: AuthType = {
    id : null,
    email : "",
    login : "",
    password : "",
    rememberMe : false,
    captcha : false,
    isAuth : false
}

const authReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth : true};
        case SET_LOGIN_DATA:
            return {...state, ...action.payload}
        default:
            return state;

    }
}

export const setAuthUserData = (id: number, email: string, login: string) => ({
    type : SET_USER_DATA,
    data : {id, email, login}
} as const)

export const updateLoginData = (email: string, password: string, rememberMe: boolean, captcha: boolean, isAuth: boolean) => ({
    type : SET_LOGIN_DATA,
    payload : {
        email,
        password,
        rememberMe,
        captcha,
        isAuth
    }
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

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean): ThunkType => {
    return async (dispatch) => {
        let data = await authApi.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(updateLoginData(email, password, rememberMe, captcha, true))
            dispatch(getAuthUserData())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error : message}))
        }
    }
}

export const logOut = (): ThunkType => async (dispatch) => {
    let res = await authApi.logout()
    if (res.data.resultCode === ResultCodesEnum.Success) {
        dispatch(updateLoginData("", "", false, false, false))
    }
}

export default authReducer;
