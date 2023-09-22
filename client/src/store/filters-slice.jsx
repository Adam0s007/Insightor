import { createSlice } from "@reduxjs/toolkit";

export const initialFilters = {
  sort: "",
  order: "",
  text: "",
  category: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFilters,
  reducers: {
    updateFilters: (state, action) => {
      Object.assign(state, action.payload);
    }
  },
});

export const { updateFilters } = filtersSlice.actions;

export default filtersSlice;
