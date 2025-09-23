import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryReducer from "./slices/categorySlice";
import contactUsReducer from "./slices/contactSlice";
import settingReducer from "./slices/settingSlice"
import pageReducer from "./slices/pageSlice"

const rootReducer = combineReducers({
  contactUs: contactUsReducer,
  category: categoryReducer,
  setting: settingReducer,
  pages: pageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["setting"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
