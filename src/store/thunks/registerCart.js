import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_RENDER, TEXT_ERROR } from '../../const';

export const registerCart = createAsyncThunk(
  'cart/registerCart',
  async (_, rejectWithValue) => {
    try {
      const response = await fetch(`${API_URL_RENDER}/api/cart/register`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(TEXT_ERROR);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });