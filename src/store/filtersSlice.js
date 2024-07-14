import { createSlice } from "@reduxjs/toolkit";
import { TITLE_FILTER_PRICES } from '../const';

const initialState = {
  type: '',
  minPrice: '',
  maxPrice: '',
  category: '',
  name: '',
  isSearch: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload.type;
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
      state.name = action.payload.name;
      state.isSearch = false;
    },
    changePrice(state, action) {
      state[action.payload.name] = action.payload.value;
      state.name = TITLE_FILTER_PRICES;
      state.isSearch = false;
    },
    closeFilters(state) {
      state.isSearch = true;
      state.type = '';
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
    }
  },
});

export const { setFiltersSlice, changeType, changePrice, closeFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
