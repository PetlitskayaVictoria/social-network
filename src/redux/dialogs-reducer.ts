import {
    ActionsTypes,
    DialogsPageType,
    MessagesType
} from "./state";

const CHANGE_INPUT_MESSAGE = "CHANGE-INPUT-MESSAGE"
const CREATE_MESSAGE = "CREATE-MESSAGE"

const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
    switch (action.type) {
        case CHANGE_INPUT_MESSAGE:
            state.textMessage = action.text;
            return state;
        case CREATE_MESSAGE:
            let newMessage: MessagesType = {
                id : 5,
                message : state.textMessage,
                userId : 1,
                avatar : "https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png"
            };
            state.messages.push(newMessage);
            state.textMessage = "";
            return state;
        default:
            return state;

    }
}

export const changeInputValueActionCreator = (value: string) => ({
        type: CHANGE_INPUT_MESSAGE,
        text: value
    } as const
)

export const addMessageActionCreator = () => ({ type: CREATE_MESSAGE} as const)

export default dialogsReducer;
