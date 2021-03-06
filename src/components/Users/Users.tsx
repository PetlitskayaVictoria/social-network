import React from 'react';
import {UserType} from "../../redux/users-reducer";
import styles from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/images/user-avatar.jpg'

type UsersType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void

}

class Users extends React.Component<UsersType> {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then((response: any) => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (

            <div className={styles.usersContainer}>
                {
                    this.props.users.map(u => {
                        return <div className={styles.userContainer} key={u.id}>
                            <div className={styles.avatarContainer}>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="userAvatar"
                                     className={styles.avatar}/>
                                {
                                    u.followed ? <button onClick={() => {
                                            this.props.unfollow(u.id)
                                        }} className={styles.followButton}>Unfollow</button> :
                                        <button onClick={() => {
                                            this.props.follow(u.id)
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
        );
    }

}

export default Users;
