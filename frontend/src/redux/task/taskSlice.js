import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, postApi, putApi, deleteApi } from "../../utils/getApi";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/task`;

// Fetch tasks with pagination and filters
export const fetchPaginatedTasks = createAsyncThunk(
  "task/fetchPaginatedTasks",
  async (
    { page = 1, limit = 5, filters = {}, sort = "" },
    { rejectWithValue }
  ) => {
    try {
      let query = `?page=${page}&limit=${limit}`;
      if (filters.status) query += `&status=${filters.status}`;
      if (filters.priority) query += `&priority=${filters.priority}`;
      if (filters.title) query += `&title=${filters.title}`;
      const response = await getApi(`${BASE_URL}${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Create a task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await postApi(`${BASE_URL}`, taskData);
      return response.data.task; // assuming response contains { task: { ... } }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, updatedTask }, { rejectWithValue }) => {
    try {
      const response = await putApi(`${BASE_URL}/${id}`, updatedTask);
      return response.data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await deleteApi(`${BASE_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// Slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPaginatedTasks
      .addCase(fetchPaginatedTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.totalPages = action.payload.pagination.totalPages;
        state.currentPage = action.payload.pagination.currentPage;
      })
      .addCase(fetchPaginatedTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload); // Add to top
      })

      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
