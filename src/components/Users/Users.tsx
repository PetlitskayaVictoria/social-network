import React from 'react';
import styles from "./Users.module.css";
import {UserType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";
import {Paper} from "@material-ui/core";
import Preloader from "../common/Preloader/Preloader";

type UsersType = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    followingInProgress: Array<number>
    isFetching: boolean
}

const Users: React.FC<UsersType> = ({
                                        currentPage,
                                        onPageChanged,
                                        totalUsersCount,
                                        pageSize, users, followUser,
                                        followingInProgress, unfollowUser, isFetching,
                                        ...props
                                    }) => {

    return (
        <Paper className={styles.usersContainer}>
            <div className={styles.paginatorContainer}>
                <Paginator currentPage={currentPage}
                           onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                />
            </div>
                <div>
                    {isFetching ? <Preloader/> : null}
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
        </Paper>
    )
}

export default Users
