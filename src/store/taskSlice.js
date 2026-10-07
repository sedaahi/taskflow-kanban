import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Develop login screen",
      description: "Create the user login interface",
      status: "pending",
      priority: "high",
      assignee: "Seda",
      createdAt: "2026-09-22T14:00:00.000Z",
    },
    {
      id: 2,
      title: "Build dashboard interface",
      description: "Create the Kanban dashboard interface",
      status: "in-progress",
      priority: "medium",
      assignee: "Seda",
      createdAt: "2026-09-23T10:30:00.000Z",
    },
    {
      id: 3,
      title: "Set up project structure",
      description: "Prepare the React project folder structure",
      status: "completed",
      priority: "low",
      assignee: "Seda",
      createdAt: "2026-09-24T09:00:00.000Z",
    },
    {
      id: 4,
      title: "Review API error handling",
      description: "Check error scenarios for failed API requests",
      status: "blocked",
      priority: "high",
      assignee: "Seda",
      createdAt: "2026-09-25T11:00:00.000Z",
    },
  ],

  searchText: "",
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },

        updateTask: (state, action) => {
            const updatedTask = action.payload;

            const index = state.tasks.findIndex(
                (task) => task.id === updatedTask.id
            );

            if (index !== -1) {
                state.tasks[index] = {
                    ...state.tasks[index],
                    ...updatedTask,
                };
            }
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },

        updateTaskStatus: (state, action) => {
            const { taskId, status } = action.payload;

            const task = state.tasks.find(
                (task) => task.id === taskId
            );

            if (task) {
                task.status = status;
            }
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
    },
});

export const {
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setSearchText,
} = taskSlice.actions;

export default taskSlice.reducer;