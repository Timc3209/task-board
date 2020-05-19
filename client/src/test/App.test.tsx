import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders taskboard app", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText("Task Board");
  expect(titleElement).toBeInTheDocument();
});
