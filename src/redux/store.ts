import { configureStore } from "@reduxjs/toolkit";
import donationReducer from "./donationSlice";
import themeReducer from "./ThemaSlice";
import ProjectsReducer from "./projectsSlice";
import PaymentReducer from "./PaymentSlice";
const store = configureStore({
  reducer: {
    donation: donationReducer,
    theme: themeReducer,
    projects: ProjectsReducer,
    payment: PaymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
