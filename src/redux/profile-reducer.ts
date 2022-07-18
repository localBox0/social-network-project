import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";
import {profileAPI} from "../api/profileAPI";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type PostType = {
    id: number
    message: string
    likesCount: number
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string | null
    large: string | null
}

type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
let initialState = {
    posts : [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: "It's my first project", likesCount: 20},
        {id: 3, message: 'BLAbla?', likesCount: 5},
        {id: 4, message: "Okkkk", likesCount: 4},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch(action.type) {
        case ADD_POST: {
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
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

type ActionsType = AddPostActionCreatorActionType | SetUserProfileActionType | SetStatusActionType |
    DeletePostActionType | SavePhotoSuccessActionType

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    let getUserProfileData = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(getUserProfileData));
}

export const getStatus = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    let getStatusData = await profileAPI.getStatus(userId);
            dispatch(setStatus(getStatusData));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let updateStatusData = await profileAPI.updateStatus(status);
            if (updateStatusData.resultCode === 0) {
                dispatch(setStatus(status));
            }
}

export const savePhoto = (file: any) => async (dispatch: Dispatch<ActionsType>) => {
    let savePhotoData = await profileAPI.savePhoto(file);
    if (savePhotoData.resultCode === 0) {
        dispatch(savePhotoSuccess(savePhotoData.data.photos));
    }
}

export const saveProfile = (profile: ProfileType)  => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const saveProfileData = await profileAPI.saveProfile(profile);
    if (saveProfileData.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else {
        dispatch(stopSubmit("edit-profile", {_error: saveProfileData.messages[0]}));
        return Promise.reject(saveProfileData.messages[0]);
    }
}

export default profileReducer;