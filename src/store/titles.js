import { createSlice } from '@reduxjs/toolkit';

const titlesSlice = createSlice({
  name: 'titles',
  initialState: { count: 0 },
  reducers: {
    get(state) {
    },
    post(state) {
    },
    put(state) {
    },
    delete(state) {
    },
  },
});

export const counterActions = titlesSlice.actions;
export default titlesSlice.reducer;
