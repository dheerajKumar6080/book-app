import React , {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskDetails from "../../components/taskDetails"; // Ensure the path is correct
import { Task } from "../../store/types/taskTypes"; // Ensure the correct path
import "./index.scss"; // Ensure the path is correct
import {
  addTasktoState
} from "../../store/slices/taskSlice"; // Adjust path
import {
  getTasksFromDb
} from "../../util/indexedDbUtils";
const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the title from the route params
  const tasks = useSelector((state: { tasks: { tasks: Task[] } }) => state.tasks.tasks); // Get tasks from Redux state
  const navigate = useNavigate();
  const [taskLoaded, setTaskLoaded] = useState<Boolean>(false); // Email for assigned person
  const dispatch = useDispatch();
  // Find the task based on the title (this assumes titles are unique)
  const task = tasks.find(task => task.id === id);

  useEffect(() => {
    // Fetch tasks from IndexedDB and sync with Redux store on page load
    const fetchTasks = async () => {
      if (!taskLoaded && tasks.length === 0) {
        const tasksFromDb = await getTasksFromDb();
        tasksFromDb.forEach((task: Task) => {
          dispatch(addTasktoState(task)); // Add to Redux state
          setTaskLoaded(true);
        });
      }
    };

    fetchTasks();
  }, []);

  if (!task) {
    return (
      <div className="error-container">
        <h2>Task Not Found</h2>
        <p>We're sorry, but the task you are looking for does not exist.</p>
        <button className="back-home-button" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>     
    );
  }

  return (
    <div className="task-details-page">
      {/* Pass the full task object as a prop to TaskDetails */}
      <TaskDetails task={task} />
    </div>
  );
};

export default TaskDetailsPage;
