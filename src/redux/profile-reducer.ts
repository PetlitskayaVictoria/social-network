import {ActionsTypes} from "./redux-store";

const ADD_POST = "ADD-POST"

export type AddPostAC = ReturnType<typeof addPostActionCreator>

export type PostsType = {
    id: number
    message: string | undefined
    likesCount: number
}

export type ProfilePageType = {
    posts: Array<PostsType>
}

let initialState: ProfilePageType = {
    posts : [
        {id : 1, message : "Hey, what's up?", likesCount : 15},
        {id : 2, message : "It's my first post", likesCount : 138},
        {id : 3, message : "Third post", likesCount : 1387},
    ]
}

const profileReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id : 5,
                message : action.postText,
                likesCount : 0
            };
            return {...state, posts: [...state.posts, newPost]};
        default:
            return state;

    }
}

export const addPostActionCreator = (inputValue: string) => ({
    type : ADD_POST,
    postText : inputValue
} as const)

export default profileReducer;
