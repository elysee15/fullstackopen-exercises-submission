import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("should  only render the blog's title and author by default", () => {
  const blog = {
    title: "The party",
    author: "Alan Scott",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("The party Alan Scott");
});
