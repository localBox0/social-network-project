import React from 'react';
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";

type MapStatePropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsType = {
    logout: (dispatch: any) => void
}
type PropsType = MapStatePropsType & MapDispatchToPropsType
class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapStatePropsType, MapDispatchToPropsType>(mapStateToProps, {logout})(HeaderContainer);