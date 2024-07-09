import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL_RENDER } from '../const';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  name: '',
};

export const fetchGoods = createAsyncThunk(
  'goods/featchGoods',
  async (params) => {

    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_URL_RENDER}/api/products${queryString ? `?${queryString}` : ''}`);

    return await response.json();
  }
);

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
        console.log('action.meta.arg', action.meta.arg);
        if (action.meta.arg.name) {
          state.name = action.meta.arg.name;
        } else {
          state.name = "Все товары";
        }
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
