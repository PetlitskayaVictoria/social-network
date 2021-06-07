import React from 'react';
//@ts-ignore
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatusComponent", () => {
    test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status={"This is status"} updateStatus={() => {}}/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe("This is status")
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status={"This is status"} updateStatus={() => {}}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span.length).not.toBeNull()
    });
    test("after creation input should not be displayed", () => {
        const component = create(<ProfileStatus status={"This is status"} updateStatus={() => {}}/>)
        const root = component.root
        expect(() => {let input = root.findByType("input")}).toThrow()
    });
    test("after creation span should have correct status", () => {
        const component = create(<ProfileStatus status={"This is status"} updateStatus={() => {}}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[0]).toBe("This is status")
    });
    test("input should be displayed in edit mode instead of span", () => {
        const component = create(<ProfileStatus status={"This is status"} updateStatus={() => {}}/>)
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("This is status")
    });
    test("callback should be called", () => {
        let mockCallback = jest.fn()
        const component = create(<ProfileStatus status={"This is status"} updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    });
})
