import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "./LogIn"; // Adjust import path
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("LogIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form fields and button", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("submit button is disabled if inputs are empty or email invalid", async () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/email address/i), "invalidemail");
    expect(button).toBeDisabled();

    await userEvent.clear(screen.getByLabelText(/email address/i));
    await userEvent.type(screen.getByLabelText(/email address/i), "user@example.com");
    expect(button).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    expect(button).toBeEnabled();
  });

  test("shows validation errors on blur", async () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    emailInput.focus();
    emailInput.blur();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    await userEvent.type(emailInput, "bademail");
    emailInput.blur();
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();

    passwordInput.focus();
    passwordInput.blur();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test("shows success message on successful login", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Login successful!" } });

    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText(/email address/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "mypassword");

    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeEnabled();
    await userEvent.click(button);

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });

  test("shows error message on failed login", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText(/email address/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");

    const button = screen.getByRole("button", { name: /log in/i });
    await userEvent.click(button);

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
