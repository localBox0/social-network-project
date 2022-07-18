import {stopSubmit} from "redux-form";
import {ResultCodesEnum} from "../api/api";
import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";


const SET_USER_DATA = 'myapp/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'myapp/auth/GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null,
                                login: string | null, isAuth: boolean,
                                captchaUrl: string | null): SetAuthUserDataActionType => ({type: SET_USER_DATA, payload:
        {userId, email, login, isAuth, captchaUrl}  });

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = () => async (dispatch: Dispatch<ActionsTypes>) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        // @ts-ignore
        dispatch(setAuthUserData(id, email, login, true));
    }
};



export const login = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
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

export const logout = () => async (dispatch: Dispatch<ActionsTypes>) => {
    let logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false, null));
    }

}

export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionsTypes>) => {
    const getCaptchaUrlData = await securityAPI.getCaptchaUrl();
    const captchaUrl = getCaptchaUrlData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;