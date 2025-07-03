import { Middleware } from '@reduxjs/toolkit';
import type { Order } from '../slices/order-feed-slice';

interface WSActions {
  wsStart: string;
  wsSuccess: string;
  wsError: string;
  wsClosed: string;
  wsMessage: string;
}

export const wsMiddleware = (wsUrl: string, actions: WSActions): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      // type guard: action must have type
      if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string') {
        switch (action.type) {
          case actions.wsStart:
            if (socket !== null) {
              socket.close();
            }
            socket = new WebSocket(wsUrl);

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