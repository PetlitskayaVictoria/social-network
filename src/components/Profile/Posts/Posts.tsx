import React from 'react';
import Post from './Post/Post';
import classes from './Posts.module.css'
import {PostsType} from "../../../redux/profile-reducer";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControl/FormsControls";

export type PostsPageType = {
    posts: Array<PostsType>
    addPost: (inputValue: string) => void
}

type FormDataType = {

}

const maxLength30 = maxLengthCreator(30)

const AddPostForm = (props: InjectedFormProps<FormDataType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                       name="postText"
                       component={TextArea}
                       validate={[required, maxLength30]}
                />
            </div>
            <button>Add your post</button>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<FormDataType>({
    form: "ProfileAddNewPostForm"
})(AddPostForm)

const Posts: React.FC<PostsPageType> = (props) => {
    const addPost = (value: any) => {
        props.addPost(value.postText)
    }
    const newPosts = props.posts.map( p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    return (<div>
            <h2>My Posts</h2>
            <AddPostReduxForm onSubmit={addPost}/>
        <div className={classes.postsContainer}>
            { newPosts }
        </div>
        </div>
    );
}

export default Posts;
