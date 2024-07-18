import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL_RENDER, TEXT_ERROR } from '../const';
import { fetchCart, toggleCart } from './cartSlice';

const initialState = {
  isOpen: false,
  orderId: '',
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: 'true',
    deliveryDate: '',
    deliveryTime: '',
  },
  error: null,
};

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (_, { getState, dispatch }) => {
    const {
      order: {
        data: {
          buyerName,
          buyerPhone,
          recipientName,
          recipientPhone,
          street,
          house,
          apartment,
          paymentOnline,
          deliveryDate,
          deliveryTime,
        }
      }
    } = getState();
    const orderData = {
      "buyer": {
        "name": buyerName,
        "phone": buyerPhone,
      },
      "recipient": {
        "name": recipientName,
        "phone": recipientPhone,
      },
      "address": `${street}, ${house}, ${apartment}`,
      paymentOnline,
      deliveryDate,
      deliveryTime,
    };

    const response = await fetch(`${API_URL_RENDER}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(TEXT_ERROR);
    }

    dispatch(clearOrder());
    dispatch(toggleCart());
    dispatch(fetchCart());

    return await response.json();
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    toggleOrder(state) {
      state.isOpen = !state.isOpen;
    },
    clearOrder(state) {
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: 'true',
        deliveryDate: '',
        deliveryTime: '',
      };
      state.orderId = '';
    },
    updateOrderData(state, action) {
      // state.data[action.payload.name] = action.payload.value;
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderId = '';
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        console.log(action);
        state.orderId = action.payload.orderId;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.error = action.error.message;
        state.orderId = '';
      });
  },
});

export const { toggleOrder, openModal, closeModal, clearOrder, updateOrderData } = orderSlice.actions;

export default orderSlice.reducer;
