import {updateObjectInArray} from "../utils/object-helpers";
import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/usersAPI";
import {UserType} from "../types/types";



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users id
    filter: {term: '', friend: null as null | boolean}
};


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'USERS_FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case 'USERS_UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case 'USERS_SET_USERS': {
            return {...state, users: action.users}
        }
        case 'USERS_SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'USERS_SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'USERS_TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SET_FILTER': {
            return {...state, filter: action.payload}
        }
        case 'USERS_TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'USERS_FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USERS_UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'USERS_SET_USERS', users} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS_SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'USERS_SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS_TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'USERS_TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilter(filter));
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.setCurrentPage(currentPage));
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let followData = await usersAPI.follow(userId);
        if (followData.resultCode === 0) {
            dispatch(actions.followSuccess(userId));
        }
        dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let unfollowData = await usersAPI.unfollow(userId);
        if (unfollowData.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userId));
        }
        dispatch(actions.toggleFollowingProgress(false, userId));
    }
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
