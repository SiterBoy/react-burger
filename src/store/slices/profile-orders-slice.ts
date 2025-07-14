import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order } from './order-feed-slice';

interface ProfileOrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: string | null;
}

const initialState: ProfileOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null,
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    wsProfileStart: (state, _action: PayloadAction<string | undefined>) => {},
    wsProfileSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsProfileError: (state, action: PayloadAction<any>) => {
      state.wsConnected = false;
      state.error = action.payload?.message || 'WebSocket error';
    },
    wsProfileClosed: (state) => {
      state.wsConnected = false;
    },
    wsProfileMessage: (state, action: PayloadAction<any>) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders || [];
      state.total = total || 0;
      state.totalToday = totalToday || 0;
    },
  },
});

export const {
  wsProfileStart,
  wsProfileSuccess,
  wsProfileError,
  wsProfileClosed,
  wsProfileMessage,
} = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer; 