import React from 'react';
import styles from "./Users.module.css";
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

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

const Users: React.FC<UsersType> = ({
                                        currentPage,
                                        onPageChanged,
                                        totalUsersCount,
                                        pageSize, users, followUser,
                                        followingInProgress, unfollowUser,
                                        ...props
                                    }) => {

    return (
        <div>
            <div className={styles.usersContainer}>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                />
                <div>
                    {
                        users.map(u => {
                            return <User key={u.id}
                                         user={u}
                                         followingInProgress={followingInProgress}
                                         followUser={followUser}
                                         unfollowUser={unfollowUser}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Users
