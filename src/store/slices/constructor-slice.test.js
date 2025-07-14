import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} from './constructor-slice';

describe('constructor slice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
  };

  const mockBun = {
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
  };

  const mockSauce = {
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
  };

  const mockMain = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0,
  };

  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe('addIngredient', () => {
    it('should handle adding a bun', () => {
      const actual = constructorReducer(initialState, addIngredient(mockBun));
      expect(actual.bun).toEqual({ ...mockBun, uuid: expect.any(String) });
      expect(actual.ingredients).toEqual([]);
    });

    it('should handle adding a sauce', () => {
      const actual = constructorReducer(initialState, addIngredient(mockSauce));
      expect(actual.bun).toEqual(null);
      expect(actual.ingredients).toHaveLength(1);
      expect(actual.ingredients[0]).toEqual({ ...mockSauce, uuid: expect.any(String) });
    });

    it('should handle adding a main ingredient', () => {
      const actual = constructorReducer(initialState, addIngredient(mockMain));
      expect(actual.bun).toEqual(null);
      expect(actual.ingredients).toHaveLength(1);
      expect(actual.ingredients[0]).toEqual({ ...mockMain, uuid: expect.any(String) });
    });

    it('should replace existing bun when adding new bun', () => {
      const state = { bun: { ...mockBun, uuid: 'old-uuid' }, ingredients: [] };
      const actual = constructorReducer(state, addIngredient(mockBun));
      expect(actual.bun).toEqual({ ...mockBun, uuid: expect.any(String) });
      expect(actual.bun.uuid).not.toEqual('old-uuid');
    });

    it('should add ingredient to existing ingredients array', () => {
      const existingIngredient = { ...mockSauce, uuid: 'existing-uuid' };
      const state = { bun: null, ingredients: [existingIngredient] };
      const actual = constructorReducer(state, addIngredient(mockMain));
      expect(actual.ingredients).toHaveLength(2);
      expect(actual.ingredients[0]).toEqual(existingIngredient);
      expect(actual.ingredients[1]).toEqual({ ...mockMain, uuid: expect.any(String) });
    });
  });

  describe('removeIngredient', () => {
    it('should remove bun by _id', () => {
      const state = { bun: { ...mockBun, uuid: 'bun-uuid' }, ingredients: [] };
      const actual = constructorReducer(state, removeIngredient(mockBun._id));
      expect(actual.bun).toEqual(null);
    });

    it('should remove ingredient by uuid', () => {
      const ingredientToRemove = { ...mockSauce, uuid: 'remove-uuid' };
      const ingredientToKeep = { ...mockMain, uuid: 'keep-uuid' };
      const state = {
        bun: null,
        ingredients: [ingredientToRemove, ingredientToKeep],
      };
      const actual = constructorReducer(state, removeIngredient('remove-uuid'));
      expect(actual.ingredients).toHaveLength(1);
      expect(actual.ingredients[0]).toEqual(ingredientToKeep);
    });

    it('should not remove anything if uuid not found', () => {
      const ingredient = { ...mockSauce, uuid: 'existing-uuid' };
      const state = { bun: null, ingredients: [ingredient] };
      const actual = constructorReducer(state, removeIngredient('non-existent-uuid'));
      expect(actual.ingredients).toEqual([ingredient]);
    });

    it('should remove first ingredient from array', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const ingredient3 = { ...mockBun, uuid: 'uuid3' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3],
      };
      const actual = constructorReducer(state, removeIngredient('uuid1'));
      expect(actual.ingredients).toEqual([ingredient2, ingredient3]);
    });

    it('should remove last ingredient from array', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const ingredient3 = { ...mockBun, uuid: 'uuid3' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3],
      };
      const actual = constructorReducer(state, removeIngredient('uuid3'));
      expect(actual.ingredients).toEqual([ingredient1, ingredient2]);
    });

    it('should remove middle ingredient from array', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const ingredient3 = { ...mockBun, uuid: 'uuid3' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3],
      };
      const actual = constructorReducer(state, removeIngredient('uuid2'));
      expect(actual.ingredients).toEqual([ingredient1, ingredient3]);
    });

    it('should handle removing from empty ingredients array', () => {
      const state = { bun: null, ingredients: [] };
      const actual = constructorReducer(state, removeIngredient('any-uuid'));
      expect(actual.ingredients).toEqual([]);
    });

    it('should not remove bun when trying to remove by uuid that matches bun _id', () => {
      const state = { 
        bun: { ...mockBun, uuid: 'bun-uuid' }, 
        ingredients: [{ ...mockSauce, uuid: mockBun._id }] 
      };
      const actual = constructorReducer(state, removeIngredient(mockBun._id));
      expect(actual.bun).toEqual(null);
      expect(actual.ingredients).toHaveLength(1);
    });
  });

  describe('moveIngredient', () => {
    it('should move ingredient from index 0 to index 1', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2],
      };
      const actual = constructorReducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 1 }));
      expect(actual.ingredients).toEqual([ingredient2, ingredient1]);
    });

    it('should move ingredient from index 1 to index 0', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2],
      };
      const actual = constructorReducer(state, moveIngredient({ dragIndex: 1, hoverIndex: 0 }));
      expect(actual.ingredients).toEqual([ingredient2, ingredient1]);
    });

    it('should handle moving ingredient to same position', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2],
      };
      const actual = constructorReducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 0 }));
      expect(actual.ingredients).toEqual([ingredient1, ingredient2]);
    });

    it('should handle moving ingredient with multiple ingredients', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const ingredient3 = { ...mockBun, uuid: 'uuid3' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3],
      };
      const actual = constructorReducer(state, moveIngredient({ dragIndex: 0, hoverIndex: 2 }));
      expect(actual.ingredients).toEqual([ingredient2, ingredient3, ingredient1]);
    });

    it('should handle moving ingredient to end of array', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const ingredient3 = { ...mockBun, uuid: 'uuid3' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3],
      };
      const actual = constructorReducer(state, moveIngredient({ dragIndex: 1, hoverIndex: 3 }));
      expect(actual.ingredients).toEqual([ingredient1, ingredient3, ingredient2]);
    });

    it('should handle moving ingredient from end to beginning', () => {
      const ingredient1 = { ...mockSauce, uuid: 'uuid1' };
      const ingredient2 = { ...mockMain, uuid: 'uuid2' };
      const ingredient3 = { ...mockBun, uuid: 'uuid3' };
      const state = {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3],
      };
      const actual = constructorReducer(state, moveIngredient({ dragIndex: 2, hoverIndex: 0 }));
      expect(actual.ingredients).toEqual([ingredient3, ingredient1, ingredient2]);
    });
  });

  describe('clearConstructor', () => {
    it('should clear bun and ingredients', () => {
      const state = {
        bun: { ...mockBun, uuid: 'bun-uuid' },
        ingredients: [{ ...mockSauce, uuid: 'sauce-uuid' }],
      };
      const actual = constructorReducer(state, clearConstructor());
      expect(actual.bun).toEqual(null);
      expect(actual.ingredients).toEqual([]);
    });

    it('should clear from initial state', () => {
      const actual = constructorReducer(initialState, clearConstructor());
      expect(actual.bun).toEqual(null);
      expect(actual.ingredients).toEqual([]);
    });
  });
}); 