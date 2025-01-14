import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Signup from "../src/pages/Signup";

// Mock firebase/auth
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(() =>
    Promise.reject({ message: "Firebase: Error (auth/email-already-in-use)." })
  ),
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

describe("Signup Component", () => {
  test("displays error when passwords do not match", async () => {
    // Arrange
    render(<Signup />);

    // Act
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password2" },
    });
    fireEvent.submit(screen.getByRole("form"));

    // Assert
    expect(
      await screen.findByText(
        /The password you entered does not match the password above./i
      )
    ).toBeInTheDocument();
  });

  test("displays error when password is too short", async () => {
    //Arrange
    render(<Signup />);

    //Act
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "pass" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "pass" },
    });

    fireEvent.submit(screen.getByRole("form"));

    //Assert
    expect(
      await screen.findByText(/The password should be at least 6 characters./i)
    ).toBeInTheDocument();
  });

  test("displays error when password does not contain special characters", async () => {
    //Arrange
    render(<Signup />);

    //Act
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.submit(screen.getByRole("form"));
    //Assert
    expect(
      await screen.findByText(
        /The password should contain one special and one capital character./i
      )
    ).toBeInTheDocument();
  });

  test("displays error when email already exists", async () => {
    //Arrange
    render(<Signup />);

    //Act
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "egyoussef_2000@yahoo.com" },
    });
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Youssef" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Youssef@123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Youssef@123" },
    });
    fireEvent.submit(screen.getByRole("form"));

    // Assert
    expect(
      await screen.findByText(/Email already exists/i)
    ).toBeInTheDocument();
  });

  
});
