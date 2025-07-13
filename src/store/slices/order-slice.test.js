import orderReducer, { clearOrder, createOrder } from './order-slice';

describe('order slice', () => {
  const initialState = {
    orderNumber: null,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle clearOrder', () => {
    const state = {
      orderNumber: 12345,
      loading: false,
      error: 'Some error',
    };
    const actual = orderReducer(state, clearOrder());
    expect(actual.orderNumber).toEqual(null);
    expect(actual.error).toEqual(null);
  });

  it('should handle clearOrder from initial state', () => {
    const actual = orderReducer(initialState, clearOrder());
    expect(actual.orderNumber).toEqual(null);
    expect(actual.error).toEqual(null);
  });

  it('should handle createOrder.pending', () => {
    const actual = orderReducer(initialState, createOrder.pending('', []));
    expect(actual.loading).toEqual(true);
    expect(actual.error).toEqual(null);
  });

  it('should handle createOrder.fulfilled', () => {
    const state = {
      orderNumber: null,
      loading: true,
      error: null,
    };
    const orderNumber = 12345;
    const actual = orderReducer(state, createOrder.fulfilled(orderNumber, '', []));
    expect(actual.loading).toEqual(false);
    expect(actual.orderNumber).toEqual(orderNumber);
  });

  it('should handle createOrder.rejected', () => {
    const state = {
      orderNumber: null,
      loading: true,
      error: null,
    };
    const errorMessage = 'Network error';
    const actual = orderReducer(
      state,
      createOrder.rejected(new Error(errorMessage), '', [], errorMessage)
    );
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual(errorMessage);
  });

  it('should handle createOrder.rejected with default error message', () => {
    const state = {
      orderNumber: null,
      loading: true,
      error: null,
    };
    const actual = orderReducer(
      state,
      createOrder.rejected(new Error(), '', [])
    );
    expect(actual.loading).toEqual(false);
    expect(actual.error).toEqual('Произошла ошибка при создании заказа');
  });
}); 