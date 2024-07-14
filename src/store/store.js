import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import choicesReducer from './choicesSlice';
import goodsReducer from './goodsSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    choices: choicesReducer,
    goods: goodsReducer,
    filters: filtersReducer,
  }
})

export default store;