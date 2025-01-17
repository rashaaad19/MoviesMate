import {  render, screen } from "@testing-library/react";
import { MemoryRouter, useLoaderData } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import MovieList from "../src/UI/MovieList";
import Watched from './../src/pages/Watched';

const mockMovies = [
  {
    id: 1,
    name: "Movie 1",
    image: "/path/to/image1.jpg",
  },
  {
    id: 2,
    name: "Movie 2",
    image: "/path/to/image2.jpg",
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

describe("Watched component tests", () => {
  test("displays a list of favourite movies", () => {
    // Mock the data returned from useLoaderData
    vi.mocked(useLoaderData).mockReturnValueOnce({
      movies: {
        watched: [{ name: "Movie1" }, { name: "Movie2" }],
      },
    });

    // Arrange
    render(<Watched />);

    // Assert
    const movieListContainer = screen.getByTestId("test-movieList");
    expect(movieListContainer).toBeInTheDocument();
  });

  test("displays error message if no watched movies appear", () => {
    // Mock the data returned from useLoaderData
    vi.mocked(useLoaderData).mockReturnValueOnce({
      movies: {
        watched: [],
      },
    });

    //Arrange
    render(<Watched />);

    //Assert
    const errorElement = screen.getByTestId("test-error");
    expect(errorElement).toBeInTheDocument();
  });

  test("should navigate to the correct movie detail page when a movie is clicked", () => {
    //Arrange
    render(
      <MemoryRouter>
        <MovieList movies={mockMovies} type="watched" />
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
