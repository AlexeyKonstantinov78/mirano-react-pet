import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenPrice: false,
  isOpenTypeProduct: false,
};

const choicesSlice = createSlice({
  name: 'choices',
  initialState,
  reducers: {
    toggleChoices(state, action) {

      if (action.payload === 'prise') {
        state.isOpenTypeProduct = false;
        state.isOpenPrice = !state.isOpenPrice;
      }

      if (action.payload === 'typeProduct') {
        state.isOpenPrice = false;
        state.isOpenTypeProduct = !state.isOpenTypeProduct;
      }

    }
  },
});

export const { toggleChoices } = choicesSlice.actions;

export default choicesSlice.reducer;
