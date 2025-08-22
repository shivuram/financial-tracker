import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Open Transaction Form", () => {
  render(<App />);
  expect(screen.getByText(/Open Transaction Form/i)).toBeInTheDocument();
});
