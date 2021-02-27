import profileReducer, {addPostActionCreator} from "./profile-reducer";
import dialogsReducer, {addMessageActionCreator, changeInputValueActionCreator} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {FollowACType, SetUsersACType, UnfollowACType,} from "./users-reducer";

type AddPostAC = ReturnType<typeof addPostActionCreator>
type ChangeInputMessageAC = ReturnType<typeof changeInputValueActionCreator>
type CreateMessageAC = ReturnType<typeof addMessageActionCreator>

type ActionsTypes = AddPostAC | ChangeInputMessageAC | CreateMessageAC | FollowACType | UnfollowACType | SetUsersACType

type StoreType = {
    _state: StateType
    getState: () => StateType
    _onChange: (state: StateType) => void
    subscribe: (observer: (state: StateType) => void) => void
    dispatch: (action: ActionsTypes) => void
}

export let store: StoreType = {
    _state : {
        profilePage : {
            posts : [
                {id : 1, message : "Hey, what's up?", likesCount : 15},
                {id : 2, message : "It's my first post", likesCount : 138},
                {id : 3, message : "Third post", likesCount : 1387},
            ]
        },
        dialogsPage : {
            dialogs : [
                {
                    id : 1,
                    name : "Victoria",
                    img : "https://img2.pngio.com/avatar-female-person-user-woman-young-icon-avatar-person-png-512_512.png"
                },
                {id : 2, name : "Marcelito", img : "https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png"},
                {
                    id : 3,
                    name : "Sasha",
                    img : "https://www.news4jax.com/resizer/b89RYEm5oAgzxJxWIGoyLJ9lZu8=/960x960/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/X462YQ4HIJEGHHX2I3LXRV4G7A.jpg"
                },
                {
                    id : 4,
                    name : "Marina",
                    img : "data:image/jpeg;base64,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"
                },
                {
                    id : 5,
                    name : "Yulia",
                    img : "https://st2.depositphotos.com/3369547/11437/v/950/depositphotos_114376096-stock-illustration-avatar-icon-woman-person-design.jpg"
                },
            ],
            messages : [
                {
                    id : 1,
                    message : "Hey you",
                    userId : 1,
                    avatar : "https://img2.pngio.com/avatar-female-person-user-woman-young-icon-avatar-person-png-512_512.png"
                },
                {
                    id : 2,
                    message : "Can you help me?",
                    userId : 2,
                    avatar : "https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png"
                },
                {
                    id : 3,
                    message : "Sure! What's the problem?",
                    userId : 1,
                    avatar : "https://img2.pngio.com/avatar-female-person-user-woman-young-icon-avatar-person-png-512_512.png"
                },
                {
                    id : 4,
                    message : "Blabla",
                    userId : 2,
                    avatar : "https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png"
                },
            ],
            textMessage : "",
        },
        sidebar : {
            friends : [
                {
                    id : 1,
                    name : "Irina",
                    img : "https://cnet2.cbsistatic.com/img/liJ9UZA87zs1viJiuEfVnL7YYfw=/940x0/2020/05/18/5bac8cc1-4bd5-4496-a8c3-66a6cd12d0cb/fb-avatar-2.jpg"
                },
                {
                    id : 2,
                    name : "Inga",
                    img : "data:image/png;base64,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"
                },
                {
                    id : 3,
                    name : "Platon",
                    img : "https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"
                },
            ]
        },
    },
    getState() {
        return this._state
    },
    _onChange() {
        console.log("State is changed");
    },
    subscribe(observer) {
        this._onChange = observer
    },

    dispatch(action) {

        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.dialogsPage, action);
        sidebarReducer(this._state.sidebar, action);

        this._onChange(this._state);


    }
}


export type FriendsType = {
    id: number
    name: string
    img: string
}
export type MessagesType = {
    id: number
    message: string | undefined
    userId: number
    avatar: string
}
export type DialogsType = {
    id: number
    name: string
    img: string
}
export type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}
export type SidebarType = {
    friends: Array<FriendsType>
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    textMessage: string | undefined
}
export type ProfilePageType = {
    posts: Array<PostsType>
}
export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


