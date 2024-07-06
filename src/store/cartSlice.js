import { createSlice } from "@reduxjs/toolkit";
import { KEY_LOCAL_STORAGE } from '../const';

const initialState = {
  isOpen: false,
  items: JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE) || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    addItemToCart(state, action) {

      const {
        id,
        img,
        title,
        dateDelivery,
        price,
        count = 1
      } = action.payload;

      const exisistingItem = state.items.find(item => item.id === id);
      if (exisistingItem) {
        exisistingItem.count += count;
      } else {
        state.items.push({
          id,
          img,
          title,
          dateDelivery,
          price,
          count
        });
      }

      localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(state.items));
    }
  },
});

export const { toggleCart, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;


