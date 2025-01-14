import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
} from "firebase/auth";
import { describe, expect, test, vi } from "vitest";
import Signup from "../src/pages/Signup";

// Mock firebase/auth
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  getAuth: vi.fn(() => ({})), // Mock getAuth
  GoogleAuthProvider: vi.fn(() => ({})), // Mock GoogleAuthProvider
  FacebookAuthProvider: vi.fn(() => ({})), // Mock FacebookAuthProvider
}));

// Mock firebase/firestore
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getFirestore: vi.fn(() => ({})), // Mock getFirestore
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
  
      // Wait for the form to render (replace "Password" with a unique element that appears after loading)
      await waitFor(() => screen.getByLabelText("Password"));
  
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
        await screen.findByText(/The password you entered does not match the password above./i)
      ).toBeInTheDocument();
    });
  });
  

