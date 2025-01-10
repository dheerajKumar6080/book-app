// indexedDbUtils.ts

// Your Task interface (from taskTypes)
import {Task} from "../store/types/taskTypes"
  
  // Open IndexedDB database
  const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("TaskDatabase", 1);  // Open (or create) the database
  
      request.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
  
      // Create object store for tasks if it doesn't exist
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result;
        if (!db.objectStoreNames.contains("tasks")) {
          const objectStore = db.createObjectStore("tasks", { keyPath: "id" });
          objectStore.createIndex("status", "status", { unique: false });
        }
      };
    });
  };
  
  // Add task to IndexedDB
  const addTaskToDb = (task: Task): Promise<void> => {
    return openDb().then((db) => {
      const transaction = db.transaction("tasks", "readwrite");
      const store = transaction.objectStore("tasks");
  
      store.add(task);
  
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = (error) => reject(error);
      });
    });
  };
  
  // Get all tasks from IndexedDB
  const getTasksFromDb = (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
      openDb().then((db) => {
        const transaction = db.transaction("tasks", "readonly");
        const store = transaction.objectStore("tasks");
        const request = store.getAll(); // Retrieve all tasks
  
        request.onsuccess = (event) => resolve((event.target as IDBRequest).result);
        request.onerror = (error) => reject(error);
      }).catch(reject);
    });
  };
  
  // Update a task in IndexedDB
  const updateTaskInDb = (task: Task): Promise<void> => {
    return openDb().then((db) => {
      const transaction = db.transaction("tasks", "readwrite");
      const store = transaction.objectStore("tasks");
  
      store.put(task);
  
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = (error) => reject(error);
      });
    });
  };
  
  // Delete a task from IndexedDB
  const deleteTaskFromDb = (taskId: string): Promise<void> => {
    return openDb().then((db) => {
      const transaction = db.transaction("tasks", "readwrite");
      const store = transaction.objectStore("tasks");
  
      store.delete(taskId);
  
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = (error) => reject(error);
      });
    });
  };
  
  export { addTaskToDb, getTasksFromDb, updateTaskInDb, deleteTaskFromDb };
  