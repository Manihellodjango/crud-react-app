import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./User.css";

const DetailTask = () => { 
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const getUserApi = "http://localhost:3000/tasks";

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${getUserApi}/${id}`);
        setTask(response.data);
        setError(null);
      } catch (err) {
        console.error("API Error:", err.message);
        setError("Failed to fetch task details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (loading) return <p className="loading-message">Loading task details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!task) return <p className="error-message">No task found.</p>;

  return (
    <div className="task-container">
      <div className="task-card">
        <h2 className="task-title">Task Details</h2>
        
        <div className="form-group">
          <span className="form-label">Title:</span>
          <span className="form-control">{task.title}</span>
        </div>
        <div className="form-group">
          <span className="form-label">Description:</span>
          <span className="form-control">{task.description}</span>
        </div>
        <div className="form-group">
          <span className="form-label">Start Date:</span>
          <span className="form-control">{task.startDate}</span>
        </div>
        <div className="form-group">
          <span className="form-label">End Date:</span>
          <span className="form-control">{task.endDate}</span>
        </div>
        <div className="form-group">
          <span className="form-label">Priority:</span>
          <span className={`form-control priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;
