import {ActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZATION_SUCCESS = "APP/INITIALIZATION_SUCCESS"

export type SetInitializedType = ReturnType<typeof setInitialized>

export type AppType = {
    initialized: boolean
}

let initialState: AppType = {
    initialized : false
}


const appReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {...state, initialized : true};
        default:
            return state;

    }
}

export const setInitialized = () => ({
    type : INITIALIZATION_SUCCESS
} as const)

export const initializeApp = () => (dispatch: any) => {
    let pr = dispatch(getAuthUserData())
    pr.then(() => {
        dispatch(setInitialized())
    })
}

export default appReducer;
