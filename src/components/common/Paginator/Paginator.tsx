import React, {ChangeEvent} from 'react';
import {Pagination} from "@material-ui/lab";

type PaginatorType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItemsCount: number
    pageSize: number
    portionSize?: number
}

const Paginator: React.FC<PaginatorType> = ({currentPage, pageSize, onPageChanged, totalItemsCount, portionSize = 10, children}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i ++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    const handleOnPageChange = (event: ChangeEvent<unknown>, page: number) => {
        onPageChanged(page)
    }
    return (
        //@ts-ignore
        <Pagination count={portionCount}
                    showFirstButton showLastButton
                    variant="outlined"
                    color="primary"
                    onChange={handleOnPageChange}

        >
        </Pagination>
    )
}

export default Paginator
