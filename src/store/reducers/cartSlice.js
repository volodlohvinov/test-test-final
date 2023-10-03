
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      
        state.items = [];
        localStorage.setItem('cart', JSON.stringify(state.items));
  },
}});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;