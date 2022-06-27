import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {savePhoto} from "../../redux/profile-reducer";


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile}
                         status={props.status} updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;