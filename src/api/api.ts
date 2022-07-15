import axios from "axios";
import {ProfileType} from "../types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '776ae1c8-608a-48b5-8f3d-f6ec478881e8'}
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then (response => response.data);
    },
    follow(userID: number) {
        return instance.post(`follow/${userID}`);
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`);
    },
    getProfile (userID: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userID);
    }
}

export const profileAPI = {
    getProfile (userID: number) {
        return instance.get(`profile/` + userID);
    },
    getStatus (userID: number) {
        return instance.get(`profile/status/` + userID);
    },
    updateStatus (status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto (photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile (profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { UserId: number}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LogoutResponseType = {
    data: { }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    me () {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login (email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
    },
    logout () {
        return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data);
    }
}
 type getCaptchaUrlResponseType = {
    url: string
 }
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
}