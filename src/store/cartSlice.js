import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL_RENDER, FAILED, LOADING, SUCCESS, TEXT_ERROR, TEXT_ERROR_OUTPUT_ITEMS } from '../const';

const initialState = {
  isOpen: false,
  // items: JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || '[]'),
  items: [],
  status: 'idle',
  accessKey: null,
  error: null,
  totalCartPrice: 0,
};

export const registerCart = createAsyncThunk(
  'cart/registerCart',
  async () => {
    const response = await fetch(`${API_URL_RENDER}/api/cart/register`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(TEXT_ERROR);
    }

    return await response.json();
  });

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState }) => {
    // const accessKey = getState().cart.accessKey;
    // console.log(accessKey);

    const response = await fetch(`${API_URL_RENDER}/api/cart`, {
      method: 'GET',
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(TEXT_ERROR);
    }

    return await response.json();
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }) => {

    const response = await fetch(`${API_URL_RENDER}/api/cart/items`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity })
    });

    if (!response.ok) {
      throw new Error(TEXT_ERROR_OUTPUT_ITEMS);
    }
    return await response.json();
  }
);


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
        console.log(action.payload);
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


