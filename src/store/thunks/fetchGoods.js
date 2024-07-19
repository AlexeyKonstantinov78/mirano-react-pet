import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_RENDER, TEXT_ERROR } from '../../const';

export const fetchGoods = createAsyncThunk(
  'goods/featchGoods',
  async (params) => {

    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL_RENDER}/api/products${queryString ? `?${queryString}` : ''}`);

    if (!response.ok) {
      throw new Error(TEXT_ERROR);
    }

    return await response.json();
  }
);