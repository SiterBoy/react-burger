import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse, API_URL } from '../../utils/api';

interface OrderState {
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderNumber: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[]) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    const data = await checkResponse<{ order: { number: number } }>(response);
    return data.order.number;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNumber = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка при создании заказа';
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
