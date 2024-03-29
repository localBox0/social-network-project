import {GetItemsType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profileAPI";



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data);
    },
    follow(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`).then(res => res.data);
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`).then(res => res.data) as Promise<APIResponseType>;
    },
    getProfile(userID: number) {
        return profileAPI.getProfile(userID);
    }
}