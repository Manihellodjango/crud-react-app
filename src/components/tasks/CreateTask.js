import React, { useState, useContext } from "react";
import "./User.css";
import { TaskContext } from "../../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const CreateTask = () => {
  const { addTask, tasks } = useContext(TaskContext);
  const [error] = useState(null);
  const [task, setTask] = useState({
    title: "", 
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    completed: false,
  });

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const [validationErrors, setValidationErrors] = useState({
    title: "", 
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  // ✅ Centralized error handling function
  const handleApiError = (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);

      if (error.response.status === 400) {
        toast.error("Invalid data. Please check your input.");
      } else if (error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } else if (error.request) {
      console.error("Network error:", error.message);
      toast.error("Network error: Unable to connect to the server.");
    } else {
      console.error("Unexpected error:", error.message);
      toast.error("Unexpected error occurred.");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });

    // Clear validation error when user starts typing
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset validation errors
    setValidationErrors({ title: "", description: "", startDate: "", endDate: "", priority: "" });

    let errors = {};

    // ✅ Validate fields
    if (!task.title.trim()) errors.title = "This field is required."; 
    if (!task.description.trim()) errors.description = "This field is required.";
    if (!task.startDate) errors.startDate = "Start date is required.";
    if (!task.endDate) errors.endDate = "End date is required.";
    if (!task.priority) errors.priority = "Priority must be selected.";

    // ✅ Date validations
    if (task.startDate && task.endDate) {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      if (start > end) errors.endDate = "End date cannot be before start date.";
    }

    // ✅ Check for duplicate task name
    const isDuplicate = tasks.some((t) => t.title.toLowerCase() === task.title.toLowerCase()); 
    if (isDuplicate) errors.title = "A task with this title already exists."; 

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      // ✅ Wait for the API to confirm task addition
      const response = await addTask(task);

      if (response && response.id) {
        setTask({ title: "", description: "", startDate: "", endDate: "", priority: "" }); 

        // ✅ Display success toast
        toast.success("Task added successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: 'colored'
        });
      } else {
        throw new Error("Task was not created on the server.");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="task-container">
      <div className="task-card">
        <ToastContainer />
        <h2 className="task-title">Create Task</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label> 
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
                <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: "5px" }} />
                {validationErrors.title} 
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
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
                <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: "5px" }} />
                {validationErrors.description}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              className={`form-control ${validationErrors.startDate ? "is-invalid" : ""}`}
              id="startDate"
              name="startDate"
              value={task.startDate}
              onChange={handleInput}
              min={today} 
            />
            {validationErrors.startDate && (
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: "5px" }} />
                {validationErrors.startDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              className={`form-control ${validationErrors.endDate ? "is-invalid" : ""}`}
              id="endDate"
              name="endDate"
              value={task.endDate}
              onChange={handleInput}
              min={task.startDate || today} 
            />
            {validationErrors.endDate && (
              <div className="invalid-feedback">
                <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: "5px" }} />
                {validationErrors.endDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">Priority</label>
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
                <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: "5px" }} />
                {validationErrors.priority}
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;