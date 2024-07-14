import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL_RENDER, FAILED, KEY_LOCAL_STORAGE, LOADING, SUCCESS } from '../const';

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || '[]'),
  status: 'idle',
  accessKey: null,
  error: null,
};

export const registerCart = createAsyncThunk(
  'cart/registerCart',
  async () => {
    const response = await fetch(`${API_URL_RENDER}/api/cart/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return await response.json();
  });

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    addItemToCart(state, action) {
      const {
        id,
        img,
        title,
        dateDelivery,
        price,
        count = 1
      } = action.payload;

      const exisistingItem = state.items.find(item => item.id === id);
      if (exisistingItem) {
        exisistingItem.count += count;
      } else {
        state.items.push({
          id,
          img,
          title,
          dateDelivery,
          price,
          count
        });
      }

      localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(state.items));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = LOADING,
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
      });
  },
});

export const { toggleCart, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;


