import React, { useState } from "react";
import { Task } from "../../store/types/taskTypes"; // Adjust path as necessary
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toggleRead } from "../../store/slices/taskSlice"; // Adjust path as necessary
import './index.scss';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (index: string) => void;
  onDelete: (index: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sort state
  const [sortColumn, setSortColumn] = useState<keyof Task>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle row click to view more details (this can be customized further)
  const handleRowClick = (task: Task, index: number) => {
    navigate(`/task/${task.id}`); // Navigate to task details
  };

  // Handle sorting logic
  const handleSort = (column: keyof Task) => {
    // If the same column is clicked, toggle the direction
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc"); // Default to ascending when a new column is clicked
    }
  };

  // Sort tasks based on the current column and direction
  const sortedTasks = [...tasks].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>ID</th>
          <th 
            onClick={() => handleSort("title")}
            className={sortColumn === "title" ? "sortable active" : "sortable"}
          >
            Title
            <span className="material-icons">
              {sortColumn === "title" ? (sortDirection === "asc" ? "arrow_upward" : "arrow_downward") : "arrow_upward"}
            </span>
          </th>
          <th 
            onClick={() => handleSort("assignedTo")}
            className={sortColumn === "assignedTo" ? "sortable active" : "sortable"}
          >
            Assigned To
            <span className="material-icons">
              {sortColumn === "assignedTo" ? (sortDirection === "asc" ? "arrow_upward" : "arrow_downward") : "arrow_upward"}
            </span>
          </th>
          <th 
            onClick={() => handleSort("status")}
            className={sortColumn === "status" ? "sortable active" : "sortable"}
          >
            Status
            <span className="material-icons">
              {sortColumn === "status" ? (sortDirection === "asc" ? "arrow_upward" : "arrow_downward") : "arrow_upward"}
            </span>
          </th>
          <th 
            onClick={() => handleSort("priority")}
            className={sortColumn === "priority" ? "sortable active" : "sortable"}
          >
            Priority
            <span className="material-icons">
              {sortColumn === "priority" ? (sortDirection === "asc" ? "arrow_upward" : "arrow_downward") : "arrow_upward"}
            </span>
          </th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.map((task, index) => (
          <tr key={index} onClick={() => handleRowClick(task, index)}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.assignedTo.email}</td> {/* Assuming assignedTo contains an email */}
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>{task.startDate}</td>
            <td>{task.endDate}</td>
            <td>
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(task.id); }} 
                className="edit-button"
              >
                Edit
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(index); }} 
                className="delete-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
