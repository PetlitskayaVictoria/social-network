import {ActionsTypes, ThunkType} from "./redux-store";
import {ResponseType, ResultCodesEnum, usersApi} from "../api/api";
import {Dispatch} from "react";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "social-network/users/FOLLOW"
const UNFOLLOW = "social-network/users/UNFOLLOW"
const SET_USERS = "social-network/users/SET_USERS"
const SET_CURRENT_PAGE = "social-network/users/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "social-network/users/SET_TOTAL_USERS_COUNT"
const SET_IS_FETCHING = "social-network/users/SET_IS_FETCHING"
const FOLLOWING_IN_PROGRESS = "social-network/users/FOLLOWING_IN_PROGRESS"

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
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed : true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed : false})
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
    return (async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    })
}

export const followUnfollowFlow = async (dispatch: Dispatch<any>, userId: number, apiMethod:(userId: number) => Promise<ResponseType<{}>>, actionCreator: (userId: number) => void) => {
        dispatch(toggleFollowingInProgress(true, userId))
        let data = await apiMethod(userId)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleFollowingInProgress(false, userId))
}

export const followUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), follow)
    }
}

export const unfollowUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), unfollow)
    }
}

export default usersReducer;
