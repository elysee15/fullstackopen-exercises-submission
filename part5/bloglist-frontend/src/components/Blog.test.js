import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("should  only render the blog's title and author by default", () => {
  const blog = {
    title: "The party",
    author: "Alan Scott",
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("The party Alan Scott");
});

test("should call like's event handler twice if button clicked twice", () => {
  const blog = {
    title: "The party",
    author: "Alan Scott",
  };

  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} handleLike={mockHandler}/>);

  const button = component.container.querySelector(".likeButton");
  component.debug()
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
