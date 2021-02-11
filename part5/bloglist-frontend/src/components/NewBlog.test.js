import React from "react";
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlog from "./NewBlog";

describe("<NewBlog />", () => {

    test("should calls the event handle onSubmit", () => {
        const mockHandleNewBlog = jest.fn();
        const blog = {
            title: "Learn Javascript",
            author: "Osmani",
            url: "http://osmani.co"
        }
        const component = render(<NewBlog  handleNewBlog={mockHandleNewBlog}/>);
        
        const form = component.container.querySelector('.form');
        const title = component.container.querySelector('.title')
        const author = component.container.querySelector('.author')
        const url = component.container.querySelector('.url')
        fireEvent.change(title, { target: { value: blog.title}})
        fireEvent.change(author, { target: { value: blog.author}})
        fireEvent.change(url, { target: { value: blog.url}})
        fireEvent.submit(form);
        // console.log("sdnqj",mockHandleNewBlog.mock.calls[0][0].title == "Learn Javascript")
        // expect(mockHandleNewBlog.mock.calls.length).toBe(1);
        expect(mockHandleNewBlog).toHaveBeenCalledWith(blog);

    })
})