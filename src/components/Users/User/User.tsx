import React from 'react';
import styles from "./User.module.css";
import userPhoto from "../../../assets/images/user-avatar.png";
import {NavLink} from 'react-router-dom';
import { UserType } from '../../../redux/users-reducer';
import {Button} from "@material-ui/core";

type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

const User: React.FC<UserPropsType> = (
    {user, followingInProgress, followUser, unfollowUser}
) => {

    return (
        <div>
            <div className={styles.userContainer} key={user.id}>
                <div className={styles.avatarContainer}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt="userAvatar"
                             className={styles.avatar}/>
                    </NavLink>
                    {
                        user.followed ? <Button variant={"outlined"} color={"secondary"} disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => {
                                                 unfollowUser(user.id)
                                             }} className={styles.followButton}>Unfollow</Button> :
                            <Button variant={"outlined"} color={"primary"} disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        followUser(user.id)
                                    }} className={styles.followButton}>Follow</Button>
                    }

                </div>
                <div className={styles.userInfoContainer}>
                    <div className={styles.userNameContainer}>
                        <span className={styles.name}>{user.name}</span>
                        <span className={styles.status}>{user.status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
