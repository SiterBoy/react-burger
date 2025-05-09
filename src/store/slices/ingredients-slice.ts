import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';
import { PayloadAction } from '@reduxjs/toolkit';

interface IngredientsState {
  items: IIngredientData[];
  loading: boolean;
  error: string | null;
  counters: Record<string, number>;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null,
  counters: {},
};

const API_URL = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch(`${API_URL}/ingredients`);
    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to fetch ingredients');
    }
    return data.data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.counters[id] = (state.counters[id] || 0) + 1;
    },
    decrementCounter: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.counters[id] > 0) {
        state.counters[id]--;
      }
    },
    resetCounters: (state) => {
      state.counters = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.counters = {};
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  },
});

export const { incrementCounter, decrementCounter, resetCounters } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
