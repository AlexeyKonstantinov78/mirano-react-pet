import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import choicesReducer from './choicesSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    choices: choicesReducer,
  }
})

export default store;