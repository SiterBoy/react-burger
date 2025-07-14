import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';

interface IConstructorIngredient extends IIngredientData {
  uuid: string;
}

interface ConstructorState {
  bun: IIngredientData | null;
  ingredients: IConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<IConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: IIngredientData) => {
        return {
          payload: {
            ...ingredient,
            uuid: uuidv4(),
          },
        };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      if (state.bun && state.bun._id === action.payload) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          ingredient => ingredient.uuid !== action.payload
        );
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
    clearConstructor: state => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export default constructorSlice.reducer;
