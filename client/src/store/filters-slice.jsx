import { createSlice } from "@reduxjs/toolkit";

const initialFiltersState = {
  title: "",
  description: "",
  startDate: "",   // New property
  endDate: "",     // New property
  personName: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFiltersState,  // Just use the initialFiltersState directly here
  reducers: {
    setFilters: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetFilters: (state) => {
      Object.assign(state, initialFiltersState);
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice;
