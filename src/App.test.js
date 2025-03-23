import { render, screen } from "@testing-library/react";
import App from "./App";
import { TaskContext } from "./context/TaskContext";
import { MemoryRouter } from "react-router-dom";

// Mock the toastify CSS file to avoid import errors
jest.mock("react-toastify/dist/ReactToastify.css", () => {});

test("renders the home page correctly", () => {
  const mockContextValue = {
    tasks: [],
    deleteTask: jest.fn(),
    setTasks: jest.fn(),
    updateTask: jest.fn(),
    fetchTasks: jest.fn(),
  };

  render(
    <MemoryRouter>
      <TaskContext.Provider value={mockContextValue}>
        <App />
      </TaskContext.Provider>
    </MemoryRouter>
  );

  // Adjust the expectation to match actual content in your App
  const homeHeading = screen.getByText(/home/i); // Change "home" to something in your app
  expect(homeHeading).toBeInTheDocument();
});