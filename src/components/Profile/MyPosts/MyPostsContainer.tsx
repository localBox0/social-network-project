import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        posts : state.profilePage.posts,
        newPostText : state.profilePage.newPostText,
    }
}

const MyPostsContainer = connect(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;