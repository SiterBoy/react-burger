import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';

interface IngredientDetailsState {
  ingredient: IIngredientData | null;
}

const initialState: IngredientDetailsState = {
  ingredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<IIngredientData>) => {
      state.ingredient = action.payload;
    },
    clearIngredientDetails: state => {
      state.ingredient = null;
    },
  },
});

export const { setIngredientDetails, clearIngredientDetails } =
  ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
