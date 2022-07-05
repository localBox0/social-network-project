import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png"
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, updateStatus, status, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto (e.target.files[0]);
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }

    return (
        <div>
            <div className={s.globalImage}>
                <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
                <div> { isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>} </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                { editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {setEditMode(true)}}
                                 profile={profile} isOwner={isOwner}/>}
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit info</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        }).filter(deleteFromResult)}
        </div>
    </div>
}

export const deleteFromResult = ({key}) => key !== 'vk';

export const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;