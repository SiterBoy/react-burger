import { configureStore } from '@reduxjs/toolkit';
import { authMiddleware } from './middleware/auth';
import userReducer from './slices/user-slice';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';
import tabsReducer from './slices/tabs-slice';
import ingredientDetailsReducer from './slices/ingredient-details-slice';
import appReducer from './slices/app-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    tabs: tabsReducer,
    ingredientDetails: ingredientDetailsReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authMiddleware),
});

export { store };
export type AppDispatch = typeof store.dispatch;
