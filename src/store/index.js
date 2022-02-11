import { configureStore } from '@reduxjs/toolkit';
import titlesReducer from './titles';

const store = configureStore({
  reducer: {
    titles: titlesReducer,
  },
});

export default store;
