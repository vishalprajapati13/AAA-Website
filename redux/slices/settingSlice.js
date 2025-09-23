import { axiosInstance } from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  settings: [],
  formLoader: false,
  loading: false,
  error: null,
};

export const getSettings = createAsyncThunk("settings/getSettings", async () => {
  const response = await axiosInstance.get("/setting");
  return response.data.data;
});

export const updateSetting = createAsyncThunk(
  "settings/updateSetting",
  async ({ id, data }) => {
    const response = await axiosInstance.patch(`/setting/${id}`, data);
    return response.data;
  }
);

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch settings";
      })
      .addCase(updateSetting.pending, (state) => {
        state.formLoader = true;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.formLoader = false;
        if (action.payload) {
          state.settings = action.payload;
        }
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.formLoader = false;
        state.error = action.error.message || "Failed to fetch settings";
      });
  },
});

export default settingSlice.reducer;
