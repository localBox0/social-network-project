import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const SelectedLink = () => {
    return (
        select => select.isActive ? s.dialogsItemsActiveLink : s.dialogsItemsLink
    );
}

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return <div className={s.dialogsItemsBox}>
        <img src='https://static.probusiness.io/720x480c/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg' />
        <NavLink to={path} className={SelectedLink()}>{props.name}</NavLink>
    </div>
}

export default DialogItem;