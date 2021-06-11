import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {AddPostACType, SetPhoto, SetStatus, SetUserProfileType} from "./profile-reducer";
import dialogsReducer, {CreateMessageAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {
    FollowACType,
    FollowingInProgressType,
    SetCurrentPageACType,
    SetTotalUsersCountACType,
    SetUsersACType,
    ToggleIsFetchingACType,
    UnfollowACType
} from "./users-reducer";
import authReducer, {SetAuthUserDataType, SetCaptchaType, SetLoginDataType} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer, {SetInitializedType} from "./app-reducer";

export type ActionsTypes =
    AddPostACType
    | CreateMessageAC
    | FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | ToggleIsFetchingACType
    | SetUserProfileType
    | SetAuthUserDataType
    | FollowingInProgressType
    | SetStatus
    | SetLoginDataType
    | SetInitializedType
    | SetPhoto
    | SetCaptchaType

export type StoreType = ReturnType<typeof RootReducer>
export type DispatchType = (action: ActionsTypes) => void

let RootReducer = combineReducers({
    profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    sidebar : sidebarReducer,
    usersPage : usersReducer,
    auth : authReducer,
    form : formReducer,
    app : appReducer
})

export type ThunkType = ThunkAction<void, StoreType, unknown, ActionsTypes>

export let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));
