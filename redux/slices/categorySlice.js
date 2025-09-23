import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/services/axiosInstance";

export const getAllCategories = createAsyncThunk(
    "category/all",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/category`, {
          params,
        });
        return response?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  const initialState = {
    categories: [],
    loading: false,
    error: null,
  }

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
