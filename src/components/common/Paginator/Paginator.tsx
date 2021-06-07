import React, {useState} from 'react';
import styles from './Paginator.module.css'

type PaginatorType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize: number
    portionSize?: number
}

const Paginator: React.FC<PaginatorType> = ({currentPage, pageSize, onPageChanged, totalItemsCount, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i ++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={styles.paginationContainer}>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Previous</button>}
            {pages.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} className={styles.pageNumber + " " + (currentPage === p ? styles.selected : "")}
                                 onClick={() => {
                                     onPageChanged(p)
                                 }}>
                            {p}
                        </span>
                })}
            {portionNumber < portionCount && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}
        </div>
    )
}

export default Paginator
