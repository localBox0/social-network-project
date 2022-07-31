import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {PostType} from "../../../types/types";

type AddPostFormValuesType = {
    newPostText: string
}
type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}
const MyPosts: React.FC<PropsType> = (props) => {

    let postsElement = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    let addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.postsBlock}>
                {postsElement}
            </div>
        </div>
    )
}

const MaxLength150 = maxLengthCreator(150);

type FormPropsType = {}
const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, FormPropsType> & FormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} placeholder="Add new post..." name="newPostText"
                       validate={[required, MaxLength150]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<AddPostFormValuesType, FormPropsType>({
    form: "profileAddPostForm"
})(AddNewPostForm);

export default MyPosts;