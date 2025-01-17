import {  render, screen } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Reviews from "../src/pages/Reviews";
import MovieList from "../src/UI/MovieList";

const mockMovies = [
  {
    id: 1,
    name: "Movie 1",
    image: "/path/to/image1.jpg",
    rate: 4.5,
  },
  {
    id: 2,
    name: "Movie 2",
    image: "/path/to/image2.jpg",
    rate: 3.5,
  },
];

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  useLoaderData: vi.fn(), // Mock useLoaderData
  MemoryRouter: vi.fn().mockImplementation((props) => props.children),
  Link: ({ to, children }) => (
    <a href={to} data-testid="test-link">
      {children}
    </a>
  ), // Mock Link
}));

describe("Reviews component tests", () => {
  test("displays a list of reviewed movies", () => {
    // Mock the data returned from useLoaderData
    vi.mocked(useLoaderData).mockReturnValueOnce({
      movies: {
        reviews: [{ name: "Movie1" }, { name: "Movie2" }],
      },
    });

    // Arrange
    render(<Reviews />);

    // Assert
    const movieListContainer = screen.getByTestId("test-movieList");
    expect(movieListContainer).toBeInTheDocument();
  });

  test("displays error message if no reviews appear", () => {
    // Mock the data returned from useLoaderData
    vi.mocked(useLoaderData).mockReturnValueOnce({
      movies: {
        reviews: [],
      },
    });

    //Arrange
    render(<Reviews />);

    //Assert
    const errorElement = screen.getByTestId("test-error");
    expect(errorElement).toBeInTheDocument();
  });

  test("should navigate to the correct movie detail page when a movie is clicked", () => {
    //Arrange
    render(
      <MemoryRouter>
        <MovieList movies={mockMovies} type="reviewed" />
      </MemoryRouter>
    );

    //Assert
    const movieLinks = screen.getAllByTestId("test-link");
    expect(movieLinks).toHaveLength(mockMovies.length);
    //Check if each movie in the list have href to the correct path
    mockMovies.forEach((movie, index) => {
      expect(movieLinks[index]).toHaveAttribute("href", `/movies/${movie.id}`);
    });
  });
});
