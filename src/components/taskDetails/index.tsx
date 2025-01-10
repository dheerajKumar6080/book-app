import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss"; // Ensure the path is correct
import { Task } from "../../store/types/taskTypes";
interface TaskDetailsProps {
  task: Task;
}
const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const navigate = useNavigate();

  // Progress bar completion based on status
  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "Open":
        return 0;
      case "In-Progress":
        return 50;
      case "Under-review":
        return 75;
      case "Done":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "#d3d3d3";  // Light gray
      case "In-Progress":
        return "#ffa500";  // Orange
      case "Under-review":
        return "#f1c40f";  // Yellow
      case "Done":
        return "#2ecc71";  // Green
      default:
        return "#d3d3d3";
    }
  };

  const progress = getProgressPercentage(task.status);
  const progressColor = getStatusColor(task.status);

  return (
    <div className="task-details-container">
      <div className="task-info-section">
        <h1 className="title-align">{task.title}</h1>
        {/* <p><strong>Assigned To:</strong> {task}</p> */}
        <div>
        <p className="align-info"><strong className="align-key">Assigned To:</strong> {task.assignedTo.email || "Not yet completed"}</p>
        <p className="align-info"><strong className="align-key">Priority:</strong> {task.priority}</p>
        <p className="align-info"> <strong className="align-key">Start Date:</strong> {task.startDate}</p>
        <p className="align-info"><strong className="align-key">End Date:</strong> {task.endDate || "Not yet completed"}</p>
        {/* Progress Bar */}
        </div>
        <div className="progress-bar-container">
        <p className="align-info"><strong className="align-key">Status:</strong> {task.status} ({progress}%)</p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${progress}%`,
                backgroundColor: progressColor,
              }}
            />
          </div>
          {/* <p className="align-info"><strong className="align-key">{task.status} ({progress}%) </strong></p> */}
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default TaskDetails;
