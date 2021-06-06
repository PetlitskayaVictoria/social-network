import {ActionsTypes} from "./redux-store";

const CREATE_MESSAGE = "social-network/dialogs/CREATE-MESSAGE"

export type CreateMessageAC = ReturnType<typeof addMessageActionCreator>

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
export type DialogsType = {
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

let initialState: DialogsPageType = {
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
    ]
}

const dialogsReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            let newMessage: MessagesType = {
                id : 5,
                message : action.value,
                userId : 1,
                avatar : "https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png"
            };
            return {...state, messages: [...state.messages, newMessage]};
        default:
            return state;
    }
}

export const addMessageActionCreator = (value: string) => ({ type: CREATE_MESSAGE, value} as const)

export default dialogsReducer;
