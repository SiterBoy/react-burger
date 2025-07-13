import tabsReducer, { setCurrentTab } from './tabs-slice';

describe('tabs slice', () => {
  const initialState = {
    currentTab: 'bun',
  };

  it('should return the initial state', () => {
    expect(tabsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setCurrentTab to sauce', () => {
    const actual = tabsReducer(initialState, setCurrentTab('sauce'));
    expect(actual.currentTab).toEqual('sauce');
  });

  it('should handle setCurrentTab to main', () => {
    const state = { currentTab: 'sauce' };
    const actual = tabsReducer(state, setCurrentTab('main'));
    expect(actual.currentTab).toEqual('main');
  });

  it('should handle setCurrentTab to bun', () => {
    const state = { currentTab: 'main' };
    const actual = tabsReducer(state, setCurrentTab('bun'));
    expect(actual.currentTab).toEqual('bun');
  });

  it('should handle setCurrentTab from any state', () => {
    const state = { currentTab: 'main' };
    const actual = tabsReducer(state, setCurrentTab('sauce'));
    expect(actual.currentTab).toEqual('sauce');
  });
}); 