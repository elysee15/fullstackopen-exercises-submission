import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Togglable from "./Togglable";

describe("<Togglable/>", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show">
        <div className="testDiv" />
      </Togglable>
    );
  });

  test("renders its children", () => {
    expect(component.container.querySelector(".testDiv")).toBeDefined();
  });

  test("should display  blog's url and number of likes when show button clicked", () => {
    const button = component.getByText("show");
    fireEvent.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
