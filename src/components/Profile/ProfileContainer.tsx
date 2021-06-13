import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    addPost, getStatus, getUserProfile,
    PostsType,
    ProfileType, savePhoto, saveProfile, updateStatus,
} from "../../redux/profile-reducer";
import {StoreType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from "redux";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type PathParamsType = {
    userId: string
}

type mapStateToPropsType = {
    posts: PostsType[]
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type mapDispatchToPropsType = {
    addPost: (inputValue: string) => void
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileFormDataType) => Promise<void>
}

type OwnPropsType = mapStateToPropsType & mapDispatchToPropsType
type ProfileContainerType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<ProfileContainerType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            if (this.props.authorizedUserId)
                userId = this.props.authorizedUserId + ""
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     posts={this.props.posts}
                     addPost={this.props.addPost}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />
        )
    }
}

const mapStateToProps = (state: StoreType): mapStateToPropsType => {
    return {
        profile : state.profilePage.profile,
        posts : state.profilePage.posts,
        status : state.profilePage.status,
        authorizedUserId : state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addPost, getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


