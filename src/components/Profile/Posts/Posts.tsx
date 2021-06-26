import React from 'react';
import Post from './Post/Post';
import classes from './Posts.module.css'
import {PostsType} from "../../../redux/profile-reducer";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControl/FormsControls";
import {Button, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export type PostsPageType = {
    posts: Array<PostsType>
    addPost: (inputValue: string) => void
}

type FormDataType = {}

const maxLength1000 = maxLengthCreator(1000)

const AddPostForm = (props: InjectedFormProps<FormDataType>) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name="postText"
                    component={TextArea}
                    validate={[required, maxLength1000]}
                    placeholder={"Type your thoughts here..."}
                    style={{minWidth : "400px", minHeight : "100px", marginBottom : "5px", padding : "10px"}}
                />
            </div>
            <Button type={'submit'}
                    variant={"outlined"}
                    color={"primary"}
                    style={{margin : "10px 0"}}>Add your post</Button>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<FormDataType>({
    form : "ProfileAddNewPostForm"
})(AddPostForm)

const Posts: React.FC<PostsPageType> = (props) => {
    const addPost = (value: any) => {
        props.addPost(value.postText)
    }
    const newPosts = props.posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    return (
        <Paper style={{marginTop : "30px", padding : "15px", backgroundColor : "#ccc9ff"}}>
            <Typography variant="h3" className={classes.postsHeader}>My Posts</Typography>
            <AddPostReduxForm onSubmit={addPost}/>
            <div className={classes.postsContainer}>
                {newPosts}
            </div>
        </Paper>
    );
}

export default Posts;
