import React from 'react';
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage : state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default compose <React.ComponentType>(withAuthRedirect, connect(mapStateToProps,
    {sendMessage: actions.sendMessage}))(Dialogs);