import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    customerInfo: localStorage.getItem('customerInfo') ? JSON.parse(localStorage.getItem('customerInfo')) : {}, 
    orderInfo: localStorage.getItem('orderInfo') ? JSON.parse(localStorage.getItem('orderInfo')) : {},
  },
  reducers: {
    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
      localStorage.setItem('customerInfo', JSON.stringify(action.payload));
    },
    setOrderInfo: (state, action) => {
      state.orderInfo = action.payload;
      localStorage.setItem('orderInfo', JSON.stringify(action.payload));
    },
    clearOrderInfo: (state) => {
        state.customerInfo = {};
        state.orderInfo = {};
        localStorage.removeItem('customerInfo');
        localStorage.removeItem('orderInfo');
        
      },
  },
});

export const { setCustomerInfo, setOrderInfo, clearOrderInfo } = orderSlice.actions;
export const selectCustomerInfo = (state) => state.order.customerInfo;
export const selectOrderInfo = (state) => state.order.orderInfo;

export default orderSlice.reducer;