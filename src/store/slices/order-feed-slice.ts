import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  _id: string;
  number: number;
  ingredients: string[];
  status: 'created' | 'pending' | 'done';
  createdAt: string;
  updatedAt: string;
}

interface OrderFeedState {
  orders: Order[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: string | null;
}

const initialState: OrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null,
};

const orderFeedSlice = createSlice({
  name: 'orderFeed',
  initialState,
  reducers: {
    wsFeedStart: (state) => {},
    wsFeedSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsFeedError: (state, action: PayloadAction<any>) => {
      state.wsConnected = false;
      state.error = action.payload?.message || 'WebSocket error';
    },
    wsFeedClosed: (state) => {
      state.wsConnected = false;
    },
    wsFeedMessage: (state, action: PayloadAction<any>) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders || [];
      state.total = total || 0;
      state.totalToday = totalToday || 0;
    },
  },
});

export const {
  wsFeedStart,
  wsFeedSuccess,
  wsFeedError,
  wsFeedClosed,
  wsFeedMessage,
} = orderFeedSlice.actions;

export default orderFeedSlice.reducer;

export type { Order }; 