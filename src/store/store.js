
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

const STORAGE_KEY = "taskflow-tasks";

// LocalStorage'dan kayıtlı task'ları oku
const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    return savedTasks ? JSON.parse(savedTasks) : null;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return null;
  }
};

const savedTasks = loadTasks();

// Redux Store
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  ...(Array.isArray(savedTasks)
    ? {
      preloadedState: {
        tasks: {
          ...taskReducer(undefined, { type: "@@INIT" }),
          tasks: savedTasks,
        },
      },
    }
    : {}),
});

// Redux değişikliklerini LocalStorage'a kaydet
store.subscribe(() => {
  try {
    const tasks = store.getState().tasks.tasks;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
});
