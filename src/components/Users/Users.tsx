import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, getUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersArr,
    getUsersFilter
} from "../../redux/users-selectors";
import {useHistory} from "react-router-dom";



type PropsType = {
}
export const Users: React.FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersArr)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()
    const queryString = require('query-string');

    useEffect(() => {
        const parsed: {term: string, page: string, friend: string} = queryString.parse(history.location.search)
        let actualPage = currentPage
        let actualFilter = filter
        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false}

        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        history.push({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage])
    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    return <div>

        <UsersSearchForm onFilterChanged={onFilterChanged}/>

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {users.map(u => <User user={u} key={u.id}
                                  followingInProgress={followingInProgress}
                                  unfollow={unfollow} follow={follow}/>
            )}
        </div>
    </div>
}