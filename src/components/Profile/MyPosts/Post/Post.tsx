import React from 'react';
import s from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Buck_The_GSD.jpg/250px-Buck_The_GSD.jpg'
            alt={"Post owner's main photo"}/>
                { props.message }
            <div>
                <span>Likes { props.likesCount }</span>
            </div>
        </div>
    )
}

export default Post;