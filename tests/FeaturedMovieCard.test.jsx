import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import FeaturedMovieCard from "../src/UI/FeaturedMovieCard";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieProfile from "../src/pages/MovieProfile";
import userEvent from "@testing-library/user-event";

// Mock the MovieProfile component
vi.mock("../src/pages/MovieProfile", () => ({
  default: () => <h1>oppenheimer</h1>,
}));

describe("featured movie component", () => {
  test("renders featured movie card with the correct text ", () => {
    //Arrange
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<FeaturedMovieCard />} />
          <Route path="/movies/:id" element={<MovieProfile />} />{" "}
        </Routes>
      </MemoryRouter>
    );

    //Assert
    const headerElement = screen.getByText("Featured in MoviesMate");
    expect(headerElement).toBeInTheDocument();
  });

  test("navigates to the correct route", async () => {
    //Arrange
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<FeaturedMovieCard />} />
          <Route path="/movies/:id" element={<MovieProfile />} />{" "}
        </Routes>
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/see more/i);
    expect(linkElement).toBeInTheDocument();

    //Act
    await userEvent.click(linkElement);

    //Assert
    await waitFor(() => {
      const movieProfileElement = screen.getByText(/oppenheimer/i);
      expect(movieProfileElement).toBeInTheDocument();
    });
  });
});
