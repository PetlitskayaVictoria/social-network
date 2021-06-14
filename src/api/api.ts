import axios from "axios";
import { ProfileType } from "../redux/profile-reducer";
import {UserType} from "../redux/users-reducer";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";


export const instance = axios.create(
    {
        baseURL : 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials : true,
        headers : {
            "API-KEY" : "9fa0e134-93f8-4f6c-b99f-9c479847d776"
        }
    }
)

export const usersApi = {
    getUsers : (currentPage: number = 1, pageSize: number = 10) => {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unfollow : (userId: number) => {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`).then(response => response.data)
    },
    follow : (userId: number) => {
        return instance.post<ResponseType<{}>>(`follow/${userId}`).then(response => response.data)
    }
}

export const profileApi = {
    getUserProfile : (userId: string) => {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    getStatus : (userId: string) => {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    setStatus : (status: string) => {
        return instance.put<ResponseType<{}>>(`profile/status`, {status}).then(response => response.data)
    },
    savePhoto: (photoFile: File) => {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<ResponseType<ProfileType>>(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data)
    },
    saveProfile: (profile: ProfileFormDataType) => {
        return instance.put<ResponseType<{}>>(`/profile`, profile).then(response => response.data)
    }
}

export const authApi = {
    authorizationSuccess : () => {
        return instance.get<ResponseType<AuthorizationSuccessType>>(`auth/me`).then(response => response.data)
    },
    login : (email: string, password: string, rememberMe: boolean, captchaURL: string) => {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captchaURL
        }).then(response => response.data)
    },
    logout : () => {
        return instance.delete<ResponseType<{}>>(`auth/login`).then(response => response)
    },
    getCaptchaURL: () => {
        return instance.get(`security/get-captcha-url`).then(response => response.data)
    }
}
export enum ResultCodesEnum  {
    Success = 0,
    Error = 1,
    Captcha = 10
}
type GetUsersType = {
    items: UserType[]
    totalCount: number
    error: string
}
type AuthorizationSuccessType = {
    id: number
    email: string
    login: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
