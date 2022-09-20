import React from "react"
import {useSelector} from "react-redux"
import Preloader from "../common/preloader/preloader"
import {getIsFetching} from "../../redux/users-selectors"
import {Users} from "./Users";



type UsersPagePropsType = {
}
export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}