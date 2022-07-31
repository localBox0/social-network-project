import {stopSubmit} from "redux-form";
import {ResultCodesEnum} from "../api/api";
import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'myapp/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            };
        case 'myapp/auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData : (userId: number | null, email: string | null,
                       login: string | null, isAuth: boolean ) => ({type: 'myapp/auth/SET_USER_DATA',
        payload:{userId, email, login, isAuth}  } as const),
    getCaptchaUrlSuccess : (captchaUrl: string) =>
        ({type: 'myapp/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));

    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }

}

export const getCaptchaUrl = (): ThunkType => async (dispatch: Dispatch<ActionsTypes>) => {
    const getCaptchaUrlData = await securityAPI.getCaptchaUrl();
    const captchaUrl = getCaptchaUrlData.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>