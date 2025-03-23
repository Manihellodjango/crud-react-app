import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const API_URL = "http://localhost:3000/tasks";

  useEffect(() => {
    fetchTasks();
  }, [page]); // Fetch tasks only when page changes

  // ✅ Centralized Error Handling
  const handleApiError = useCallback((error, action) => {
    if (error.response) {
      console.error(`Error ${action}:`, error.response.status, error.response.data);
      if (error.response.status === 400) alert("Bad request: Please check your input.");
      else if (error.response.status === 404) alert("Resource not found. It might have been deleted.");
      else if (error.response.status === 500) alert("Server error. Please try again later.");
    } else {
      console.error(`Unexpected error ${action}:`, error.message);
    }
  }, []);

  // ✅ Fetch tasks with pagination (Prevent duplicates)
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?_page=${page}&_limit=5`);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setTasks((prevTasks) => {
          const newTasks = response.data.filter(
            (newTask) => !prevTasks.some((task) => task.id === newTask.id)
          );
          return [...prevTasks, ...newTasks];
        });
      }
    } catch (error) {
      handleApiError(error, "fetching tasks");
    } finally {
      setLoading(false);
    }
  }, [page, handleApiError]);

  // ✅ Add a new task
  const addTask = useCallback(async (newTask) => {
    try {
      const response = await axios.post(API_URL, newTask);
      if (response.data && response.data.id) {
        setTasks((prevTasks) => [response.data, ...prevTasks]);
        return response.data; // ✅ Return the task to confirm it's created
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      handleApiError(error);
      throw error; // ✅ Rethrow error so the UI knows task creation failed
    }
  }, [handleApiError]);
   

  // ✅ Update an existing task
  const updateTask = useCallback(async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedFields);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
        );
      }
    } catch (error) {
      handleApiError(error, "updating the task");
    }
  }, [handleApiError]);

  // ✅ Delete a task
  const deleteTask = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      handleApiError(error, "deleting the task");
    }
  }, [handleApiError]);

  // ✅ Memoizing the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    tasks,
    setTasks,
    loading,
    addTask,
    updateTask,
    fetchTasks,
    deleteTask,
    setPage,  // Allow setting page for infinite scrolling
    hasMore
  }), [tasks, loading, addTask, updateTask, fetchTasks, deleteTask, hasMore]);

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskProvider };