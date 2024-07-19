import { createSlice } from "@reduxjs/toolkit";
import { FAILED, LOADING, SUCCESS } from '../../const';
import { sendOrder } from '../thunks/sendOrder';

const initialState = {
  isOpen: false,
  orderId: '',
  status: 'idle',
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
      // state.isOpen = false;
      // state.status = 'idle';
      // state.error = null;
    },
    updateOrderData(state, action) {
      // state.data[action.payload.name] = action.payload.value;
      state.data = { ...state.data, ...action.payload };
    },
    clearOrderId(state) {
      state.orderId = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderId = '';
        state.error = null;
        state.status = LOADING;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.status = SUCCESS;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.orderId = '';
        state.status = FAILED;
      });
  },
});

export const { toggleOrder, openModal, closeModal, clearOrder, updateOrderData, clearOrderId } = orderSlice.actions;

export default orderSlice.reducer;
