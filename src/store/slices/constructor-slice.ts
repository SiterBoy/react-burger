import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';

interface ConstructorState {
  bun: IIngredientData | null;
  ingredients: IIngredientData[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IIngredientData>) => {
      const ingredient = { ...action.payload };
      if (ingredient.type === 'bun') {
        if (state.bun) {
          state.bun = null;
        }
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients = state.ingredients.filter((_, i) => i !== index);
    },
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = { ...state.ingredients[dragIndex] };
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
