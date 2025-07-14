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
import { wsMiddleware, BASE_WS_URL } from './middleware/ws-middleware';
import profileOrdersReducer, {
  wsProfileStart,
  wsProfileSuccess,
  wsProfileError,
  wsProfileClosed,
  wsProfileMessage
} from './slices/profile-orders-slice';

const wsFeedUrl = `${BASE_WS_URL}/orders/all`;
const wsProfileUrl = (token?: string) => `${BASE_WS_URL}/orders${token ? `?token=${token}` : ''}`;

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    tabs: tabsReducer,
    ingredientDetails: ingredientDetailsReducer,
    app: appReducer,
    orderFeed: orderFeedReducer,
    profileOrders: profileOrdersReducer
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
      .concat(wsMiddleware(wsProfileUrl, {
        wsStart: wsProfileStart.type,
        wsSuccess: wsProfileSuccess.type,
        wsError: wsProfileError.type,
        wsClosed: wsProfileClosed.type,
        wsMessage: wsProfileMessage.type
      }))
});

export { store };
export type AppDispatch = typeof store.dispatch;
