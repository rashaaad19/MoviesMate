import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import MainWallpaper from "../src/components/MainWallpaper";

test("renders main wallpaper with the correct text", () => {
  render(<MainWallpaper />);
  const headerElement = screen.getByText(/The Best Movie Library/);
  expect(headerElement).toBeInTheDocument();
});
