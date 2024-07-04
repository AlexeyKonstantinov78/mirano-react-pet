import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    toggleOrder(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleOrder } = orderSlice.actions;

export default orderSlice.reducer;
