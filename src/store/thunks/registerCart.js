import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_RENDER, TEXT_ERROR } from '../../const';

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