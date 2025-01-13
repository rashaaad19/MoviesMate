import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import MainWallpaper from "../src/components/MainWallpaper";

test("renders main wallpaper with the correct text", () => {
  render(<MainWallpaper />);
  const headerElement = screen.getByText(/The Best Movie Library/i);
  expect(headerElement).toBeInTheDocument();
});

// Mocking the fetch API
// window.fetch = vi.fn();
// window.fetch.mockResolvedValueOnce({
//   json: async () => [{ id: "p1", title: "firstpost" }],
// });
