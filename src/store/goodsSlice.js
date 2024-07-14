import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL_RENDER } from '../const';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  name: '',
  content: null,
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
        state.content = 'loading';
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;

        if (state.items.length === 0) {
          state.content = 'По запросу ничего нет';
        } else {
          state.content = null;
        }

        if (action.meta.arg.name) {
          state.name = action.meta.arg.name;
        } else {
          state.name = "Все товары";
        }


      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.content = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
