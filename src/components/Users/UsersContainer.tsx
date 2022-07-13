import React from "react"
import {connect} from "react-redux"
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, getUsers
} from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../common/preloader/preloader"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersArr
} from "../../redux/users-selectors"
import {UserType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersArr(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.Component>(withAuthRedirect, connect(mapStateToProps, {
    follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers
}))(UsersContainer)