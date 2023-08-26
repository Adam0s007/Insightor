import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from './filters-slice';

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer
  }
});

export default store;