import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { TaskContext } from "../../context/TaskContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ShowTask = () => {
  const { tasks, deleteTask, setTasks, updateTask, fetchTasks } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks();
        setError(null);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [fetchTasks]);

  const toggleComplete = useCallback(async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task.id, updatedTask);
      setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? updatedTask : t)));
      toast.success("Task status updated!", { position: "top-center", autoClose: 3000, theme: 'colored', style: { backgroundColor: 'blue' } });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task status.");
    }
  }, [updateTask, setTasks]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      toast.success("Task deleted successfully!", { position: "top-center", autoClose: 3000, theme: 'colored', style: { backgroundColor: 'red' }});
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  }, [deleteTask, setTasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }, [tasks, searchTerm]);

  if (loading) return <h2>Loading tasks...</h2>;
  if (error) return <h2 className="text-danger">{error}</h2>;
  if (tasks.length === 0) return <h2>No tasks found</h2>;

  return (
    <div className="mt-5">
      <ToastContainer />
      <div className="d-flex justify-content-center mb-4">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search task" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th> 
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Priority</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Title">{task.title}</td> 
              <td data-label="Description">{task.description}</td>
              <td data-label="Start Date">{task.startDate || "N/A"}</td>
              <td data-label="End Date">{task.endDate || "N/A"}</td>
              <td data-label="Priority">
                <span className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>
              <td data-label="Completed">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
              </td>
              <td data-label="Actions">
                <Link to={`/edit-task/${task.id}`}>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                </Link>
                <Link to={`/tasks/${task.id}`}>
                  <button className="btn btn-info btn-sm me-2">View</button>
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTask;