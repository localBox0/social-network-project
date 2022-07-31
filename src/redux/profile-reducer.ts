import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";
import {profileAPI} from "../api/profileAPI";
import {ContactsType, PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first project", likesCount: 20},
        {id: 3, message: 'BLAbla?', likesCount: 5},
        {id: 4, message: "Okkkk", likesCount: 4},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'PROFILE_ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case 'PROFILE_SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'PROFILE_SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'PROFILE_DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'PROFILE_SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'PROFILE_ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE_SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE_SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'PROFILE_DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE_SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let getUserProfileData = await usersAPI.getProfile(userId);
    dispatch(actions.setUserProfile(getUserProfileData));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let getStatusData = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(getStatusData));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let updateStatusData = await profileAPI.updateStatus(status);
    if (updateStatusData.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let savePhotoData = await profileAPI.savePhoto(file);
    if (savePhotoData.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(savePhotoData.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState,) => {
    const userId = getState().auth.userId;
    const saveProfileData = await profileAPI.saveProfile(profile);
    if (saveProfileData.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error(`userId can't be null`)
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: saveProfileData.messages[0]}));
        return Promise.reject(saveProfileData.messages[0]);
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>