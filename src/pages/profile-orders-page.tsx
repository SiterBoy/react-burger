import React, { useEffect, useMemo } from 'react';
import OrderCard from '../components/order-card/order-card';
import styles from './profile-orders-page.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { wsProfileStart, wsProfileClosed } from '../store/slices/profile-orders-slice';
import { RootState } from '../store/types';

const ProfileOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const profileOrders = useAppSelector((state: RootState) => state.profileOrders);
  const orders = useMemo(() => profileOrders?.orders || [], [profileOrders?.orders]);
  const ingredients = useAppSelector((state: RootState) => state.ingredients.items);
  const error = profileOrders?.error;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(wsProfileStart(accessToken));
    }
    return () => {
      dispatch(wsProfileClosed());
    };
  }, [dispatch]);

  React.useEffect(() => {
    console.log('ProfileOrdersPage: orders', orders);
    console.log('ProfileOrdersPage: error', error);
    console.log('ProfileOrdersPage: profileOrders', profileOrders);
  }, [orders, error, profileOrders]);

  const getOrderPrice = (orderIngredients: string[]) => {
    return orderIngredients.reduce((sum, id) => {
      const ingredient = ingredients.find(i => i._id === id);
      return ingredient ? sum + ingredient.price : sum;
    }, 0);
  };

  const getOrderIngredients = (orderIngredients: string[]) => {
    return orderIngredients
      .map(id => ingredients.find(i => i._id === id))
      .filter((i): i is typeof ingredients[number] => Boolean(i));
  };

  return (
    <div className={styles.ordersWrapper}>
      <h1 className={styles.title}>История заказов</h1>
      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>Ошибка WebSocket: {error}</div>
      )}
      <div className={styles.orders}>
        {orders.map(order => (
          <OrderCard
            key={order._id}
            order={{
              number: order.number,
              name: `Заказ #${order.number}`,
              date: new Date(order.createdAt).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long' }),
              ingredients: getOrderIngredients(order.ingredients),
              price: getOrderPrice(order.ingredients),
              status: order.status
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileOrdersPage; 