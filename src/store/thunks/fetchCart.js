import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_RENDER, TEXT_ERROR } from '../../const';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
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