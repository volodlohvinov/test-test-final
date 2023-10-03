import { configureStore } from '@reduxjs/toolkit';
import smoothieReducer from './reducers/smoothieSlice';
import cartReducer from './reducers/cartSlice'
import orderReducer from './reducers/orderSlice'

const persistedState = {
  cart: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
  },
};

const store = configureStore({
  reducer: {
    smoothie: smoothieReducer,
    cart: cartReducer,
    order: orderReducer
   
  },
  preloadedState: persistedState,
});

export default store
