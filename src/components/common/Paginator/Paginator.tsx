import React from 'react';
import styles from './Paginator.module.css'

type PaginatorType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
}

const Paginator: React.FC<PaginatorType> = ({currentPage, pageSize, onPageChanged, totalUsersCount}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i ++) {
        pages.push(i)
    }

    return (
                <div className={styles.paginationContainer}>
                    {pages.map(p => {
                        return <span className={currentPage === p ? styles.selected : ""}
                                     onClick={() => {
                                         onPageChanged(p)
                                     }}>
                            {p}
                        </span>
                    })}
            </div>
    )
}

export default Paginator
