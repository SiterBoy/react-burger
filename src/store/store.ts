import { configureStore } from '@reduxjs/toolkit';
import { authMiddleware } from './middleware/auth';
import userReducer from './slices/user-slice';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';
import tabsReducer from './slices/tabs-slice';
import ingredientDetailsReducer from './slices/ingredient-details-slice';
import appReducer from './slices/app-slice';
import orderFeedReducer, {
  wsFeedStart,
  wsFeedSuccess,
  wsFeedError,
  wsFeedClosed,
  wsFeedMessage
} from './slices/order-feed-slice';
import { wsMiddleware } from './middleware/ws-middleware';

const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all';

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    tabs: tabsReducer,
    ingredientDetails: ingredientDetailsReducer,
    app: appReducer,
    orderFeed: orderFeedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authMiddleware)
      .concat(wsMiddleware(wsFeedUrl, {
        wsStart: wsFeedStart.type,
        wsSuccess: wsFeedSuccess.type,
        wsError: wsFeedError.type,
        wsClosed: wsFeedClosed.type,
        wsMessage: wsFeedMessage.type
      }))
});

export { store };
export type AppDispatch = typeof store.dispatch; 