import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./User.css";
import { TaskContext } from "../../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const EditTask = () => {
  const [task, setTask] = useState({
    title: "", 
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const { id } = useParams();
  const getUserApi = "http://localhost:3000/tasks";
  const { updateTask, tasks } = useContext(TaskContext);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${getUserApi}/${id}`);
      setTask(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching task:", err);
      setError("Failed to fetch task details. Please try again.");
      toast.error("Failed to fetch task details.", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({});
    let errors = {};

    if (!task.title.trim()) errors.title = "Title is required."; 
    if (!task.description.trim()) errors.description = "Description is required.";
    if (!task.startDate) errors.startDate = "Start date is required.";
    if (!task.endDate) errors.endDate = "End date is required.";
    if (!task.priority) errors.priority = "Please select a priority.";

    if (task.startDate && task.endDate) {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      if (start > end) {
        errors.endDate = "End date cannot be before start date.";
      }
    }

    const isDuplicate = tasks.some(
      (t) => t.title.toLowerCase() === task.title.toLowerCase() && t.id !== id );
    if (isDuplicate) errors.title = "A task with this title already exists."; 

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await updateTask(id, task);
      toast.success("Task updated successfully!", {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
        style: { backgroundColor: "blue" },
      });
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
      toast.error("Failed to update task.", {
        theme: "colored",
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (loading) return <p className="loading-message">Loading task details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="task-container">
      <div className="task-card">
        <ToastContainer />
        <h2 className="task-title">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label> 
            <input
              type="text"
              className={`form-control ${validationErrors.title ? "is-invalid" : ""}`} 
              id="title"
              name="title"
              value={task.title} 
              onChange={handleInput}
            />
            {validationErrors.title && ( 
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} /> {validationErrors.title} 
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className={`form-control ${validationErrors.description ? "is-invalid" : ""}`}
              id="description"
              name="description"
              value={task.description}
              onChange={handleInput}
            />
            {validationErrors.description && (
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} /> {validationErrors.description}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className={`form-control ${validationErrors.startDate ? "is-invalid" : ""}`}
              id="startDate"
              name="startDate"
              min={today}
              value={task.startDate}
              onChange={handleInput}
            />
            {validationErrors.startDate && (
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} /> {validationErrors.startDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className={`form-control ${validationErrors.endDate ? "is-invalid" : ""}`}
              id="endDate"
              name="endDate"
              min={task.startDate || today}
              value={task.endDate}
              onChange={handleInput}
            />
            {validationErrors.endDate && (
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} /> {validationErrors.endDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              className={`form-control ${validationErrors.priority ? "is-invalid" : ""}`}
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleInput}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {validationErrors.priority && (
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} /> {validationErrors.priority}
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;