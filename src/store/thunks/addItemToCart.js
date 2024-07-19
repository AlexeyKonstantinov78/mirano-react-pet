import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_RENDER, TEXT_ERROR_OUTPUT_ITEMS } from '../../const';

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