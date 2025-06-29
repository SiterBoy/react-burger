import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  initialized: boolean;
}

const initialState: AppState = {
  initialized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    init: (state) => {
      state.initialized = true;
    },
  },
});

export const { init } = appSlice.actions;
export default appSlice.reducer; 