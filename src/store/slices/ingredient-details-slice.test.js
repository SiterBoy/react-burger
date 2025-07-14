import ingredientDetailsReducer, { setIngredientDetails, clearIngredientDetails } from './ingredient-details-slice';

describe('ingredient details slice', () => {
  const initialState = {
    ingredient: null,
  };

  const mockIngredient = {
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

  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setIngredientDetails', () => {
    const actual = ingredientDetailsReducer(initialState, setIngredientDetails(mockIngredient));
    expect(actual.ingredient).toEqual(mockIngredient);
  });

  it('should handle setIngredientDetails when ingredient already exists', () => {
    const state = { ingredient: mockIngredient };
    const newIngredient = { ...mockIngredient, name: 'Новая булка', _id: 'new-id' };
    const actual = ingredientDetailsReducer(state, setIngredientDetails(newIngredient));
    expect(actual.ingredient).toEqual(newIngredient);
  });

  it('should handle clearIngredientDetails', () => {
    const state = { ingredient: mockIngredient };
    const actual = ingredientDetailsReducer(state, clearIngredientDetails());
    expect(actual.ingredient).toEqual(null);
  });

  it('should handle clearIngredientDetails when ingredient is null', () => {
    const actual = ingredientDetailsReducer(initialState, clearIngredientDetails());
    expect(actual.ingredient).toEqual(null);
  });
}); 