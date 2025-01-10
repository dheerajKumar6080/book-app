// taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/taskTypes"; // Your Task Type
import { addTaskToDb, getTasksFromDb, updateTaskInDb, deleteTaskFromDb } from "../../util/indexedDbUtils";

// Define the initial state with an empty tasks array
const initialState = {
  tasks: [] as Task[], // Store tasks in Redux
};

// Define the TaskSlice using createSlice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task to the state and IndexedDB
    addTasktoState: (state, action: PayloadAction<Task>) => {
      const newTask = { ...action.payload };
      state.tasks.push(newTask); // Add to Redux state
      
    },

    // Update an existing task in the state and IndexedDB
    updateTask: (state, action: PayloadAction<{ index: string; task: Task }>) => {
      const {task } = action.payload;

  // Find the index of the task in the state by id
  const taskIndex = state.tasks.findIndex(t => t.id === task.id);

  if (taskIndex !== -1) {
    // If the task is found, update the task at that index
    state.tasks[taskIndex] = task; // Update the task in the Redux state

    // Update the task in IndexedDB as well
    updateTaskInDb(task);
  } else {
    console.error(`Task with id ${task.id} not found.`);
  }
    },

    // Remove a task from the  state and IndexedDB
    removeTask: (state, action: PayloadAction<number>) => {
      const taskId = state.tasks[action.payload].id;
      state.tasks.splice(action.payload, 1); // Remove from Redux state
      deleteTaskFromDb(taskId); // Remove from IndexedDB
    },

    // Sync tasks from IndexedDB to Redux (when app loads)
    setTasksFromDb: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload; // Set tasks in Redux state from IndexedDB
    },
  },
});

// Export actions for use in components or elsewhere
export const { addTasktoState, updateTask, removeTask, setTasksFromDb } = taskSlice.actions;

// Export the reducer to be used in the store
export default taskSlice.reducer;
