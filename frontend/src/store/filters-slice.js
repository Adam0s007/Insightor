import { createSlice } from "@reduxjs/toolkit";

const initialFiltersState = {
  title: "",
  description: "",
  date: "",
  personName: "",
  img: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    title: "",
    description: "",
    date: "",
    personName: "",
    img: "",
  },
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
