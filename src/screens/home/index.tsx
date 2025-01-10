import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import Button from "../../components/button";
import AddTask from "../../components/addTask"; // Assuming AddTask component
import InputField from "../../components/inputField";
import TaskTable from "../../components/table/index"; // Adjust path as necessary
import {
  addTasktoState,
  removeTask,
  updateTask,
} from "../../store/slices/taskSlice"; // Adjust path
import { Task } from "../../store/types/taskTypes"; // Assuming Task type
import CustomDatePicker from "../../components/datePicker"; // Import Date Picker
import Dropdown from "../../components/Dropdown"; // Import Dropdown
import {
  getTasksFromDb,
  addTaskToDb,
  updateTaskInDb,
  deleteTaskFromDb,
} from "../../util/indexedDbUtils"; // Assuming these are utility functions

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>(""); // Email for assigned person
  const [status, setStatus] = useState<Task["status"]>("Open"); // Default status
  const [priority, setPriority] = useState<Task["priority"]>("Low"); // Default priority
  const [startDate, setStartDate] = useState<string>(""); // Start date in DDMMMYYYY format
  const [endDate, setEndDate] = useState<string>(""); // End date in same format, empty if not done
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all"); // New state for filter
  const dispatch = useDispatch();

  // Get tasks from Redux store
  const tasks = useSelector(
    (state: { tasks: { tasks: Task[] } }) => state.tasks.tasks
  );
  const [taskLoaded, setTaskLoaded] = useState<Boolean>(false); // Email for assigned person

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

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleModalData = () => {
    // Ensure status is valid
    if (!["Open", "In-Progress", "Under-review", "Done"].includes(status)) {
      console.error("Invalid status:", status);
      return;
    }

    // Create new task with unique id
    let id = editingIndex ? editingIndex : (tasks.length + 1).toString();
    const newTask: Task = {
      id, // Automatically generate ID based on length of tasks array
      title,
      assignedTo: { email: assignedTo },
      status,
      priority,
      startDate, // Use the format DDMMMYYYY
      endDate
    };

    // Handle add or update task
    if (editingIndex !== null) {
      dispatch(updateTask({ index: editingIndex, task: newTask }));
      updateTaskInDb(newTask); // Update in IndexedDB as well
    } else {
      dispatch(addTasktoState(newTask));
      addTaskToDb(newTask); // Add to IndexedDB
    }

    // Reset form and close modal
    resetForm();
    toggleModal();
  };

  const resetForm = () => {
    setTitle("");
    setAssignedTo("");
    setStatus("Open");
    setPriority("Low");
    setStartDate("");
    setEndDate("");
    setEditingIndex(null);
  };

  const handleEdit = (index: string) => {
    const taskToEdit = tasks.filter((item) => item.id === index);
    setTitle(taskToEdit[0].title);
    setAssignedTo(taskToEdit[0].assignedTo.email);
    setStatus(taskToEdit[0].status);
    setPriority(taskToEdit[0].priority);
    setStartDate(taskToEdit[0].startDate);
    setEndDate(taskToEdit[0].endDate);
    setEditingIndex(index);
    toggleModal();
  };

  const handleDelete = (index: number) => {
    const taskToDelete = tasks[index];
    dispatch(removeTask(index));
    deleteTaskFromDb(taskToDelete.id); // Remove from IndexedDB as well
  };

  // Filtered tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "open") return task.status === "Open";
    if (filter === "done") return task.status === "Done";
    return true; // For "all"
  });

  return (
    <div className="app-container">
      <h1 className="app-title">Tasks App</h1>
      <div className="button-container">
        <Button
          style={{ marginTop: "10px" }}
          label="Add Task"
          onClick={toggleModal}
          type="ADD"
        />
      </div>
      <div className="filter-container">
        <label>Filter by: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Modal for Adding/Editing a Task */}
      <AddTask
        isOpen={isModalOpen}
        onClose={toggleModal}
        OnAdd={handleModalData}
        buttonLabel={editingIndex !== null ? "Update" : "Add"}
        title={editingIndex !== null ? "Edit Task" : "Add a New Task"}
      >
        <InputField
          title="Title"
          inputType="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          title="Assigned To (Email)"
          inputType="email"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        {/* Dropdown for Status */}
        <Dropdown
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          options={["Open", "In-Progress", "Under-review", "Done"]}
        />

        {/* Dropdown for Priority */}
        <Dropdown
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          options={["Low", "Medium", "High"]}
        />

        {/* Date Picker for Start Date */}
        <CustomDatePicker
          label="Start Date"
          selectedDate={startDate} // This will be in DDMMMYYYY format
          onChange={(date) => setStartDate(date || "")} // This will update the state with the formatted date
        />
        <CustomDatePicker
          label="End Date"
          selectedDate={endDate}
          onChange={(date) => setEndDate(date || "")}
        />
      </AddTask>

      {/* Display Task Table */}
      <TaskTable
        tasks={filteredTasks} // Use filtered tasks here
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
