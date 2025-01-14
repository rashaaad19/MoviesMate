import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Login from "../src/pages/Login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(() => ({})), // Mock getAuth
  GoogleAuthProvider: vi.fn(() => ({})), // Mock GoogleAuthProvider
  FacebookAuthProvider: vi.fn(() => ({})), // Mock FacebookAuthProvider
}));

// Mock firebase/firestore
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getFirestore: vi.fn(() => ({})),
  getDocs: vi.fn(() => ({
    forEach: vi.fn((callback) => {
      // Simulate the behavior of forEach on a QuerySnapshot
      const fakeDocs = [{ data: () => ({ userName: "existingUser" }) }];
      fakeDocs.forEach(callback);
    }),
  })),
}));
// Mock react-router-dom dependencies
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(() => vi.fn()),
  redirect: vi.fn(),
  useLocation: vi.fn(() => ({})),
  Link: ({ children }) => <a>{children}</a>,
}));

// Mock custom useAuth hook
vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(() => ({
    handleFacebookSignup: vi.fn(),
    handleGoogleSignup: vi.fn(),
    loading: false,
    error: "",
  })),
}));

describe("Login component tests", () => {
  beforeEach(() => {
    // Mock localStorage methods
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "clear");
  });
  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  test("displays error when user enters wrong credentials", async () => {
    // Mock Firebase auth to reject with an error
    vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce({
      code: "auth/invalid-credential",
    });

    //Arrange
    render(<Login />);

    //Act
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@temp.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "temp password" },
    });
    fireEvent.submit(screen.getByRole("form"));

    //Assert
    expect(
      await screen.findByText("The email or password entered is incorrect")
    ).toBeInTheDocument();
  });
  
  test("successfull login redirects user to home page", async () => {
    //mock firebase auth to resolve successfully
    vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({
      user: {
        uid: "mockUserId",
        email: "Johndoe@temp.com",
      },
    });
    //mock userNavigate
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    //Arrange
    render(<Login />);

    //Act
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@temp.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "temp password" },
    });
    fireEvent.submit(screen.getByRole("form"));

    //Assert
    await waitFor(() => {
      //verify local storage is updated
      expect(localStorage.setItem).toHaveBeenCalledWith("isAuth", "true");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "userEmail",
        "johndoe@temp.com"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith("userID", "mockUserId");
      //verify user is redirected to home page
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
