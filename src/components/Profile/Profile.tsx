import React, {ChangeEvent, createRef, useState} from 'react';
import classes from './Profile.module.css';
import {addPostActionCreator} from "../../redux/profile-reducer";
import {
    ActionsTypes,
    PostsType
} from "../../redux/state";
import Posts from "./Posts/Posts";

type ProfileType = {
    posts: Array<PostsType>
    dispatch: (action: ActionsTypes) => void
}


const Profile: React.FC<ProfileType> = (props) => {

    let [inputValue, setInputValue] = useState<string>("")
    const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }


    let textAreaValue = React.createRef<HTMLTextAreaElement>()
    const addPost = () => {
        props.dispatch(addPostActionCreator(inputValue))
        setInputValue("")
    }

    return (
        <div className={classes.profilePageContainer}>
            <img className={classes.profilePicture}
                 src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fjoshuabecker%2Ffiles%2F2018%2F02%2Fthe-case-for-minimalism-1200x680.jpg"/>
            <div className={classes.myPosts}>
                <h2>My Posts</h2>
                <div>
                    <textarea ref={textAreaValue} onChange={onChangeInput} value={inputValue}/>
                </div>
                <button onClick={addPost} className={classes.addPost}>Add your post</button>
                <Posts posts={props.posts}/>
            </div>
        </div>

    );
}

export default Profile;
