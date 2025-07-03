import { Middleware } from '@reduxjs/toolkit';
import type { Order } from '../slices/order-feed-slice';

export const BASE_WS_URL = 'wss://norma.nomoreparties.space';

interface WSActions {
  wsStart: string;
  wsSuccess: string;
  wsError: string;
  wsClosed: string;
  wsMessage: string;
}

export const wsMiddleware = (
  wsUrl: string | ((param?: string) => string),
  actions: WSActions
): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string') {
        switch (action.type) {
          case actions.wsStart:
            if (socket !== null) {
              socket.close();
            }
            let url = '';
            let payload: string | undefined = undefined;
            if ('payload' in action && typeof action.payload === 'string') {
              payload = action.payload;
            }
            if (typeof wsUrl === 'function') {
              url = wsUrl(payload);
            } else {
              url = wsUrl;
            }
            socket = new WebSocket(url);

            socket.onopen = () => dispatch({ type: actions.wsSuccess });
            socket.onerror = (event) => dispatch({ type: actions.wsError, payload: event });
            socket.onclose = () => dispatch({ type: actions.wsClosed });
            socket.onmessage = (event) => {
              try {
                const data = JSON.parse(event.data);
                if (data.orders) {
                  data.orders = data.orders.filter((order: Order) => Array.isArray(order.ingredients) && order.ingredients.length > 0 && order._id && order.number);
                }
                dispatch({ type: actions.wsMessage, payload: data });
              } catch (e) {
                dispatch({ type: actions.wsError, payload: e });
              }
            };
            break;
          case actions.wsClosed:
            if (socket !== null) {
              socket.close();
              socket = null;
            }
            break;
          default:
            break;
        }
      }
      return next(action);
    };
  };
}; 