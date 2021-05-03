import {ActionsTypes, ThunkType} from "./redux-store";
import {ResultCodesEnum, usersApi} from "../api/api";
import {Dispatch} from "react";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const SET_IS_FETCHING = 'SET_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null | string
    photos: {
        small: null | string
        large: null | string
    },
    status: null | string
    followed: boolean
}

export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

let initialState: UsersPageType = {
    users : [],
    pageSize : 10,
    totalCount : 0,
    currentPage : 1,
    isFetching : false,
    followingInProgress : []
}

const usersReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users : state.users.map(u => {
                    return action.userId === u.id ? {...u, followed : true} : u
                })
            }
        case UNFOLLOW:
            return {
                ...state, users : state.users.map(u => {
                    return action.userId === u.id ? {...u, followed : false} : u
                })
            }
        case SET_USERS:
            return {...state, users : [...action.users]}
        case SET_CURRENT_PAGE: {
            return {...state, currentPage : action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalCount : action.totalUsersCount}
        }
        case SET_IS_FETCHING: {
            return {...state, isFetching : action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress : action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;

    }
}

export type FollowACType = ReturnType<typeof follow>
export type UnfollowACType = ReturnType<typeof unfollow>
export type SetUsersACType = ReturnType<typeof setUsers>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type ToggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export type FollowingInProgressType = ReturnType<typeof toggleFollowingInProgress>



export const follow = (userId: number) => ({
    type : FOLLOW,
    userId : userId
} as const)

export const unfollow = (userId: number) => ({
    type : UNFOLLOW,
    userId : userId
} as const)

export const setUsers = (users: Array<UserType>) => ({
    type : SET_USERS,
    users : users
} as const)

export const setCurrentPage = (currentPage: number) => ({
    type : SET_CURRENT_PAGE,
    currentPage
} as const)

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type : SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const)

export const toggleIsFetching = (isFetching: boolean) => (
    {
        type : SET_IS_FETCHING,
        isFetching
    } as const
)

export const toggleFollowingInProgress = (isFetching: boolean, userId: number) => (
    {
        type : FOLLOWING_IN_PROGRESS,
        isFetching,
        userId
    } as const
)

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return ((dispatch) => {
        dispatch(toggleIsFetching(true))
        usersApi.getUsers(currentPage, pageSize).then((data) => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    })
}

export const followUser = (userId: number): ThunkType => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersApi.follow(userId).then((data) => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(follow(userId))
            }
            dispatch(toggleFollowingInProgress(false, userId))
        })
    }
}

export const unfollowUser = (userId: number): ThunkType => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersApi.unfollow(userId).then((data) => {
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(unfollow(userId))
            }
            dispatch(toggleFollowingInProgress(false, userId))
        })
    }
}


export default usersReducer;
