import {ActionsTypes, PostsType, ProfilePageType} from "./state";

const ADD_POST = "ADD-POST"

const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostsType = {
                id : 5,
                message : action.postText,
                likesCount : 0
            };
            state.posts.push(newPost);
            return state;
        default:
            return state;

    }
}

export const addPostActionCreator = (inputValue: string) => ({
    type : ADD_POST,
    postText : inputValue
} as const)

export default profileReducer;
