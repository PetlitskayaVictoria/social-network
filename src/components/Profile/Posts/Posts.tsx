import React, {ChangeEvent, useState} from 'react';
import Post from './Post/Post';
import classes from './Posts.module.css'
import {PostsType} from "../../../redux/profile-reducer";

export type PostsPageType = {
    posts: Array<PostsType>
    addPost: (inputValue: string) => void
}

const Posts: React.FC<PostsPageType> = (props) => {

    let [inputValue, setInputValue] = useState<string>("")
    const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }

    let textAreaValue = React.createRef<HTMLTextAreaElement>()
    const addPost = () => {
        props.addPost(inputValue)
        setInputValue("")
    }
    const newPosts = props.posts.map( p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })

    return (<div>
            <h2>My Posts</h2>
            <div>
                <textarea ref={textAreaValue} onChange={onChangeInput} value={inputValue}/>
            </div>
            <button onClick={addPost} className={classes.addPost}>Add your post</button>
        <div className={classes.postsContainer}>
            { newPosts }
        </div>
        </div>
    );
}

export default Posts;
