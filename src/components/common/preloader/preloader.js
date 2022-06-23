import React from "react";
import preloader from "../../../assets/images/spinner.png";
import s from "./preloader.module.css"


let Preloader = (props) => {
    return <div className={s.preloader}>
        <img src={preloader}/>
    </div>
}

export default Preloader;