import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedIngredients: [],
};

const smoothieSlice = createSlice({
  name: 'smoothie',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(ingredient => ingredient.id !== action.payload);
    },
    removeAllIngredients: (state) => {
      
      state.selectedIngredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, removeAllIngredients } = smoothieSlice.actions;

export default smoothieSlice.reducer;
