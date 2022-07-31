import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}
export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS})
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>