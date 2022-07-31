import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";



const SelectedLink = () => {
    return (
        select => select.isActive ? s.activeLink : s.item
    );
}

const Navbar: React.FC = () => {

    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to="/profile" className={SelectedLink()}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/dialogs" className={SelectedLink()}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/users" className={SelectedLink()}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/news" className={SelectedLink()}>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/music" className={SelectedLink()}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/settings" className={SelectedLink()}>Settings</NavLink>
        </div>
    </nav>

}

export default Navbar;