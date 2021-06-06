import React from 'react';
import styles from "./User.module.css";
import userPhoto from "../../../assets/images/user-avatar.jpeg";
import {NavLink} from 'react-router-dom';
import { UserType } from '../../../redux/users-reducer';


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
                        user.followed ? <button disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => {
                                                 unfollowUser(user.id)
                                             }} className={styles.followButton}>Unfollow</button> :
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        followUser(user.id)
                                    }} className={styles.followButton}>Follow</button>
                    }

                </div>
                <div className={styles.userInfoContainer}>
                    <div className={styles.userNameContainer}>
                        <span className={styles.name}>{user.name}</span>
                        <span className={styles.status}>{user.status}</span>
                    </div>
                    <div className={styles.locationInfo}>
                        <span>{"u.location.country"}</span>
                        <span>{"u.location.city"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
