import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabType = 'bun' | 'sauce' | 'main';

interface TabsState {
  currentTab: TabType;
}

const initialState: TabsState = {
  currentTab: 'bun',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<TabType>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabsSlice.actions;
export default tabsSlice.reducer;
