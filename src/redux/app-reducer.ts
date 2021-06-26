import {ActionsTypes} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZATION_SUCCESS = "APP/INITIALIZATION_SUCCESS"
const APP_SET_STATUS = "APP/SET_STATUS"

export type SetInitializedType = ReturnType<typeof setInitialized>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>

export type AppType = {
    status: RequestStatusType
    initialized: boolean
}

let initialState: AppType = {
    status : 'idle',
    initialized : false
}


const appReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {...state, initialized : true};
        case APP_SET_STATUS:
            return {...state, status : action.status}
        default:
            return state;

    }
}

export const setInitialized = () => ({
    type : INITIALIZATION_SUCCESS
} as const)

export const setAppStatusAC = (status: RequestStatusType) => ({type : APP_SET_STATUS, status} as const)

export const initializeApp = () => (dispatch: any) => {
        let pr = dispatch(getAuthUserData())
        pr.then(() => {
            dispatch(setInitialized())
        })

}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export default appReducer;
