import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import choicesReducer from './choicesSlice';
import goodsReducer from './goodsSlice';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    choices: choicesReducer,
    goods: goodsReducer,
    filter: filterReducer,
  }
})

export default store;