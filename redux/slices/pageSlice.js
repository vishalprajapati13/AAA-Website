import { axiosInstance } from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPages = createAsyncThunk(
  "pages/fetchAll",
  async ({ is_published }) => {
    const response = await axiosInstance.get("/page", {
      params: { is_published },
    });
    return response.data.data;
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    list: [],
    currentPage: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default pageSlice.reducer;
