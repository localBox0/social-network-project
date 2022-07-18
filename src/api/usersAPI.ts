import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profileAPI";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data);
    },
    follow(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`).then(res => res.data);
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponseType>;
    },
    getProfile(userID: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userID);
    }
}