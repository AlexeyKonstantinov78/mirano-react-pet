import { createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCESS } from '../../const';
import { registerCart } from '../thunks/registerCart';
import { fetchCart } from '../thunks/fetchCart';
import { addItemToCart } from '../thunks/addItemToCart';

const initialState = {
  isOpen: false,
  items: [],
  status: 'idle',
  accessKey: null,
  error: null,
  totalCartPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(registerCart.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.accessKey = action.payload.accessKey;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = FAILED;
        state.accessKey = '';
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.items = action.payload;
        state.totalCartPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = LOADING;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.items = action.payload;
        state.totalCartPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;


