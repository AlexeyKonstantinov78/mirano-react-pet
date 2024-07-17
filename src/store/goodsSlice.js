import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL_RENDER, FAILED, LOADING, SUCCESS, TEXT_ERROR } from '../const';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  name: '',
  content: null,
  categories: [],
};

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

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = LOADING;
        state.error = null;
        state.content = state.status;
        state.categories = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.items = action.payload;
        action.payload.forEach(product => {
          if (product.categories) {
            product.categories.forEach(category => {
              if (!state.categories.includes(category)) {
                state.categories.push(category);
              }
            });
          }
        });

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
        state.status = FAILED;
        state.error = action.error.message;
        state.content = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
