import React, { useEffect } from 'react';
import FeedStats from '../components/feed-stats/feed-stats';
import OrderCard from '../components/order-card/order-card';
import styles from './feed-page.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { wsFeedStart, wsFeedClosed } from '../store/slices/order-feed-slice';
import { RootState } from '../store/types';

const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state: RootState) => state.orderFeed);
  const ingredients = useAppSelector((state: RootState) => state.ingredients.items);

  useEffect(() => {
    dispatch(wsFeedStart());
    return () => {
      dispatch(wsFeedClosed());
    };
  }, [dispatch]);
  
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

  // Для теста: подменяем статус первого заказа на 'pending', если есть хотя бы один заказ
  const testOrders = orders.length > 0 ? [
    { ...orders[0], status: 'pending' },
    ...orders.slice(1)
  ] : orders;

  return (
    <div className={styles.feedWrapper}>
      <div className={styles.feedList}>
        <h1 className={styles.title}>Лента заказов</h1>
        <div className={styles.orders}>
          {testOrders.map(order => (
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
      <FeedStats />
    </div>
  );
};

export default FeedPage; 