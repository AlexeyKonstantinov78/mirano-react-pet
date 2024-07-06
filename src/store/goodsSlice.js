import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL_RENDER } from '../const';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchGoods = createAsyncThunk(
  'goods/featchGoods',
  async (params) => {
    console.log('params: ', params);

    const response = await fetch(`${API_URL_RENDER}${params}`);

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
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
