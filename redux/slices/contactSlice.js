/* eslint-disable no-param-reassign */
import { axiosInstance } from "@/services/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addContactUs = createAsyncThunk(
  "contactUs/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contact-us", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


const initialState = {
  isLoading: false,
  message: null,
  formLoader: false,
  allMessages: [],
  error: null,
};

const ContactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactUs.pending, (state) => {
        state.formLoader = true;
      })
      .addCase(addContactUs.fulfilled, (state, action) => {
        state.formLoader = false;
        state.message = action.payload?.data?.data;
      })
      .addCase(addContactUs.rejected, (state, action) => {
        state.formLoader = false;
        state.error = action.error.message;
      });
  },
});

export const { resetState } = ContactUsSlice.actions;
export default ContactUsSlice.reducer;
