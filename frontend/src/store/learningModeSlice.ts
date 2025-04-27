// src/store/learningModeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  learningMode: false,
};

const learningModeSlice = createSlice({
  name: 'learningMode',
  initialState,
  reducers: {
    toggleLearningMode: (state) => {
      state.learningMode = !state.learningMode;
    },
    setLearningMode: (state, action) => {
      state.learningMode = action.payload;
    },
  },
});

export const { toggleLearningMode, setLearningMode } = learningModeSlice.actions;
export default learningModeSlice.reducer;
