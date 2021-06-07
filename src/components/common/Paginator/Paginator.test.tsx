import React from 'react';
//@ts-ignore
import {create} from "react-test-renderer"
import Paginator from "./Paginator";


describe("PaginatorComponent", () => {
    test("pages count is 11 but only 10 should be shown", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1} portionSize={10}
                                            onPageChanged={() => {
                                            }}/>)
        const root = component.root
        let spans = root.findAllByType("span")
        expect(spans.length).toBe(10)
    });
    test("if pages count is more than 10, next button should be displayed", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1} portionSize={10}
                                            onPageChanged={() => {
                                            }}/>)
        const root = component.root
        let button = root.findAllByType("button")
        expect(button.length).toBe(1)
    });

})
