import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png"
import ProfileDataForm from "./ProfileDataForm";
import {ProfileType} from "../../../types/types";


type PropsType = {
    profile: ProfileType | null
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: React.FC<PropsType> = ({profile, updateStatus, status, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto (e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
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

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType>= ({profile, isOwner, goToEditMode}) => {
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

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;