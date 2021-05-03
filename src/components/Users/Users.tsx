import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user-avatar.jpg";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from 'react-router-dom';

type UsersType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    followingInProgress: Array<number>
}

const Users = (props: UsersType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i ++) {
        pages.push(i)
    }

    return (
        <div>
            <div className={styles.usersContainer}>
                <div className={styles.paginationContainer}>
                    {pages.map(p => {
                        return <span className={props.currentPage === p ? styles.selected : ""}
                                     onClick={() => {
                                         props.onPageChanged(p)
                                     }}>
                            {p}
                        </span>
                    })}
                </div>
                {
                    props.users.map(u => {
                        return <div className={styles.userContainer} key={u.id}>
                            <div className={styles.avatarContainer}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="userAvatar"
                                         className={styles.avatar}/>
                                </NavLink>
                                {
                                    u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                         onClick={() => {
                                                             props.unfollowUser(u.id)
                                                         }} className={styles.followButton}>Unfollow</button> :
                                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                onClick={() => {
                                                    props.followUser(u.id)
                                                }} className={styles.followButton}>Follow</button>
                                }

                            </div>
                            <div className={styles.userInfoContainer}>
                                <div className={styles.userNameContainer}>
                                    <span className={styles.name}>{u.name}</span>
                                    <span className={styles.status}>{u.status}</span>
                                </div>
                                <div className={styles.locationInfo}>
                                    <span>{"u.location.country"}</span>
                                    <span>{"u.location.city"}</span>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Users
