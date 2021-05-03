import axios from "axios";
import { ProfileType } from "../redux/profile-reducer";
import {UserType} from "../redux/users-reducer";


export const instance = axios.create(
    {
        baseURL : 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials : true,
        headers : {
            "API-KEY" : "9fa0e134-93f8-4f6c-b99f-9c479847d776"
        }
    }
)

export enum ResultCodesEnum  {
    Success = 0,
    Error = 1
}

type getUsersType = {
    items: UserType[]
    totalCount: number
    error: string
}

type toggleFollowType = {
    data: {}
    resultCode: number
    messages: string[]
}

export const usersApi = {
    getUsers : (currentPage: number = 1, pageSize: number = 10) => {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unfollow : (userId: number) => {
        return instance.delete<toggleFollowType>(`follow/${userId}`).then(response => response.data)
    },
    follow : (userId: number) => {
        return instance.post<toggleFollowType>(`follow/${userId}`).then(response => response.data)
    }
}

type setStatusType = {
    data: {}
    resultCode: number
    messages: string[]
}

export const profileApi = {
    getUserProfile : (userId: string) => {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus : (userId: string) => {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    setStatus : (status: string) => {
        return instance.put<setStatusType>(`profile/status`, {status}).then(response => response.data)
    }
}

type authorizationSuccessType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: string[]
}

type loginType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: string[]
}

type logoutType = {
    data: {}
    resultCode: number
    messages: string[]
}

export const authApi = {
    authorizationSuccess : () => {
        return instance.get<authorizationSuccessType>(`auth/me`).then(response => response.data)
    },
    login : (email: string, password: string, rememberMe: boolean, captcha: boolean) => {
        return instance.post<loginType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout : () => {
        return instance.delete<logoutType>(`auth/login`).then(response => response)
    }
}