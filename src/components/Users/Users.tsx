import React from 'react';
import {UserType} from "../../redux/users-reducer";
import styles from './Users.module.css'

type UsersType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void

}

const Users = (props: UsersType) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id : 1,
                avatar : "https://img2.freepng.ru/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
                followed : false,
                fullName : "Andrey A.",
                status : "Hey, I am new here",
                location : {country : "Chile", city : "Santiago"}
            },
            {
                id : 2,
                avatar : "https://img2.freepng.ru/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
                followed : true,
                fullName : "Nikita S.",
                status : "I want to go to Italy",
                location : {country : "Belarus", city : "Gomel"}
            },
            {
                id : 3,
                avatar : "https://img2.freepng.ru/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
                followed : false,
                fullName : "Max L.",
                status : "Lalala",
                location : {country : "Belarus", city : "Minsk"}
            },])
    }
    return (
        <div className={styles.usersContainer}>
            {
                props.users.map(u => {
                    return <div className={styles.userContainer} key={u.id}>
                        <div className={styles.avatarContainer}>
                            <img src={u.avatar} alt="userAvatar" className={styles.avatar}/>
                            {
                                u.followed ? <button onClick={() => {props.unfollow(u.id)}} className={styles.followButton}>Unfollow</button> :
                                    <button onClick={() => {props.follow(u.id)}} className={styles.followButton}>Follow</button>
                            }

                        </div>
                        <div className={styles.userInfoContainer}>
                            <div className={styles.userNameContainer}>
                                <span className={styles.name}>{u.fullName}</span>
                                <span className={styles.status}>{u.status}</span>
                            </div>
                            <div className={styles.locationInfo}>
                                <span>{u.location.country}</span>
                                <span>{u.location.city}</span>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default Users;
