import {ActionsTypes} from "./redux-store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"

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
}

let initialState: UsersPageType = {
    users : []
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
        default:
            return state;

    }
}

export type FollowACType = ReturnType<typeof followAC>
export type UnfollowACType = ReturnType<typeof unfollowAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>

export const followAC = (userId: number) => ({
    type : FOLLOW,
    userId : userId
} as const)

export const unfollowAC = (userId: number) => ({
    type : UNFOLLOW,
    userId : userId
} as const)

export const setUsersAC = (users: Array<UserType>) => ({
    type : SET_USERS,
    users : users
} as const)

export default usersReducer;
