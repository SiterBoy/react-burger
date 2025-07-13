import ingredientsReducer, {
  incrementCounter,
  decrementCounter,
  resetCounters,
  fetchIngredients,
} from './ingredients-slice';

describe('ingredients slice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    counters: {},
  };

  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0,
    },
  ];

  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should maintain immutability of state', () => {
    const originalState = {
      ...initialState,
      items: [...mockIngredients],
      counters: { 'id1': 1, 'id2': 2 },
    };
    
    const newState = ingredientsReducer(originalState, incrementCounter('id1'));
    
    // Проверяем, что оригинальное состояние не изменилось
    expect(originalState.counters['id1']).toEqual(1);
    expect(originalState.items).toEqual(mockIngredients);
    
    // Проверяем, что новое состояние изменилось
    expect(newState.counters['id1']).toEqual(2);
    expect(newState.counters['id2']).toEqual(2); // не изменилось
  });

  it('should return same state for unknown action', () => {
    const state = {
      ...initialState,
      items: mockIngredients,
      counters: { 'id1': 1 },
    };
    
    const unknownAction = { type: 'UNKNOWN_ACTION', payload: 'some data' };
    const newState = ingredientsReducer(state, unknownAction);
    
    expect(newState).toEqual(state);
  });

  describe('incrementCounter', () => {
    it('should increment counter for new ingredient', () => {
      const actual = ingredientsReducer(initialState, incrementCounter('ingredient-id'));
      expect(actual.counters['ingredient-id']).toEqual(1);
    });

    it('should increment counter for existing ingredient', () => {
      const state = {
        ...initialState,
        counters: { 'ingredient-id': 2 },
      };
      const actual = ingredientsReducer(state, incrementCounter('ingredient-id'));
      expect(actual.counters['ingredient-id']).toEqual(3);
    });

    it('should not affect other counters', () => {
      const state = {
        ...initialState,
        counters: { 'other-id': 5 },
      };
      const actual = ingredientsReducer(state, incrementCounter('ingredient-id'));
      expect(actual.counters['other-id']).toEqual(5);
      expect(actual.counters['ingredient-id']).toEqual(1);
    });

    it('should increment counter from 0', () => {
      const state = {
        ...initialState,
        counters: { 'ingredient-id': 0 },
      };
      const actual = ingredientsReducer(state, incrementCounter('ingredient-id'));
      expect(actual.counters['ingredient-id']).toEqual(1);
    });

    it('should increment multiple counters simultaneously', () => {
      const state = {
        ...initialState,
        counters: { 'id1': 1, 'id2': 2 },
      };
      let actual = ingredientsReducer(state, incrementCounter('id1'));
      actual = ingredientsReducer(actual, incrementCounter('id2'));
      expect(actual.counters['id1']).toEqual(2);
      expect(actual.counters['id2']).toEqual(3);
    });

    it('should handle empty string as ingredient id', () => {
      const actual = ingredientsReducer(initialState, incrementCounter(''));
      expect(actual.counters['']).toEqual(1);
    });
  });

  describe('decrementCounter', () => {
    it('should decrement counter for ingredient with count > 1', () => {
      const state = {
        ...initialState,
        counters: { 'ingredient-id': 3 },
      };
      const actual = ingredientsReducer(state, decrementCounter('ingredient-id'));
      expect(actual.counters['ingredient-id']).toEqual(2);
    });

    it('should decrement counter to 0 for ingredient with count = 1', () => {
      const state = {
        ...initialState,
        counters: { 'ingredient-id': 1 },
      };
      const actual = ingredientsReducer(state, decrementCounter('ingredient-id'));
      expect(actual.counters['ingredient-id']).toEqual(0);
    });

    it('should not decrement counter below 0', () => {
      const state = {
        ...initialState,
        counters: { 'ingredient-id': 0 },
      };
      const actual = ingredientsReducer(state, decrementCounter('ingredient-id'));
      expect(actual.counters['ingredient-id']).toEqual(0);
    });

    it('should not affect other counters', () => {
      const state = {
        ...initialState,
        counters: { 'ingredient-id': 2, 'other-id': 5 },
      };
      const actual = ingredientsReducer(state, decrementCounter('ingredient-id'));
      expect(actual.counters['other-id']).toEqual(5);
      expect(actual.counters['ingredient-id']).toEqual(1);
    });

    it('should handle decrementing non-existent counter', () => {
      const actual = ingredientsReducer(initialState, decrementCounter('non-existent-id'));
      expect(actual.counters['non-existent-id']).toBeUndefined();
    });

    it('should handle decrementing multiple counters', () => {
      const state = {
        ...initialState,
        counters: { 'id1': 3, 'id2': 1, 'id3': 0 },
      };
      let actual = ingredientsReducer(state, decrementCounter('id1'));
      actual = ingredientsReducer(actual, decrementCounter('id2'));
      actual = ingredientsReducer(actual, decrementCounter('id3'));
      expect(actual.counters['id1']).toEqual(2);
      expect(actual.counters['id2']).toEqual(0);
      expect(actual.counters['id3']).toEqual(0);
    });

    it('should handle empty string as ingredient id', () => {
      const state = {
        ...initialState,
        counters: { '': 2 },
      };
      const actual = ingredientsReducer(state, decrementCounter(''));
      expect(actual.counters['']).toEqual(1);
    });
  });

  describe('resetCounters', () => {
    it('should reset all counters to empty object', () => {
      const state = {
        ...initialState,
        counters: { 'id1': 3, 'id2': 1, 'id3': 0 },
      };
      const actual = ingredientsReducer(state, resetCounters());
      expect(actual.counters).toEqual({});
    });

    it('should reset counters from initial state', () => {
      const actual = ingredientsReducer(initialState, resetCounters());
      expect(actual.counters).toEqual({});
    });
  });

  describe('fetchIngredients', () => {
    it('should handle fetchIngredients.pending', () => {
      const actual = ingredientsReducer(initialState, fetchIngredients.pending(''));
      expect(actual.loading).toEqual(true);
      expect(actual.error).toEqual(null);
    });

    it('should handle fetchIngredients.fulfilled', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
        counters: { 'some-id': 5 },
      };
      const actual = ingredientsReducer(
        state,
        fetchIngredients.fulfilled(mockIngredients, '')
      );
      expect(actual.loading).toEqual(false);
      expect(actual.items).toEqual(mockIngredients);
      expect(actual.counters).toEqual({});
    });

    it('should handle fetchIngredients.fulfilled with empty array', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
        items: mockIngredients,
        counters: { 'some-id': 5 },
      };
      const actual = ingredientsReducer(
        state,
        fetchIngredients.fulfilled([], '')
      );
      expect(actual.loading).toEqual(false);
      expect(actual.items).toEqual([]);
      expect(actual.counters).toEqual({});
    });

    it('should handle fetchIngredients.fulfilled and preserve other state properties', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
        items: [],
        counters: { 'some-id': 5 },
      };
      const actual = ingredientsReducer(
        state,
        fetchIngredients.fulfilled(mockIngredients, '')
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('Previous error');
      expect(actual.items).toEqual(mockIngredients);
      expect(actual.counters).toEqual({});
    });

    it('should handle fetchIngredients.rejected', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const errorMessage = 'Network error';
      const actual = ingredientsReducer(
        state,
        fetchIngredients.rejected(new Error(errorMessage), '', undefined, errorMessage)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(errorMessage);
    });

    it('should handle fetchIngredients.rejected with default error message', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const actual = ingredientsReducer(
        state,
        fetchIngredients.rejected(new Error(), '', undefined)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('Произошла ошибка при загрузке ингредиентов');
    });
  });
}); 