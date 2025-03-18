import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    filterElement: [],
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      const item = action.payload.trim();
      const currentFilters = [...state.value.filterElement];
      const existingItem = currentFilters.includes(item);
      if (!item) {
        console.log("Ignoring empty item");
        return;
      }
      if (existingItem) {
        console.log("Filter already added");
      } else {
        state.value.filterElement = [...state.value.filterElement, item];
        console.log(state.value.filterElement);
      }
    },
    removeFilter: (state, action) => {
      const item = action.payload;
      const newFilters = state.value.filterElement.filter(
        (targetItem) => targetItem !== item
      );
      state.value.filterElement = newFilters;
    },
    clearFilter: (state) => {
      state.value.filterElement = [];
    },
  },
});

export const { addFilter, removeFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
