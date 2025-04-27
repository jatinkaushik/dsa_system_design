// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import learningModeReducer from './learningModeSlice';

const store = configureStore({
  reducer: {
    learningMode: learningModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
