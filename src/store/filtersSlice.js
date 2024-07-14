import { createSlice } from "@reduxjs/toolkit";
import { TITLE_FILTER_PRICES } from '../const';

const initialState = {
  type: '',
  minPrice: '',
  maxPrice: '',
  category: '',
  name: '',
};

const filtersSlice = createSlice({
  name: 'filters',
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
    changeType(state, action) {
      state.type = action.payload.type;
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
      state.name = action.payload.name;
    },
    changePrice(state, action) {
      state[action.payload.name] = action.payload.value;
      state.name = TITLE_FILTER_PRICES;
    },
  },
});

export const { setFiltersSlice, changeType, changePrice } = filtersSlice.actions;

export default filtersSlice.reducer;
