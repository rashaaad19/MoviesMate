import { render, screen } from "@testing-library/react";
import { Link, useLoaderData } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import MyProfile from "../src/pages/MyProfile";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"), // Use the actual implementation for non-mocked parts
  useNavigate: vi.fn(() => vi.fn()), // Mock useNavigate
  useLoaderData: vi.fn(), // Mock useLoaderData
  Link: ({ children }) => <a>{children}</a>, // Mock Link component
}));

describe("My Profile component", () => {
  //Define mock profile data

  const mockProfileData = {
    name: "John Doe",
    userName: "johndoe",
    bio: "I love movies",
    email: "johndoe@mock.com",
    image: "//public/Default-Avatar.jpg",
    location: "New York",
    links: ["https://www.github.com/johndoe"],
    movies: {
      reviews: [
        {
          id: 1,
          name: "Movie 1",
          rate: 5,
          image: "//public/movie1.jpg",
        },
        {
          id: 2,
          name: "Movie 2",
          rate: 3,
          image: "//public/movie2.jpg",
        },
      ],
      watched: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
      favourites: [{ id: 3, title: "Movie 3" }],
    },
  };

  test("renders profile page with the correct text", () => {
    // Mock useLoaderData to return the mock profile data
    useLoaderData.mockReturnValue(mockProfileData);
    //Arrange
    render(<MyProfile />);
    // Assert

    //Check details
    const elements = screen.getAllByText(mockProfileData.name);
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(screen.getByText(mockProfileData.userName)).toBeInTheDocument();
    expect(screen.getByText(mockProfileData.bio)).toBeInTheDocument();
    expect(screen.getByText(mockProfileData.location)).toBeInTheDocument();
    expect(screen.getByText(mockProfileData.links)).toBeInTheDocument();
    // Check the badges
    const watchedElement = screen.getByText("Watched").closest("p");
    expect(watchedElement).toHaveTextContent("2 Watched");
    const favouriteElement = screen.getByText("Favourite").closest("p");
    expect(favouriteElement).toHaveTextContent("1 Favourite");
    // Check the profile image
    const profileImage = screen.getByAltText("profile image");
    expect(profileImage).toHaveAttribute("src", mockProfileData.image);
  });

  test("renders default avatar if no image is provided", () => {
    // Mock useLoaderData to return profile data without an image
    useLoaderData.mockReturnValue({
      ...mockProfileData,
      image: null,
    });

    // Render the component
    render(<MyProfile />);

    // Check that the default avatar is rendered
    const profileImage = screen.getByAltText("profile image");
    expect(profileImage).toHaveAttribute("src", "/Default-Avatar.jpg");
  });
});
