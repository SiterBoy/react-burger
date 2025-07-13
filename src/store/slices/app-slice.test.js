import appReducer, { init } from './app-slice';

describe('app slice', () => {
  const initialState = {
    initialized: false,
  };

  it('should return the initial state', () => {
    expect(appReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle init', () => {
    const actual = appReducer(initialState, init());
    expect(actual.initialized).toEqual(true);
  });

  it('should handle init from false state', () => {
    const state = { initialized: false };
    const actual = appReducer(state, init());
    expect(actual.initialized).toEqual(true);
  });

  it('should handle init from true state', () => {
    const state = { initialized: true };
    const actual = appReducer(state, init());
    expect(actual.initialized).toEqual(true);
  });
}); 