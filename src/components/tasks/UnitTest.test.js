import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShowTask from "./ShowTask";
import { TaskContext } from "../../context/TaskContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
}));

jest.mock("react-toastify/dist/ReactToastify.css", () => {});

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: "Test Task",
    description: "Test Description",
    startDate: "2025-03-22",
    endDate: "2025-03-23",
    priority: "High",
    completed: false,
  },
];

const mockDeleteTask = jest.fn();
const mockSetTasks = jest.fn();
const mockUpdateTask = jest.fn();
const mockFetchTasks = jest.fn();

const renderWithContext = (tasks = mockTasks) => {
  return render(
    <MemoryRouter>
      <TaskContext.Provider
        value={{
          tasks,
          deleteTask: mockDeleteTask,
          setTasks: mockSetTasks,
          updateTask: mockUpdateTask,
          fetchTasks: mockFetchTasks,
        }}
      >
        <ShowTask />
      </TaskContext.Provider>
    </MemoryRouter>
  );
};

test("renders ShowTask component with tasks", async () => {
  renderWithContext();

  // Use findByText to wait for the task to appear
  expect(await screen.findByText("Test Task")).toBeInTheDocument();
});

test("shows 'No tasks found' if tasks list is empty", async () => {
  renderWithContext([]); // Pass an empty tasks list

  // Use findByText to wait for "No tasks found" to appear
  expect(await screen.findByText("No tasks found")).toBeInTheDocument();
});

test("filters tasks based on search input", async () => {
  renderWithContext();

  // Use findByPlaceholderText to wait for the search input
  const searchInput = await screen.findByPlaceholderText("Search task");
  await userEvent.type(searchInput, "Test Task");

  // Use findByText to wait for the filtered task to appear
  expect(await screen.findByText("Test Task")).toBeInTheDocument();
});

test("deletes a task when delete button is clicked", async () => {
  renderWithContext();

  // Use findByRole to wait for the delete button to appear
  const deleteButton = await screen.findByRole("button", { name: /delete/i });

  // Click the delete button
  await userEvent.click(deleteButton);

  // Ensure delete function was called with the correct ID
  expect(mockDeleteTask).toHaveBeenCalledTimes(1);
  expect(mockDeleteTask).toHaveBeenCalledWith(1);
});