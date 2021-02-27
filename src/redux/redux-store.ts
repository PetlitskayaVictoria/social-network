import {combineReducers, createStore} from "redux";
import profileReducer, {AddPostAC} from "./profile-reducer";
import dialogsReducer, {ChangeInputMessageAC, CreateMessageAC} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {FollowACType, SetUsersACType, UnfollowACType} from "./users-reducer";


export type ActionsTypes = AddPostAC | ChangeInputMessageAC | CreateMessageAC | FollowACType | UnfollowACType | SetUsersACType
export type StoreType = ReturnType<typeof reducers>
export type DispatchType = (action: ActionsTypes) => void

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
})

export let store = createStore(reducers);
