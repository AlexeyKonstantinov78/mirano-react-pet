import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import choicesReducer from './slices/choicesSlice';
import goodsReducer from './slices/goodsSlice';
import filtersReducer from './slices/filtersSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    choices: choicesReducer,
    goods: goodsReducer,
    filters: filtersReducer,
    search: searchReducer,
  }
})

export default store;