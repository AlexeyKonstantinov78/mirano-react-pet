import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: '',
  minPrice: '',
  maxPrice: '',
  category: '',
  name: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFiltersSlice(state, action) {
      const { type, minPrice, maxPrice, category, name } = action.payload;
      state.type = type;
      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
      state.category = category;
      state.name = name;
    },
  },
});

export const { setFiltersSlice } = filterSlice.actions;

export default filterSlice.reducer;
