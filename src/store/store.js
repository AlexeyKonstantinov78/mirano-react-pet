import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import choicesReducer from './choicesSlice';
import goodsReducer from './goodsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    choices: choicesReducer,
    goods: goodsReducer,
  }
})

export default store;